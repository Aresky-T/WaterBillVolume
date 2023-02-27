import { useFormik } from 'formik';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { Toaster, toast } from 'react-hot-toast';
import Loading from '../../components/Loading';
import { MdError } from 'react-icons/md';
import { REGEX_EMAIL, REGEX_USERNAME, REGEX_PASSWORD } from '../../constants/regex'
import { registerError } from '../../redux/auth.slice';

const Register = () => {

  const [showPassword, setShowPassword] = useState(false);
  const isLoading = useSelector(state => state.auth.register.isLoading);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string().min(5, 'Too Short').required('Required').matches(REGEX_USERNAME, 'Username may include _ and – having a length of 5 to 30 characters'),
      email: yup.string().required('Required').matches(REGEX_EMAIL, 'Email invalid'),
      password: yup.string().min(6, "Password must contain at least 6 characters").required('Required'),
      confirmPassword: yup.string().required('Required').oneOf([yup.ref("password"), null], 'Confirmed password must match password'),
    }),
    onSubmit: values => {
      console.log(values)
    }
  })

  const togglePassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <>
      <div className='container-signup'>
        <div className='wrap-signup'>
          <form className='signup-form' onSubmit={formik.handleSubmit}>
            <span className='signup-form-title'>Sign Up</span>

            <div className='wrap-input'>
              <input
                type="text"
                id='username'
                name='username'
                value={formik.values.username}
                onChange={formik.handleChange}
                className='input'
                placeholder="Username"
              />
              <label htmlFor="username" className='form-label'>Username</label>
              {formik.errors.username &&
                (
                  <div className='wrap-input-err'>
                    <MdError className='validate-error-icon' />
                    <span className="err-text">{formik.errors.username}</span>
                  </div>
                )
              }
            </div>
            <div className='wrap-input'>
              <input
                type="email"
                id='email'
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                className='input'
                placeholder="Enter your email"
              />
              <label htmlFor="email" className='form-label'>Email</label>
              {formik.errors.email &&
                (
                  <div className='wrap-input-err'>
                    <MdError className='validate-error-icon' />
                    <span className="err-text">{formik.errors.email}</span>
                  </div>
                )
              }
            </div>
            <div className='wrap-input'>
              <input
                type={showPassword ? "text" : "password"}
                id='password'
                name='password'
                value={formik.values.password}
                className='input'
                onChange={formik.handleChange}
                placeholder="Password"
              />
              <label htmlFor="password" className='form-label'>Password</label>
              {formik.errors.password &&
                (
                  <div className='wrap-input-err'>
                    <MdError className='validate-error-icon' />
                    <span className="err-text">{formik.errors.password}</span>
                  </div>
                )
              }
            </div>
            <div className='wrap-input'>
              <input
                type={showPassword ? "text" : "password"}
                id='confirmPassword'
                name='confirmPassword'
                value={formik.values.confirmPassword}
                className='input'
                onChange={formik.handleChange}
                placeholder="Confirm Password"
              />
              <label htmlFor="confirmPassword" className='form-label'>Confirm password</label>
              {formik.errors.confirmPassword &&
                (
                  <div className='wrap-input-err'>
                    <MdError className='validate-error-icon' />
                    <span className="err-text">{formik.errors.confirmPassword}</span>
                  </div>
                )
              }
            </div>
            <div className='show-password'>
              <input type='checkbox'
                id='show-pass'
                checked={showPassword}
                onChange={togglePassword}
              />
              <label htmlFor='show-pass'>Show password</label>
            </div>
            <div className='signup-form-btn'>
              <button type="submit" className='signup-btn'>Create Account</button>
            </div>
            <div className='signup-more'>
              <ul>
                <li>
                  <span className='txt1'> ⭐ Already have an account? <Link className='txt2' to='/auth/sign-in'>Sign in</Link></span>
                </li>
              </ul>
            </div>
          </form>
        </div>
      </div>
      <Loading isLoading={isLoading} /></>
  )
}
export default Register;