"use client"

import { useState } from "react"

export function DashboardHeader() {
  const [timeRange, setTimeRange] = useState("7days")

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Welcome back, Admin</p>
      </div>
      <div className="mt-4 md:mt-0">
        <select
          className="border rounded-md px-3 py-2 bg-background"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="7days">Last 7 days</option>
          <option value="30days">Last 30 days</option>
          <option value="3months">Last 3 months</option>
          <option value="year">Last year</option>
        </select>
      </div>
    </div>
  )
}

