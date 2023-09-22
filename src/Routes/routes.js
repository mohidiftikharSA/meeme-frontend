import LandingPage from "Pages/LandingPage";
import NotFound from "Pages/NotFound/loadable";
import MainLayout from "Layout/MainLayout";
import AuthLayout from "Layout/AuthLayout";
import LoginFrom from "Pages/Auth/Login";
import Signup from "Pages/Auth/Signup";
import Restsetpassword from "Pages/Auth/RestsetPassword";
import EmailVerification from "Pages/Auth/EmailVerification";
import PhoneVerification from "Pages/Auth/PhoneVerification";
import Forgetpassword from "Pages/Auth/ForgetPassword";
import Explore from "Pages/Explore";
import Tournament from "Pages/Tournament";
import ProfileSetting from "Pages/ProfileSetting";
import JudgePage from "Pages/Judge";
import ProfilePage from "Pages/Profile";
import CustomizeProfile from "Pages/CustomizeProfile";
import BuyCoin from "Pages/BuyCoin";
import OtherProfile from "Pages/OtherProfile";
import PurchasePage from "Pages/Purchase";
import BadgeList from "Components/BadgeList";
import Home from "Pages/Auth/Home";



const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/login",
        layout: AuthLayout ,
        component: LoginFrom,
    },
    {
        path: "/home",
        layout: MainLayout,
        component: LandingPage,
    },
    {
        path: "/signup",
        layout: AuthLayout,
        component: Signup,
    },
    {
        path: "/restsetPassword",
        layout: AuthLayout,
        component: Restsetpassword,
    },
    {
        path: "/forgetPassword",
        layout: AuthLayout,
        component: Forgetpassword,
    },
    {
        path: "/emailVerification",
        layout: AuthLayout,
        component: EmailVerification,
    },
    {
        path: "/PhoneVerification",
        layout: AuthLayout,
        component: PhoneVerification,
    },
    {
        path: "/explore",
        layout: MainLayout,
        component: Explore,
    },
    {
        path: "/tornament",
        layout: MainLayout,
        component: Tournament,
    },
    {
        path: "/profile-setting",
        layout: MainLayout,
        component: ProfileSetting,
    },
    {
        path: "/judge",
        layout: MainLayout,
        component: JudgePage,
    },
    {
        path: "/profile",
        layout: MainLayout,
        component: ProfilePage,
    },
    {
        path: "/otherPrfolile",
        layout: MainLayout,
        component: OtherProfile,
    },
    {
        path: "/CustomizeProfile",
        layout: MainLayout,
        component: CustomizeProfile,
    },
    {
        path: "/BuyCoin",
        layout: MainLayout,
        component: BuyCoin,
    },
    {
        path: "/Purchase",
        layout: MainLayout,
        component: PurchasePage,
    },
    {
        path: "/BadgeList",
        layout: MainLayout,
        component: BadgeList,
    },
   

    { path: "*", component: NotFound, layout: MainLayout },
];

export default routes;