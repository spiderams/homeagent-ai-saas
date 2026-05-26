import { useEffect, useState } from "react";
import { useUser } from "@clerk/react";

function Dashboard() {
  const { user } = useUser();
  const userId = user?.id;

  const [leads, setLeads] = useState([]);

  useEffect(() => {
    if (!userId) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/leads?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => setLeads(data))
      .catch((error) => console.error("Erreur chargement leads:", error));
  }, [userId]);

  const updateStatus = async (leadId, status) => {
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/leads/${leadId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === leadId ? { ...lead, status } : lead
        )
      );
    } catch (error) {
      console.error("Erreur update status:", error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#020617",
        minHeight: "100vh",
        padding: "30px",
        color: "white",
      }}
    >
      <h1>AI Leads Dashboard</h1>

      {leads.map((lead) => (
        <div
          key={lead.id}
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "16px",
            marginBottom: "20px",
          }}
        >
          <h2>{lead.fullName || "Unknown"}</h2>

          <p>📞 {lead.phone}</p>
          <p>💰 {lead.budget}</p>
          <p>📍 {lead.location}</p>
          <p>🎯 {lead.intent}</p>
          <p>🔥 {lead.leadScore}</p>
          <p>📅 {lead.appointmentDate || "No appointment"}</p>
          <p>⏰ {lead.appointmentTime || "No time"}</p>

          <select
            value={lead.status || "New"}
            onChange={(e) => updateStatus(lead.id, e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "10px",
              background: "#0f172a",
              color: "white",
              border: "1px solid #334155",
            }}
          >
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Appointment</option>
            <option>Closed</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;