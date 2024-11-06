const { ref, set, get, remove, update } = require('firebase/database');
const db = require('../config/firebase');

// Controller untuk menangani operasi CRUD mahasiswa
const studentController = {
  // Membuat mahasiswa baru
  createStudent: async (req, res) => {
    try {
      const { npm, name, class: className } = req.body;
      
      // Cek apakah NPM sudah ada
      const snapshot = await get(ref(db, `students/${npm}`));
      if (snapshot.exists()) {
        return res.status(400).json({ message: 'NPM already registered' });
      }

      await set(ref(db, `students/${npm}`), {
        npm,
        name, 
        class: className
      });
      res.status(201).json({ message: 'Student added successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Mendapatkan semua mahasiswa
  getAllStudents: async (req, res) => {
    try {
      const snapshot = await get(ref(db, 'students'));
      const students = [];
      snapshot.forEach((child) => {
        students.push(child.val());
      });
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Mendapatkan mahasiswa berdasarkan NPM
  getStudentByNpm: async (req, res) => {
    try {
      const snapshot = await get(ref(db, `students/${req.params.npm}`));
      if (snapshot.exists()) {
        res.status(200).json(snapshot.val());
      } else {
        res.status(404).json({ message: 'Student not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Mengupdate data mahasiswa
  updateStudent: async (req, res) => {
    try {
      const { name, class: className } = req.body;
      const updates = {};
      if (name) updates.name = name;
      if (className) updates.class = className;
      
      await update(ref(db, `students/${req.params.npm}`), updates);
      res.status(200).json({ message: 'Student data updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Menghapus data mahasiswa
  deleteStudent: async (req, res) => {
    try {
      await remove(ref(db, `students/${req.params.npm}`));
      res.status(200).json({ message: 'Student data deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = studentController; 