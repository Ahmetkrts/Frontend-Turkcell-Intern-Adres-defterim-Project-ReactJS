import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { authLogout } from '../../stores/Auth'


function Header() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/login');
    }

    return (

        <div>
            <header className="header black-bg">
                <div className="sidebar-toggle-box">

                </div>
                <a href="index.html" className="logo"><b>ADRES DEFTERİM</b></a>
                <div className="nav notify-row" id="top_menu">
                </div>
                <div className="top-menu">
                    <ul className="nav pull-right top-menu">
                        {user &&
                            <>
                                <li><Link to="/login" onClick={() => handleLogout()} className='logout'>Logout</Link></li>
                            </>}

                        {!user &&
                            <>
                                <li><Link to="/login" className='login'>Login</Link></li>
                                <li><Link to="/register" className='register'>Register</Link></li>
                            </>}
                    </ul>
                </div>
            </header>
        </div>

    );
}

export default Header;