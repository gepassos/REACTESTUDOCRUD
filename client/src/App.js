import React, { useState, useEffect } from "react";
import Axios from 'axios';
import './App.css';

function App() {


  function atualizarTela() {

    Axios.get('http://localhost:3001/read').then((response) => {

      setPacienteLista(response.data);

    })
  }

  const [pacienteLista, setPacienteLista] = useState([])

  useEffect(() => {
    Axios.get('http://localhost:3001/read').then((response) => {

      setPacienteLista(response.data);

    })

  }, [])

  const addToList = () => {
    console.log(nomePaciente, laudoPaciente)

    if (nomePaciente.trim().length && laudoPaciente.trim().length > 1) {
      Axios.post("http://localhost:3001/insert", {
        nomePaciente: nomePaciente,
        laudoPaciente: laudoPaciente,

      })

      atualizarTela()

    } else { console.log("Nome ou Laudo não foi digitado"); }

  }



  const [nomePaciente, setNomePaciente] = useState('')

  const [laudoPaciente, setLaudoPaciente] = useState('')

  const [novoNomePaciente, setNovoNomePaciente] = useState('')
  const [novoLaudoPaciente, setNovoLaudoPaciente] = useState('')

  const updatePaciente = async (id) => {

    if (novoNomePaciente.trim().length > 1 && novoNomePaciente.trim() !== 0) {



      await Axios.put("http://localhost:3001/update",
        {
          id: id, novoNomePaciente, novoLaudoPaciente
        })

      atualizarTela()
    } else { alert('NOME INVALIDO') }



  }


  const deletePaciente = async (id) => {

    await Axios.delete(`http://localhost:3001/delete/${id}`,
      { id: id, nomePaciente })


    atualizarTela()


  }


  return (


    <div className="App">
      <h1>  CRUD App with MERN</h1>

      <label>Nome do paciente</label>
      <input type="text" onChange={(event) => { setNomePaciente(event.target.value) }}></input>
      <label>Laudo do paciente</label>
      <input type="text" onChange={(event) => { setLaudoPaciente(event.target.value) }}></input>
      <button onClick={addToList}>Add Paciente</button>


      <h1>Pacientes</h1>
      {pacienteLista.map((val, key) => {
        return (
          <div id="container" key={key}>
            <div key={key}><h1>{val.nomePaciente}</h1> <h1>{val.laudoPaciente}</h1> </div>
            <input type="text" placeholder="Paciente Novo" onChange={(event) => { setNovoNomePaciente(event.target.value) }}></input>
            <input type="text" placeholder="Laudo Novo" onChange={(event) => { setNovoLaudoPaciente(event.target.value) }}></input>
            <button onClick={() => { updatePaciente(val._id) }}> Edit </button>
            <button onClick={() => { deletePaciente(val._id) }}> Delete</button>
          </div>

        )

      })}
    </div>


  );
}

export default App;
