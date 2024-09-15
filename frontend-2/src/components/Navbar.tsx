import { Button } from "../shadcn/ui/button"
import { Avatar,AvatarImage,AvatarFallback } from "../shadcn/ui/avatar"
import { Link, useNavigate } from "react-router-dom"

export const NavBar = ({val}:{val:string}) => {
    const navigate=useNavigate();



    
    
    return (
        <nav className="  w-full  border rounded-full border-y-4  border-purple-400 ">
            <div className="container mx-auto flex flex-wrap items-center justify-between p-4">
                <Link to="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
                   
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">TurfHub</span>
                </Link>
                <div className="w-full sm:w-auto">
                    <ul className="font-medium flex flex-col p-4 sm:p-0 mt-4 border border-gray-100 rounded-lg sm:flex-row sm:space-x-8 rtl:space-x-reverse sm:mt-0 sm:border-0">
                    <li>
                        <Link to={"/home"} className={`block py-2 px-3 ${val === 'home' ? 'text-sky-400' : 'hover:text-sky-400 text-white'} rounded sm:p-0`} aria-current="page">Home</Link>
                    </li>
                    <li>
                        <Link to={"/turfs"} className={`block py-2 px-3 ${val === 'turfs' ? 'text-sky-400' : 'hover:text-sky-400  text-white'} rounded sm:p-0`}>Turfs</Link>
                    </li>
                    <li>
                        <Link to={"/tournaments"} className={`block py-2 px-3 ${val === 'tournaments' ? 'text-sky-400' : 'hover:text-sky-400  text-white'} rounded sm:p-0`}>Tournaments</Link>
                    </li>
                    <li>
                        <Link to={"/booked"} className={`block py-2 px-3 ${val === 'booked' ? 'text-sky-400' : 'hover:text-sky-400  text-white'} rounded sm:p-0`}>Booked</Link>
                    </li>
                    <li>
                        <Link to={"/contact"} className={`block py-2 px-3 ${val === 'contact' ? 'text-sky-400' : 'hover:text-sky-400  text-white'} rounded sm:p-0`}>Contact</Link>
                    </li>

                    </ul>
                </div>
                <div className="flex">
                    <Avatar className="mx-7">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>

                    </Avatar>
                    <Button className="mx-2" onClick={()=>{
                        localStorage.removeItem("token");
                        navigate("/")
                    }}>Log Out</Button>
                </div>
            </div>
        </nav>
    )
}