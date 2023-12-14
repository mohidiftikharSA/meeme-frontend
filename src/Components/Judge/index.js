import React, {useEffect, useState} from 'react'
import classes from "./index.module.scss"
import banner from "../../Images/judgeBg.png"
import History from 'Components/History'
import api from 'APIs/tournaments'
import Loader from "../Loader";

const Judge = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [tournamentData, setTournamentData] = useState([])
    const getTournamentJudge = async () => {
        setIsLoading(true)
        const response = await api.getTournamentJudge().finally(() => {
            setIsLoading(false);
        });
        setTournamentData(response.data)
    }
    useEffect(() => {
        getTournamentJudge();
    }, []);
    return (isLoading ? <Loader isLoading={isLoading}></Loader> : <>
        <div className={classes.judgeHolder}>
            <div className='imgBox my-4'>
                <img src={banner} alt='img'/>
            </div>
            <History tournamentData={tournamentData}/>
        </div>
    </>)
}

export default Judge
