import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../constants/router';
import Navbar from './Navbar';

const PrivateRoute = (props) => {
    const token = useSelector(s => s.auth.login.token);
    const navigate = useNavigate()

    useEffect(() => {
        if(token === null) {
            navigate(ROUTE.LOGIN)
        }
    },[navigate, token])

    useEffect(() => {
        document.title = props.title;
    }, [props.title])
  return (
    <>
      <Navbar/>
      <>{props.children}</>  
    </>
  )
}

export default PrivateRoute