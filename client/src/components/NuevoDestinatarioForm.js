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
            .required("Por favor ingresa tu nombre"),

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

          account_number: Yup.string()
            .min(3, "Tu account_number es muy corto")
            .required("Por favor ingresa tu account_number"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          const timeOut = setTimeout(() => {
            // console.log(values);
            onSubmitProp(values);
            setSubmitting(false);
            clearTimeout(timeOut);
          }, 1000);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          valid,
        }) => {
          return (
            <div className="table">
              <Form className="contact" method="post" onSubmit={handleSubmit}>
                <div className="tr">
                  <label htmlFor="rut" className="col-sm-4 col-form-label">
                    Rut
                  </label>
                  <Field
                    id="rut"
                    type="text"
                    className="form-control"
                    placeholder="Rut"
                    name="rut"
                  />
                  {errors.rut && touched.rut && <p>{errors.rut}</p>}
                </div>
                <div className="tr">
                  <label htmlFor="name" className="col-sm-4 col-form-label">
                    Nombre
                  </label>
                  <Field
                    id="name"
                    type="text"
                    placeholder="Nombre"
                    className="form-control"
                    name="name"
                  />
                  {errors.name && touched.name && <p>{errors.name}</p>}
                </div>
                <div className="tr">
                  <label htmlFor="email" className="col-form-label td">
                    Correo Electrónico
                  </label>
                  <Field
                    id="email"
                    type="text"
                    placeholder="Email"
                    className="form-control td"
                    name="email"
                  />
                  <ErrorMessage className="td" name="email">
                    {(msg) => <p className="td">{msg}</p>}
                  </ErrorMessage>
                </div>
                <div className="tr">
                  <label htmlFor="phone" className="col-sm-4 col-form-label">
                    Telefono
                  </label>
                  <Field
                    id="phone"
                    type="text"
                    placeholder="phone"
                    className="form-control"
                    name="phone"
                  />
                  {errors.phone && touched.phone && <p>{errors.phone}</p>}
                </div>
                <div className="tr">
                  <label htmlFor="bank" className="col-sm-4 col-form-label">
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
                    className="col-sm-4 col-form-label"
                  >
                    account_type
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
                    account_number
                  </label>
                  <Field
                    id="account_number"
                    type="text"
                    placeholder="account_number"
                    className="form-control"
                    name="account_number"
                  />
                  {errors.account_number && touched.account_number && (
                    <p>{errors.account_number}</p>
                  )}
                </div>
                <div className="tr">
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
