import {  Route, Routes } from 'react-router-dom'
import Login from './containers/Login';
import Register from './containers/Register';
import Home from './pages/Home';
import UserDetails from './pages/UserDetails';
import NotFound from './pages/NotFound';
import { useSelector } from 'react-redux';
import Address from './pages/Address';


function App() {
  const { user } = useSelector(state => state.auth);
  return (


    <Routes>

      {/*Herkese açık sayfalar */}
      <Route path='/' element={<Home />} />

      <Route path='/*' element={<NotFound />} />
      <Route path='/address' element={<Address />} />

      {/*kullanıcı giriş yapmadıgında açık olan sayfalar */}
      {!user && <>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </>}

      {/*Kullanıcı Giriş yaptıgında açık olan sayfalar */}
      {user && <>
        <Route path='/userDetails' element={<UserDetails />} />

      </>}














    </Routes>
  );
}

export default App;
