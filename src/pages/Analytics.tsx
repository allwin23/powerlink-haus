import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

function Analytics() {
  const [dataGraph1, setDataGraph1] = useState([]);
  const [dataGraph2, setDataGraph2] = useState([]);
  const [dataGraph3, setDataGraph3] = useState([]);
  const [dataGraph4, setDataGraph4] = useState([]);

    const configGraph1 = {
    power: { color: "#FFB400" },
  };
    const configGraph2 = {
    energy: { color: "#FFC83D" },
  };
  const configGraph3 = {
    solar1: { color: "#FFB400" },
    solar2: { color: "#FFC83D" },
    wind: { color: "#FFDA7A" },
  };
  const COLORS = ['#FFB400', '#FFC83D', '#FFDA7A'];
    const configGraph4 = {
    net: { color: "#FFE6A7" },
  };



  useEffect(() => {
    const storedData = localStorage.getItem('analyticsData');

    if (storedData) {
      const { graph1, graph2, graph3, graph4 } = JSON.parse(storedData);
      setDataGraph1(graph1);
      setDataGraph2(graph2);
      setDataGraph3(graph3);
      setDataGraph4(graph4);
    } else {
      // Dummy data for Graph 1 (Real-time power generation)
      const newDataGraph1 = Array.from({ length: 50 }, (_, i) => ({
        name: `Time ${i}`,
        value: 20 + Math.sin(i / 5) * 10 + Math.random() * 20, // Wavy data between 20 and 50
      }));

      // Dummy data for Graph 2 (Energy purchase over time)
      const newDataGraph2 = Array.from({ length: 50 }, (_, i) => ({
        name: `Time ${i}`,
        value: 20 + Math.random() * 30, // Spiky data between 20 and 50
      }));

      // Dummy data for Graph 3 (Renewable sources)
      const newDataGraph3 = [
        { name: 'Solar Panel Array 1', value: 400 },
        { name: 'Solar Panel Array 2', value: 300 },
        { name: 'Wind Vane', value: 200 },
      ];

      // Dummy data for Graph 4 (Net power over the past week)
      const newDataGraph4 = Array.from({ length: 50 }, (_, i) => ({
        name: `Time ${i}`,
        value: Math.sin(i / 5) * 10 + (Math.random() * 40 - 20), // More jagged data
      }));

      setDataGraph1(newDataGraph1);
      setDataGraph2(newDataGraph2);
      setDataGraph3(newDataGraph3);
      setDataGraph4(newDataGraph4);

      localStorage.setItem('analyticsData', JSON.stringify({
        graph1: newDataGraph1,
        graph2: newDataGraph2,
        graph3: newDataGraph3,
        graph4: newDataGraph4,
      }));
    }
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>

        {/* Graph 1: Real-time power generation */}
        <h2>Real-time Power Generation</h2>
        <ChartContainer config={configGraph1}>
          <LineChart
            data={dataGraph1}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tickFormatter={(tick) => {
              const time = parseInt(tick.replace('Time ', ''));
              const hour = time % 24;
              return `${String(hour).padStart(2, '0')}00`;
            }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="var(--color-power)" activeDot={{ r: 8 }} />
          </LineChart>
        </ChartContainer>

        {/* Graph 2: Energy purchase over time */}
        <h2>Energy Purchase Over Time</h2>
        <ChartContainer config={configGraph2}>
          <AreaChart
            data={dataGraph2}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tickFormatter={(tick) => {
              const time = parseInt(tick.replace('Time ', ''));
              const hour = time % 24;
              return `${String(hour).padStart(2, '0')}00`;
            }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="value" stroke="var(--color-energy)" fill="var(--color-energy)" />
          </AreaChart>
        </ChartContainer>
      </div>

      <div>
        {/* Graph 3: Renewable sources */}
        <h2>Renewable Energy Sources (Last Week)</h2>
        <ChartContainer config={configGraph3}>
          <PieChart>
            <Pie
              data={dataGraph3}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {dataGraph3.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ChartContainer>

        {/* Graph 4: Net power over the past week */}
        <h2>Net Power Over Past Week</h2>
        <ChartContainer config={configGraph4}>
          <LineChart
            data={dataGraph4}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tickFormatter={(tick) => {
              const time = parseInt(tick.replace('Time ', ''));
              const hour = time % 24;
              return `${String(hour).padStart(2, '0')}00`;
            }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="var(--color-net)" />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
}

export default Analytics;
