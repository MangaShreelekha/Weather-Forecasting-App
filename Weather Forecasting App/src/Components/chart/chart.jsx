import React from 'react';
import Chart from 'react-apexcharts';


const ChartWeather = (props) => {
 
  const data = {
    series: [
      {
        name: 'temp °C',
        data: props.datac.data,
      },
    ],
    options: {
      chart: {
        type: 'area',
        height: 'auto',
        parentHeightOffset: 0,
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      fill: {
        colors: ['#00204a'],
        type: 'gradient',
      },

      dataLabels: {
        enabled: true,
        textAnchor: 'middle',
        offsetY: -5,
        style: {
          fontSize: '12px',
          colors: ['#333', '#999'],
        },
        background: {
          enabled: false,
        },
      },
      stroke: {
        curve: 'smooth',
        colors: ['#00204a'],
        width: 2,
      },

      legend: {
        show: false,
      },
      grid: {
        show: true,
      },
      tooltip: {
        x: {
          show: false,
        },

        fixed: {
          enabled: true,
        },
      },
      xaxis: {
        type: 'numeric ',
        categories: props.datac.labels,
        crosshairs: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        show: true,
        max: Math.max(...props.datac.data),
        min: Math.min(...props.datac.data),
        labels: {
          offsetX: -20,
        },
      },
    },
  };
  return (
      <Chart options={data.options} series={data.series} type='area' height={450} />
  );
};

export default ChartWeather;