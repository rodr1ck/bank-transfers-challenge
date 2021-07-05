const TransferenciaController = require('../controllers/transferencia.controller')

module.exports = function (app) {
    app.post('/api/transferencia/new', TransferenciaController.createTransferencia)
    app.get('/api/transfers', TransferenciaController.getAllTransfers)
}