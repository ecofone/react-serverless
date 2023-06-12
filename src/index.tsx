import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/FirestoreContext";
import { AuthProvider, useAuthContext } from "./context/AuthContext";
import { Layout } from "./components/Layout";
import { Stocks } from "./components/Stocks";
import { AuthContextType } from "./types";
import { Single } from "./components/Single";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";

const AppRoutes = () => {
  const { currentUser } = useAuthContext() as AuthContextType;

  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/images/:id" element={<Single />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />

      {currentUser && <Route path="/stocks" element={<Stocks />} />}
    </Routes>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AppProvider>
        <Router>
          <Layout>
            <AppRoutes />
          </Layout>
        </Router>
      </AppProvider>
    </AuthProvider>
  </React.StrictMode>
);
