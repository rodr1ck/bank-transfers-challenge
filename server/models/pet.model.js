const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const PetSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'nombre es requerido'],
            minlength: [3, 'Nombre debe ser de 3 caracteres o más'],
            unique: true,
        },
        type: {
            type: String,
            required: [true, 'tipo es requerido'],
            minlength: [3, 'Nombre debe ser de 3 caracteres o más'],
        },
        description: {
            type: String,
            required: [true, 'Descripcion es requerida'],
            minlength: [3, 'Nombre debe ser de 3 caracteres o más'],
        },
        skill1: {
            type: String,
            required: [false, 'Skill1 es opcional'],
        },
        skill2: {
            type: String,
            required: [false, 'Skill1 es opcional'],
        },
        skill3: {
            type: String,
            required: [false, 'Skill1 es opcional'],
        },
        likes: {
            type: Number,
            required: [false, 'likes es opcional'],
            default: 0,
        },
    },
    { timestamps: true },
)

PetSchema.plugin(uniqueValidator, { message: 'Error, {PATH} ya existe' })

module.exports.Pet = mongoose.model('Pet', PetSchema)
