require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const pool = require('./db')

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
app.get('/allstreams', async (req, res) => {
	try {
		const result = await pool.query('SELECT * FROM streams')
		res.json(result.rows)
	} catch (err) {
		console.log(err)
		res.status(500).send('Internal error')
	}
})

app.get('/streamurl', async (req, res) => {
	try {
		if (activeStreamId) {
			const result = await pool.query('SELECT * FROM streams WHERE _id = $1', [activeStreamId])
			res.json(result.rows[0])
		} else res.json(null)
	} catch (err) {
		console.log(err)
		res.status(500).send('Internal error')
	}
})

app.use('/setactivestream', auth)
app.post('/setactivestream', async (req, res) => {
	try {
		if (!req.body._id) res.status(400).send('No stream id given')
		else await pool.query('UPDATE "activeStream" SET "streamId"=$1 WHERE _id=1', [req.body._id])
		activeStreamId = req.body._id
		res.send('Active stream set')
	} catch (err) {
		console.log(err)
		res.status(500).send('Internal error')
	}
})

app.use('/createstream', auth)
app.post('/createstream', async (req, res) => {
	try {
		let data = [String(req.body.streamName || ''), String(req.body.mediaLink || ''), String(req.body.infoLink || '')]
		const result = await pool.query('INSERT INTO streams ("mediaLink", "infoLink", "streamName") VALUES  ($1, $2, $3) RETURNING *', data)
		res.json(result.rows[0])
	} catch (err) {
		console.log(err)
		res.status(500).send('Internal error')
	}
})

app.use('/updatestream', auth)
app.post('/updatestream', async (req, res) => {
	try {
		if (!req.body._id) res.status(400).send('No stream id given')
		else {
			let data = [String(req.body.streamName || ''), String(req.body.mediaLink || ''), String(req.body.infoLink || ''), req.body._id]
			const result = await pool.query('UPDATE streams SET "streamName" = $1, "mediaLink" = $2, "infoLink" = $3 WHERE _id=$4 RETURNING *', data)
			if (result.rowCount > 0) res.json(result.rows[0])
			else res.status(404).send('Stream not found')
		}
	} catch (err) {
		console.log(err)
		res.status(500).send('Internal error')
	}
})

app.use('/deletestream', auth)
app.post('/deletestream', async (req, res) => {
	try {
		if (!req.body._id) res.status(400).send('No stream id given')
		const result = await pool.query('DELETE FROM streams WHERE _id=$1', [req.body._id])
		if (result.rowCount > 0) res.status(200).json('Stream deleted')
		else res.status(404).send('Stream not found')
	} catch (err) {
		console.log(err)
		res.status(500).send('Internal error')
	}
})

// Starting server
app.listen(port, async () => {
	const result = await pool.query('SELECT * FROM "activeStream" WHERE _id=1')
	activeStreamId = result.rows[0].streamId
	console.log('Active streamId', activeStreamId)
	console.log(`RR server listening at http://localhost:${port}`)
})
