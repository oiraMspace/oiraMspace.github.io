window.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
  }

  fetchACMilanNews();
  fetchACMilanFixtures();
});

window.onscroll = function () {
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

function fetchACMilanNews() {
  const url = "https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=AC_Milan";

  fetch(url)
      .then(response => response.json())
      .then(data => {
          const newsList = document.getElementById("news-list");
          newsList.innerHTML = "";

          if (!data.teams || data.teams.length === 0) {
              newsList.innerHTML = "<li>No information found for AC Milan.</li>";
              return;
          }

          const team = data.teams[0];

          const items = [
              `<strong>${team.strTeam}</strong> - ${team.strLeague}`,
              team.strDescriptionEN ? `<p>${team.strDescriptionEN.substring(0, 300)}...</p>` : "",
              team.strWebsite ? `<a href="https://${team.strWebsite}" target="_blank">Official Website</a>` : "",
              team.strFacebook ? `<a href="https://${team.strFacebook}" target="_blank">Facebook</a>` : "",
              team.strTwitter ? `<a href="https://${team.strTwitter}" target="_blank">Twitter</a>` : ""
          ];

          items.forEach(item => {
              const li = document.createElement("li");
              li.innerHTML = item;
              newsList.appendChild(li);
          });
      })
      .catch(error => {
          console.error("Error fetching team info:", error);
          document.getElementById("news-list").innerHTML = "<li>Error loading AC Milan info.</li>";
      });
}

function fetchACMilanFixtures() {
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
}
