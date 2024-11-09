# AUTH+

**AUTH+** is a secure authentication system built with modern web technologies that allows users to register, log in, and update their profile with email verification via OTP (One-Time Password).<br>
Live Project Link: [Link](https://authplusapp.vercel.app)

## Features

- **Email Authentication via OTP**:  
  - **User Registration**: On successful registration, an OTP is sent to the user’s email for verification.
  - **Email Verification for Profile Update**: Users need to verify their email every time they update their profile data for added security.
  
- **Secure User Authentication**:  
  - Users can log in using their credentials after successful email verification.
  - JWT (JSON Web Token) is used to ensure secure communication between the frontend and backend.

- **CRUD Operations for User Data**:  
  - Users can update their name and other profile data after logging in.

## Tech Stack

### Frontend
- **React.js**: JavaScript library for building the user interface.
- **Vite**: Build tool for fast development.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: For making HTTP requests to the backend.
- **React Context API**: To manage authentication state globally across the app.

### Backend
- **Express.js**: Node.js framework to handle server-side logic.
- **MongoDB**: NoSQL database to store user data and authentication details.
- **Mongoose**: MongoDB ODM (Object Data Modeling) library.
- **JWT (JSON Web Token)**: To securely transmit data between frontend and backend.
- **Nodemailer (via Sendinblue)**: Used to send OTP emails for authentication.
- **CORS**: Cross-Origin Resource Sharing middleware to allow frontend requests from different domains.

### Email Verification via OTP
- **Sendinblue (Brevo)** is used to send OTPs to the users' email addresses during registration and profile updates.
- Users are required to verify their email with an OTP before they can proceed with login or updating profile data.

## Project Setup

### Frontend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/authplus.git
   ```
2. Navigate to the frontend folder:
```
cd frontend
```
3. Install the dependencies:
```
npm install
```
3.Create a .env file in the root of the frontend folder and add your backend API URL:
```
VITE_API_URL=https://authplusapp.vercel.app
```
4. Run the development server:
```
npm run dev
```
# Backend Setup

1.Navigate to the backend folder:

```
cd backend
```
2.Install the dependencies:
```
npm install
```
3.Create a .env file in the backend folder with the following environment variables:
```
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
EMAIL_API_KEY=your-sendinblue-api-key
FRONTEND_URL=http://localhost:5173
```
4.Start the backend server:
```
npm start
```
The backend will be available at http://localhost:5000.

API Endpoints
User Authentication
POST /register:
Registers a new user. Sends an OTP to the user's email for verification.

POST /login:
Logs in the user after successful email verification.

POST /verify:
Verifies the OTP sent to the user's email during registration.

POST /update:
Updates user profile data (e.g., name). Requires email verification via OTP.

Middleware for Protected Routes
JWT Authentication:
Protects routes like /api/users/update by requiring the user to pass a valid JWT token for accessing the route.

# Local Deployment
To run the app locally, use the instructions provided in the Project Setup section above.

# Screenshots
**User Registration**
![image](https://github.com/user-attachments/assets/766a05d1-ec70-44d2-b4cd-af3c6caf1e2b)

**User Login**
![image](https://github.com/user-attachments/assets/3232690a-9a07-4b44-ad0c-2ab6e2feee50)

**Profile Update**
![image](https://github.com/user-attachments/assets/9da34f69-7a7b-4c83-80b6-3ec99d5fb991)


**OTP Verification**
![image](https://github.com/user-attachments/assets/065aa494-5167-4ac7-95e7-95284f12cd7a)


# Contributing
Feel free to fork this repository, make improvements, or report issues! Contributions are always welcome.
Fork the repository.
Create a new branch.
Make your changes.
Create a pull request with a description of what you have done.
# License
This project is licensed under the MIT License - see the LICENSE file for details.

Notes
Be sure to replace the placeholders in .env files (your-mongodb-uri, your-jwt-secret, your-sendinblue-api-key, etc.) with actual values for production.
