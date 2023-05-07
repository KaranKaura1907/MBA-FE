import {getAllTheatres} from '../../api/theatre';
import {getMovie} from '../../api/movie';
import Navbar from '../Navbar/Navbar';
import { useParams,Link } from 'react-router-dom';
import { useEffect,useState } from 'react';
import "../Booking/Booking.css";
const MovieTheatres=()=>{
    const {movieid:movieId}=useParams();
    const [selectedMovieId,setSelectedMovieId]=useState(movieId);
    const [movieDetails,setMovieDetails]=useState({});
    const [theatreDetail,setTheatreDetails]=useState({});
    const [pageLoaded,setPageLoaded]=useState(false);
    const init=async ()=>{
       let response=await getAllTheatres();
       setTheatreDetails(response.data.filter((data)=>{
        return data.movies.includes(selectedMovieId)
       }))
       response=await getMovie(selectedMovieId);
       setMovieDetails(response.data);
       setPageLoaded(true);
    }
    useEffect(()=>{
        init();
    },[]);
    return(
        <div>
            <Navbar/>
            <div className='bg-light'>
                <div className='bg-black text-center py-3 backg'>
                    <h2 className='fw-bolder text-light'>{movieDetails.name}</h2>
                    <span className='badge rounded-pill text-bg-danger m-1'>{movieDetails.description}</span>
                                <span className='dot my-auto'></span>
                                <span className='badge rounded-pill text-bg-secondary m-1'>{movieDetails.language}</span>
                                <span className='dot my-auto'></span>
                                <span className='badge rounded-pill text-bg-secondary m-1'>{movieDetails.releaseStatus}</span>
                                <hr className='bg-light'/>
                                <h6 className='text-muted'>Director:{movieDetails.director}</h6>
                                <h6 className='text-muted'>Release Date:{movieDetails.releaseDate}</h6>
                </div>
                <div className='container my-3 vh-100'>
                    <h2 className='fw-bold text-dark text-center'>SELECT THEATRE</h2>
                    {pageLoaded?(
                        theatreDetail.map(
                            theatre=><li key={theatre.name} className='list-group-item'>
                                <div className='row'>
                                    <div className='col'>
                                        <Link key={theatre._id} to={`/movie/${selectedMovieId}/${theatre._id}`} className='fw-bold text-dark text-decoration-none p-2'>
                                            {theatre.name}
                                        </Link>
                                    </div>
                                    <div className='col'>
                                        <div className='p-2 text-success fw-bold'>
                                            <i class="bi bi-phone-fill text-success"></i>
                                            m-ticket
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className='p-2 text-danger fw-bold'>
                                            <i class="bi bi-cup-straw text-danger"></i>
                                            Food and Beverages
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                    ):""}
                </div>
            </div>
        </div>
    )
}
export default MovieTheatres;