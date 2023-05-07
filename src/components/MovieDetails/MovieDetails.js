import React,{useState,useEffect} from 'react'
import { useParams,Link } from 'react-router-dom'
import ReactPlayer from 'react-player'
import {getMovie} from '../../api/movie'
import Navbar from '../Navbar/Navbar'
import './MovieDetails.css'
import {getAllTheatres} from '../../api/theatre'
const MovieDetails=()=>{
    const {movieid:id}=useParams();
    const [selectedMovie,setSelectedMovie]=useState(id);
    const [isLoggedin,setisLoggedin]=useState(false);
    const [MovieDetails,setMovieDetails]=useState({});
    const [releaseStatus,setMovieReleaseStatus]=useState(false);
    const [movieCast,setMovieCast]=useState([])
    const init=async()=>{
        try{
            const results=await getAllTheatres();
            if(results)
            {
                setisLoggedin(true)
            }
        }
        catch(error)
        {
            setisLoggedin(false)
        }
        const response=await getMovie(selectedMovie);
        setMovieDetails(response.data);
        setMovieReleaseStatus(response.data.releaseStatus === "RELEASED")
        setMovieCast(response.data.casts)
    }
    useEffect(()=>{
        init();
    },[]);
    const render=()=>{
        return (
            <>
               <Navbar/>
               <div className='bg-light'>
                <div className='box bg-black backg'>
                    <ReactPlayer url={MovieDetails.trailerUrl} controls={true} className="video" width="67%" height="99%"/>
                </div>
                <div className='container my-4 justify-content-center'>
                    <div className='row'>
                        <div className='col'>
                            <img src={MovieDetails.posterUrl} className='card' width={300} height={450} alt="..."/>
                        </div>
                        <div className='col'>
                            <h2 className='fw-bolder'>About the Movie</h2>
                            <div className='d-flex'>
                                <span className='badge rounded-pill text-bg-danger m-1'>{MovieDetails.description}</span>
                                <span className='dot my-auto'></span>
                                <span className='badge rounded-pill text-bg-secondary m-1'>{MovieDetails.language}</span>
                                <span className='dot my-auto'></span>
                                <span className='badge rounded-pill text-bg-secondary m-1'>{MovieDetails.releaseStatus}</span>
                            </div>
                            <hr/>
                            <h3>{MovieDetails.name}</h3>
                            <h6>{MovieDetails.director}</h6>
                            <h6>{MovieDetails.releaseDate}</h6>
                            <hr/>
                            <h5>Cast</h5>
                            {movieCast.map(name=><li key={name} className='list-group-item'>{name}</li>)}
                            <div className='text-center my-3' style={{display:isLoggedin ?"block":'none'}}>
                            <Link key={selectedMovie} className='text-decoration-none btn btn-lg btn-danger text-center' to={releaseStatus?`/buytickets/${MovieDetails.name}/${selectedMovie}`:`#`}>
                                {releaseStatus?"BOOK TICKET":"COMMING SOON"}
                            </Link>
                            </div>   
                            <br/>
                        </div>
                      </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        render()
    )
}
export default MovieDetails;