import { createContext, useReducer } from "react";

export const AuthContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS": {
      return {
        ...state,
        isAuth: true,
        token: action.payload.token,
      };
    }
    case "LOGOUT_SUCCESS": {
      return {
        ...state,
        isAuth: false,
        token: null,
      };
    }
    case "added": {
      return {
        ...state,
        data1: action.payload,
      };
    }
    case "removed": {
      return {
        ...state,
        data1: {},
      };
    }
    case "openmobilenav": {
      return {
        ...state,
        openmobile: true,
      };
    }
    case "onClosemobilenav": {
      return {
        openmobile: false,
      };
    }
    default: {
      return state;
    }
  }
}

function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    isAuth: false,
    token: null,
    data1: {},
    openmobile: false,
    onClosemobilenav: false,
  });
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;
