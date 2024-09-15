import { Button } from "../shadcn/ui/button"
import { Avatar,AvatarImage,AvatarFallback } from "../shadcn/ui/avatar"
import { Link, useNavigate } from "react-router-dom"


export const NavBar = ({val}:{val:string}) => {
    const navigate=useNavigate();
    
    return (         
        
        <nav className="  w-full border rounded-full border-y-4  border-cyan-400   ">
            <div className="container mx-auto flex flex-wrap items-center justify-between p-4">
                <Link to="/home" className="flex items-center  space-x-3 rtl:space-x-reverse">
                   
                    <span className="self-center text-2xl  text-white font-semibold whitespace-nowrap">TurfHub</span>
                </Link>
                <div className="w-full sm:w-auto">
                    <ul className="font-medium flex flex-col p-4 sm:p-0 mt-4 border border-gray-100 rounded-lg sm:flex-row sm:space-x-8 rtl:space-x-reverse sm:mt-0 sm:border-0">
                    <li>
                        <Link to={"/home"} className={`block  text-white py-2 px-3 ${val === 'home' ? 'text-blue-400' : 'hover:text-sky-400'} rounded sm:p-0`} aria-current="page">Home</Link>
                    </li>
                    <li>
                        <Link to={"/bookingDetails"} className={`block text-white py-2 px-3 ${val === 'Booking Details' ? 'text-blue-400' : 'hover:text-sky-400'} rounded sm:p-0`}>Booking Details</Link>
                    </li>
                   
                    <li>
                        <Link to={"/contact"} className={`block  text-white py-2 px-3 ${val === 'contact' ? 'text-blue-400' : 'hover:text-sky-400'} rounded sm:p-0`}>Contact</Link>
                    </li>

                    </ul>
                </div>
                <div className="flex">
                    <Avatar className="mx-7">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>

                    </Avatar>
                    <Button className="mx-2 bg-cyan-500" onClick={()=>{
                        localStorage.removeItem("token");
                        navigate("/")
                    }}>Log Out</Button>
                </div>
            </div>
        </nav>
    )
}