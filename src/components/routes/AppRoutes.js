import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
import Login from '../Auth/Auth';
import Admin from '../Admin/Admin';
import Client from '../Client/Client';
import Booking from '../Booking/Booking';
import MovieDetails from '../MovieDetails/MovieDetails';
import MovieTheatres from'../MovieTheatres/MovieTheatres';
const AppRoutes=()=>{
    return(
        <Router>
            <Routes>
                <Route 
                  exact path='/'
                  element={<LandingPage/>}
                />  
                <Route
                  exact path='/login'
                  element={<Login/>}
                />
                <Route
                  exact path='/admin'
                  element={<Admin/>}
                /> 
                <Route
                  exact path="/client"
                  element={<Client/>}
                /> 
                <Route
                  exact path='/movie/:movieid/:theatreid'
                  element={<Booking/>}
                />
                <Route
                  exact path='/movie/:movieid/details'
                  element={<MovieDetails/>}
                />
                <Route
                  exact path='/buytickets/:moviename/:movieid'
                  element={<MovieTheatres/>}
                /> 
            </Routes>
        </Router>
    )
}
export default AppRoutes;