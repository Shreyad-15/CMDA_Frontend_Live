// import React from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import Banner from '../components/Banner';
// import MarketCapBanner from '../components/MarketCapBanner';

// const BannerSlider = () => {
//     const settings = {
//         dots: true,
//         infinite: true,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         autoplay: true,
//         autoplaySpeed: 7000,
//         pauseOnHover: true,
//         pauseOnDotsHover: true,
//         arrows: true,
//         adaptiveHeight: true,
//         fade: true,
//         speed: 1000,
//         cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
//         appendDots: (dots) => (
//             <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0">
//                 <ul className="flex justify-center space-x-2 sm:space-x-3 md:space-x-4 backdrop-blur-sm bg-black/10 rounded-full py-2 px-3 mx-auto w-max">{dots}</ul>
//             </div>
//         ),
//         customPaging: (i) => (
//             <button
//                 className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-white/60 hover:bg-white transition-all duration-300 transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 aria-label={`Go to slide ${i + 1}`}
//             ></button>
//         ),
//     };

//     return (
//         <div className="relative w-full min-h-screen mx-auto overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
//             <div className="mt-10 slider-container min-h-full">
//                 <Slider {...settings}>
//                     <div className="w-full relative">
//                         <div
//                             className="absolute inset-0 z-10"
//                             style={{
//                                 background: 'linear-gradient(135deg, rgba(157, 240, 212, 0.15) 0%, rgba(255, 252, 252, 0.25) 50%, transparent 100%)',
//                                 animation: 'gradientShift 12s ease infinite',
//                             }}
//                         ></div>
//                         <Banner />
//                     </div>
//                     <div className="w-full relative">
//                         <div
//                             className="absolute inset-0 z-10"
//                             style={{
//                                 background: 'linear-gradient(135deg, rgba(197, 239, 247, 0.15) 0%, rgba(161, 233, 255, 0.25) 50%, transparent 100%)',
//                                 animation: 'gradientShift 12s ease infinite',
//                             }}
//                         ></div>
//                         <div className="mt-50 p-6 min-h-[800px]">
//                             <MarketCapBanner />
//                         </div>
//                     </div>
//                 </Slider>
//             </div>

//             <style jsx global>{`
//         .slick-prev,
//         .slick-next {
//           z-index: 20;
//           width: 48px;
//           height: 48px;
//           background: rgba(255, 255, 255, 0.85);
//           border-radius: 20%;
//           transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//           display: flex !important;
//           align-items: center;
//           justify-content: center;
//           box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
//           backdrop-filter: blur(10px);
//           -webkit-backdrop-filter: blur(10px);
//           border: 1px solid rgba(255, 255, 255, 0.5);
//         }

//         .slick-prev:before,
//         .slick-next:before {
//           font-family: 'slick';
//           font-size: 22px;
//           line-height: 1;
//           opacity: 0.8;
//           color: #334155;
//           -webkit-font-smoothing: antialiased;
//           -moz-osx-font-smoothing: grayscale;
//           font-weight: bold;
//           transition: all 0.2s ease;
//         }

//         .slick-prev:hover,
//         .slick-next:hover,
//         .slick-prev:focus,
//         .slick-next:focus {
//           background: rgba(255, 255, 255, 0.95);
//           transform: translateY(-2px) scale(1.05);
//           outline: none;
//           box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
//         }

//         .slick-prev:hover:before,
//         .slick-next:hover:before {
//           opacity: 1;
//           color: #0f172a;
//           transform: scale(1.1);
//         }

//         .slick-prev { 
//           left: 1.5rem; 
//         }

//         .slick-next { 
//           right: 1.5rem; 
//         }

//         .slick-dots { 
//           bottom: 1.5rem; 
//         }

//         .slick-dots li {
//           width: 12px;
//           height: 12px;
//           margin: 0 5px;
//           transition: all 0.3s ease;
//         }

//         .slick-dots li button {
//           width: 12px;
//           height: 12px;
//           padding: 0;
//           border-radius: 50%;
//           background: rgba(90, 88, 88, 0.6);
//           transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         .slick-dots li button:before {
//           display: none;
//         }

//         .slick-dots li.slick-active button {
//           opacity: 1;
//           background: #ffffff;
//           transform: scale(1.2);
//           box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
//         }

//         .slick-dots li button:hover {
//           background: rgba(255, 255, 255, 0.9);
//           transform: scale(1.2);
//         }

//         .slick-slide > div { 
//           display: flex; 
//           align-items: center; 
//           justify-content: center; 
//         }

//         .slick-track, .slick-list { 
//           height: auto !important; 
//         }

//         /* Dark mode support */
//         .dark .slick-prev,
//         .dark .slick-next {
//           background: rgba(30, 41, 59, 0.8);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//         }

//         .dark .slick-prev:before,
//         .dark .slick-next:before {
//           color: #cbd5e1;
//         }

//         .dark .slick-dots li button {
//           background: rgba(255, 255, 255, 0.3);
//         }

//         .dark .slick-dots li.slick-active button {
//           background: #e2e8f0;
//           box-shadow: 0 0 0 2px rgba(226, 232, 240, 0.5);
//         }

//         @keyframes gradientShift {
//           0% { background-position: 0% 0%; }
//           50% { background-position: 100% 100%; }
//           100% { background-position: 0% 0%; }
//         }

//         @keyframes gradientFlow {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }

//         /* Enhanced focus styles for accessibility */
//         .slick-prev:focus-visible,
//         .slick-next:focus-visible {
//           outline: 2px solid #3b82f6;
//           outline-offset: 2px;
//         }

//         /* Responsive adjustments */
//         @media (max-width: 640px) {
//           .slick-prev, .slick-next { 
//             width: 40px; 
//             height: 40px; 
//           }

//           .slick-prev { 
//             left: 0.75rem; 
//           }

//           .slick-next { 
//             right: 0.75rem; 
//           }

//           .slick-prev:before, .slick-next:before { 
//             font-size: 18px; 
//           }

//           .slick-dots { 
//             bottom: 1rem; 
//           }
//         }

//         @media (min-width: 1024px) {
//           .slick-prev, .slick-next { 
//             width: 52px; 
//             height: 52px; 
//           }

//           .slick-prev { 
//             left: 2rem; 
//           }

//           .slick-next { 
//             right: 2rem; 
//           }

//           .slick-prev:before, .slick-next:before { 
//             font-size: 24px; 
//           }
//         }

//         /* Animation for slide transitions */
//         .slick-slide {
//           transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease;
//         }

//         /* Active slide enhancement */
//         .slick-slide.slick-active {
//           opacity: 1;
//           transform: scale(1);
//           z-index: 1;
//         }

//         /* New styles for MarketCapBanner */
//         .min-h-[400px] {
//           min-height: 400px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//         .p-6 {
//           padding: 1.5rem;
//         }
//       `}</style>
//         </div>
//     );
// };

// export default BannerSlider;




import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Banner from '../components/Banner';
import MarketCapBanner from '../components/MarketCapBanner';

const BannerSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    arrows: true,
    adaptiveHeight: true,
    fade: true,
    speed: 1000,
    cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    appendDots: (dots) => (
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0">
        <ul className="flex justify-center space-x-2 sm:space-x-3 md:space-x-4 backdrop-blur-sm bg-black/10 rounded-full py-2 px-3 mx-auto w-max">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <button
        className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-white/60 hover:bg-white transition-all duration-300 transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label={`Go to slide ${i + 1}`}
      ></button>
    ),
  };

  return (
    <div className="relative w-full min-h-screen mx-auto overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="slider-container min-h-full">
        <Slider {...settings}>
          {/* Banner Slide */}
          <div className="w-full relative">
            <div
              className="absolute inset-0 z-10"
              style={{
                background: 'linear-gradient(135deg, rgba(157, 240, 212, 0.15) 0%, rgba(255, 252, 252, 0.25) 50%, transparent 100%)',
                animation: 'gradientShift 12s ease infinite',
              }}
            ></div>
            <div className="flex items-center justify-center min-h-screen p-4 md:p-8">
              <Banner />
            </div>
          </div>

          {/* MarketCapBanner Slide */}
          <div className="w-full relative">
            <div
              className="absolute inset-0 z-10"
              style={{
                background: 'linear-gradient(135deg, rgba(197, 239, 247, 0.15) 0%, rgba(161, 233, 255, 0.25) 50%, transparent 100%)',
                animation: 'gradientShift 12s ease infinite',
              }}
            ></div>
            <div className="flex items-center justify-center min-h-screen p-4 md:p-8">
              <MarketCapBanner />
            </div>
          </div>
        </Slider>
      </div>

      <style jsx global>{`
        .slick-prev,
        .slick-next {
          z-index: 20;
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.85);
          border-radius: 20%;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex !important;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        .slick-prev:before,
        .slick-next:before {
          font-family: 'slick';
          font-size: 22px;
          line-height: 1;
          opacity: 0.8;
          color: #334155;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-weight: bold;
          transition: all 0.2s ease;
        }

        .slick-prev:hover,
        .slick-next:hover,
        .slick-prev:focus,
        .slick-next:focus {
          background: rgba(255, 255, 255, 0.95);
          transform: translateY(-2px) scale(1.05);
          outline: none;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
        }

        .slick-prev:hover:before,
        .slick-next:hover:before {
          opacity: 1;
          color: #0f172a;
          transform: scale(1.1);
        }

        .slick-prev { 
          left: 1.5rem; 
        }
        
        .slick-next { 
          right: 1.5rem; 
        }
        
        .slick-dots { 
          bottom: 1.5rem; 
        }
        
        .slick-dots li {
          width: 12px;
          height: 12px;
          margin: 0 5px;
          transition: all 0.3s ease;
        }
        
        .slick-dots li button {
          width: 12px;
          height: 12px;
          padding: 0;
          border-radius: 50%;
          background: rgba(90, 88, 88, 0.6);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .slick-dots li button:before {
          display: none;
        }
        
        .slick-dots li.slick-active button {
          opacity: 1;
          background: #ffffff;
          transform: scale(1.2);
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
        }
        
        .slick-dots li button:hover {
          background: rgba(255, 255, 255, 0.9);
          transform: scale(1.2);
        }
        
        .slick-slide > div { 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          height: 100%;
        }
        
        .slick-track, .slick-list { 
          height: 100% !important; 
        }

        /* Dark mode support */
        .dark .slick-prev,
        .dark .slick-next {
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .dark .slick-prev:before,
        .dark .slick-next:before {
          color: #cbd5e1;
        }
        
        .dark .slick-dots li button {
          background: rgba(255, 255, 255, 0.3);
        }
        
        .dark .slick-dots li.slick-active button {
          background: #e2e8f0;
          box-shadow: 0 0 0 2px rgba(226, 232, 240, 0.5);
        }

        @keyframes gradientShift {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }

        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Enhanced focus styles for accessibility */
        .slick-prev:focus-visible,
        .slick-next:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .slick-prev, .slick-next { 
            width: 40px; 
            height: 40px; 
          }
          
          .slick-prev { 
            left: 0.75rem; 
          }
          
          .slick-next { 
            right: 0.75rem; 
          }
          
          .slick-prev:before, .slick-next:before { 
            font-size: 18px; 
          }
          
          .slick-dots { 
            bottom: 1rem; 
          }
        }

        @media (min-width: 1024px) {
          .slick-prev, .slick-next { 
            width: 52px; 
            height: 52px; 
          }
          
          .slick-prev { 
            left: 2rem; 
          }
          
          .slick-next { 
            right: 2rem; 
          }
          
          .slick-prev:before, .slick-next:before { 
            font-size: 24px; 
          }
        }

        /* Animation for slide transitions */
        .slick-slide {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease;
        }

        /* Active slide enhancement */
        .slick-slide.slick-active {
          opacity: 1;
          transform: scale(1);
          z-index: 1;
        }
      `}</style>
    </div>
  );
};

export default BannerSlider;