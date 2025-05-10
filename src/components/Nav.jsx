import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { toast } from "react-hot-toast";

const Nav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("authToken");
  const name = localStorage.getItem("first_name") || "";
  const firstChar = name.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("first_name");
    toast.success("تم تسجيل الخروج بنجاح");
    navigate("/login");
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsDropdownOpen(false);
  };

  if (
    location.pathname.includes("login") ||
    location.pathname.includes("register")
  ) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f8f1e4] border-b border-[#d2b48c] font-[Amiri] shadow">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {token ? (
          <span className="text-sm font-semibold text-[#4b2e20]">
            أهلاً، {name}
          </span>
        ) : (
          <span className="text-sm font-semibold text-[#4b2e20]">
            مرحباً بك في موقعنا
          </span>
        )}

        {/* عناصر التنقل في النص */}
        <nav className="flex gap-x-6 items-center justify-center">
          <a
            href="/"
            className="text-md font-bold text-[#4b2e20] hover:underline"
          >
            الصفحة الرئيسية
          </a>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-md font-bold text-[#4b2e20] flex items-center gap-1 hover:underline"
            >
              الخدمات
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-40 bg-[#fff9f0] border border-[#d2b48c] shadow-lg rounded-lg z-50">
                {["chat-1"].map((chat, i) => (
                  <button
                    key={i}
                    onClick={() => handleNavigation(`/${chat}`)}
                    className="block px-4 py-2 text-sm text-[#4b2e20] hover:bg-[#f1e6d0] w-full text-right"
                  >
                    اعرف نبيك
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href="#about-us"
            className="text-md font-bold text-[#4b2e20] hover:underline"
          >
            من نحن
          </a>
        </nav>

        {/* زر الملف الشخصي أو تسجيل الدخول على اليمين */}
        {token ? (
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 flex items-center justify-center bg-[#4b2e20] text-white font-bold rounded-full">
                {firstChar}
              </div>
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-[#fff9f0] border border-[#d2b48c] shadow-lg rounded-lg z-50">
                <button
                  onClick={() => {
                    navigate("/profile");
                    setIsProfileOpen(false);
                  }}
                  className="block px-4 py-2 text-sm text-[#4b2e20] hover:bg-[#f1e6d0] w-full text-right"
                >
                  الملف الشخصي
                </button>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-[#4b2e20] hover:bg-[#f1e6d0] w-full text-right"
                >
                  تسجيل الخروج
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-[#4b2e20] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#3b2318]"
          >
            تسجيل الدخول
          </button>
        )}
      </div>
    </header>
  );
};

export default Nav;
