import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getBillForUser, getVolumeForUser } from '../../apis/water.api';
import { ROLE } from '../../constants/role';
import { clearData } from '../../redux/water.slice';
import { useLocation } from 'react-router-dom';

const FilterMonth = ({ setMonth, setYear, year, month }) => {

    const location = useLocation();
    const page = location.pathname.slice(1);
    const user = useSelector((s) => s.role.admin.currentUser);
    const token = useSelector((s) => s.auth.login.token);
    const role = useSelector((s) => s.auth.login.role);
    const dataBill = useSelector((s) => s.water.bill.data)
    const dataVolumn = useSelector((s) => s.water.volumn.data)
    const [isError, setError] = useState();
    const dispatch = useDispatch();

    function getVolume() {
        const data = {
            year: year,
            month: month,
        }
        if (year && month) {
            getVolumeForUser(data, token, dispatch)
        }
    }

    function getVolumesByAdmin() {
        console.log(user)
        const data = {
            userId: user?._id,
            year: year,
            month: month,
        }
        if (user && year && month) {
            getVolumeForUser(data, token, dispatch)
        }
    }

    function getBill() {
        const data = {
            year: year,
            month: month
        }
        if (year && month) {
            getBillForUser(data, token, dispatch);
        }
    }

    function getBillsByAdmin() {
        console.log("user: ", user.id)
        const data = {
            userId: user?._id,
            year: year,
            month: month
        }
        if (user && year && month) {
            getBillForUser(data, token, dispatch)
        }
    }

    const toggleGetData = () => {
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
        const name = e.target.name;
        switch (name) {
            case "year":
                setYear(value);
                break;
            case "month":
                setMonth(value);
                break;
            default:
        }
    }

    useEffect(() => {
        if (!year || !month) {
            setError(true);
        } else {
            setError(false);
        };
    }, [year, month])

    useEffect(() => {
        dispatch(clearData());
    }, [])

    return (
        <div className="filter-content month-filter">
            <label htmlFor="">Year</label>
            <input type="number" name="year"
                placeholder='Ex: 2023'
                onChange={handleChangeInput}
            />
            <label htmlFor="">Month</label>
            <input type="number" name="month"
                placeholder='Ex: 1'
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

export default FilterMonth