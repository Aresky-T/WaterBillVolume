import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getBillForUser, getVolumeForUser } from '../../apis/water.api';
import { ROLE } from '../../constants/role';

const FilterYear = ({ setYear, year }) => {

    const user = useSelector((s) => s.role.admin.currentUser);
    const token = useSelector((s) => s.auth.login.token);
    const role = useSelector((s) => s.auth.login.role);
    const dataBill = useSelector((s) => s.water.bill.data)
    const dataVolumn = useSelector((s) => s.water.volumn.data)
    const page = useSelector((s) => s.role.admin.page)

    console.log(dataVolumn)

    const dispatch = useDispatch()

    function getVolume() {
        const data = {
            year: year,
        }
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
        const data = {
            year: year,
        }
        if (user && year) {
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
        setYear(e.target.value);
    }

    return (
        <div className='filter-content year-filter'>
            <label htmlFor="">Year</label>
            <input type="number" name="" id=""
                placeholder='Ex: 2023'
                onChange={handleChangeInput}
            />
            <button className='get-data-btn'
                style={(year < 1900) ? { pointerEvents: "none", opacity: "0.5" } : {}}
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

export default FilterYear
