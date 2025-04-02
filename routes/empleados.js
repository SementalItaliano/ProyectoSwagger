const express = require('express');
const Empleado = require('../models/empleado');

const router = express.Router();

/**
 * @swagger
 * /api/empleados:
 *   get:
 *     description: Obtiene todos los empleados
 *     responses:
 *       200:
 *         description: Lista de empleados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Empleado'
 */
router.get('/', async (req, res) => {
    try {
        const empleados = await Empleado.find().populate('departamentos');
        res.status(200).json(empleados);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /api/empleados/{id}:
 *   get:
 *     description: Obtiene un empleado por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del empleado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del empleado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empleado'
 *       404:
 *         description: No se encuentra el empleado
 */
router.get('/:id', async (req, res) => {
    try {
        const empleado = await Empleado.findById(req.params.id).populate('departamentos');
        if (!empleado) return res.status(404).json({ message: 'Empleado no encontrado' });
        res.status(200).json(empleado);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /api/empleados:
 *   post:
 *     description: Crea un nuevo empleado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - apellido
 *               - edad
 *               - genero
 *               - departamentos
 *             properties:
 *               name:
 *                 type: string
 *               apellido:
 *                 type: string
 *               edad:
 *                 type: number
 *               genero:
 *                 type: string
 *               departamentos:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Empleado creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empleado'
 *       400:
 *         description: Error de validación
 */
router.post('/', async (req, res) => {
    const { name, apellido, edad, genero, departamentos } = req.body;

    try {
        const empleado = new Empleado({ name, apellido, edad, genero, departamentos });
        await empleado.save();
        res.status(201).json(empleado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /api/empleados/{id}:
 *   put:
 *     description: Actualiza un empleado por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del empleado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               apellido:
 *                 type: string
 *               edad:
 *                 type: number
 *               genero:
 *                 type: string
 *               departamentos:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Empleado actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empleado'
 *       404:
 *         description: Empleado no encontrado
 *       400:
 *         description: Error de validación
 */
router.put('/:id', async (req, res) => {
    try {
        const empleado = await Empleado.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!empleado) return res.status(404).json({ message: 'Empleado no encontrado' });
        res.status(200).json(empleado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /api/empleados/{id}:
 *   delete:
 *     description: Elimina un empleado por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del empleado
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Empleado eliminado
 *       404:
 *         description: Empleado no encontrado
 */
router.delete('/:id', async (req, res) => {
    try {
        const empleado = await Empleado.findByIdAndDelete(req.params.id);
        if (!empleado) return res.status(404).json({ message: 'Empleado no encontrado' });
        res.status(200).json({ message: 'Empleado eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
