import { useState, useEffect } from "react";
import { useUser } from "@clerk/react";

function Settings() {
  const { user } = useUser();

  const [name, setName] = useState("");
  const [whatsAppNumber, setWhatsAppNumber] = useState("");

  useEffect(() => {
    if (!user) return;

    fetch(
      `${import.meta.env.VITE_API_URL}/api/agent-profile/${user.id}`
    )
      .then(res => res.json())
      .then(data => {
        if (data) {
          setName(data.name || "");
          setWhatsAppNumber(
            data.whatsAppNumber || ""
          );
        }
      });

  }, [user]);

  const saveProfile = async () => {

    await fetch(
      `${import.meta.env.VITE_API_URL}/api/agent-profile`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          userId: user.id,
          name: name,
          whatsAppNumber:
            whatsAppNumber
        })
      }
    );

    alert("Profile saved!");
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
      <h1>Settings</h1>

      <div
        style={{
          background: "#0f172a",
          padding: "30px",
          borderRadius: "20px",
          maxWidth: "600px"
        }}
      >

        <input
          placeholder="Agent name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={inputStyle}
        />

        <input
          placeholder="+14188056811"
          value={whatsAppNumber}
          onChange={(e) =>
            setWhatsAppNumber(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <button
          onClick={saveProfile}
          style={buttonStyle}
        >
          Save Profile
        </button>

      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "15px",
  marginBottom: "20px",
  borderRadius: "12px",
  border: "1px solid #334155",
  background: "#1e293b",
  color: "white",
  fontSize: "16px"
};

const buttonStyle = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "15px 25px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "bold"
};

export default Settings;