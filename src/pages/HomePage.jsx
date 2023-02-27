import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const HomePage = () => {

    const navigate = useNavigate();
    const token = useSelector(state => state.auth.login.token);

    useEffect(() => {
        if(!token){
            navigate("/auth/login")
        } else {
          navigate('/bill')
        }
    })

  return (
    <div>
    </div>
  )
}

export default HomePage
