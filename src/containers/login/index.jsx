import React from 'react'
import { useFormik } from 'formik';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdError } from 'react-icons/md';
import { userImageUrl } from '../../constants/imageUrl';
import Loading from '../../components/Loading';
import { loginStart, loginUserSuccess, loginAdminSuccess, loginError, clearErrorRedux } from '../../redux/auth.slice';
import { loginAdminApi, loginUserApi } from '../../apis/auth.api';
import { toast } from 'react-hot-toast';
import { ROLE } from '../../constants/role';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const errorMessage = useSelector(state => state.auth.login.loginErrorMessage)
    const isLoading = useSelector(state => state.auth.login.isLoading);
    const [role, setRole] = useState('');

    const handleLoginUser = (data) => {
        loginUserApi(data, dispatch)
            .then(res => {
                dispatch(loginUserSuccess(res.data));
                localStorage.setItem('role', ROLE.USER)
                localStorage.setItem('access_token', res.data.token);
                navigate('/bill');
            })
            .catch(err => {
                console.log(err);
                dispatch(loginError("Your account invalid!"));
                toast.error("Login failed!")
            })
    }

    const handleLoginAdmin = (data) => {
        loginAdminApi(data, dispatch)
            .then(res => {
                dispatch(loginAdminSuccess(res.data));
                localStorage.setItem('role', ROLE.ADMIN);
                localStorage.setItem('access_token', res.data.token);
                navigate('/bill');
            })
            .catch(err => {
                console.log(err);
                dispatch(loginError("Your account invalid!"));
                toast.error("Login failed!")
            })
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: yup.object().shape({
            email: yup.string().required('Required'),
            password: yup.string().required('Required')
        }),
        onSubmit: values => {
            if (role.length > 0) {
                role === "user" && handleLoginUser(values);
                role === "admin" && handleLoginAdmin(values);
            } else {
                toast.error('Please choose a role before submitting');
            }
        }
    })
    return (
        <div className='container-signin'>
            <div className='wrap-signin'>
                <form className='signin-form' onSubmit={formik.handleSubmit}>
                    <span className='signin-form-title'>Sign In</span>
                    <span className='signin-form-avatar'>
                        <img src={userImageUrl} alt='' />
                    </span>
                    <div className='wrap-input'>
                        <input
                            type="text"
                            id='email'
                            name='email'
                            value={formik.values.email}
                            onChange={(e) => {
                                formik.handleChange(e);
                                dispatch(clearErrorRedux());
                            }}
                            className='input'
                            placeholder="Username"
                        />
                        <label htmlFor="username" className='form-label'>Email</label>
                    </div>
                    <div className='wrap-input'>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name='password'
                            value={formik.values.password}
                            className='input'
                            onChange={(e) => {
                                formik.handleChange(e);
                                dispatch(clearErrorRedux());
                            }}
                            placeholder="Password"
                        />
                        <span className='btn-eye'
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {
                                showPassword ?
                                    <AiFillEye />
                                    :
                                    <AiFillEyeInvisible />
                            }
                        </span>
                        <label htmlFor="password" className='form-label'>Password</label>
                    </div>
                    <div className='error-message'>
                        {errorMessage && <span><MdError /> {errorMessage}</span>}
                    </div>
                    <div className="role-select">
                        <p>You are:</p>
                        <div className="role-input">
                            <input type="radio" name="role" id="user" value="user"
                                onChange={(e) => setRole(e.target.value)}
                            />
                            <label htmlFor="user">user</label>
                        </div>
                        <div className="role-input">
                            <input type="radio" name="role" id="admin" value="admin"
                                onChange={(e) => setRole(e.target.value)}
                            />
                            <label htmlFor="admin">admin</label>
                        </div>
                    </div>
                    <div className='signin-form-btn'>
                        <button type="submit" className='signin-btn'>Sign In</button>
                    </div>
                    <ul className='signin-more'>
                        <li>
                            <span className='txt1'> ⭐ Forgot </span>
                            <Link className='txt2'> Username / Password </Link>
                        </li>
                        <li>
                            <span className='txt1'> ⭐ Don't have an account? </span>
                            <Link className='txt2' to='/auth/register'> Sign up</Link>
                        </li>
                    </ul>
                </form>
            </div>
            <Loading isLoading={isLoading} />
            {/* <ToastContainer /> */}
        </div>
    )
}

export default Login
