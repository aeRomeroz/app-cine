import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { dummyShowsData, dummyDateTimeData, assets } from '../assets/assets'
import Loading from '../components/Loading';
import { ClockIcon } from 'lucide-react';
import isoTimeFormat from '../lib/isoTimeFormat';
import toast from 'react-hot-toast';

function SeatLayout() {

  const rowGroups = [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"], ["I", "J"]];

  const {id, date} = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);

  const navigate = useNavigate(); 
  const getShow = async () => {
    const show = dummyShowsData.find(show => show._id === id);
    if(show){
      setShow({
        movie: show,
        dateTime: dummyDateTimeData
      });
    }
  }

  const handleSeatClick = (seatId) => {
    if(!selectedTime){
      return toast("Please select a time first");
    }
    
    if(!selectedSeats.includes(seatId) && selectedSeats > 4){
      return toast("You can only select up to 4 seats");
    }

    setSelectedSeats(prev => prev.includes(seatId) ? prev.filter(seat => seat !== seatId) : [...prev, seatId]);
  }

  const renderSeats = (row, count = 9) => (
    <div key={row} className='flex gap-2 mt-2'>
      <div className='flex flex-wrap items-center justify-center gap-2'>
        {Array.from({length:count}, (_, i) => {
          const seatId = `${row}${i+1}`;
          return (
            <button key={seatId} onClick={() => handleSeatClick(seatId)} className={`h-8 w-8 rounded border border-primary/60 cursor-pointer ${selectedSeats.includes(seatId) && "bg-primary text-white"}`}>
              {seatId}
            </button>
          )
        })}
      </div>
    </div>
  )
    

  useEffect(()=>{
    getShow()
  },[])

  return show ? (
    <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-[120px] md:pt-[200px]'>
      {/*Available Screenings*/}
      <div className='w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30'>
        <p className='text-lg font-semibold px-6'>Available Screenings</p>
        <div className='mt-5 space-y-1'>
          {show.dateTime[date].map((item) => (
            <div key={item.time} onClick={()=>setSelectedTime(item)} className={`${selectedTime?.time === item.time ? "bg-primary text-white" : "hover:bg-primary/20"} flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition`}>
              <ClockIcon className='w-4 h-4'/>
              <p className='text-sm'>{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/*Seats Layout*/}
      <div className='relative flex-1 flex flex-col items-center max-md:mt-16'>
          <h1 className='text-2xl font-semibold mb-4'>Select your seat</h1>
          <img src={assets.screenImage}/>
          <p className='text-[#797b7dff] text-sm mb-6'>SCREEN SIDE</p>

          <div className='flex flex-col items-center mt-10 text-xs text-[#8a8b8c]'>
            <div>
              {rowGroups[0].map(row => renderSeats(row))}
            </div>
          </div>
      </div>

    </div>
  ) : (
    <Loading/>
  )
}

export default SeatLayout
