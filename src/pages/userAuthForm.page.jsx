import AnimationWrapper from "../common/page-animation";
import InputBox from "../components/input.component";
import {Link} from "react-router-dom";
import {Toaster, toast} from "react-hot-toast";
import axios from "axios";
import { storeInSession } from "../common/session";
import { useContext, useRef } from "react";
import { UserContext } from "../App";
import { Navigate } from "react-router-dom";

const UserAuthForm = ({type}) => {

    const authForm = useRef();

    let { userAuth : { access_token }, setUserAuth } = useContext(UserContext)

    console.log(access_token);

    const userAuthThroughServer =(serverRoute, formData) => {

        axios.post("http://localhost:3000" + serverRoute,formData)
        .then(({data})=> {
            storeInSession("user",JSON.stringify(data))
            setUserAuth(data)
        })
        .catch(({response})=> {
            toast.error(response.data.error)
        })
    }

    const handleSubmit = (e) => { 
 
        e.preventDefault();

        let serverRoute = type =="sign-in" ? "/signin" : "/signup";

        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password


        //formData
        let form= new FormData(formElement);
        let formData = {};

        for(let [key, value]of form.entries()){
            formData[key] = value;
        }
        
        let {fullname,email,password } = formData;

        //form validation
        if(fullname){
            if(fullname.length<5){
                return toast.error("Fullname must be atleast 5 letters long")
            }
        }

        if(!email.length){
            return toast.error("Enter valid email address")
        }
        if(!emailRegex.test(email)){
            return toast.error("Email is invalid. Enter a valid email address")
        }
        if(!passwordRegex.test(password)){
            return toast.error("Password should be 6-20 characters long with atleast numeric, an uppercase and lowercase letter")
        }

        userAuthThroughServer(serverRoute, formData)
    }

    return (
        access_token ? <Navigate to="/" />
        :
        <AnimationWrapper keyValue={type}>
            <section className="h-cover flex items-center justify-center">
            <Toaster />
            <form id="formElement" className="w-[80%] mas-w-[400px]">
                <h1 className= "text-4xl font-gelasio capitalize text-center mb-24">
                    {type =="sign-in" ? "Welcome back..." : "Join us today ..!!" }
                </h1>

                {
                    type != "sign-in" ?
                    <InputBox 
                        name ="fullname"
                        type ="text"
                        placeholder="Full Name"
                        icon= "fi-rr-circle-user"
                    />
                    :""
                }

                    <InputBox 
                        name ="email"
                        type ="email"
                        placeholder="Email ID"
                        icon= "fi-rr-circle-envelope"
                    />

                    <InputBox 
                        name ="password"
                        type ="password"
                        placeholder="Password"
                        icon= "fi-rr-lock"
                    />

                    <button className="btn-dark center mt-14" type="submit" onClick={handleSubmit}>
                        {type.replace("-"," ")}
                    </button>

                    <div className="relative w-full flex item-center gap-2 my-10 opacity-20 uppercase text-black font-bold">
                        <hr className= "w=1/2 border-black"/>
                        <p>or</p>
                        <hr className= "w=1/2 border-black"/>
                    </div>
                    
                    <button className="btn-dark flex iems-center justify-center gap-4 w-[90%] center ">
                        <i className="fi fi-brands-google w-5"></i>
                        Continue with GOOGLE
                    </button>

                    {
                        type =="sign-in" ?
                        <p className="mt-6 text-dark-grey text-xl text-center">
                            Don't have an account ??
                            <Link to="/signup" className="underline text-black text-xl ml-1" >
                            Sign-Up Now
                            </Link>
                        </p>
                        :
                        <p className="mt-6 text-dark-grey text-xl text-center">
                            Already account exists ??
                            <Link to="/signin" className="underline text-black text-xl ml-1" >
                            For Sign-in
                            </Link>
                        </p>

                    }
                        

            </form>
        </section>
        </AnimationWrapper>
    )
}

export default UserAuthForm;