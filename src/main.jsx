import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import App from './App.jsx';
import Dashboard from './Dashboard.jsx';
import LeadDetails from './LeadDetails.jsx';
import Settings from './Settings.jsx';
import Layout from './Layout.jsx';

import './index.css';
import { ClerkProvider } from "@clerk/react";
ReactDOM.createRoot(
  document.getElementById('root')
).render(

  <React.StrictMode>

    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1e293b",
            color: "white",
            border: "1px solid #334155"
          }
        }}
      />
      <Routes>

        <Route element={<Layout />}>

          {/* HOME */}

        <Route
  path="*"
  element={
    <Navigate to="/dashboard" />
  }
/>
<Suspense fallback={<div>Loading...</div>}></Suspense>

          {/* CHAT */}

          <Route
            path="/chat"
            element={<App />}
          />

          {/* DASHBOARD */}

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* SETTINGS */}

          <Route
            path="/settings"
            element={<Settings />}
          />

          {/* LEAD DETAILS */}

          <Route
            path="/leads/:id"
            element={<LeadDetails />}
          />

        </Route>

      </Routes>

    </BrowserRouter>

  </React.StrictMode>
);