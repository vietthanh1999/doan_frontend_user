import React, {useContext, useEffect, useRef, useState} from 'react'
// import {useHistory} from 'react-router'
import {Link} from 'react-router-dom'
// import {LoginContext} from '../../context/LoginContext'
import API, { AuthAPI } from '../Config/Api'

function Popular() {
	const [listPopular , setlistPopular] = useState([]);

    useEffect(() => {
            API.get('houses/').then((response)=> {
				console.log(response.data.results)
				console.log(typeof (response.data.results))
                setlistPopular(response.data.results);
            }).catch((error) =>{
            })
			console.log(listPopular)
    },[])
	
    return (

	<section className="ftco-section bg-light">
    	<div className="container">
				<div className="row justify-content-center mb-5 pb-3">
          <div className="col-md-7 heading-section text-center ftco-animate fadeInUp ftco-animated">
            <h2 className="mb-4">Our Rooms</h2>
          </div>
        </div>    		
    		<div className="row">
			{listPopular.map((house) => (
    			<div className="col-sm col-md-6 col-lg-4 ftco-animate fadeInUp ftco-animated"  key={house}>
    				<div className="room">
    					<a href="rooms.html" className="img d-flex justify-content-center align-items-center" style={{backgroundImage : `url(${house.image})`}}>
    						<div className="icon d-flex justify-content-center align-items-center">
    							<span className="icon-search2"></span>
    						</div>
    					</a>
    					<div className="text p-3 text-center">
    						<h3 className="mb-3"><a href="rooms.html">{house.name}</a></h3>
    						<p><span className="price mr-2">${house.price}</span> <span className="per">/ đêm</span></p>
    						<hr/>
    						<p className="pt-1"><Link to={`/room-detail/${house.id}`} className="btn-custom">View Room Details <span className="icon-long-arrow-right"></span></Link></p>
    					</div>
    				</div>
    			</div>
			))}
    		</div>
    	</div>
    </section>
    )
}

export default Popular