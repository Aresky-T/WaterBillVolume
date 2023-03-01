import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getBillForUser, getVolumeForUser } from '../../apis/water.api';
import { ROLE } from '../../constants/role';
import { validateInput } from './config';
import { clearData } from '../../redux/water.slice';
import { useLocation } from 'react-router-dom';

const FilterDate = ({ setYear, setMonth, setDate, year, month, date }) => {

    const location = useLocation();
    const page = location.pathname.slice(1);
    const user = useSelector((s) => s.role.admin.currentUser);
    const token = useSelector((s) => s.auth.login.token);
    const role = useSelector((s) => s.auth.login.role);
    const dataBill = useSelector((s) => s.water.bill.data)
    const dataVolumn = useSelector((s) => s.water.volumn.data)
    const dispatch = useDispatch()
    const [isError, setError] = useState(true);

    function getBill() {
        const data = {
            year: year,
            month: month,
            date: date
        }
        if (year && date) {
            getBillForUser(data, token, dispatch);
        }
    }

    function getBillsByAdmin() {
        const data = {
            userId: user._id,
            year: year,
            month: month,
            date: date
        }
        if (user && year && month && date) {
            getBillForUser(data, token, dispatch)
        }
    }

    function getVolume() {
        const data = {
            year: year,
            month: month,
            date: date,
        }
        if (year && month && date) {
            getVolumeForUser(data, token, dispatch)
        }
    }

    function getVolumesByAdmin() {
        const data = {
            userId: user._id,
            year: year,
            month: month,
            date: date,
            // h_start: hourStart,
            // h_end: hourEnd
        }
        console.log(data)
        if (user && year && month && date) {
            getVolumeForUser(data, token, dispatch)
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
        const value = Number(e.target.value);
        const name = e.target.name;
        let err;
        switch (name) {
            case "year":
                setYear(value);
                err = validateInput("year", value);
                if (err) {
                    setError(true);
                }
                break;
            case "month":
                setMonth(value);
                break;
            case "date":
                setDate(value);
                break;
            default:
        }
    }

    useEffect(() => {
        if (!year || !month || !date) {
            setError(true);
        } else {
            setError(false);
        };
    }, [year, month, date])

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
            <label htmlFor="">Date</label>
            <input type="number" name="date"
                placeholder='Ex: 30'
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

export default FilterDate