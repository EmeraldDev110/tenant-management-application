import React, { useEffect, useState } from "react";
import axios from "axios";

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("http://localhost:4000/api/invoices", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setInvoices(response.data);
      } catch (err) {
        console.error("Error fetching invoices:", err);
        setError("Failed to load invoices.");
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold text-center mb-4">Your Invoices</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4">Invoice ID</th>
            <th className="py-2 px-4">Description</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="text-center border-t">
              <td className="py-2 px-4">{invoice.id}</td>
              <td className="py-2 px-4">{invoice.invoice_description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Invoices;
