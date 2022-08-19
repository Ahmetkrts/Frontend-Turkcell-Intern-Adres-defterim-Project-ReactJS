import React from 'react';

function SideMenu() {
    return (
        <div>
            <aside>
                <div id="sidebar" className="nav-collapse ">
                    <ul className="sidebar-menu" id="nav-accordion">
                        <p className="centered">
                            <a href="profile.html">
                                <img src="assets/img/ui-sam.jpg" className="img-circle" alt='profile image' width="60" />
                            </a>
                        </p>
                        <h5 className="centered">Giriş Yapan Kullanıcı</h5>
                        <li className="mt">
                            <a className="active" href="index.html">
                                <i className="fa fa-dashboard"></i>
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li className="mt">
                            <a href="index.html">
                                <i className="fa fa-map"></i>
                                <span>Adreslerim</span>
                            </a>
                        </li>
                        <li className="mt">
                            <a href="index.html">
                                <i className="fa fa-users"></i>
                                <span>Kullanıcılar</span>
                            </a>
                        </li>

                    </ul>

                </div>
            </aside>

        </div>
    );
}

export default SideMenu;