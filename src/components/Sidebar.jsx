import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Star,
  Building2,
  Menu,
  X,
  Users,
  LayoutDashboard,
  LogOut,
  Images,
} from "lucide-react";
import logo from "../assets/logo.png";

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAdmin(localStorage.getItem("isAdmin") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    navigate("/");
    window.dispatchEvent(new Event("storage"));
  };

  const baseMenu = [
    { name: "Home", path: "/", icon: <Home className="w-5 h-5" /> },
    { name: "Options", path: "/options", icon: <Star className="w-5 h-5" /> },
    { name: "Showcase", path: "/showcase", icon: <Users className="w-5 h-5" /> },
    { name: "Company", path: "/company", icon: <Building2 className="w-5 h-5" /> },
  ];

  const menuItems = isAdmin
    ? [
        ...baseMenu,
        {
          name: "Dashboard",
          path: "/dashboard",
          icon: <LayoutDashboard className="w-5 h-5" />,
        },
        { name: "Gallery", path: "/gallery", icon: <Images className="w-5 h-5" /> },
      ]
    : baseMenu;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-md lg:hidden shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-gray-200 w-64 h-screen p-6 flex flex-col gap-8 shadow-xl
          fixed top-0 left-0 transform transition-transform duration-300 z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0`}
      >
        {/* Logo + Heading */}
        <div className="flex flex-col items-center gap-3">
          <img src={logo} alt="IMC Logo" className="w-16 h-16 object-contain" />

          <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700 text-center leading-tight">
  IMC Business Solutions
</h1>

        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 mt-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                pathname === item.path
                  ? "bg-teal-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}

          {isAdmin && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 mt-4 px-4 py-3 rounded-lg font-medium text-white 
              bg-teal-600 hover:bg-teal-700 transition-all duration-300 shadow-md"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          )}
        </nav>
      </aside>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;