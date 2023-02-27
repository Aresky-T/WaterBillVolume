import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5';
import { GrFormNext } from 'react-icons/gr';
import AnimateHeight from 'react-animate-height';
import { logout } from '../redux/auth.slice';

const DropdownNavbar = ({ height, closeDropdown }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const closeDropdownNavbar = () => {
        closeDropdown(0);
    }

    const signOutUser = () => {
        localStorage.clear();
        dispatch(logout());
        navigate('/');
    }

    return (
        <AnimateHeight
            className='sub-menu-wrap'
            id='subMenu'
            duration={300}
            height={height}
        >

            <div className='sub-menu'>
                <div className='sub-menu-link'
                    onClick={() => {
                        closeDropdownNavbar();
                        signOutUser();
                    }}
                >
                    <IoLogOut className='sub-menu-link-before' />
                    <p>Sign out</p>
                    <GrFormNext className='sub-menu-link-after' />
                </div>
            </div>
        </AnimateHeight>
    )
}

export default DropdownNavbar