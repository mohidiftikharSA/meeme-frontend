import React from 'react';
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { authSuccess } from "../../Redux/reducers/authSlice";
import AuthAPIs from "../../APIs/auth";
import { GOOGLE_CLIENT_ID } from "../../config/constants";
import { Button } from 'react-bootstrap';

const GoogleAuth = () => {
    const clientId = GOOGLE_CLIENT_ID;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const bearer = 'Bearer ' + tokenResponse.access_token;
                const userInfo = await axios.get(
                    'https://www.googleapis.com/oauth2/v3/userinfo',
                    { headers: { Authorization: bearer } }
                );
                console.log('tokenResponse.access_token', tokenResponse.access_token);

                // Assuming handleGoogleLoginSuccess handles the redirection
                handleGoogleLoginSuccess(tokenResponse.access_token);
            } catch (error) {
                console.error("Error while fetching user info:", error);
            }
        },
        onError: errorResponse => console.log(errorResponse),
    });

    const handleCustomGoogleLogin = async () => {
        googleLogin();
    };

    const handleGoogleLoginSuccess = async (tokenResponse) => {
        console.log(tokenResponse);
        try {
            const res = await AuthAPIs.socialLogin('google_web', tokenResponse);
            if (res) {
                console.log("Response of Social API = ", res.data);
                dispatch(
                    authSuccess({
                        user: res.data?.user,
                        accessToken: res.data.token,
                    })
                );
                navigate(`/home`);
                toast.success("Login Successfully", {
                    position: "top-right",
                    autoClose: 2000,
                });
                localStorage.setItem("accessToken", res.data.token);
            }
        } catch (error) {
            console.error("Error while verifying:", error);
        }
    };

    const comingSoon = async () => {
        toast.error("Coming Soon.")
        return;
    }


    return (
        <div>
            <Button  variant="outline-light" onClick={googleLogin}>
                <FcGoogle />
                Continue with Google
            </Button>
        </div>
    );
};

export default GoogleAuth;
