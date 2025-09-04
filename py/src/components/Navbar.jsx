import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MenuIcon, Search, Spotlight, TicketPlus, XIcon} from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';

function Navbar() {

    const {user} = useUser()
    const {openSignIn} = useClerk()

    const navigate = useNavigate()

  return (
    <div className='navbar-container fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 py-5 bg-[#2b2b2b]'>
        <Link to="/" className='flex items-center gap-1'>
            <Spotlight color='#cf994d' size={30}/>
            <span className='text-[18px]'>CineApp</span>
        </Link>
        
        <div className='flex flex-col md:flex-row items-center gap-8 text-[14px] ml-auto'>
            <Link onClick={() => {scrollTo(0,0)}} to={"/"}>Home</Link>
            <Link onClick={() => {scrollTo(0,0)}} to={"/movies"}>Movies</Link>  
            <Link onClick={() => {scrollTo(0,0)}} to={"/favorites"}>Favorites</Link>     
        </div>

        <div className='flex items-center gap-8 text-[14px] ml-[20px]'>
            <Search color='white' size={14}/>
            {
                ! user ? 
                (<button onClick={openSignIn} className='px-4 py-1 bg-[#cf994d] hover:bg-[#a3773a] transition rounded-full cursor-pointer'>Login</button>) : 
                (
                    <UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action label='My Bookings' labelIcon={<TicketPlus width={15}/>} onClick={()=> navigate("/bookings")}/>
                        </UserButton.MenuItems>
                    </UserButton>
                )
            }
            
        </div>

    </div>
  )
}

export default Navbar
