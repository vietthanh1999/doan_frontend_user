import React, {useContext, useEffect, useRef, useState} from 'react'
import '../../css/Home.css';
import Banner from '../Banner/Banner'
import Card from '../Card/Card'
import API from '../Config/Api'
import Pagination from '../Pagination/index'
import queryString from 'query-string'


function Home() {
    const [listPopular , setlistPopular] = useState([]);
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
            API.get('houses/').then((response)=> {
                setlistPopular(response.data.results);
                if (response.data.previous === null) {
                    pageIndex = 1
                }
                else if(response.data.previous.split("=").length === 1) {
                    pageIndex = 2
                } else  {
                    pageIndex = response.data.previous.split("=")[1] - 0 + 1
                    console.log(response.data.previous.split("="))
                }
                setPagination({
                    page: pageIndex,
                    totalPages: Math.round(response.data.count / 10)
                })
            }).catch((error) =>{
            })
    },[])

    return (
        <div className='home'>
            <Banner />

            <div className='home__section'>
            <Card
                src="https://a0.muscache.com/im/pictures/eb9c7c6a-ee33-414a-b1ba-14e8860d59b3.jpg?im_w=720"
                title="Online Experiences"
                description="Những điều nên trải nghiệm trong chuyến đi của bạn"
            />
            <Card
                src="https://a0.muscache.com/im/pictures/15159c9c-9cf1-400e-b809-4e13f286fa38.jpg?im_w=720"
                title="Unique stays"
                description="Bạn có thắc mắc về việc đón tiếp khách?"
            />
            <Card
                src="https://a0.muscache.com/im/pictures/fdb46962-10c1-45fc-a228-d0b055411448.jpg?im_w=720"
                title="Entire homes"
                description="Những điều nên trải nghiệm tại nhà"
            />
            </div>
            <div className='home__section'>
            {listPopular.map((house, index) => (
                <Card key={index}
                    id={house.id}
                    src={`${house.image}?im_w=720`}
                    title={house.name}
                    description={house.description}
                    price={`${house.price}/đêm`}
                />
            ))}
            </div>
            <Pagination
                    pagination={pagination}
                    onPageChange={handlePageChange}
                />  
        </div>
    )
}

export default Home