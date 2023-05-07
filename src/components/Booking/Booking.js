import './Booking.css'
import React,{useState,useEffect} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { getMovie } from '../../api/movie';
import { getAllTheatres,getTheatreById } from '../../api/theatre';
import Navbar from '../Navbar/Navbar';
import Payment from '../Payment/Payment'
import clsx from 'clsx';
const seats=Array.from({length:8*8},(_,i)=>i);
const Booking=()=>{
    const {movieid:movieId}=useParams();
    const {theatreid:theatreId}=useParams();
    const [pageLoaded,setPageLoading]=useState(false);
    const [selectedMovieId,setSelectedMovieId]=useState(movieId);
    const [selectedTheatreId,setSelectedTheatreId]=useState(theatreId);
    const [selectedMovie,setSelectedMovie]=useState({});
    const [selectedTheatre,setSelectedTheatre]=useState({});
    const [selectedSeats,setSelectedSeats]=useState([]);
    const [occupiedSeats,setOccupiedSeats]=useState([10,12,50,33,28,47]);
    const [moviePrice,setMoviePrice]=useState(150)
    const navigate=useNavigate();
    const init=async()=>{
        try{
            await getAllTheatres();
        }catch(error){
            navigate('/login')
        }
        const response=await getMovie(selectedMovieId);
        setSelectedMovie(response.data);
        const theatreResponse=await getTheatreById(selectedTheatreId);
        setSelectedTheatre(theatreResponse.data);
        setPageLoading(true)
    }
    useEffect(()=>{
        init();
    },[])
    const render=()=>{
        return(
        <>
           <div className="App bg-black backg">
           <h2 className="fw-bold text-light">{selectedMovie.name}</h2>
           <ShowCase/>
           <Cinema
              movie={selectedMovie}
              selectedSeats={selectedSeats}
              occupiedSeats={occupiedSeats}
              onSelectedSeatsChange={selectedSeats=>setSelectedSeats(selectedSeats)}
           />
           <p className="info">
             You have selected <span className="count">{selectedSeats.length}</span>{''}
             seats for the price of {''}
             <span className="total">
                ${selectedSeats.length * moviePrice}
             </span>
            </p>
            <Payment
                noOfSeats={selectedSeats.length}
                movie={selectedMovie}
                theatre={selectedTheatre}
            />
            </div>
        </>
    )
}
  return(
    <>
       <Navbar/>
       <div className='App bg-black backg'>
          {
            pageLoaded?render():"Loading data..."
          }
       </div>
    </>
  )
    
}
function Cinema({movie,selectedSeats,onSelectedSeatsChange,occupiedSeats}){
    function handleSelectedState(seat){
        const isSelected=selectedSeats.includes(seat);
        if(isSelected)
        {
            onSelectedSeatsChange(
                selectedSeats.filter(selectedSeat=> selectedSeat!== seat),
            )            
        }
        else
        {
            onSelectedSeatsChange([...selectedSeats,seat])
        }
    }
    return(
        <div className="Cinema">
            <div className="screen"/>
            <div className="seats">
                {seats.map(seat=>{
                    const isSelected= selectedSeats.includes(seat)
                    const isOccupied=occupiedSeats.includes(seat)
                    return(
                        <span 
                           tabIndex="0"
                           key={seat}
                           className={clsx(
                               'seat',
                               isSelected && 'selected',
                               isOccupied && 'occupied',
                           )}
                          onClick={isOccupied?null:()=>handleSelectedState(seat)}
                          onKeyPress={
                             isOccupied? null :e=>{
                                if(e.key==='Enter'){
                                    handleSelectedState(seat)
                                }
                             }
                          } 
                        />  
                    )
                })}
            </div>
        </div>
    )
}
function ShowCase(){
    return(
        <ul className="ShowCase">
            <li>
                <span className="seat"/><small>Available</small>
            </li>
            <li>
                <span className="seat selected"/><small>Selected</small>
            </li>
            <li>
                <span className="seat occupied"/><small>Occcupied</small>
            </li>
        </ul>
    )
}
export default Booking