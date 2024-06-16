import { useState, useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItems, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { userProfileViewGet, userProfileViewDelete } from "../services/api";
import logo from "../assets/logo_black.png";

type User = {
  username: string;
  email: string;
  department: string;
  role: string;
};

function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await userProfileViewGet();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, []);

  const handleDelete = async () => {
    try {
      await userProfileViewDelete(navigate);
    } catch (error) {
      console.error("Failed to delete user profile:", error);
    }
  };

  return (
    <nav className="bg-white border-gray-200 font-manrope border-b">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={logo} className="h-8" alt="drcrm Logo" />
          <span className="self-center text-2xl font-medium uppercase">
            drcrm
          </span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Menu as="div" className="relative">
            <div>
              <MenuButton className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300">
                <span className="sr-only">Open user menu</span>
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  {user ? user.username[0] : "?"}
                </div>
              </MenuButton>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow">
                <div className="px-4 py-3">
                  {user ? (
                    <div className="text-gray-900">
                      <div className="text-lg font-medium">{user.username}</div>
                      <div className="text-sm mt-4">
                        <span className="font-bold">Email:</span> {user.email}
                      </div>
                      <div className="text-sm mt-2">
                        <span className="font-bold">Department:</span>{" "}
                        {user.department}
                      </div>
                      <div className="text-sm mt-2">
                        <span className="font-bold">Role:</span> {user.role}
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-900">
                      <div>Loading...</div>
                      <div className="text-gray-500 truncate">Loading...</div>
                    </div>
                  )}
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <button
                      onClick={handleDelete}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Delete User
                    </button>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </MenuItems>
            </Transition>
          </Menu>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-user"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-slate-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-slate-700 md:p-0 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/customers"
                className="block py-2 px-3 text-slate-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-slate-700 md:p-0 transition duration-300"
              >
                Customers
              </Link>
            </li>
            <li>
              <Link
                to="/leads"
                className="block py-2 px-3 text-slate-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-slate-700 md:p-0 transition duration-300"
              >
                Leads
              </Link>
            </li>
            <li>
              <Link
                to="/interactions"
                className="block py-2 px-3 text-slate-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-slate-700 md:p-0 transition duration-300"
              >
                Interactions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
