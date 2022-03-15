import React, {useContext, useEffect, useRef, useState} from 'react'
// import {useHistory} from 'react-router'
// import {Link} from 'react-router-dom'
// import {LoginContext} from '../../context/LoginContext'
// import Api from '../Config/Api'
// import logo from './image/logo.png'

function Search() {
    return (
		<div id="fh5co-search-map">
			<div className="search-property">
				<div className="s-holder">
					<h2>Search House</h2>
					<div className="row">
						<div className="col-xxs-12 col-xs-12">
							<div className="input-field">
								<label htmlFor="from">Keyword:</label>
								<input type="text" className="form-control" id="from-place" placeholder="Any"/>
							</div>
						</div>
						<div className="col-xxs-12 col-xs-12">
							<section>
								<label htmlFor="className">Property Status:</label>
								<select className="cs-select cs-skin-border">
									<option value="" disabled selected>Any</option>
									<option value="1">Rent</option>
									<option value="2">Sale</option>
								</select>
							</section>
						</div>
						<div className="col-xxs-12 col-xs-12">
							<section>
								<label htmlFor="className">Property Type:</label>
								<select className="cs-select cs-skin-border input-half">
									<option value="" disabled selected>Any</option>
									<option value="1">Building</option>
									<option value="2">Office</option>
								</select>
							</section>
						</div>
						<div className="col-xxs-12 col-xs-12">
							<div className="input-field">
								<label htmlFor="from">Location:</label>
								<input type="text" className="form-control" id="from-place" placeholder="Any"/>
							</div>
						</div>
						<div className="col-xxs-12 col-xs-12">
							<section>
								<label htmlFor="className">Price:</label>
								<div className="wide">
									<select className="cs-select cs-select-half cs-skin-border input-half">
										<option value="" disabled selected>Any</option>
										<option value="1">Building</option>
										<option value="2">Office</option>
									</select>
									<select className="cs-select cs-select-half cs-skin-border input-half">
										<option value="" disabled selected>Any</option>
										<option value="1">Building</option>
										<option value="2">Office</option>
									</select>
								</div>
							</section>
						</div>
						<div className="col-xxs-12 col-xs-12">
							<section>
								<label htmlFor="className">Bedrooms:</label>
								
								<div className="wide">
									<select className="cs-select cs-select-half cs-skin-border input-half">
										<option value="" disabled selected>Any</option>
										<option value="1">Building</option>
										<option value="2">Office</option>
									</select>
									<select className="cs-select cs-select-half cs-skin-border input-half">
										<option value="" disabled selected>Any</option>
										<option value="1">Building</option>
										<option value="2">Office</option>
									</select>
								</div>
							</section>
						</div>
						<div className="col-xxs-12 col-xs-12">
							<section>
								<label htmlFor="className">Bathrooms:</label>
								<div className="wide">
									<select className="cs-select cs-select-half cs-skin-border input-half">
										<option value="" disabled selected>Any</option>
										<option value="1">Building</option>
										<option value="2">Office</option>
									</select>
									<select className="cs-select cs-select-half cs-skin-border input-half">
										<option value="" disabled selected>Any</option>
										<option value="1">Building</option>
										<option value="2">Office</option>
									</select>
								</div>
							</section>
						</div>
						<div className="col-xxs-12 col-xs-12">
							<section>
								<label htmlFor="className">Area:</label>
								<div className="wide">
									<select className="cs-select cs-select-half cs-skin-border input-half">
										<option value="" disabled selected>Any</option>
										<option value="1">Building</option>
										<option value="2">Office</option>
									</select>
									<select className="cs-select cs-select-half cs-skin-border input-half">
										<option value="" disabled selected>Any</option>
										<option value="1">Building</option>
										<option value="2">Office</option>
									</select>
								</div>
							</section>
						</div>
						<div className="col-xxs-12 col-xs-12">
							<section>
								<label htmlFor="className">Parking spots:</label>
								<div className="wide">
									<select className="cs-select cs-select-half cs-skin-border input-half">
										<option value="" disabled selected>Any</option>
										<option value="1">Building</option>
										<option value="2">Office</option>
									</select>
									<select className="cs-select cs-select-half cs-skin-border input-half">
										<option value="" disabled selected>Any</option>
										<option value="1">Building</option>
										<option value="2">Office</option>
									</select>
								</div>
							</section>
						</div>
						<div className="col-xxs-12 col-xs-12 text-center">
							<p><a className="btn btn-primary btn-lg" href="#">Search</a></p>
						</div>
					</div>
				</div>
			</div>
			<div className="map" style={{backgroundImage : `url(${process.env.PUBLIC_URL + "images/cover_bg_12.jpg"})`}}>
			</div>
		</div>
    )
}

export default Search