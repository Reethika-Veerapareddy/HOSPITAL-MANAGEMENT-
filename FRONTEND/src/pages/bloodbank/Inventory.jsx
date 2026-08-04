import React, { useEffect, useMemo, useState } from "react";
import { getInventory, addBlood, deleteBlood } from "../../services/bloodService";
import "./Inventory.css";

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [formData, setFormData] = useState({
    blood_group: "",
    component: "",
    units: "",
    collection_date: "",
    expiry_date: "",
    status: "Available",
    hospital_name: "Smart Hospital",
  });

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      const data = await getInventory();
      setInventory(data);
    } catch (error) {
      console.error("Inventory load error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addBlood(formData);

      alert("Blood stock added successfully");

      setFormData({
        blood_group: "",
        component: "",
        units: "",
        collection_date: "",
        expiry_date: "",
        status: "Available",
        hospital_name: "Smart Hospital",
      });

      loadInventory();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blood stock?")) return;

    try {
      await deleteBlood(id);
      loadInventory();
    } catch (error) {
      alert(error.message);
    }
  };

  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      const matchesSearch =
        item.blood_group.toLowerCase().includes(search.toLowerCase()) ||
        item.component.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [inventory, search, statusFilter]);

  const totalUnits = inventory.reduce((sum, item) => sum + Number(item.units || 0), 0);
  const criticalCount = inventory.filter((item) => item.status === "Critical").length;
  const lowCount = inventory.filter((item) => item.status === "Low").length;

  return (
    <div className="inventory-page">
      <div className="inventory-header">
        <div>
          <h1>🩸 Blood Inventory Management</h1>
          <p>Manage blood stock, components, expiry dates, and availability</p>
        </div>
      </div>

      <div className="inventory-kpis">
        <div className="inventory-kpi">
          <h2>{totalUnits}</h2>
          <p>Total Units</p>
        </div>

        <div className="inventory-kpi critical">
          <h2>{criticalCount}</h2>
          <p>Critical Stock</p>
        </div>

        <div className="inventory-kpi warning">
          <h2>{lowCount}</h2>
          <p>Low Stock</p>
        </div>
      </div>

      <div className="inventory-layout">
        <div className="inventory-form-card">
          <h2>Add Blood Stock</h2>

          <form onSubmit={handleSubmit}>
            <select
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
              required
            >
              <option value="">Select Blood Group</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>O+</option>
              <option>O-</option>
              <option>AB+</option>
              <option>AB-</option>
            </select>

            <select
              name="component"
              value={formData.component}
              onChange={handleChange}
              required
            >
              <option value="">Select Component</option>
              <option>Whole Blood</option>
              <option>Packed RBC</option>
              <option>Plasma</option>
              <option>Platelets</option>
            </select>

            <input
              type="number"
              name="units"
              placeholder="Units"
              value={formData.units}
              onChange={handleChange}
              required
            />

            <label>Collection Date</label>
            <input
              type="date"
              name="collection_date"
              value={formData.collection_date}
              onChange={handleChange}
            />

            <label>Expiry Date</label>
            <input
              type="date"
              name="expiry_date"
              value={formData.expiry_date}
              onChange={handleChange}
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option>Available</option>
              <option>Low</option>
              <option>Critical</option>
            </select>

            <button type="submit">
              Add Blood Stock
            </button>
          </form>
        </div>

        <div className="inventory-table-card">
          <div className="table-toolbar">
            <input
              type="text"
              placeholder="Search blood group or component"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All</option>
              <option>Available</option>
              <option>Low</option>
              <option>Critical</option>
            </select>
          </div>

          <table>
            <thead>
              <tr>
                <th>Blood Group</th>
                <th>Component</th>
                <th>Units</th>
                <th>Status</th>
                <th>Expiry</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredInventory.map((item) => (
                <tr key={item.id}>
                  <td><strong>{item.blood_group}</strong></td>
                  <td>{item.component}</td>
                  <td>{item.units}</td>
                  <td>
                    <span className={`status ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>{item.expiry_date || "-"}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}