import React from 'react'
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'


const BarChart = ({ income=[] }) => {
  let label_list = [], data_list = []
  for (let i = 0; i < income.length; i++) {
    label_list.push(income[i].month)
    data_list.push(income[i].income)
    console.log(income)
  }
  console.log("fffffff")

  const state = {
    labels: label_list,
    datasets: [
      {
        label: 'Thu nhập ($)',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: data_list
      }
    ]
  }
  
  return (
    <div>
        <Bar
          data={state}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
    </div>
  )
}

export default BarChart