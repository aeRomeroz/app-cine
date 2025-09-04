import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import HomeMenu from './pages/HomeMenu'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import Bookings from './pages/Bookings'
import Favorites from './pages/Favorites'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomeMenu/>}/>
        <Route path='/movies' element={<Movies/>}/>
        <Route path='/movies/:id' element={<MovieDetails/>}/>
        <Route path='/movies/:id/:date' element={<SeatLayout/>}/>
        <Route path='/bookings' element={<Bookings/>}/>
        <Route path='/favorites' element={<Favorites/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
