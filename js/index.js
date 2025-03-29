document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const songList = document.getElementById("song-list");

    
    function fetchSongs() {
        fetch("http://localhost:3000/songs")
            .then(response => response.json())
            .then(data => displaySongs(data))
            .catch(error => console.error("Error fetching songs:", error));
    }

    
    function displaySongs(songs) {
        songList.innerHTML = ""; 

        if (songs.length === 0) {
            songList.innerHTML = "<p>No songs found</p>";
            return;
        }

        songs.forEach(song => {
            const songItem = document.createElement("li");
            songItem.innerHTML = `
                <img src="${song.image}" alt="${song.title}" width="100">
                <h3>${song.title}</h3>
                <p><strong>Artist:</strong> ${song.artist}</p>
                <p><strong>Album:</strong> ${song.album}</p>
                <a href="${song.link}" target="_blank">View Song</a>
            `;
            songList.appendChild(songItem);
        });
    }

    
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        fetch("http://localhost:3000/songs")
            .then(response => response.json())
            .then(data => {
                const filteredSongs = data.filter(song =>
                    song.title.toLowerCase().includes(query) ||
                    song.artist.toLowerCase().includes(query)
                );
                displaySongs(filteredSongs);
            })
            .catch(error => console.error("Error searching songs:", error));
    });

    fetchSongs(); 
});
