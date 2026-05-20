import {
  Link,
  Outlet,
  useLocation
} from "react-router-dom";

import { useState } from "react";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton
} from "@clerk/react";

function Layout() {

  const location = useLocation();

  const [mobileMenu, setMobileMenu] =
    useState(false);

  const isMobile =
    window.innerWidth < 768;

  return (

    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#020617"
      }}
    >

      {/* MOBILE BUTTON */}

      <button
        onClick={() =>
          setMobileMenu(!mobileMenu)
        }
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          zIndex: 1000,
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          padding: "12px 14px",
          borderRadius: "10px",
          cursor: "pointer",
          display:
            isMobile
              ? "block"
              : "none"
        }}
      >
        ☰
      </button>

      {/* SIDEBAR */}

      <SignedIn>

        <div
          style={{
            width: "260px",
            backgroundColor: "#0f172a",
            padding: "30px",
            borderRight: "1px solid #1e293b",

            position:
              isMobile
                ? "fixed"
                : "relative",

            left:
              isMobile
                ? mobileMenu
                  ? "0"
                  : "-100%"
                : "0",

            top: 0,

            height: "100vh",

            transition: "0.3s",

            zIndex: 999
          }}
        >

          <h1
            style={{
              color: "white",
              marginBottom: "30px",
              marginTop:
                isMobile
                  ? "60px"
                  : "0"
            }}
          >
            HomeAgent AI
          </h1>

          <div
            style={{
              marginBottom: "30px",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <UserButton />
          </div>

          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px"
            }}
          >

            <Link
              to="/dashboard"
              onClick={() =>
                setMobileMenu(false)
              }
              style={{
                ...linkStyle,
                backgroundColor:
                  location.pathname ===
                  "/dashboard"
                    ? "#2563eb"
                    : "#1e293b"
              }}
            >
              🏠 Dashboard
            </Link>

            <Link
              to="/chat"
              onClick={() =>
                setMobileMenu(false)
              }
              style={{
                ...linkStyle,
                backgroundColor:
                  location.pathname ===
                  "/chat"
                    ? "#2563eb"
                    : "#1e293b"
              }}
            >
              💬 Chat
            </Link>

            <Link
              to="/settings"
              onClick={() =>
                setMobileMenu(false)
              }
              style={{
                ...linkStyle,
                backgroundColor:
                  location.pathname ===
                  "/settings"
                    ? "#2563eb"
                    : "#1e293b"
              }}
            >
              ⚙️ Settings
            </Link>

          </nav>

        </div>

      </SignedIn>

      {/* PAGE */}

      <div
        style={{
          flex: 1,
          width: "100%"
        }}
      >

        <SignedOut>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh"
            }}
          >

            <SignInButton mode="modal">

              <button
                style={{
                  padding: "16px 24px",
                  borderRadius: "12px",
                  border: "none",
                  backgroundColor: "#2563eb",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "18px"
                }}
              >
                Login to HomeAgent AI
              </button>

            </SignInButton>

          </div>

        </SignedOut>

        <SignedIn>

          <Outlet />

        </SignedIn>

      </div>

    </div>

  );
}

const linkStyle = {

  color: "white",

  textDecoration: "none",

  fontSize: "18px",

  padding: "14px",

  borderRadius: "12px",

  backgroundColor: "#1e293b"

};

export default Layout;