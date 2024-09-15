// src/pages/Booked.jsx
import { useEffect, useState } from 'react';
import { NavBar } from '../components/Navbar';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { Spinner } from '../components/Spinner';
import { HoverEffect } from "../shadcn/ui/card-hover-effect-turfs";

import { Button } from "../shadcn/ui/button";

type turfBooking = {
  id: number,
  slots: string[],
  price: string[],
  date: string[],
  turfName: string
}[];

type tournamentBooking={
  id:number,
  name:string,
  mode:number,
  turfId:number,
  duration:number,
  price:number,
  images:string[]

}[]



export const Booked = () => {
  const [turfBookings, setTurfBookings] = useState<turfBooking>([]);
  const [flag, setFlag] = useState(true);
  const [activeTab, setActiveTab] = useState('turf');
  const [tournamentBookings, setTournamentBookings] = useState<tournamentBooking>([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/user/get`, {
      headers: {
        Authorization: localStorage.getItem("usertoken")
      }
    }).then((data) => {
      console.log(data.data.val + "temp....");
      setTurfBookings(data.data.val);
      setFlag(false);
    });

    axios.get(`${BACKEND_URL}/api/tournament/bookedtournament`,{
      headers:{
        Authorization:localStorage.getItem("usertoken")
      }
    }).then((data)=>{
      console.log(data.data)
      // let set=new Set()
      // data.data.data1.map((val:any)=>{
      //   set.add(val)
      // })
      // data.data.data2.map((val:any)=>{
      //   set.add(val)
      // })
    
      // console.log(Array.from(set))
      // //@ts-ignore
      // setTournamentBookings(Array.from(set))
    })


  }, []);

  if (flag) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <NavBar val={"booked"} />
      <div className="flex h-screen">
        <div className="bg-slate-800 border border-purple-400 w-64 mt-4 rounded-xl">
          <nav className="py-6 px-4 space-y-4">
            <Button
              variant={activeTab === "turf" ? "destructive" : "ghost"}
              className="w-full justify-start text-white"
              onClick={() => setActiveTab("turf")}
            >
              <MapPinIcon className="w-5 h-5 mr-2" />
              Turf Booking
            </Button>
            <Button
              variant={activeTab === "tournament" ? "destructive" : "ghost"}
              className="w-full justify-start text-white"
              onClick={() => setActiveTab("tournament")}
            >
              <TrophyIcon className="w-5 h-5 mr-2" />
              Tournament Booking
            </Button>
          </nav>
        </div>
        <div className="flex-1 p-8">
          {activeTab === "turf" && (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Turf Booking</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="max-w-5xl mx-auto px-8 mt-4">
              <HoverEffect items={turfBookings} />
              </div>
              </div>
            </div>
          )}
          {activeTab === "tournament" && (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Tournament Booking</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="max-w-5xl mx-auto px-8 mt-4">
              <HoverEffect items={turfBookings} />
              </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Booked;

function MapPinIcon(props:any) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function TrophyIcon(props:any) {
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
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}







// <NavBar val={"booked"} />
//       <div className="flex justify-center items-center mt-4">
//         <button
//           className={`px-4 py-2 mx-2 ${selectedTab === 'turfBooking' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           onClick={() => setSelectedTab('turfBooking')}
//         >
//           Turf Booking
//         </button>
//         <button
//           className={`px-4 py-2 mx-2 ${selectedTab === 'tournamentBooking' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           onClick={() => setSelectedTab('tournamentBooking')}
//         >
//           Tournament Booking
//         </button>
//       </div>

//       <div className="max-w-5xl mx-auto px-8 mt-4">
//         {selectedTab === 'turfBooking' && (
//           <HoverEffect items={bookings} />
//         )}
//         {selectedTab === 'tournamentBooking' && (
//           <HoverEffect items={bookings} />
//         )}
//       </div>
//     </>
