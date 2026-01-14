import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const vibrantColors = [
    'rgba(102, 126, 234, 0.8)',  // Purple Blue
    'rgba(245, 87, 108, 0.8)',   // Pink Red
    'rgba(0, 242, 254, 0.8)',    // Cyan
    'rgba(250, 112, 154, 0.8)',  // Hot Pink
    'rgba(254, 225, 64, 0.8)',   // Yellow
    'rgba(118, 75, 162, 0.8)',   // Deep Purple
    'rgba(240, 147, 251, 0.8)',  // Light Pink
    'rgba(79, 172, 254, 0.8)',   // Sky Blue
    'rgba(156, 136, 255, 0.8)',  // Lavender
    'rgba(255, 159, 64, 0.8)',   // Orange
  ];

  const chartData = {
    labels: data.map(item => item.category),
    datasets: [
      {
        label: 'Amount Spent',
        data: data.map(item => item.total_amount),
        backgroundColor: vibrantColors.slice(0, data.length),
        borderColor: vibrantColors.slice(0, data.length).map(color => 
          color.replace('0.8', '1')
        ),
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#ffffff',
          padding: 15,
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(21, 27, 61, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(102, 126, 234, 0.5)',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: $${value.toFixed(2)} (${percentage}%)`;
          }
        }
      }
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
      easing: 'easeInOutQuart'
    }
  };

  return (
    <div className="chart-container">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
