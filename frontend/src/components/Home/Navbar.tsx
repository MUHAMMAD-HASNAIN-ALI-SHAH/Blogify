import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/auth";
import { Modal } from "@mantine/core";
import SearchBlogs from "./SearchBlogs";
import { useDisclosure } from "@mantine/hooks";

const Navbar = () => {
  const { isAuthenticated, logout, isAuthenticatedLoading, profile } =
    useAuthStore();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const logoutButton = () => {
    logout();
  };

  return (
    <div className="w-full shadow-lg fixed top-0 left-0 z-50">
        <div className="navbar bg-base-100 h-full">
          <div className="flex-1">
            <p className="btn btn-ghost text-xl">
              <Link to={"/"}>Bloggy</Link>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Modal opened={opened} onClose={close} title="Add Blog" centered>
              <SearchBlogs onClose={close} />
            </Modal>
            <i
              onClick={open}
              className="ri-search-line text-2xl cursor-pointer"
            ></i>
            <div>
              {isAuthenticatedLoading ? (
                <>
                  <div className="flex justify-center items-center gap-3 h-full">
                    <button className="skeleton w-28 bg-gray-300 btn border-none"></button>
                    <button className="skeleton w-24 bg-gray-300 btn border-none"></button>
                  </div>
                </>
              ) : (
                <>
                  {isAuthenticated ? (
                    <div className="flex-none">
                      <div className="dropdown dropdown-end">
                        <div
                          tabIndex={0}
                          role="button"
                          className="btn-circle avatar w-10 h-10 btn btn-ghost"
                        >
                          <img
                            src={profile?.image || "./user.png"}
                            className="w-10 h-10 rounded-full"
                          />
                        </div>
                        <ul
                          tabIndex={0}
                          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                        >
                          <li>
                            <a
                              onClick={() => {
                                navigate("/profile");
                                (
                                  document?.activeElement as HTMLElement | null
                                )?.blur();
                              }}
                            >
                              Profile
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() => {
                                navigate("/dashboard");
                                (
                                  document?.activeElement as HTMLElement | null
                                )?.blur();
                              }}
                            >
                              Dashboard
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() => {
                                logoutButton();
                                (
                                  document?.activeElement as HTMLElement | null
                                )?.blur();
                              }}
                            >
                              Logout
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => navigate("/login")}
                      className="btn btn-primary"
                    >
                      Signin
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
    </div>
  );
};

export default Navbar;
