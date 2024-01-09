import React, { useEffect, useState } from "react";
import classes from "./index.module.scss";
import img from "../../Images/tornament.png";
import { BiInfoCircle } from "react-icons/bi";
import { Button } from "react-bootstrap";
import InfoModal from "Components/InfoModal";
import PostContentModal from "Components/TournamentModal";
import TournamentAPIs from '../../APIs/tournaments';
import Loader from "Components/Loader";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const TournamentTabs = () => {
  const [show, setShow] = useState(false);
  const [banner, setBanner] = useState(null);
  const [tournamentModalShow, settournamentModalShow] = useState(false);
  const [joined, setJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rules, setRules] = useState();
  const { user } = useSelector((state) => state.auth);


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
        setRules(rules.data?.tournament_rules?.rules[0])
      }
    }
    setIsLoading(false)
  }

  function getCurrentMonth() {
    const currentDate = new Date();
    const month = currentDate.getMonth(); // getMonth() returns a zero-based index (0 for January, 11 for December)
    const monthsArray = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthsArray[month];
  }


  /**
   * Submit Hander to Join Tournament
   */
  const joinTournamentHandler = async () => {

    const join = await TournamentAPIs.enrollInTournament({
      user_id: user?.id,
      tournament_banner_id: banner?.tournament?.id,
    });
    if (join) {
      toast.success("Tournament Joined Successfully.");
      setBanner((prev) => {
        return {
          ...prev,
          tournament_users_count: prev.tournament_users_count + 1,
          tournament_posts_count: prev.tournament_posts_count + 1,
          is_current_user_enrolled: prev.is_current_user_enrolled = true
        }
      })
    }
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
              <div className={classes.bannerImg}> <img src={banner?.tournament_banner_image} alt="Bannerimage" /></div>

              {/* <h2>{banner?.tournament?.title}</h2> */}
              <h2>FOR THE {getCurrentMonth()?.toUpperCase()}<br></br>{banner?.tournament?.title}</h2>
            </div>
            <div className={classes.scoreBoard}>
              <span>{banner?.tournament_users_count} Particpants</span>
              <span>{banner?.tournament_posts_count} Meme Posts</span>
            </div>
          </div>

          {!banner?.is_current_user_enrolled  ?
            <div className="text-center">
              <Button className={`p-2 authButton ${classes.btn}`} onClick={() => {
                joinTournamentHandler();
              }}>Enter Tournament</Button>
            </div>
            :
            <div className="text-center">
              <Button className={`p-2 authButton ${classes.btn}`} onClick={() => {
                settournamentModalShow(true);
              }}>Create Tournament Post</Button>
            </div>
          }
          <InfoModal tournament rules={rules} show={show} onHide={() => setShow(false)} />
          <PostContentModal tournament tournamentid={banner?.tournament?.id} show={tournamentModalShow} onHide={() => settournamentModalShow(false)} tournamentJoined={setJoined} />
        </>
        : <p className="text-center">No Tournament is Played at the Moment</p>
      }
    </>
  );
};

export default TournamentTabs;
