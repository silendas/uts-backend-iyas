const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/students');

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));

app.use('/api/students', studentRoutes);

// Handle 404 - Route not found
app.use((req, res) => {
  res.status(404).json({ message: 'Route tidak ditemukan' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
