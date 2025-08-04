import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Calendly webhook payload
    const payload = await request.json();

    console.log("Calendly webhook received:", payload);

    // Verify webhook signature (recommended for production)
    const signature = request.headers.get("calendly-webhook-signature");
    // In production, verify this signature against your webhook secret

    // Handle different event types
    const eventType = payload.event;

    switch (eventType) {
      case "invitee.created":
        await handleBookingCreated(payload);
        break;
      case "invitee.canceled":
        await handleBookingCanceled(payload);
        break;
      case "invitee.rescheduled":
        await handleBookingRescheduled(payload);
        break;
      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Calendly webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

// Handle new booking creation
async function handleBookingCreated(payload) {
  const { created_by, event_type, start_time, end_time } = payload.payload;

  console.log("New booking created:", {
    customerEmail: created_by.email,
    customerName: created_by.name,
    eventType: event_type.name,
    startTime: start_time,
    endTime: end_time,
  });

  // Here you could:
  // 1. Send additional confirmation emails
  // 2. Update your internal booking database
  // 3. Trigger other business processes
  // 4. Send SMS notifications
  // 5. Update CRM systems
}

// Handle booking cancellation
async function handleBookingCanceled(payload) {
  const { created_by, event_type, start_time } = payload.payload;

  console.log("Booking canceled:", {
    customerEmail: created_by.email,
    customerName: created_by.name,
    eventType: event_type.name,
    originalStartTime: start_time,
  });

  // Handle cancellation logic:
  // 1. Send cancellation confirmation emails
  // 2. Free up calendar slots
  // 3. Update internal systems
  // 4. Notify staff
}

// Handle booking rescheduling
async function handleBookingRescheduled(payload) {
  const { created_by, event_type, start_time, end_time } = payload.payload;

  console.log("Booking rescheduled:", {
    customerEmail: created_by.email,
    customerName: created_by.name,
    eventType: event_type.name,
    newStartTime: start_time,
    newEndTime: end_time,
  });

  // Handle rescheduling logic:
  // 1. Send rescheduling confirmation emails
  // 2. Update calendar
  // 3. Notify staff of changes
}

// GET method for webhook verification (if needed)
export async function GET(request) {
  // Some webhook services require GET endpoint verification
  const { searchParams } = new URL(request.url);
  const challenge = searchParams.get("challenge");

  if (challenge) {
    return NextResponse.json({ challenge });
  }

  return NextResponse.json({ status: "Calendly webhook endpoint active" });
}
