import { useState } from "react";

function App() {

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const [isTyping, setIsTyping] =
    useState(false);

  const sendMessage = async () => {

    if (!message) return;

    // USER MESSAGE

    const userMessage = {
      role: "user",
      text: message
    };

    setMessages(prev => [
      ...prev,
      userMessage
    ]);

    setMessage("");

    setIsTyping(true);

    try {

      // API CALL

      const response = await fetch(
        "https://localhost:32769/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            sessionId: "user123",
            message: message
          })
        }
      );

      const data =
        await response.json();

      console.log(data);

      // AI MESSAGE

      const aiMessage = {
        role: "assistant",
        text: data.reply
      };

      setMessages(prev => [
        ...prev,
        aiMessage
      ]);

    }
    catch (error)
    {
      console.error(error);
    }

    setIsTyping(false);
  };

  const isMobile =
    window.innerWidth < 768;

  return (

    <div
      style={{
        backgroundColor: "#020617",
        minHeight: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        padding:
          isMobile
            ? "10px"
            : "20px"
      }}
    >

      {/* CHAT CONTAINER */}

      <div
        style={{
          width: "100%",

          maxWidth: "900px",

          backgroundColor: "#0f172a",

          borderRadius: "25px",

          overflow: "hidden",

          border:
            "1px solid #1e293b"
        }}
      >

        {/* HEADER */}

        <div
          style={{
            padding:
              isMobile
                ? "20px"
                : "25px",

            borderBottom:
              "1px solid #1e293b",

            display: "flex",

            justifyContent:
              "space-between",

            alignItems: "center"
          }}
        >

          <div>

            <h1
              style={{
                color: "white",

                fontSize:
                  isMobile
                    ? "28px"
                    : "40px",

                margin: 0
              }}
            >
              HomeAgent AI
            </h1>

            <p
              style={{
                color: "#94a3b8",

                marginTop: "10px",

                fontSize:
                  isMobile
                    ? "14px"
                    : "16px"
              }}
            >
              AI-powered lead qualification platform
            </p>

          </div>

          <div
            style={{
              backgroundColor:
                "#14532d",

              color: "#4ade80",

              padding:
                "10px 18px",

              borderRadius: "999px",

              fontSize:
                isMobile
                  ? "12px"
                  : "14px"
            }}
          >
            Online
          </div>

        </div>

        {/* CHAT AREA */}

        <div
          style={{
            height:
              isMobile
                ? "400px"
                : "500px",

            overflowY: "auto",

            padding:
              isMobile
                ? "15px"
                : "20px"
          }}
        >

          {/* MESSAGES */}

          {messages.map((msg, index) => (

            <div
              key={index}
              style={{
                display: "flex",

                justifyContent:
                  msg.role === "user"
                    ? "flex-end"
                    : "flex-start",

                marginBottom: "20px"
              }}
            >

              <div
                style={{
                  backgroundColor:
                    msg.role === "user"
                      ? "#2563eb"
                      : "#1e293b",

                  color: "white",

                  padding: "16px",

                  borderRadius: "18px",

                  maxWidth:
                    isMobile
                      ? "90%"
                      : "70%"
                }}
              >

                {/* LABEL */}

                <div
                  style={{
                    fontSize: "12px",

                    opacity: 0.7,

                    marginBottom: "8px"
                  }}
                >

                  {msg.role === "user"
                    ? "You"
                    : "🤖 AI Assistant"}

                </div>

                {/* MESSAGE */}

                <div>
                  {msg.text}
                </div>

              </div>

            </div>

          ))}

          {/* AI TYPING */}

          {isTyping && (

            <div
              style={{
                display: "flex",
                justifyContent: "flex-start"
              }}
            >

              <div
                style={{
                  backgroundColor:
                    "#1e293b",

                  color: "white",

                  padding: "16px",

                  borderRadius: "18px"
                }}
              >

                🤖 AI is typing...

              </div>

            </div>

          )}

        </div>

        {/* INPUT AREA */}

        <div
          style={{
            padding:
              isMobile
                ? "15px"
                : "20px",

            borderTop:
              "1px solid #1e293b",

            display: "flex",

            gap: "12px"
          }}
        >

          {/* INPUT */}

          <input
            value={message}

            onChange={(e) =>
              setMessage(e.target.value)
            }

            placeholder="Type your message..."

            onKeyDown={(e) => {

              if (e.key === "Enter")
              {
                sendMessage();
              }

            }}

            style={{
              flex: 1,

              padding: "16px",

              borderRadius: "12px",

              border:
                "1px solid #334155",

              backgroundColor:
                "#1e293b",

              color: "white",

              fontSize: "16px",

              outline: "none"
            }}
          />

          {/* BUTTON */}

          <button
            onClick={sendMessage}

            style={{
              backgroundColor:
                "#2563eb",

              color: "white",

              border: "none",

              padding:
                isMobile
                  ? "14px 18px"
                  : "16px 24px",

              borderRadius: "12px",

              fontWeight: "bold",

              cursor: "pointer",

              transition:
                "0.2s"
            }}

            onMouseEnter={(e) => {
              e.target.style.transform =
                "scale(1.05)";
            }}

            onMouseLeave={(e) => {
              e.target.style.transform =
                "scale(1)";
            }}
          >

            Send

          </button>

        </div>

      </div>

    </div>

  );
}

export default App;