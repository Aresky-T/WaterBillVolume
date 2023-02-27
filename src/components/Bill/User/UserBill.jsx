import React, { useEffect, useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import FilterDate from '../../Filter/FilterDate';
import FilterMonth from '../../Filter/FilterMonth';
import FilterYear from '../../Filter/FilterYear';
import { addPage } from '../../../redux/role.slice';

const BillForUser = ({year, month, date, setUser, setYear, setMonth, setDate, setHourStart, setHourEnd }) => {

    const [filterYear, setFilterYear] = useState(false);
    const [filterMonth, setFilterMonth] = useState(false);
    const [filterDate, setFilterDate] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(addPage("bill"))
    })

    return (
        <div className='session bill-admin'>
            <div className="bill_left">
                <h3>Bill</h3>     
            </div>
            <div className="bill-right">
                <div className="filter-bar">
                    <h4>Filter for you</h4>
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
            </div>
        </div >
    )
}

export default BillForUser