import React from 'react';
import Header from '../components/template/Header';
import Footer from '../components/template/Footer';
import Delete from '../containers/Delete';
import SideMenu from '../components/template/SideMenu';

function Home() {
    return (
        <div>
            <Header />
            <SideMenu />


            <section id="main-content">
                <section className="wrapper site-min-height">
                    <h3><i className="fa fa-angle-right"></i> Home Page</h3>
                    <div className="row mt">
                        <div className="col-lg-12">

                            <h1> Home Sayfasına hoş geldiniz..</h1>
                            <Delete />

                        </div>
                    </div>

                </section>
            </section>
            <Footer />
        </div>
    );
}

export default Home;