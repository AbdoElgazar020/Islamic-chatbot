import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_new_password: "",
    email: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "https://islamic-backend.cowdly.com/api/users/user/",
          {
            headers: { Authorization: `Token ${token}` },
          }
        );
        setUser(response.data);
        localStorage.setItem("first_name", response.data.first_name);
        setUpdatedUser(response.data);
      } catch (error) {
        toast.error("فشل في تحميل البيانات.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        "https://islamic-backend.cowdly.com/api/users/profile/",
        updatedUser,
        { headers: { Authorization: `Token ${token}` } }
      );
      setUser(response.data);
      setEditing(false);
      localStorage.setItem("first_name", response.data.first_name);
      toast.success("تم تحديث الملف الشخصي!");
    } catch (error) {
      toast.error("فشل في تحديث البيانات.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("لم يتم تسجيل الدخول");
        return;
      }

      const response = await axios.post(
        "https://islamic-backend.cowdly.com/api/users/password-reset/",
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      toast.success(response.data.message);
    } catch (error) {
      const errorMessage =
        error.response?.data?.email?.[0] ||
        error.response?.data?.old_password?.[0] ||
        error.response?.data?.confirm_new_password?.[0] ||
        error.response?.data?.authorization?.[0] ||
        error.response?.data?.detail ||
        "حدث خطأ ما";

      toast.error(errorMessage);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-[#f5f0e6] font-[Amiri]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#7c5c43]"></div>
      </div>
    );

  return (
    <div className="flex flex-col justify-center items-center bg-[#f5f0e6] min-h-screen py-10 font-[Amiri] text-[#2c1e1e]">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 w-full max-w-5xl px-4 mt-32">
        {/* Profile Section */}
        <div className="w-full bg-[#ede3d0] p-6 rounded-2xl shadow-md border border-[#d4c4aa]">
          <h2 className="text-2xl font-bold text-center mb-6 text-[#5b3e2b]">
            الملف الشخصي
          </h2>

          {!editing ? (
            <div className="space-y-4">
              <p className="flex items-center">
                <span className="font-semibold w-1/3">الاسم الأول:</span>{" "}
                {user.first_name}
              </p>
              <p className="flex items-center">
                <span className="font-semibold w-1/3">اسم العائلة:</span>{" "}
                {user.last_name}
              </p>
              <p className="flex items-center">
                <span className="font-semibold w-1/3">البريد:</span>{" "}
                {user.email}
              </p>
              <button
                onClick={() => setEditing(true)}
                className="mt-4 w-full bg-[#7c5c43] text-white py-2 rounded-lg hover:opacity-90 transition"
              >
                تعديل البيانات
              </button>
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-4 flex flex-col">
              <div>
                <label className="block text-sm mb-1">الاسم الأول</label>
                <input
                  type="text"
                  value={updatedUser.first_name}
                  onChange={(e) =>
                    setUpdatedUser({
                      ...updatedUser,
                      first_name: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-[#c8b89f] rounded-md bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">اسم العائلة</label>
                <input
                  type="text"
                  value={updatedUser.last_name}
                  onChange={(e) =>
                    setUpdatedUser({
                      ...updatedUser,
                      last_name: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-[#c8b89f] rounded-md bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">البريد</label>
                <input
                  type="email"
                  value={updatedUser.email}
                  disabled
                  className="w-full p-2 border rounded-md bg-[#e8e3da] text-[#7c5c43] cursor-not-allowed"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#7c5c43] text-white py-2 rounded-lg hover:opacity-90 transition"
              >
                حفظ التعديلات
              </button>
            </form>
          )}
        </div>

        {/* Password Reset Section */}
        <div className="w-full bg-[#ede3d0] p-6 rounded-2xl shadow-md border border-[#d4c4aa]">
          <h3 className="text-xl font-bold text-center mb-4 text-[#5b3e2b]">
            تغيير كلمة المرور
          </h3>
          <form onSubmit={handlePasswordReset} className="space-y-4">
            {[
              "email",
              "old_password",
              "new_password",
              "confirm_new_password",
            ].map((field, index) => (
              <div key={index}>
                <label className="block text-sm mb-1">
                  {field.replace("_", " ")}
                </label>
                <input
                  type={field.includes("password") ? "password" : "email"}
                  name={field}
                  placeholder={`اكتب ${field.replace("_", " ")}`}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border border-[#c8b89f] rounded-md bg-white focus:outline-none"
                  required
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-[#7c5c43] text-white py-2 rounded-md hover:opacity-90 transition"
            >
              تغيير كلمة المرور
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
