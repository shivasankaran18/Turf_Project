import { Link, useNavigate } from "react-router-dom";
import { Input } from "../shadcn/ui/input";

import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { AnimeatedButton } from "../components/buttonss";
import { BackgroundGradient } from "../shadcn/ui/background-gradient";

export function Signin(){
    const [emailId,setemailId]=useState<string>(" ");
    const [passwd,setPasswd]=useState<string>(" ");
    const navigate=useNavigate();


    return(

       
        <div className=" rounded-md bg-black flex flex-col items-center justify-center w-screen absolute left-0 top-0 h-screen"> 
            <div className=" w-1/3 relative">
            
            <BackgroundGradient className="rounded-[22px]    bg-gray-200 dark:bg-zinc-900">
        <div className="relative  bg-white   px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
          
          <h1 className="font-bold text-xl text-black mb-4 relative z-50">
            TURFHUB
          </h1><br></br>
                    
                    
          <h2 className="font-bold text-xl text-black  w-full text-center"> LOGIN</h2>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className=" py-8 px-4  sm:rounded-lg sm:px-10">
          <div className="grid w-full max-w-sm items-center gap-1.5">
                         <label htmlFor="email" className=" flex justify-start">Email</label>
                         <Input type="email" id="email" placeholder="Email" onChange={(e) => setemailId(e.target.value)} />
                     </div>
                    
                     <div className="grid w-full max-w-sm items-center gap-1.5 py-5  ">
                         <label htmlFor="email" className=" flex justify-start">Password</label>
                         <Input type="email" id="email" placeholder="Password" onChange={(e) => setPasswd(e.target.value)} />
                     </div>
<br></br>
            <AnimeatedButton className="" val={"Signin"} onClicked={async () => {
                         try {
                             const res = await axios.post(`${BACKEND_URL}/api/admin/login`, {
                                 emailId,
                                 password: passwd

                             })
                             console.log(res.data.token);
                             if (!res.data.success) {
                                 alert("user not found")
                             }
                             else {
                                 localStorage.setItem("admintoken", res.data.token);
                                 console.log(localStorage.getItem("admintoken"))
                          
                                 navigate("/home");
                             }
                             //@ts-ignore
                            
                         }
                         catch {
                            window.alert("error");
                        }

                }}>Sign In</AnimeatedButton>
               
                    <p className="mt-2 text-center text-sm leading-5 text-black max-w">
                    {"Don't have account ? "}
                 <Link to={"/signup"}
                      className="font-medium text-blue-500 hover:text-blue-500 ">
                       {" Sign-up"}
                   </Link>
                 </p>
 
          
              </div>
              </div>
          
                   
                   
                    </div>
                    </BackgroundGradient>
            </div>
     
                   
    </div>

    )

}