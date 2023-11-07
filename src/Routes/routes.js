import LandingPage from "Pages/LandingPage";
import NotFound from "Pages/NotFound/loadable";
import MainLayout from "Layout/MainLayout";
import AuthLayout from "Layout/AuthLayout";
import LoginFrom from "Pages/Auth/Login";
import Signup from "Pages/Auth/Signup";
import Restsetpassword from "Pages/Auth/RestsetPassword";
import EmailVerification from "Pages/Auth/EmailVerification";
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
import OtpVerfication from "Pages/Auth/OtpVerification";



const routes = [
    {
        path: "/",
        authenticated: false,
        component: Home,
    },
    {
        path: "/login",
        authenticated: false,
        layout: AuthLayout,
        component: LoginFrom,
    },
    {
        path: "/home",
        layout: MainLayout,
        authenticated: true,
        component: LandingPage,
    },
    {
        path: "/signup",
        authenticated: false,
        layout: AuthLayout,
        component: Signup,
    },
    {
        path: "/restsetPassword",
        authenticated: false,
        layout: AuthLayout,
        component: Restsetpassword,
    },
    {
        path: "/forgetPassword",
        authenticated: false,
        layout: AuthLayout,
        component: Forgetpassword,
    },
    {
        path: "/emailVerification",
        authenticated: false,
        layout: AuthLayout,
        component: EmailVerification,
    },
    {
        path: "/otpVerification",
        authenticated: false,
        layout: AuthLayout,
        component: OtpVerfication,
    },
    {
        path: "/explore",
        authenticated: false,
        layout: MainLayout,
        component: Explore,
    },
    {
        path: "/tornament",
        authenticated: false,
        layout: MainLayout,
        component: Tournament,
    },
    {
        path: "/profile-setting",
        authenticated: true,
        layout: MainLayout,
        component: ProfileSetting,
    },
    {
        path: "/judge",
        authenticated: false,
        layout: MainLayout,
        component: JudgePage,
    },
    {
        path: "/profile",
        authenticated: true,
        layout: MainLayout,
        component: ProfilePage,
    },
    {
        path: "/otherProfile/:id",
        authenticated: false,
        layout: MainLayout,
        component: OtherProfile,
    },
    {
        path: "/CustomizeProfile",
        authenticated: false,
        layout: MainLayout,
        component: CustomizeProfile,
    },
    {
        path: "/BuyCoin",
        authenticated: false,
        layout: MainLayout,
        component: BuyCoin,
    },
    {
        path: "/Purchase",
        authenticated: false,
        layout: MainLayout,
        component: PurchasePage,
    },
    {
        path: "/BadgeList",
        authenticated: false,
        layout: MainLayout,
        component: BadgeList,
    },


    { path: "*", component: NotFound, layout: MainLayout },
];

export default routes;