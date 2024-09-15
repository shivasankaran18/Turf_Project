


import { Button } from "../shadcn/ui/button"

import { Link, useNavigate } from "react-router-dom"
import { BusIcon } from "lucide-react"
import { InfiniteMovingCards } from "../shadcn/ui/infinite-moving-cards"

import{LampContainer} from "../shadcn/ui/lamp"
export  function Landing() {
  const navigate=useNavigate()
  return (
    <div>
    <div className="flex flex-col  w-screen left-0 top-0 absolute">
   
      <div className="bg-slate-950 text-white py-4 px-6 flex  justify-between ">
      
        <Link to="#" className="flex items-center gap-2 ml-20" >
          <BusIcon className="w-6 h-6" />
          <span className="text-3xl font-bold">TurfHub</span>
        </Link>
        <div className="flex justify-end w-full gap-6">
        <Button className="text-white bg-cyan-500  w-1/6" onClick={()=>navigate("/signin")}>
          SignIn
        </Button>
        <Button  className=" text-white bg-cyan-500 hover:bg-[#005A8E] w-1/6" onClick={()=>navigate("/signup")}>
          SignUp
        </Button>
        
        </div>
        
        
      </div>
      <main className="flex-1">
      <div>
      <LampContainer>
          
          <h1 className="text-5xl font-bold text-white mb-4">Revolutionize Your Turf Management</h1>
          <p className="text-xl text-white mb-10">
            TurfHub is the ultimate platform for managing your sports turf facilities. Book, schedule, and analyze with
            ease.
          </p>
          <Button  className=" text-black hover:bg-black-200 px-8 py-4 text-lg  bg-gray-200 font-medium w-1/3" onClick={()=>navigate("/signup")}>
            Try TurfHub
            </Button>
            
            </LampContainer>
            </div>
          
        
        <section className="py-20 px-6 grid grid-cols-1 md:grid-cols-3 gap-12 bg-slate-950  ">
          <div className="flex flex-col items-center gap-6">
            <CalendarIcon className="w-16 h-16 text-[#0077B6]" />
            <h3 className="text-3xl font-bold">Turf Booking</h3>
            <p className="text-gray-600 text-lg">
              Easily manage bookings and reservations for your sports turf facilities.
            </p>
            <Link to="#" className="text-[#0077B6] hover:underline text-lg font-medium" >
              Learn More
            </Link>
          </div>
          <div className="flex flex-col items-center gap-6">
            <SettingsIcon className="w-16 h-16 text-[#0077B6]" />
            <h3 className="text-3xl font-bold">Management Tools</h3>
            <p className="text-gray-600 text-lg">
              Streamline your turf management with powerful tools for scheduling, maintenance, and more.
            </p>
            <Link to="#" className="text-[#0077B6] hover:underline text-lg font-medium" >
              Learn More
            </Link>
          </div>
          <div className="flex flex-col items-center gap-6">
            <BarChartIcon className="w-16 h-16 text-[#0077B6]" />
            <h3 className="text-3xl font-bold">Analytics</h3>
            <p className="text-gray-600 text-lg">
              Gain valuable insights into your turf usage and performance with our advanced analytics.
            </p>
            <Link to="#" className="text-[#0077B6] hover:underline text-lg font-medium" >
              Learn More
            </Link>
          </div>
        </section>
     
        <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <InfiniteMovingCards
        items={testimonials}
        direction="left"
        speed="fast"
      />
    </div>
      </main>
      <footer className="bg-slate-950 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-6">
            <h4 className="text-2xl font-bold">TurfHub</h4>
            <p className="text-lg">Revolutionize your turf management with TurfHub.</p>
            <div className="flex gap-6">
              <Link to="#" className="text-white hover:underline" >
                <TwitterIcon className="w-8 h-8" />
              </Link>
              <Link to="#" className="text-white hover:underline" >
                <FacebookIcon className="w-8 h-8" />
              </Link>
              <Link to="#" className="text-white hover:underline" >
                <LinkedinIcon className="w-8 h-8" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="text-2xl font-bold">Features</h4>
            <Link to="#" className="hover:underline text-lg" >
              Turf Booking
            </Link>
            <Link to="#" className="hover:underline text-lg" >
              Management Tools
            </Link>
            <Link to="#" className="hover:underline text-lg" >
              Analytics
            </Link>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="text-2xl font-bold">Resources</h4>
            <Link to="#" className="hover:underline text-lg" >
              Documentation
            </Link>
            <Link to="#" className="hover:underline text-lg" >
              Blog
            </Link>
            <Link to="#" className="hover:underline text-lg" >
              Support
            </Link>
          </div>
        </div>
        <div className="mt-12 text-center text-lg">&copy; 2024 TurfHub. All rights reserved.</div>
      </footer>
      </div>
      </div>
  )
}

//@ts-ignore

function BarChartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  )
}


//@ts-ignore

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}
//@ts-ignore

function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}
//@ts-ignore

function GrapeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 5V2l-5.89 5.89" />
      <circle cx="16.6" cy="15.89" r="3" />
      <circle cx="8.11" cy="7.4" r="3" />
      <circle cx="12.35" cy="11.65" r="3" />
      <circle cx="13.91" cy="5.85" r="3" />
      <circle cx="18.15" cy="10.09" r="3" />
      <circle cx="6.56" cy="13.2" r="3" />
      <circle cx="10.8" cy="17.44" r="3" />
      <circle cx="5" cy="19" r="3" />
    </svg>
  )
}
//@ts-ignore

function LinkedinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}
//@ts-ignore

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

//@ts-ignore
function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}
//@ts-ignore


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}


const testimonials = [
  {
    quote:  "I was hesitant to try a new platform, but TurfHub has exceeded all of my expectations. The customersupport has been fantastic, and the features have made my job so much easier."
     ,
    name: "SA",
    title: "",
  },
  {
    quote:
      " TurfHub has been a game-changer for our sports facility. The booking system is so easy to use, and the analytics have helped us optimize our operations.",
    name: "JD",
    title: "",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];