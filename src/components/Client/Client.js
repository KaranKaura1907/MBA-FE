import {CWidgetStatsC} from '@coreui/react';
import React,{useEffect, useState} from 'react';
import './Client.css';
import {getAllMovies} from '../../api/movie';
import { getAllTheatres } from '../../api/theatre';

const Client=()=>{
    let [theatres,setTheatres]=useState([]);
    let [movies,setMovies]=useState([]);
    const fetch=async()=>{
        let result= await getAllMovies();
        setMovies(result.data);
        result=await getAllTheatres();
        setTheatres(result.data)
    }
    useEffect(()=>{
        fetch()
    },[])
    return(
        <div className='container bg-light mt-2'>
            <h3 className='text-center'>Welcome,Client!</h3>
            <p className='text-center text-secondary'>Take a quick look at your stats below</p>
            <div className='row header'>
                <div className='col'>
                    <CWidgetStatsC
                     className='mb-3 text-danger'
                     icons={<i className='bi bi-people-fill text-danger'></i>}
                     color="dark"
                     inverse progress={{value:80}}
                     text="Number of Theatres"
                     title="Theatres"
                     value={theatres.length}
                    /> 
                </div>
                <div className='col'>
                    <CWidgetStatsC
                     className='mb-3 text-danger'
                     icons={<i className='bi bi-people-fill text-danger'></i>}
                     color="dark"
                     inverse progress={{value:80}}
                     text="Number of Movies"
                     title="Movies"
                     value={movies.length}
                    /> 
                </div>
            </div>
            <h2>Theatres</h2>
            <table className='w-100'>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>City</th>
                </tr>
                {theatres.map(theatre=>{
                    return(
                        <tr>
                            <td>{theatre.name}</td>
                            <td>{theatre.description}</td>
                            <td>{theatre.city}</td>
                        </tr>
                    )
                })}
            </table>
            <h2>Movies</h2>
            <table className='w-100'>
                <tr>
                    <th>Movie</th>
                    <th>Description</th>
                    <th>Director</th>
                </tr>
                {movies.map(movie=>{
                    return(
                        <tr>
                            <td>{movie.name}</td>
                            <td>{movie.description}</td>
                            <td>{movie.director}</td>
                        </tr>
                    )
                })
                }    
            </table>
        </div>
    )
}
export default Client;