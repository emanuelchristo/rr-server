require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Datastore = require('nedb')

const db = new Datastore({ filename: './data.json', autoload: true })

// Active stream ID
let activeStreamId = null

// Initializing server
const port = process.env.PORT || 3000
const app = express()
app.use(cors())
app.use(bodyParser.json())

// middlewares
const auth = function (req, res, next) {
	if (!req.headers.authorization) return res.status(401).json({ error: 'No credentials sent' })
	else if (req.headers.authorization !== process.env.AUTH) return res.status(403).json({ error: 'Incorrect credentials sent' })
	next()
}

// Routes
app.get('/allstreams', (req, res) => {
	db.find({}, (err, docs) => {
		if (err) res.status(500).send('Internal error')
		else res.json(docs)
	})
})

app.get('/streamurl', (req, res) => {
	db.findOne({ _id: activeStreamId }, (err, doc) => {
		if (err) res.status(500).send('Internal error')
		else res.json(doc)
	})
})

app.use('/setactivestream', auth)
app.post('/setactivestream', (req, res) => {
	if (!req.body._id) res.status(400).send('No stream id given')
	else {
		activeStreamId = req.body._id
		res.send('Active stream set')
	}
})

app.use('/createstream', auth)
app.post('/createstream', (req, res) => {
	db.insert(
		{
			streamName: String(req.body.streamName || ''),
			mediaLink: String(req.body.mediaLink || ''),
			infoLink: String(req.body.infoLink || ''),
		},
		(err, newDoc) => {
			if (err) res.status(500).send('Internal error')
			else res.json(newDoc)
		}
	)
})

app.use('/updatestream', auth)
app.post('/updatestream', (req, res) => {
	if (!req.body._id) res.status(400).send('No stream id given')
	db.update(
		{ _id: req.body._id },
		{
			streamName: String(req.body.streamName || ''),
			mediaLink: String(req.body.mediaLink || ''),
			infoLink: String(req.body.infoLink || ''),
		},
		{ returnUpdatedDocs: true, multi: false },
		function (err, numReplaced, doc) {
			if (err) res.status(500).send('Internal error')
			else if (numReplaced > 0) res.status(200).json(doc)
			else res.status(404).send('Stream not found')
		}
	)
})

app.use('/deletestream', auth)
app.post('/deletestream', (req, res) => {
	if (!req.body._id) res.status(400).send('No stream id given')
	else {
		db.remove({ _id: req.body._id }, {}, function (err, numRemoved) {
			if (err) res.status(500).send('Internal error')
			else if (numRemoved > 0) res.status(200).json('Stream deleted')
			else res.status(404).send('Stream not found')
		})
	}
})

// Starting server
app.listen(port, () => {
	console.log(`RR server listening at http://localhost:${port}`)
})
