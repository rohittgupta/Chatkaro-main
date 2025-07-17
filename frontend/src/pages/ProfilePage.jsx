import { useState, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, CheckCircle, Edit, Sparkles, ChevronRight, Check, X } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(authUser?.fullName || "");
  const nameInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const handleEditName = () => {
    setIsEditingName(true);
    setNewName(authUser?.fullName || "");
    // Focus the input field after a small delay to ensure it's rendered
    setTimeout(() => nameInputRef.current?.focus(), 100);
  };

  const handleSaveName = async () => {
    if (newName.trim() && newName !== authUser?.fullName) {
      await updateProfile({ fullName: newName.trim() });
    }
    setIsEditingName(false);
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
    setNewName(authUser?.fullName || "");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-grey-900 to-white-900 pt-20 pb-10 px-4 overflow-hidden">
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
          {/* Profile Header */}
          <div className="relative h-48 bg-gray-60">
            <div className="absolute -bottom-16 left-8 transition-transform duration-500 group-hover:-translate-y-2">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gray-300 blur-lg opacity-40 group-hover:opacity-70 transition-all duration-500" />
                <div className="relative size-32 rounded-full border-4 border-white shadow-xl overflow-hidden z-10">
                  <img
                    src={selectedImg || authUser.profilePic || "/avatar.png"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className={`absolute inset-0 flex items-center justify-center 
                                bg-black/30 rounded-full cursor-pointer 
                                opacity-0 group-hover:opacity-100 transition-all duration-300 z-20
                                ${isUpdatingProfile ? "animate-pulse" : ""}`}
                  >
                    <div className="bg-gray-600 p-3 rounded-full hover:scale-110 transition-transform">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                    <input
                      type="file"
                      id="avatar-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUpdatingProfile}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-24 px-8 pb-8 text-gray-800">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-4">
              <div>
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      ref={nameInputRef}
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="text-4xl font-bold border-b-2 border-blue-500 focus:outline-none bg-transparent"
                    />
                    <div className="flex gap-1">
                      <button 
                        onClick={handleSaveName}
                        className="p-1 text-green-600 hover:bg-green-100 rounded-full transition-colors"
                        disabled={isUpdatingProfile}
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={handleCancelEdit}
                        className="p-1 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <h1 className="text-4xl font-bold flex items-center gap-3">
                    {authUser?.fullName}
                  </h1>
                )}
                <p className="text-gray-600 flex items-center gap-2 mt-2">
                  <Mail className="w-5 h-5" />
                  {authUser?.email}
                </p>
              </div>

              {!isEditingName && (
                <button 
                  onClick={handleEditName}
                  className="btn btn-sm bg-gray-600 text-white border border-gray-500 hover:bg-gray-500 hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Info */}
              <div className="bg-gray-60 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <h2 className="text-xl font-semibold mb-5 flex items-center gap-2 text-gray-800">
                  <User className="w-5 h-5 text-gray-500" />
                  Personal Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Full Name</p>
                    {isEditingName ? (
                      <div className="px-4 py-3 bg-gray-100 rounded-lg border border-gray-200">
                        <input
                          type="text"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          className="w-full bg-transparent focus:outline-none font-medium"
                        />
                      </div>
                    ) : (
                      <p className="px-4 py-3 bg-gray-100 rounded-lg border border-gray-200 text-gray-800 font-medium">
                        {authUser?.fullName}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Email Address</p>
                    <p className="px-4 py-3 bg-gray-100 rounded-lg border border-gray-200 text-gray-800 font-medium">
                      {authUser?.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Account Info */}
              <div className="bg-gray-60 backdrop-blur-sm rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <h2 className="text-xl font-semibold mb-5 flex items-center gap-2 text-gray-800">
                  <CheckCircle className="w-5 h-5 text-gray-500" />
                  Account Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>Member Since</span>
                    </div>
                    <span className="font-medium text-gray-800">
                      {new Date(authUser.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-gray-500">Account Status</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-green-600 border border-green-500 hover:scale-105 transition-transform flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Verified
                    </span>
                  </div>
                  <div className="pt-2">
                    <button className="text-sm text-gray-500 flex items-center gap-1 w-full justify-end hover:translate-x-1 transition-transform">
                      View full details <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="mt-8 text-center">
              <p
                className={`text-sm ${
                  isUpdatingProfile
                    ? "text-gray-500 animate-pulse flex items-center justify-center gap-2"
                    : "text-gray-400"
                }`}
              >
                {isUpdatingProfile ? (
                  <>
                    <span className="inline-block animate-spin">⚡</span>
                    {isEditingName ? "Updating your profile..." : "Optimizing your new profile picture..."}
                  </>
                ) : (
                  ""
                )}
              </p>
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

export default ProfilePage;