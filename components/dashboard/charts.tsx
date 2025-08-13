"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Bar, Line, Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js"

// Enregistrer les composants ChartJS
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

interface ChartData {
  name: string
  value: number
}

interface DateChartData {
  date: string
  value: number
}

export function LineChart({ data }: { data: DateChartData[] }) {
  const { theme } = useTheme()
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        borderColor: "",
        backgroundColor: "",
      },
    ],
  })
  const [chartOptions, setChartOptions] = useState<ChartOptions<"line">>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const isDark = theme === "dark"
    const textColor = isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)"
    const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"

    setChartData({
      labels: data.map((item) => item.date),
      datasets: [
        {
          label: "Visiteurs",
          data: data.map((item) => item.value),
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.5)",
          tension: 0.3,
          fill: true,
        },
      ],
    })

    setChartOptions({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
      scales: {
        x: {
          grid: {
            color: gridColor,
          },
          ticks: {
            color: textColor,
          },
        },
        y: {
          grid: {
            color: gridColor,
          },
          ticks: {
            color: textColor,
          },
          beginAtZero: true,
        },
      },
    })
  }, [data, theme, mounted])

  if (!mounted) return null

  return (
    <div className="h-[300px]">
      <Line data={chartData} options={chartOptions} />
    </div>
  )
}

export function BarChart({ data }: { data: ChartData[] }) {
  const { theme } = useTheme()
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  })
  const [chartOptions, setChartOptions] = useState<ChartOptions<"bar">>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const isDark = theme === "dark"
    const textColor = isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)"
    const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"

    setChartData({
      labels: data.map((item) => item.name),
      datasets: [
        {
          label: "Vues",
          data: data.map((item) => item.value),
          backgroundColor: "rgba(59, 130, 246, 0.7)",
          borderRadius: 4,
        },
      ],
    })

    setChartOptions({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: textColor,
          },
        },
        y: {
          grid: {
            color: gridColor,
          },
          ticks: {
            color: textColor,
          },
          beginAtZero: true,
        },
      },
    })
  }, [data, theme, mounted])

  if (!mounted) return null

  return (
    <div className="h-[300px]">
      <Bar data={chartData} options={chartOptions} />
    </div>
  )
}

export function PieChart({ data }: { data: ChartData[] }) {
  const { theme } = useTheme()
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderColor: [],
      },
    ],
  })
  const [chartOptions, setChartOptions] = useState<ChartOptions<"pie">>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const isDark = theme === "dark"
    const textColor = isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)"

    // Générer des couleurs pour chaque segment
    const colors = [
      "rgba(59, 130, 246, 0.7)",
      "rgba(16, 185, 129, 0.7)",
      "rgba(245, 158, 11, 0.7)",
      "rgba(239, 68, 68, 0.7)",
      "rgba(139, 92, 246, 0.7)",
      "rgba(236, 72, 153, 0.7)",
    ]

    setChartData({
      labels: data.map((item) => item.name),
      datasets: [
        {
          data: data.map((item) => item.value),
          backgroundColor: data.map((_, index) => colors[index % colors.length]),
          borderColor: isDark ? "rgba(30, 41, 59, 1)" : "white",
          borderWidth: 2,
        },
      ],
    })

    setChartOptions({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "right",
          labels: {
            color: textColor,
            padding: 20,
            font: {
              size: 12,
            },
          },
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label || ""
              const value = context.raw as number
              return `${label}: ${value}%`
            },
          },
        },
      },
    })
  }, [data, theme, mounted])

  if (!mounted) return null

  return (
    <div className="h-[300px]">
      <Pie data={chartData} options={chartOptions} />
    </div>
  )
}
