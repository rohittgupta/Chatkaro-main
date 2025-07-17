import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, MoreHorizontal, Search, UserX, LogOut } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUserLoading } = useChatStore();
  const { onlineUsers, currentUser } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const safeUsers = Array.isArray(users) ? users : [];
  
  const filteredUsers = safeUsers.filter(user => {
    const matchesSearch = user.fullName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOnline = !showOnlineOnly || onlineUsers.includes(user._id);
    return matchesSearch && matchesOnline;
  });

  if (isUserLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-80 border-r border-base-300 flex flex-col transition-all duration-200 ease-in-out bg-base-200">
      {/* Header section */}
      <div className="border-b border-base-300 w-full p-4 lg:p-5 bg-base-100/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="size-6 text-primary" />
            <span className="font-semibold hidden lg:block text-lg">Contacts</span>
          </div>
          <button className="p-1 rounded-full hover:bg-base-300 transition-colors lg:hidden">
            <MoreHorizontal className="size-5" />
          </button>
        </div>
        
        {/* Online filter toggle */}
        <div className="mt-3 hidden lg:flex items-center justify-between">
          <label className="cursor-pointer flex items-center gap-2 group">
            <div className="relative">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-base-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
            </div>
            <span className="text-sm font-medium group-hover:text-primary transition-colors">
              Online only
            </span>
          </label>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            {onlineUsers.length} online
          </span>
        </div>
        
        {/* Search bar */}
        <div className="mt-3 hidden lg:block relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm bg-base-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      {/* Contacts list */}
      <div className="overflow-y-auto w-full flex-1 custom-scrollbar">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full p-2 lg:p-3 flex items-center gap-3 relative
                hover:bg-base-300/50 active:scale-[0.98] transition-all
                ${selectedUser?._id === user._id ? "bg-primary/10 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-primary before:rounded-r" : ""}
              `}
            >
              <div className="relative mx-auto lg:mx-0 shrink-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName || "User"}
                  className="size-10 lg:size-12 object-cover rounded-full border-2 border-base-100 hover:border-primary transition-colors"
                />
                {onlineUsers.includes(user._id) ? (
                  <span
                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                    rounded-full ring-2 ring-base-200 animate-pulse"
                  />
                ) : (
                  <span
                    className="absolute bottom-0 right-0 size-3 bg-zinc-400 
                    rounded-full ring-2 ring-base-200"
                  />
                )}
              </div>

              {/* User info */}
              <div className="hidden lg:block text-left min-w-0 flex-1">
                <div className="font-medium truncate flex items-center justify-between">
                  <span>{user.fullName}</span>
                  {user.unreadCount > 0 && (
                    <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                      {user.unreadCount}
                    </span>
                  )}
                </div>
                <div className="text-sm text-zinc-400 flex items-center justify-between">
                  <span className="truncate">
                    {user.lastMessage?.substring(0, 20) || "No messages yet"}
                  </span>
                  <span className="text-xs">
                    {onlineUsers.includes(user._id) ? (
                      <span className="flex items-center gap-1">
                        <span className="size-2 bg-green-500 rounded-full animate-pulse"></span>
                        Online
                      </span>
                    ) : (
                      "Offline"
                    )}
                  </span>
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center p-4 text-center">
            <UserX className="size-10 text-zinc-400 mb-2" />
            <p className="text-zinc-500 font-medium">No contacts found</p>
            <p className="text-zinc-400 text-sm mt-1">
              {showOnlineOnly ? "Try disabling online filter" : "Start a new conversation"}
            </p>
            {showOnlineOnly && (
              <button
                onClick={() => setShowOnlineOnly(false)}
                className="mt-3 text-sm text-primary hover:underline"
              >
                Show all contacts
              </button>
            )}
          </div>
        )}
      </div>

      {/* User profile footer */}
      {currentUser && (
        <div className="border-t border-base-300 w-full p-3 hidden lg:block">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={currentUser.profilePic || "/avatar.png"}
                alt={currentUser.fullName || "You"}
                className="size-10 object-cover rounded-full border-2 border-primary/50"
              />
              <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-base-200"></span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{currentUser.fullName || "You"}</div>
              <div className="text-xs text-zinc-400 flex items-center gap-1">
                <span className="size-2 bg-green-500 rounded-full animate-pulse"></span>
                Online
              </div>
            </div>
            <button className="p-1 rounded-full hover:bg-base-300 transition-colors">
              <LogOut className="size-5 text-zinc-400" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;


// <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
    //   <div className="border-b border-base-300 w-full p-5">
    //     <div className="flex items-center gap-2">
    //       <Users className="size-6" />
    //       <span className="font-medium hidden lg:block">Contacts</span>
    //     </div>
    //     {/* TODO: Online filter toggle */}
    //     <div className="mt-3 hidden lg:flex items-center gap-2">
    //       <label className="cursor-pointer flex items-center gap-2">
    //         <input
    //           type="checkbox"
    //           checked={showOnlineOnly}
    //           onChange={(e) => setShowOnlineOnly(e.target.checked)}
    //           className="checkbox checkbox-sm"
    //         />
    //         <span className="text-sm">Show online only</span>
    //       </label>
    //       <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
    //     </div>
    //   </div>

    //   <div className="overflow-y-auto w-full py-3">
    //     {filteredUsers.map((user) => (
    //       <button
    //         key={user._id}
    //         onClick={() => setSelectedUser(user)}
    //         className={`
    //           w-full p-3 flex items-center gap-3
    //           hover:bg-base-300 transition-colors
    //           ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
    //         `}
    //       >
    //         <div className="relative mx-auto lg:mx-0">
    //           <img
    //             src={user.profilePic || "/avatar.png"}
    //             alt={user.name}
    //             className="size-12 object-cover rounded-full"
    //           />
    //           {onlineUsers.includes(user._id) && (
    //             <span
    //               className="absolute bottom-0 right-0 size-3 bg-green-500 
    //               rounded-full ring-2 ring-zinc-900"
    //             />
    //           )}
    //         </div>

    //         {/* User info - only visible on larger screens */}
    //         <div className="hidden lg:block text-left min-w-0">
    //           <div className="font-medium truncate">{user.fullName}</div>
    //           <div className="text-sm text-zinc-400">
    //             {onlineUsers.includes(user._id) ? "Online" : "Offline"}
    //           </div>
    //         </div>
    //       </button>
    //     ))}

    //     {filteredUsers.length === 0 && (
    //       <div className="text-center text-zinc-500 py-4">No online users</div>
    //     )}
    //   </div>
    // </aside>