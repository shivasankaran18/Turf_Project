
import {Link, useNavigate} from "react-router-dom"
import { Button } from "../shadcn/ui/button"
import { ContainerScroll } from "../shadcn/ui/container-scroll-animation"

import { BackgroundBeams } from "../shadcn/ui/background-beams"
export  function Landing() {
    const navigate=useNavigate()
  return (
    
    
    <div className="flex flex-col  w-full absolute top-0 left-0 right-0 ">
      
      <header className="bg-black text-primary-foreground px-4 lg:px-6 h-14 flex items-center ">
        <Link to="#" className="flex items-center justify-center mx-20 mt-4" >
          <BusIcon className="h-6 w-6" />
          <span className="text-2xl mx-4">TurfHub</span>
        </Link>
        <div className="ml-auto block md:flex gap-4">
          <Button variant={"destructive"} className="w-52 mt-8 z-10" onClick={()=>navigate("/signin")}>Signin</Button>
          <Button variant={"destructive"} className="w-52 mt-8 z-10" onClick={()=>navigate("/signup")}>Sign up</Button>

          
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Book your sports turf in minutes
                  </h1>
                  <p className="max-w-[600px] text-primary-foreground/80 md:text-xl">
                    TurfHub makes it easy to find and book the perfect sports turf for your team or event. Discover
                    available turfs, compare prices, and secure your booking in just a few clicks.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button variant={"destructive"} className="mt-10 h-14 rounded-lg text-xl" onClick={()=>navigate("/signup")}>Book your first Turf</Button>
                </div>
              </div>
              <img
          
                src="https://imagetolink.com/ib/H68kgsk1Ni.jpg" alt="H68kgsk1Ni"
                width="550"
                height="550"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
         
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Key Features <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
              Discover the benefits of TurfHub
              </span>
            </h1>
            <br></br>
            <br></br>
          </>
        }
      >
        <img
            src="https://imagetolink.com/ib/EdS02IypUr.png"
            alt="EdS02IypUr"
          height={700}
          width={400}
          className="mx-auto rounded-2xl w-full h-full "
          draggable={false}
        />
      </ContainerScroll>
          
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-block rounded-lg px-3 py-1  text-2xl ">Why TurfHub?</div>
                <h2 className="  lg:leading-tighter text-[3.4rem] font-bold tracking-tighter ">
                  The ultimate sports turf booking platform
                </h2>
                <Button variant={"destructive"} className="mt-10 h-14 rounded-lg text-xl" onClick={()=>navigate("/signup")}>Book Now</Button>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block rounded-lg px-3 py-1 text-2xl">Trusted by Teams</div>
                <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl/relaxed">
                  TurfHub is trusted by sports teams, clubs, and event organizers across the country. Our platform
                  provides a seamless and reliable booking experience, ensuring your events and practices run smoothly.
                </p>
               
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 TurfHub. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link to="#" className="text-xs hover:underline underline-offset-4" >
            Terms of Service
          </Link>
          <Link to="#" className="text-xs hover:underline underline-offset-4" >
            Privacy
          </Link>
        </nav>
      </footer>
      <BackgroundBeams className=" h-2/5"/>
    </div>
    
 )
}
//@ts-ignore
function BusIcon(props) {
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
      <path d="M8 6v6" />
      <path d="M15 6v6" />
      <path d="M2 12h19.6" />
      <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />
      <circle cx="7" cy="18" r="2" />
      <path d="M9 18h5" />
      <circle cx="16" cy="18" r="2" />
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