# SelfShip Backend

Overview
- SelfShip Backend is a Node.js + Express REST API that manages shippers, drivers, orders, matches and payments.
- MongoDB (via mongoose) is used for persistence.
- Stripe is used for payment intents.
- Primary entry: `server.js` (creates HTTP server). Express app defined in `app.js`.

Quick file references
- app.js — Express app, routes, middleware, example root route.
- server.js — starts HTTP server and calls DB connect.
- config/db.js — MongoDB connection helper.
- services/* — business integrations (aiMatch, payments).
- models/* — Mongoose models (User.js, order.js, Payment.js, Driver.js).
- controllers/* — request handlers for auth, orders, payments, matching.
- routes/* — route definitions.
- middleware/* — error and auth middleware.

Environment variables
Create a `.env` file in the project root with at minimum:
- MONGO_URI=
- JWT_SECRET=
- PORT=4000
- STRIPE_SECRET_KEY=

Installation
1. Clone repo
2. From the backend folder:
   npm install

Run (development)
- Start server:
  node server.js
- Default server URL: http://localhost:5000/
- Root test route:
  curl http://localhost:5000/
  Response:
  {
    "message": "Hello from Express app.js!" // example
  }

Database
- config/db.js connects mongoose to MONGO_URI.
- Ensure MongoDB is running locally or provide a cloud Mongo URI.

API Endpoints (summary)
- Auth
  - POST http://localhost:5000/api/auth/register
    Payload: { "username", "email", "password", "role?" }
    Returns: { success, token, user }
  - POST http://localhost:5000/api/auth/login
    Payload: { "email", "password" }
    Returns: { success, token, user }

- Orders (protected)
  - POST http://localhost:5000/api/orders/createOrder
    Payload: { pickupLocation, deliveryLocation, cargoType, weight, price }
    Returns: created order
  - GET http://localhost:5000/api/orders/getOrder
    Returns: list of orders

- Match (protected)
  - POST /api/match
    Payload: { orderId }
    Returns: matches (drivers)

- Payments (protected)
  - POST /api/payments
    Payload: { orderId, amount }
    Returns: clientSecret and payment record

Notes on authentication
- API uses JWT. Send header:
  Authorization: Bearer <token>
- The User model issues JWT via user.generateJWT().

Models — quick reference
- models/User.js
  - Fields: username (String, unique), email (String, unique), password (String, select:false), role (String, default 'user')
  - Hooks: pre-save password hashing with bcrypt
  - Methods: comparePassword(enteredPassword), generateJWT()
  - Usage: for login, query with .select('+password') to compare.

- models/order.js
  - Fields: shipperId, pickupLocation, deliveryLocation, cargoType, weight, price, status
  - Timestamps added (createdAt, updatedAt)

- models/Payment.js
  - Fields: orderId, amount, method, status, stripeIntentId
  - Timestamps added

- models/Driver.js
  - Fields: userId, vehicleType, capacity, cargoTypes (string list expected), available (Boolean), location

Development recommendations
- Remove confirmPassword field from persisted user records; validate match on incoming payload and do not save it.
- When using password-protected operations, always query for +password.
- Normalize user IDs across models (ObjectId) instead of Number for consistency.

Testing
- Tests can be written with Jest + Supertest for route-level testing.
- Example package.json script:
  "scripts": {
    "test": "jest --runInBand"
  }

Example Jest tests (place in tests/ and adapt imports):

- tests/auth.test.js (example)
```javascript
// example: tests/auth.test.js
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

beforeAll(async () => {
  // optional: connect to test DB or mock
});

afterAll(async () => {
  await mongoose.connection.close();
});

test('Register -> responds with token and user', async () => {
  const res = await request(app)
    .post('/api/auth/register')
    .send({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123'
    });
  expect(res.statusCode).toBe(201);
  expect(res.body).toHaveProperty('token');
  expect(res.body.user.email).toBe('testuser@example.com');
});
```

Expected output for register test (successful)
```
PASS tests/auth.test.js
  ✓ Register -> responds with token and user (xx ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
```

- tests/order.test.js (example)
```javascript
// example: tests/order.test.js
const request = require('supertest');
const app = require('../app');

let token;

beforeAll(async () => {
  // Option 1: create a test user and login to obtain token
  const reg = await request(app).post('/api/auth/register').send({
    username: 'orderuser',
    email: 'orderuser@example.com',
    password: 'password123'
  });
  token = reg.body.token;
});

test('Create order -> returns order', async () => {
  const res = await request(app)
    .post('/api/orders')
    .set('Authorization', `Bearer ${token}`)
    .send({
      pickupLocation: 'A',
      deliveryLocation: 'B',
      cargoType: 'general',
      weight: 100,
      price: 250
    });
  expect(res.statusCode).toBe(200);
  expect(res.body.order).toHaveProperty('_id');
  expect(res.body.order.price).toBe(250);
});
```

Expected output (successful)
```
PASS tests/order.test.js
  ✓ Create order -> returns order (xx ms)
```

- tests/payment.test.js (example)
```javascript
// example: tests/payment.test.js
const request = require('supertest');
const app = require('../app');

test('Create payment -> returns clientSecret and payment', async () => {
  // assume orderId 123 exists in test DB
  const res = await request(app)
    .post('/api/payments')
    .set('Authorization', `Bearer <valid-token>`)
    .send({ orderId: 123, amount: 50 });
  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty('clientSecret');
  expect(res.body.payment).toHaveProperty('amount', 50);
});
```

Expected output (successful)
```
PASS tests/payment.test.js
  ✓ Create payment -> returns clientSecret and payment (xx ms)
```

Troubleshooting & common fixes
- If server fails at db connect: verify MONGO_URI and that MongoDB is reachable.
- If JWT generation fails: ensure JWT_SECRET is set.
- If routes return 404: confirm correct route file names and route registration in app.js.
- For Stripe errors: ensure STRIPE_SECRET_KEY is valid and environment accessible.

Appendix: app.js and server.js (what they do)
- app.js: loads environment, express, middleware, routes, root route, and registers error handler.
- server.js: imports app, connects DB (config/db.js), creates HTTP server, listens on PORT.

Change log
- README extended with detailed steps, sample tests, and expected outputs.
