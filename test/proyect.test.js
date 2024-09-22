const request = require('supertest');
const app = require('express');

describe('POST /tasks', () => {
    test('Debería crear una tarea con datos válidos', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({
                name: "Tarea 1",
                startDate: "2024-09-01",
                endDate: "2024-09-10",
                status: "pendiente",
                budget: 100
            });

        expect(response.statusCode).toBe(201); // Cambiado a 201 para creación
        expect(response.body.name).toBe("Tarea 1");
        expect(response.body.startDate).toBe("2024-09-01");
        expect(response.body.endDate).toBe("2024-09-10");
        expect(response.body.status).toBe("pendiente");
        expect(response.body.budget).toBe(100);
    });

    test('Debería devolver error si el campo "name" está vacío', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({
                name: "",
                startDate: "2024-09-01",
                endDate: "2024-09-10",
                status: "pendiente",
                budget: 100
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.errors[0].msg).toBe('El campo "name" es obligatorio');
    });

    test('Debería devolver error si el campo "startDate" no está en formato correcto', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({
                name: "Tarea 2",
                startDate: "invalid-date",
                endDate: "2024-09-10",
                status: "pendiente",
                budget: 100
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.errors[0].msg).toBe('El campo "startDate" debe estar en formato YYYY-MM-DD');
    });

    test('Debería devolver error si el campo "status" tiene un valor no permitido', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({
                name: "Tarea 3",
                startDate: "2024-09-01",
                endDate: "2024-09-10",
                status: "invalido", // Valor no permitido
                budget: 100
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.errors[0].msg).toBe('El campo "status" debe ser uno de: pendiente, en progreso, completado');
    });

    test('Debería devolver error si el campo "budget" no es un número positivo', async () => {
        const response = await request(app)
            .post('/tasks')
            .send({
                name: "Tarea 4",
                startDate: "2024-09-01",
                endDate: "2024-09-10",
                status: "pendiente",
                budget: -50 // Número no positivo
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.errors[0].msg).toBe('El campo "budget" debe ser un número positivo');
    });
});
