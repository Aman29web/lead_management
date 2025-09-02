import React from "react";

const LeadList = ({ leads = [] }) => {
  if (!Array.isArray(leads)) {
    return <p className="text-gray-500">No leads available</p>;
  }

  return (
    <div className="mt-8 bg-emerald-50 shadow-lg rounded-xl p-6 border border-emerald-100 mx-4">
      <h2 className="text-xl font-semibold mb-4 text-emerald-900">
        Leads List
      </h2>

      {/* ✅ Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-emerald-200 text-sm rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-left text-white">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Source</th>
            </tr>
          </thead>
          <tbody>
            {leads.length > 0 ? (
              leads.map((lead) => (
                <tr
                  key={lead._id || lead.email}
                  className="border-t border-emerald-200 hover:bg-emerald-100 transition"
                >
                  <td className="p-3">{lead.name}</td>
                  <td className="p-3">{lead.email}</td>
                  <td className="p-3">{lead.phone}</td>
                  <td className="p-3">{lead.source}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="p-4 text-center text-gray-600 bg-emerald-50"
                >
                  No leads found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Mobile Card View */}
      <div className="grid gap-4 md:hidden">
        {leads.length > 0 ? (
          leads.map((lead) => (
            <div
              key={lead._id || lead.email}
              className="bg-white p-4 rounded-lg border border-emerald-200 shadow-sm"
            >
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-emerald-700">Name:</span>{" "}
                {lead.name}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-emerald-700">Email:</span>{" "}
                {lead.email}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-emerald-700">Phone:</span>{" "}
                {lead.phone}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-emerald-700">Source:</span>{" "}
                {lead.source}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No leads found</p>
        )}
      </div>
    </div>
  );
};

export default LeadList;
