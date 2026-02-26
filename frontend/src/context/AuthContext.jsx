import { createContext, useEffect, useMemo, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { mockUsers } from "../data/mockData";
import { getStorage, setStorage } from "../utils/helpers";

const STORAGE_KEY = "task_profile_auth";

const initialState = {
  users: mockUsers,
  currentUser: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, currentUser: action.payload };
    case "REGISTER":
      return {
        ...state,
        users: [...state.users, action.payload],
        currentUser: action.payload,
      };
    case "LOGOUT":
      return { ...state, currentUser: null };
    default:
      return state;
  }
}

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, getStorage(STORAGE_KEY, initialState));

  useEffect(() => {
    setStorage(STORAGE_KEY, state);
  }, [state]);

  const login = async (email, password, role) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const user = state.users.find(
      (item) =>
        item.email.toLowerCase() === email.toLowerCase() &&
        item.password === password &&
        item.role === role,
    );

    if (!user) {
      return { success: false, message: "Invalid credentials or role." };
    }

    dispatch({ type: "LOGIN", payload: user });
    return { success: true, user };
  };

  const register = async (payload) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const exists = state.users.some(
      (item) => item.email.toLowerCase() === payload.email.toLowerCase(),
    );
    if (exists) {
      return { success: false, message: "Email is already registered." };
    }

    const newUser = { ...payload, id: uuidv4() };
    dispatch({ type: "REGISTER", payload: newUser });
    return { success: true, user: newUser };
  };

  const logout = () => dispatch({ type: "LOGOUT" });

  const value = useMemo(
    () => ({
      users: state.users,
      students: state.users.filter((item) => item.role === "student"),
      currentUser: state.currentUser,
      login,
      register,
      logout,
    }),
    [state],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
