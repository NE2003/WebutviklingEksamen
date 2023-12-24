const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const path = require('path');
const app = express();

const PORT = 22; // Choose any port you prefer

app.use(express.static(path.join(__dirname, 'public')));


// MongoDB connection
const dbPath = 'mongodb+srv://NE2003:AvholdeKoloni3@cluster0.6gmmrpf.mongodb.net/Javascript';
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbPath, dbOptions).then(()=>{
  console.log(`We are connected to our database ${dbPath}`);
}).catch((error)=>{
  console.log(`We are note able to connect to our database: ${error}`);
});

// Define a MongoDB schema and model
const MessageSchema = new mongoose.Schema({
  name: String,
  Subject: String,
  message: String,
});

const Message = mongoose.model('Message', MessageSchema);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve your HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/about.html'); // Replace with the path to your HTML file
});

// Handle form submission
app.post('/sendMessage', async (req, res) => {
  try {
    const { name, Subject, message } = req.body;

    console.log('Submitted Data:', { name, Subject, message }); // Log the submitted data


    // Save the form data to MongoDB
    const newMessage = new Message({ name, Subject, message });
    await newMessage.save();

    // Send a response to the client
    res.send('Message saved successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//app.listen(PORT, () => {
  //console.log(`Server is running on http://localhost:${PORT}`);
//})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});