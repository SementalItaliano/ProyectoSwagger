const express = require('express');
const Encargado = require('../models/encargado');

const router = express.Router();

/**
 * @swagger
 * /api/encargados:
 *   get:
 *     summary: Obtiene todos los encargados
 *     tags: [Encargados]
 *     responses:
 *       200:
 *         description: Lista de todos los encargados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Encargado"
 */
router.get('/', async (req, res) => {
    try {
        const encargados = await Encargado.find();
        res.status(200).json(encargados);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /api/encargados/{id}:
 *   get:
 *     summary: Obtiene un encargado por ID
 *     tags: [Encargados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del encargado que se desea obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Encargado encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Encargado"
 *       404:
 *         description: Encargado no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', async (req, res) => {
    try {
        const encargado = await Encargado.findById(req.params.id);
        if (!encargado) return res.status(404).json({ message: 'Encargado no encontrado' });
        res.status(200).json(encargado);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /api/encargados:
 *   post:
 *     summary: Crea un nuevo encargado
 *     tags: [Encargados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Encargado"
 *     responses:
 *       201:
 *         description: Encargado creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Encargado"
 *       400:
 *         description: Error de validación
 */
router.post('/', async (req, res) => {
    const { name, estudio, turno } = req.body;

    try {
        const encargado = new Encargado({ name, estudio, turno });
        await encargado.save();
        res.status(201).json(encargado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /api/encargados/{id}:
 *   put:
 *     summary: Actualiza un encargado
 *     tags: [Encargados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del encargado que se desea actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Encargado"
 *     responses:
 *       200:
 *         description: Encargado actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Encargado"
 *       404:
 *         description: Encargado no encontrado
 *       400:
 *         description: Error de validación
 */
router.put('/:id', async (req, res) => {
    const { id } = req.params;

    // Validación de ID de MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID no válido' });
    }

    try {
        // Actualización del encargado
        const encargado = await Encargado.findByIdAndUpdate(id, req.body, { new: true });
        if (!encargado) return res.status(404).json({ message: 'Encargado no encontrado' });
        res.status(200).json(encargado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


/**
 * @swagger
 * /api/encargados/{id}:
 *   delete:
 *     summary: Elimina un encargado por ID
 *     tags: [Encargados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del encargado que se desea eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Encargado eliminado
 *       404:
 *         description: Encargado no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    // Validación de ID de MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID no válido' });
    }

    try {
        // Eliminación del encargado
        const encargado = await Encargado.findByIdAndDelete(id);
        if (!encargado) return res.status(404).json({ message: 'Encargado no encontrado' });
        res.status(200).json({ message: 'Encargado eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
