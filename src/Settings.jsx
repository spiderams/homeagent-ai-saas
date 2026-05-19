import { useState } from "react";

import toast from "react-hot-toast";

function Settings() {

  const [apiKey, setApiKey] =
    useState("");

  const [companyName, setCompanyName] =
    useState("");

  const saveSettings = async () => {

    // LOADING TOAST

    const toastId =
      toast.loading("Saving settings...");

    try {

      // FAKE API DELAY

      await new Promise(resolve =>
        setTimeout(resolve, 2000)
      );

      // SUCCESS TOAST

      toast.success(
        "Settings saved successfully",
        {
          id: toastId
        }
      );

    }
    catch
    {
      // ERROR TOAST

      toast.error(
        "Failed to save settings",
        {
          id: toastId
        }
      );
    }
  };

  return (

    <div
      style={{
        backgroundColor: "#020617",

        minHeight: "100vh",

        padding: "40px",

        color: "white"
      }}
    >

      <h1
        style={{
          fontSize: "50px",

          marginBottom: "30px"
        }}
      >
        Settings
      </h1>

      {/* CARD */}

      <div
        style={{
          backgroundColor: "#0f172a",

          padding: "30px",

          borderRadius: "20px",

          maxWidth: "700px",

          border:
            "1px solid #1e293b"
        }}
      >

        {/* COMPANY */}

        <div
          style={{
            marginBottom: "20px"
          }}
        >

          <label
            style={{
              display: "block",

              marginBottom: "10px",

              color: "#94a3b8"
            }}
          >
            Company Name
          </label>

          <input
            value={companyName}

            onChange={(e) =>
              setCompanyName(
                e.target.value
              )
            }

            placeholder="Enter company name"

            style={{
              width: "100%",

              padding: "16px",

              borderRadius: "12px",

              border:
                "1px solid #334155",

              backgroundColor:
                "#1e293b",

              color: "white",

              fontSize: "16px",

              boxSizing:
                "border-box"
            }}
          />

        </div>

        {/* API KEY */}

        <div
          style={{
            marginBottom: "20px"
          }}
        >

          <label
            style={{
              display: "block",

              marginBottom: "10px",

              color: "#94a3b8"
            }}
          >
            OpenAI API Key
          </label>

          <input
            value={apiKey}

            onChange={(e) =>
              setApiKey(
                e.target.value
              )
            }

            placeholder="sk-..."

            style={{
              width: "100%",

              padding: "16px",

              borderRadius: "12px",

              border:
                "1px solid #334155",

              backgroundColor:
                "#1e293b",

              color: "white",

              fontSize: "16px",

              boxSizing:
                "border-box"
            }}
          />

        </div>

        {/* BUTTON */}

        <button
          onClick={saveSettings}

          style={{
            backgroundColor:
              "#2563eb",

            color: "white",

            border: "none",

            padding:
              "14px 22px",

            borderRadius: "12px",

            cursor: "pointer",

            fontWeight: "bold",

            transition:
              "0.2s"
          }}

          onMouseEnter={(e) => {
            e.target.style.transform =
              "scale(1.03)";
          }}

          onMouseLeave={(e) => {
            e.target.style.transform =
              "scale(1)";
          }}
        >

          Save Settings

        </button>

      </div>

    </div>

  );
}

export default Settings;