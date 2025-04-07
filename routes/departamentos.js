const express = require('express');
const Departamento = require('../models/departamento'); 
const Area = require('../models/area'); 
const Encargado = require('../models/encargado')
const router = express.Router();

/**
 * @swagger
 * /api/departamentos:
 *   get:
 *     summary: Obtiene todos los departamentos
 *     tags: [Departamentos]
 *     responses:
 *       200:
 *         description: Lista de todos los departamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Departamento"
 */
router.get('/', async (req, res) => {
    try {
        const departamentos = await Departamento.find()
            .populate('area', 'name edificio')  
            .populate('encargado', 'estudio turno');
        res.status(200).json(departamentos);
    } catch (err) {
        res.status(500).json({ message: `Error al obtener los departamentos: ${err.message}` });
    }
});

/**
 * @swagger
 * /api/departamentos/{id}:
 *   get:
 *     summary: Obtiene un departamento por ID
 *     tags: [Departamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del departamento que se desea obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Departamento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Departamento"
 *       404:
 *         description: Departamento no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', async (req, res) => {
    try {
        const departamento = await Departamento.findById(req.params.id).populate('area encargado');
        if (!departamento) return res.status(404).json({ message: 'Departamento no encontrado' });
        res.status(200).json(departamento);
    } catch (err) {
        res.status(500).json({ message: `Error al obtener el departamento: ${err.message}` });
    }
});

/**
 * @swagger
 * /api/departamentos:
 *   post:
 *     summary: Crea un nuevo departamento
 *     tags: [Departamentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Departamento"
 *           example:
 *             name: "Finanzas"
 *             area: "660c8e5b9f8a95e8fddbfcc1"
 *             encargado: "660c8e6a9f8a95e8fddbfcc5"
 *     responses:
 *       201:
 *         description: Departamento creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Departamento"
 *       400:
 *         description: Error de validación
 */
router.post('/', async (req, res) => {
    const { name, area, encargado } = req.body;

    if (!name || !area || !encargado) {
        return res.status(400).json({ message: "Faltan campos obligatorios: name, area o encargado." });
    }

    try {
        const nuevoDepartamento = new Departamento({ name, area, encargado });
        const departamentoGuardado = await nuevoDepartamento.save();
        res.status(201).json(departamentoGuardado);
    } catch (err) {
        res.status(500).json({ message: `Error al crear el departamento: ${err.message}` });
    }
});

/**
 * @swagger
 * /api/departamentos/{id}:
 *   put:
 *     summary: Actualiza un departamento
 *     tags: [Departamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del departamento que se desea actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Departamento"
 *           example:
 *             name: "Recursos Humanos"
 *             area: "660c8e5b9f8a95e8fddbfcc2"
 *             encargado: "660c8e6a9f8a95e8fddbfcc6"
 *     responses:
 *       200:
 *         description: Departamento actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Departamento"
 *       404:
 *         description: Departamento no encontrado
 *       400:
 *         description: Error de validación
 */
router.put('/:id', async (req, res) => {
    try {
        const departamento = await Departamento.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!departamento) return res.status(404).json({ message: 'Departamento no encontrado' });
        res.status(200).json(departamento);
    } catch (err) {
        res.status(400).json({ message: `Error al actualizar el departamento: ${err.message}` });
    }
});

/**
 * @swagger
 * /api/departamentos/{id}:
 *   delete:
 *     summary: Elimina un departamento por ID
 *     tags: [Departamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del departamento que se desea eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Departamento eliminado
 *       404:
 *         description: Departamento no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', async (req, res) => {
    try {
        const departamento = await Departamento.findByIdAndDelete(req.params.id);
        if (!departamento) return res.status(404).json({ message: 'Departamento no encontrado' });
        res.status(200).json({ message: 'Departamento eliminado' });
    } catch (err) {
        res.status(500).json({ message: `Error al eliminar el departamento: ${err.message}` });
    }
});

module.exports = router;
