# JSON Web Token Authentication Demo

This project demonstrates a complete authentication flow using **JSON Web Tokens (JWT)** implemented manually with Node.js. It features a layered backend architecture with secure token handling, user registration and login, and access control for protected resources.

## Features

- Manual JWT implementation using Node.js `crypto` module
- Access and refresh token mechanism with secure HTTP-only cookies
- Auto-refresh of expired access tokens via a dedicated `/refresh` endpoint
- EJS-rendered frontend: `/home`, `/register`, `/login`, `/protected`, `/refresh`
- Layered backend architecture: `Router → Controller → Service → DAL → Model`
- MongoDB persistence for Users and RefreshTokens
- Automatic RSA key generation on first server start

## Tech Stack

- **Backend Framework**: [Express](https://expressjs.com/)
- **Template Engine**: [EJS](https://ejs.co/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose.js](https://mongoosejs.com/)
- **Cookie Handling**: [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- **Environment Configuration**: [dotenv](https://www.npmjs.com/package/dotenv)
- **Token Cryptography**: Node.js [`crypto`](https://nodejs.org/api/crypto.html) (no external JWT library)

## Authentication Flow

1. **Registration**: Users create an account with a username and password.
2. **Login**: Valid users receive two tokens:
   - `access_token`: short-lived, used for protected routes.
   - `refresh_token`: long-lived, stored in the database and used to issue new access tokens.
3. **Protected Access**:
   - `access_token` is verified on each request to `/protected`.
   - If expired, the user is redirected to `/refresh`, where a new `access_token` is issued using the `refresh_token`.
4. **Logout**:
   - Deletes the user's `refresh_token` from the database, invalidating future refresh attempts.

## API Routes

| Method | Path         | Description                                   |
|--------|--------------|-----------------------------------------------|
| GET    | `/`          | Home page                                     |
| GET    | `/register`  | Registration form                             |
| POST   | `/register`  | Register a new user                           |
| GET    | `/login`     | Login form                                    |
| POST   | `/login`     | Authenticate user and set token cookies       |
| GET    | `/protected` | Protected resource, requires `access_token`   |
| GET    | `/refresh`   | Refresh access token, requires `refresh_token`|
| POST   | `/logout`    | Logout and revoke refresh token               |

## Database Schema

### `Users` Collection

- `name`: `String`, unique, required
- `hash`: `String`, required
- `salt`: `String`, required
- `dateCreated`: `Date`, default `Date.now`

### `RefreshTokens` Collection

- `userId`: `ObjectId` (refers to `Users`), required
- `value`: `String`, unique, required
- `expiresAt`: `Date`, with MongoDB TTL index (`expires: 0`), required
- `createdAt` and `updatedAt`: `Date`, set using Mongoose timestamps property (`timestamps: true`)

## Key Generation

On the first server start, the app automatically generates an RSA key pair:

- `private.pem`: used to **sign** JWTs
- `public.pem`: used to **verify** JWTs

These keys are stored in the `../keys/` directory and are reused for all token operations.

## Setup Instructions

1. **Clone the repository**:  
    git clone https://github.com/kostiantynKarzhanov/node-express_authentication_json-web-token.git  
    cd node-express_authentication_json-web-token  

2. **Install dependencies**:  
    npm install  

3. **Configure environment**:  
    Create a .env file in the root directory with the following content:  

    PORT = 3001  
    DB_STR_MONGO=mongodb://localhost/db_express_authentication  

    **# --- Environment Mode Configuration ---**  
    NODE_ENV=development  

    **# --- JWT Configuration ---**  
    JWT_ALG = RSA-SHA256  
    JWT_COOKIE_NAME = access_token  
    JWT_TTL_MS = 60000 # 1 minute in milliseconds  

    **# --- Refresh Token Configuration ---**  
    REFRESH_TOKEN_COOKIE_NAME = refresh_token  
    REFRESH_TOKEN_TTL_MS = 180000 # 3 minutes in milliseconds  

4. **Start the server**:  
    npm run dev  

5. **Access the app**:  
    http://localhost:3001  

## Project Structure  

|─ app  
├── config/  
├── controllers/  
├── dal/  
├── middleware/  
├── models/  
├── routes/  
├── services/  
├── utils/  
├── views/  
└── app.js  

├─ keys/           # Contains generated RSA key pair  
├─ .env  
└─ package.json  
