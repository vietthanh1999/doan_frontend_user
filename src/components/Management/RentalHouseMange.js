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

function RentalHouseMange() {

    const [listRentalHouse , setListRentalHouse] = useState([]);
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

    let  token = { 
        headers: {
            "Authorization": `Bearer ${cookie.load("access_token")}`} 
    }

    useEffect(() => {
        const paramsString = queryString.stringify(filters)
        const requestUrl = `host/rental-house-list/?${paramsString}`
        API.get(requestUrl, {
            headers: {
              "Authorization": `Bearer ${cookie.load("access_token")}`
            }
          }).then((response)=> {
            console.log(response.data.results)
            console.log(typeof (response.data.results))
            setListRentalHouse(response.data.results);
            setTotalHouse(response.data.count)
            if (response.data.previous === null) {
                pageIndex = 1
                console.log(pageIndex)
            }
            else if(response.data.previous.split("=").length === 1) {
                pageIndex = 2
                console.log(pageIndex)
            } else  {
                pageIndex = response.data.previous.split("=")[1] - 0 + 1
                console.log(response.data.previous.split("="))
                console.log(pageIndex)
            }
            setPagination({
                page: pageIndex,
                totalPages: Math.round(response.data.count / 10)
            })
        }).catch((error) =>{
        })
        console.log(listRentalHouse)
    },[filters])

    const deleteHouse = (id) => {
        let res = API.delete(`house-update/${id}`, token).then((response) => {
            console.log(response.data)      
        }).catch((error) => {

        });
    }

    function handlePageChange(newPage) { 
        setFilters({
            page: newPage
        })
    }

    return (
        <div className='managePage'>
            <Menu/>
            <div className='managePage__info'>
                <p>{totalHouse} nh??/ph??ng cho thu??</p> 
                <Button variant="outlined">Ph??ng v?? ph??ng ng???</Button>
                <Button variant="outlined">Ti???n nghi</Button>
                <Button variant="outlined">T??nh tr???ng nh??/ph??ng cho thu??</Button>
                <Button variant="outlined">C??c b??? l???c kh??c</Button>
                <Button variant="outlined">More filters</Button>

                <Link to='/become-a-host' className="createHouse"><BiPlus/>T???o m???c cho thu??</Link>
            </div>

            <div className="managePage__table">
                <table className="table table-fixed">
                    <thead>
                    <tr>
                        <th className="col-xs-3">NH??/PH??NG CHO THU??</th>
                        {/* <th className="col-xs-3">?????T NGAY</th> */}
                        <th className="col-xs-3">VI???C C???N L??M</th>
                        <th className="col-xs-3">KH??CH</th>
                        <th className="col-xs-3">PH??NG NG???</th>
                        <th className="col-xs-3">GI?????NG</th>
                        <th className="col-xs-3">PH??NG T???M</th>
                        <th className="col-xs-3">V??? TR??</th>
                        <th className="col-xs-3">S???A CH???A L???N CU???I</th>
                        <th className="col-xs-3">THAO T??C</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listRentalHouse.map((rentalHouse) => (
                        <tr className='row-data' key={rentalHouse.id}>
                            <td className="col-xs-3 lrh__image-house"><img src={rentalHouse.image}/>{rentalHouse.name}</td>   
                            {/* <td className="col-xs-3">{"B???t"}</td> */}
                            <td className="col-xs-3"><Link to={`/update-house/${rentalHouse.id}`} className='rhm__btn-update'>C???p nh???t</Link></td>
                            <td className="col-xs-3">{rentalHouse.guest}</td>
                            <td className="col-xs-3">{rentalHouse.bed_room}</td>
                            <td className="col-xs-3">{rentalHouse.bed}</td>
                            <td className="col-xs-3">{rentalHouse.bath_room}</td>
                            <td className="col-xs-3">{rentalHouse.address}</td>
                            <td className="col-xs-3">{moment(rentalHouse.updated_date).format("YYYY/MM/DD - HH:mm")}</td>
                            <td className="col-xs-3"><button className='rhm__btn-update' onClick={() => deleteHouse(rentalHouse.id)}>X??a</button></td>
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

export default RentalHouseMange
