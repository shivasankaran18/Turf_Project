
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../shadcn/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../shadcn/ui/table"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "../shadcn/ui/dropdown-menu"
import { Button } from "../shadcn/ui/button"
import { NavBar } from "../components/Navbar"
import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../shadcn/ui/dialog"


type details={
    id: number,
    turfId: number,
    userId: number,
    date: string,
    slot: string,
    price: number,
    paid: boolean

}[]

type users={
    id:number,
    name:string,
    email:string

}[]

export function BookingDetails() {
    const [notPaidDetails,setNotPaidDetails]=useState<details>([])
    const [notPaidUsers,setNotPaidUsers]=useState<users>([])
    const [paidDetails,setPaidDetails]=useState<details>([])
    const [paidUsers,setPaidUsers]=useState<users>([])
    const [flag,setFlag]=useState(true)
    const [isOpen,setIsOpen]=useState<boolean>(false)
    const [userToBeMarked,setUserToBeMarked]=useState<null | details>()

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/admin/getNotPaidDetails`,{
            headers:{
                Authorization:localStorage.getItem("admintoken")
            }
        }).then((data)=>{
          console.log(data.data)
            setNotPaidDetails(data.data.booking)
            if(data.data.booking.length!=0)
            {
              setFlag(false)
            }
            setNotPaidUsers(data.data.users)
        })

        axios.get(`${BACKEND_URL}/api/admin/getPaidDetails`,{
            headers:{
                Authorization:localStorage.getItem("admintoken")
            }
        }).then((data)=>{
          console.log(data.data)
            setPaidDetails(data.data.booking)
            if(data.data.booking.length!=0)
              {
                setFlag(false)
              }
            setPaidUsers(data.data.users)
        })
        

        
    },[])

    if(flag)
    {
        return(
            <>
          
          <NavBar val="Booking Details"></NavBar>
          <div className="flex  text-white justify-center mt-36">
              No users booked
          </div>
       
              
            </>
        )
    }


    async function markPaid()
    {
       const res=await axios.post(`${BACKEND_URL}/api/admin/markpaid`,userToBeMarked,{
                      headers:{
                        Authorization:localStorage.getItem("admintoken")
                      }
                    })
                    
        console.log(res)
        setIsOpen(false)
     


    }
 
   



  return (
    <>
    <NavBar val="Booking Details"></NavBar>
    <div className=" bg-slate-900 grid min-h-screen mt-16 w-full grid-cols-1 gap-6 bg-muted/40 p-4 sm:grid-cols-2 sm:p-6 md:grid-cols-1 lg:grid-cols-2 lg:gap-8">
      <Card className="col-span-1 lg:col-span-1 border-cyan-500 border-2 hover:border-4">
        <CardHeader>
          <CardTitle>Users Yet to Pay</CardTitle>
          <CardDescription>View and manage upcoming turf bookings.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Booking Date</TableHead>
                <TableHead>Time Slot</TableHead>
                <TableHead>Amount Owed</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                {notPaidDetails.map((data)=>{
                    let user=""
                    for(let i=0;i<notPaidUsers.length;i++)
                    {
                        if(notPaidUsers[i].id==data.userId)
                        {
                            user=notPaidUsers[i].name
                            break
                        }
                    }
                    return(
                        <TableRow>
                <TableCell>{user}</TableCell>
                <TableCell>{data.date}</TableCell>
                <TableCell>{data.slot}</TableCell>
                <TableCell>{data.price}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={async ()=>{
                    //@ts-ignore
                    setUserToBeMarked(data)
                    setIsOpen(true)
                    
                    // const res=await axios.post(`${BACKEND_URL}/api/admin/markpaid`,data,{
                    //   headers:{
                    //     Authorization:localStorage.getItem("admintoken")
                    //   }
                    // })
                    
                    // console.log(res)


                  }}>
                    Mark as Paid
                  </Button>
                </TableCell>
              </TableRow>

                    )
                })}
              
              
              
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Showing upcoming bookings</div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <div className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>Upcoming</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Completed</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListOrderedIcon className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only">Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup>
                  <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="date">Booking Date</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="time">Time Slot</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="amount">Amount Owed</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardFooter>
      </Card>
      <Card className="col-span-1 lg:col-span-1  border-cyan-500 border-2 hover:border-4">
        <CardHeader>
          <CardTitle>Users Paid</CardTitle>
          <CardDescription>View and manage completed turf bookings.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Booking Date</TableHead>
                <TableHead>Time Slot</TableHead>
                <TableHead>Amount Paid</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                {
                paidDetails.map((data)=>{
                    let user=""
                    for(let i=0;i<paidUsers.length;i++)
                    {
                        if(paidUsers[i].id==data.userId)
                        {
                            user=paidUsers[i].name
                            break
                        }
                    }
                    return(
                        <TableRow>
                <TableCell>{user}</TableCell>
                <TableCell>{data.date}</TableCell>
                <TableCell>{data.slot}</TableCell>
                <TableCell>{data.price}</TableCell>
                
              </TableRow>

                    )
                })}
              
              
              
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Showing  completed bookings</div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <div className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem>Upcoming</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>Completed</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListOrderedIcon className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only">Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup>
                  <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="date">Booking Date</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="time">Time Slot</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="amount">Amount Paid</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={isOpen} >
                 <DialogContent>
                   <DialogHeader>
                     <DialogTitle>Confirm Booking</DialogTitle>
                  </DialogHeader>
                   <DialogDescription>
                    Are You Sure?.
                 </DialogDescription>
                 <DialogFooter className="flex justify-between">
                 <Button  onClick={()=>setIsOpen(false)}>Close</Button>
                 <Button onClick={markPaid}>Confirm</Button>
               </DialogFooter>
                 </DialogContent>
               </Dialog>

    </div>

    </>
    
    
  )
}
//@ts-ignore

function ListOrderedIcon(props) {
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
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
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
