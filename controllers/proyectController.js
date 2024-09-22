const { v4: uuidv4 } = require('uuid');

let proyects = [
    {
        "id": "5f0dba4a-e8d3-4a63-9cf1-741c53f6be72",
        "name": "Nuevo Sistema de Gestión",
        "description": "Implementar un sistema de recursos.",
        "startDate": "2024-09-01",
        "endDate": "2025-02-01",
        "status": "en progreso",
        "teamMembers": ["Carlos Pérez", "Ana Gómez", "Luis Martínez"],
        "budget": 50000
    }
];

function getAllProyect(){
    return proyects;
}

function getProyectById(id){
    return proyects.find(proyect => proyect.id === id);
}

function createProyect(name, description, startDate, endDate, status, teamMembers, budget){
    let newProyect = {
        id: uuidv4(), 
        name,
        description,
        startDate,
        endDate,
        status,
        teamMembers,
        budget
    };
    
    proyects.push(newProyect);
    return newProyect;
}

function updateProyect(id, name, description, startDate, endDate, status, teamMembers, budget){
    const proyectToUpdate = getProyectById(id);
    if(proyectToUpdate){
        proyectToUpdate.name = name;
        proyectToUpdate.description = description;
        proyectToUpdate.startDate = startDate;
        proyectToUpdate.endDate = endDate;
        proyectToUpdate.status = status;
        proyectToUpdate.teamMembers = teamMembers;
        proyectToUpdate.budget = budget;
        return proyectToUpdate;
    } 
    return null;
}

function deleteProyect(id) {
    const proyectIndex = proyects.findIndex(proyect => proyect.id === id);
    if (proyectIndex !== -1) {
        const deletedProyect = proyects[proyectIndex];
        proyects.splice(proyectIndex, 1); 
        return deletedProyect;
    } else {
        return null;
    }
}

module.exports = {
    getAllProyect,
    getProyectById,
    createProyect,
    updateProyect,
    deleteProyect,
}
