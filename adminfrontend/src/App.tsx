

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'

import { Home } from './pages/Home'
import { Details } from './pages/Details'
import { BookingDetails } from './pages/BookingDetails'
import { Landing } from './pages/Landing'
import { Contact } from './pages/Contact'





function App() {
 

  return (
    <>
  
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/details" element={<Details />}></Route>
          <Route path="/bookingDetails" element={<BookingDetails />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
       
         
        </Routes>
      
      </BrowserRouter>

      



      
    </>
  )
}

export default App
