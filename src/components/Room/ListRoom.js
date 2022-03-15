import React, {useContext, useEffect, useRef, useState} from 'react'
import '../../css/ListRoom.css';
import { Button } from "@material-ui/core";
import Room from "./Room";
import API, { endpoints } from '../Config/Api'
import Pagination from '../Pagination/index'
import queryString from 'query-string'

function ListRoom() {

    const [listRoom, setListRoom] = useState([]);
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

    useEffect(() => {
        const paramsString = queryString.stringify(filters)
        const requestUrl = `houses/?${paramsString}`
        API.get(requestUrl).then((response)=> {
            console.log(response.data.results)
            console.log(typeof (response.data.results))
            setListRoom(response.data.results);
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
        console.log(listRoom)
    },[filters])

    return (
        <div className='listRoom'>
            <div className='listRoom__info'>
                <p>62 stays · 26 august to 30 august · 2 guest</p>
                <h1>Danh sách phòng cho thuê</h1>
                <Button variant="outlined">Cho phép hủy</Button>
                <Button variant="outlined">Nơi ở</Button>
                <Button variant="outlined">Giá</Button>
                <Button variant="outlined">Phòng và gường</Button>
                <Button variant="outlined">More filters</Button>
            </div>
            {listRoom.map((house) => (
                <Room
                    id={house.id}
                    img={house.image}
                    location="Private room"
                    title={house.name}
                    description="1 guest · 1 bedroom · 1 bed · 1.5 shared bthrooms · Wifi · Kitchen · Free parking · Washing Machine"
                    star={4.73}
                    price={`${house.price} / đêm`}
                    total="$117 total"
                />
            ))}

            <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
                />   
        </div>
    )
}

export default ListRoom
