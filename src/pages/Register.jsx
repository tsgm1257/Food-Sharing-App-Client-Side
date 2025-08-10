import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthProvider";
import { useNavigate, Link } from "react-router";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";

const REGISTER_IMG = "https://i.ibb.co/GfG72z3z/register-illustration.png";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;
    const password = e.target.password.value;

    const isValid = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password);
    if (!isValid) {
      Swal.fire(
        "Invalid Password",
        "Password must have at least one uppercase, one lowercase and be 6+ characters.",
        "error"
      );
      return;
    }

    register(email, password)
      .then((result) => {
        const user = result.user;
        return updateProfile(user, {
          displayName: name,
          photoURL: photoURL || "https://i.ibb.co/YpF2YtJ/avatar.png",
        }).then(() =>
          fetch(`${import.meta.env.VITE_API_BASE_URL}/jwt`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email }),
          })
        );
      })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("access-token", data.token);
        Swal.fire("Success", "Registered successfully!", "success");
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
          <div className="hidden md:flex md:col-span-7 justify-start self-start">
            <figure className="rounded-2xl overflow-hidden border border-base-200 bg-base-100 w-full max-w-xl">
              <img
                src={REGISTER_IMG}
                alt="Register illustration"
                className="w-full h-full object-cover aspect-[5/4] md:aspect-[16/10]"
                loading="lazy"
              />
            </figure>
          </div>

          <div className="md:col-span-5 w-full md:justify-self-end">
            <div className="bg-base-100 shadow rounded p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Register</h2>
              {error && <p className="text-error text-sm mb-3">{error}</p>}

              <form onSubmit={handleRegister} className="space-y-3">
                <input
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="input input-bordered w-full"
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
                  required
                />
                <input
                  name="photoURL"
                  type="text"
                  placeholder="Photo URL (optional)"
                  className="input input-bordered w-full"
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="input input-bordered w-full"
                  required
                />
                <button className="btn btn-primary w-full">Register</button>
              </form>

              <p className="text-sm mt-4">
                Already have an account?{" "}
                <Link to="/login" className="link link-primary">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
