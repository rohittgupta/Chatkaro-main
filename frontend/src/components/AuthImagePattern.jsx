const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center h-full bg-gradient-to-br from-blue-50 to-blue-100 p-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-blue-400 rounded-full animate-float"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 25 + 15}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-md text-center relative z-10">
        {/* Animated grid pattern */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-xl bg-white/80 backdrop-blur-sm border border-white shadow-sm transition-all duration-500 hover:shadow-md ${
                i % 2 === 0 ? 'transform hover:-translate-y-1' : 'transform hover:translate-y-1'
              }`}
            />
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-gray-600 text-lg mb-8">{subtitle}</p>

        {/* Decorative chat bubbles */}
        <div className="flex justify-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-sm border border-white shadow-md flex items-center justify-center transform rotate-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8 text-blue-500"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-sm border border-white shadow-md flex items-center justify-center transform -rotate-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8 text-blue-500"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        .animate-float {
          animation: float var(--duration) infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default AuthImagePattern;


// const AuthImagePattern = ({ title, subtitle }) => {
//     return (
//       <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
//         <div className="max-w-md text-center">
//           <div className="grid grid-cols-3 gap-3 mb-8">
//             {[...Array(9)].map((_, i) => (
//               <div
//                 key={i}
//                 className={`aspect-square rounded-2xl bg-primary/10 ${
//                   i % 2 === 0 ? "animate-pulse" : ""
//                 }`}
//               />
//             ))}
//           </div>
//           <h2 className="text-2xl font-bold mb-4">{title}</h2>
//           <p className="text-base-content/60">{subtitle}</p>
//         </div>
//       </div>
//     );
//   };
  
//   export default AuthImagePattern;