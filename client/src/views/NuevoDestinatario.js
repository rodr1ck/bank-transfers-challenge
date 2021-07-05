import React,{useState,useEffect} from 'react';
import NuevoDestinatarioForm from '../components/NuevoDestinatarioForm';
import Swal from 'sweetalert2';
import {useHistory} from "react-router-dom";
import axios from 'axios';

const NuevoDestinatario = () => {
    const [errors, setErrors] = useState([]); 
    const history=useHistory();
    const [banks, setBanks] = useState([]); 

    useEffect(() => {
        
        axios.get("https://bast.dev/api/banks.php").then((res) => {
          console.log(res.data.banks);
          const arrayBancos = res.data.banks.map(bank => bank.name)
          console.log(arrayBancos)
          setBanks(arrayBancos)
        });
        
      }, []);

    const createDestinatario = destinatario => {

        console.log(destinatario);

        axios.post('/api/destinatario/new', destinatario)
            .then(res=>{
                console.log(res.data);
                Swal.fire({
                    icon: 'success',
                    title: 'Nuevo destinatario creado exitosamente',
                    showConfirmButton: false,
                    timer: 1500
                  })
                history.push("/transferencia");
            })
            .catch(err=>{
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            }) 
    }

    return (
        <div>
            {errors.map((err, index) => <div className="alert alert-danger" role="alert">{err}</div>)}
            <NuevoDestinatarioForm onSubmitProp={createDestinatario} iRut='' iName='' iEmail='' iPhone='' iBank={banks} iAccount_type='' iAccount_number='' />
        </div>
    );

}

export default NuevoDestinatario;
