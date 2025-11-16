import {
  Bar,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"
import { type HourlyRain } from "@/types/weather"
import "./RainChart.scss"

interface RainChartProps {
  data: HourlyRain[]
}

export default function RainChart({ data }: RainChartProps) {
  return (
    <div className="rain-chart">
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            tickFormatter={(t) => {
              const date = new Date(t)
              return `${date.getHours()}:00`
            }}
          />
          <YAxis
            yAxisId="left"
            label={{ value: "Rain (mm)", angle: -90, position: "insideLeft" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ value: "Probability (%)", angle: 90, position: "insideRight" }}
            domain={[0, 100]}
          />
          <Tooltip
            formatter={(value: number, name: string) => {
              if (name === "Rain (mm)") {
                return [`${value.toFixed(2)} mm`, name]
              }
              if (name === "Probability (%)") {
                return [`${value.toFixed(1)}%`, name]
              }
              return [value, name]
            }}
            labelFormatter={(label) => {
              const date = new Date(label)
              return date.toLocaleString()
            }}
          />
          <Legend />
          {/* Rain amount - Bar */}
          <Bar
            yAxisId="left"
            dataKey="accumulation"
            name="Rain (mm)"
            fill="#3b82f6"
          />
          {/* Rain probability - Line */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="probability"
            name="Probability (%)"
            stroke="#ef4444"
            strokeWidth={2}
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

