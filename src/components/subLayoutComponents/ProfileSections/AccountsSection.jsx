import React, { useState } from "react";
import { User, Mail, Edit2, Camera, Check, X } from "lucide-react";
import { motion } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

const AccountsSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const user = useSelector((state) => state.user);

  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john@example.com",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  });

  const [editData, setEditData] = useState(userData);

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Account Settings</h2>
        <p className="text-gray-400">
          Manage your account information and preferences
        </p>
      </div>

      {/* Profile Card - Changed to Obsidian Black & Yellow border */}
      <div className="bg-[#0A0A0A] border border-[#FFD600]/20 rounded-xl p-6 mb-6 shadow-2xl">
        <div className="flex items-start gap-6">
          {/* Profile Image */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#FFD600]/40 bg-[#FFD600]/10">
              <img
                src={userData.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {!isEditing && (
              <button className="absolute bottom-0 right-0 bg-[#FFD600] p-2 rounded-full hover:bg-[#FFD600]/90 transition-colors duration-200 shadow-lg">
                <Camera className="w-4 h-4 text-black" />
              </button>
            )}
          </motion.div>

          {/* User Info */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <div>
                <p className="text-sm text-gray-500 mb-1">Full Name</p>
                {/* <p className="text-lg font-semibold text-white">{user?.name}</p> */}
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email Address</p>
                <p className="text-lg font-semibold text-white">
                  {/* {user?.email} */}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Additional Settings - Keeping theme consistency for commented section */}
      {/* <div className="space-y-4">
    <div className="bg-[#0A0A0A] border border-[#FFD600]/10 rounded-xl p-4 flex items-center justify-between hover:border-[#FFD600]/30 transition-colors duration-200">
      <div>
        <p className="text-white font-medium">Email Notifications</p>
        <p className="text-sm text-gray-500">
          Receive email updates about your account
        </p>
      </div>
      <input type="checkbox" defaultChecked className="w-5 h-5 rounded accent-[#FFD600]" />
    </div>
  </div> */}
    </motion.div>
  );
};

export default AccountsSection;
