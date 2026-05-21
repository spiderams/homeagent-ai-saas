import { useEffect, useState } from "react";

function Dashboard() {

  const [leads, setLeads] =
    useState([]);

  useEffect(() => {

    fetch(
      "https://homeagent-ai-api.onrender.com/api/leads"
    )
      .then(res => res.json())
      .then(data => setLeads(data));

  }, []);

  return (

    <div
      style={{
        padding: "30px",
        color: "white"
      }}
    >

      <h1>AI Leads Dashboard</h1>

      <div
        style={{
          display: "grid",
          gap: "20px",
          marginTop: "30px"
        }}
      >

        {leads.map((lead) => (

          <div
            key={lead.id}
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "16px"
            }}
          >

            <h2>{lead.fullName || "Unknown"}</h2>

            <p>📞 {lead.phone}</p>

            <p>💰 {lead.budget}</p>

            <p>📍 {lead.location}</p>

            <p>🎯 {lead.intent}</p>

            <p>🔥 {lead.leadScore}</p>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Dashboard;