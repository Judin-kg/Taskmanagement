import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { phoneNumber, taskName, description, scheduledTime, assignedBy, companyName } = await req.json();

    if (!phoneNumber) {
      return new Response(
        JSON.stringify({ success: false, error: "Phone number is required" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const watiApiUrl = Deno.env.get("WATI_API_URL") || "https://live-server-XXXXX.wati.io/api/v1/sendSessionMessage";
    const watiApiToken = Deno.env.get("WATI_API_TOKEN");

    if (!watiApiToken) {
      console.error("WATI API token not configured");
      return new Response(
        JSON.stringify({ success: false, error: "WhatsApp service not configured" }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const formattedScheduledTime = new Date(scheduledTime).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const messageText = `Hello! You have been assigned a new task:\n\n` +
      `📋 Task: ${taskName}\n` +
      `📝 Description: ${description || 'N/A'}\n` +
      `⏰ Scheduled Time: ${formattedScheduledTime}\n` +
      `🏢 Company: ${companyName || 'N/A'}\n` +
      `👤 Assigned By: ${assignedBy}\n\n` +
      `Please complete this task on time. Thank you!`;

    const watiPayload = {
      phoneNumber: phoneNumber.startsWith("+") ? phoneNumber : `+91${phoneNumber}`,
      messageText: messageText,
    };

    const watiResponse = await fetch(watiApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${watiApiToken}`,
      },
      body: JSON.stringify(watiPayload),
    });

    const watiData = await watiResponse.json();

    if (watiResponse.ok) {
      return new Response(
        JSON.stringify({ success: true, data: watiData }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      console.error("WATI API error:", watiData);
      return new Response(
        JSON.stringify({ success: false, error: watiData }),
        {
          status: watiResponse.status,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    console.error("Error in send-whatsapp function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
