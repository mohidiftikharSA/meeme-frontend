import React, { useEffect, useState, useRef } from "react";
import classes from "./index.module.scss";
import img from "../../Images/tornament.png";
import { BiInfoCircle } from "react-icons/bi";
import { Button } from "react-bootstrap";
import InfoModal from "Components/InfoModal";
import PostContentModal from "Components/TournamentModal";
import TournamentJoinSuccess from "Components/PostContentModal";
import TournamentAPIs from '../../APIs/tournaments';
import Loader from "Components/Loader";
import { useSelector } from "react-redux";
import cupImg from '../../Images/tournamentCup.png'
import TutorialModals from "Components/Tutorial";



const TournamentTabs = () => {
  const [show, setShow] = useState(false);
  const [banner, setBanner] = useState(null);
  const [tournamentModalShow, settournamentModalShow] = useState(false);
  const [postCount, setPostCount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rules, setRules] = useState();
  const { user } = useSelector((state) => state.auth);
  const [modalType, setModalType] = useState("main");

  const modalRef = useRef(null);

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
   * Increament +1 on Tournament Post Created
   */
  useEffect(() => {

    if (postCount) {
      setBanner((prev) => {
        return {
        ...prev,
          tournament_posts_count: prev.tournament_posts_count + 1
        }
      })
    }

  }, [postCount])


  /**
   * Submit Hander to Join Tournament
   */
  const joinTournamentHandler = async () => {

    const join = await TournamentAPIs.enrollInTournament({
      user_id: user?.id,
      tournament_banner_id: banner?.tournament?.id,
    });
    if (join) {
      setBanner((prev) => {
        return {
        ...prev,
        tournament_users_count: prev.tournament_users_count + 1,
          is_current_user_enrolled: prev.is_current_user_enrolled = true
        }
      })
      setModalType("postContent");
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
          <TutorialModals
            ref={modalRef}
            show={show}
            onHide={() => setShow(false)}
          />
          <div className={`imgBox mb-4 position-relative ${classes.imgBox}`}>
            <div className={classes.bannerCard}>
              <div className={classes.bannerImg}>
                <img
                  src={banner?.tournament_banner_image || cupImg}
                  alt="Bannerimage"
                />
              </div>
              <h2>
                FOR THE {new Date().toLocaleString("default", { month: "long" }).toUpperCase()}
                <br />
                {banner?.tournament?.title}
              </h2>
            </div>
            <div className={classes.scoreBoard}>
              <span>{banner?.tournament_users_count} Participants</span>
              <span>{banner?.tournament_posts_count} Meme Posts</span>
            </div>
          </div>

          {!banner?.is_current_user_enrolled ?
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
          {/* <InfoModal tournament rules={rules} show={show} onHide={() => setShow(false)} /> */}
          <PostContentModal tournament tournamentid={banner?.tournament?.id} show={tournamentModalShow} onHide={() => settournamentModalShow(false)} setPostCount={setPostCount} />
          {modalType === "postContent" && (
            <TournamentJoinSuccess
              show={true}
              onHide={() => {
                setModalType("main");
              }}
            />
          )}
        </>
        : <p className="text-center">No Tournament is Played at the Moment</p>
      }
    </>
  );
};

export default TournamentTabs;
