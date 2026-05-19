import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {

    fetch(`${import.meta.env.VITE_API_URL}/api/chat`)
      .then(res => res.json())
      .then(data => {

        console.log(data);

        setLeads(data);

        setLoading(false);

      });

  }, []);

  // LOADING

  if (loading)
  {
    return (

      <div
        style={{
          backgroundColor: "#020617",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "30px"
        }}
      >

        Loading leads...

      </div>

    );
  }

  // FILTERED LEADS

  const filteredLeads = leads.filter(x => {

    const matchesSearch =
      x.location?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All"
        ? true
        : x.leadScore === filter;

    return matchesSearch && matchesFilter;

  });

  const isMobile =
    window.innerWidth < 768;

  return (

    <div
      style={{
        backgroundColor: "#020617",
        minHeight: "100vh",

        padding:
          isMobile
            ? "20px"
            : "40px",

        color: "white"
      }}
    >

      {/* TITLE */}

      <h1
        style={{
          fontSize:
            isMobile
              ? "36px"
              : "50px",

          marginBottom: "30px"
        }}
      >
        Leads Dashboard
      </h1>

      {/* SEARCH */}

      <input
        placeholder="Search by location..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          width: "100%",
          boxSizing: "border-box",

          padding: "16px",

          marginBottom: "20px",

          borderRadius: "12px",

          border: "1px solid #334155",

          backgroundColor: "#1e293b",

          color: "white",

          fontSize: "16px"
        }}
      />

      {/* FILTER */}

      <select
        value={filter}
        onChange={(e) =>
          setFilter(e.target.value)
        }
        style={{
          padding: "14px",

          marginBottom: "30px",

          borderRadius: "12px",

          border: "1px solid #334155",

          backgroundColor: "#1e293b",

          color: "white",

          fontSize: "16px"
        }}
      >

        <option>All</option>
        <option>Hot</option>
        <option>Warm</option>
        <option>Cold</option>

      </select>

      {/* CARDS */}

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            isMobile
              ? "1fr"
              : "repeat(4, 1fr)",

          gap: "20px",

          marginBottom: "30px"
        }}
      >

        {/* TOTAL */}

        <div
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateY(-5px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateY(0)";
          }}
        >

          <h2>Total Leads</h2>

          <p style={numberStyle}>
            {leads.length}
          </p>

        </div>

        {/* WARM */}

        <div
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateY(-5px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateY(0)";
          }}
        >

          <h2>Warm Leads</h2>

          <p style={numberStyle}>
            {
              leads.filter(x =>
                x.leadScore === "Warm"
              ).length
            }
          </p>

        </div>

        {/* HOT */}

        <div
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateY(-5px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateY(0)";
          }}
        >

          <h2>Hot Leads</h2>

          <p style={numberStyle}>
            {
              leads.filter(x =>
                x.leadScore === "Hot"
              ).length
            }
          </p>

        </div>

        {/* COLD */}

        <div
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateY(-5px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateY(0)";
          }}
        >

          <h2>Cold Leads</h2>

          <p style={numberStyle}>
            {
              leads.filter(x =>
                x.leadScore === "Cold"
              ).length
            }
          </p>

        </div>

      </div>

      {/* TABLE */}

      <div
        style={{
          overflowX: "auto"
        }}
      >

        <table
          style={{
            width: "100%",

            borderCollapse: "collapse",

            backgroundColor: "#0f172a",

            borderRadius: "20px",

            overflow: "hidden"
          }}
        >

          <thead>

            <tr
              style={{
                backgroundColor: "#1e293b"
              }}
            >

              <th style={thStyle}>
                Intent
              </th>

              <th style={thStyle}>
                Budget
              </th>

              <th style={thStyle}>
                Location
              </th>

              <th style={thStyle}>
                Lead Score
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredLeads.map((lead) => (

              <tr
                key={lead.id}

                onClick={() =>
                  navigate(`/leads/${lead.id}`)
                }

                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "#1e293b";
                }}

                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "transparent";
                }}

                style={{
                  borderBottom:
                    "1px solid #334155",

                  cursor: "pointer",

                  transition: "0.2s"
                }}
              >

                <td style={tdStyle}>
                  {lead.intent}
                </td>

                <td style={tdStyle}>
                  {lead.budget}
                </td>

                <td style={tdStyle}>
                  {lead.location}
                </td>

                <td style={tdStyle}>
                  {lead.leadScore}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}

const cardStyle = {

  backgroundColor: "#1e293b",

  padding: "25px",

  borderRadius: "20px",

  color: "white",

  transition: "0.2s",

  cursor: "pointer"
};

const numberStyle = {

  fontSize: "40px",

  fontWeight: "bold",

  marginTop: "10px"
};

const thStyle = {

  padding: "16px",

  textAlign: "left"
};

const tdStyle = {

  padding: "16px"
};

export default Dashboard;