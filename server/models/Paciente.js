
const mongoose = require("mongoose")

const PacienteSchema = new mongoose.Schema({
    nomePaciente: {
        type: String,
        required: true,
    },
    laudoPaciente: {
        type: String,
        required: false,

    },
})

const Paciente = mongoose.model("dadosPaciente", PacienteSchema)
module.exports = Paciente;