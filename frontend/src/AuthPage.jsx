import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AuthPage({ setIsLoggedIn, setUserName }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // สร้าง state สำหรับชื่อ
  const [isRegistering, setIsRegistering] = useState(false); // เช็คว่าอยู่ในโหมด Register หรือไม่
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        { email, password },
        { withCredentials: true }
      );
      localStorage.setItem("id_user", response.data.user.id_user);
      localStorage.setItem("name", response.data.user.name);
      localStorage.setItem("is_admin", response.data.user.is_admin);

      setIsLoggedIn(true);
      setUserName(response.data.user.name);

      alert("Login success!");
      navigate("/");
    
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชันลงทะเบียน
  const handleRegister = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/register",
        { name, email, password },
        { withCredentials: true }
      );
      alert("Register success! Now login");
      setIsRegistering(false); // เปลี่ยนไปที่หน้า Login
    } catch (error) {
      alert("Register failed");
    }
  };

  // ฟังก์ชันสำหรับ Cancel (ย้อนกลับไปหน้า Login)
  const handleCancel = () => {
    setIsRegistering(false); // ย้อนกลับไปที่หน้า Login
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="card w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isRegistering ? "Register" : "Login"}
        </h1>

        {/* ถ้าอยู่ในโหมด Register จะมี input สำหรับชื่อ */}
        {isRegistering && (
          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        {/* Input สำหรับ email และ password */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* ถ้าอยู่ในโหมด Register เปลี่ยนปุ่มเป็น OK และ Cancel */}
        <div className="flex space-x-4">
          {isRegistering ? (
            <>
              <button
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                onClick={handleRegister}
              >
                OK
              </button>
              <button
                className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                onClick={handleLogin}
              >
                Login
              </button>
              <button
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
                onClick={() => setIsRegistering(true)} // เปลี่ยนไปที่หน้า Register
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
