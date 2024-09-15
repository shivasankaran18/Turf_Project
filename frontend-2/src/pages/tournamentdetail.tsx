import { useEffect, useState } from "react";
import { Label } from "../shadcn/ui/label";
import { Input } from "../shadcn/ui/input";
import { Button } from "../shadcn/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shadcn/ui/select";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Spinner } from "../components/Spinner";
import { CalendarIcon, TicketIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,

} from "../shadcn/ui/dialog"
import { Toaster } from "../shadcn/ui/toaster";

type Tournament = {
  id: number;
  name: string;
  mode: number;
  turfId: number;
  total_teams: number;
  duration: number;
  price: number;
  images: string[];
  registrationstartDate: string;
  registrationendDate: string;
};

type Detail = {
  id: number;
  turfName: string;
  area: string;
  city: string;
  likes: number;
  state: string;
  images: string[];
  adminId: number;
  Sports: string[];
};

type User = {
  name: string;
  password: string;
  id: number;
  email: string;
};

export function TournamentDetail() {
  const [teamLeader, setTeamLeader] = useState("user@example.com");
  const [search] = useSearchParams();
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [details, setDetails] = useState<Detail | null>(null);
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[] >([""]);
  const [isDialogOpen,setIsDialogOpen]=useState<boolean>(false)

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/tournament/listtournament?id=${search.get("id")}`, {
      headers: {
        Authorization: localStorage.getItem("usertoken")
      }
    }).then((data) => {
      setDetails(data.data.details);
      setTournament(data.data.tournaments);
 
    });

    axios.post(`${BACKEND_URL}/api/tournament/getusers`, {
      ID:search.get("id")
    },{
      headers: {
        Authorization: localStorage.getItem("usertoken")
      }
    }).then((data) => {
      console.log(data.data)
      setTeamMembers(data.data.data);
    });
  }, [search]);

  function handleTeamMemberChange(index: number, value: string) {
    const updatedTeamMembers = [...selectedTeamMembers] ;
    const user = teamMembers.find((member) => member.email === value);
    if(index==updatedTeamMembers.length)
    {
      updatedTeamMembers.push(user?.email || "")
    }
    else{
      updatedTeamMembers[index] = user?.email || "";
    }
    console.log(updatedTeamMembers)
    setSelectedTeamMembers(updatedTeamMembers);
  }

  if (!tournament) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }
  console.log(teamMembers)

  const availableTeamMembers = teamMembers.filter(
    (member) => !selectedTeamMembers.some((selected) => selected === member.email)
  );

  return (
    <div className="bg-background text-foreground min-h-screen">
      <main className="container mx-auto py-12 px-4 md:px-6">
        <div className="flex flex-col gap-6 ">
          <div className="flex justify-center ">
            <img
              src={details?.images[0]}
              alt={tournament.name}
              className="w-full max-w-lg rounded-lg"
              style={{ aspectRatio: "600/400", objectFit: "cover" }}
            />
          </div>
          <div>
            <header className="bg-primary text-primary-foreground py-6 px-4 md:px-6">
              <h1 className="text-2xl font-bold">{tournament.name}</h1>
            </header>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5" />
                  <span>{details?.area}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  <span>Reg Start Date: {tournament.registrationstartDate.split('-').reverse().join('-')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  <span>Reg End Date: {tournament.registrationendDate.split('-').reverse().join('-')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TicketIcon className="w-5 h-5" />
                  <span>Slots Left: {tournament.total_teams}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TicketIcon className="w-5 h-5" />
                  <span>Teams per Team: {tournament.mode}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TicketIcon className="w-5 h-5" />
                  <span>Price: ${tournament.price}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label  className=" flex ms-4 text-lg ">Team Leader</Label>
                <Input
                  id="team-leader"
                  type="email"
                  placeholder="Team Leader Email"
                  value={"test@gmail.com"}
                  // onChange={(e) => setTeamLeader(e.target.value)}
                  className="w-1/2"
                  required
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {Array.from({ length: tournament.mode - 1 }).map((_, index) => (
              
                  <div key={index} className="space-y-2 ">
                    <Label htmlFor={`team-member-${index + 1}`}>Team Member {index + 1}</Label>
                    <Select

                      // value={selectedTeamMembers[index]?.email ||" hellll"}
                      onValueChange={(value) => 
                        {;handleTeamMemberChange(index, value)}}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Team Member Email" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTeamMembers.map((member) => (
                          <SelectItem key={member.email} value={member.email}>
                            {member.name} ({member.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
              <Button variant="destructive" onClick={()=>setIsDialogOpen(true)}>Register</Button>
            </div>
          </div>
        </div>
      </main>
      <Toaster />
               
                   
               <Dialog open={isDialogOpen} >
                 <DialogContent>
                   <DialogHeader>
                     <DialogTitle>Confirm Booking</DialogTitle>
                  </DialogHeader>
                   <DialogDescription>
                    Are You Sure?.
                 </DialogDescription>
                 <DialogFooter className="flex justify-between">
                 <Button onClick={()=>setIsDialogOpen(false)}>Close</Button>
                <Button onClick={async()=>
                {
                  const res=await axios.post(`${BACKEND_URL}/api/tournament/book`,{
                    tournamentId:search.get("id"),
                    memberEmails:selectedTeamMembers
                  },{
                    headers:{
                      Authorization:localStorage.getItem("usertoken")
                    }
                  })
                  console.log(res)
                  setIsDialogOpen(false)
                   }}>Confirm</Button>
               </DialogFooter>
                 </DialogContent>
               </Dialog>
    </div>
  );
}

//@ts-ignore
function ClockIcon(props) {
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

//@ts-ignore
function MapPinIcon(props) {
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

