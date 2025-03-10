document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("http://localhost:3000/api/events");

        // Handling HTTP errors
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const events = await response.json();

        // Filtering out events with missing fields
        const validEvents = events.filter(event => 
            event.year && event.title && event.detailed_description 
        );

        if (validEvents.length === 0) {
            document.getElementById("history-content").innerHTML = "<p>No valid events found.</p>";
            return;
        }

        // template compilation
        const templateSource = document.getElementById("history-template").innerHTML;
        const template = Handlebars.compile(templateSource);

        const html = template({ events: validEvents });
        document.getElementById("history-content").innerHTML = html;
    } catch (error) {
        console.error("Error fetching or processing data:", error);
        document.getElementById("history-content").innerHTML = "<p style='color: red;'>Failed to load events. Check the console for details.</p>";
    }
});

// Menu toggle function
function toggleMenu() {
    const menu = document.querySelector(".dropdown-menu");
    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
    }
};
