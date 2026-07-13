import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/slices/authSlice"; // Adjust path if necessary
import { Navigate, Link } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  // We check for token to redirect just like in Login.jsx
  const { token, loading, error, user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  // Redirect after successful registration (since it auto-logs in)
  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-bold dark:text-white">
            Buildie Sign Up
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Create an account to manage your projects
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 p-4 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block mb-2 text-sm font-medium dark:text-white">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-gray-300
                dark:border-gray-700
                bg-white
                dark:bg-gray-900
                dark:text-white
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium dark:text-white">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-gray-300
                dark:border-gray-700
                bg-white
                dark:bg-gray-900
                dark:text-white
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium dark:text-white">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-gray-300
                dark:border-gray-700
                bg-white
                dark:bg-gray-900
                dark:text-white
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-3
              rounded-xl
              font-semibold
              transition
            "
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        {/* Link back to Login */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 transition"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
