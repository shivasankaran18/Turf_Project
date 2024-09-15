

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Home } from './pages/Home'
import { Turfs } from './pages/Turfs'
import { Book } from './pages/Book'
import { Booked } from './pages/Booked'
import { Contact } from './pages/Contact'
import {RecoilRoot } from "recoil"
import { Landing } from './pages/Landing'
import { Tournaments } from './pages/tournaments'
import { TournamentDetail } from './pages/tournamentdetail'

function App() {


  return (
    <>
    <RecoilRoot>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/turfs" element={<Turfs/>}></Route>
          <Route path="/book" element={<Book/>}></Route>
          <Route path="/booked" element={<Booked />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/tournaments" element={<Tournaments />}></Route>
          <Route path="/tournamentbook" element={<TournamentDetail />}></Route>
        </Routes>
      
      </BrowserRouter>



    </RecoilRoot>
     
     
    </>
  )
}

export default App
