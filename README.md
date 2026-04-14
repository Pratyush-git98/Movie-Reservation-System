# Movie Reservation System - Backend

A Node.js backend API for managing movie reservations, theatres, shows, and bookings. This system allows users to register, authenticate, browse movies, check show timings, and make reservations.

## Features

- **User Authentication**: JWT-based authentication with role-based access control (Admin, User)
- **User Management**: User registration, login, profile management
- **Movie Management**: Create and manage movie listings (Admin only)
- **Theatre Management**: Manage theatres and their details (Admin only)
- **Show Management**: Create and manage movie shows at different theatres
- **Booking System**: Users can browse shows and make movie reservations
- **Error Handling**: Comprehensive error handling and validation
- **Cookie-based Sessions**: Secure cookie management for user sessions
- **CORS Support**: Cross-origin resource sharing for frontend integration

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken), bcryptjs
- **Utilities**: dotenv, CORS, Cookie-Parser, Nodemon

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Pratyush-git98/Movie-Reservation-System.git
   cd Movie-Reservation-System
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment file**
   Create a `.env` file in the root directory:
   ```
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/movie-reservation
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   CORS_ORIGIN=http://localhost:3000
   ```

## Running the Application

### Development Mode

```bash
npm run dev
```

The server will start with hot-reload enabled via Nodemon at `http://localhost:8000`

### Production Mode

```bash
node index.js
```

## Project Structure

```
Movie Reservation System/
├── src/
│   ├── controllers/          # Request handlers for each feature
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── movie.controller.js
│   │   ├── show.controller.js
│   │   ├── theatre.controller.js
│   │   └── booking.controller.js
│   ├── routes/              # API route definitions
│   │   ├── auth.route.js
│   │   ├── user.route.js
│   │   ├── movie.route.js
│   │   ├── show.route.js
│   │   ├── theatre.route.js
│   │   └── booking.route.js
│   ├── models/              # Mongoose schemas
│   │   ├── user.model.js
│   │   ├── movie.model.js
│   │   ├── show.model.js
│   │   ├── theatre.model.js
│   │   └── booking.model.js
│   ├── middlewares/         # Custom middlewares
│   │   ├── auth.middleware.js      # JWT verification
│   │   ├── error.middleware.js     # Error handling
│   │   └── role.middleware.js      # Role-based access control
│   ├── utils/               # Utility functions
│   │   ├── apiError.js
│   │   ├── apiResponse.js
│   │   └── asyncHandler.js
│   ├── database/            # Database configuration
│   │   └── db.js
│   └── app.js               # Express app configuration
|-- .env.example             # required environment variables
├── index.js                 # Server entry point
├── package.json             # Project dependencies
└── README.md                # This file
```

## API Documentation

### Base URL

```
http://localhost:8000/api/v1
```

### Available Endpoints

#### Authentication Routes (`/auth`)

- **POST** `/register` - Register a new user
- **POST** `/login` - Login user
- **POST** `/logout` - Logout user

#### User Routes (`/users`)

- **GET** `/` - Get all users (Admin only)
- **GET** `/:id` - Get user profile
- **PUT** `/:id` - Update user profile
- **DELETE** `/:id` - Delete user (Admin only)

#### Movie Routes (`/movies`)

- **GET** `/` - Get all movies
- **GET** `/:id` - Get movie details
- **POST** `/` - Create movie (Admin only)
- **PUT** `/:id` - Update movie (Admin only)
- **DELETE** `/:id` - Delete movie (Admin only)

#### Theatre Routes (`/theatres`)

- **GET** `/` - Get all theatres
- **GET** `/:id` - Get theatre details
- **POST** `/` - Create theatre (Admin only)
- **PUT** `/:id` - Update theatre (Admin only)
- **DELETE** `/:id` - Delete theatre (Admin only)

#### Show Routes (`/shows`)

- **GET** `/` - Get all shows
- **GET** `/:id` - Get show details
- **POST** `/` - Create show (Admin only)
- **PUT** `/:id` - Update show (Admin only)
- **DELETE** `/:id` - Delete show (Admin only)

#### Booking Routes (`/bookings`)

- **GET** `/` - Get user bookings
- **GET** `/:id` - Get booking details
- **POST** `/` - Create new booking
- **PUT** `/:id` - Update booking
- **DELETE** `/:id` - Cancel booking

## Database Models

### User

- \_id, name, email, password, phone, role, createdAt, updatedAt

### Movie

- \_id, title, description, genre, duration, releaseDate, createdAt, updatedAt

### Theatre

- \_id, name, location, city, capacity, amenities, createdAt, updatedAt

### Show

- \_id, movieId, theatreId, showTime, availableSeats, totalSeats, price, createdAt, updatedAt

### Booking

- \_id, userId, showId, seatsBooked, totalPrice, bookingDate, status, createdAt, updatedAt

## Authentication

The API uses JWT tokens for authentication. Include the token in the request header:

```
Authorization: Bearer <your_jwt_token>
```

Tokens are also stored in secure HTTP-only cookies upon login.

## Error Handling

All errors follow a consistent format:

```json
{
  "success": false,
  "message": "Error message",
  "statusCode": 400
}
```
## License

This project is licensed under the ISC License - see the package.json file for details.

## Author

**Pratyush**

- GitHub: [Pratyush-git98](https://github.com/Pratyush-git98)
- Repository: [Movie-Reservation-System](https://github.com/Pratyush-git98/Movie-Reservation-System)

## Support

For support, please open an issue on the [GitHub Issues](https://github.com/Pratyush-git98/Movie-Reservation-System/issues) page.
