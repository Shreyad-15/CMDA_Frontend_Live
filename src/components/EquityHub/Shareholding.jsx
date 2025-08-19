import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart, Pie, Cell, Tooltip as RechartsTooltip,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Legend
} from "recharts";

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00c49f', '#ffbb28'];
const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;

const allowedCategories = {
  Promoter: "Promoter",
  FII: "FII",
  DII: "DII",
  Public: "Public",
  Others: "Others",
  Mutual_Funds: "Mutual Funds"
};

const formatDecimal = (num) => {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Number(num));
};


const Shareholding = ({ symbol }) => {
  const [summaryData, setSummaryData] = useState([]);
  const [overallData, setOverallData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Promoter");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const summaryRes = await axios.get(`${API_BASE}/Shareholding/summary/${symbol}`);
        const overallRes = await axios.get(`${API_BASE}/Shareholding/Overall/${symbol}`);
        setSummaryData(summaryRes.data);
        setOverallData(overallRes.data);
      } catch (error) {
        console.error("Error fetching shareholding data", error);
      }
    };

    fetchData();
  }, [symbol]);

  const preparePieData = () => {
    if (summaryData.length === 0) return [];
    const entry = summaryData[0];
    return Object.keys(allowedCategories).map((key) => ({
      name: allowedCategories[key],
      value: entry[key]
    // value: formatDecimal(entry[key])
    }));
  };

    const renderCustomLabel = ({ name, value, percent }) => {
        return `${name}: ${formatDecimal(value)}%`;
    };



    const formatDate = (dateNum) => {
    const dateStr = dateNum.toString();
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);

    const monthMap = {
        "03": "March",
        "06": "June",
        "09": "Sep",
        "12": "Dec"
    };

  return `${monthMap[month] || month} ${year}`;
};

  const prepareLineData = () => {
    return overallData.map(item => ({
    //   Quarter: item.DATE_END.toString().replace(/(\d{4})(\d{2})/, "$2/$1"),
      Quarter: formatDate(item.DATE_END),
    //   Value: item[selectedCategory]
    Value: formatDecimal(item[selectedCategory])
    })).reverse();
  };

  const renderTable = () => {
    if (overallData.length === 0) return null;

    const rows = overallData.map((row) => {
      return {
        // Quarter: row.DATE_END.toString().replace(/(\d{4})(\d{2})/, "$2/$1"),
        Quarter: formatDate(row.DATE_END),
        Promoter: row.Promoter,
        FII: row.FII,
        DII: row.DII,
        Public: row.Public,
        Others: row.Others,
        Mutual_Funds: row.Mutual_Funds,
      };
    });




    return (
      <div style={{ overflowX: "auto", marginTop: "2rem", backgroundColor: "#fff", padding: "1rem", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <h3  className="dark:bg-slate-800 dark:text-white">Shareholding – Last 5 Quarters</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}  className="dark:bg-slate-800 dark:text-white">
          <thead className="dark:bg-slate-800 dark:text-white" >
            <tr style={{ backgroundColor: "#f0f2f5" }} className="dark:bg-slate-800 dark:text-white">
              <th style={thStyle} className="dark:bg-slate-800 dark:text-white">Quarter</th>
              {Object.keys(allowedCategories).map((key) => (
                <th key={key} style={thStyle} className="dark:bg-slate-800 dark:text-white">{allowedCategories[key]}</th>
              ))}
            </tr>
          </thead>
          <tbody className="dark:bg-slate-800 dark:text-white">
            {rows.map((r, i) => (
              <tr key={i} style={{ textAlign: "center", borderBottom: "1px solid #eee" }} className="dark:bg-slate-800 dark:text-white">
                <td style={tdStyle} className="dark:bg-slate-800 dark:text-white">{r.Quarter}</td>
                <td style={tdStyle} className="dark:bg-slate-800 dark:text-white">{r.Promoter}%</td>
                {/* <td style={tdStyle}>{r.FII}%</td> */}
                <td style={tdStyle} className="dark:bg-slate-800 dark:text-white">{formatDecimal(r.FII)}%</td>
                {/* <td style={tdStyle}>{r.DII}%</td> */}
                <td style={tdStyle} className="dark:bg-slate-800 dark:text-white">{formatDecimal(r.DII)}%</td>
                {/* <td style={tdStyle}>{r.Public}%</td> */}
                <td style={tdStyle} className="dark:bg-slate-800 dark:text-white">{formatDecimal(r.Public)}%</td>
                {/* <td style={tdStyle}>{r.Others}%</td> */}
                <td style={tdStyle} className="dark:bg-slate-800 dark:text-white">{formatDecimal(r.Others)}%</td>
                {/* <td style={tdStyle}>{r.Mutual_Funds}%</td> */}
                <td style={tdStyle} className="dark:bg-slate-800 dark:text-white">{formatDecimal(r.Mutual_Funds)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const thStyle = {
    padding: "10px",
    fontWeight: "bold",
    textAlign: "center",
    borderBottom: "2px solid #ccc",
  };

  const tdStyle = {
    padding: "8px",
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f7f9fc' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
        Shareholding Dashboard - {symbol}
      </h2>

      {/* Graphs Row */}
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '2rem' }}>
        {/* Pie Chart */}
        <div style={{ background: '#fff', padding: '1rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ textAlign: 'center' }} className=" dark:text-black">Shareholding Summary</h3>
          <PieChart width={400} height={400}>
            <Pie
                data={preparePieData()}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                label={renderCustomLabel} // 👈 Add this
                >
                {preparePieData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>

            <RechartsTooltip formatter={(value) => `${formatDecimal(value)}%`} />

          </PieChart>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", marginTop: "1rem" }}>
            {preparePieData().map((entry, i) => (
              <div key={i} style={{ marginRight: "10px", display: "flex", alignItems: "center" }}>
                <div style={{ width: 10, height: 10, backgroundColor: COLORS[i % COLORS.length], marginRight: 5 }}></div>
                <span>{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Line Chart */}
        <div style={{ background: '#fff', padding: '1rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>5 Quarter Trend</h3>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ padding: '0.5rem', fontSize: '1rem', borderRadius: '6px' }}
            >
              {Object.entries(allowedCategories).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <LineChart
            width={500}
            height={350}
            data={prepareLineData()}
            margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Quarter" />
            <YAxis unit="%" />
            <RechartsTooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Value"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
              name={allowedCategories[selectedCategory]}
            />
          </LineChart>
        </div>
      </div>

      {/* Table */}
      {renderTable()}
    </div>
  );
};

export default Shareholding;
