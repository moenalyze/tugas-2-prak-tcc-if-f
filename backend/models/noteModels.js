const Note = require("../schema/Note");

const findAll = async () => await Note.findAll();
const create = async (data) => await Note.create(data);
const findById = async (id) => await Note.findByPk(id);
const updateById = async (id, data) => await Note.update(data, { where: { id: id } });
const deleteById = async (id) => await Note.destroy({ where: { id: id } });

module.exports = { findAll, create, findById, updateById, deleteById };