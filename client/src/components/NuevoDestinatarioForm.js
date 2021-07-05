import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./NuevoDestinatarioForm.css";

const NuevoDestinatarioForm = (props) => {
  const {
    iRut,
    iName,
    iEmail,
    iPhone,
    iBank,
    iAccount_type,
    iAccount_number,
    onSubmitProp,
  } = props;

  const tipoCuenta = ["Vista", "Corriente", "Cuenta Rut"];

  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Email inválido";
    }
    return error;
  }

  return (
    <div>
      <Formik
        initialValues={{
          rut: iRut,
          name: iName,
          email: iEmail,
          phone: iPhone,
          bank: iBank,
          account_type: iAccount_type,
          account_number: iAccount_number,
        }}
        validationSchema={Yup.object().shape({
          rut: Yup.string()
            .min(3, "Tu nombre es muy corto")
            .required("Por favor ingresa tu Rut"),

          name: Yup.string()
            .min(3, "El apellido es muy corto")
            .required("Por favor ingrese el nombre correctamente"),

          email: Yup.string()
            .email("Correo no valido")
            .min(3, "Este correo electrónico es incorrecto")
            .required("Por favor, ingresa un correo electrónico válido"),

          phone: Yup.string()
            .min(8, "Tu telefono es muy corto")
            .max(15, "Tu telefono es muy largo")
            .required("Por favor ingresa tu telefono"),

          bank: Yup.string().required("Debes elegir un banco"),

          account_type: Yup.string().required("Debes elegir un tipo de cuenta"),

          account_number: Yup.number()
            .min(4, "Tu numero de cuenta es muy corto")
            .min(20, "Tu numero de cuenta es muy largo")
            .required("ERROR: El numero de cuenta es obligatorio!")
            .test(
              "Is positive?",
              "El numero de cuenta debe ser positivo!",
              (value) => value > 0
            ),
        })}
        onSubmit={(values, { setSubmitting }) => {
          const timeOut = setTimeout(() => {
            onSubmitProp(values);
            setSubmitting(false);
            clearTimeout(timeOut);
          }, 1000);
        }}
      >
        {({ values, errors, touched, handleSubmit, valid }) => {
          return (
            <div className="table">
              <Form className="contact" method="post" onSubmit={handleSubmit}>
                <div className="tr">
                  <label htmlFor="rut" className="col-sm-6 col-form-label">
                    Rut
                  </label>
                  <Field
                    id="rut"
                    type="text"
                    className="form-control"
                    placeholder="Ingrese su rut"
                    name="rut"
                  />
                  {errors.rut && touched.rut && <p>{errors.rut}</p>}
                </div>
                <div className="tr">
                  <label htmlFor="name" className="col-sm-6 col-form-label">
                    Nombre
                  </label>
                  <Field
                    id="name"
                    type="text"
                    placeholder="Ingrese su nombre"
                    className="form-control"
                    name="name"
                  />
                  {errors.name && touched.name && <p>{errors.name}</p>}
                </div>
                <div className="tr">
                  <label htmlFor="email" className="col-sm-6 col-form-label td">
                    Correo
                  </label>
                  <Field
                    id="email"
                    type="text"
                    placeholder="Ingrese su email"
                    className="form-control td"
                    name="email"
                    validate={validateEmail}
                  />
                  <ErrorMessage className="td" name="email">
                    {(msg) => <p className="td">{msg}</p>}
                  </ErrorMessage>
                </div>
                <div className="tr">
                  <label htmlFor="phone" className="col-sm-6 col-form-label">
                    Telefono
                  </label>
                  <Field
                    id="phone"
                    type="text"
                    placeholder="Ingrese su telefono"
                    className="form-control"
                    name="phone"
                  />
                  {errors.phone && touched.phone && <p>{errors.phone}</p>}
                </div>
                <div className="tr">
                  <label htmlFor="bank" className="col-sm-6 col-form-label">
                    Banco
                  </label>

                  <Field as="select" name="bank">
                    {iBank.map((x, y) => (
                      <option value={x} key={y}>
                        {x}
                      </option>
                    ))}
                  </Field>

                  {errors.bank && touched.bank && <p>{errors.bank}</p>}
                </div>
                <div className="tr">
                  <label
                    htmlFor="account_type"
                    className="col-sm-6 col-form-label"
                  >
                    Tipo de cuenta
                  </label>

                  <Field as="select" name="account_type">
                    {tipoCuenta.map((x, y) => (
                      <option value={x} key={y}>
                        {x}
                      </option>
                    ))}
                  </Field>

                  {errors.account_type && touched.account_type && (
                    <p>{errors.account_type}</p>
                  )}
                </div>
                <div className="tr">
                  <label
                    htmlFor="account_number"
                    className="col-sm-6 col-form-label"
                  >
                    Nº de cuenta
                  </label>
                  <Field
                    id="account_number"
                    type="text"
                    placeholder="Ingrese su número de cuenta"
                    className="col-sm-6 form-control"
                    name="account_number"
                  />
                  {errors.account_number && touched.account_number && (
                    <p>{errors.account_number}</p>
                  )}
                </div>
                <div className="tr crea-dest-btn">
                  <button
                    type="submit"
                    disabled={Object.values(errors).length > 0}
                  >
                    Crear
                  </button>
                </div>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default NuevoDestinatarioForm;
