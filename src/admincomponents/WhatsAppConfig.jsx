import React, { useState, useEffect } from "react";
import { createWhatsAppInstance, getQRCode } from "../services/whatsappService";
import "./WhatsAppConfig.css";

function WhatsAppConfig() {
  const [instanceId, setInstanceId] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const savedInstanceId = localStorage.getItem("whatsapp_instance_id");
    if (savedInstanceId) {
      setInstanceId(savedInstanceId);
      setStatus("Instance ID already configured");
    }
  }, []);

  const handleCreateInstance = async () => {
    setLoading(true);
    setStatus("Creating WhatsApp instance...");
    try {
      const newInstanceId = await createWhatsAppInstance();
      setInstanceId(newInstanceId);
      setStatus("Instance created successfully! Now scan the QR code.");
    } catch (error) {
      setStatus("Failed to create instance: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetQRCode = async () => {
    if (!instanceId) {
      setStatus("Please create an instance first");
      return;
    }

    setLoading(true);
    setStatus("Fetching QR code...");
    try {
      const response = await getQRCode(instanceId);
      if (response.qr_code) {
        setQrCode(response.qr_code);
        setStatus("Scan this QR code with WhatsApp to connect");
      } else {
        setStatus("Already connected or QR code not available");
      }
    } catch (error) {
      setStatus("Failed to get QR code: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="whatsapp-config-container">
      <h2>WhatsApp Configuration</h2>
      <div className="config-content">
        <div className="status-section">
          <h3>Status</h3>
          <p className={status.includes("Failed") ? "error" : "info"}>{status || "Not configured"}</p>
          {instanceId && (
            <div className="instance-info">
              <strong>Instance ID:</strong> {instanceId}
            </div>
          )}
        </div>

        <div className="actions-section">
          <h3>Actions</h3>
          {!instanceId ? (
            <button
              onClick={handleCreateInstance}
              disabled={loading}
              className="btn-primary"
            >
              {loading ? "Creating..." : "Create WhatsApp Instance"}
            </button>
          ) : (
            <button
              onClick={handleGetQRCode}
              disabled={loading}
              className="btn-primary"
            >
              {loading ? "Loading..." : "Get QR Code"}
            </button>
          )}
        </div>

        {qrCode && (
          <div className="qr-section">
            <h3>Scan QR Code</h3>
            <img src={qrCode} alt="WhatsApp QR Code" className="qr-code" />
            <p className="instruction">
              Open WhatsApp on your phone and scan this QR code to connect.
            </p>
          </div>
        )}

        <div className="info-section">
          <h3>Instructions</h3>
          <ol>
            <li>Click "Create WhatsApp Instance" to generate a new instance</li>
            <li>Click "Get QR Code" to display the QR code</li>
            <li>Open WhatsApp on your phone</li>
            <li>Go to Settings &gt; Linked Devices &gt; Link a Device</li>
            <li>Scan the QR code displayed above</li>
            <li>Once connected, WhatsApp notifications will be sent automatically when tasks are assigned</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default WhatsAppConfig;
