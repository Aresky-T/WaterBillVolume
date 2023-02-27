import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ROLE } from "../../constants/role";
import VolumeForAdmin from "../../components/Volume/Admin/AdminVolume";
import VolumeForUser from "../../components/Volume/User/UserVolume";
import { getVolumeForUser } from '../../apis/water.api'
import { addVolume } from "../../redux/water.slice";

const Volume = (props) => {
    const token = useSelector((state) => state.auth.login.token);
    const role = useSelector((state) => state.auth.login.role);
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [date, setDate] = useState('');
    const [hourStart, setHourStart] = useState('');
    const [hourEnd, setHourEnd] = useState('');
    const [user, setUser] = useState('');
    const dispatch = useDispatch();

    console.log({ userId: user._id, year, month, date })
    return (
        <>
            {role === ROLE.ADMIN && <VolumeForAdmin
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
            {role === ROLE.USER && <VolumeForUser
                setYear={setYear}
                setMonth={setMonth}
                setDate={setDate}
                setHourStart={setHourStart}
                setHourEnd={setHourEnd}
            />}
        </>
    )
}

export default Volume;