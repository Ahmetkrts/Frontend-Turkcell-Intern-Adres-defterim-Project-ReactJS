import React from 'react';
import Header from '../components/template/Header';
import Footer from '../components/template/Footer';

function NotFound() {
    return (
        <div>
            <Header />


            <section id="main-content">
                <section className="wrapper site-min-height">
                    <h3><i className="fa fa-angle-right"></i> Not Found</h3>
                    <div className="row mt">
                        <div className="col-lg-12">
                            <h1>Yanlış Sayfaya Geldiniz.. <br />Lütfen Giriş Yapınız..</h1>


                        </div>
                    </div>

                </section>
            </section>
            <Footer />
        </div>
    );
}

export default NotFound;