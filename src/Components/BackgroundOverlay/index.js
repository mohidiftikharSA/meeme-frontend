import React, { useEffect, useState } from "react";
import coin from "../../Images/coin.png";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import classes from "./index.module.scss";
import { coinConvert } from "Helper/Converters";
import ThemesAPIs from "../../APIs/amazonCard";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { coinsUsed } from "Redux/reducers/buyCoins";


const BackgroundOverlay = ({ data, noCoin }) => {
    const [purchasedItems, setPurchasedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()


    useEffect(() => {
        getPurchasedItems();
    }, [])

    const getPurchasedItems = async () => {
        setIsLoading(true);
        const res = await ThemesAPIs.getPuchasedItems();
        if (res) {
            console.log("Response of the Purchased  == ", res.data);
            setPurchasedItems(res.data?.store);
        }
    };

    function isItemPurchase(nameToCheck) {
        return purchasedItems?.some(obj => obj.name.includes(nameToCheck));
    }

    const buyBackground = async (name, amount) => {
        setIsLoading(true);
        try {
            console.log("but  ", name, amount);
            const buy = await ThemesAPIs.buyItem({ name, amount });
            if (buy) {
                setPurchasedItems(prevstate =>
                    [...prevstate, { name, amount }],
                )
                console.log("Theme Purshased Successfully ", buy.data?.message);
                if (buy.data?.message === 'Item Exists') {
                    toast.error(buy.data?.message)
                } else {
                    toast.success(buy.data?.message)
                    dispatch(coinsUsed(amount));
                }
            }
        } catch (error) {
            console.log("Error in Theme buy =", error);
            toast.error("Try Again After Some time")
        }

        setIsLoading(false);
    };


    return (
        <Row>
            {data.map((item, ind) => {
                return (
                    <Col md={4} sm={6} key={ind} className="mb-md-0 mb-3">
                        <div className={`${noCoin && `tab-card-box`}`}>
                            {noCoin ? <h6>{item.title}</h6> : ""}
                            <div className={`imgBox mb-3 ${classes.imgBox}`}>
                                <img src={item.img} alt="img" />
                            </div>
                            {
                                noCoin ?
                                    ""
                                    :
                                    <Link
                                        onClick={() => { buyBackground(item?.name, item?.coin) }}
                                        className={`btn ${isItemPurchase(item?.name) ? 'purchasedPill' : 'iconBtncust'} `}
                                        style={{ maxWidth: "85px", height: "30px" }}>
                                        {!isItemPurchase(item?.name) && <img width={100} src={coin} alt="icon" />}
                                        <span className={"text"}>{isItemPurchase(item?.name) ? 'Purchased' : coinConvert((item.coin))}</span>
                                    </Link>
                            }
                        </div>
                    </Col>
                );
            })}
        </Row>
    );
};

export default BackgroundOverlay;
