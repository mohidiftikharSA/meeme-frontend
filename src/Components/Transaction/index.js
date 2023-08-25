import React from 'react'
import Heading from 'Components/Heading';
import { Card } from 'react-bootstrap';
import coin from "../../Images/coin.png";
import classes from "./index.module.scss";


const transactionData = [
    {
        coins: '50,000',
        date: 'Oct 20, 2022'

    },
    {
        coins: '10,000',
        date: 'Sept 12, 2022'

    }
]
const Transaction = () => {
    return (
        <Card className={'profileCard'}>
            <Heading title={'Transaction History'} />
            <ul className={classes.transaction}>
                {
                    transactionData.map((item, ind) => {
                        return (
                            <li>
                                <div className={classes.head}>
                                    <img src={coin} alt="coin" ></img>
                                    <p className={classes.title}>{item.coins}</p>
                                </div>
                                <span>{item.date}</span>
                            </li>
                        )
                    })
                }
            </ul>
        </Card>
    );
};

export default Transaction
