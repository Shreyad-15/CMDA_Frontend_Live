// import React from 'react'
// import SignUp from './components/SignUp'
// import { Routes,Route } from 'react-router-dom'
// import Home from './home/Home'
// import News from './components/News'
// import Support from './components/Support'
// import Plan from './components/Plan'
// import Offer from './components/Offer'
// import Portfolio from './components/Portfolio/Portfolio.jsx'
// import FAQ from './components/FAQ'
// import { Toaster } from 'react-hot-toast';
// import CompleteData from './components/CompleteData'
// import UpdateProfile from './components/UpdateProfile'
// import ProfileDrawer from './components/ProfileDrawer'
// import ForgotPassword from './components/ForgotPassword'
// import ResetPassword from './components/ResetPassword'
// import AboutUs from './components/AboutUs'
// import TermsConditions from './components/TermsConditions'
// import MarketData from './components/MarketData/MarketData'
// import Learning from './components/Learning'
// import Admin from './components/Admin'
// import CompleteRegData from './components/CompleteRegData'
// import UpdateIndividualProfile from './components/UpdateIndividualProfile'
// import UpdateCorporateProfile from './components/UpdateCorporateProfile'
// import EquityHub from './components/EquityHub/EquityHub.jsx'
// import Search from './components/EquityHub/Search.jsx'
// import PortDash from './components/Portfolio/PortDash.jsx'
// // import SavedFilesPage from "./components/Portfolio/SavedFilesPage";
// import PortLandPage from "./components/Portfolio/PortLandPage";
// import StockTalks from './components/ChatEngine/StockTalks.jsx'
// import ChatPage from './components/ChatEngine/ChatPage.jsx'
// import IndividualSignUp from './components/IndividualSignUp.jsx'
// import CorporateSignUp from './components/CorporateSignup.jsx'
// import IndividualResetPassword from './components/IndividualResetPassword.jsx'
// import CorporateResetPassword from './components/CorporateResetPassword.jsx'
// import DashBoard from './components/DashBoard/DashBoard.jsx'

// // import Dashboard from './DashBoard/DashBoard.jsx'
// // import Myportfolio from './components/Portfolio/Myportfolio.jsx'
// // import Mysearch from './components/EquityHub/Myserach.jsx'
// import OpenCloseCards from './components/EquityHub/OpenCloseCards.jsx'
// import StatsCards from './components/DashBoard/StatsCards.jsx'
// import Dashboard from './components/DashBoard/DashBoard.jsx'
// import AddNewModal from './components/DashBoard/AddNewModal.jsx'
// // import Upcoming from './components/Upcoming.jsx'
// import HomeNavbar from './components/HomeNavbar.jsx'
// import SavedDashboard from './components/DashBoard/SavedDashbord.jsx'
// import SharedDashboard from './components/DashBoard/SharedDashboard.jsx'
// // import DashboardItem from './components/DashBoard/DashboardItem.jsx'

// const ResetPasswordHandler = () => {
//   const queryParams = new URLSearchParams(window.location.search);
//   const userType = queryParams.get("type");
//   const token = queryParams.get("token");
 
//   console.log("Extracted userType from URL:", userType);
//   console.log("Extracted token from URL:", token);
 
//   if (!userType || !token) {
//     return <h2>Invalid reset link</h2>;
//   }
 
//   return userType === "corporate" ? (
//     <CorporateResetPassword token={token} />
//   ) : (
//     <IndividualResetPassword token={token} />
//   );
// };

// const App = () => {
  
//   return (
  
  
  
//   <div className=' dark:bg-slate-900 dark:text-white'>
//     <Routes>
//       <Route path='*' element={<Home/>}/>
//       <Route path='/signup' element={<SignUp/>}/>
//       <Route path='/news' element={<News/>}/>
//       <Route path='/support' element={<Support/>}/>
//       <Route path='/plan' element={<Plan/>}/>
//       <Route path='/offer' element={<Offer/>}/>
//       <Route path='/portfolio' element={<Portfolio/>}/>
//       <Route path='/faq' element={<FAQ/>}/>
//       <Route path='/about' element={<AboutUs/>}/>
//       {/* <Route path='/learning' element={<Learing/>}/> */}
//       <Route path='/completeData' element={<CompleteData/>}/>
//       <Route path='/completeRegData' element={<CompleteRegData/>}/>
//       <Route path='/updateProfile/*' element={<UpdateProfile/>}/>
//       <Route path='/profiledrawer' element={<ProfileDrawer/>}/>
//       <Route path='/forgotPassword' element={<ForgotPassword/>}/>
//       <Route path='/resetPassword' element={<ResetPassword/>}/>
//       <Route path='/about' element={<AboutUs/>}/>
//       <Route path='/terms' element={<TermsConditions/>}/>
//       <Route path='/marketData' element={<MarketData/>}/>
//       <Route path='/learning' element={<Learning/>}/>
//       <Route path='/admin/*' element={<Admin/>}/>
//        <Route path='/equityhub' element={<EquityHub/>}/>
//        {/* <Route path='/mysearch' element={<Mysearch />}/> */}
//       <Route path='/search' element={<Search/>}/>
//       <Route path='/portDash' element={<PortDash/>}/>
//       <Route path='/stockTalks' element={<StockTalks/>}/>
//       <Route path='/chatPage' element={<ChatPage/>}/>
//       <Route path='/updateIndividualProfile' element={<UpdateIndividualProfile/>}/>
//       {/* <Route path="/updateCorporateProfile/*" element={<UpdateCorporateProfile/>} /> */}
//       <Route path='/updateCorporateProfile/*' element={<UpdateCorporateProfile/>}/>
//       <Route path='/individualResetPassword' element={<IndividualResetPassword/>}/>
//       <Route path='/corporateResetPassword' element={<CorporateResetPassword/>}/>
//       <Route path="/reset-password" element={<ResetPasswordHandler />} />
//       <Route path='/individualSignUp' element={<IndividualSignUp/>}/>
//       <Route path='/corporateSignUp' element={<CorporateSignUp/>}/>
//       {/* <Route path='/dashboard' element={<DashBoard/>}/> */}
//       {/* <Route path='/dashboard1' element={<Dashboard />} /> */}
//       <Route path="/upload" component={PortLandPage} />
//       {/* <Route path="/saved-files" component={SavedFilesPage} /> */}
//       <Route path='openclose' element={<OpenCloseCards/>}/>

//       {/* <Route path='/myportfolio1' element={<Myportfolio />} /> */}
//       <Route path='/homeNavbar' element={<HomeNavbar />} />

//       {/* <Route path='/upcoming' element={<Upcoming />} /> */}
//       <Route path='/dashboard' element={<Dashboard/>}/>
//       <Route path='/statsCards' element={<StatsCards/>}/>
     
//        <Route path='/addNewModal' element={<AddNewModal/>}/>
//        <Route path='/savedDashboard'element={<SavedDashboard/>}/>
//        <Route path="/dashboard/view/:shareToken" element={<SharedDashboard />} />
//        {/* <Route path='/dashboardItem' element={<DashboardItem/>}/> */}
//       </Routes>
//       <Toaster />
//    </div>
//   )
// }

// export default App



import SignUp from './components/SignUp'
import { Routes,Route,Navigate } from 'react-router-dom'
import Home from './home/Home'
import News from './components/News'
import Support from './components/Support'
import Plan from './components/Plan'
import Offer from './components/Offer'
import Portfolio from './components/Portfolio/Portfolio.jsx'
import FAQ from './components/FAQ'
import { Toaster } from 'react-hot-toast';
import CompleteData from './components/CompleteData'
import UpdateProfile from './components/UpdateProfile'
import ProfileDrawer from './components/ProfileDrawer'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import AboutUs from './components/AboutUs'
import TermsConditions from './components/TermsConditions'
import Admin from './components/Admin'
import CompleteRegData from './components/CompleteRegData'
import UpdateIndividualProfile from './components/UpdateIndividualProfile'
import UpdateCorporateProfile from './components/UpdateCorporateProfile'
import EquityHub from './components/EquityHub/EquityHub.jsx'
import Search from './components/EquityHub/Search.jsx'
// import PortDash from './components/Portfolio/PortDash.jsx'
// import SavedFilesPage from "./components/Portfolio/SavedFilesPage";
// import PortLandPage from "./components/Portfolio/PortLandPage";
import StockTalks from './components/ChatEngine/StockTalks.jsx'
import ChatPage from './components/ChatEngine/ChatPage.jsx'
import IndividualSignUp from './components/IndividualSignUp.jsx'
import CorporateSignUp from './components/CorporateSignup.jsx'
import IndividualResetPassword from './components/IndividualResetPassword.jsx'
import CorporateResetPassword from './components/CorporateResetPassword.jsx'
import React, { useEffect, useState } from 'react'
import DashBoard from './components/DashBoard/DashBoard.jsx'

// import Dashboard from './DashBoard/DashBoard.jsx'
// import Myportfolio from './components/Portfolio/Myportfolio.jsx'
// import Mysearch from './components/EquityHub/Myserach.jsx'
import OpenCloseCards from './components/EquityHub/OpenCloseCards.jsx'

import Dashboard from './components/DashBoard/DashBoard.jsx'
import AddNewModal from './components/DashBoard/AddNewModal.jsx'
// import Upcoming from './components/Upcoming.jsx'
import HomeNavbar from './components/HomeNavbar.jsx'
import SavedDashboard from './components/DashBoard/SavedDashbord.jsx'
import PublicDashboard from './components/DashBoard/PublicDashboard.jsx'
import OAuth2RedirectHandler from './services/OAuth2RedirectHandler.jsx'
import PortLandPage from './components/Portfolio/PortLandPage.jsx'
import MyPortfolioPage from './components/Portfolio/MyPortfolioPage.jsx'
import PortfolioReplacement from './components/Portfolio/PortfolioReplacement.jsx'
import BuildOwnPort from './components/Portfolio/BuildOwnPort.jsx'

// import DashboardItem from './components/DashBoard/DashboardItem.jsx'

import { motion, AnimatePresence } from 'framer-motion';
import {  Bot, X, Maximize2, Minimize2 } from 'lucide-react';
import Draggable from 'react-draggable';
const ResetPasswordHandler = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const userType = queryParams.get("type");
  const token = queryParams.get("token");
 
  console.log("Extracted userType from URL:", userType);
  console.log("Extracted token from URL:", token);
 
  if (!userType || !token) {
    return <h2>Invalid reset link</h2>;
  }
 
  return userType === "corporate" ? (
    <CorporateResetPassword token={token} />
  ) : (
    <IndividualResetPassword token={token} />
  );
};

const App = () => {
   const [theme, setTheme] = useState('light');
 const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  useEffect(() => {
    // Detect browser theme preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Set initial theme
    setTheme(prefersDark.matches ? 'dark' : 'light');

    // Listen for future changes
    const handleChange = (e) => {
      setTheme(e.matches ? 'dark' : 'light');
    };
    prefersDark.addEventListener('change', handleChange);

    // Cleanup listener
    return () => prefersDark.removeEventListener('change', handleChange);
  }, []);
  




    const toggleChat = () => setIsChatOpen(!isChatOpen);
  
    const toggleMaximize = () => setIsMaximized(!isMaximized);
  
    // Manage popup visibility cycle
    useEffect(() => {
      if (isChatOpen) {
        setShowPopup(false); // Hide popup when chatbot is open
        return;
      }
  
      // Initial delay before showing popup
      const initialTimeout = setTimeout(() => {
        setShowPopup(true);
      }, 2000);
  
      // Cycle for showing/hiding popup
      const interval = setInterval(() => {
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 3000); // Show for 3 seconds
      }, 10000 + Math.random() * 5000); // Random interval between 10-15 seconds
  
      return () => {
        clearTimeout(initialTimeout);
        clearInterval(interval);
      };
    }, [isChatOpen]);
  
    // Handle iframe load errors
    const handleIframeError = () => {
      setIframeError(true);
    };
  

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
    }),
  };

  const bannerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const chatVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  };


  return (
  
  
  
  <div className={`app ${theme}`}>

    <Routes>
      <Route path='*' element={<Home/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/news' element={<News/>}/>
      <Route path='/support' element={<Support/>}/>
      <Route path='/plan' element={<Plan/>}/>
      <Route path='/offer' element={<Offer/>}/>
      <Route path='/portfolio' element={<Portfolio/>}/>
      <Route path='/faq' element={<FAQ/>}/>
      <Route path='/about' element={<AboutUs/>}/>
      {/* <Route path='/learning' element={<Learing/>}/> */}
      <Route path='/completeData' element={<CompleteData/>}/>
      <Route path='/completeRegData' element={<CompleteRegData/>}/>
      <Route path='/updateProfile/*' element={<UpdateProfile/>}/>
      <Route path='/profiledrawer' element={<ProfileDrawer/>}/>
      <Route path='/forgotPassword' element={<ForgotPassword/>}/>
      <Route path='/resetPassword' element={<ResetPassword/>}/>
      <Route path='/about' element={<AboutUs/>}/>
      <Route path='/terms' element={<TermsConditions/>}/>
      
      <Route path='/admin/*' element={<Admin/>}/>
       <Route path='/equityhub' element={<EquityHub/>}/>
       {/* <Route path='/mysearch' element={<Mysearch />}/> */}
      <Route path='/search' element={<Search/>}/>
       <Route path="/portDash" element={<PortLandPage />} />
            <Route path="/portDash/my-portfolio" element={<MyPortfolioPage />} />
            <Route path="/portDash/resculpt-portfolio" element={<PortfolioReplacement />} />
            <Route path="/portDash/customize-portfolio" element={<BuildOwnPort />} />
      <Route path='/stockTalks' element={<StockTalks/>}/>
      <Route path='/chatPage' element={<ChatPage/>}/>
      <Route path='/updateIndividualProfile' element={<UpdateIndividualProfile/>}/>
      {/* <Route path="/updateCorporateProfile/*" element={<UpdateCorporateProfile/>} /> */}
      <Route path='/updateCorporateProfile/*' element={<UpdateCorporateProfile/>}/>
      <Route path='/individualResetPassword' element={<IndividualResetPassword/>}/>
      <Route path='/corporateResetPassword' element={<CorporateResetPassword/>}/>
      <Route path="/reset-password" element={<ResetPasswordHandler />} />
      <Route path='/individualSignUp' element={<IndividualSignUp/>}/>
      <Route path='/corporateSignUp' element={<CorporateSignUp/>}/>
      {/* <Route path='/dashboard' element={<DashBoard/>}/> */}
      {/* <Route path='/dashboard1' element={<Dashboard />} /> */}
      {/* <Route path="/upload" component={PortLandPage} /> */}
      {/* <Route path="/saved-files" component={SavedFilesPage} /> */}
      <Route path='/openclose' element={<OpenCloseCards/>}/>

      {/* <Route path='/myportfolio1' element={<Myportfolio />} /> */}
      <Route path='/homeNavbar' element={<HomeNavbar />} />

      {/* <Route path='/upcoming' element={<Upcoming />} /> */}
      <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path="/oauth/redirect" element={<OAuth2RedirectHandler/>} />
     
       <Route path='/addNewModal' element={<AddNewModal/>}/>
        <Route path='/savedDashboard'element={<SavedDashboard/>}/>
       <Route path="/public-dashboard" element={<PublicDashboard />} />
      {/* Add this new route for QR code redirect */}
        <Route
          path="/api/dashboard/:dashId"
          element={<Navigate to={({ params }) => `/public-dashboard?dashId=${params.dashId}`} replace />}
        />
   
       {/* <Route path='/dashboardItem' element={<DashboardItem/>}/> */}
      </Routes>
      <Toaster />




         {/* Chatbot Button */}
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 bg-sky-600 text-white p-4 rounded-full shadow-lg hover:bg-sky-900 transition-colors duration-300 z-50"
          title={isChatOpen ? 'Close Chatbot' : 'Open Chatbot'}
        >
          <Bot size={24} />
        </button>
        {/* Chatbot Popup */}
        <AnimatePresence>
          {showPopup && !isChatOpen && (
            <motion.div
              className="fixed bottom-20 right-6 bg-sky-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 cursor-pointer max-w-[200px] text-sm"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={popupVariants}
              onClick={toggleChat}
              title="Click to open chatbot"
            >
             Instant Stock Analysis & Market Insights – Powered by AI
            </motion.div>
          )}
        </AnimatePresence>
        {/* Chatbot Window */}
        <AnimatePresence>
          {isChatOpen && (
            <Draggable handle=".chat-header" disabled={isMaximized}>
              <motion.div
                className={`fixed bottom-20 right-6 bg-white dark:bg-slate-800 rounded-lg shadow-2xl z-50 overflow-hidden
                  ${isMaximized ? 'top-0 left-0 w-full h-full' : 'w-[400px] h-[600px]'}`}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={chatVariants}
              >
                <div className="chat-header bg-sky-800 text-white p-2 flex justify-between items-center cursor-move">
                  <span className="font-semibold">Chatbot</span>
                  <div className="flex gap-2">
                    <button
                      onClick={toggleMaximize}
                      className="p-1 hover:bg-sky-700 rounded"
                      title={isMaximized ? 'Restore' : 'Maximize'}
                    >
                      {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                    </button>
                    <button
                      onClick={toggleChat}
                      className="p-1 hover:bg-sky-700 rounded"
                      title="Close"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
                {iframeError ? (
                  <div className="w-full h-[calc(100%-40px)] flex items-center justify-center text-center p-4 text-gray-600 dark:text-gray-300">
                    Unable to load chatbot. Please try again or access it from https://cmdahub.com/.
                  </div>
                ) : (
                  <iframe
                    src="https://cmdahub.info/"
                    className="w-full h-[calc(100%-40px)] border-none"
                    title="Chatbot"
                    referrerPolicy="strict-origin-when-cross-origin"
                    onError={handleIframeError}
                  />
                )}
              </motion.div>
            </Draggable>
          )}
        </AnimatePresence>


   </div>
  )
}

export default App