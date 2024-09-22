const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const proyectController = require('../controllers/proyectController');

router.get('/', (req, res) => {
    const proyects = proyectController.getAllProyect();
    if (proyects.length > 0)
        res.status(200).json(proyects);
    else
        res.status(404).json({ code: 404, message: "Proyects not found" });
});

router.get('/:id', (req, res) => {
    const proyect = proyectController.getProyectById(req.params.id);
    if (proyect)
        res.status(200).json(proyect);
    else
        res.status(404).json({ code: 404, message: "Proyect not found" });
});


router.post('/', [
    body('name').notEmpty().withMessage('El campo "name" es obligatorio'),
    body('startDate').isISO8601().withMessage('El campo "startDate" debe estar en formato YYYY-MM-DD'),
    body('endDate').isISO8601().withMessage('El campo "endDate" debe estar en formato YYYY-MM-DD'),
    body('status').isIn(['pendiente', 'en progreso', 'completado']).withMessage('El campo "status" debe ser uno de: pendiente, en progreso, completado'),
    body('budget').isFloat({ gt: 0 }).withMessage('El campo "budget" debe ser un número positivo'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, description, startDate, endDate, status, teamMembers, budget } = req.body;
    const newProyect = proyectController.createProyect(name, description, startDate, endDate, status, teamMembers, budget);
    res.status(201).json(newProyect);
});


router.put('/:id', [
    body('name').notEmpty().withMessage('El campo "name" es obligatorio'),
    body('startDate').isISO8601().withMessage('El campo "startDate" debe estar en formato YYYY-MM-DD'),
    body('endDate').isISO8601().withMessage('El campo "endDate" debe estar en formato YYYY-MM-DD'),
    body('status').isIn(['pendiente', 'en progreso', 'completado']).withMessage('El campo "status" debe ser uno de: pendiente, en progreso, completado'),
    body('budget').isFloat({ gt: 0 }).withMessage('El campo "budget" debe ser un número positivo'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name, description, startDate, endDate, status, teamMembers, budget } = req.body;
    const updatedProyect = proyectController.updateProyect(id, name, description, startDate, endDate, status, teamMembers, budget);
    res.status(200).json(updatedProyect);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const deletedProyect = proyectController.deleteProyect(id);
    res.status(200).json(deletedProyect);
});

router.up

module.exports = router;
