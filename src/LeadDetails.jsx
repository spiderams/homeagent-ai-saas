import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function LeadDetails() {

  const { id } = useParams();

  const [lead, setLead] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    fetch(`https://localhost:32769/api/leads/${id}`)
      .then(res => res.json())
      .then(data => {

        setLead(data);

      });

    fetch(`https://localhost:32769/api/leads/${id}/messages`)
      .then(res => res.json())
      .then(data => {

        setMessages(data);

      });

  }, [id]);

  if (!lead)
  {
    return <div>Loading...</div>;
  }

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
          fontSize: "40px",
          marginBottom: "20px"
        }}
      >
        Lead Details
      </h1>

      {/* LEAD INFO */}

      <div
        style={{
          backgroundColor: "#1e293b",
          padding: "25px",
          borderRadius: "20px",
          marginBottom: "30px"
        }}
      >

        <p>
          <strong>Intent:</strong> {lead.intent}
        </p>

        <p>
          <strong>Budget:</strong> {lead.budget}
        </p>

        <p>
          <strong>Location:</strong> {lead.location}
        </p>

        <p>
          <strong>Lead Score:</strong> {lead.leadScore}
        </p>

      </div>

      {/* CHAT HISTORY */}

      <div>

        <h2
          style={{
            marginBottom: "20px"
          }}
        >
          Conversation History
        </h2>

        {messages.map((msg, index) => (

          <div
            key={index}
            style={{
              display: "flex",
              justifyContent:
                msg.role === "user"
                  ? "flex-end"
                  : "flex-start",
              marginBottom: "15px"
            }}
          >

            <div
              style={{
                backgroundColor:
                  msg.role === "user"
                    ? "#2563eb"
                    : "#1e293b",
                padding: "16px",
                borderRadius: "18px",
                maxWidth: "70%"
              }}
            >

              <div
                style={{
                  fontSize: "12px",
                  opacity: 0.7,
                  marginBottom: "6px"
                }}
              >

                {msg.role === "user"
                  ? "You"
                  : "AI"}

              </div>

              <div>
                {msg.content}
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}

export default LeadDetails;