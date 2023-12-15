import React, { useEffect, useState } from "react";
import classes from "./index.module.scss";
import img from "../../Images/tornament.png";
import { BiInfoCircle } from "react-icons/bi";
import { Button } from "react-bootstrap";
import InfoModal from "Components/InfoModal";
import PostContentModal from "Components/TournamentModal";
import TournamentAPIs from '../../APIs/tournaments';
import Loader from "Components/Loader";

const TournamentTabs = () => {
  const [show, setShow] = useState(false);
  const [banner, setBanner] = useState(null);
  const [tournamentModalShow, settournamentModalShow] = useState(false);
  const [joined, setJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rules, setRules] = useState();
  useEffect(() => {
    getTournamentBanner();

  }, [])

  const getTournamentBanner = async () => {
    setIsLoading(true);
    const res = await TournamentAPIs.getTournamentBanner();
    if (res) {
      setBanner(res.data);
      /**
       * Get Rukes of the Tournamnet after getting Tournament.
       */
      const rules = await TournamentAPIs.getRules(res.data.tournament.id).finally(() => {
        setIsLoading(false);
      });
      if (rules) {
        console.log("Rules of the Tournament == ", rules.data?.tournament_rules?.rules[0]);
        setRules(rules.data?.tournament_rules?.rules[0])
      }
    }
    setIsLoading(false)
  }

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      {banner ?
        <>
          <div className="text-end mb-2">
            <span
              className={classes.icon}
              onClick={() => {
                setShow(true);
              }}
            >
              <BiInfoCircle />
            </span>
          </div>
          <div className={`imgBox mb-4 position-relative ${classes.imgBox}`}>
            {/* <img src={img} alt="img" /> */}
            <div className={classes.bannerCard} >
              <img src={banner?.tournament_banner_image} alt="Bannerimage" />
              <p>{banner?.tournament?.title}</p>
            </div>
            <div className={classes.scoreBoard}>
              <span>{banner?.tournament_users_count} Particpants</span>
              <span>{banner?.tournament_posts_count} Meme Posts</span>
            </div>
          </div>

          {!banner?.is_current_user_enrolled && !joined ?
            <div className="text-center">
              <Button className={`p-2 authButton ${classes.btn}`} onClick={() => {
                settournamentModalShow(true);
              }}>Enter Tournament</Button>
            </div>
            : ''
          }
          <InfoModal tournament rules={rules} show={show} onHide={() => setShow(false)} />
          <PostContentModal tournament tournamentid={banner?.tournament?.id} show={tournamentModalShow} onHide={() => settournamentModalShow(false)} tournamentJoined={setJoined} />
        </>
        : <p>No Tournament is Played at the Moment</p>
      }
    </>
  );
};

export default TournamentTabs;
