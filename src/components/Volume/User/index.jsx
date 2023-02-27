import React, { useEffect, useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { useSelector } from 'react-redux';

function VolumeForUser({ year, month, setUser, setYear, setMonth, setDate, setHourStart, setHourEnd }) {
    const currentYear = new Date().getFullYear();
    const [filterYear, setFilterYear] = useState(false);
    const [filterMonth, setFilterMonth] = useState(false);
    const [filterDate, setFilterDate] = useState(false);


    let years = new Set();
    let months = new Set();
    let dates = new Set();

    for (let year = currentYear; year >= 1900; year--) {
        years.add(year);
    }

    if (year) {
        let d = new Date();
        let now = new Date();
        d.setFullYear(year);
        console.log(d.getFullYear())
        if (d.getFullYear() >= now.getFullYear()) {
            for (let month = 1; month <= d.getMonth() + 1; month++) {
                months.add(month);
            }
        } else {
            for (let month = 1; month <= 12; month++) {
                months.add(month);
            }
        }
    }

    if (month) {
        let d = new Date();
        d.setFullYear(year);
        d.setMonth(month);

        for (let date = 1; date <= d.getDate(); date++) {
            dates.add(date);
        }
    }
    return (
        <div className='session volume-admin'>
            <div className="volume_left">
                <h3>Volume</h3>
            </div>
            <div className="volume-right">
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
                {filterYear && <div className='filter-content year-filter'>
                    <label htmlFor="">Year</label>
                    <select name="" id=""
                        onChange={(e) => setYear(e.target.value)}
                    >
                        <option value="">--select year--</option>
                        {[...years].map(year => (
                            <option value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>}
                {filterMonth &&
                    <div className="filter-content month-filter">
                        <label htmlFor="">Year</label>
                        <select name="" id=""
                            onChange={(e) => setYear(e.target.value)}
                        >
                            <option value="">--select year--</option>
                            {[...years].map(year => (
                                <option value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="">Month</label>
                        <select name="" id=""
                            onChange={(e) => setMonth(e.target.value)}
                        >
                            <option value="">--select month--</option>
                            {[...months].map(month => (
                                <option value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                    </div>
                }
                {filterDate && <div className="filter-content date-filter">
                    <label htmlFor="">Date</label>
                    <input type="date" name="" id=""

                    />
                </div>}
            </div>
        </div >
    );
}

export default VolumeForUser;