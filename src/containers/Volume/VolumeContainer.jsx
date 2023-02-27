import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ROLE } from "../../constants/role";
import VolumeForAdmin from "../../components/Volume/Admin/AdminVolume";
import VolumeForUser from "../../components/Volume/User/UserVolume";
import { getVolumeForUser } from '../../apis/water.api'
import { addVolume } from "../../redux/water.slice";

const Volume = (props) => {
    const role = useSelector((state) => state.auth.login.role);
    const [year, setYear] = useState();
    const [month, setMonth] = useState();
    const [date, setDate] = useState();
    const [hourStart, setHourStart] = useState();
    const [hourEnd, setHourEnd] = useState();

    return (
        <>
            {role === ROLE.ADMIN && <VolumeForAdmin
                year={year}
                month={month}
                date={date}
                setYear={setYear}
                setMonth={setMonth}
                setDate={setDate}
                setHourStart={setHourStart}
                setHourEnd={setHourEnd}
            />}
            {role === ROLE.USER && <VolumeForUser
                year={year}
                month={month}
                date={date}
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