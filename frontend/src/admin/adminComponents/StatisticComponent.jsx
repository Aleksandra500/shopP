import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registruj potrebne komponente za Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function StatisticComponent() {
  // State za korisnike, porudžbine i prihod
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch podaci iz API-ja
  useEffect(() => {
    fetch("http://localhost:8800/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data); // Postavljamo dobijene porudžbine u state
        setLoading(false); // Postavljamo loading na false kada su podaci učitani
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, []);

  const uniqueUsers = new Set(orders.map((order) => order.name));
  const totalUsers = uniqueUsers.size;
  // Izračunaj ukupnu vrednost porudžbina
  const totalRevenue = orders
    .reduce((acc, order) => acc + parseFloat(order.price), 0)
    .toFixed(2);

  // Pripremi podatke za grafikon
  const chartData = {
    labels: orders.map((order) => order.order_date), // Pretpostavljamo da "order_date" postoji u podacima
    datasets: [
      {
        label: "Revenue over Time",
        data: orders.map((order) => parseFloat(order.price)),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

 
  return (
    <div className="h-full  flex items-center justify-center bg-gray-100 p-10"> 
    {/* Ovo će omogućiti da sadržaj bude centriran sa paddingom na vrhu */}
    
    {/* Leva strana - Grafikon */}
    <div className="w-3/5 pr-6 mr-3">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Revenue Over Time</h3>
      <Line data={chartData} />
    </div>
  
    {/* Desna strana - Podaci */}
    <div className="w-2/5 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-5">Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 w-full">
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-lg font-semibold text-gray-600">Users</h2>
          <p className="text-4xl font-bold text-gray-800">{totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-lg font-semibold text-gray-600">Orders</h2>
          <p className="text-4xl font-bold text-gray-800">
            {loading ? "Loading..." : orders.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-lg font-semibold text-gray-600">Revenue</h2>
          <p className="text-4xl font-bold text-gray-800">
            {loading ? "$0" : `$${totalRevenue}`}
          </p>
        </div>
      </div>
    </div>
  </div>
  
  );
  
}  

export default StatisticComponent;
