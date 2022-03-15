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
import BarChart from './BarChart';
import DoughnutChart from './DoughnutChart';


function IncomeStatistics() {

    const [listIncome, setListIncome] = useState([]);

    let  token = { 
        headers: {
            "Authorization": `Bearer ${cookie.load("access_token")}`} 
    }

    useEffect(() => {
        const requestUrl = `host/income-statistics`
        API.get(requestUrl, {
            headers: {
              "Authorization": `Bearer ${cookie.load("access_token")}`
            }
          }).then((response)=> {
            setListIncome(response.data.results);
        }).catch((error) =>{
        })
    },[])

    return (
        <div className='managePage'>
            <Menu/>
            <div className='managePage__info'>
                <p>Thống kê thu nhập</p> 
            </div>

            <div className="managePage__chart">
                <div className="managePage__chartDoughnut">
                    <DoughnutChart/>
                    <p className='titleChart'>Biểu đồ thống kê thuê nhà</p>
                </div>
                <div className="managePage__chartBar">
                    <BarChart income={listIncome}/>
                    <p className='titleChart'>Biểu đồ thống kê thu nhập theo tháng</p>
                </div>
            </div>
            
        </div>
    )
}

export default IncomeStatistics
