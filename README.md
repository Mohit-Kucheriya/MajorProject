# Project Overview
Wanderlust is a web application designed to help travelers share and explore travel experiences. Users can create accounts, log in, and post about their travels, including descriptions and photos. 
The application leverages modern web development technologies and best practices to ensure a smooth and secure user experience.

# Tech Stack
a. Backend: Node.js, Express.js
b. Frontend: EJS (Embedded JavaScript Templates)
c. Database: MongoDB
d. Authentication: Passport.js
e. Middleware: Various npm packages

# Features
1.User Authentication:
a. Secure user registration and login using Passport.js.
b. Passwords are hashed and stored securely.

2.CRUD Operations:
a. Users can create, read, update, and delete travel posts.
b. Posts include text descriptions and images.

3. Dynamic Content Rendering:
EJS templates render dynamic content on the server side.

4. RESTful API:
Follows REST principles for organizing routes and handling HTTP requests.

# Key NPM Packages and Middleware
1. Express.js:
a. Web framework for Node.js.
b. Manages routing, request handling, and server-side logic.

2. Mongoose:
a. ODM (Object Data Modeling) library for MongoDB.
b. Simplifies data validation, casting, and business logic.

3. Passport.js:
a. Middleware for authentication.
b. Supports multiple authentication strategies.

4. Body-Parser:
a. Middleware to parse incoming request bodies.
b. Supports JSON and URL-encoded data.

5. Express-Session:
a. Middleware to manage session data.
b. Stores session data on the server.

6. Method-Override:
Allows use of HTTP verbs such as PUT or DELETE in places where the client doesn't support it.

7. Connect-Flash:
a.Provides flash messages.
b. Useful for displaying error or success messages to users.

# Project Structure
a. /models: Contains Mongoose models.
b. /routes: Defines application routes.
c. /views: EJS templates for rendering HTML.
d. /public: Static assets (CSS, JavaScript, images).
e. /config: Configuration files for Passport and other settings.
