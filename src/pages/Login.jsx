import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthProvider";
import { useNavigate, Link } from "react-router";
import Swal from "sweetalert2";

const LOGIN_IMG = "https://i.ibb.co/NdhKkPR1/login-illustration.png";

const Login = () => {
  const { login, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    login(email, password)
      .then((result) =>
        fetch(`${import.meta.env.VITE_API_BASE_URL}/jwt`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: result.user.email }),
        })
      )
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("access-token", data.token);
        Swal.fire("Success", "Logged in successfully!", "success");
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setError(err.message);
        Swal.fire("Error", err.message, "error");
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) =>
        fetch(`${import.meta.env.VITE_API_BASE_URL}/jwt`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: result.user.email }),
        })
      )
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("access-token", data.token);
        Swal.fire("Success", "Google login successful!", "success");
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setError(err.message);
        Swal.fire("Error", err.message, "error");
      });
  };

  return (
    <section className="section-y">
      <div className="container-app">
        <div className="grid md:grid-cols-12 items-start gap-6 md:gap-8">
          <div className="md:col-span-5 w-full">
            <div className="bg-base-100 shadow rounded p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Login</h2>
              {error && <p className="text-error text-sm mb-3">{error}</p>}

              <form onSubmit={handleLogin} className="space-y-3">
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
                  required
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="input input-bordered w-full"
                  required
                />
                <button className="btn btn-primary w-full">Login</button>
              </form>

              <button
                onClick={handleGoogleLogin}
                className="btn btn-outline w-full mt-3"
              >
                Login with Google
              </button>

              <p className="text-sm mt-4">
                Don’t have an account?{" "}
                <Link to="/register" className="link link-primary">
                  Register
                </Link>
              </p>
            </div>
          </div>

          <div className="hidden md:flex md:col-span-7 justify-end self-start">
            <figure className="rounded-2xl overflow-hidden border border-base-200 bg-base-100 w-full max-w-xl">
              <img
                src={LOGIN_IMG}
                alt="Login illustration"
                className="w-full h-full object-cover aspect-[5/4] md:aspect-[16/10]"
                loading="lazy"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
