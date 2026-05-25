import { useEffect, useState } from "react";
import { useUser } from "@clerk/react";

function Dashboard() {
  const { user } = useUser();

  const [leads, setLeads] = useState([]);

  useEffect(() => {
    if (!user) return;

    fetch(
      `https://homeagent-ai-api.onrender.com/api/leads?userId=${user.id}`
    )
      .then(res => res.json())
      .then(data => setLeads(data));

  }, [user]);

  const updateStatus = async (leadId, status) => {
    await fetch(
      `https://homeagent-ai-api.onrender.com/api/leads/${leadId}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      }
    );

    setLeads(prev =>
      prev.map(lead =>
        lead.id === leadId
          ? { ...lead, status }
          : lead
      )
    );
  };

  return (
    <div style={{
      backgroundColor: "#020617",
      minHeight: "100vh",
      padding: "30px",
      color: "white"
    }}>
      <h1>AI Leads Dashboard</h1>

      {leads.map(lead => (
        <div
          key={lead.id}
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "16px",
            marginBottom: "20px"
          }}
        >Console.WriteLine($"MAPPED USER ID: {userId}");
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
            onChange={(e) =>
              updateStatus(lead.id, e.target.value)
            }
            style={{
              padding: "10px",
              borderRadius: "10px",
              background: "#0f172a",
              color: "white",
              border: "1px solid #334155"
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