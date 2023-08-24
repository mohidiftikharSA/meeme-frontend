import LandingPage from "Pages/LandingPage";
import NotFound from "Pages/NotFound/loadable";
import MainLayout from "Layout/MainLayout";
import AuthLayout from "Layout/AuthLayout";
import Login from "Pages/Auth/Login";
import LoginFrom from "Pages/Auth/LoginForm";
import Signup from "Pages/Auth/Signup";
import Restsetpassword from "Pages/Auth/RestsetPassword";
import EmailVerification from "Pages/Auth/EmailVerification";
import PhoneVerification from "Pages/Auth/PhoneVerification";
import Forgetpassword from "Pages/Auth/ForgetPassword";
import Explore from "Pages/Explore";
import Tournament from "Pages/Tournament";
import ProfileSetting from "Pages/ProfileSetting";


const routes = [
    {
        path: "/",
        layout: AuthLayout,
        component: Login,
    },
    {
        path: "/login",
        layout: AuthLayout,
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

    { path: "*", component: NotFound, layout: MainLayout },
];

export default routes;