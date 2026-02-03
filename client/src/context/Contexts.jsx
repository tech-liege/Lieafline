import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getUser } from "../services/userApi";
import { toast } from "react-toastify";
import usePolling from "../hooks/usePolling";
import mulSkillSample from "../utils/mulSkillsample.json";
import skillSample from "../utils/skillsample.json";
import phaseSample from "../utils/phasesample.json";
import mulTodoSample from "../utils/mulTodosample.json";

const AuthContext = createContext();
const VarContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState({});
  const [isServerActive, setIsServerActive] = useState(false);
  const [toaster, setToaster] = useState();

  const BASE_SERVER_URL = import.meta.env.VITE_BASE_SERVER_URL;
  const SKILL_SERVER_URL = import.meta.env.VITE_SKILL_SERVER_URL;
  const AUTH_SERVER_URL = import.meta.env.VITE_AUTH_SERVER_URL;
  const USER_SERVER_URL = import.meta.env.VITE_USER_SERVER_URL;

  if (token) {
    try {
      const { exp } = jwtDecode(token);
      console.log(exp);
    } catch {
      localStorage.removeItem("token"); // invalid token format
      setToken("");
    }
  }

  usePolling(() => {
    fetch(`${BASE_SERVER_URL}/health`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(() => {
        setIsServerActive(true);
        toast.dismiss(toaster);
        toast("Server Connected");
      })
      .catch((err) => {
        toast.dismiss(toaster) &&
          setToaster(toast.loading("Server Disconnected. Reconnecting..."));
        console.log(err);
        setIsServerActive(false);
      });
    if (token && !user.id) {
      getUser(USER_SERVER_URL, token)
        .then((data) => {
          if (!data.message) {
            setUser(data);
          } else {
            setUser({});
            toast.error(data.message || "Failed to fetch user data");
          }
        })
        .catch(() => {
          setUser({});
          toast.error("Failed to fetch user data");
        });
    }
  }, 10000);

  useEffect(() => {
    // keep token in sync across tabs
    const handleStorageChange = () =>
      setToken(localStorage.getItem("token") || "");
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const loginContext = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        BASE_SERVER_URL,
        SKILL_SERVER_URL,
        AUTH_SERVER_URL,
        USER_SERVER_URL,
        isServerActive,
        loginContext,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function VarProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState(false);
  const [inLoading, setInLoading] = useState(false);
  const [inLoadingText, setInLoadingText] = useState(false);
  const [isSideActive, setIsSideActive] = useState(false);
  const [inFullScreen, setInFullScreen] = useState(false);
  const [showFSHeader, setShowFSHeader] = useState(false);
  const [fullScreenHeader, setFullScreenHeader] = useState("Full Screen");
  const notifications = ["Verily", "are", "kipade"];

  const toggleInFullScreen = (mode=false, header = "", showHeader = false) => {
    if (mode === true || mode == false) {
      setInFullScreen(mode);
      setShowFSHeader(showHeader);
      setFullScreenHeader(header);
    } else {
      setInFullScreen(false);
      setFullScreenHeader("");
    }
  };

  const toggleLoading = (mode, text = "") => {
    if (mode === true || mode == false) {
      setLoading(mode);
      setLoadingText(text);
    } else {
      setLoading(false);
      setLoadingText("");
    }
  };

  const toggleInLoading = (mode, text = "Fetching Data...") => {
    if (mode === true || mode == false) {
      setInLoading(mode);
      setInLoadingText(text);
    } else {
      setInLoading(false);
      setInLoadingText("");
    }
  };

  const toggleSidebar = () => {
    setIsSideActive(!isSideActive);
  };

  const md = window.innerWidth >= 768;
  const lg = window.innerWidth >= 1024;

  return (
    <VarContext.Provider
      value={{
        notifications,
        isSideActive,
        toggleSidebar,
        inFullScreen,
        fullScreenHeader,
        showFSHeader,
        toggleInFullScreen,
        loading,
        loadingText,
        toggleLoading,
        inLoading,
        inLoadingText,
        toggleInLoading,
        mulSkillSample,
        skillSample,
        phaseSample,
        mulTodoSample,
        md,
        lg,
      }}
    >
      {children}
    </VarContext.Provider>
  );
}

export const AuthContexts = AuthContext;
export const VarContexts = VarContext;
