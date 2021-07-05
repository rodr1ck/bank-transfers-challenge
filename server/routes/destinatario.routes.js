const DestinatarioController = require('../controllers/destinatario.controller')

module.exports = function (app) {
    app.post('/api/destinatario/new', DestinatarioController.createDestinatario)
    app.get('/api/destinatario/:rut', DestinatarioController.getDestinatario)
}