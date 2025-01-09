# Crypto Wallet Back-End

## Description

This is the back-end for a Crypto Wallet application, built with **Node.js**, **Express.js**, and **MongoDB**. Users can log in, save tokens, and perform transactions. The back-end handles authentication, storing tokens securely, and tracking transaction history.

---

## Features

- **User Authentication**: Users can register and log in using JWT-based authentication.
- **Token Management**: Users can view, add, and manage their crypto tokens.
- **Transaction History**: All user transactions are tracked and stored securely in the database.
- **Secure Passwords**: Passwords are hashed and salted before being stored in the database for security.

---

## Technologies Used

- **Node.js**: JavaScript runtime for building the back-end.
- **Express.js**: Web framework for handling HTTP requests and routing.
- **MongoDB**: NoSQL database for storing user data, tokens, and transactions.
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **Bcrypt.js**: For hashing and salting user passwords.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.

---

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (can use MongoDB Atlas for a cloud database)

### Steps to Install

1. Clone the repository:

    ```bash
    gh repo clone Ajju0211/back-end
    cd back-end
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:
   
    Create a `.env` file in the root directory with the following environment variables:

    ```env
    MONGO_URI=your_mongo_connection_string
    JWT_SECRET=your_jwt_secret_key
    PORT=5000
    ```

4. Start the server:

    ```bash
    npm start
    ```

    The server will run on `http://localhost:5000`.

---

## API Endpoints

### Authentication


## Security Considerations

- **JWT Authentication**: All endpoints (except for registration and login) require a valid JWT token for access.
- **Password Hashing**: Passwords are hashed using bcrypt before they are stored in the database.
- **Secure API Communication**: Make sure to use HTTPS in production to secure communication between clients and the server.

---

## Deployment

### Steps to Deploy

1. **MongoDB Setup**: Set up a MongoDB instance (MongoDB Atlas is recommended for cloud-based databases). Add the connection string to the `.env` file.
2. **Server Deployment**: You can deploy the server on any platform like Heroku, DigitalOcean, or AWS. Make sure to configure environment variables for production.
3. **Secure the API**: Use HTTPS and ensure the JWT_SECRET is kept safe in production environments.

---


## Contributing

If you'd like to contribute to this project, feel free to open a pull request. Please ensure to follow the project's coding standards and write tests for any new features.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Example `.env` file:

```env
MONGO_URI=mongodb+srv://your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
