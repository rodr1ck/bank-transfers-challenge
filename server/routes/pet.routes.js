const PetController = require('../controllers/pet.controller')

module.exports = function (app) {
    app.get('/api/pets/:id', PetController.getPet)
    app.post('/api/pets/new', PetController.createPet)
    // app.get('/api/pets', PetController.getAllPets)
    app.get('/api/pets', PetController.getAllpets)
    app.get('/api', PetController.index)
    app.put('/api/pets/:id', PetController.updatePet)
    app.delete('/api/pets/:id', PetController.deletePet)
}
