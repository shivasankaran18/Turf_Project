import {  useEffect, useState } from "react";
import { NavBar } from "../components/Navbar";
import {  useSearchParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Button } from "../shadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,

} from "../shadcn/ui/dialog"
import { Spinner } from "../components/Spinner";
import { flushSync } from "react-dom";
import { Label } from "../shadcn/ui/label";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shadcn/ui/select";

import { RadioGroup, RadioGroupItem } from "../shadcn/ui/radio-group";
import { useToast } from "../shadcn/ui/use-toast"



import { Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious, } from "../shadcn/ui/carousel";
import { HeartIcon } from "lucide-react";
import { Toaster } from "../shadcn/ui/toaster";

type detail = {
  date: string,
  slot: string,
  price: number,
  available: boolean,
  id: number,
  turfid: number,
  area: string,
  city: string,
  images:string[],
  sports:string[]
  turfName:string,
  state:string,
  likes:number
}[];



export  function Book() {
  const [search] = useSearchParams();
  const [flag, setFlag] = useState(false);
  const [details, setDetails] = useState<detail>([]);

  const [date, setDate] = useState<string>("");
  const [slot, setSlot] = useState<string>("");
 
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [availabitility, setAvailability] = useState(false);
  const [likes, setLikes] = useState<number>(0);
  const [liked,setLiked]=useState<boolean>(false)
  const [price,setPrice]=useState<number>(0)
  const [displaySlots,setDisplaySlots]=useState<string[]>()
  const {toast}=useToast()
  




  const openDialog = () => {
    setIsOpen(true);
  };

  const handleOptionChange = (val:string) => {
    setSelectedOption(val);
    console.log(val)
  };

  const handleSubmit = async () => {
    console.log("Called");

    if (selectedOption === "cash" || selectedOption === "") {
      openDialog();
    } else {
      try {
         await handlecheckcard(); // Await the asynchronous function handlecheck
        console.log("availabitility:", availabitility);
          const response = await axios.post(`${BACKEND_URL}/api/user/payment`, {
            turfName: details[0]?.turfName,
            area: details[0]?.area,
            state: details[0]?.state,
            city: details[0]?.city,
            date: date,
            slot: slot,
            mode: selectedOption
          }, {
            headers: {
              Authorization: localStorage.getItem("usertoken")
            }
          });

          console.log(response.data);
          window.location = response.data.url;
      } catch (error) {
        console.error("Error during the post request:", error);
      }
    }
  };

  const closeDialog = () => {
   
    setIsOpen(false);
  };
  const handlecheckcard = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/user/book`, {
        turfId: search.get("id"),
        slot,
        date,
        card:"card",
      }, {
        headers: {
          Authorization: localStorage.getItem("usertoken")
        }
      });

      if (res.data.success === true) {
        console.log("HI");

      flushSync(() => {
      setAvailability(true);
});
       
        console.log("availbefore:", availabitility);
      
        closeDialog();

      } else {
        setAvailability(false);
        alert("error");
      }
    } catch (error) {
      console.error("Error during the booking request:", error);
      setAvailability(false);
    }
  };


  const handlecheck = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/user/book`, {
        turfId: search.get("id"),
        slot,
        date
      }, {
        headers: {
          Authorization: localStorage.getItem("usertoken")
        }
      });

      if (res.data.success === true) {
        console.log("HI");

      flushSync(() => {
      setAvailability(true);
});
       
        console.log("availbefore:", availabitility);
        toast({
          title: "SLot Booked Successfully ",
          description: "Thank you for booking your turf slot! Please be on time and enjoy your game.",
         
        })

      
        closeDialog();

      } else {
        setAvailability(false);
        alert("error");
      }
    } catch (error) {
      console.error("Error during the booking request:", error);
      setAvailability(false);
    }
  };

  const handleLike=async ()=>{
    setLiked(true)
    await axios.post(`${BACKEND_URL}/api/turfdetails/addlikes`,details[0],{
      headers:{
        Authorization:localStorage.getItem("usertoken")
      }
    })
    
    setLikes(likes+1)
    


  }
  const handleDateChange=(date:string)=>
  {
    setDate(date)
    let temp:string[]=[]
    for(let i=0;i<details.length;i++)
    {
     
      if(details[i].date==date)
      {
          temp.push(details[i].slot)
      }
    }
    setDisplaySlots(temp)
  }

  function handleSlotChange(slot:string)
  {
    
    
    for(let i=0;i<details.length;i++)
    {
      console.log(details[i])
      if(details[i].date==date && details[i].slot==slot)
      {
        
        setPrice(details[i].price)
      }
    }
    setSlot(slot);


  }

  useEffect(() => {
    console.log(search.get("id"));
    axios.get(`${BACKEND_URL}/api/turfdetails/getslot?id=${search.get("id")}`, {
      headers: {
        Authorization: localStorage.getItem("usertoken"),
      }
    }).then((data) => {
      console.log(data.data[0]+"loggend noww..........................");
  
      setDetails(data.data);
      setLikes(data.data[0]?.likes)
      setFlag(true);
    });
  }, [search]);

  if (!flag) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spinner />
      </div>
    );
  }

  if(details.length==0)
  {
    return(
        <>
            <NavBar val="turfs" />

            < div className="w-full text-white mt-48">
                No slots available
            </div>
        </>
        

    )
  }
  return (
    <>
    <NavBar val="turfs" />
    <div className="flex flex-col min-h-dvh mt-14 bg-red-700">
      <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      <Carousel>
            <CarouselContent>
              {details[0].images.map((image, index) => (
                <CarouselItem key={index}>
                  <img src={image} alt={`Carousel item ${index}`} className="w-full h-full object-cover" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext/>
        </Carousel>
      
      </section>
      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="flex flex-col items-start">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">{details[0].turfName}</h2>
              <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl mt-4">
                Our premium turf is designed for the ultimate playing experience. With a soft, even surface and superior
                drainage, you'll enjoy a smooth and consistent game every time.
              </p>
              <ul className="mt-6 space-y-4 text-lg md:text-xl lg:text-2xl">
                <li className="flex items-center space-x-3">
                  <DotIcon className="w-6 h-6 text-primary" />
                  <span>{`${details[0].area},${details[0].city},${details[0].state}`}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <DotIcon className="w-6 h-6 text-primary" />
                  <span>Expertly maintained and groomed</span>
                </li>
                <li className="flex items-center space-x-3">
                  <DotIcon className="w-6 h-6 text-primary" />
                  <span>Suitable for all skill levels</span>
                </li>
              </ul>
              <div className="mt-6">
              <button
              onClick={handleLike}
            
            className={`text-2xl ${
              liked ? "text-red-500" : "text-gray-500"
            } transition-transform duration-300 transform ${liked ? "scale-125" : "scale-100"}`}
          >
      
            <HeartIcon className="h-10 w-8 pt-4 " />
          </button>
          <span className="text-gray-600 text-3xl px-3">{likes} Likes</span>
              </div>
             
            </div>
            <div className="bg-muted rounded-xl shadow-lg p-6 md:p-8 lg:p-10">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">Book Your Slot</h3>
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <input type="date" onChange={(e)=>{handleDateChange(e.target.value)}} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />

                  </div>
                  <div>
                    <Label htmlFor="time">Time Slot</Label>
                    <Select onValueChange={(val)=>{handleSlotChange(val)}}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Time" />
                      </SelectTrigger>
                      <SelectContent>
                        {displaySlots?.map((val)=>{
                          return <SelectItem value={val} >{val}</SelectItem>

                        })}

                       
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="bg-white text-center py-2">
                  <Label htmlFor="price " className="text-2xl">Price</Label>
                  <div className="text-2xl font-bold">{`INR ${price}`}</div>
                </div>
                <div>
                  <Label htmlFor="payment">Payment Method</Label>
                  <RadioGroup value={selectedOption}className="grid grid-cols-2 gap-4">
                    <div>
                      <RadioGroupItem value="card" id="card" className="peer sr-only" />
                      <Label
                        htmlFor="card"
                        className={`flex flex-col items-center justify-between rounded-md border-2 p-4 
                        ${selectedOption === 'card' ? 'border-primary' : 'border-muted'} 
                        bg-popover hover:bg-accent hover:text-accent-foreground`}
                        onClick={() => handleOptionChange('card')}
                      >
                        <CreditCardIcon className="mb-3 h-6 w-6" />
                        Card
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="cash" id="cash" className="peer sr-only" />
                      <Label
                        htmlFor="cash"
                        className={`flex flex-col items-center justify-between rounded-md border-2 p-4 
                        ${selectedOption === 'cash' ? 'border-primary' : 'border-muted'} 
                        bg-popover hover:bg-accent hover:text-accent-foreground`}
                        onClick={() => handleOptionChange('cash')}
                      >
                        <DollarSignIcon className="mb-3 h-6 w-6" />
                        Cash
                      </Label>
                    </div>
                  </RadioGroup>


                  {/* <div className="flex items-center space-x-2 mt-4">
  {/* <Button>Like</Button>
  <span>{likes} Likes</span>
</div> */}




                </div>
                <Toaster />
                <Button className=" mt-4 w-3/4" size={"lg"} variant={"destructive"} onClick={handleSubmit}>Book Now</Button>
                   
               <Dialog open={isOpen} >
                 <DialogContent>
                   <DialogHeader>
                     <DialogTitle>Confirm Booking</DialogTitle>
                  </DialogHeader>
                   <DialogDescription>
                    Are You Sure?.
                 </DialogDescription>
                 <DialogFooter className="flex justify-between">
                 <Button onClick={closeDialog}>Close</Button>
                 <Button onClick={handlecheck}>Confirm</Button>
               </DialogFooter>
                 </DialogContent>
               </Dialog>
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
    </>
  )
}

//@ts-ignore

function ChevronDownIcon(props) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
//@ts-ignore

function CreditCardIcon(props) {
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
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}
//@ts-ignore

function DollarSignIcon(props) {
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
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}
//@ts-ignore

function DotIcon(props) {
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
      <circle cx="12.1" cy="12.1" r="1" />
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






