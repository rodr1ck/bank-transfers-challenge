const { Destinatario } = require("../models/destinatario.model");

module.exports.createDestinatario = (request, response) => {
  console.log(request.body);
  const { rut, name, email, phone, bank, account_type, account_number } =
    request.body;
  Destinatario.create({
    rut,
    name,
    email,
    phone,
    bank,
    account_type,
    account_number,
  })
    .then((destinatario) =>
      response.json({ destinatario, mensaje: "Destinatario creado exitosamente" })
    )
    .catch((err) => {
      console.error(err);
      response.status(400).json(err);
    });
};

module.exports.getDestinatario = (request, response) => {
  Destinatario.findOne({
    rut: request.params.rut,
  })
    .then((destinatario) => response.json(destinatario))
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
};
