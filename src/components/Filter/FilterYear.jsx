import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getBillForUser, getVolumeForUser } from '../../apis/water.api';
import { ROLE } from '../../constants/role';
import { validateInput } from './config';
import { clearData } from '../../redux/water.slice';
import { useLocation } from 'react-router-dom';

const FilterYear = ({ setYear, year }) => {
    const location = useLocation();
    const page = location.pathname.slice(1);
    const user = useSelector((s) => s.role.admin.currentUser);
    const token = useSelector((s) => s.auth.login.token);
    const role = useSelector((s) => s.auth.login.role);
    const dataBill = useSelector((s) => s.water.bill.data)
    const dataVolumn = useSelector((s) => s.water.volumn.data)
    const dispatch = useDispatch()
    const [isError, setError] = useState(true);

    function getVolume() {
        console.log('getting volume...')
        const data = {
            year: year,
        }

        console.log('data', data)
        if (year) {
            getVolumeForUser(data, token, dispatch)
        }
    }

    function getVolumesByAdmin() {
        const data = {
            userId: user._id,
            year: year,
        }
        if (user && year) {
            getVolumeForUser(data, token, dispatch)
        }
    }

    function getBill() {
        console.log('getting bill...')
        const data = {
            year: year,
        }
        console.log('data', data)
        if (year) {
            getBillForUser(data, token, dispatch);
        }
    }

    function getBillsByAdmin() {
        const data = {
            userId: user._id,
            year: year,
        }
        if (user && year) {
            getBillForUser(data, token, dispatch)
        }
    }



    const toggleGetData = () => {
        console.log(role)
        switch (page) {
            case "bill":
                role === ROLE.ADMIN && getBillsByAdmin();
                role === ROLE.USER && getBill();
                break;
            case "volume":
                role === ROLE.ADMIN && getVolumesByAdmin();
                role === ROLE.USER && getVolume();
                break;
            default:
        }
    }

    const handleChangeInput = (e) => {
        dispatch(clearData());
        const value = e.target.value;
        setYear(value);
    }

    useEffect(() => {
        if (!year) {
            setError(true);
        } else {
            setError(false);
        }
    }, [year])

    useEffect(() => {
        dispatch(clearData());
    }, [])

    return (
        <div className='filter-content year-filter'>
            <label htmlFor="">Year</label>
            <input type="number" name="" id=""
                placeholder='Ex: 2023'
                onChange={handleChangeInput}
            />
            <button className='get-data-btn'
                style={(isError) ? { pointerEvents: "none", opacity: "0.5" } : {}}
                onClick={toggleGetData}
            >Get data</button>
            <div className="data-bill">
                {page === "bill" && <p className="total_money">Total money: {dataBill?.totalMoney}</p>}
            </div>
            <div className="data-volume">
                {page === "volume" &&
                    <>
                        {dataVolumn && <>
                            <p className='temp-text'><b>Cold: </b> <span>Volume: {dataVolumn.cold.volumn}</span></p>
                            <p className='temp-text'><b>Hot: </b> <span>Volume: {dataVolumn.hot.volumn}</span> <span>Temp: {dataVolumn.hot.temp}</span></p>
                        </>}
                    </>}
            </div>
        </div>
    )
}

export default FilterYear
