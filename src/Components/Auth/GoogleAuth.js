import {GoogleLogin, GoogleOAuthProvider, useGoogleLogin} from "@react-oauth/google";
import {GOOGLE_CLIENT_ID} from "../../config/constants";
import AuthAPIs from "../../APIs/auth";
import {authSuccess} from "../../Redux/reducers/authSlice";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import {FcGoogle} from "react-icons/fc";
import React from "react";
import axios from "axios";

const GoogleAuth = () => {
    const clientId = {GOOGLE_CLIENT_ID};
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log(tokenResponse);
            const bearer = 'Bearer '+ tokenResponse.access_token
            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { headers: { Authorization: bearer } },
            );

            console.log(userInfo);
        },
        onError: errorResponse => console.log(errorResponse),
    });


    const login = useGoogleLogin({
        flow: 'implicit',
        onSuccess: async (tokenResponse) => {
            console.log(tokenResponse);

        },

    });

    return (
        <div>
            <GoogleLogin
                onSuccess={async credentialResponse => {
                    try {
                        const res = await AuthAPIs.socialLogin('google', credentialResponse.credential);
                        console.log(res);
                        if (res) {
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
                        console.error("Error while verify:", error);
                    }
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
                useOneTap
            />
        </div>

        // <Button variant="outline-light" onClick={() => googleLogin()}>
        //     <FcGoogle />
        //     Continue with Google
        // </Button>


    );
};

export default GoogleAuth;