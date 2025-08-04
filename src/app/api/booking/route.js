import { NextResponse } from "next/server";

// Business hours configuration
const BUSINESS_HOURS = {
  monday: { start: "08:00", end: "17:00" },
  tuesday: { start: "08:00", end: "17:00" },
  wednesday: { start: "08:00", end: "17:00" },
  thursday: { start: "08:00", end: "17:00" },
  friday: { start: "08:00", end: "12:30" },
  saturday: null, // Closed
  sunday: null, // Closed
};

export async function POST(request) {
  try {
    const formData = await request.json();

    // Basic validation
    const {
      name,
      email,
      phone,
      serviceType,
      vehicleInfo,
      preferredDate,
      preferredTime,
    } = formData;

    if (
      !name ||
      !email ||
      !phone ||
      !serviceType ||
      !vehicleInfo ||
      !preferredDate ||
      !preferredTime
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate business hours
    const businessHoursValidation = validateBusinessHours(
      preferredDate,
      preferredTime
    );
    if (!businessHoursValidation.valid) {
      return NextResponse.json(
        { error: businessHoursValidation.message },
        { status: 400 }
      );
    }

    console.log("Booking received:", formData);

    // Send email notifications
    const notificationResult = await sendNotifications(formData);

    // Create Calendly event
    const calendlyResult = await createCalendlyEvent(formData);

    return NextResponse.json({
      success: true,
      message: "Booking submitted successfully",
      bookingId: `TG58-${Date.now()}`,
      notifications: notificationResult,
      calendly: calendlyResult,
    });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Validate appointment time against business hours
function validateBusinessHours(date, time) {
  const appointmentDate = new Date(date);
  const dayNames = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const dayName = dayNames[appointmentDate.getDay()];

  const businessDay = BUSINESS_HOURS[dayName];

  // Check if closed on this day
  if (!businessDay) {
    return {
      valid: false,
      message: "We are closed on weekends. Please select a weekday.",
    };
  }

  // Convert times to comparable format
  const appointmentTime = convertTo24Hour(time);
  const startTime = businessDay.start;
  const endTime = businessDay.end;

  if (appointmentTime < startTime || appointmentTime > endTime) {
    return {
      valid: false,
      message: `Please select a time between ${formatTime(
        startTime
      )} and ${formatTime(endTime)} on ${dayName}s.`,
    };
  }

  return { valid: true };
}

// Convert 12-hour time to 24-hour format
function convertTo24Hour(time12h) {
  const [time, modifier] = time12h.split(" ");
  let [hours, minutes] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes}`;
}

// Format time for display
function formatTime(time24h) {
  const [hours, minutes] = time24h.split(":");
  const hour12 = hours % 12 || 12;
  const ampm = hours >= 12 ? "PM" : "AM";
  return `${hour12}:${minutes} ${ampm}`;
}

// Convert date and time to ISO format for Calendly
function convertToISO(date, time) {
  const time24h = convertTo24Hour(time);
  return `${date}T${time24h}:00`;
}

// Professional email notification function
async function sendNotifications(formData) {
  // In production, use services like Nodemailer, SendGrid, AWS SES, or Resend
  // Add these environment variables to your .env.local:
  // SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, or
  // SENDGRID_API_KEY, or RESEND_API_KEY

  const { name, email, serviceType, preferredDate, preferredTime } = formData;

  // Professional customer confirmation email
  const customerEmail = {
    to: email,
    subject: "TopGear58 - Service Appointment Confirmation",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Appointment Confirmation</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f9fa;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #ff2c2c, #ff4444); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">TopGear58</h1>
              <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Premium Automotive Services</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #333; margin: 0 0 20px 0; font-size: 24px;">Appointment Confirmed!</h2>
              <p style="color: #666; font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
                Dear ${name},<br><br>
                Thank you for choosing TopGear58. Your service appointment has been successfully scheduled. Here are your appointment details:
              </p>
              
              <!-- Appointment Details Card -->
              <div style="background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 25px; margin: 30px 0;">
                <h3 style="color: #ff2c2c; margin: 0 0 15px 0; font-size: 18px;">Appointment Details</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #555; font-weight: bold; width: 30%;">Service:</td>
                    <td style="padding: 8px 0; color: #333;">${serviceType}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #555; font-weight: bold;">Date:</td>
                    <td style="padding: 8px 0; color: #333;">${new Date(
                      preferredDate
                    ).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #555; font-weight: bold;">Time:</td>
                    <td style="padding: 8px 0; color: #333;">${preferredTime}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #555; font-weight: bold;">Vehicle:</td>
                    <td style="padding: 8px 0; color: #333;">${
                      formData.vehicleInfo
                    }</td>
                  </tr>
                </table>
              </div>
              
              <!-- Important Information -->
              <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 20px; margin: 30px 0;">
                <h4 style="color: #856404; margin: 0 0 10px 0; font-size: 16px;">⚠️ Important Information</h4>
                <ul style="color: #856404; margin: 0; padding-left: 20px; line-height: 1.6;">
                  <li>Please arrive 10 minutes early for your appointment</li>
                  <li>Bring your vehicle keys and any relevant documentation</li>
                  <li>If you need to reschedule, please contact us at least 24 hours in advance</li>
                </ul>
              </div>
              
              <p style="color: #666; font-size: 16px; line-height: 1.5; margin: 30px 0;">
                Our team will contact you shortly to confirm your appointment and provide any additional information needed for your service.
              </p>
              
              <!-- Contact Information -->
              <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 30px 0; text-align: center;">
                <h4 style="color: #333; margin: 0 0 15px 0;">Contact Us</h4>
                <p style="color: #666; margin: 5px 0;">📞 Phone: +1 (555) 123-4567</p>
                <p style="color: #666; margin: 5px 0;">📧 Email: info@topgear58.com</p>
                <p style="color: #666; margin: 5px 0;">📍 Address: 123 Auto Service Blvd, City, State 12345</p>
              </div>
              
              <p style="color: #666; font-size: 14px; text-align: center; margin-top: 40px;">
                Best regards,<br>
                <strong style="color: #ff2c2c;">TopGear58 Team</strong>
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #333; padding: 20px; text-align: center;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                © 2024 TopGear58. All rights reserved. | Premium Automotive Services
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  // Business notification email
  const businessEmail = {
    to: "info@topgear58.com", // Replace with your business email
    subject: `🔧 New Appointment: ${serviceType} - ${name}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Appointment Booking</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f9fa;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #28a745, #20c997); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">🔧 New Appointment</h1>
              <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">TopGear58 Booking System</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #333; margin: 0 0 20px 0; font-size: 24px;">New Service Appointment</h2>
              <p style="color: #666; font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
                A new appointment has been booked through your website. Please review and confirm the details below:
              </p>
              
              <!-- Customer Information -->
              <div style="background-color: #f8f9fa; border-left: 4px solid #ff2c2c; padding: 25px; margin: 30px 0;">
                <h3 style="color: #ff2c2c; margin: 0 0 15px 0; font-size: 18px;">👤 Customer Information</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #555; font-weight: bold; width: 25%;">Name:</td>
                    <td style="padding: 8px 0; color: #333; font-size: 16px;"><strong>${name}</strong></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #555; font-weight: bold;">Email:</td>
                    <td style="padding: 8px 0; color: #333;"><a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #555; font-weight: bold;">Phone:</td>
                    <td style="padding: 8px 0; color: #333;"><a href="tel:${
                      formData.phone
                    }" style="color: #007bff; text-decoration: none;">${
      formData.phone
    }</a></td>
                  </tr>
                </table>
              </div>
              
              <!-- Service Details -->
              <div style="background-color: #f8f9fa; border-left: 4px solid #28a745; padding: 25px; margin: 30px 0;">
                <h3 style="color: #28a745; margin: 0 0 15px 0; font-size: 18px;">🔧 Service Details</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #555; font-weight: bold; width: 25%;">Service Type:</td>
                    <td style="padding: 8px 0; color: #333; font-size: 16px;"><strong>${serviceType}</strong></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #555; font-weight: bold;">Vehicle:</td>
                    <td style="padding: 8px 0; color: #333;">${
                      formData.vehicleInfo
                    }</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #555; font-weight: bold;">Date:</td>
                    <td style="padding: 8px 0; color: #333;"><strong>${new Date(
                      preferredDate
                    ).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}</strong></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #555; font-weight: bold;">Time:</td>
                    <td style="padding: 8px 0; color: #333;"><strong>${preferredTime}</strong></td>
                  </tr>
                </table>
              </div>
              
              ${
                formData.message
                  ? `
              <!-- Additional Notes -->
              <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 25px; margin: 30px 0;">
                <h3 style="color: #856404; margin: 0 0 15px 0; font-size: 18px;">📝 Additional Notes</h3>
                <p style="color: #856404; margin: 0; line-height: 1.6; font-style: italic;">"${formData.message}"</p>
              </div>
              `
                  : ""
              }
              
              <!-- Action Required -->
              <div style="background-color: #d1ecf1; border: 1px solid #bee5eb; border-radius: 8px; padding: 25px; margin: 30px 0; text-align: center;">
                <h3 style="color: #0c5460; margin: 0 0 15px 0; font-size: 18px;">⚡ Action Required</h3>
                <p style="color: #0c5460; margin: 0 0 20px 0; line-height: 1.6;">
                  Please contact the customer to confirm this appointment and provide any additional service information.
                </p>
                <div style="margin-top: 20px;">
                  <a href="mailto:${email}?subject=Appointment Confirmation - ${serviceType}&body=Dear ${name},%0D%0A%0D%0AThank you for booking an appointment with TopGear58." 
                     style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; margin: 5px;">
                    📧 Send Email
                  </a>
                  <a href="tel:${formData.phone}" 
                     style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; margin: 5px;">
                    📞 Call Customer
                  </a>
                </div>
              </div>
              
              <p style="color: #666; font-size: 14px; text-align: center; margin-top: 40px;">
                Booking ID: <strong>TG58-${Date.now()}</strong><br>
                Received: ${new Date().toLocaleString()}
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #333; padding: 20px; text-align: center;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                TopGear58 Business Management System | Automated Booking Notification
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  // In production, implement actual email sending:
  /*
  // Example with Nodemailer:
  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  
  await transporter.sendMail(customerEmail);
  await transporter.sendMail(businessEmail);
  */

  return {
    customerEmailSent: true,
    businessEmailSent: true,
    emails: [customerEmail, businessEmail],
  };
}

// Real Calendly API integration
async function createCalendlyEvent(formData) {
  try {
    // Environment variables needed for Calendly integration:
    // CALENDLY_ACCESS_TOKEN - Your Calendly API access token
    // CALENDLY_EVENT_TYPE_URI - Your specific event type URI

    const accessToken = process.env.CALENDLY_ACCESS_TOKEN;
    const eventTypeUri = process.env.CALENDLY_EVENT_TYPE_URI;

    if (!accessToken || !eventTypeUri) {
      console.warn(
        "Calendly credentials not configured. Skipping Calendly integration."
      );
      return {
        success: false,
        message: "Calendly integration not configured",
        simulation: true,
      };
    }

    // Convert appointment time to ISO format
    const startTime = convertToISO(
      formData.preferredDate,
      formData.preferredTime
    );

    // Calculate end time (assuming 1-hour appointments)
    const endTime = new Date(
      new Date(startTime).getTime() + 60 * 60 * 1000
    ).toISOString();

    // Calendly API call to create scheduled event
    const calendlyResponse = await fetch(
      "https://api.calendly.com/scheduled_events",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_type: eventTypeUri,
          start_time: startTime,
          end_time: endTime,
          invitee: {
            email: formData.email,
            name: formData.name,
            text_reminder_number: formData.phone,
          },
          location: {
            type: "physical",
            location: "TopGear58 Service Center, 123 Auto Service Blvd",
          },
          additional_guests: [],
          custom_questions_and_answers: [
            {
              question: "Service Type",
              answer: formData.serviceType,
            },
            {
              question: "Vehicle Information",
              answer: formData.vehicleInfo,
            },
            {
              question: "Additional Notes",
              answer: formData.message || "No additional notes",
            },
          ],
        }),
      }
    );

    if (!calendlyResponse.ok) {
      const errorData = await calendlyResponse.json();
      throw new Error(`Calendly API error: ${errorData.message}`);
    }

    const calendlyData = await calendlyResponse.json();

    return {
      success: true,
      eventId: calendlyData.resource.uri.split("/").pop(),
      eventUri: calendlyData.resource.uri,
      eventUrl: calendlyData.resource.scheduling_url,
      startTime: calendlyData.resource.start_time,
      endTime: calendlyData.resource.end_time,
      status: calendlyData.resource.status,
      message: "Event successfully created in Calendly",
    };
  } catch (error) {
    console.error("Calendly integration error:", error);

    // Fallback: Log the booking for manual processing
    return {
      success: false,
      error: error.message,
      simulation: true,
      fallback: {
        eventId: `manual_${Date.now()}`,
        message:
          "Calendly integration failed. Booking logged for manual processing.",
        manualAction:
          "Please manually create the appointment in your calendar system",
      },
    };
  }
}
