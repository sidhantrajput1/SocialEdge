import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Bell, FileText, House, MessageCircle, User } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  console.log(user);

  return (
    <div className="w-[250px] border-r  h-screen">
      <div className="p-4 flex flex-col justify-between h-full">
        {/*  logo section */}
        <h3 className="font-bold text-2xl cursor-pointer">SidSpace</h3>
        {/* nav items */}
        <nav className="">
          <ul className="flex flex-col gap-5">
            <NavLink
              to="/"
              className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-100"
            >
              <House className="w-5 h-5" />
              <span className="font-medium ">Home</span>
            </NavLink>

            <NavLink
              to="/posts"
              className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-100"
            >
              <FileText className="w-5 h-5" />
              <span className="font-medium ">Posts</span>
            </NavLink>

            <NavLink
              to="/messages"
              className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-100"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">Messages</span>
            </NavLink>

            <NavLink
              to="/notifications"
              className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-100"
            >
              <Bell className="w-5 h-5" />
              <span className="font-medium ">Notification</span>
            </NavLink>

            <NavLink
              to="/profile"
              className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-100"
            >
              <User className="w-5 h-5" />
              <span className="font-medium ">Profile</span>
            </NavLink>
          </ul>
        </nav>

        <div className="">
          {/* profile and logout */}
          <div className="flex items-center gap-3">
            <img
              src={
                user?.avatar ||
                "https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
              }
              alt="profile"
              className="rounded-full w-8 h-8"
            />

            <div>
              <p className="font-semibold">{user?.name}</p>
              {/* <p className="text-sm text-gray-500">{user?.username}</p> */}

              <p
                className="text-sm text-gray-500 cursor-pointer"
                onClick={logout}
              >
                Logout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
