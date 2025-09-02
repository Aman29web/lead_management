import React, { useState } from "react";

const LeadForm = ({ onLeadAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name) errs.name = "Name is required";

    if (!formData.email) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Invalid email";
    }

    if (!formData.phone) {
      errs.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errs.phone = "Phone must be 10 digits";
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const errs = validate();
  if (Object.keys(errs).length > 0) {
    setErrors(errs);
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/leads/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const newLead = await response.json();
      if (onLeadAdded) onLeadAdded(newLead); // notify parent
      setFormData({ name: "", email: "", phone: "", source: "" });
      setErrors({});
    } else {
      console.error("❌ Error saving lead");
    }
  } catch (err) {
    console.error("❌ Error:", err);
  }
};


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-emerald-50 p-6 max-w-md mx-auto border border-emerald-100 mt-5"
    >
      <h2 className="text-xl font-semibold mb-6 text-emerald-900">Add Lead</h2>

      {Object.keys(formData).map((field) => (
        <div key={field} className="mb-4">
          <label
            htmlFor={field}
            className="block mb-1 capitalize text-gray-800 font-medium"
          >
            {field}
          </label>
          <input
            id={field}
            name={field}
            type="text"
            value={formData[field]}
            onChange={handleChange}
            className="w-full border border-emerald-300  px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {errors[field] && (
            <p className="text-sm text-red-600 mt-1">{errors[field]}</p>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-2 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-colors shadow-md font-medium"
      >
        Save Lead
      </button>
    </form>
  );
};

export default LeadForm;
