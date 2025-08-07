import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthProvider";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Login = () => {
  const { login, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    login(email, password)
      .then((result) => {
        const loggedUser = result.user;

        // Get JWT token from server
        fetch(`${import.meta.env.VITE_API_BASE_URL}/jwt`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: loggedUser.email }),
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("access-token", data.token);
            Swal.fire("Success", "Logged in successfully!", "success");
            navigate("/", { replace: true });
          });
      })
      .catch((err) => {
        setError(err.message);
        Swal.fire("Error", err.message, "error");
      });
  };

  const handleGoogleLogin = () => {
  googleLogin()
    .then((result) => {
      const loggedUser = result.user;

      // Get JWT token
      fetch(`${import.meta.env.VITE_API_BASE_URL}/jwt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loggedUser.email }),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("access-token", data.token);
          Swal.fire("Success", "Google login successful!", "success");
          navigate("/", { replace: true });
        });
    })
    .catch((err) => {
      setError(err.message);
      Swal.fire("Error", err.message, "error");
    });
};


  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-base-100 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input input-bordered w-full mb-3"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input input-bordered w-full mb-3"
          required
        />
        <button className="btn btn-primary w-full mb-2">Login</button>
      </form>
      <button onClick={handleGoogleLogin} className="btn btn-outline w-full">
        Login with Google
      </button>
      <p className="text-sm mt-4">
        Don’t have an account?{" "}
        <a href="/register" className="text-blue-600">
          Register
        </a>
      </p>
    </div>
  );
};

export default Login;
