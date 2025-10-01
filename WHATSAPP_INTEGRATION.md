# WhatsApp Integration for Task Assignment

This application now includes WhatsApp notification functionality using the Waichat API. When tasks are assigned to staff members, they will automatically receive a WhatsApp notification.

## Setup Instructions

### 1. Configure WhatsApp Instance

1. Log in to the Admin Dashboard
2. Navigate to "WhatsApp Config" in the sidebar
3. Click "Create WhatsApp Instance" to generate a new instance
4. Click "Get QR Code" to display the QR code for authentication
5. Open WhatsApp on your phone
6. Go to Settings > Linked Devices > Link a Device
7. Scan the QR code displayed in the configuration page

### 2. Ensure User Phone Numbers are Available

For WhatsApp notifications to work, users must have their phone numbers stored in the database. The phone number should be in international format without the '+' sign.

Example: `84933313xxx` for a Vietnamese number

### 3. How It Works

When an Admin, Manager, or Assistant Manager assigns a task to a staff member:

1. The task is created in the database
2. The system checks if the assigned user has a phone number
3. If a phone number exists and WhatsApp is configured, a notification is sent automatically
4. The notification includes:
   - Task name
   - Description
   - Scheduled time
   - Status
   - Company name
   - Assigned by information

### 4. Notification Format

The WhatsApp message will look like this:

```
*Task Assignment Notification*

Task Name: Complete Monthly Report
Description: Prepare and submit the monthly sales report
Scheduled Time: 1/15/2025, 2:00:00 PM
Status: pending
Company: ABC Corporation
Assigned By: Admin

Please complete this task on time.
```

## Technical Details

### API Configuration

- **API Base URL**: `https://waichat.com/api`
- **Access Token**: `651665c15e234` (configured in the code)
- **Instance ID**: Stored in browser localStorage after creation

### Files Modified

1. **src/services/whatsappService.js** - Core WhatsApp API integration
2. **src/admincomponents/TaskAssignFormModal.jsx** - Admin task assignment with WhatsApp
3. **src/managercomponents/ManagerTaskAssignModal.jsx** - Manager task assignment with WhatsApp
4. **src/assistantmanagercomponents/AsstManagerTaskAssignList.jsx** - Assistant Manager task assignment with WhatsApp
5. **src/admincomponents/WhatsAppConfig.jsx** - Configuration interface
6. **src/admincomponents/AdminDashboard.jsx** - Added WhatsApp Config menu item

### Error Handling

The system gracefully handles WhatsApp notification failures:
- If the instance is not configured, tasks are still created but no notification is sent
- If the user doesn't have a phone number, the task is created without notification
- Any WhatsApp API errors are logged to the console but don't prevent task creation

## Troubleshooting

### QR Code Not Appearing
- Ensure you've created an instance first
- Check browser console for any API errors
- Try refreshing the QR code

### Notifications Not Sending
- Verify the WhatsApp instance is connected (scan QR code)
- Ensure user phone numbers are in the correct format
- Check browser console for error messages
- Verify the instance ID is stored in localStorage

### Connection Lost
- If WhatsApp disconnects, you'll need to scan the QR code again
- The system will continue to work; only WhatsApp notifications will be affected

## Support

For issues with the Waichat API:
- Visit: https://waichat.com
- API Documentation: https://waichat.com/api

## Future Enhancements

Potential improvements for future versions:
- Webhook integration for receiving message status
- Support for group messaging
- Custom message templates
- Delivery confirmation tracking
- Multiple instance support for different departments
