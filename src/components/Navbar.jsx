import { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router";
import { FiMenu } from "react-icons/fi";
import { AuthContext } from "../contexts/AuthContext/AuthProvider";

const NavItem = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `px-3 py-2 rounded-md text-sm font-medium ${
        isActive
          ? "text-primary bg-primary/10"
          : "text-base-content/80 hover:bg-base-200"
      }`
    }
  >
    {children}
  </NavLink>
);

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  const publicLinks = [
    { to: "/", label: "Home" },
    { to: "/available-foods", label: "Foods" },
    { to: "/about", label: "About" },
  ];

  const protectedLinks = [
    { to: "/add-food", label: "Add Food" },
    { to: "/manage-my-foods", label: "My Foods" },
    { to: "/my-requests", label: "My Requests" },
  ];

  const displayName = user?.displayName || "User";

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-base-100 text-base-content border-b">
      <div className="container-app">
        <div
          className="flex h-16 items-center justify-between"
          role="navigation"
          aria-label="Main"
        >
          {/* Left: Brand */}
          <div className="flex items-center">
            <Link to="/" className="text-lg font-bold tracking-wide">
              FoodShare
            </Link>
          </div>

          {/* Center: desktop nav */}
          <div className="hidden lg:flex flex-1 justify-center">
            <nav className="flex items-center gap-1">
              {publicLinks.map((item) => (
                <NavItem key={item.to} to={item.to}>
                  {item.label}
                </NavItem>
              ))}
              {user &&
                protectedLinks.map((item) => (
                  <NavItem key={item.to} to={item.to}>
                    {item.label}
                  </NavItem>
                ))}
            </nav>
          </div>

          {/* Right: desktop auth + hamburger */}
          <div className="flex items-center gap-2">
            {/* Desktop auth */}
            <div className="hidden lg:flex items-center gap-2">
              {!user ? (
                <>
                  <Link to="/login" className="btn-outline-uni btn-sm">
                    Login
                  </Link>
                  <Link to="/register" className="btn-filled btn-sm">
                    Register
                  </Link>
                </>
              ) : (
                <>
                  {/* Avatar with tooltip */}
                  <div
                    className="tooltip tooltip-bottom"
                    data-tip={displayName}
                  >
                    <div className="avatar">
                      <div className="w-9 rounded-full ring ring-primary/30 ring-offset-base-100 ring-offset-2">
                        <img
                          alt="avatar"
                          src={
                            user.photoURL || "https://i.pravatar.cc/100?img=12"
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn-outline-uni btn-sm"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* Mobile: hamburger (RIGHT) */}
            <div className="dropdown dropdown-end lg:hidden">
              <div tabIndex={0} role="button" className="btn btn-ghost">
                <FiMenu size={20} />
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-base-100 text-base-content rounded-box w-64 text-center"
              >
                {publicLinks.map((item) => (
                  <li key={item.to} className="py-1">
                    <Link to={item.to} className="flex justify-center">
                      {item.label}
                    </Link>
                  </li>
                ))}

                {user && (
                  <>
                    <li className="menu-title mt-1">Dashboard</li>

                    {/* Profile pic inside Dashboard (tooltip shows name) */}
                    <li className="py-2">
                      <div
                        className="tooltip tooltip-bottom mx-auto"
                        data-tip={displayName}
                      >
                        <div className="avatar">
                          <div className="w-12 rounded-full ring ring-primary/30 ring-offset-base-100 ring-offset-2">
                            <img
                              alt="avatar"
                              src={
                                user.photoURL ||
                                "https://i.pravatar.cc/100?img=12"
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </li>

                    {protectedLinks.map((item) => (
                      <li key={item.to} className="py-1">
                        <Link to={item.to} className="flex justify-center">
                          {item.label}
                        </Link>
                      </li>
                    ))}

                    <li className="pt-2">
                      <button
                        onClick={handleLogout}
                        className="btn-outline-uni btn-sm w-full"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}

                {!user && (
                  <>
                    <li className="menu-title mt-1">Account</li>
                    <li className="py-1">
                      <Link
                        to="/login"
                        className="btn-outline-uni btn-sm w-full"
                      >
                        Login
                      </Link>
                    </li>
                    <li className="py-1">
                      <Link to="/register" className="btn-filled btn-sm w-full">
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
