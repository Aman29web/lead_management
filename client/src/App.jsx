import React, { useEffect, useState } from "react";
import LeadForm from "./components/LeadForm";
import LeadList from "./components/LeadList";

const App = () => {
  const [leads, setLeads] = useState([]);

  // fetch leads from backend
  const fetchLeads = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/leads");
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (err) {
      console.error("❌ Error fetching leads:", err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleLeadAdded = (newLead) => {
    setLeads((prev) => [...prev, newLead]);
  };

  return (
    <div className="p-6">
      <LeadForm onLeadAdded={handleLeadAdded} />
      <LeadList leads={leads} />
    </div>
  );
};

export default App;
