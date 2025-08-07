import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthProvider";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";

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
      return Swal.fire(
        "Invalid Password",
        "Password must have at least one uppercase, one lowercase and be 6+ characters.",
        "error"
      );
    }

    register(email, password)
      .then((result) => {
        const user = result.user;

        return updateProfile(user, {
          displayName: name,
          photoURL: photoURL || "https://i.ibb.co/YpF2YtJ/avatar.png", // fallback
        }).then(() => {
          return fetch(`${import.meta.env.VITE_API_BASE_URL}/jwt`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email }),
          });
        });
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
    <div className="max-w-md mx-auto my-10 p-6 bg-base-100 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister}>
        <input
          name="name"
          type="text"
          placeholder="Name"
          className="input input-bordered w-full mb-3"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input input-bordered w-full mb-3"
          required
        />
        <input
          name="photoURL"
          type="text"
          placeholder="Photo URL (optional)"
          className="input input-bordered w-full mb-3"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input input-bordered w-full mb-3"
          required
        />
        <button className="btn btn-primary w-full">Register</button>
      </form>
      <p className="text-sm mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600">
          Login
        </a>
      </p>
    </div>
  );
};

export default Register;
