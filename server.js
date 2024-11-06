const express = require('express');
const studentRoutes = require('./routes/students');

const app = express();
app.use(express.json());

app.use('/api/students', studentRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
