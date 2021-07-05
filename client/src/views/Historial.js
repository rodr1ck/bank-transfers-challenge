import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import moment from "moment";

const Historial = () => {
  const [transfers, setTransfers] = useState();

  useEffect(() => {
    axios.get("/api/transfers").then((res) => setTransfers(res.data));
  }, []);

  console.log(transfers);

  const renderTable = () => {
    if (transfers) {
        if(transfers.length===0){
            return(<h5 className="dashboard">Aún no se han hecho transferencias</h5>)
        }else{
            return (
                <>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-3"></div>
                      <div className="col-md-6">
        
                      <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col">Fecha</th>
                                  <th scope="col">Nombre del Destinatario</th>
                                  <th scope="col">Rut</th>
                                  <th scope="col">Banco</th>
                                  <th scope="col">Tipo de Cuenta</th>
                                  <th scope="col">Monto</th>
                                </tr>
                              </thead>
                              <tbody>
                                {transfers.map((transfer, index) => {
                                  let date = new Date(transfer.createdAt);
                                  var formatted_date =
                                    moment(date).format("DD-MM-YYYY");
                                  return (
                                    <tr key={index}>
                                      <td>{formatted_date}</td>
                                      <td>{transfer.name}</td>
                                      <td>{transfer.rut}</td>
                                      <td>{transfer.bank}</td>
                                      <td>{transfer.account_type}</td>
                                      <td>{transfer.amount}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
        
        
                      </div>
                      <div className="col-md-3"></div>
                    </div>
                  </div>
                </>
              );

        }
      
    } else {
        return (<>
        <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={10000} //3 secs
            className="dashboard"
          />
          <h3 className="dashboard">Cargando Transferencias</h3>
        </>)
    }
  };

  return (
    <>
      <h2 className={`{theme} dashboard`}>HISTORIAL DE TRANSFERENCIAS</h2>
      <hr className="title-separator"></hr>
      {renderTable()}
    </>
  );
};

export default Historial;
