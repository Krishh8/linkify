import { Outlet } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import { useDispatch } from 'react-redux';
import { setUser } from './redux/userSlice';
import { BASE_URL } from './constants';
import { useEffect } from 'react';
import axios from 'axios';

function App() {


  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}


export default App
