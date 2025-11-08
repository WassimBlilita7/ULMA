import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart({ colors }) {
  const data = {
    labels: ['Books', 'Students', 'Borrowings'],
    datasets: [
      {
        label: 'Library Stats',
        data: [120, 80, 45],
        backgroundColor: [colors.primary, colors.secondary, colors.accent],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Library Overview',
        color: colors.primary,
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        grid: { color: colors.background },
        ticks: { color: colors.text },
      },
      y: {
        grid: { color: colors.background },
        ticks: { color: colors.text },
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export default BarChart;