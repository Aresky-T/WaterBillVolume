import React, { useEffect } from 'react'
import { faHome, faSignInAlt, faRegistered } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DropdownNavbar from './DropdownNavbar';
import { userImageUrl } from '../constants/imageUrl';


const Navbar = () => {

    const location = useLocation();
    const tokenUser = useSelector(state => state.auth.login.token);
    const dropdownRef = React.useRef();
    const [height, setHeight] = React.useState(0);
    const token = useSelector(state => state.auth.login.token)
    const role = useSelector(state => state.auth.login.role);
    const dispatch = useDispatch();

    const closeDropdown = () => {
        setHeight(0);
    }

    const links = [
        {
            name: 'Bill',
            path: '/bill',
            icon: ''
        },
        {
            name: 'Volume',
            path: '/volume',
            icon: ''
        },
        {
            name: 'Login',
            path: '/auth/login',
            icon: faSignInAlt
        },
        {
            name: 'Register',
            path: '/auth/register',
            icon: faRegistered
        }
    ];

    //--------------------------------UseEffect to close dropdown-----------------
    useEffect(() => {
        /**
         * If the dropdown menu is open and the user clicks outside of the dropdown, close the dropdown menu.
         */
        let handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                closeDropdown()
            }
        }
        document.addEventListener("mousedown", handler, height === "auto")
        return document.removeEventListener("mousedown", handler, height === 0);
    })

    return (
        <div className='navbar container'>
            <a className='logo'>LOGO <span>{role?.toUpperCase()}</span></a>
            <div className="nav-links">
                {tokenUser && <div className="nav-links-items">
                    {[links[0], links[1]].map(link => (
                        <Link to={link.path}
                            key={link.name}
                            className={location.pathname === link.path ? "active" : ""}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>}
                <div className='nav-links-main'>
                    {tokenUser ?
                        <div ref={dropdownRef}>
                            <img src={userImageUrl}
                                alt=''
                                className='user-pic'
                                aria-expanded={height !== 0}
                                onClick={() => setHeight(height === 0 ? "auto" : 0)}
                            />
                            <DropdownNavbar height={height} token={token} closeDropdown={closeDropdown} />
                        </div> :
                        <>
                            {[links[2], links[3]].map(link => (
                                <Link
                                    to={link.path}
                                    key={link.name}
                                    className={location.pathname === link.path ? "active" : ""}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar