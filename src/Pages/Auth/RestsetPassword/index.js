// import React, {useEffect, useState} from "react";
// import { Button, Form,  } from "react-bootstrap";
// import classes from '../index.module.scss'
// import Logo from "Components/Logo";
// import AuthHeader from "Components/AuthHeader";
// import ResetPasswordModal from "Components/ResetPasswordModal";
// import {useLocation, useNavigate} from "react-router-dom";
// import AuthAPIs from "../../../APIs/auth";
// import {toast} from "react-toastify";

// const Restsetpassword = () => {
//     const [smShow, setSmShow] = useState(false);
//     const navigate = useNavigate();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [passwordConfirmation, setPasswordConfirmation] = useState("");
//     const location = useLocation();

//     useEffect(() => {
//         const searchParams = new URLSearchParams(location.search);
//         const email = searchParams.get("email");
//         console.log('email',email)
//         setEmail(email);
//     }, [location.search]);
//     const resetPassword = async () => {
//         try {
//             const res = await AuthAPIs.resetPassword(email, password,passwordConfirmation);
//             if (res) {
//                 navigate(`/login`);
//                 setSmShow(false)
//                 toast.success("Password Updated Successfully", {
//                     position: "top-right",
//                     autoClose: 2000,
//                 });
//             }
//         } catch (error) {
//             console.error("Error while verify:", error);
//         }
//     };
//     const handlePasswordChange = (event) => {
//         setPassword(event.target.value);
//     };

//     const handlePasswordConfirmationChange = (event) => {
//         setPasswordConfirmation(event.target.value);
//     };
//     return (
//         <>
//         <Logo start/>
//             <div className={classes.loginFrom} style={{minWidth:'350px'}}>
//             <AuthHeader title={'Reset Password'} description={'Enter your new password below'}/>
//                 <Form className="formHolder">
//                     <Form.Control
//                         type="password"
//                         placeholder="New Password"
//                         value={password}
//                         onChange={handlePasswordChange}
//                     />
//                     <Form.Control
//                         type="password"
//                         placeholder="Re-type new password"
//                         value={passwordConfirmation}
//                         onChange={handlePasswordConfirmationChange}
//                     />
//                     {/*<p onClick={nextPage} className={ classes.password}>Forgot password?</p>*/}
//                     <Button className="btn-primary w-100 p-2 h-auto" href="#" onClick={() => resetPassword()}>Create New Password</Button>
//                 </Form>
//             </div>
//             <ResetPasswordModal
//             show={smShow}
//             onHide={() => setSmShow(false)} />
//         </>
//     );
// };

// export default Restsetpassword;
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import classes from '../index.module.scss';
import Logo from "Components/Logo";
import AuthHeader from "Components/AuthHeader";
import ResetPasswordModal from "Components/ResetPasswordModal";
import { useLocation, useNavigate } from "react-router-dom";
import AuthAPIs from "../../../APIs/auth";
import { toast } from "react-toastify";
import { Formik } from "formik"; // Import Formik
import * as Yup from "yup"; // Import Yup

const ResetPassword = () => {
    const [smShow, setSmShow] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const email = searchParams.get("email");
        console.log('email', email)
        setEmail(email);
    }, [location.search]);

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required("Password is required"),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required("Password confirmation is required")
    });

    const resetPassword = async (values) => {
        try {
            const res = await AuthAPIs.resetPassword(email, values.password, values.passwordConfirmation);
            if (res) {
                navigate(`/login`);
                setSmShow(false);
                toast.success("Password Updated Successfully", {
                    position: "top-right",
                    autoClose: 2000,
                });
            }
        } catch (error) {
            console.error("Error while verify:", error);
        }
    };

    return (
        <>
            <Logo start />
            <div className={classes.loginFrom} style={{ minWidth: '350px' }}>
                <AuthHeader title={'Reset Password'} description={'Enter your new password below'} />
                <Formik
                    initialValues={{
                        password: "",
                        passwordConfirmation: ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => resetPassword(values)}
                >
                    {({ handleSubmit, handleChange, values, errors }) => (
                        <Form className="formHolder" noValidate onSubmit={handleSubmit}>
                            <Form.Control
                                type="password"
                                placeholder="New Password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control
                                type="password"
                                placeholder="Re-type new password"
                                name="passwordConfirmation"
                                value={values.passwordConfirmation}
                                onChange={handleChange}
                                isInvalid={!!errors.passwordConfirmation}
                            />
                            <Button className="btn-primary w-100 p-2 h-auto" type="submit">
                                Create New Password
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
            <ResetPasswordModal
                show={smShow}
                onHide={() => setSmShow(false)}
            />
        </>
    );
};

export default ResetPassword;
