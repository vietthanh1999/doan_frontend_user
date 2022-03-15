import React, {useContext, useEffect, useRef, useState} from 'react'
function Slide2() {
    return (
		<section className="ftco-booking">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<form action="#" className="booking-form">
						<div className="row">
							<div className="col-md-3 d-flex">
								<div className="form-group p-4 align-self-stretch d-flex align-items-end">
									<div className="wrap">
											<label htmlFor="#">Check-in Date</label>
											<input type="text" className="form-control checkin_date" placeholder="Check-in date"/>
										</div>
									</div>
							</div>
							<div className="col-md-3 d-flex">
								<div className="form-group p-4 align-self-stretch d-flex align-items-end">
									<div className="wrap">
											<label htmlFor="#">Check-out Date</label>
											<input type="text" className="form-control checkout_date" placeholder="Check-out date"/>
									</div>
									</div>
							</div>
							<div className="col-md d-flex">
								<div className="form-group p-4 align-self-stretch d-flex align-items-end">
									<div className="wrap">
											<label htmlFor="#">Room</label>
											<div className="form-field">
											<div className="select-wrap">
									<div className="icon"><span className="ion-ios-arrow-down"></span></div>
									<select name="" id="" className="form-control">
										<option value="">Suite</option>
										<option value="">Family Room</option>
										<option value="">Deluxe Room</option>
										<option value="">Classic Room</option>
										<option value="">Superior Room</option>
										<option value="">Luxury Room</option>
									</select>
									</div>
									</div>
								</div>
							</div>
							</div>
							<div className="col-md d-flex">
								<div className="form-group p-4 align-self-stretch d-flex align-items-end">
									<div className="wrap">
											<label htmlFor="#">Customer</label>
											<div className="form-field">
											<div className="select-wrap">
									<div className="icon"><span className="ion-ios-arrow-down"></span></div>
									<select name="" id="" className="form-control">
										<option value="">1 Adult</option>
										<option value="">2 Adult</option>
										<option value="">3 Adult</option>
										<option value="">4 Adult</option>
										<option value="">5 Adult</option>
										<option value="">6 Adult</option>
									</select>
									</div>
									</div>
								</div>
							</div>
							</div>
							<div className="col-md d-flex">
								<div className="form-group d-flex align-self-stretch">
								<input type="submit" value="Check Availability" className="btn btn-primary py-3 px-4 align-self-stretch"/>
							</div>
							</div>
						</div>
					</form>
					</div>
				</div>
			</div>
		</section>
    )
}

export default Slide2