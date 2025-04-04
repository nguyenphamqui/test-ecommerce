"use client"

import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface CategoryChartProps {
  data: {
    category: string
    sales: number
  }[]
}

export function CategoryChart({ data }: CategoryChartProps) {
  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        label: "Sales",
        data: data.map((item) => item.sales),
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

  return <Bar data={chartData} options={options} height={300} />
}

