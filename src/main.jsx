import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { ClerkProvider } from "@clerk/react";

import { Toaster } from "react-hot-toast";

import App from './App.jsx';
import Dashboard from './Dashboard.jsx';
import LeadDetails from './LeadDetails.jsx';
import Settings from './Settings.jsx';
import Layout from './Layout.jsx';

import './index.css';
<div style={{ color: "white" }}>
  TEST APP
</div>
const clerkPubKey =
  import.meta.env
    .VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(
  document.getElementById('root')
).render(

  <ClerkProvider publishableKey={clerkPubKey}>

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

            <Route
              path="/chat"
              element={<App />}
            />

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />

            <Route
              path="/leads/:id"
              element={<LeadDetails />}
            />

            <Route
              path="*"
              element={
                <Navigate to="/dashboard" />
              }
            />

          </Route>

        </Routes>

      </BrowserRouter>

    </React.StrictMode>

  </ClerkProvider>

);