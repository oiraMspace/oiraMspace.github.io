window.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    fetchACMilanNews();

});

window.onscroll = function () {
    const topBtn = document.getElementById("topBtn");
    if (!topBtn) return;

    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }

    if (document.body.scrollTop + window.innerHeight >= document.body.scrollHeight) {
        topBtn.style.display = "block";
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function fetchACMilanNews() {
    const apiKey = "demo" /// "52fe8720c80113a51b0e1d10f41bafe2";
    const query = "AC Milan";
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&token=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const newsList = document.getElementById("news-list");
            if (!newsList) return;

            newsList.innerHTML = "";

            if (!data.articles || data.articles.length === 0) {
                newsList.innerHTML = "<li>No recent news found.</li>";
                return;
            }

            const filteredArticles = data.articles.filter(article =>
                article.title.toLowerCase().includes("ac milan") ||
                (article.description && article.description.toLowerCase().includes("ac milan"))
            );

            if (filteredArticles.length === 0) {
                newsList.innerHTML = "<li>No AC Milan-specific news found.</li>";
                return;
            }

            filteredArticles.slice(0, 5).forEach(article => {
                const li = document.createElement("li");
                li.innerHTML = `
                    ${article.image ? `<img src="${article.image}" alt="Thumbnail" class="news-thumbnail">` : ""}
                    <a href="${article.url}" target="_blank"><strong>${article.title}</strong></a>
                    <br><small>${new Date(article.publishedAt).toLocaleString()}</small>
                    <p>${article.description || ""}</p>
                `;
                newsList.appendChild(li);
            });            
        })
        .catch(error => {
            console.error("Error fetching AC Milan news:", error);
            const newsList = document.getElementById("news-list");
            if (newsList) {
                newsList.innerHTML = "<li>Error loading news feed.</li>";
            }
        });
}

if (document.location.pathname.includes("fixtures.html")) {
  document.addEventListener("DOMContentLoaded", () => {
    const fixturesList = document.getElementById("fixtures-list");

    fetch("fixtures.json")
      .then(res => {
        if (!res.ok) throw new Error("Failed to load fixtures.json");
        return res.json();
      })
      .then(data => {
        fixturesList.innerHTML = "";

        if (data.length === 0) {
          fixturesList.innerHTML = "<li>No upcoming fixtures available.</li>";
          return;
        }

        data.forEach(match => {
          const li = document.createElement("li");
          li.innerHTML = `
            <strong>${match.home} vs ${match.away}</strong><br>
            <span>${match.date}</span><br>
            <span>${match.venue}</span>
          `;
          fixturesList.appendChild(li);
        });
      })
      .catch(err => {
        console.error("Error fetching fixtures:", err);
        fixturesList.innerHTML = "<li>Unable to load fixtures at this time.</li>";
      });
  });
}
  