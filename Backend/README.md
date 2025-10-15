# SelfShip Backend

This backend project uses Node.js and Express to provide a simple server setup.

## Files

### `app.js`
- Sets up an Express application.
- Defines a sample route at `/` that returns a greeting.

### `server.js`
- Creates an HTTP server using the Express app from `app.js`.
- Listens on port `4000` by default or the port specified in the `PORT` environment variable.

## Getting Started

### Prerequisites
- Node.js installed

### Installation

```bash
npm install
```

### Running the Server

```bash
node server.js
```

The server will start on [http://localhost:4000](http://localhost:4000) by default.

### Example Request

```bash
curl http://localhost:4000/
```

Response:
```
Hello from Express app.js!
```
