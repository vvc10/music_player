// // server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const Music = require('./models/Music')
// const app = express();
// const port = 3001;

// mongoose.connect('mongodb://localhost:27017/your-database-name', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// app.get('/api/music', async (req, res) => {
//     try {
//       const musicList = await Music.find();
//       res.json(musicList);
//     } catch (error) {
//       console.error('Error fetching music data:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
  
//   app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//   });