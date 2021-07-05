const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { TransferenciaSchema } = require("./transferencia.model");

const DestinatarioSchema = new mongoose.Schema(
  {
    rut: {
      type: Number,
      required: [true, "rut es requerido"],
      minlength: [8, "Rut debe ser de 8 caracteres o más"],
      maxlength: [10, "Rut debe ser de máximo 10 caracteres"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "nombre es requerido"],
      minlength: [3, "Nombre debe ser de 3 caracteres o más"],
    },
    email: {
      type: String,
      required: [true, "email es requerido"],
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Por favor ingresa un email valido",
      },
      unique: true,
    },
    phone: {
      type: Number,
      required: [true, "El telefono es requerido"],
      unique: true,
    },
    bank: {
      type: String,
      required: [true, "Banco es requerido"],
      minlength: [3, "El banco debe ser de 3 caracteres o más"],
    },
    account_type: {
      type: String,
      required: [true, "Tipo de cuenta es requerido"],
    },
    account_number: {
      type: Number,
      required: [true, "El numero de cuenta es requerido"],
      unique: true,
    },
    transferencias: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Transferencia" },
    ],
  },
  { timestamps: true }
);

DestinatarioSchema.plugin(uniqueValidator, {
  message: "Error, {PATH} ya existe",
});

module.exports.Destinatario = mongoose.model(
  "Destinatario",
  DestinatarioSchema
);
