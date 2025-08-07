import { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../contexts/AuthContext/AuthProvider';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
      .then(() => navigate('/'))
      .catch(err => console.error(err));
  };

  return (
    <div className="navbar bg-base-100 shadow px-4">
      {/* Left - Logo */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">FoodShare</Link>
      </div>

      {/* Center - Links */}
      <div className="hidden md:flex flex-1">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/available-foods">Available Foods</Link></li>
          {user && (
            <>
              <li><Link to="/add-food">Add Food</Link></li>
              <li><Link to="/manage-my-foods">Manage My Foods</Link></li>
              <li><Link to="/my-food-request">My Food Request</Link></li>
            </>
          )}
        </ul>
      </div>

      {/* Right - Auth Buttons */}
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          {user ? (
            <>
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user.photoURL || 'https://i.ibb.co/YpF2YtJ/avatar.png'} alt="User" />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40">
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            </>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
