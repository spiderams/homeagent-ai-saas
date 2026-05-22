import {
  useEffect,
  useState
} from "react";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Dashboard() {

  const [leads, setLeads] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [selectedLead, setSelectedLead] =
    useState(null);

  const [messages, setMessages] =
    useState([]);

  const [date, setDate] =
    useState(new Date());

  /* LOAD LEADS */

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

  /* LOAD CHAT HISTORY */

  const loadConversation =
    async (phone) => {

      const res =
        await fetch(
          `https://homeagent-ai-api.onrender.com/api/leads/history/${encodeURIComponent(phone)}`
        );

      const data =
        await res.json();

      setMessages(data);

    };

  return (

    <div
      style={{
        padding: "30px",
        backgroundColor: "#020617",
        minHeight: "100vh",
        color: "white"
      }}
    >

      {/* TITLE */}

      <h1
        style={{
          fontSize: "36px",
          marginBottom: "30px"
        }}
      >
        HomeAgent AI CRM
      </h1>

      {/* METRICS */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "30px"
        }}
      >

        <MetricCard
          title="Total Leads"
          value={leads.length}
        />

        <MetricCard
          title="Hot Leads"
          value={
            leads.filter(
              x =>
                x.leadScore === "Hot"
            ).length
          }
        />

        <MetricCard
          title="Warm Leads"
          value={
            leads.filter(
              x =>
                x.leadScore === "Warm"
            ).length
          }
        />

        <MetricCard
          title="Appointments"
          value={
            leads.filter(
              x =>
                x.appointmentDate
            ).length
          }
        />

      </div>

      {/* CALENDAR */}

      <div
        style={{
          background: "#1e293b",
          padding: "24px",
          borderRadius: "20px",
          marginBottom: "30px"
        }}
      >

        <h2
          style={{
            marginBottom: "20px"
          }}
        >
          Appointment Calendar
        </h2>

        <Calendar
          onChange={setDate}
          value={date}

          tileContent={({
            date
          }) => {

            const hasAppointment =
              leads.some(
                lead =>
                  lead.appointmentDate &&
                  new Date(
                    lead.appointmentDate
                  ).toDateString() ===
                  date.toDateString()
              );

            return hasAppointment
              ? (
                <div
                  style={{
                    color: "red",
                    fontSize: "18px"
                  }}
                >
                  🔥
                </div>
              )
              : null;
          }}
        />

      </div>

      {/* SEARCH */}

      <input
        placeholder="Search leads..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          padding: "14px",
          width: "320px",
          borderRadius: "12px",
          border: "none",
          marginBottom: "30px",
          background: "#1e293b",
          color: "white",
          fontSize: "16px"
        }}
      />

      {/* LEADS */}

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
                borderRadius: "20px",

                border:
                  lead.leadScore ===
                  "Hot"
                    ? "2px solid red"

                    : lead.leadScore ===
                      "Warm"

                    ? "2px solid orange"

                    : "none"
              }}
            >

              {/* HEADER */}

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",

                  alignItems: "center",

                  marginBottom: "20px"
                }}
              >

                <h2>
                  {
                    lead.fullName ||
                    "Unknown"
                  }
                </h2>

                <span
                  style={{
                    background:
                      lead.status ===
                      "Closed"
                        ? "green"
                        : "#2563eb",

                    padding:
                      "8px 14px",

                    borderRadius:
                      "999px"
                  }}
                >
                  {
                    lead.status ||
                    "New"
                  }
                </span>

              </div>

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

              {/* ACTIONS */}

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "20px",
                  flexWrap: "wrap"
                }}
              >

                <button
                  onClick={async () => {

                    setSelectedLead(
                      lead
                    );

                    await loadConversation(
                      lead.phone
                    );

                  }}
                  style={buttonStyle}
                >
                  💬 View Chat
                </button>

                <button
                  style={{
                    ...buttonStyle,
                    background:
                      "#16a34a"
                  }}
                >
                  📅 Appointment
                </button>

                <button
                  style={{
                    ...buttonStyle,
                    background:
                      "#dc2626"
                  }}
                >
                  🔥 Mark Hot
                </button>

              </div>

            </div>

          ))}

      </div>

      {/* CHAT MODAL */}

      {selectedLead && (

        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "rgba(0,0,0,0.8)",

            display: "flex",

            justifyContent:
              "center",

            alignItems: "center",

            zIndex: 9999
          }}
        >

          <div
            style={{
              width: "700px",
              maxHeight: "80vh",
              overflowY: "auto",

              background:
                "#0f172a",

              padding: "30px",

              borderRadius: "20px"
            }}
          >

            {/* MODAL HEADER */}

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",

                alignItems: "center",

                marginBottom: "20px"
              }}
            >

              <h2>
                Conversation History
              </h2>

              <button
                onClick={() =>
                  setSelectedLead(
                    null
                  )
                }
                style={{
                  background:
                    "transparent",

                  border: "none",

                  color: "white",

                  fontSize: "24px",

                  cursor: "pointer"
                }}
              >
                ✖
              </button>

            </div>

            {/* MESSAGES */}

            {messages.map((msg) => (

              <div
                key={msg.id}

                style={{
                  background:
                    msg.role ===
                    "assistant"

                      ? "#2563eb"

                      : "#1e293b",

                  padding: "16px",

                  borderRadius: "14px",

                  marginBottom: "14px"
                }}
              >

                <strong>
                  {msg.role}
                </strong>

                <p>
                  {msg.content}
                </p>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>

  );
}

/* METRIC CARD */

function MetricCard({
  title,
  value
}) {

  return (

    <div
      style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "18px",
        minWidth: "180px"
      }}
    >

      <h3>{title}</h3>

      <h1
        style={{
          color: "#3b82f6"
        }}
      >
        {value}
      </h1>

    </div>

  );
}

/* BUTTON STYLE */

const buttonStyle = {

  padding: "10px 16px",

  borderRadius: "10px",

  border: "none",

  background: "#2563eb",

  color: "white",

  cursor: "pointer",

  fontWeight: "bold"
};

export default Dashboard;