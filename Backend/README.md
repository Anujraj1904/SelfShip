# SelfShip Backend

This backend project uses Node.js and Express to provide a simple server setup.

## Files

### `app.js`
- Sets up an Express application.
- Defines a sample route at `/` that returns a greeting.

### `server.js`
- Creates an HTTP server using the Express app from `app.js`.
- Listens on port `4000` by default or the port specified in the `PORT` environment variable.

## Project Structure

```
backend/
│
├── app.js                     # Express app setup (middleware, routes)
├── server.js                  # Entry point (starts the server)
│
├── config/
│   ├── db.js                  # PostgreSQL or Sequelize/Prisma connection
│   ├── stripe.js              # Stripe Connect setup
│   ├── aws.js                 # AWS credentials (if used for storage)
│   └── env.js                 # Environment variable loader
│
├── models/                    # Database schemas / ORM models
│   ├── User.js
│   ├── Company.js
│   ├── Vehicle.js
│   ├── Order.js
│   ├── Match.js
│   ├── Payment.js
│   └── ChatMessage.js
│
├── controllers/               # Business logic per feature
│   ├── authController.js
│   ├── orderController.js
│   ├── matchController.js
│   ├── paymentController.js
│   ├── driverController.js
│   ├── companyController.js
│   └── chatController.js
│
├── routes/                    # API routes
│   ├── authRoutes.js
│   ├── orderRoutes.js
│   ├── matchRoutes.js
│   ├── paymentRoutes.js
│   ├── driverRoutes.js
│   ├── companyRoutes.js
│   └── chatRoutes.js
│
├── middleware/                # Auth, error, logging
│   ├── authMiddleware.js
│   ├── errorHandler.js
│   └── verifyRole.js
│
├── services/                  # External API integrations
│   ├── aiMatchService.js      # Rule-based AI matching logic (v0)
│   ├── routeService.js        # Google Maps + traffic/weather
│   ├── paymentService.js      # Stripe escrow handling
│   ├── chatService.js         # Twilio or WebSocket
│   └── notificationService.js # Email/SMS/push notifications
│
├── utils/                     # Helper functions
│   ├── logger.js
│   ├── validator.js
│   └── responseHandler.js
│
├── tests/                     # Unit & integration tests
│   ├── auth.test.js
│   ├── order.test.js
│   ├── payment.test.js
│   └── aiMatch.test.js
│
└── package.json
```

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
