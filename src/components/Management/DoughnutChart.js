import React from 'react'
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar, Doughnut } from 'react-chartjs-2'


const DoughnutChart = () => {
  
  return (
    <Doughnut
            data={{
            labels: [
                "nhà cho thuê giá rẻ HN",
                "Nhà AHA",
                "nhà mới đà nẵng",
                "Nhà cho thuê đà nẵng",
                "Còn lại",
            ],
            datasets: [
                {
                label: "Population (millions)",
                backgroundColor: [
                    "#3e95cd",
                    "#8e5ea2",
                    "#3cba9f",
                    "#e8c3b9",
                    "#c45850",
                    "#c56850"
                ],
                data: [30, 27, 13, 20, 10]
                }
            ]
            }}
            option={{
            title: {
                display: true,
                text: "Thống kê thu nhập"
            }
            }}
        />
  )
}

export default DoughnutChart