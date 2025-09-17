import React, { useEffect, useState, useRef } from 'react';
import Navbar from "../Navbar";
import Footer from "../Footer";
import SearchList from "./SearchList";
import GraphSlider from "./GraphSlider";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BsQuote } from "react-icons/bs";
import SearchTutorial from './SearchTutorial';
import Mysearch from './Mysearch';
import OpenCloseCards from './OpenCloseCards';
import { useAuth } from '../AuthContext';
import toast from 'react-hot-toast';
import { FaRegEye } from 'react-icons/fa';
import Login from '../Login';

const EquityHub = () => {
  const { getAuthToken, isLoggedIn } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("symbol") || queryParams.get("query") || "";
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("hub");
  const [hasSearched, setHasSearched] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [graphMode, setGraphMode] = useState("side-by-side");
  const [timeRange, setTimeRange] = useState("1Y");
  const [saveMessage, setSaveMessage] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const stockRefs = useRef({});
  const API_BASE = import.meta.env.VITE_URL || "http://168.231.121.219:8080";
  const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

  useEffect(() => {
    if (initialQuery) {
      fetchData(initialQuery);
    }
  }, [initialQuery]);

  const getCachedData = (key) => {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    try {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp > CACHE_TTL) {
        localStorage.removeItem(key);
        return null;
      }
      return data;
    } catch (err) {
      setError("Failed to parse cached data.");
      return null;
    }
  };

  const setCachedData = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
    } catch (err) {
      setError("Failed to cache data.");
    }
  };

  const fetchData = async (value) => {
    if (!value) {
      setResults([]);
      setError(null);
      setHasSearched(false);
      return;
    }
    setHasSearched(true);

    const cacheKey = `search_${value.toLowerCase()}`;
    const cachedResults = getCachedData(cacheKey);
    if (cachedResults) {
      setResults(cachedResults);
      setError(null);
      return;
    }

    try {
      const response = await axios.get(`${API_BASE}/stocks/test/suggest`, {
        params: { prefix: value },
        timeout: 10000,
      });

      const filteredResults = response.data;
      if (filteredResults.length === 0) {
        setError("Company not found in our list. Please check the name and search again.");
      } else {
        setResults(filteredResults);
        setCachedData(cacheKey, filteredResults);
        setError(null);
      }
    } catch (error) {
      console.error("Error fetching search results:", {
        message: error.message,
        status: error.response?.status,
        response: error.response?.data,
      });
      setError(
        error.response?.status === 404
          ? "Endpoint not found. Check server configuration."
          : error.response?.data?.error || error.message || "Failed to fetch search results."
      );
      setResults([]);
    }
  };

  const handleClearSearch = () => {
    setResults([]);
    setInput("");
    setError(null);
  };

  const handleSelectItem = async (item) => {
    setInput("");
    setResults([]);
    if (selectedStocks.some((stock) => stock.symbol === item.symbol)) {
      scrollToStock(item.symbol);
      return;
    }
    if (selectedStocks.length >= 2) {
      setError("Please remove a stock to add a new one for comparison.");
      return;
    }

    try {
      const cacheKey = `stock_${item.symbol}`;
      const cachedStock = getCachedData(cacheKey);
      if (cachedStock) {
        setSelectedStocks((prev) => {
          const updated = [...prev, cachedStock];
          setTimeout(() => scrollToStock(cachedStock.symbol), 100);
          return updated;
        });
        setError(null);
        // const token = getAuthToken();
        // if (token) handleSave([cachedStock]); // Save only if authenticated
        return;
      }

      const response = await axios.get(`${API_BASE}/stocks/test/suggest`, {
        params: { prefix: item.companyName },
        timeout: 10000,
      });

      if (response.data.length > 0) {
        const matchedStock = response.data.find(
          (s) => s.symbol === item.symbol && s.companyName === item.companyName
        ) || response.data[0];
        setSelectedStocks((prev) => {
          const updated = [...prev, matchedStock];
          setTimeout(() => scrollToStock(matchedStock.symbol), 100);
          return updated;
        });
        setCachedData(cacheKey, matchedStock);
        setError(null);
        // const token = getAuthToken();
        // if (token) handleSave([matchedStock]); // Save only if authenticated
      } else {
        setError("No stock details found for the selected symbol.");
      }
    } catch (error) {
      console.error("Error fetching stock details:", {
        message: error.message,
        status: error.response?.status,
        response: error.response?.data,
      });
      setError(
        error.response?.status === 404
          ? "Endpoint not found. Check server configuration."
          : error.response?.data?.error || error.message || "Failed to fetch stock details."
      );
    }
  };

  const scrollToStock = (symbol) => {
    const stockDiv = stockRefs.current[symbol];
    if (stockDiv) {
      stockDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      setError("Failed to scroll to stock. Please try again.");
    }
  };

  const removeStock = (symbol) => {
    setSelectedStocks((prevStocks) => prevStocks.filter((stock) => stock.symbol !== symbol));
    setCompareMode(false);
    setError(null);
  };

  const handleSave = async (stocksToSave) => {
    const token = getAuthToken();

    if (!token) {
      setIsLoginModalOpen(true);
      return;
    }

    const stocks = stocksToSave || selectedStocks;
    if (stocks.length === 0) {
      setError("No stocks selected to save.");
      return;
    }

    const invalidStocks = stocks.filter(
      (stock) => !stock.symbol || !stock.companyName
    );
    if (invalidStocks.length > 0) {
      setError("One or more stocks have missing symbol or company name.");
      return;
    }

    try {
      await Promise.all(
        stocks.map((stock) =>
          axios.post(
            `${API_BASE}/stocks/test/saveStock`,
            {
              symbol: stock.symbol,
              companyName: stock.companyName,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
        )
      );
      toast.success("Your data saved successfully");
      setError(null);
      setTimeout(() => setSaveMessage(null), 3000);
      localStorage.removeItem(`saved_stocks_${token}`);
    } catch (error) {
      console.error("Save error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      setError(
        error.response?.data?.error ||
          error.message ||
          "Failed to save stocks. Please try again."
      );
    }
  };

  useEffect(() => {
    const token = getAuthToken();
    if (token && isLoginModalOpen) {
      setIsLoginModalOpen(false);
      // if (selectedStocks.length > 0) {
      //   handleSave();
      // }
    }
  }, [getAuthToken, isLoginModalOpen, selectedStocks]);

  const toggleCompareMode = () => {
    if (selectedStocks.length !== 2) {
      setError("Please select exactly two stocks to compare.");
      return;
    }
    setCompareMode(true);
    setError(null);
  };

  const handleLoginClick = () => setShowLoginModal(true);
  const handleCloseModal = () => setShowLoginModal(false);
  const handleLoginSuccess = () => handleCloseModal();

  const LoginModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 max-w-md w-full">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Please Log In
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          You need to be logged in to add stocks to your watchlist.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="px-4 py-2 bg-gray-300 dark:bg-slate-600 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-slate-500 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleLoginClick}
            className="bg-slate-800 text-white border border-white px-4 py-2 rounded-full text-lg font-medium hover:bg-white hover:text-black"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 pb-12">
        <div className="w-full px-4 sm:px-6 lg:px-8 mt-12">
          <div className="flex flex-col items-center gap-4">
            <div className="flex justify-center w-full">
              <div className="flex justify-center items-center space-x-2 bg-white dark:bg-slate-800 p-1 rounded-xl shadow-sm">
                {[{ key: 'hub', label: 'Equity' }, { key: 'search', label: 'Watchlist' }, { key: 'videos', label: 'Tutorial' }].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-4 py-2 rounded-lg text-lg font-medium transition-all duration-300 focus:outline-none ${
                      activeTab === tab.key
                        ? 'bg-cyan-600 text-white font-bold shadow-sm'
                        : 'text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            {activeTab === 'videos' && (
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="dark:bg-slate-800 p-6 rounded-xl dark:border-slate-700">
                  <SearchTutorial />
                </div>
              </div>
            )}
          </div>
          {activeTab === "hub" && (
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Search NSE Stocks
                </h2>
                {error && (
                  <div className="flex items-center bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-2 rounded mb-4 text-sm">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 15a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0-13C4.477 2 0 6.477 0 12s4.477 10 10 10 10-4.477 10-10S15.523 2 10 2zm1 14H9v-2h2v2zm0-4H9V7h2v5z" />
                    </svg>
                    {error}
                  </div>
                )}
                {saveMessage && (
                  <div className="flex items-center bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-2 rounded mb-4 text-sm">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 15a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0-13C4.477 2 0 6.477 0 12s4.477 10 10 10 10-4.477 10-10S15.523 2 10 2zm-1.293 13.293l-4-4 1.414-1.414L9 12.586l7.293-7.293 1.414 1.414-8 8z" />
                    </svg>
                    {saveMessage}
                  </div>
                )}
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                    placeholder="Search for stocks, trends, or insights..."
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      fetchData(e.target.value);
                    }}
                  />
                  {results.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      <SearchList results={results} query={input} onSelectItem={handleSelectItem} onClear={handleClearSearch} />
                    </div>
                  )}
                </div>
                {selectedStocks.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4 items-center">
                    {selectedStocks.map((stock) => (
                      <span
                        key={stock.symbol}
                        className="flex items-center bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 text-sm px-3 py-1 rounded-full"
                      >
                        {stock.symbol} ({stock.basicIndustry || 'N/A'})
                        <button
                          className="ml-2 text-red-500 hover:text-red-700"
                          onClick={() => removeStock(stock.symbol)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {selectedStocks.length === 2 && (
                      <button
                        onClick={toggleCompareMode}
                        className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 text-sm font-medium"
                      >
                        Compare Graphs
                      </button>
                    )}
                  </div>
                )}
                <div className="mt-6 bg-cyan-50 dark:bg-cyan-900/30 p-4 rounded-lg text-center">
                  <BsQuote className="inline-block text-cyan-600 dark:text-cyan-400 mb-2" size={24} />
                  <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                    “Bulls are born out of pessimism, grow on skepticism, mature on optimism, and die in euphoria.” —{' '}
                    <span className="font-semibold text-cyan-700 dark:text-cyan-400">Franklin Templeton</span>
                  </p>
                </div>
              </div>
            </div>
          )}
          {activeTab === "search" && (
            <div className="w-full px-4 sm:px-6 lg:px-8 mt-8">
              <Mysearch API_BASE={API_BASE} getAuthToken={getAuthToken} />
            </div>
          )}
          {activeTab === "hub" && compareMode && selectedStocks.length === 2 && (
            <div className="fixed inset-0 z-50 flex flex-col bg-gray-50 dark:bg-slate-900">
              <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-slate-700">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Comparing {selectedStocks[0].symbol} vs {selectedStocks[1].symbol}
                </h2>
                <div className="flex items-center gap-4">
                  <select
                    className="px-2 py-1 text-gray-800 dark:text-white rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-gray-800 text-sm"
                    value={graphMode}
                    onChange={(e) => setGraphMode(e.target.value)}
                  >
                    <option value="side-by-side">Side by Side</option>
                    <option value="overlay">Overlay</option>
                  </select>
                  <button
                    onClick={() => setCompareMode(false)}
                    className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-cyan-600 dark:hover:bg-gray-700 text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className="flex-1 p-4 overflow-auto">
                {graphMode === "side-by-side" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedStocks.map((stock) => (
                      <div
                        key={stock.symbol}
                        className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700"
                      >
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                          {stock.symbol} - {stock.companyName} ({stock.basicIndustry || 'N/A'})
                        </h3>
                        <GraphSlider
                          symbol={stock.symbol}
                          tabContext="equityHub"
                          isFullWidth={true}
                          timeRange={timeRange}
                          normalize={true}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
                    {selectedStocks.map((stock) => (
                      <div key={stock.symbol} className="bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                          {stock.symbol} - {stock.companyName} ({stock.basicIndustry || 'N/A'})
                        </h3>
                        <GraphSlider
                          symbol={stock.symbol}
                          isFullWidth={true}
                          timeRange={timeRange}
                          normalize={true}
                          overlay={true}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          {activeTab === "hub" && !compareMode && selectedStocks.length > 0 && (
            <div className="px-4 sm:px-6 lg:px-8 mt-8 w-full">
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => handleSave()}
                  className="px-4 py-3 bg-cyan-600 flex gap-2 text-lg text-white rounded-lg hover:bg-cyan-700 text-sm font-medium"
                >
                  <FaRegEye className='mt-1'/>
                  Add to Watchlist
                </button>
              </div>
              <div className={`grid gap-6 ${selectedStocks.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
                {selectedStocks.map((stock) => (
                  <div
                    key={stock.symbol}
                    ref={(el) => (stockRefs.current[stock.symbol] = el)}
                    className="bg-white dark:bg-slate-800 p-6 rounded-xl dark:border-slate-700"
                  >
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      {stock.symbol} - {stock.companyName}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <strong>Industry:</strong> {stock.basicIndustry || 'N/A'}
                    </p>
                    <OpenCloseCards symbol={stock.symbol} companyName={stock.companyName} />
                    <GraphSlider
                      symbol={stock.symbol}
                      tabContext="equityHub"
                      isFullWidth={selectedStocks.length === 1}
                      timeRange={timeRange}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Login
        isOpen={showLoginModal}
        onClose={handleCloseModal}
        onSuccess={handleLoginSuccess}
        showButtons={false}
      />
      {isLoginModalOpen && <LoginModal />}
      <Footer />
    </div>
  );
};

export default EquityHub;