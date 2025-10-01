import axios from "axios";

const WAICHAT_API_BASE = "https://waichat.com/api";
const ACCESS_TOKEN = "651665c15e234";

const getInstanceId = () => {
  return localStorage.getItem("whatsapp_instance_id");
};

const setInstanceId = (instanceId) => {
  localStorage.setItem("whatsapp_instance_id", instanceId);
};

export const createWhatsAppInstance = async () => {
  try {
    const response = await axios.post(
      `${WAICHAT_API_BASE}/create_instance?access_token=${ACCESS_TOKEN}`
    );
    if (response.data.instance_id) {
      setInstanceId(response.data.instance_id);
      return response.data.instance_id;
    }
    throw new Error("Failed to create instance");
  } catch (error) {
    console.error("Error creating WhatsApp instance:", error);
    throw error;
  }
};

export const getQRCode = async (instanceId) => {
  try {
    const response = await axios.post(
      `${WAICHAT_API_BASE}/get_qrcode?instance_id=${instanceId}&access_token=${ACCESS_TOKEN}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting QR code:", error);
    throw error;
  }
};

export const sendTaskAssignmentWhatsApp = async (phoneNumber, taskDetails) => {
  const instanceId = getInstanceId();

  if (!instanceId) {
    console.warn("WhatsApp instance not configured. Skipping WhatsApp notification.");
    return { success: false, message: "Instance not configured" };
  }

  const message = `
*Task Assignment Notification*

Task Name: ${taskDetails.taskName}
Description: ${taskDetails.description || "N/A"}
Scheduled Time: ${new Date(taskDetails.scheduledTime).toLocaleString()}
Status: ${taskDetails.status}
Company: ${taskDetails.company?.name || "N/A"}
Assigned By: ${taskDetails.assignedBy?.name || "Admin"}

Please complete this task on time.
  `.trim();

  try {
    const response = await axios.post(
      `${WAICHAT_API_BASE}/send`,
      {
        number: phoneNumber,
        type: "text",
        message: message,
        instance_id: instanceId,
        access_token: ACCESS_TOKEN,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return {
      success: false,
      message: error.response?.data?.message || error.message
    };
  }
};

export const sendWhatsAppMessage = async (phoneNumber, message) => {
  const instanceId = getInstanceId();

  if (!instanceId) {
    console.warn("WhatsApp instance not configured. Skipping WhatsApp notification.");
    return { success: false, message: "Instance not configured" };
  }

  try {
    const response = await axios.post(
      `${WAICHAT_API_BASE}/send`,
      {
        number: phoneNumber,
        type: "text",
        message: message,
        instance_id: instanceId,
        access_token: ACCESS_TOKEN,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return {
      success: false,
      message: error.response?.data?.message || error.message
    };
  }
};

export const reconnectWhatsApp = async () => {
  const instanceId = getInstanceId();

  if (!instanceId) {
    throw new Error("No instance ID found");
  }

  try {
    const response = await axios.post(
      `${WAICHAT_API_BASE}/reconnect?instance_id=${instanceId}&access_token=${ACCESS_TOKEN}`
    );
    return response.data;
  } catch (error) {
    console.error("Error reconnecting WhatsApp:", error);
    throw error;
  }
};
