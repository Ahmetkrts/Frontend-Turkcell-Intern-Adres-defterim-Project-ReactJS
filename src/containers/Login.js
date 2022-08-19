import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../components/template/Header';
import AuthUser from '../components/auth/AuthUser';



function Login() {

    const initialValues = { userName: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [businessError, setBusinessError] = useState();
    const [isSubmit, setIsSubmit] = useState(false);
    const { http, setToken } = AuthUser();




    const login = () => {
        console.log("error sayısı: " + Object.keys(formErrors).length + " Giriş yapabilir mi: " + isSubmit)
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log("login1")
            http.post('/api/User/Auth/login', {
                username: formValues.userName,
                password: formValues.password
            }).then((res) => {
                if (res.status === 500) {
                    setBusinessError(res.data.message);
                    console.log(res.data.message)
                }

                setToken(res.data.data.user, res.data.data.token);
            }).catch((error) => {

            })
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        setBusinessError("");
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));


    }

    useEffect(() => {
        Object.keys(formErrors).length === 0 ? setIsSubmit(true) : setIsSubmit(false)


        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log("Kullanıcı Giriş Yapabilir,", formValues);
        }
    }, [formErrors], [businessError], [isSubmit]);

    const validate = (values) => {
        const errors = {};
        if (!values.userName) {
            errors.userName = "Username Girilmedi!";
        }
        if (!values.password) {
            errors.password = "Şifre Gerekli!";
        } else if (values.password.length < 4) {
            errors.password = "Şifre 4 karakterden küçük olamaz";
        } else if (values.password.length > 10) {
            errors.password = "şifre 10 karakterden büyük olamaz";
        }
        return errors;
    }



    return (
        <div>
            <Header />
            <div id="login-page">
                <div className="container">
                    {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
                        <div className="ui message success">"giriş başarılı</div>

                    ) : (
                        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
                    )} */}
                    <form className="form-login" onSubmit={handleSubmit}>
                        <h2 className="form-login-heading">Giriş Yap</h2>
                        <div className="login-wrap">
                            <input type="text" className="form-control" placeholder="Kullanıcı Adı " name='userName' value={formValues.userName} onChange={handleChange} autoFocus />
                            <p>{formErrors.userName}</p>
                            <br />
                            <input type="password" className="form-control" placeholder="Şifre" name='password' value={formValues.password} onChange={handleChange} />
                            <p>{formErrors.password}</p>
                            <br />
                            <button className="btn btn-theme btn-block" onClick={() => login()} type="submit"><i className="fa fa-lock"></i> Giriş Yap</button>
                            <span class="help-block text-center text-danger">{businessError}</span>
                            <hr />
                            <div className="registration">
                                Kullanıcı Kaydın Yokmu?<br />
                                <a className="" href="#">
                                    Kullanıcı Oluştur.
                                </a>
                            </div>

                        </div>


                        <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="myModal" className="modal fade">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                        <h4 className="modal-title">Forgot Password ?</h4>
                                    </div>
                                    <div className="modal-body">
                                        <p>Enter your e-mail address below to reset your password.</p>
                                        <input type="text" name="email" placeholder="Email" autocomplete="off" className="form-control placeholder-no-fix" />

                                    </div>
                                    <div className="modal-footer">
                                        <button data-dismiss="modal" className="btn btn-default" type="button">Cancel</button>
                                        <button className="btn btn-theme" type="button">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </form>

                </div>
            </div>

        </div >

    );

}

export default Login;