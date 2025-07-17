import { useEffect } from "react";
import { useThemeStore } from '../store/useThemeStore';
import { Moon, Sun, Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  // Sync document theme with selected theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-grey-500 to-white-700 pt-20 pb-10 px-4 overflow-hidden">
      {/* Animated background dots */}
      <div className="fixed inset-0 overflow-hidden opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-float"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10 transform transition-transform duration-300 hover:scale-[1.01]">
        <div className="bg-white/50 backdrop-blur-sm rounded-3xl shadow-sm overflow-hidden border border-gray-100 relative transition-all duration-200 hover:shadow-md group hover:border-gray-200">
          <div className="p-8 text-gray-800">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            
            {/* Theme Settings */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Appearance</h2>
                  <p className="text-gray-600">Customize how ChatApp looks on your device</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Theme Toggle Card */}
                <div className="bg-gray-60 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    {theme === 'light' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    Theme
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
                    <label className="swap swap-rotate cursor-pointer">
                      <input
                        type="checkbox"
                        checked={theme === "dark"}
                        onChange={toggleTheme}
                      />
                      <Sun className="swap-off w-6 h-6" />
                      <Moon className="swap-on w-6 h-6" />
                    </label>
                  </div>
                </div>

                {/* Preview Card */}
                <div className="bg-gray-60 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <h3 className="text-lg font-medium mb-4">Preview</h3>
                  <div className="rounded-lg border border-gray-200 overflow-hidden bg-white" data-theme={theme}>
                    <div className="p-3">
                      <div className="max-w-xs mx-auto">
                        {/* Mini Chat Preview */}
                        <div className="space-y-2">
                          {PREVIEW_MESSAGES.map((message) => (
                            <div
                              key={message.id}
                              className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-[80%] rounded-lg p-2 text-sm ${
                                  message.isSent
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-black"
                                }`}
                              >
                                {message.content}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Full Preview Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Full Preview</h2>
              <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm" data-theme={theme}>
                <div className="p-4 bg-gray-100">
                  <div className="max-w-lg mx-auto">
                    {/* Mock Chat UI */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                      {/* Chat Header */}
                      <div className="px-4 py-3 border-b border-gray-200 bg-white">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                            J
                          </div>
                          <div>
                            <h3 className="font-medium text-sm text-black">John Doe</h3>
                            <p className="text-xs text-gray-500">Online</p>
                          </div>
                        </div>
                      </div>

                      {/* Chat Messages */}
                      <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-white">
                        {PREVIEW_MESSAGES.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-xl p-3 shadow-sm ${
                                message.isSent
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-100 text-black"
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p
                                className={`text-[10px] mt-1.5 ${
                                  message.isSent
                                    ? "text-blue-100"
                                    : "text-gray-500"
                                }`}
                              >
                                12:00 PM
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Chat Input */}
                      <div className="p-4 border-t border-gray-200 bg-white">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            className="input input-bordered flex-1 text-sm h-10 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            placeholder="Type a message..."
                            value="This is a preview"
                            readOnly
                          />
                          <button className="btn btn-primary h-10 min-h-0 bg-blue-500 border-blue-500 hover:bg-blue-600">
                            <Send size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add these to your Tailwind config for animations */}
      <style jsx global>{`
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

export default SettingsPage;

// import { THEMES } from "../constants";
// import { useThemeStore } from '../store/useThemeStore';
// import { Send } from "lucide-react";

// const PREVIEW_MESSAGES = [
//   { id: 1, content: "Hey! How's it going?", isSent: false },
//   { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
// ];

// const SettingsPage = () => {
//   const { theme, setTheme } = useThemeStore();
  
//   return (
//     <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
//       <div className="space-y-6">
//         <div className="flex flex-col gap-1">
//           <h2 className="text-lg font-semibold">Theme</h2>
//           <p className="text-sm text-base-content/70">Choose a theme for your chat interface</p>
//         </div>

//         <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
//           {THEMES.map((t) => (
//             <button
//               key={t}
//               className={`
//                 group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
//                 ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
//               `}
//               onClick={() => setTheme(t)}
//             >
//               <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
//                 <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
//                   <div className="rounded bg-primary"></div>
//                   <div className="rounded bg-secondary"></div>
//                   <div className="rounded bg-accent"></div>
//                   <div className="rounded bg-neutral"></div>
//                 </div>
//               </div>
//               <span className="text-[11px] font-medium truncate w-full text-center">
//                 {t.charAt(0).toUpperCase() + t.slice(1)}
//               </span>
//             </button>
//           ))}
//         </div>

//         {/* Preview Section */}
//         <h3 className="text-lg font-semibold mb-3">Preview</h3>
//         <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
//           <div className="p-4 bg-base-200">
//             <div className="max-w-lg mx-auto">
//               {/* Mock Chat UI */}
//               <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
//                 {/* Chat Header */}
//                 <div className="px-4 py-3 border-b border-base-300 bg-base-100">
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
//                       J
//                     </div>
//                     <div>
//                       <h3 className="font-medium text-sm">John Doe</h3>
//                       <p className="text-xs text-base-content/70">Online</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Chat Messages */}
//                 <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
//                   {PREVIEW_MESSAGES.map((message) => (
//                     <div
//                       key={message.id}
//                       className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
//                     >
//                       <div
//                         className={`
//                           max-w-[80%] rounded-xl p-3 shadow-sm
//                           ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}
//                         `}
//                       >
//                         <p className="text-sm">{message.content}</p>
//                         <p
//                           className={`
//                             text-[10px] mt-1.5
//                             ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}
//                           `}
//                         >
//                           12:00 PM
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Chat Input */}
//                 <div className="p-4 border-t border-base-300 bg-base-100">
//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       className="input input-bordered flex-1 text-sm h-10"
//                       placeholder="Type a message..."
//                       value="This is a preview"
//                       readOnly
//                     />
//                     <button className="btn btn-primary h-10 min-h-0">
//                       <Send size={18} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default SettingsPage;