const { Transferencia } = require("../models/transferencia.model");

module.exports.createTransferencia = (request, response) => {
    //console.log(request.body);
    const { rut, name, bank, account_type, amount } =
      request.body;
    Transferencia.create({
      rut,
      name,
      bank,
      account_type,
      amount,
    })
      .then((transferencia) =>
        response.json({ transferencia, mensaje: "Transferencia exitosa" })
      )
      .catch((err) => {
        console.error(err);
        response.status(400).json(err);
      });
  };

  module.exports.getAllTransfers = (request, response) => {
    Transferencia.find({})
        .then((transfers) => response.json(transfers))
        .catch((err) => {
            console.error(err)
            res.status(400).json(err)
        })
}