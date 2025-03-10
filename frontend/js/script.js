
document.addEventListener("DOMContentLoaded", () => {
    //  events container
    const eventsList = document.getElementById("events-list");

    // requesting events from the server
    fetch("http://localhost:3000/api/events")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // if no events are fetched, display a message
            if (data.length === 0) {
                eventsList.innerHTML = "<p>No events found.</p>";
                return;
            }

            // Filtering out events with missing fields
            const validEvents = data.filter(event => 
                event.year && event.title && event.description
            );

            if (validEvents.length === 0) {
                eventsList.innerHTML = "<p>No valid events found.</p>";
                return;
            }

            // Getting the template from the html
            const templateSource = document.getElementById("event-template").innerHTML;
            // compile the template
            const template = Handlebars.compile(templateSource);
            // create html for all the valid events
            const html = template({ events: validEvents });
            // insert the html into the page
            document.getElementById("events-list").innerHTML = html;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            eventsList.innerHTML = "<p style='color: red;'>Failed to load events. Check the console for details.</p>";
        });
});

function toggleMenu() {
    const menu = document.querySelector(".dropdown-menu");
    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
    }
};