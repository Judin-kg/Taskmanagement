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

    const waichatApiUrl = Deno.env.get("WAICHAT_API_URL") || "https://waichat.com/api/send";
    const waichatAccessToken = Deno.env.get("WAICHAT_ACCESS_TOKEN");
    const waichatInstanceId = Deno.env.get("WAICHAT_INSTANCE_ID");

    if (!waichatAccessToken || !waichatInstanceId) {
      console.error("Wai Chat API credentials not configured");
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

    const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');

    const waichatPayload = {
      number: cleanPhoneNumber,
      type: "text",
      message: messageText,
      instance_id: waichatInstanceId,
      access_token: waichatAccessToken,
    };

    const waichatResponse = await fetch(waichatApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(waichatPayload),
    });

    const waichatData = await waichatResponse.json();

    if (waichatResponse.ok) {
      return new Response(
        JSON.stringify({ success: true, data: waichatData }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      console.error("Wai Chat API error:", waichatData);
      return new Response(
        JSON.stringify({ success: false, error: waichatData }),
        {
          status: waichatResponse.status,
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
