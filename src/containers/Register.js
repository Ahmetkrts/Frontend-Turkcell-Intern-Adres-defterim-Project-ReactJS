import React, { Component } from 'react';
import { useState, useEffect } from "react";
import { createUser } from '../components/ApiCall'
import Header from '../components/template/Header';
import AuthUser from '../components/auth/AuthUser';

function Register() {



    const initialValues = { userName: "", firstName: "", lastName: "", mail: "", password: "", rePassword: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [businessError, setBusinessError] = useState();
    const [registerSuccess, setRegisterSuccess] = useState();
    const [isSubmit, setIsSubmit] = useState(false);

    const { http, setToken } = AuthUser();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    const registerUser = () => {
        http.post('/api/User/Auth/register', {
            userName: formValues.userName,
            userFistName: formValues.firstName,
            userLastName: formValues.lastName,
            mail: formValues.mail,
            password: formValues.password
        }).then((res) => {
            setBusinessError(null);
            setRegisterSuccess("Kullanıcı Kaydı Başarıyla oluşturuldu.")
            console.log(res);
        }).catch((error) => {
            console.log(error.response.data.message)
            setBusinessError(error.response.data.message);
            setRegisterSuccess(null);
        })

    }

    



    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors], [businessError]);


    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.userName) {
            errors.userName = "Username Girilmedi!";
        }
        if (!values.mail) {
            errors.mail = "Email Girilmedi";
        } else if (!regex.test(values.mail)) {
            errors.mail = "Mail Adresi Formatına uygun değil";
        }
        if (!values.password) {
            errors.password = "Şifre Gerekli!";
        } else if (values.password.length < 4) {
            errors.password = "Şifre 4 karakterden küçük olamaz";
        } else if (values.password.length > 10) {
            errors.password = "şifre 10 karakterden büyük olamaz";
        }
        if (!values.rePassword) {
            errors.rePassword = "şifre tekrarı gerekli!"
        } else if (values.rePassword.length < 4) {
            errors.rePassword = "Şifre tekrarı 4 karakterden küçük olamaz";
        } else if (values.rePassword.length > 10) {
            errors.rePassword = "şifre tekrarı 10 karakterden büyük olamaz";
        } else if (values.password !== values.rePassword) {
            errors.rePassword = "şifreler uyuşmuyor"
        }
        return errors;
    };





    return (
        <div>
            <Header />
            <div id="login-page">
                <div className="container">
                    {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
                        <div className="ui message success">{registerSuccess}</div>

                    ) : (
                        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
                    )} */}
                    <form className="form-login" onSubmit={handleSubmit}>
                        <h2 className="form-login-heading">Kayıt Ol!</h2>
                        <div className="login-wrap">


                            <input type="text" className="form-control" placeholder="Kullanıcı Adı " name='userName' value={formValues.userName} onChange={handleChange} />
                            <p>{formErrors.userName}</p>
                            <input type="text" className="form-control" placeholder="Ad" name='firstName' value={formValues.firstName} onChange={handleChange} />
                            <br />
                            <input type="text" className="form-control" placeholder="Soyad" name='lastName' value={formValues.lastName} onChange={handleChange} />
                            <br />
                            <input type="text" className="form-control" placeholder="Mail Adresi" name='mail' value={formValues.mail} onChange={handleChange} />
                            <p>{formErrors.mail}</p>
                            <input type="password" className="form-control" placeholder="Şifre" name='password' value={formValues.password} onChange={handleChange} />
                            <p>{formErrors.password}</p>
                            <input type="password" className="form-control" placeholder="Şifre Tekrarı" name='rePassword' value={formValues.rePassword} onChange={handleChange} />
                            <p>{formErrors.rePassword}</p>
                            <button className="btn btn-theme btn-block" type="submit" onClick={registerUser}><i className="fa fa-check"></i> Kaydol</button>
                            <br />
                            <p className='text text-danger'>{businessError}</p>
                        </div>
                    </form>

                </div>
            </div>

        </div>

    );
}


export default Register;

