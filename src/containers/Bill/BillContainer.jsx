import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ROLE } from '../../constants/role';
import BillForAdmin from '../../components/Bill/Admin/AdminBill';
import BillForUser from '../../components/Bill/User/UserBill';
import { getBillForUser } from '../../apis/water.api'

const Bill = () => {

  const role = useSelector((state) => state.auth.login.role);
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [date, setDate] = useState();
  const [hourStart, setHourStart] = useState();
  const [hourEnd, setHourEnd] = useState();
  const [user, setUser] = useState('');

  console.log({ userId: user._id, year, month, date })


  return (
    <div>
      {role === ROLE.ADMIN && <BillForAdmin
        user={user}
        year={year}
        month={month}
        date={date}
        setUser={setUser}
        setYear={setYear}
        setMonth={setMonth}
        setDate={setDate}
        setHourStart={setHourStart}
        setHourEnd={setHourEnd}
      />}
      {role === ROLE.USER && <BillForUser
        year={year}
        month={month}
        date={date}
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