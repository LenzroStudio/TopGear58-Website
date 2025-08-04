# 🚀 Quick Calendly Integration Steps

## What You Have ✅
- Calendly Account: `topgear58-info`
- Event Type: `new-meeting`
- Scheduling URL: `https://calendly.com/topgear58-info/new-meeting`
- Access Token: `SPeBnPKDaRKOQUosBJ3K6xwG2CwDTPb8Qb1xpS4rFOI`

## 🎯 Next Steps (2 minutes):

### Method 1: Quick API Call
1. Open browser developer tools (F12)
2. Go to Console tab
3. Paste this code and press Enter:

```javascript
fetch('https://api.calendly.com/event_types', {
  headers: {
    'Authorization': 'Bearer SPeBnPKDaRKOQUosBJ3K6xwG2CwDTPb8Qb1xpS4rFOI',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => {
  const event = data.collection.find(e => e.slug === 'new-meeting');
  if (event) {
    console.log('🎯 Your Event Type URI:', event.uri);
    console.log('📋 Add to .env.local:', `CALENDLY_EVENT_TYPE_URI=${event.uri}`);
  }
});
```

### Method 2: Using the Script
1. Run: `node get-calendly-uri.js`
2. Copy the URI from the output

### Method 3: Manual Construction
Your URI will likely be:
`https://api.calendly.com/event_types/XXXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX`

## 📝 Create Your .env.local File

Once you get the URI, create `.env.local` with:

```env
# Calendly Configuration
CALENDLY_ACCESS_TOKEN=SPeBnPKDaRKOQUosBJ3K6xwG2CwDTPb8Qb1xpS4rFOI
CALENDLY_EVENT_TYPE_URI=https://api.calendly.com/event_types/YOUR_ACTUAL_UUID
CALENDLY_WEBHOOK_SECRET=your_webhook_secret_from_developer_console

# Email Configuration (Gmail SMTP - Easiest)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_business_email@gmail.com
SMTP_PASS=your_gmail_app_password

# Business Information
BUSINESS_EMAIL=info@topgear58.com
BUSINESS_PHONE=+1 (555) 123-4567
BUSINESS_ADDRESS=123 Auto Service Blvd, City, State 12345
```

## 🧪 Test Integration

After adding the URI:
1. Restart your dev server: `npm run dev`
2. Submit a test booking
3. Check that the booking appears in your Calendly calendar
4. Verify emails are sent

## ✅ Expected Result

When complete, your booking system will:
- ✅ Create appointments in Calendly automatically
- ✅ Send professional confirmation emails
- ✅ Handle business hours validation
- ✅ Provide real-time notifications

## 🚨 If You Get Stuck

The most common URI format will be:
`https://api.calendly.com/event_types/` + UUID

You can also check your Calendly dashboard → Event Types → Click on "new-meeting" → Look for any API information or UUID in the URL.

---

**You're almost done! Just need the event type URI and you'll have a fully functional booking system! 🏁**
