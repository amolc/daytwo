const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the 'static' directory within templates
app.use('/static', express.static(path.join(__dirname, 'templates', 'static')));

// Serve the 'templates' directory within backend as a static root folder
app.use(express.static(path.join(__dirname, 'templates')));

// For any other request, send the index.html from backend/templates
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

app.listen(port, () => {
    console.log(`Express server starting at http://localhost:${port}`);
    console.log(`Serving templates from: ${path.join(__dirname, 'templates')}`);
    console.log(`Serving static files from: ${path.join(__dirname, 'templates', 'static')}`);
});
