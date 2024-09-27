import { useEffect, useReducer, useCallback, useMemo } from "react";

import axios from "axios";
//
import { AuthContext } from "./authContext";
import { isValidToken, setSession, jwtDecode } from "./utils";

// ----------------------------------------------------------------------

const initialState = {
  user: null,
  loading: true,
};

const Types = {
  INITIAL: "INITIAL",
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  LOGOUT: "LOGOUT",
};

const reducer = (state, action) => {
  switch (action.type) {
    case Types.INITIAL:
      return {
        loading: false,
        user: action.payload.user,
      };
    case Types.LOGIN:
      return {
        ...state,
        user: action.payload.user,
      };
    case Types.REGISTER:
      return {
        ...state,
        user: action.payload.user,
      };
    case Types.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

// ----------------------------------------------------------------------

const STORAGE_KEY = "accessToken";

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        // const response = await axios.get("");

        // const { user } = response.data;

        // dispatch({
        //   type: Types.INITIAL,
        //   payload: {
        //     user,
        //   },
        // });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email, password) => {
    const data = {
      email,
      password,
    };

    const response = await axios.post("http://localhost:3333/login", data);

    const { status, role_id, token } = response.data;

    if (status === "success") {
      localStorage.setItem(STORAGE_KEY, token);

      dispatch({
        type: Types.LOGIN,
        payload: {
          user: {
            accessToken: token,
            role_id,
          },
        },
      });
    }
  }, []);

  // REGISTER
  const register = useCallback(async (email, password, firstName, lastName) => {
    const data = {
      email,
      password,
      firstName,
      lastName,
    };

    const response = await axios.post("/register", data);

    const { accessToken, user } = response.data;

    sessionStorage.setItem(STORAGE_KEY, accessToken);

    dispatch({
      type: Types.REGISTER,
      payload: {
        user,
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  // ----------------------------------------------------------------------

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      //
      login,
      register,
      logout,
    }),
    [login, logout, register, state.user]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
