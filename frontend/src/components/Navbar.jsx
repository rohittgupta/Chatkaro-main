import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User, ChevronDown, Sparkles } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-white/50 backdrop-blur-sm border-b border-gray-200 fixed w-full top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <Link 
              to="/" 
              className="flex items-center gap-2.5 group"
              onMouseEnter={() => setIsHoveringLogo(true)}
              onMouseLeave={() => setIsHoveringLogo(false)}
            >
              <div>
                <img 
                  src="/images/chat-svgrepo-com.svg" 
                  alt="Message" 
                  className="w-10 h-10"
                />
              </div>
              <div className="flex items-center gap-1">
                <h1 className="text-xl font-bold  from-black-600 to-blue-400 bg-clip-text">
                  ChatKaro
                </h1>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            {authUser && (
              <>
                <Link
                  to="/settings"
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                    text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all
                    relative overflow-hidden group
                  `}
                >
                  <Settings className="w-5 h-5" />
                  <span className="hidden sm:inline">Settings</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </Link>

                <div className="relative">
                  <button 
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                      text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all
                    `}
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <div className="size-7 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                      {authUser.profilePic ? (
                        <img src={authUser.profilePic} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <span className="hidden sm:inline">{authUser.fullName || "Profile"}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                        onClick={() => setShowDropdown(false)}
                      >
                        <User className="w-4 h-4 text-blue-500" />
                        <span>Your Profile</span>
                      </Link>
                      <button 
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 w-full transition-colors"
                        onClick={() => {
                          logout();
                          setShowDropdown(false);
                        }}
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowDropdown(false)}
        />
      )}
    </header>
  );
};

export default Navbar;




// import { Link } from "react-router-dom";
// import { useAuthStore } from "../store/useAuthStore";
// import { LogOut, MessageSquare, Settings, User } from "lucide-react";

// const Navbar = () => {
//   const { logout, authUser } = useAuthStore();

//   return (
//     <header
//       className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
//     backdrop-blur-lg bg-base-100/80"
//     >
//       <div className="container mx-auto px-4 h-16">
//         <div className="flex items-center justify-between h-full">
//           <div className="flex items-center gap-8">
//             <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
//               <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
//                 {/* <MessageSquare className="w-5 h-5 text-primary" /> */}
//                 <img src="/images/chat-svgrepo-com.svg" alt="Message"  />
//               </div>
//               <h1 className="text-lg font-bold">ChatKaro</h1>
//             </Link>
//           </div>

//           <div className="flex items-center gap-2">
//             <Link
//               to={"/settings"}
//               className={`
//               btn btn-sm gap-2 transition-colors
              
//               `}
//             >
//               <Settings className="w-4 h-4" />
//               {/* <img src="/images/settings-svgrepo-com.svg" alt="Settings" className="w-4 h-4" /> */}
//               <span className="hidden sm:inline">Settings</span>
//             </Link>

//             {authUser && (
//               <>
//                 <Link to={"/profile"} className={`btn btn-sm gap-2`}>
//                   <User className="size-4" />
//                   <span className="hidden sm:inline">Profile</span>
//                 </Link>

//                 <button className="flex gap-2 items-center" onClick={logout}>
//                   <LogOut className="size-5" />
//                   <span className="hidden sm:inline">Logout</span>
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };
// export default Navbar;