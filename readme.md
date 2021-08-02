# RR Server

# Usage

Add password to .env file as AUTH=password

```jsx
npm install
node app.js
```

# API Documentation

## All Streams

**URL** `/allstreams`

**METHOD** `GET`

**Success Response `200`**

```jsx
;[
	{
		streamName: 'Malayalam',
		mediaLink: 'http://google.com',
		infoLink: 'http://google.com',
		_id: '1RK50YjlBiZn39TC',
	},
	{
		streamName: 'English',
		mediaLink: 'http://google.com',
		infoLink: 'http://google.com',
		_id: 'P6cfa8q35qPSrqRa',
	},
	{
		streamName: 'Hindi',
		mediaLink: 'http://google.com',
		infoLink: 'http://google.com',
		_id: 'uHdBsxA1Tnyj7pco',
	},
]
```

**Error Response**

`500` Internal error

## Stream Url

**URL** `/streamurl`

**METHOD** `GET`

**Success Response `200`**

```jsx
{
  "streamName": "English",
  "mediaLink": "http://google.com",
  "infoLink": "http://google.com",
  "_id": "P6cfa8q35qPSrqRa"
}
```

**Error Response**

`500` Internal error

## Set Active Stream

**URL** `/setactivestream`

**METHOD** `POST`

**HEADER** `Authorization: passowrd`

**Body**

```jsx
{
  "_id": "5lieE8sc1hB5kTip"
}
```

**Success Response**

\***\*`200` \*\*** Active stream set

**Error Response**

`400` No stream id given

`401` No credentials sent

`403` Incorrect credentials

`500` Internal error

## Create Stream

**URL** `/createstream`

**METHOD** `POST`

**HEADER** `Authorization: passowrd`

**Body**

```jsx
{
  "streamName": "English",
  "mediaLink": "http://google.com",
  "infoLink": "http://google.com",
}
```

**Success Response `200`**

```jsx
{
  "streamName": "English",
  "mediaLink": "http://google.com",
  "infoLink": "http://google.com",
  "_id": "5lieE8sc1hB5kTip"
}
```

**Error Response**

`401` No credentials sent

`403` Incorrect credentials

`500` Internal error

## Update Stream

**URL** `/updatestream`

**METHOD** `POST`

**HEADER** `Authorization: passowrd`

**Body**

```jsx
{
  "_id": "5lieE8sc1hB5kTip"
  "streamName": "English",
  "mediaLink": "http://google.com",
  "infoLink": "http://google.com",
}
```

**Success Response `200`**

```jsx
{
  "streamName": "English",
  "mediaLink": "http://google.com",
  "infoLink": "http://google.com",
  "_id": "5lieE8sc1hB5kTip"
}
```

**Error Response**

`400` No stream id given

`404` Stream not found

`401` No credentials sent

`403` Incorrect credentials

`500` Internal error

## Delete Stream

**URL** `/deletestream`

**METHOD** `POST`

**HEADER** `Authorization: passowrd`

**Body**

```jsx
{
  "_id": "5lieE8sc1hB5kTip"
}
```

**Success Response**

\***\*`200` \*\*** Stream deleted

**Error Response**

`400` No stream id given

`404` Stream not found

`401` No credentials sent

`403` Incorrect credentials

`500` Internal error

# Developer Contact

**Emanuel Christo**

😺 [GitHub](http://github.com/emanuelchristo)

✉️ emanuelchristochris@gmail.com
