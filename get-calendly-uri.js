// Helper script to get Calendly event type URI
// Run this in your browser console or as a Node.js script

const CALENDLY_ACCESS_TOKEN = "SPeBnPKDaRKOQUosBJ3K6xwG2CwDTPb8Qb1xpS4rFOI";

async function getEventTypes() {
  try {
    const response = await fetch("https://api.calendly.com/event_types", {
      headers: {
        Authorization: `Bearer ${CALENDLY_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Your Event Types:");
      data.collection.forEach((eventType) => {
        console.log(`Name: ${eventType.name}`);
        console.log(`Slug: ${eventType.slug}`);
        console.log(`URI: ${eventType.uri}`);
        console.log(`Scheduling URL: ${eventType.scheduling_url}`);
        console.log("---");
      });

      // Find your specific event
      const yourEvent = data.collection.find(
        (event) =>
          event.slug === "new-meeting" || event.name.includes("new-meeting")
      );

      if (yourEvent) {
        console.log("\n🎯 YOUR EVENT TYPE URI:");
        console.log(yourEvent.uri);
        console.log("\n📋 Add this to your .env.local:");
        console.log(`CALENDLY_EVENT_TYPE_URI=${yourEvent.uri}`);
      }
    } else {
      console.error("Error:", data);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}

// Run the function
getEventTypes();

// Alternative: If you know the event type UUID, you can construct the URI manually:
// https://api.calendly.com/event_types/YOUR_UUID_HERE
