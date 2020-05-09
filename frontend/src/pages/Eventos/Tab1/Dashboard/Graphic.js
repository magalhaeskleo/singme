import React, { useState } from 'react';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';

export default function Graphic({
  title,
  legend,
  labelsList,
  dataList,
  backgroundColorslist,
  type,
}) {
  const data = {
    labels: labelsList,
    datasets: [
      {
        label: legend,
        data: dataList,
        backgroundColor: backgroundColorslist,
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [
        {
          gridLines: {
            color: '#fff',
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            color: '#fff',
          },
        },
      ],
    },

    title: {
      display: true,
      text: title,
      fontSize: 20,
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: true,
      position: 'average',
      mode: 'nearest',
    },

    maintainAspectRatio: false,
  };
  return (
    <div style={{ height: 200 }}>
      {type === 'Line' && <Line data={data} options={options} />}
      {type === 'Bar' && <Bar data={data} options={options} />}
      {type === 'Pie' && <Pie data={data} options={options} />}
      {type === 'Doughnut' && <Doughnut data={data} options={options} />}
    </div>
  );
}
