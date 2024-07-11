# Wanderlust

## Project Overview

Wanderlust is a web application designed to help travelers share and explore travel experiences. Users can create accounts, log in, and post about their travels, including descriptions and photos. The application leverages modern web development technologies and best practices to ensure a smooth and secure user experience.

## Website PDF

You can view the PDF of my website [here](https://github.com/Mohit-Kucheriya/MajorProject/blob/58c9497b2422a9950579ef000a78d68cdff4f78c/Wanderlust.pdf).


## Visit the Website

Check out the live application here: [Wanderlust](https://wanderlust-srtn.onrender.com/listings)

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS (Embedded JavaScript Templates)
- **Database**: MongoDB
- **Authentication**: Passport.js
- **Middleware**: Various npm packages

## Features

1. **User Authentication**:
   - Secure user registration and login using Passport.js.
   - Passwords are hashed and stored securely.

2. **CRUD Operations**:
   - Users can create, read, update, and delete travel posts.
   - Posts include text descriptions and images.

3. **Dynamic Content Rendering**:
   - EJS templates render dynamic content on the server side.

4. **RESTful API**:
   - Follows REST principles for organizing routes and handling HTTP requests.

## Key NPM Packages and Middleware

1. **Express.js**:
   - Web framework for Node.js.
   - Manages routing, request handling, and server-side logic.

2. **Mongoose**:
   - ODM (Object Data Modeling) library for MongoDB.
   - Simplifies data validation, casting, and business logic.

3. **Passport.js**:
   - Middleware for authentication.
   - Supports multiple authentication strategies.

4. **Body-Parser**:
   - Middleware to parse incoming request bodies.
   - Supports JSON and URL-encoded data.

5. **Express-Session**:
   - Middleware to manage session data.
   - Stores session data on the server.

6. **Method-Override**:
   - Allows use of HTTP verbs such as PUT or DELETE in places where the client doesn't support it.

7. **Connect-Flash**:
   - Provides flash messages.
   - Useful for displaying error or success messages to users.

## Project Structure

- **/models**: Contains Mongoose models.
- **/routes**: Defines application routes.
- **/views**: EJS templates for rendering HTML.
- **/public**: Static assets (CSS, JavaScript, images).
- **/config**: Configuration files for Passport and other settings.
