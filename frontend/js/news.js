document.addEventListener("DOMContentLoaded", () => {
    const newsList = document.getElementById("news-container");

    // fetching news from the server
    fetch("http://localhost:3000/api/news")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Filtering out news with missing fields
            const validNews = data.filter(news => 
                news.year && news.title && news.description
            );

            // If no valid news are fetched, display a message
            if (validNews.length === 0) {
                newsList.innerHTML = "<p>No valid news found.</p>";
                return;
            }

            // Getting the template from the news.html
            const templateSource = document.getElementById("news-template").innerHTML;
            const template = Handlebars.compile(templateSource);

            // creating html for all the valid news
            const html = template({ events: validNews });

            // integrate into the html
            document.getElementById("news-container").innerHTML = html;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            newsList.innerHTML = "<p style='color: red;'>Failed to load news. Check the console for details.</p>";
        });
});

// menu toggle function
function toggleMenu() {
    const menu = document.querySelector(".dropdown-menu");
    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
    }
};
