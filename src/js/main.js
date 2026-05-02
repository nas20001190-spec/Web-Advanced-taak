const API_URL =
  'https://www.thesportsdb.com/api/v1/json/123/eventsseason.php?id=4335&s=2022-2023';

const fetchMatches = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    const matches = data.events;

    console.log(`Fetched ${matches.length} matches:`);
    console.log(matches);
  } catch (error) {
    console.error('Failed to fetch matches:', error);
  }
};

fetchMatches();
