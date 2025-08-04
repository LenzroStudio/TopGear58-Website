# 📅 Calendly Configuration Guide - Next Steps

## What You've Completed ✅
- [x] Created Calendly Developer account
- [x] Generated access token: `SPeBnPKDaRKOQUosBJ3K6xwG2CwDTPb8Qb1xpS4rFOI`
- [x] Set up OAuth app with redirect URI: `https://topgear58.com/api/calendly/callback`

## 🎯 Next Steps to Complete Integration

### Step 1: Create Event Type
1. Go to your main Calendly dashboard: [calendly.com](https://calendly.com)
2. Click **"+ Create"** → **"Event Type"**
3. Choose **"One-on-One"** or **"Group"** (recommended: One-on-One)
4. Set up your event:
   ```
   Event Name: TopGear58 Service Appointment
   Duration: 60 minutes (adjust as needed)
   Location: TopGear58 Service Center
   ```

### Step 2: Configure Event Details
**Scheduling Settings:**
- Available times: Monday-Thursday 8AM-5PM, Friday 8AM-12:30PM
- Buffer times: 15 minutes before/after
- Date range: 60 days in advance

**Questions for Invitees:**
Add these custom questions:
- Service Type (dropdown: Oil Change, Brake Service, Engine Repair, etc.)
- Vehicle Information (text field)
- Additional Notes (text area)

### Step 3: Get Event Type URI
1. After creating the event, go to the event settings
2. The URL will look like: `https://calendly.com/your-username/service-appointment`
3. To get the API URI:
   - Go to [developer.calendly.com](https://developer.calendly.com)
   - Use the API Explorer or make a GET request to: `https://api.calendly.com/event_types`
   - Find your event type and copy the `uri` field
   - It will look like: `https://api.calendly.com/event_types/AAAA1111-BBBB-2222-CCCC-333333333333`

### Step 4: Set Up Webhooks
1. In [Calendly Developer Console](https://developer.calendly.com/)
2. Go to **"Webhooks"** section
3. Create a new webhook:
   ```
   Webhook URL: https://topgear58.com/api/calendly/callback
   Events:
   ✓ invitee.created
   ✓ invitee.canceled  
   ✓ invitee.rescheduled
   ```
4. Copy the webhook signing secret

### Step 5: Update Environment Variables
Add to your `.env.local` file:
```env
# Your existing access token
CALENDLY_ACCESS_TOKEN=SPeBnPKDaRKOQUosBJ3K6xwG2CwDTPb8Qb1xpS4rFOI

# Event type URI (get from Step 3)
CALENDLY_EVENT_TYPE_URI=https://api.calendly.com/event_types/YOUR_EVENT_TYPE_UUID

# Webhook secret (get from Step 4)
CALENDLY_WEBHOOK_SECRET=your_webhook_signing_secret_here
```

### Step 6: Test Integration
1. Start your development server: `npm run dev`
2. Fill out your booking form
3. Check that:
   - Booking appears in your Calendly calendar
   - Customer receives confirmation email
   - You receive business notification email
   - Webhook logs appear in console

## 🔧 Configuration Tips

### Business Hours Setup
Your current business hours are already configured:
- **Monday-Thursday:** 8:00 AM - 5:00 PM
- **Friday:** 8:00 AM - 12:30 PM  
- **Saturday-Sunday:** Closed

### Service Types
Make sure your Calendly event questions match your booking form:
```javascript
// In your booking form (already configured)
"Oil Change"
"Brake Service" 
"Engine Repair"
"Transmission Service"
"Tire Service"
"General Inspection"
"Emergency Repair"
```

### Email Integration
Your system will automatically:
- Send confirmation emails to customers
- Send booking notifications to your business email
- Handle cancellations and rescheduling

## 🚨 Common Issues & Solutions

**Issue:** Can't find Event Type URI
**Solution:** Use Calendly API Explorer or make GET request to `/event_types` endpoint

**Issue:** Webhooks not working
**Solution:** Check that your server is publicly accessible and webhook URL is correct

**Issue:** Time zone problems
**Solution:** Set your Calendly account timezone to match your business location

## 📞 Need Help?
If you get stuck on any step:
1. Check the Calendly Developer Documentation
2. Use the API Explorer in the developer console
3. Test webhooks with a tool like ngrok for local development

## ✅ Final Checklist
- [ ] Event type created with proper business hours
- [ ] Custom questions added for service details
- [ ] Event type URI copied to `.env.local`
- [ ] Webhooks configured and secret added
- [ ] Test booking completed successfully
- [ ] Emails sending properly

Once all steps are complete, your booking system will be fully integrated with Calendly! 🏁
