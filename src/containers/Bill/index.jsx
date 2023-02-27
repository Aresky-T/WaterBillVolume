import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ROLE } from '../../constants/role';
import BillForAdmin from '../../components/Bill/Admin/index';
import BillForUser from '../../components/Bill/User/index';
import { getBillForUser } from '../../apis/water.api'

const Bill = () => {

  const token = useSelector((state) => state.auth.login.token);
  const role = useSelector((state) => state.auth.login.role);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [date, setDate] = useState('');
  const [hourStart, setHourStart] = useState('');
  const [hourEnd, setHourEnd] = useState('');
  const [user, setUser] = useState('');

  function getBill() {
    const data = {
      year: year,
      month: month,
      date: date,
      h_start: hourStart,
      h_end: hourEnd
    }
    getBillForUser(data, token)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function getBillsByAdmin() {
    const data = {
      userId: user._id,
      year: year,
      month: month,
      date: date,
      h_start: hourStart,
      h_end: hourEnd
    }
    getBillForUser(data, token)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    role === ROLE.ADMIN && getBillsByAdmin()
    role === ROLE.USER && getBill();
  }, [role])

  useEffect(() => {
    const data = {
      year: year,
      month: month,
      date: date,
      h_start: hourStart,
      h_end: hourEnd
    }
    role === ROLE.USER && getBillForUser(data, token)
  }, [role])

  console.log({ userId: user._id, year, month, date })


  return (
    <div>
      {role === ROLE.ADMIN && <BillForAdmin
        user={user}
        year={year}
        month={month}
        setUser={setUser}
        setYear={setYear}
        setMonth={setMonth}
        setDate={setDate}
        setHourStart={setHourStart}
        setHourEnd={setHourEnd}
      />}
      {role === ROLE.USER && <BillForUser
        setYear={setYear}
        setMonth={setMonth}
        setDate={setDate}
        setHourStart={setHourStart}
        setHourEnd={setHourEnd}
      />}
    </div>
  )
}

export default Bill