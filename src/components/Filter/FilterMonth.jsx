import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getBillForUser, getVolumeForUser } from '../../apis/water.api';
import { ROLE } from '../../constants/role';

const FilterMonth = ({ setMonth, setYear, year, month }) => {

    const user = useSelector((s) => s.role.admin.currentUser);
    const token = useSelector((s) => s.auth.login.token);
    const role = useSelector((s) => s.auth.login.role);
    const dataBill = useSelector((s) => s.water.bill.data)
    const dataVolumn = useSelector((s) => s.water.volumn.data)
    const page = useSelector((s) => s.role.admin.page)
    const dispatch = useDispatch()

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
        const data = {
            userId: user._id,
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
        if (user && year) {
            getBillForUser(data, token);
        }
    }

    function getBillsByAdmin() {
        const data = {
            userId: user._id,
            year: year,
            month: month
        }
        if (user && year && month) {
            getBillForUser(data, token)
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
        switch (e.target.name) {
            case "year":
                setYear(e.target.value);
                break;
            case "month":
                setMonth(e.target.value);
                break;
            default:
        }
    }

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
                style={(year < 1900 || month > 12 || month < 1) ? { pointerEvents: "none", opacity: "0.5" } : {}}
                onClick={toggleGetData}
            >Get data</button>
            <div className="data-bill">
                <p className="total_money">Total money: {dataBill?.totalMoney}</p>
            </div>
            <div className="data-volume">
                {dataVolumn && <div className="cold">
                    <p><b>Cole: </b> <span>Volume: {dataVolumn.cold.volumn}</span></p>
                    <p><b>Hot: </b> <span>Volume: {dataVolumn.hot.dataVolumn}</span>, <span>temp: {dataVolumn.hot.temp}</span></p>
                </div>}
            </div>
        </div>
    )
}

export default FilterMonth