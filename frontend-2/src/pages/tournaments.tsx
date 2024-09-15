import { useEffect, useState } from "react";
import { Button } from "../shadcn/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../shadcn/ui/card";
import { NavBar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Spinner } from "../components/Spinner";

type tournaments={
  id:number,
  name:string,
  mode:number,
  turfId:number,
  total_teams:number,
  duration:number,
  price:number,
  images:string[],
  registrationstartDate:string,
  registrationendDate:string
}[]

type details={
 
            "id": number,
            "turfName": string,
            "area": string,
            "city": string,
            "likes": number,
            "state": string,
            "images": string[]
            "adminId": number,
            "Sports": string[]
 
}[]



export function Tournaments() {
  const [showActive, setShowActive] = useState(false);
  const [tournaments,setTournaments]=useState<tournaments | null>()
  const [details,setDetails]=useState<details | null>()
  const[activeTournaments,setActiveTournaments]=useState<tournaments |null>()

  const navigate=useNavigate()

  function getDetails(id:number)
  {
    for(let i=0;i<(details?.length || 0);i++)
    {
      //@ts-ignore
      if(details[i].id==id)
      {
        //@ts-ignore
          return (details[i]);

      }

    }
  }

  function storeActive(){
 
    let temp=[]
    for(let i=0;i<(tournaments?.length || 0);i++)
    {
      //@ts-ignore
        if( new Date(tournaments[i]?.registrationstartDate) <= new Date() && new Date(tournaments[i]?.registrationendDate)>=new Date())
        {
          //@ts-ignore
          temp.push(tournaments[i])

        }
    }
    console.log(temp)
    setActiveTournaments(temp)

  }

  useEffect(()=>{
    axios.get(`${BACKEND_URL}/api/tournament/listtournament`,{
      headers:{
        Authorization:localStorage.getItem("usertoken")
      }
    }).then((data)=>{
      console.log(data.data)
      
      setTournaments(data.data.tournaments)
      setDetails(data.data.details)
      storeActive()

    })
  
  
  
  },[])
 
  if(!tournaments)
  {
   
    return(
      
       <div className='flex justify-center items-center h-screen'>
       
       <Spinner />
       </div>
       
       
    )
  }


  return (
    <div className="text-foreground min-h-screen ">
  <NavBar val="tournaments" />
      <header className="text-primary-foreground py-6 px-4 md:px-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-extrabold">Tournaments</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 md:px-6">
        <div className="flex justify-end mb-6">
          <Button
            variant={showActive ? "destructive" : "outline"}
            onClick={() => setShowActive(false)}
            className="mr-2"
          >
            All Tournaments
          </Button>
          <Button variant={showActive ? "outline" : "destructive"} onClick={() => setShowActive(true)}>
            Active Tournaments
          </Button>
        </div>
        {!showActive ? 
        <div className="grid grid-cols-1       md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map((tournament) => {
            const isUpcoming = new Date(tournament.registrationstartDate) > new Date();
            const closed =new Date(tournament.registrationendDate)<new Date()
          
            return (
              <Card key={tournament.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={tournament.images[0]} alt={tournament.name} className="w-full h-48 object-cover" />
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">{tournament.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 gap-4">
                  <p className="text-left font-bold">Registration Period</p>
                    <div className="flex">
                     
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5 text-gray-600" />
                      <span>{tournament.registrationstartDate.split('-').reverse().join('-') }</span>
                    </div>
                    <p className="mx-2">-</p>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5 text-gray-600" />
                      <span>{"   "+tournament.registrationendDate.split('-').reverse().join('-')}</span>
                    </div>
                    </div>
                    <div className="flex items-center gap-2">
                
                      <span className="px-2">{getDetails(tournament.turfId)?.turfName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-5 h-5 text-gray-600" />
                      <span>{(`${getDetails(tournament.turfId)?.area}, ${getDetails(tournament.turfId)?.city},${getDetails(tournament.turfId)?.state}`) || ""}</span>
                    </div>
                    {/* <p className="text-gray-700">{tournament.description}</p> */}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button disabled={isUpcoming || closed}  onClick={()=>navigate(`/tournamentbook?id=${tournament.id}`)}className="ml-auto">
                    Register
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        :
        <div className="grid grid-cols-1       md:grid-cols-2 lg:grid-cols-3 gap-6">
          {
          activeTournaments?.map((tournament) => {
      
            console.log(tournament.registrationstartDate +" "+new Date().toISOString())
            return (
              <Card key={tournament.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={tournament.images[0]} alt={tournament.name} className="w-full h-48 object-cover" />
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">{tournament.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                  <p className="text-left font-bold">Registration Period</p>
                  <div className="flex">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5 text-gray-600" />
                      <span>{tournament.registrationstartDate.split('-').reverse().join('-') }</span>
                    </div>
                    <p className="mx-2">-</p>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5 text-gray-600" />
                      <span>{"   "+tournament.registrationendDate.split('-').reverse().join('-')}</span>
                    </div>
                    </div>
                    <div className="flex items-center gap-2">
                
                      <span>{getDetails(tournament.turfId)?.turfName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-5 h-5 text-gray-600" />
                      <span>{(`${getDetails(tournament.turfId)?.area}, ${getDetails(tournament.turfId)?.city},${getDetails(tournament.turfId)?.state}`) || ""}</span>
                    </div>
          
                  </div>
                </CardContent>
                <CardFooter>
                  <Button   onClick={()=>navigate(`/tournamentbook?id=${tournament.id}`)}className="ml-auto">
                    Register
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        }
      </main>
    </div>
  );
}

function CalendarIcon(props: any) {
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
  );
}

function ClockIcon(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function MapPinIcon(props: any) {
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
