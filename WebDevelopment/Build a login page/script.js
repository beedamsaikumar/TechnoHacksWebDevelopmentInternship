document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Perform input validation here if needed

    // Hash the password before sending it to the server
    var hashedPassword = sha256(password); // Example: Use a hashing library like sha256.js

    // Send username and hashedPassword to the server for authentication
    // Example: You can use AJAX or fetch API to send the data to the server
});
const express = require('express');
const sha256 = require('sha256');
const app = express();
const port = 3000;

// Dummy user data (you should use a database instead)
const users = [
    { username: 'user1', passwordHash: sha256('password1') },
    { username: 'user2', passwordHash: sha256('password2') }
];

// Middleware to parse JSON bodies
app.use(express.json());

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Find user by username
    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check password
    if (user.passwordHash !== sha256(password)) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Authentication successful
    res.json({ message: 'Login successful' });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
