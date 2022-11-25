const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")

const PacienteModel = require("./models/Paciente")


app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://gustavopassos:y1ox5xChVQLl1zrx@crud.ios6tc3.mongodb.net/paciente?retryWrites=true&w=majority", {

    useNewUrlParser: true,

})


app.get("/read", async (req, res) => {

    PacienteModel.find({}, (err, result) => {

        if (err) {
            res.send(err)
        }

        res.send(result)
    })

})



app.post("/insert", async (req, res) => {

    const nomePaciente = req.body.nomePaciente
    const laudoPaciente = req.body.laudoPaciente

    const paciente = new PacienteModel({ nomePaciente: nomePaciente, laudoPaciente: laudoPaciente })
    try {

        await paciente.save();

        res.send("inserted data")
    } catch (err) {
        console.log(err);
    }

})

app.put("/update", async (req, res) => {

    const novoNomePaciente = req.body.novoNomePaciente;
    const novoLaudoPaciente = req.body.novoLaudoPaciente;
    const id = req.body.id;




    try {

        await PacienteModel.findById(id, (err, updatedPaciente) => {
            updatedPaciente.nomePaciente = novoNomePaciente;
            updatedPaciente.laudoPaciente = novoLaudoPaciente;
            updatedPaciente.save();
            res.send("update")
        })
    } catch (err) {
        console.log(err);
    }

})

app.delete("/delete/:id", async (req, res) => {

    const id = req.params.id


    await PacienteModel.findByIdAndRemove(id).exec()
    res.send("deleted")

})

app.listen(3001, () => {
    console.log('Server is Running on port 3001....');

})