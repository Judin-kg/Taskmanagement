import axios from "axios";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const sendWhatsAppMessage = async (phoneNumber, taskDetails) => {
  try {
    const apiUrl = `${SUPABASE_URL}/functions/v1/send-whatsapp`;

    const headers = {
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    };

    const payload = {
      phoneNumber,
      taskName: taskDetails.taskName,
      description: taskDetails.description,
      scheduledTime: taskDetails.scheduledTime,
      assignedBy: taskDetails.assignedBy,
      companyName: taskDetails.companyName
    };

    const response = await axios.post(apiUrl, payload, { headers });

    if (response.data.success) {
      console.log("WhatsApp message sent successfully:", response.data);
      return { success: true, data: response.data };
    } else {
      console.error("Failed to send WhatsApp message:", response.data);
      return { success: false, error: response.data };
    }
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return { success: false, error: error.message };
  }
};

const getUserPhoneNumber = async (userId, role) => {
  try {
    let endpoint = "";

    if (role === "manager") {
      endpoint = `/api/managers/${userId}`;
    } else if (role === "assistantmanager") {
      endpoint = `/api/assistant-managers/${userId}`;
    } else if (role === "staff") {
      endpoint = `/api/auth/${userId}`;
    }

    if (endpoint) {
      const response = await axios.get(`https://task-managment-server-al5a.vercel.app${endpoint}`);
      return response.data?.phoneNumber || response.data?.contact || null;
    }

    return null;
  } catch (error) {
    console.error("Error fetching user phone number:", error);
    return null;
  }
};

export { sendWhatsAppMessage, getUserPhoneNumber };
