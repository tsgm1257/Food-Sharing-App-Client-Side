import { Link } from "react-router";
import Lottie from "lottie-react";
import notFoundAnimation from "../assets/404.json"; // update path if needed

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-center px-4">
      <div className="max-w-md">
        <Lottie animationData={notFoundAnimation} loop={true} />
        <h2 className="text-3xl font-bold text-error mt-4">Oops! Page Not Found</h2>
        <p className="mb-4 text-gray-500">The page you are looking for doesn't exist or was moved.</p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
