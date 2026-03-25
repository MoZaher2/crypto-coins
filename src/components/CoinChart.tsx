import { useState, useEffect } from "react"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { fetchChartData } from "../api/cryptoApi"
export default function CoinChart({ id }: { id: string }) {
  const [chartData, setChartData] = useState([])
  useEffect(() => {
    fetchCoinChart()
  }, [id])

  const fetchCoinChart = async () => {
    try {
      const coinData = await fetchChartData(id!)
      const formattedData = coinData.prices.map((price: [number, number]) => ({
        time: new Date(price[0]).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        price: price[1].toFixed(2),
      }));

      setChartData(formattedData)

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="chart-section">
      <h3>Price Chart (7 Days)</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis dataKey="time" stroke='#9ca3af' style={{ fontSize: "12px" }} />
          <YAxis stroke='#9ca3af' domain={["dataMin", "dataMax"]} style={{ fontSize: "12px" }} />
          <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: '10px', color: '#e0e0e0' }} labelStyle={{ color: "#9ca3af" }} />
          <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
