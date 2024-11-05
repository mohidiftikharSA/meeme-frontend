import FollowingContent from "Components/FollowingContent";
import MemesDetails from "Components/Memes";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import img13 from "../../Images/bg1.png";
import img14 from "../../Images/bg2.png";
import img15 from "../../Images/bg3.png";
import img16 from "../../Images/Profile01.png";
import img17 from "../../Images/Profile2.png";
import img18 from "../../Images/Profile3.png";
import img19 from "../../Images/purplecolor.png";
import img20 from "../../Images/pinkColor.png";
import img21 from "../../Images/orangeColor.png";
import TournamentTabs from "Components/TournamentTab";
import Store from "Components/Store";
import classes from "./index.module.scss";
import SubTabs from "Components/SubTabs";
import BackgroundOverlay from "Components/BackgroundOverlay";
import ProfileOverlay from "Components/ProfileOverlay";
import Judge from "Components/Judge";
import ProfilePost from "Components/ProfilePost";
import img1 from "../../Images/rare1.png";
import img2 from "../../Images/rare2.png";
import img3 from "../../Images/rare3.png";
import img4 from "../../Images/rare4.png";
import img5 from "../../Images/rare5.png";
import img6 from "../../Images/rare6.png";
import Theme1 from "../../Images/Theme1.png";
import Theme2 from "../../Images/Theme2.png";
import Theme3 from "../../Images/Theme3.png";
import UltraRare from "Components/UltraRare";
import ThemeRare from "Components/ThemeRare";
import postAPIs from "APIs/dashboard/home";
import { useSelector } from "react-redux";
import ThemesAPIs from "../../APIs/amazonCard";
import SettingAPIs from "../../APIs/settings";

const backgroundOverlayData = [
  {
    img: img13,
    coin: 2500,
    title: "Pink Sky",
    pathNo:14,
    name: 'Profile Background 1',
  },
  {
    img: img14,
    coin: 2500,
    title: "Galaxy",
    pathNo:15,
    name: 'Profile Background 2',
  },
  {
    img: img15,
    coin: 2500,
    title: "Cloudy Sky",
    pathNo:16,
    name: 'Profile Background 3',
  },
];
const ProfileOverlayData = [
  {
    img: img16,
    coin: "100",
    title: "Purple",
  },
  {
    img: img17,
    coin: "100",
    title: "Pink",
  
  },
  {
    img: img18,
    coin: "100",
    title: "Orange",
   
  },
];
const ProfileOverlayDataProfile = [
  {
    img: img19,
    coin: "100",
    title: "Purple",
  },
  {
    img: img20,
    coin: "100",
    title: "Pink",
  },
  {
    img: img21,
    coin: "100",
    title: "Orange",
  },
];

const data44 = [
  {
    title: "Sunflower Theme",
    img: img1,
  },
  {
    title: "Nature Theme",
    img: img2,
  },
  {
    title: "Military Theme",
    img: img3,
  },
  {
    title: "Camping Theme",
    img: img4,
  },
  {
    title: "Psychedelic Theme",
    img: img5,
  },
  {
    title: "Banana Theme",
    img: img6,
  },
];

const data2 = [
  {
    img: Theme1,
    title: "Camouflage theme",
  },
  {
    img: Theme2,
    title: "Sunflower theme",
  },
  {
    img: Theme3,
    title: "Green theme",
  },
];

const TabDetails = ({
  tournament,
  first,
  main,
  footer,
  tabTitle,
  storeitems,
  profile,
  customizeProfile,
  profilePosts,
  isPublic,
  postRemoved,
  otherProfile,
  tournamentPosts,
  setActive
}) => {
  const [recentPosts, setRecentPosts] = useState([]);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [tagTrendingPost, setTagTrendingPost] = useState([]);
  const [isLoadingRecentPosts, setIsLoadingRecentPosts] = useState(false);
  const [isLoadingTrendingPosts, setIsLoadingTrendingPosts] = useState(false);
  const { data } = useSelector((state) => state.searchTagData);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [activeTab, setActiveTab] = useState("memes");
  const [policy, setPolicy] = useState("");
  const [term, setTerm] = useState("");
  const [faqs, setFaqs] = useState([]);

  const changeTab = (tabKey) => {
    console.log("Changes tab =", tabKey);
    setActiveTab(tabKey);
    if(setActive){
      setActive(tabKey)
    }
  };

  const handleButtonClick = () => {
    if (tagTrendingPost && tagTrendingPost[0]) {
      changeTab("trending");
    }
  };

  const getRecentPost = async () => {
    setIsLoadingRecentPosts(true);
    try {
      const res = await postAPIs.getRecentPosts();
      if (res.status === 200) {
        setRecentPosts(res.data.recent_posts);
      } else {
        console.error("Error: Unexpected status code", res.status);
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
    } finally {
      setIsLoadingRecentPosts(false);
    }
  };
  const getTrendingPost = async () => {
    try {
      setIsLoadingTrendingPosts(true);
      const res = await postAPIs.getTrendingPosts();
      if (res.status === 200) {
        setTrendingPosts(res.data.trending_posts);
      } else {
        console.error("Error: Unexpected status code", res.status);
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
    } finally {
      setIsLoadingTrendingPosts(false);
    }
  };

  useEffect(() => {
    getFaqs();
    getPurchasedItems();
    getPrivacyPolicy();
    const fetchData = async () => {
      await getRecentPost();
      await getTrendingPost();
    };
    if (!isPublic) {
      fetchData();
    }
  }, []);

  const getPrivacyPolicy = async () => {
    const policy = await SettingAPIs.getAudits("Privacy");
    if (policy) {
      setPolicy(policy?.data?.description);
    }
    const term = await SettingAPIs.getAudits("Term");
    if (term) {
      setTerm(term?.data?.description);
    }
  };

  useEffect(() => {
    if (data && data[0]) {
      setTagTrendingPost(data);
      handleButtonClick();
    } else {
      setTagTrendingPost([]);
      setActiveTab("memes");
    }
  }, [data]);

  const getPurchasedItems = async () => {
    const res = await ThemesAPIs.getPuchasedItems();
    if (res) {
      console.log("Response of the Purchased  == ", res.data);
      setPurchasedItems(res.data?.store);
    }
  };

  /**
   * Set Active tab
   */
  useEffect(() => {
    if (first === "tournament" || first === "store" || first === "judge") {
      setActiveTab(first);
      setActive(first)
    }
  }, [first]);

  const getFaqs = async () => {
    const res = await SettingAPIs.getAudits("Faq");
    if (res) {
      setFaqs(res.data);
    }
  };

  return (
    <>
      {main && (
        <Tabs
          defaultActiveKey={first}
          activeKey={activeTab}
          onSelect={(tabKey) => changeTab(tabKey)}
          id="uncontrolled-tab-example"
          className="mb-lg-5 mb-3"
        >
          <Tab eventKey="following" title="Following">
            <FollowingContent />
          </Tab>
          <Tab eventKey="memes" title="New Memes">
            <MemesDetails
              newMemesData={recentPosts}
              isLoading={isLoadingRecentPosts}
            />
          </Tab>
          <Tab eventKey="trending" title="Trending">
            <MemesDetails
              newMemesData={
                tagTrendingPost[0] ? tagTrendingPost : trendingPosts
              }
              isLoading={isLoadingTrendingPosts}
            />
          </Tab>
        </Tabs>
      )}
      {tournament && (
        <div className={classes.contentHolder}>
          <Tabs
            defaultActiveKey={first}
            activeKey={activeTab}
            onSelect={(tabKey) => changeTab(tabKey)}
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="tournament" title="Tournament">
              <TournamentTabs />
            </Tab>
            <Tab eventKey="store" title="Store">
              <Store />
            </Tab>
            <Tab eventKey="judge" title="Judge">
              <Judge />
            </Tab>
          </Tabs>
        </div>
      )}
      {footer && (
        <Tabs defaultActiveKey={tabTitle} className="modalTabs">
          <Tab
            eventKey="terms"
            title="Terms of Services"
            className="CustTabContent scroller"
          >
            <div className={classes.modalContant}>
              <p dangerouslySetInnerHTML={{ __html: term }} />
            </div>
          </Tab>
          <Tab
            eventKey="policy"
            title="Privacy Policy"
            className="CustTabContent"
          >
            <div className={classes.modalContant}>
              <p dangerouslySetInnerHTML={{ __html: policy }} />
            </div>
          </Tab>
          <Tab eventKey="faq" title="FAQ" className="CustTabContent faq">
            <div className={classes.modalContant}>
              {faqs[0] ? (
                faqs?.map((item) => {
                  return (
                    <>
                      <h5 className="faqTitle">{item?.title}</h5>
                      <p
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                      />
                    </>
                  );
                })
              ) : (
                <p style={{ textAlign: "center" }}>No FAQs to Show</p>
              )}
            </div>
          </Tab>
        </Tabs>
      )}
      {storeitems && (
        <Tabs
          defaultActiveKey={"themes"}
          id="uncontrolled-tab-example"
          className="mb-5 noBg"
        >
          {/* <Tab eventKey="Icons" title="Icons">
            <SubTabs icon />
          </Tab> */}
          <Tab eventKey="themes" title="Themes">
            <SubTabs themes />
          </Tab>
          <Tab eventKey="overlay" title="Background Overlay">
            <BackgroundOverlay data={backgroundOverlayData} />
          </Tab>
          {/* <Tab eventKey="profile" title="Profile Overlay">
            <ProfileOverlay data={ProfileOverlayData} />
          </Tab> */}
        </Tabs>
      )}
      {profile && (
        <Tabs defaultActiveKey={"post"} className="mb-5 double">
          <Tab eventKey="post" title="Post">
            <ProfilePost
              myProfile
              otherProfile={otherProfile}
              data={profilePosts}
              postRemoved={postRemoved}
            />
          </Tab>
          <Tab eventKey="tournament" title="Tournament Entry">
            <ProfilePost otherProfile tournament data={tournamentPosts} />
          </Tab>
        </Tabs>
      )}
      {customizeProfile && (
        <Tabs
          defaultActiveKey={"themes"}
          id="uncontrolled-tab-example"
          className="mb-5 noBg"
        >
          <Tab eventKey="themes" title="Themes">
            <ThemeRare card data2={purchasedItems} />
          </Tab>
          <Tab eventKey="overlay" title="Background Overlay">
            <BackgroundOverlay noCoin data={backgroundOverlayData} />
          </Tab>
          {/* <Tab eventKey="profile" title="Profile Overlay">
            <ProfileOverlay noCoin data={ProfileOverlayDataProfile} />
          </Tab> */}
        </Tabs>
      )}
    </>
  );
};

export default TabDetails;
