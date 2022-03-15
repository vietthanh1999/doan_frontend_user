import './App.css';
import { 
  BrowserRouter, 
  Route, 
  Routes,
  Router,
  useNavigate
} from "react-router-dom";
import React, { useState } from 'react'
import Header from "./components/Template/Header"
import Footer from "./components/Template/Footer"
import Page from "./components/Page/Page"
import Slide from './components/Template/Slide';
import Newest from './components/Template/Newest';
import Room from './components/Room/Room';
import RoomDetail from './components/Room/RoomDetail';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import SearchPage from './components/Search/SearchPage';
import ListRoom from './components/Room/ListRoom';
import RentManage from './components/RentMange/RentManage';
import CommentList from './components/Comment/CommentList';
import RentalHouseMange from './components/Management/RentalHouseMange';
import 'bootstrap/dist/css/bootstrap.min.css';
import Account from './components/Account/Account';
import CreateHouse from './components/Management/House/CreateHouse';
import UpdateHouse from './components/Management/House/UpdateHouse';
import Messenger from './components/Messenger/Messenger';
import Register from './components/Login/Register';
import BookingManagement from './components/Management/BookingManagement';
import IncomeStatistics from './components/Management/IncomeStatistics';
import LayoutAdmin from './components/Admin/LayoutAdmin';

function App() {
  return (
    <BrowserRouter>
    <div className="app">
    <Header/>
        <Routes> 
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/search" element={<SearchPage/>} />
          <Route exact path="/list-room" element={<ListRoom/>} />
          <Route exact path="/room-detail/:id" element={<RoomDetail/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/rented-house" element={<RentManage/>} />
          <Route exact path="/comment" element={<CommentList/>} />
          <Route path="/room" element={<Room/>} />

          <Route path="/rental-house-manager" element={<RentalHouseMange/>} />
          <Route path="/booking-manager" element={<BookingManagement/>} />
          <Route path="/income-statistics" element={<IncomeStatistics/>} />

          <Route path="/account" element={<Account/>} />
          <Route path="/become-a-host" element={<CreateHouse/>} /> 
          <Route path="/update-house/:id" element={<UpdateHouse/>} /> 
          <Route path="/messenger" element={<Messenger/>} /> 

          <Route path="/admin/layout" element={<LayoutAdmin/>} /> 
        </Routes>
      {/* <Footer></Footer> */}
    </div>
  </BrowserRouter>
  );
}

export default App;
