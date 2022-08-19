import React from 'react';
import { useState } from 'react';
import AuthUser from '../components/auth/AuthUser';


function Delete() {

    const initialValues = { userId: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const { http} = AuthUser();

    const userDelete = async () => {

        http.delete('/api/User/delete', {
            data: {
                userId: parseInt(formValues.userId)
            }
        }).then((res) => {
            console.log("silindi")
        }).catch((error) => {
            console.log("delete error= ", error)
        })
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();

    }
    return (
        <div>

            <div id="login-page">
                <div className="container">

                    <form className="form-login" onSubmit={handleSubmit}>
                        <h2 className="form-login-heading">Kullanıcı Sil</h2>
                        <div className="login-wrap">
                            <input type="text" className="form-control" placeholder="Kullanıcı Id " name='userId' value={formValues.userId} onChange={handleChange} autoFocus />
                            <br />

                            <button className="btn btn-theme btn-block" onClick={userDelete} type="submit"><i className="fa fa-lock"></i> Kullanıcıyı Sil</button>
                            <hr />

                        </div>
                    </form>

                </div>
            </div>

        </div >

    );

}

export default Delete