import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import icon from "../assets/icon.png";

const Register = () => {
  const navigate = useNavigate();

  // State to store form input values
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password1: "",
    password2: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://islamic-backend.cowdly.com/api/users/register/",
        formData
      );

      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      // console.error("Registration failed:", error.response.data);

      // Extract error message(s)
      if (error.response && error.response.data) {
        const errorMessages = Object.values(error.response.data)
          .flat()
          .join(", ");
        toast.error(errorMessages);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="w-full bg-[#f2ece5] flex justify-center items-center">
        <a href="/" className="p-1.5">
          <span className="sr-only">العودة للرئيسية</span>
          <img className="h-[60px] w-[60px]" src={icon} alt="Logo" />
        </a>
      </div>

      <div className="h-[90vh] flex items-center justify-center bg-[#4b3b34] font-[Amiri]">
        <div className="bg-[#fdf8f2] p-8 rounded-lg shadow-lg border border-[#e0d6c8] max-sm:w-[90%] sm:w-[90%] md:w-[70%] lg:w-[50%]">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#4b3b34]">
            إنشاء حساب جديد
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold text-[#4b3b34]">
                  الاسم الأول
                </label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="اكتب اسمك الأول"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-[#c2b9ad] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a68a6e] focus:border-[#a68a6e]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#4b3b34]">
                  الاسم الأخير
                </label>
                <input
                  type="text"
                  name="last_name"
                  placeholder="اكتب اسم العائلة"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-[#c2b9ad] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a68a6e] focus:border-[#a68a6e]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#4b3b34]">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-[#c2b9ad] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a68a6e] focus:border-[#a68a6e]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#4b3b34]">
                  كلمة المرور
                </label>
                <input
                  type="password"
                  name="password1"
                  placeholder="اكتب كلمة المرور"
                  value={formData.password1}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-[#c2b9ad] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a68a6e] focus:border-[#a68a6e]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#4b3b34]">
                  تأكيد كلمة المرور
                </label>
                <input
                  type="password"
                  name="password2"
                  placeholder="أعد كتابة كلمة المرور"
                  value={formData.password2}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-[#c2b9ad] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a68a6e] focus:border-[#a68a6e]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#6a5c51] text-white py-2 px-4 rounded-md hover:bg-[#5b4e46] focus:outline-none focus:ring-2 focus:ring-[#a68a6e] focus:ring-offset-2 mt-4 transition duration-300"
            >
              إنشاء حساب
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#4b3b34]">
              لديك حساب بالفعل؟{" "}
              <Link
                to="/login"
                className="font-semibold text-[#8c7764] hover:underline"
              >
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
