import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Sparkles, TrendingUp, BarChart2, PieChart,
  Factory, FlaskConical, DollarSign, Car, Code, HeartPulse,
  Scissors, ShoppingBag, Building2, Hammer, ChevronDown, ChevronUp,
  ArrowUpRight, Info, RotateCcw, ArrowUp, ArrowDown
} from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const MarketCapBanner = () => {
  const API_BASE = import.meta.env.VITE_URL || `${window.location.origin}/api`;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [sectors, setSectors] = useState([]);
  const [selectedSector, setSelectedSector] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [highlightedSector, setHighlightedSector] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');
  const [maxPELessThan10Sector, setMaxPELessThan10Sector] = useState(null);
  const [minPELessThan10Sector, setMinPELessThan10Sector] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const [viewMode, setViewMode] = useState('pie'); // 'pie' or 'bar'
  const [expandedSector, setExpandedSector] = useState(null);

  const colorPalette = [
    'rgba(54, 162, 235, 0.8)',  // Blue
    'rgba(75, 192, 192, 0.8)',  // Teal
    'rgba(255, 159, 64, 0.8)',  // Orange
    'rgba(153, 102, 255, 0.8)', // Purple
    'rgba(255, 205, 86, 0.8)',  // Yellow
    'rgba(255, 99, 132, 0.8)',  // Red
    'rgba(100, 181, 246, 0.8)', // Light Blue
    'rgba(77, 182, 172, 0.8)',  // Green
    'rgba(186, 104, 200, 0.8)', // Light Purple
    'rgba(246, 178, 107, 0.8)', // Light Orange
  ];

  const highlightColorPalette = colorPalette.map(color =>
    color.replace('0.8', '1').replace(/,\s*\d+\.\d+\)/, ', 1)')
  );

  const sectorIcons = {
    'Capital Goods': Factory,
    'Chemicals': FlaskConical,
    'Finance': DollarSign,
    'Automobile & Ancillaries': Car,
    'IT': Code,
    'Healthcare': HeartPulse,
    'Textile': Scissors,
    'FMCG': ShoppingBag,
    'Infrastructure': Building2,
    'Iron & Steel': Hammer
  };

  const formatDecimal = (num) => {
    if (num == null || isNaN(num) || typeof num !== 'number') return 'N/A';
    return Math.round(num * 100) / 100;
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);
    const handleChange = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const cacheDuration = 60 * 60 * 1000; // 1hr
    const fetchSectors = async () => {
      try {
        setLoading(true);
        setError(null);
        setSectors([]);

        const cachedData = localStorage.getItem('sectorData');
        const cacheTimestamp = localStorage.getItem('sectorDataTimestamp');
        let validSectors = [];

        if (cachedData && cacheTimestamp && Date.now() - parseInt(cacheTimestamp) < cacheDuration) {
          const parsedData = JSON.parse(cachedData);
          validSectors = parsedData.data
            .filter((sector) => sector?.Sector && Number.isFinite(sector.SectorMarketCap) && Number.isFinite(sector.SectorCAGR_1Y_MCap) && Array.isArray(sector.Companies?.Symbol))
            .map((sector, index) => {
              const peLessThan10Count = sector.Companies.Symbol.filter((_, i) => {
                const pe = sector.Companies.PE?.[i];
                return pe != null && !isNaN(pe) && pe < 10;
              }).length;
              return {
                ...sector,
                color: colorPalette[index % colorPalette.length],
                highlightColor: highlightColorPalette[index % highlightColorPalette.length],
                PELessThan10Count: peLessThan10Count,
                TotalCompanies: sector.Companies.Symbol.length
              };
            });
        } else {
          // const response = await axios.get('http://127.0.0.1:8000/equity_sectoral_analysis', { signal: controller.signal });
          const response = await axios.get(`${API_BASE}/landpage/sector-summary`, { signal: controller.signal });
          if (response.data.status !== 'success' || !Array.isArray(response.data.data)) {
            throw new Error(response.data.message || 'API response is not valid');
          }
          validSectors = response.data.data
            .filter((sector) => sector?.Sector && Number.isFinite(sector.SectorMarketCap) && Number.isFinite(sector.SectorCAGR_1Y_MCap) && Array.isArray(sector.Companies?.Symbol))
            .map((sector, index) => {
              const peLessThan10Count = sector.Companies.Symbol.filter((_, i) => {
                const pe = sector.Companies.PE?.[i];
                return pe != null && !isNaN(pe) && pe < 10;
              }).length;
              return {
                ...sector,
                color: colorPalette[index % colorPalette.length],
                highlightColor: highlightColorPalette[index % highlightColorPalette.length],
                PELessThan10Count: peLessThan10Count,
                TotalCompanies: sector.Companies.Symbol.length
              };
            });
          localStorage.setItem('sectorData', JSON.stringify(response.data));
          localStorage.setItem('sectorDataTimestamp', Date.now().toString());
        }

        if (validSectors.length === 0) {
          setSectors([]);
          setSelectedSector(null);
          setMaxPELessThan10Sector(null);
          setMinPELessThan10Sector(null);
          setLoading(false);
          return;
        }

        const sortedSectors = [...validSectors].sort((a, b) => {
          return sortOrder === 'desc' ? b.SectorMarketCap - a.SectorMarketCap : a.SectorMarketCap - b.SectorMarketCap;
        }).slice(0, 20);

        setSectors(sortedSectors);

        const maxPELessThan10Sector = validSectors.reduce((max, sector) => {
          if (!max) return sector;
          if (sector.PELessThan10Count === max.PELessThan10Count) {
            return sector.TotalCompanies < max.TotalCompanies ? sector : max;
          }
          return sector.PELessThan10Count > max.PELessThan10Count ? sector : max;
        }, validSectors[0]);

        const minPELessThan10Sector = validSectors.reduce((min, sector) => {
          if (!min) return sector;
          if (sector.PELessThan10Count === min.PELessThan10Count) {
            return sector.TotalCompanies < min.TotalCompanies ? sector : min;
          }
          return sector.PELessThan10Count < min.PELessThan10Count ? sector : min;
        }, validSectors[0]);

        setMaxPELessThan10Sector(maxPELessThan10Sector);
        setMinPELessThan10Sector(minPELessThan10Sector);

        if (sortedSectors.length > 0) {
          setSelectedSector(sortedSectors[0]);
        } else {
          setSelectedSector(null);
        }
        setLoading(false);
      } catch (error) {
        if (error.name === 'AbortError') return;
        setError(error.message || 'Failed to fetch sector data');
        console.error('Error fetching sector data:', error, error.response?.data);
        setSectors([]);
        setSelectedSector(null);
        setMaxPELessThan10Sector(null);
        setMinPELessThan10Sector(null);
        setLoading(false);
      }
    };

    const debounceFetch = setTimeout(() => fetchSectors(), 100);
    return () => {
      controller.abort();
      clearTimeout(debounceFetch);
    };
  }, [API_BASE, sortOrder]);

  const formatNumber = useCallback((num) => {
    if (num == null || isNaN(num) || typeof num !== 'number') return '₹0';
    const absNum = Math.abs(num);
    const sign = num < 0 ? '-' : '';
    if (absNum >= 1e7) {
      const value = absNum / 1e7;
      return `${sign}₹${value.toLocaleString('en-IN', { minimumFractionDigits: value % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 })}cr`;
    }
    if (absNum >= 1e5) {
      const value = absNum / 1e5;
      return `${sign}₹${value.toLocaleString('en-IN', { minimumFractionDigits: value % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 })}L`;
    }
    return `${sign}₹${Math.round(absNum).toLocaleString('en-IN')}`;
  }, []);

  const totalMarketCap = useMemo(() => {
    return sectors.reduce((sum, sector) => sum + (sector.SectorMarketCap || 0), 0);
  }, [sectors]);

  const pieChartData = useMemo(() => {
    if (!Array.isArray(sectors) || sectors.length === 0) {
      return {
        labels: ['No Data'],
        datasets: [{
          data: [1],
          backgroundColor: ['rgba(200, 200, 200, 0.5)'],
          borderWidth: 1,
          hoverOffset: 0
        }]
      };
    }
    return {
      labels: sectors.map(sector => sector.Sector || 'Unknown'),
      datasets: [{
        data: sectors.map(sector => sector.SectorMarketCap || 0),
        backgroundColor: sectors.map((sector, index) => highlightedSector === index ? sector.highlightColor : sector.color),
        borderWidth: 1,
        hoverOffset: 20
      }]
    };
  }, [sectors, highlightedSector]);

  const barChartData = useMemo(() => {
    if (!Array.isArray(sectors) || sectors.length === 0) {
      return {
        labels: ['No Data'],
        datasets: [{
          label: 'Market Cap',
          data: [1],
          backgroundColor: 'rgba(200, 200, 200, 0.5)',
          borderWidth: 0,
          borderRadius: 4,
        }]
      };
    }

    const sortedSectors = [...sectors].sort((a, b) => b.SectorMarketCap - a.SectorMarketCap);

    return {
      labels: sortedSectors.map(sector => sector.Sector || 'Unknown'),
      datasets: [{
        label: 'Market Cap',
        data: sortedSectors.map(sector => sector.SectorMarketCap || 0),
        backgroundColor: sortedSectors.map((sector, index) => highlightedSector === index ? sector.highlightColor : sector.color),
        borderWidth: 0,
        borderRadius: 4,
        barPercentage: 0.6,
      }]
    };
  }, [sectors, highlightedSector]);

  const loaderPieChartData = useMemo(() => ({
    labels: ['Loading...', 'Loading...', 'Loading...', 'Loading...', 'Loading...'],
    datasets: [{
      data: [1, 1, 1, 1, 1],
      backgroundColor: isDark
        ? ['rgba(50, 50, 50, 0.5)', 'rgba(60, 60, 60, 0.5)', 'rgba(70, 70, 70, 0.5)', 'rgba(80, 80, 80, 0.5)', 'rgba(90, 90, 90, 0.5)']
        : ['rgba(200, 200, 200, 0.5)', 'rgba(180, 180, 180, 0.5)', 'rgba(160, 160, 160, 0.5)', 'rgba(140, 140, 140, 0.5)', 'rgba(120, 120, 120, 0.5)'],
      borderWidth: 1,
      borderColor: isDark ? 'rgba(100, 100, 100, 0.5)' : 'rgba(255, 255, 255, 0.5)'
    }]
  }), [isDark]);

  const loaderBarChartData = useMemo(() => ({
    labels: ['Loading...', 'Loading...', 'Loading...', 'Loading...', 'Loading...'],
    datasets: [{
      label: 'Market Cap',
      data: [1, 1, 1, 1, 1],
      backgroundColor: isDark
        ? ['rgba(50, 50, 50, 0.5)', 'rgba(60, 60, 60, 0.5)', 'rgba(70, 70, 70, 0.5)', 'rgba(80, 80, 80, 0.5)', 'rgba(90, 90, 90, 0.5)']
        : ['rgba(200, 200, 200, 0.5)', 'rgba(180, 180, 180, 0.5)', 'rgba(160, 160, 160, 0.5)', 'rgba(140, 140, 140, 0.5)', 'rgba(120, 120, 120, 0.5)'],
      borderWidth: 0,
      borderRadius: 4,
      barPercentage: 0.6,
    }]
  }), [isDark]);

  const centerTextPlugin = useMemo(() => ({
    id: 'centerText',
    afterDraw(chart) {
      const { ctx, chartArea: { width, height } } = chart;
      ctx.save();
      ctx.font = `bold ${isDark ? '12px' : '14px'} Arial`;
      ctx.fillStyle = isDark ? '#e5e5e5' : '#333';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Market Cap', width / 2, height / 2);
      ctx.restore();
    }
  }), [isDark]);

  const pieChartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: isDark ? '#e5e5e5' : '#333',
          font: { size: 10, weight: 'bold' },
          padding: 8,
          usePointStyle: true
        }
      },
      tooltip: {
        enabled: Array.isArray(sectors) && sectors.length > 0,
        backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        titleColor: isDark ? '#ffffff' : '#000000',
        bodyColor: isDark ? '#dddddd' : '#333333',
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            if (label === 'No Data') return 'No data available';
            const value = context.raw || 0;
            const percentage = totalMarketCap > 0 ? ((value / totalMarketCap) * 100).toFixed(1) : 0;
            return `${label}: ${formatNumber(value)} (${percentage}%)`;
          }
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    },
    onClick: (event, elements) => {
      if (!loading && elements?.length > 0 && Array.isArray(sectors) && sectors.length > 0) {
        const clickedIndex = elements[0].index;
        if (clickedIndex < sectors.length) {
          setSelectedSector(sectors[clickedIndex]);
          setHighlightedSector(clickedIndex);
        }
      }
    }
  }), [formatNumber, isDark, loading, sectors, totalMarketCap]);

  const barChartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: Array.isArray(sectors) && sectors.length > 0,
        backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        titleColor: isDark ? '#ffffff' : '#000000',
        bodyColor: isDark ? '#dddddd' : '#333333',
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            const percentage = totalMarketCap > 0 ? ((value / totalMarketCap) * 100).toFixed(1) : 0;
            return `${label}: ${formatNumber(value)} (${percentage}%)`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: isDark ? '#e5e5e5' : '#333',
          callback: function (value) {
            if (value >= 1e7) {
              return '₹' + (value / 1e7).toFixed(1) + 'cr';
            }
            if (value >= 1e5) {
              return '₹' + (value / 1e5).toFixed(1) + 'L';
            }
            return '₹' + value;
          }
        }
      },
      y: {
        grid: {
          color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: isDark ? '#e5e5e5' : '#333'
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    },
    onClick: (event, elements) => {
      if (!loading && elements?.length > 0 && Array.isArray(sectors) && sectors.length > 0) {
        const clickedIndex = elements[0].index;
        if (clickedIndex < sectors.length) {
          setSelectedSector(sectors[clickedIndex]);
          setHighlightedSector(clickedIndex);
        }
      }
    }
  }), [formatNumber, isDark, loading, sectors, totalMarketCap]);

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'pie' ? 'bar' : 'pie');
  };

  // const toggleSectorExpansion = (sectorName) => {
  //   setExpandedSector(prev => prev === sectorName ? null : sectorName);
  // };

  // const refreshData = () => {
  //   localStorage.removeItem('sectorData');
  //   localStorage.removeItem('sectorDataTimestamp');
  //   window.location.reload();
  // };

  return (
    <div className="mt-50 relative px-2 sm:px-4 py-4 sm:py-6 flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-[60vh]">
      <div ref={ref} className="mt-50 max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-start justify-between gap-4 sm:gap-6 z-10">
        {/* Left Section: Title and Selected Sector Card */}
        <div className="w-full lg:w-1/2 text-gray-800 dark:text-gray-100 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="mt-50 flex items-center justify-center lg:justify-start text-slate-700 dark:text-indigo-300 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Sector Intelligence Platform</span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-center lg:text-left">
              Capital Market{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-300">
                Data Analytics
              </span>
              <span className="z-10 align-right inline-block -rotate-6 bg-white text-sky-600 dark:bg-slate-800 font-semibold text-xs px-2 py-0.5 rounded-md border border-sky-300 dark:border-sky-600 shadow-sm">
                BETA
              </span>
            </h1>

            <p className="mt-20 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-md mx-auto lg:mx-0 text-center lg:text-left min-h-[60px]">
              <Typewriter
                words={[
                  'Warren Buffett - "Best Chance to deploy capital are when things are down"',
                  'Vijay Kedia  - "Only two people can BUY at BOTTOM and SELL at TOP one is GOD and other is a LIAR."',
                  'Ray Dalio - "If you are not aggressive you will not make money; if you are not defensive you will not keep money."',
                  'Rakesh Jhunjhunwala - "Trading is for creating capital and investment is for growth of capital."',
                  'Ray Dalio - " There are two main drivers of asset class returns - inflation and growth."',
                ]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={60}
                deleteSpeed={30}
                delaySpeed={1500}
              />
            </p>

            <div className="mt-20 flex flex-wrap gap-2 justify-center lg:justify-start">
              <button
                onClick={toggleSortOrder}
                disabled={loading}
                className="flex items-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 bg-sky-600 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sky-700"
                aria-label={`Sort by Market Cap: ${sortOrder === 'desc' ? 'High to Low' : 'Low to High'}`}
              >
                {sortOrder === 'desc' ? <ArrowDown size={14} /> : <ArrowUp size={14} />}
                Sort: {sortOrder === 'desc' ? 'High to Low' : 'Low to High'}
              </button>

              <button
                onClick={toggleViewMode}
                disabled={loading}
                className="flex items-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-600 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700"
                aria-label={`Switch to ${viewMode === 'bar' ? 'Bar' : 'Pie'} Chart view`}
              >
                {viewMode === 'bar' ? <BarChart2 size={14} /> : <PieChart size={14} />}
                View: {viewMode === 'bar' ? 'Bar Chart' : 'Pie Chart'}
              </button>

              {/* <button
                onClick={refreshData}
                disabled={loading}
                className="flex items-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-600 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
                aria-label="Refresh data"
              >
                <RotateCcw size={14} />
                Refresh
              </button> */}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                className="mt-20 sm:mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden w-full max-w-xs sm:max-w-md mx-auto p-3 sm:p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="animate-pulse flex flex-col items-center space-y-2 sm:space-y-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                  <div className="w-3/4 h-3 sm:h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="w-1/2 h-2 sm:h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="bg-gray-100 dark:bg-gray-700 p-1 sm:p-2 rounded-lg flex flex-col space-y-1">
                        <div className="w-1/2 h-2 sm:h-2 bg-gray-200 dark:bg-gray-600 rounded"></div>
                        <div className="w-3/4 h-2 sm:h-3 bg-gray-200 dark:bg-gray-600 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : !selectedSector || sectors.length === 0 ? (
              <motion.div
                key="no-data"
                className="mt-4 sm:mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden w-full max-w-xs sm:max-w-md mx-auto p-3 sm:p-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-500 dark:text-gray-400 font-medium text-xs sm:text-sm">
                  No sector data available
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-2 px-3 sm:px-4 py-1 sm:py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-md text-xs sm:text-sm transition-colors duration-200"
                >
                  Retry
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="data"
                className="mt-20 sm:mt-6 flex flex-col gap-4 w-full max-w-xs sm:max-w-md mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Sector Overview Card */}
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden w-full p-3 sm:p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                    <motion.div
                      className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg flex items-center justify-center shadow-md"
                      style={{
                        backgroundColor: selectedSector.highlightColor || selectedSector.color || '#3b82f6',
                        color: 'white',
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      {sectorIcons[selectedSector.Sector] ? (
                        React.createElement(sectorIcons[selectedSector.Sector], {
                          className: "w-4 sm:w-5 h-4 sm:h-5",
                          strokeWidth: 1.5,
                        })
                      ) : (
                        <PieChart className="w-4 sm:w-5 h-4 sm:h-5" strokeWidth={1.5} />
                      )}
                    </motion.div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {selectedSector.Sector}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        {selectedSector.description || 'Sector performance overview'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 p-2 rounded-lg border border-blue-100 dark:border-gray-600">
                      <div className="flex items-center gap-1 sm:gap-2 text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-medium mb-1">
                        <PieChart className="w-3 sm:w-4 h-3 sm:h-4 opacity-70" />
                        Market Cap
                      </div>
                      <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-gray-100">
                        {formatNumber(selectedSector.SectorMarketCap)}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-700 dark:to-gray-800 p-2 rounded-lg border border-green-100 dark:border-gray-600">
                      <div className="flex items-center gap-1 sm:gap-2 text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-medium mb-1">
                        <TrendingUp className="w-3 sm:w-4 h-3 sm:h-4 opacity-70" />
                        1Y Growth
                      </div>
                      <p
                        className={`text-sm sm:text-base font-medium ${selectedSector.SectorCAGR_1Y_MCap >= 0
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                          }`}
                      >
                        {selectedSector.SectorCAGR_1Y_MCap
                          ? `${formatDecimal(selectedSector.SectorCAGR_1Y_MCap * 100)}%`
                          : 'N/A'}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-700 dark:to-gray-800 p-2 rounded-lg border border-purple-100 dark:border-gray-600">
                      <div className="flex items-center gap-1 sm:gap-2 text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-medium mb-1">
                        <BarChart2 className="w-3 sm:w-4 h-3 sm:h-4 opacity-70" />
                        PE Ratio
                      </div>
                      <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-gray-100">
                        {formatDecimal(selectedSector.SectorPE_Mode || 'N/A')}
                      </p>
                    </div>
                  </div>


                </motion.div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Section: Chart */}
        <div className="w-full lg:w-1/2 mt-4 sm:mt-6 lg:mt-0 relative">
          {error ? (
            <div className="text-center px-2 sm:px-4 py-2 sm:py-3 text-gray-500 dark:bg-gray-800 dark:text-gray-300 text-xs sm:text-sm">
              Could not load sector visualization: {error}
            </div>
          ) : (
            <div className="w-full mt-30 h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] relative">
              {viewMode === 'bar' ? (
                <Pie
                  data={loading ? loaderPieChartData : pieChartData}
                  options={pieChartOptions}
                  plugins={[centerTextPlugin]}
                />
              ) : (
                <Bar
                  data={loading ? loaderBarChartData : barChartData}
                  options={barChartOptions}
                />
              )}
            </div>
          )}
          <div className="text-center mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            <p className="text-sky-600 dark:text-sky-300 font-medium">
              Showing top 10 sectors by Market Cap ({sortOrder === 'desc' ? 'highest to lowest' : 'lowest to highest'})
            </p>
            {/* <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Total Market Cap: {formatNumber(totalMarketCap)}
                        </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketCapBanner;