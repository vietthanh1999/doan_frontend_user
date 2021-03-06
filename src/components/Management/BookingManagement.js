import React, {useContext, useEffect, useRef, useState} from 'react'
import '../../css/Management.css';
import { Button } from "@material-ui/core";
import Menu from './Menu';
import API from '../Config/Api'
import cookie from 'react-cookies';
import { hoursToSeconds } from 'date-fns';
import { BiPlus } from "react-icons/bi";
import {Link} from 'react-router-dom'
import moment from "moment";
import Pagination from '../Pagination/index'
import queryString from 'query-string'

function BookingManagement() {

    const [listHouse , setListHouse] = useState([]);
    const [totalHouse , setTotalHouse] = useState(0);
    let user_id = cookie.load("user").id
    let pageIndex = 1
    const [pagination, setPagination] = useState({
        page: 0,
        limit: 5,
        totalPages: 1
    })
    const [filters, setFilters] = useState({
        page: 1,
    })
    function handlePageChange(newPage) { 
        setFilters({
            page: newPage
        })
    }

    let  token = { 
        headers: {
            "Authorization": `Bearer ${cookie.load("access_token")}`} 
    }

    useEffect(() => {
        const paramsString = queryString.stringify(filters)
        const requestUrl = `/host/booking-management/?${paramsString}`
        API.get(requestUrl, {
            headers: {
              "Authorization": `Bearer ${cookie.load("access_token")}`
            }
          }).then((response)=> {
            setListHouse(response.data.results);
            setTotalHouse(response.data.results.length)
            if (response.data.previous === null) {
                pageIndex = 1
            }
            else if(response.data.previous.split("=").length === 1) {
                pageIndex = 2
            } else  {
                pageIndex = response.data.previous.split("=")[1] - 0 + 1
            }
            setPagination({
                page: pageIndex,
                totalPages: Math.round(response.data.count / 10)
            })
        }).catch((error) =>{
        })
        console.log(listHouse)
    },[filters])

    const deleteRent = (id) => {
        let res = API.delete(`host/booking-management/${id}`, token).then((response) => {
            console.log(response.data)      
        }).catch((error) => {

        });
    }

    const browserHouse = (id, index) => {

        try {
            let formData = new FormData()

            formData.append("status", !listHouse[index].status)

            let res = API.put(`host/booking-management/${id}`, formData, token).then((response) => {
                console.log(response.data)
            }).catch((error) => {
    
            });
        } catch(err) {
            console.error(err)
        }
    }



    return (
        <div className='managePage'>
            <Menu/>
            <div className='managePage__info'>
                <p>?????t ph??ng/?????t ch??? c???a b???n</p> 
                <Button variant="outlined">Hi???n ??ang ????n ti???p</Button>
                <Button variant="outlined">S???p ?????n</Button>
                <Button variant="outlined">S???p tr??? ph??ng</Button>
                <Button variant="outlined">C??c b??? l???c kh??c</Button>

            </div>

            <div className="managePage__table">
                <table className="table table-fixed">
                    <thead>
                    <tr>
                        <th className="col-xs-3">NH??/PH??NG CHO THU??</th>
                        {/* <th className="col-xs-3">VI???C C???N L??M</th> */}
                        <th className="col-xs-3">NG??Y NH???N PH??NG</th>
                        <th className="col-xs-3">NG??Y TR??? PH??NG</th>
                        <th className="col-xs-3">T???NG TI???N</th>
                        <th className="col-xs-3">NG??Y ?????T</th>
                        <th className="col-xs-3">TR???NG TH??I</th>
                        <th className="col-xs-3">THAO T??C</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listHouse.map((house, index) => (
                        <tr className='row-data' key={house.id}>
                            <td className="col-xs-3 lrh__image-house"><img src={house.house_id.image}/>{house.house_id.name}</td>   
                            {/* <td className="col-xs-3"><Link to={`/update-house/${house.id}`} className='rhm__btn-update'>C???p nh???t</Link></td> */}
                            <td className="col-xs-3">{house.check_in_date}</td>
                            <td className="col-xs-3">{house.check_out_date}</td>
                            <td className="col-xs-3">{house.totalPrice}</td>
                            <td className="col-xs-3">{moment(house.created_date).format("YYYY/MM/DD - HH:mm")}</td>
                            <td className="col-xs-3">{house.status ? "???? duy???t" : "Ch??? duy???t"}</td>
                            <td className="col-xs-3">{(!house.status) ? (<><button className='rhm__btn-update' onClick={() => deleteRent(house.id)} >X??a</button> <button className='rhm__btn-update' onClick={() => browserHouse(house.id, index)} >Duy???t</button></>) : (<></>)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
                <Pagination
                    pagination={pagination}
                    onPageChange={handlePageChange}
                />  
        </div>
    )
}

export default BookingManagement
