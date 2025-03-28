// Function to fetch songs from the JioSaavn API
async function searchSongs(query) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<p>Loading...</p>'; // Improved loading message

    try {
        // Fetch data from the saavn.me API
        const response = await fetch(`https://saavn.me/search/songs?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data from the API');
        }

        const data = await response.json();
        displayResults(data.results); // Use the "results" field from the API response
    } catch (error) {
        // Display error message in red
        resultsDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        console.error('Error fetching songs:', error); // Log error for debugging
    }
}

// Function to display the results on the page
function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    if (!data || data.length === 0) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
        return;
    }

    // Loop through the data and create song elements
    data.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.classList.add('song'); // Add CSS class for styling
        songDiv.innerHTML = `
            <h3>${song.name}</h3>
            <p>Artist: ${song.primaryArtists}</p>
            <p>Album: ${song.album.name}</p>
            <a href="${song.url}" target="_blank">Listen on JioSaavn</a>
        `;
        resultsDiv.appendChild(songDiv);
    });
}

// Add event listener to the search button
document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        searchSongs(query);
    } else {
        alert('Please enter a valid search query.'); // Alert for empty input
    }
});