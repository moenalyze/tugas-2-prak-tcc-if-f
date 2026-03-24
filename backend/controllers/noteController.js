const noteModel = require("../models/noteModels");

const getAllNotes = async (req, res) => {
  try {
    const notes = await noteModel.findAll();
    res.json({ data: notes });
  } catch (error) { res.status(500).json({ error: error.message }); }
};

const createNote = async (req, res) => {
  const { judul, isi } = req.body;
  try {
    const newNote = await noteModel.create({ judul, isi });
    res.json({ message: "Catatan dibuat", data: newNote });
  } catch (error) { res.status(400).json({ error: error.message }); }
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  const { judul, isi } = req.body;
  try {
    await noteModel.updateById(id, { judul, isi });
    res.json({ message: "Catatan diupdate" });
  } catch (error) { res.status(500).json({ error: error.message }); }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    await noteModel.deleteById(id);
    res.json({ message: "Catatan dihapus" });
  } catch (error) { res.status(500).json({ error: error.message }); }
};

module.exports = { getAllNotes, createNote, updateNote, deleteNote };