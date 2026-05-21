import { useEffect, useState } from "react";

function Dashboard() {

  const [leads, setLeads] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    fetch(
      "https://homeagent-ai-api.onrender.com/api/leads"
    )
      .then((res) => res.json())
      .then((data) => setLeads(data))
      .catch((err) =>
        console.log(err)
      );

  }, []);

  return (

    <div
      style={{
        padding: "30px",
        color: "white",
        backgroundColor: "#020617",
        minHeight: "100vh"
      }}
    >

      {/* TITLE */}

      <h1
        style={{
          fontSize: "32px",
          marginBottom: "20px"
        }}
      >
        AI Leads Dashboard
      </h1>

      {/* SEARCH */}

      <input
        placeholder="Search lead..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          padding: "14px",
          borderRadius: "12px",
          border: "none",
          width: "300px",
          marginBottom: "30px",
          backgroundColor: "#1e293b",
          color: "white",
          fontSize: "16px"
        }}
      />

      {/* LEADS GRID */}

      <div
        style={{
          display: "grid",
          gap: "20px"
        }}
      >

        {leads
          .filter((lead) =>

            lead.phone
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||

            lead.location
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||

            lead.intent
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )

          )
          .map((lead) => (

            <div
              key={lead.id}
              style={{
                background: "#1e293b",
                padding: "24px",
                borderRadius: "18px",

                border:
                  lead.leadScore ===
                  "Hot"
                    ? "2px solid red"
                    : lead.leadScore ===
                      "Warm"
                    ? "2px solid orange"
                    : "none",

                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.3)"
              }}
            >

              {/* NAME */}

              <h2
                style={{
                  marginBottom: "16px"
                }}
              >
                {
                  lead.fullName ||
                  "Unknown"
                }
              </h2>

              {/* DETAILS */}

              <p>
                📞 {lead.phone}
              </p>

              <p>
                💰 {lead.budget}
              </p>

              <p>
                📍 {lead.location}
              </p>

              <p>
                🎯 {lead.intent}
              </p>

              <p>
                🔥 {lead.leadScore}
              </p>

              <p>
                📅 {
                  lead.appointmentDate ||
                  "No appointment"
                }
              </p>

              <p>
                ⏰ {
                  lead.appointmentTime ||
                  "No time"
                }
              </p>

              <p>
                🕒 {
                  new Date(
                    lead.createdAt
                  ).toLocaleString()
                }
              </p>

            </div>

          ))}

      </div>

    </div>

  );
}

export default Dashboard;