const API_URL =
  'https://www.thesportsdb.com/api/v1/json/123/eventsseason.php?id=4335&s=2022-2023';

const spinner = document.getElementById('spinner');
const matchesContainer = document.getElementById('matches');
const searchInput = document.getElementById('search');

let allMatches = [];

const renderMatches = (matches) => {
  matchesContainer.innerHTML = '';

  if (matches.length === 0) {
    matchesContainer.innerHTML = '<p class="no-results">No matches found.</p>';
    return;
  }

  matches.forEach((match) => {
    const hasScore = match.intHomeScore !== null && match.intAwayScore !== null;
    const score = hasScore
      ? `${match.intHomeScore} – ${match.intAwayScore}`
      : 'vs';

    matchesContainer.insertAdjacentHTML(
      'beforeend',
      `<article class="match-card">
        <div class="match-round">Round ${match.intRound ?? '?'}</div>
        <div class="match-teams">
          <span class="team home">${match.strHomeTeam}</span>
          <span class="match-score">${score}</span>
          <span class="team away">${match.strAwayTeam}</span>
        </div>
        <div class="match-meta">
          <span class="match-date">${match.dateEvent ?? 'Date TBD'}</span>
          <span class="match-venue">${match.strVenue ?? 'Venue TBD'}</span>
        </div>
      </article>`
    );
  });
};

const filterMatches = (query) => {
  const q = query.trim().toLowerCase();
  const filtered = allMatches.filter(
    (match) =>
      match.strHomeTeam.toLowerCase().includes(q) ||
      match.strAwayTeam.toLowerCase().includes(q)
  );
  renderMatches(filtered);
};

searchInput.addEventListener('input', (e) => filterMatches(e.target.value));

const fetchMatches = async () => {
  spinner.classList.add('active');

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    allMatches = data.events;
    renderMatches(allMatches);
  } catch (error) {
    matchesContainer.innerHTML = `<p class="error">Failed to load matches: ${error.message}</p>`;
  } finally {
    spinner.classList.remove('active');
  }
};

fetchMatches();
