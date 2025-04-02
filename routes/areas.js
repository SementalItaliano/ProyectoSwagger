const express = require('express');
const Area = require('../models/area');

const router = express.Router();

/**
 * @swagger
 * /api/areas:
 *   get:
 *     summary: Obtiene todas las áreas
 *     tags: [Áreas]
 *     responses:
 *       200:
 *         description: Lista de todas las áreas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Area"
 */
router.get('/', async (req, res) => {
    try {
        const areas = await Area.find();
        res.status(200).json(areas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /api/areas/{id}:
 *   get:
 *     summary: Obtiene un área por ID
 *     tags: [Áreas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del área que se desea obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Área encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Area"
 *       404:
 *         description: Área no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', async (req, res) => {
    try {
        const area = await Area.findById(req.params.id);
        if (!area) return res.status(404).json({ message: 'Área no encontrada' });
        res.status(200).json(area);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /api/areas:
 *   post:
 *     summary: Crea una nueva área
 *     tags: [Áreas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Area"
 *     responses:
 *       201:
 *         description: Área creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Area"
 *       400:
 *         description: Error de validación
 */
router.post('/', async (req, res) => {
    const { name, edificio } = req.body;

    try {
        const area = new Area({ name, edificio });
        await area.save();
        res.status(201).json(area);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /api/areas/{id}:
 *   put:
 *     summary: Actualiza una área
 *     tags: [Áreas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del área que se desea actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Area"
 *     responses:
 *       200:
 *         description: Área actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Area"
 *       404:
 *         description: Área no encontrada
 *       400:
 *         description: Error de validación
 */
router.put('/:id', async (req, res) => {
    try {
        const area = await Area.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!area) return res.status(404).json({ message: 'Área no encontrada' });
        res.status(200).json(area);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /api/areas/{id}:
 *   delete:
 *     summary: Elimina una área por ID
 *     tags: [Áreas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del área que se desea eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Área eliminada
 *       404:
 *         description: Área no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', async (req, res) => {
    try {
        const area = await Area.findByIdAndDelete(req.params.id);
        if (!area) return res.status(404).json({ message: 'Área no encontrada' });
        res.status(200).json({ message: 'Área eliminada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router