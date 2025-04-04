"use client"

import { Bar, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

export function LineChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Revenue",
        data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 25000, 30000, 35000, 40000, 50000],
        borderColor: "hsl(142, 76%, 36%)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => "$" + value,
        },
      },
    },
  }

  return <Line data={data} options={options} height={300} />
}

export function BarChart() {
  const data = {
    labels: ["Electronics", "Clothing", "Home & Garden", "Sports", "Beauty"],
    datasets: [
      {
        label: "Sales",
        data: [25000, 18000, 15000, 12000, 10000],
        backgroundColor: [
          "hsl(142, 76%, 36%)",
          "hsl(25, 95%, 53%)",
          "hsl(217, 91%, 60%)",
          "hsl(292, 91%, 73%)",
          "hsl(47, 95%, 53%)",
        ],
      },
    ],
  }

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => "$" + value,
        },
      },
    },
  }

  return <Bar data={data} options={options} height={300} />
}

