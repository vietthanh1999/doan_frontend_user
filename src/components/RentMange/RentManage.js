import React, {useContext, useEffect, useRef, useState} from 'react'
import '../../css/ListRoom.css';
import { Button } from "@material-ui/core";
import RentManageDetail from "./RentManageDetail";
import API, { endpoints } from '../Config/Api';
import cookie from 'react-cookies';
import Pagination from '../Pagination/index'
import queryString from 'query-string'

function RentManage() {

    const [listRentManage, setListRentManage] = useState([]);
    let pageIndex = 1
    const [pagination, setPagination] = useState({
        page: 0,
        limit: 5,
        totalPages: 1
    })
    const [filters, setFilters] = useState({
        page: 1,
    })

    useEffect(() => {   
        const paramsString = queryString.stringify(filters)
        const requestUrl = `rental-house-management-list/?${paramsString}`
        API.get(requestUrl, {
            headers: {
              "Authorization": `Bearer ${cookie.load("access_token")}`
            }
          }).then((response)=> {
            setListRentManage(response.data.results);
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
        console.log(listRentManage)
    }, [filters])

    function handlePageChange(newPage) { 
        setFilters({
            page: newPage
        })
    }

    return (
        <div className='listRoom'>
            <div className='listRoom__info'>
                <h1>Chuyến đi của bạn</h1>
                <Button variant="outlined">Phòng và phòng ngủ</Button>
                <Button variant="outlined">Tiện nghi</Button>
                <Button variant="outlined">Tình trạng nhà/phòng cho thuê</Button>
                <Button variant="outlined">Các bộ lộc khác</Button>
                <Button variant="outlined">More filters</Button>
            </div>
            {listRentManage.map((r, index) => (
                <RentManageDetail key={index}
                    id={r.id}
                    img={r.house_id.image && r.house_id.image}
                    location={r.house_id.address}
                    title={r.house_id.name}
                    user_name={`Người thuê: ${r.created_by.first_name} ${r.created_by.last_name}`}
                    description={`Ngày nhận: ${r.check_in_date} Ngày trả: ${r.check_out_date}`}
                    star={4.73}
                    price={`${r.house_id.price} / đêm`}
                    total={r.totalPrice}
                    status={r.status}
                />
            ))}

            <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
                />       
        </div>
    )
}

export default RentManage