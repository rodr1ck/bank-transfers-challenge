const { Schema, model } = require("mongoose");

const TransferenciaSchema = Schema(
  {
    rut: {
      type: Number,
      required: [true, "rut es requerido"],
      minlength: [8, "Rut debe ser de 8 caracteres o más"],
      maxlength: [10, "Rut debe ser de máximo 10 caracteres"]
    },
    name: {
      type: String,
      required: [true, "nombre es requerido"],
      minlength: [3, "Nombre debe ser de 3 caracteres o más"],
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
    amount: {
      type: Number,
      required: [true, "El monto es obligatorio"],
    },
  },
  { timestamps: true }
);

const Transferencia = model("Transferencia", TransferenciaSchema);

module.exports = { TransferenciaSchema, Transferencia };
