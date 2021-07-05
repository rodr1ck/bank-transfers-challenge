import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import {useHistory} from "react-router-dom";

const Transferir = () => {
  const [destino, setDestino] = useState();
  const history=useHistory();
  const [dataDestinatario, setDataDestinatario] = useState();
  const [amount, setAmount] = useState();
  const [formInfo, setFormInfo] = useState({
    name: '',
    email: '',
    bank: '',
    account_type: '',
    amount: ''
})


  useEffect(() => {
    if(!isNaN(destino)){
    axios.get("/api/destinatario/" + destino).then((res) => {
      console.log(res.data);
      if (res.data !== null) setDataDestinatario(res.data);
    });
    }
  }, [destino]);

  console.log(destino);

  const onSubmitHandler = (e) => {
    e.preventDefault()
    console.log("onSubmitHandler")
    console.log(dataDestinatario, amount)
    if(amount === "" || isNaN(amount)) alert("El monto no es valido")
    if(dataDestinatario && amount){
        const { name, rut, email, bank, account_type} =
          dataDestinatario;
        axios
        .post('/api/transferencia/new', {
            rut,
            name,
            bank,
            account_type,
            amount
        })
        .then((res) => {
            console.log(res)
            const result = res.data.mensaje
            //setMessage(result)
            history.push("/verhistorial");
        })
        .catch((err) => console.log(err))
    }
    
/*     axios
        .post('http://localhost:8000/api/new-product', {
            tile,
            price,
            description,
        })
        .then((res) => {
            console.log(res)
            const result = res.data.mensaje
            setMessage(result)
        })
        .catch((err) => console.log(err)) */

}

const getFormData = (target) => {
    const form = target.closest('form')
    const formData = new FormData(form)
    const data = {}
    for (let [key, value] of formData.entries()) data[key] = value
    return data
}

const onChange = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    const data = getFormData(e.target)
    setFormInfo(data)
    console.log(data)
    //const { errores } = verify(data)
    //showError(errores)
}

  const renderForm = () => {
    if (dataDestinatario) {
      if (dataDestinatario.length === 0) {
        return <h5 className="dashboard">No se ha encontrado destinatario</h5>;
      } else {
        console.log(dataDestinatario);
        const { name, rut, email, bank, account_type, amount } =
          dataDestinatario;
        return (
          <>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <form onSubmit={onSubmitHandler} onChange={onChange}>
                    <div class="form-group row">
                      <label for="staticName" class="col-sm-2 col-form-label">
                        Nombre
                      </label>
                      <div class="col-sm-10">
                        <input
                          type="text"
                          readonly
                          class="form-control-plaintext"
                          id="staticName"
                          value={name}
                        />
                      </div>
                    </div>

                    <div class="form-group row">
                      <label for="staticEmail" class="col-sm-2 col-form-label">
                        Email
                      </label>
                      <div class="col-sm-10">
                        <input
                          type="text"
                          readonly
                          class="form-control-plaintext"
                          id="staticEmail"
                          value={email}
                        />
                      </div>
                    </div>

                    <div class="form-group row">
                      <label for="staticBank" class="col-sm-2 col-form-label">
                        Banco
                      </label>
                      <div class="col-sm-10">
                        <input
                          type="text"
                          readonly
                          class="form-control-plaintext"
                          id="staticBank"
                          value={bank}
                        />
                      </div>
                    </div>

                    <div class="form-group row">
                      <label for="staticBank" class="col-sm-2 col-form-label">
                        Tipo de Cuenta
                      </label>
                      <div class="col-sm-10">
                        <input
                          type="text"
                          readonly
                          class="form-control-plaintext"
                          id="staticBank"
                          value={account_type}
                        />
                      </div>
                    </div>

                    <div class="form-group row">
                      <label for="amount" class="col-sm-2 col-form-label">
                        Monto
                      </label>
                      <div class="col-sm-10">
                        <input
                          type="text"
                          class="form-control-plaintext"
                          id="amount"
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Transferir</button>
                  </form>
                </div>
                <div className="col-md-3"></div>
              </div>
            </div>

            {/* <div className="container-fluid">
              <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Banco</th>
                        <th scope="col">Tipo de Cuenta</th>
                        <th scope="col">Monto</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        <tr>
                          <td>{name}</td>
                          <td>{rut}</td>
                          <td>{bank}</td>
                          <td>{account_type}</td>
                          <td>{amount}</td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
                <div className="col-md-3"></div>
              </div>
            </div> */}
          </>
        );
      }
    } else {
      return (
        <>
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={10000} //3 secs
            className="dashboard"
          />
          <h3 className="dashboard">Cargando Destinatario</h3>
        </>
      );
    }
  };

  return (
    <>
      <div className="destinatario-form">
        <label htmlFor="buscaDestinatario" className="">
          Buscar Destinatario
        </label>
        <input
          name="buscaDestinatario"
          type="text"
          placeholder="ingreasa rut destinatario"
          onChange={(e) => setDestino(e.target.value)}
        />
      </div>
      <div>
        <h2 className={`{theme} dashboard`}>Detalles del Destinatario</h2>
        <hr className="title-separator"></hr>
        {renderForm()}
      </div>
    </>
  );
};

export default Transferir;
