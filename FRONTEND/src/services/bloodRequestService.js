const BASE_URL = "http://127.0.0.1:5000/api/blood";

// Get all emergency requests
export async function getBloodRequests() {
  const response = await fetch(`${BASE_URL}/requests`);

  if (!response.ok) {
    throw new Error("Failed to fetch blood requests");
  }

  return await response.json();
}

// Create emergency request
export async function createBloodRequest(data) {
  const response = await fetch(`${BASE_URL}/requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create request");
  }

  return result.request;
}

// Update request status
export async function updateBloodRequestStatus(id, status) {
  const response = await fetch(`${BASE_URL}/requests/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update request");
  }

  return result.request;
}

// Delete request
export async function deleteBloodRequest(id) {
  const response = await fetch(`${BASE_URL}/requests/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete request");
  }

  return result;
}