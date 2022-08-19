import React from 'react';
import Footer from '../components/template/Footer';
import Header from '../components/template/Header';
import SideMenu from '../components/template/SideMenu';
import { useState, useEffect } from 'react';
import AuthUser from '../components/auth/AuthUser';
import { useSelector } from 'react-redux';

function Address() {
    const initialValues = { addressId: "", firstName: "", lastName: "", phoneNumber: "", city: "", state: "", country: "", fullAddress: "", addressTitle: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [refreshTable, setRefreshTable] = useState(true);
    const [businessError, setBusinessError] = useState();
    const [deleteAddress, setDeleteAddress] = useState(initialValues);
    const [address, setAddress] = useState([]);
    const { http } = AuthUser();
    const { user } = useSelector(state => state.auth);


    useEffect(() => {
        http.get('/api/Address/getAll').then((res) => {
            setAddress(res.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [refreshTable]);

    const formClear = (e) => {
        setFormValues(initialValues);
    }

    const saveAddress = () => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            http.post('/api/Address/add', {
                firstName: formValues.firstName,
                lastName: formValues.lastName,
                phoneNumber: formValues.phoneNumber,
                city: formValues.city,
                state: formValues.state,
                country: formValues.country,
                fullAddress: formValues.fullAddress,
                addressTitle: formValues.addressTitle,
                userId: JSON.parse(user).userId

            }).then((res) => {
                console.log(res.data.message)
                formClear();
                setRefreshTable(!refreshTable);
            }).catch((error) => {
                console.log(error)
            })
            console.log(JSON.parse(user).userId);
        }
    }
    const formUpdate = (e) => {
        setFormValues(e);
        console.log(e);
    }
    const updateAddress = () => {
        console.log("hata sayısı: " + Object.keys(formErrors).length + " Gönderebilirmiyim: " + isSubmit);
        console.log(user);
        console.log("güncelleniyor..")
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log("sorun kalmadı güncelleniyor..")
            http.put('/api/Address/update', {
                addressId: formValues.addressId,
                firstName: formValues.firstName,
                lastName: formValues.lastName,
                phoneNumber: formValues.phoneNumber,
                city: formValues.city,
                state: formValues.state,
                country: formValues.country,
                fullAddress: formValues.fullAddress,
                addressTitle: formValues.addressTitle,
                userId: JSON.parse(user).userId
            }).then((res) => {
                console.log(res.data.message)
                formClear();
                setRefreshTable(!refreshTable);
            }).catch((error) => {
                console.log(error)
            })
            console.log(JSON.parse(user).userId);
        }
    }
    const addressDelete = (e) => {


        http.delete('/api/Address/delete', {
            data: {
                addressId: parseInt(e)
            }
        }).then((res) => {
            console.log(res.data.message)
            setRefreshTable(!refreshTable);
        }).catch((error) => {
            console.log(error)
        })

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const setMModalDeleteAddress = (e) => {
        setDeleteAddress(e);
        console.log(e);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    }

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log("Address işlem yapabilir..,", formValues);
        }

    }, [formErrors], [businessError]);

    const validate = (values) => {
        const error = {};

        const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
        if (!values.firstName) {
            error.firstName = "Ad Girilmedi!";
        }
        if (!values.lastName) {
            error.lastName = "Soyad Girilmedi!";
        }
        if (!values.phoneNumber) {
            error.phoneNumber = "Telefon Numarası Girilmedi!";
        } else if (!regex.test(values.phoneNumber)) {
            error.phoneNumber = "Telefon Numarası Formatına uygun değil";
        }
        if (!values.city) {
            error.city = "İl Girilmedi!";
        }
        if (!values.state) {
            error.state = "İlçe Girilmedi!";
        }
        if (!values.country) {
            error.country = "Mahalle Girilmedi!";
        }
        if (!values.fullAddress) {
            error.fullAddress = "Tam Adres Girilmedi!";
        }
        if (!values.addressTitle) {
            error.addressTitle = "Adres Başlığı Girilmedi!";
        }
        return error;
    }
    return (
        <>
            <Header />
            <SideMenu />
            <section id="main-content">
                <section className="wrapper">
                    <h3><i className="fa fa-angle-right"></i> Basic Table Examples</h3>
                    <div className="row">

                        <div className="col-md-12">
                            <div className="content-panel">
                                <div class="showback">
                                    <div class="btn-group btn-group-justified">
                                        <div class="btn-group">
                                            <h4><i class="fa fa-angle-right"></i> Adres Listesi</h4>
                                        </div>
                                        <div class="btn-group">
                                            <button type="button" onClick={() => formClear()} data-toggle="modal" href="login.html#myModal" class="btn btn-theme">
                                                Yeni Kayıt Ekle
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <table className="table table-striped table-advance table-hover">

                                    <thead>
                                        <tr>
                                            <th><i className="fa fa-slack"></i> </th>
                                            <th> <i className="fa fa-user"></i> Ad Soyad</th>
                                            <th><i className="fa fa-map-marker"></i> İlçe-il</th>
                                            <th><i className=" fa fa-phone"></i> Telefon </th>
                                            <th><i className=" fa fa-edit"></i> Kullanıcı Adı </th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {address.map((address, index) => (
                                            <tr key={index}>
                                                <td> {index + 1}</td>
                                                <td className="hidden-phone">{address.firstName + " " + address.lastName}</td>
                                                <td>{address.state + "-" + address.city} </td>
                                                <td>{address.phoneNumber}</td>
                                                <td>{address.userName}</td>
                                                <td>
                                                    <button className="btn btn-primary btn-xs" data-toggle="modal" href="login.html#myModal" onClick={() => formUpdate(address)}><i className="fa fa-pencil"></i></button>
                                                    <button className="btn btn-danger btn-xs" data-toggle="modal" href="#deleteModal" onClick={() => setMModalDeleteAddress(address)}><i className="fa fa-trash-o "></i></button>
                                                </td>
                                            </tr>
                                        ))}


                                    </tbody>
                                </table>


                            </div>
                        </div>
                    </div>

                    <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="myModal" class="modal fade">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                    <h4 class="modal-title">Yeni Adres Kaydı</h4>
                                </div>
                                <form class="form-horizontal tasi-form" onSubmit={handleSubmit}>
                                    <div class="modal-body ">

                                        <h4>İletişim Bilgileri</h4>
                                        <hr />
                                        <div class={`form-group ${formErrors.firstName ? "has-error" : "has-success"} `}>
                                            <label class="col-sm-1 control-label col-lg-1" ></label>
                                            <div class="col-lg-10">
                                                <input type="text" class="form-control" placeholder='Ad' name='firstName' value={formValues.firstName} onChange={handleChange} />
                                                <span class="help-block">{formErrors.firstName}</span>
                                            </div>
                                        </div>
                                        <div class={`form-group ${formErrors.lastName ? "has-error" : "has-success"} `}>
                                            <label class="col-sm-1 control-label col-lg-1" ></label>
                                            <div class="col-lg-10">
                                                <input type="text" class="form-control" placeholder='Soyad' name='lastName' value={formValues.lastName} onChange={handleChange} />
                                                <span class="help-block">{formErrors.lastName}</span>
                                            </div>
                                        </div>
                                        <div class={`form-group ${formErrors.phoneNumber ? "has-error" : "has-success"} `}>
                                            <label class="col-sm-1 control-label col-lg-1" ></label>
                                            <div class="col-lg-10">
                                                <input type="text" class="form-control" placeholder='Cep Telefonu' name='phoneNumber' value={formValues.phoneNumber} onChange={handleChange} />
                                                <span class="help-block">{formErrors.phoneNumber}</span>
                                            </div>
                                        </div>

                                        <h4>Adres Bilgileri</h4>
                                        <hr />
                                        <div class={`form-group ${formErrors.city ? "has-error" : "has-success"} `}>
                                            <label class="col-sm-1 control-label col-lg-1" ></label>
                                            <div class="col-lg-5">
                                                <input type="text" class="form-control" placeholder='İl' name='city' value={formValues.city} onChange={handleChange} />
                                                <span class="help-block">{formErrors.city}</span>
                                            </div>
                                            <div class="col-lg-5">
                                                <input type="text" class="form-control" placeholder='İlçe' name='state' value={formValues.state} onChange={handleChange} />
                                                <span class="help-block">{formErrors.state}</span>
                                            </div>
                                        </div>
                                        <div class={`form-group ${formErrors.country ? "has-error" : "has-success"} `}>
                                            <label class="col-sm-1 control-label col-lg-1" ></label>
                                            <div class="col-lg-10">
                                                <input type="text" class="form-control" placeholder='Mahalle' name='country' value={formValues.country} onChange={handleChange} />
                                                <span class="help-block">{formErrors.country}</span>
                                            </div>
                                        </div>
                                        <div class={`form-group ${formErrors.fullAddress ? "has-error" : "has-success"} `}>
                                            <label class="col-sm-1 control-label col-lg-1" ></label>
                                            <div class="col-lg-10">
                                                <input type="text" class="form-control" placeholder='Tam Adres' name='fullAddress' value={formValues.fullAddress} onChange={handleChange} />
                                                <span class="help-block">{formErrors.fullAddress}</span>
                                            </div>
                                        </div>
                                        <div class={`form-group ${formErrors.addressTitle ? "has-error" : "has-success"} `}>
                                            <label class="col-sm-1 control-label col-lg-1" ></label>
                                            <div class="col-lg-10">
                                                <input type="text" class="form-control" placeholder='Adres Başlığı' name='addressTitle' value={formValues.addressTitle} onChange={handleChange} />
                                                <span class="help-block">{formErrors.addressTitle}</span>
                                            </div>
                                        </div>


                                    </div>
                                    <div class="modal-footer">
                                        <button data-dismiss="modal" class="btn btn-danger" type="button">İptal</button>

                                        {formValues.addressId ?
                                            <button class="btn btn-success" onClick={() => updateAddress()} type="submit">Güncelle</button>
                                            :
                                            <button class="btn btn-theme" onClick={() => saveAddress()} type="submit">Kaydet</button>
                                        }



                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>



                    <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="deleteModal" className="modal fade">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                    <h4 className="modal-title">Adres Silinsin mi?</h4>
                                </div>
                                <div className="modal-body">
                                    <h4>Silmek istediginiz Adres: <b>{deleteAddress.addressTitle}</b></h4>
                                    <table className="table table-striped table-advance table-hover">
                                        <thead>
                                            <tr>
                                                <th><i className="fa fa-slack"></i> </th>
                                                <th> <i className="fa fa-user"></i> Ad Soyad</th>
                                                <th><i className="fa fa-map-marker"></i> İlçe-il</th>
                                                <th><i className=" fa fa-phone"></i> Telefon </th>
                                                <th><i className=" fa fa-edit"></i> Kullanıcı Adı </th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                <tr >
                                                    <td> {deleteAddress.addressId}</td>
                                                    <td className="hidden-phone">{deleteAddress.firstName + " " + deleteAddress.lastName}</td>
                                                    <td>{deleteAddress.state + "-" + deleteAddress.city} </td>
                                                    <td>{deleteAddress.phoneNumber}</td>
                                                    <td>{deleteAddress.userName}</td>

                                                </tr>}
                                        </tbody>
                                    </table>


                                </div>
                                <div className="modal-footer">

                                    <button data-dismiss="modal" className="btn btn-default" type="button">iptal</button>

                                    <button data-dismiss="modal" className="btn btn-danger" onClick={() => addressDelete(deleteAddress.addressId)} type="button">Sil</button>

                                </div>
                            </div>
                        </div>
                    </div>


                </section>
            </section>
            <Footer />
        </>
    );
}

export default Address;