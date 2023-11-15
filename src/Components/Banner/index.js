// import React, { useCallback, useEffect, useState } from "react";
// import classes from "./index.module.scss";
// import userimg from "../../Images/avatar.jpg";
// import { Button } from "react-bootstrap";
// import setting from "../../Images/SettingIcon.png";
// import edit from "../../Images/editUser.png";
// import { useNavigate } from "react-router-dom";
// import FollowModal from "Components/FollowModal";
// import FollowerAPIs from '../../APIs/followers';
// import { toast } from "react-toastify";


// const Banner = ({ other, profile }) => {
//   const [show, setShow] = useState(false);
//   const [follwers, setfollowrshow] = useState(false);
//   const navigate = useNavigate();
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [followingList , setFollowingList ] = useState([]);
//   const [followersList , setFollowersList ] = useState([]);

//   const nextPage = () => {
//     navigate(`/CustomizeProfile`);
//   };

//   useEffect(() => {

//     if (profile?.follower_added) {
//       setIsFollowing(true);
//     }

//     getFollowersAndFollowings();

//   }, [profile])

//   const getFollowersAndFollowings = useCallback( async()=>{
//     const followings = await FollowerAPIs.followingList();
//     if(followings){
//       setFollowingList(followings?.data?.followings);
//     }

//     const followers = await FollowerAPIs.followersList();
//     if(followers){
//       setFollowersList(followers?.data?.followers)
//     }

//   },[profile])



//   const followOrUnfollow = async (action) => {
//     console.log("Follow Profile = ", profile);
//     if (action === 'follow') {
//       const follow = await FollowerAPIs.sendFollowRequest({ follower_user_id: profile?.user?.id });
//       if (follow) {
//         setIsFollowing(true);
//         console.log("Follow Successfull =", follow);
//         toast.success('Followed Successfully', {
//           position: "top-right",
//           autoClose: 2000,
//         });
//       }
//     } else if (action === 'unfollow') {
//       const unfollow = await FollowerAPIs.unfollowUser({ follower_user_id: profile?.user?.id })
//       if (unfollow) {
//         setIsFollowing(false);
//         console.log("unfollow Successfull =", unfollow);
//         toast.success('Unfollow Successfully', {
//           position: "top-right",
//           autoClose: 2000,
//         });
//       }
//     }

//   }

//   return (
//     <>
//       <div className={`banner pb-4 px-2 ${other && `banner pb-4 otherBanner`}`}>
//         <div className="sectionHolder" style={{ maxWidth: "350px" }}>
//           <div className={classes.profileDetail}>
//             <div className={classes.profileDetails}>
//               <img src={profile?.user_image || userimg} alt="" />
//               <h4 >{profile?.user?.username}</h4>
//             </div>
//             {
//               other &&
//               <div className={classes.btnBox}>
//                 {isFollowing ? <Button onClick={() => { followOrUnfollow('unfollow') }} >UnFollow</Button> : <Button onClick={() => { followOrUnfollow('follow') }} >Follow</Button>}
//                 <Button>Message</Button>
//               </div>
//             }
//             <ul className={classes.userInfoBox}>
//               <li>
//                 <h5 >
//                   {profile?.all_post_count} <span>Posts</span>
//                 </h5>
//               </li>
//               <li>
//                 <h5 onClick={() => { setfollowrshow(true) }}>
//                   {profile?.followers} <span>Followers</span>
//                 </h5>
//               </li>
//               <li>
//                 <h5 onClick={() => { setShow(true) }}>
//                   {profile?.following} <span>Followings</span>
//                 </h5>
//               </li>
//             </ul>
//             <h6 className="mb-4 text-center">
//               {profile?.user?.bio}
//             </h6>
//             <div className={classes.btnGroup}>
//               <Button onClick={nextPage}>
//                 <img src={edit} alt="img" />
//               </Button>
//               <Button>
//                 <img src={setting} alt="img" />
//               </Button>
//             </div>
//           </div>
//         </div>

//       </div>
//       <FollowModal following show={show} followingList={followingList} onHide={() => setShow(false)} />
//       <FollowModal followers show={follwers} followersList={followersList} onHide={() => setfollowrshow(false)} />
//     </>
//   );
// };

// export default Banner;




import React, { useCallback, useEffect, useState } from "react";
import classes from "./index.module.scss";
import userimg from "../../Images/avatar.jpg";
import { Button } from "react-bootstrap";
import setting from "../../Images/SettingIcon.png";
import edit from "../../Images/editUser.png";
import { useNavigate } from "react-router-dom";
import FollowModal from "Components/FollowModal";
import FollowerAPIs from '../../APIs/followers';
import { toast } from "react-toastify";
import ChatPopup from "Components/ChatPopup";

const Banner = ({ other, profile }) => {
  const [show, setShow] = useState(false);
  const [follwers, setfollowrshow] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followingList, setFollowingList] = useState([]);
  const [followersList, setFollowersList] = useState([]);
  const [showChat, setShowChat] = useState(false); // New state for showing/hiding ChatPopup
  const navigate = useNavigate();

  const nextPage = () => {
    navigate(`/CustomizeProfile`);
  };

  useEffect(() => {
    if (profile?.follower_added) {
      setIsFollowing(true);
    }
    getFollowersAndFollowings();
  }, [profile]);

  const getFollowersAndFollowings = useCallback(async () => {
    const followings = await FollowerAPIs.followingList();
    if (followings) {
      setFollowingList(followings?.data?.followings);
    }

    const followers = await FollowerAPIs.followersList();
    if (followers) {
      setFollowersList(followers?.data?.followers);
    }
  }, [profile]);

  const followOrUnfollow = async (action) => {
    console.log("Follow Profile = ", profile);
    if (action === 'follow') {
      const follow = await FollowerAPIs.sendFollowRequest({ follower_user_id: profile?.user?.id });
      if (follow) {
        setIsFollowing(true);
        console.log("Follow Successfully =", follow);
        toast.success('Followed Successfully', {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } else if (action === 'unfollow') {
      const unfollow = await FollowerAPIs.unfollowUser({ follower_user_id: profile?.user?.id });
      if (unfollow) {
        setIsFollowing(false);
        console.log("Unfollow Successfully =", unfollow);
        toast.success('Unfollow Successfully', {
          position: "top-right",
          autoClose: 2000,
        });
      }
    }
  };

  const handleOpenChat = () => {
    setShowChat(true);
  };

  const handleCloseChat = () => {
    setShowChat(false);
  };

  return (
    <>
      <div className={`banner pb-4 px-2 ${other && `banner pb-4 otherBanner`}`}>
        <div className="sectionHolder" style={{ maxWidth: "350px" }}>
          <div className={classes.profileDetail}>
            <div className={classes.profileDetails}>
              <img src={profile?.user_image || userimg} alt="" />
              <h4 >{profile?.user?.username}</h4>
            </div>
            {other && (
              <div className={classes.btnBox}>
                {isFollowing ? (
                  <Button onClick={() => followOrUnfollow('unfollow')}>UnFollow</Button>
                ) : (
                  <Button onClick={() => followOrUnfollow('follow')}>Follow</Button>
                )}
                <Button onClick={handleOpenChat}>Message</Button>
              </div>
            )}
            <ul className={classes.userInfoBox}>
              <li>
                <h5 >
                  {profile?.all_post_count} <span>Posts</span>
                </h5>
              </li>
              <li>
                <h5 onClick={() => { setfollowrshow(true) }}>
                  {profile?.followers} <span>Followers</span>
                </h5>
              </li>
              <li>
                <h5 onClick={() => { setShow(true) }}>
                  {profile?.following} <span>Followings</span>
                </h5>
              </li>
            </ul>
            <h6 className="mb-4 text-center">
              {profile?.user?.bio}
            </h6>
            <div className={classes.btnGroup}>
              <Button onClick={nextPage}>
                <img src={edit} alt="img" />
              </Button>
              <Button>
                <img src={setting} alt="img" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <FollowModal following show={show} followingList={followingList} onHide={() => setShow(false)} />
      <FollowModal followers show={follwers} followersList={followersList} onHide={() => setfollowrshow(false)} />
      {showChat && <ChatPopup isOpen={showChat} onClose={handleCloseChat} />}
    </>
  );
};

export default Banner;

