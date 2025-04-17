window.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

window.onscroll = function() {
    const topBtn = document.getElementById("topBtn");

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

window.addEventListener('DOMContentLoaded', () => {
    fetchACMilanNews();
  });

function fetchACMilanNews() {
    const apiKey = "388790e62da34381b364fa658b4c3400";
    const url = `https://newsapi.org/v2/everything?q="AC Milan"&sortBy=publishedAt&pageSize=5&language=en&apiKey=${apiKey}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const newsList = document.getElementById("news-list");
        newsList.innerHTML = "";
  
        const filteredArticles = data.articles.filter(article =>
          article.title.includes("AC Milan") || article.description?.includes("AC Milan")
        );
  
        if (filteredArticles.length === 0) {
          newsList.innerHTML = "<li>No AC Milan news available.</li>";
          return;
        }
  
        filteredArticles.forEach(article => {
          const li = document.createElement("li");
          li.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
          newsList.appendChild(li);
        });
      })
      .catch(error => {
        console.error("Error fetching news:", error);
        document.getElementById("news-list").innerHTML = "<li>Error loading news.</li>";
      });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "2f75ebc3bd2f60bb0f64edf2f2fc2d53";
    const teamId = 489;
    const season = 2024;
    const proxy = "https://corsproxy.io/?"; 
    const url = `${proxy}https://v3.football.api-sports.io/fixtures?team=${teamId}&season=${season}&next=5`;
  
    fetch(url, {
      method: "GET",
      headers: {
        "x-apisports-key": apiKey
      }
    })
      .then(response => response.json())
      .then(data => {
        const fixturesList = document.getElementById("fixtures-list");
        fixturesList.innerHTML = "";
  
        if (!data.response || data.response.length === 0) {
          fixturesList.innerHTML = "<li>No upcoming fixtures found.</li>";
          return;
        }
  
        data.response.forEach(fixture => {
          const match = fixture.fixture;
          const teams = fixture.teams;
          const date = new Date(match.date).toLocaleString("en-GB", {
            weekday: "short",
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit"
          });
  
          const li = document.createElement("li");
          li.innerHTML = `
            <strong>${teams.home.name}</strong> vs <strong>${teams.away.name}</strong>
            <br><small>${date}</small> - ${fixture.league.name}
          `;
          fixturesList.appendChild(li);
        });
      })
      .catch(error => {
        console.error("Error fetching fixtures:", error);
        document.getElementById("fixtures-list").innerHTML = "<li>Unable to load fixtures.</li>";
      });
  });
  
  
  
  
