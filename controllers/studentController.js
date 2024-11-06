const { ref, set, get, remove, update } = require('firebase/database');
const db = require('../config/firebase');

// Controller untuk menangani operasi CRUD mahasiswa
const studentController = {
  // Membuat mahasiswa baru
  createStudent: async (req, res) => {
    try {
      const { npm, name, class: className } = req.body;
      await set(ref(db, `students/${npm}`), {
        npm,
        name, 
        class: className
      });
      res.status(201).json({ message: 'Mahasiswa berhasil ditambahkan' });
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
        res.status(404).json({ message: 'Mahasiswa tidak ditemukan' });
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
      res.status(200).json({ message: 'Data mahasiswa berhasil diupdate' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Menghapus data mahasiswa
  deleteStudent: async (req, res) => {
    try {
      await remove(ref(db, `students/${req.params.npm}`));
      res.status(200).json({ message: 'Data mahasiswa berhasil dihapus' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = studentController; 