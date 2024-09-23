const request = require('supertest');
const chai = require('chai');
const sinon = require('sinon');

const app = require('../index');

const expect = chai.expect;

describe('POST /proyects', () => {
    it('1. Debería crear un proyecto con datos válidos y devolver estatus 201', async () => {
        const proyectData = {
            name: "Nuevo Sistema de Gestión",
            description: "Implementar un sistema de recursos.",
            startDate: "2024-09-01",
            endDate: "2025-02-01",
            status: "en progreso",
            teamMembers: ["Carlos Pérez", "Ana Gómez", "Luis Martínez"],
            budget: 50000
        };

        const res = await request(app).post('/proyects').send(proyectData);
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('name', proyectData.name);
        expect(res.body).to.have.property('description', proyectData.description);
        expect(res.body).to.have.property('startDate', proyectData.startDate);
        expect(res.body).to.have.property('endDate', proyectData.endDate);
        expect(res.body).to.have.property('status', proyectData.status);
        expect(res.body).to.have.property('teamMembers').eql(proyectData.teamMembers);
        expect(res.body).to.have.property('budget', proyectData.budget);
    });

    it('2. Debería devolver un error 400 si el campo "name" está vacío', async () => {
        const proyectData = {
            name: "",
            description: "Implementar un sistema de recursos.",
            startDate: "2024-09-01",
            endDate: "2025-02-01",
            status: "en progreso",
            teamMembers: ["Carlos Pérez", "Ana Gómez", "Luis Martínez"],
            budget: 50000
        };

        const res = await request(app).post('/proyects').send(proyectData);
        expect(res.status).to.equal(400);
        expect(res.body.errors[0].msg).to.equal('El campo "name" es obligatorio');
    });

    it('3. Debería devolver un error 400 si el campo "startDate" no tiene el formato correcto', async () => {
        const proyectData = {
            name: "Nuevo Sistema de Gestión",
            description: "Implementar un sistema de recursos.",
            startDate: "invalid-date",
            endDate: "2025-02-01",
            status: "en progreso",
            teamMembers: ["Carlos Pérez", "Ana Gómez", "Luis Martínez"],
            budget: 50000
        };

        const res = await request(app).post('/proyects').send(proyectData);
        expect(res.status).to.equal(400);
        expect(res.body.errors[0].msg).to.equal('El campo "startDate" debe estar en formato YYYY-MM-DD');
    });

    it('4. Debería devolver un error 400 si el campo "status" tiene un valor no permitido', async () => {
        const proyectData = {
            name: "Nuevo Sistema de Gestión",
            description: "Implementar un sistema de recursos.",
            startDate: "2024-09-01",
            endDate: "2025-02-01",
            status: "invalido", // Valor no permitido
            teamMembers: ["Carlos Pérez", "Ana Gómez", "Luis Martínez"],
            budget: 50000
        };

        const res = await request(app).post('/proyects').send(proyectData);
        expect(res.status).to.equal(400);
        expect(res.body.errors[0].msg).to.equal('El campo "status" debe ser uno de: pendiente, en progreso, completado');
    });

    it('5. Debería devolver un error 400 si el campo "budget" no es un número positivo', async () => {
        const proyectData = {
            name: "Nuevo Sistema de Gestión",
            description: "Implementar un sistema de recursos.",
            startDate: "2024-09-01",
            endDate: "2025-02-01",
            status: "en progreso",
            teamMembers: ["Carlos Pérez", "Ana Gómez", "Luis Martínez"],
            budget: -100 // Número no positivo
        };

        const res = await request(app).post('/proyects').send(proyectData);
        expect(res.status).to.equal(400);
        expect(res.body.errors[0].msg).to.equal('El campo "budget" debe ser un número positivo');
    });
});
