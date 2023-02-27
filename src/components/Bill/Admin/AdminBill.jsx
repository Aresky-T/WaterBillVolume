import React, { useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import FilterYear from '../../Filter/FilterYear';
import FilterMonth from '../../Filter/FilterMonth';
import FilterDate from '../../Filter/FilterDate';
import { addCurrentUser, addPage } from '../../../redux/role.slice';



const BillForAdmin = ({ user, year, month, date, setUser, setYear, setMonth, setDate, setHourStart, setHourEnd }) => {

    const listUsers = useSelector((state) => state.role.admin.listUsers);
    const [filterYear, setFilterYear] = useState(false);
    const [filterMonth, setFilterMonth] = useState(false);
    const [filterDate, setFilterDate] = useState(false);
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.role.admin.currentUser);

    console.log(currentUser)

    return (
        <div className='session bill-admin'>
            <div className="bill_left">
                <h3>Bill</h3>
                <h4>List Users</h4>
                {listUsers && [...listUsers].map((item, index) => (
                    <button
                        className={item._id === currentUser?._id ? 'active' : ''}
                        onClick={() => {
                            dispatch(addCurrentUser(item));
                            dispatch(addPage("bill"))
                        }}
                        key={index}
                    >
                        <span className="username"
                        >{item.username}</span>
                        <IoIosArrowForward />
                    </button>
                ))}
            </div>
            {currentUser && <div className="bill-right">
                <div className="filter-bar">
                    <h4>Filter for {user.username}</h4>
                    <div className='filter-input'>
                        <div>
                            <input type="radio" name="filter" id="year"
                                onChange={() => {
                                    setFilterMonth(false);
                                    setFilterYear(true);
                                    setFilterDate(false)
                                }}
                            />
                            <label htmlFor="year">Year</label>
                        </div>
                        <div>
                            <input type="radio" name="filter" id="month"
                                onChange={() => {
                                    setFilterMonth(true);
                                    setFilterYear(false);
                                    setFilterDate(false)
                                }}
                            />
                            <label htmlFor="month">Month</label>
                        </div>
                        <div>
                            <input type="radio" name="filter" id="date"
                                onChange={() => {
                                    setFilterMonth(false);
                                    setFilterYear(false);
                                    setFilterDate(true)
                                }}
                            />
                            <label htmlFor="date">Date</label>
                        </div>
                    </div>
                </div>
                {filterYear && <><FilterYear setYear={setYear} year={year}/></>}
                {filterMonth && <><FilterMonth setYear={setYear} setMonth={setMonth} year={year} month={month}/></>}
                {filterDate && <><FilterDate setYear={setYear} setMonth={setMonth} setDate={setDate} year={year} month={month} date={date}/></>}
            </div>}
        </div >
    )
}

export default BillForAdmin