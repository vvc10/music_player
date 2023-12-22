const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const cors = require('cors');


const app = express();
const PORT = 5000;

// Configure CORS
const corsOptions = {
    origin: 'http://localhost:3000',  // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,  // Include cookies when making requests
};

app.use(cors(corsOptions)); 

app.use(bodyParser.json());

app.post('/download', (req, res) => {
    const { url } = req.body;

    // Use the provided Python script to download the video
    const pythonScriptPath = 'src/backend/pyfile.py';
    const command = `python ${pythonScriptPath} ${url}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python script: ${error.message}`);
            return res.status(500).json({ error: 'Failed to download video.' });
        }
       
        console.log("running your url..");
        // Extract the downloaded video filename from the Python script's output
        const filename = stdout.trim().replace('Video ', '').replace(" downloaded successfully.", '');

        // Return the URL of the downloaded video
        const videoUrl = `http://localhost:5000/videos/${filename}`;
        res.json({ success: true, videoUrl });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
