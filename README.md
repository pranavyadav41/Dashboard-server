# Employee Management System Backend

## Overview
This is the backend server for the Employee Management System. It provides API endpoints for managing employee data, supporting operations such as adding, editing, and deleting employee records.

## Features
- API endpoints for employee management
- CRUD operations for employee data
- Error handling with express-async-handler
- Cross-Origin Resource Sharing (CORS) enabled
- Environment variable management with dotenv

## Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose
- cors for handling Cross-Origin Resource Sharing
- dotenv for environment variable management
- express-async-handler for async error handling

## Prerequisites
- Node.js (latest LTS version recommended)
- npm (comes with Node.js)
- MongoDB
- Git

## Related Repositories
- Frontend Repository: https://github.com/pranavyadav41/Dashboard-client

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/pranavyadav41/Dashboard-server.git
   cd Dashboard-server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     CORS=your_frontend_url
     ```

## Running the Application

1. Start the server in development mode:
   ```
   npm run dev
   ```
   This will start the server using nodemon, which will automatically restart the server when file changes are detected.

2. For production, use:
   ```
   npm start
   ```

3. The server should now be running on `http://localhost:5000` (or the port you specified in the .env file)

## API Endpoints

The API provides endpoints for managing employee data. For detailed information about available endpoints and their usage, please refer to the API documentation or contact the project maintainers.

## Database

This application uses MongoDB as its database. The database schema is designed to store comprehensive employee information. For detailed schema information, please refer to the source code or contact the project maintainers.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
