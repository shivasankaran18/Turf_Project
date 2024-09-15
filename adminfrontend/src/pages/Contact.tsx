
import { Label } from "../shadcn/ui/label"
import { Input } from "../shadcn/ui/input"
import { Textarea } from "../shadcn/ui/textarea"
import { Button } from "../shadcn/ui/button"
import { NavBar } from "../components/Navbar"



export const Contact=()=>{

    return(
        <>
            <NavBar val={"contact"} />
            <div className="w-full max-w-4xl mx-auto py-12 md:py-16 lg:py-20 px-4 md:px-6">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl text-white font-bold tracking-tight sm:text-4xl">Get in Touch</h1>
          <p className="mt-3 max-w-2xl mx-auto text-muted-foreground sm:text-lg text-white">
            Have a question or want to work together? Fill out the form below and we'll get back to you as soon as
            possible.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-muted rounded-lg p-6 md:p-8">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex flex-col items-center md:items-start gap-1">
                <h2 className="text-2xl font-bold">TurfHub</h2>
                <p className="text-muted-foreground">CIT,Kundrathur,Chennai,TamilNadu</p>
              </div>
              <div className="flex flex-col items-center md:items-start gap-1">
                <p className="font-medium">Email:</p>
                <p className="text-muted-foreground">shivasankaran1807@gmail.com</p>
              </div>
              <div className="flex flex-col items-center md:items-start gap-1">
                <p className="font-medium">Phone:</p>
                <p className="text-muted-foreground">NA</p>
              </div>
            </div>
          </div>
          <div className="bg-muted rounded-lg p-6 md:p-8">
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={5} placeholder="Enter your message" />
              </div>
              <Button type="submit"  className="w-full bg-cyan-500">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>

        </>



   
  )
}
    
