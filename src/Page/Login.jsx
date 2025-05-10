import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import icon from "../assets/icon.png";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://islamic-backend.cowdly.com/api/users/login/",
        formData
      );

      const token = response.data.token;
      const userName = response.data.user?.first_name || "User";

      if (token) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("first_name", userName);

        toast.success(`مرحبًا، ${userName}!`);
        navigate("/");
      } else {
        toast.error("لم يتم استلام التوكن. حاول مرة أخرى.");
      }
    } catch (error) {
      const errorMessages = Object.values(error.response?.data || {})
        .flat()
        .join(", ");
      toast.error(errorMessages || "بيانات الدخول غير صحيحة");
    }
  };

  return (
    <>
      <div className="w-full bg-[#4b3b34] flex justify-center items-center py-4">
        {/* <a href="/" className="p-1.5">
          <span className="sr-only">شعار المنصة</span>
          <img className="h-[60px] w-[60px]" src={icon} alt="Logo" />
        </a> */}
      </div>

      <div className="h-[90vh] flex items-center justify-center bg-[#f3ece7] font-[Amiri]">
        <div className="bg-[#fff9f3] p-8 rounded-xl shadow-xl border border-[#d6cfc9] w-full max-w-md max-sm:w-[90%]">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#4b3b34]">
            تسجيل الدخول
          </h2>
          <form onSubmit={handleSubmit} dir="rtl">
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#4b3b34] mb-1">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                name="email"
                placeholder="أدخل بريدك الإلكتروني"
                value={formData.email}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-[#b2a598] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6a5c51] focus:border-[#6a5c51] bg-white text-[#4b3b34]"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#4b3b34] mb-1">
                كلمة المرور
              </label>
              <input
                type="password"
                name="password"
                placeholder="أدخل كلمة المرور"
                value={formData.password}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-[#b2a598] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6a5c51] focus:border-[#6a5c51] bg-white text-[#4b3b34]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#6a5c51] text-white py-2 px-4 rounded-md hover:bg-[#4b3b34] transition-colors focus:outline-none focus:ring-2 focus:ring-[#bfae9f]"
            >
              دخول
            </button>
          </form>

          <div className="mt-6 text-center text-[#4b3b34] text-sm">
            <p>
              ليس لديك حساب؟{" "}
              <Link
                to="/register"
                className="font-semibold text-[#6a5c51] hover:underline"
              >
                إنشاء حساب جديد
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
