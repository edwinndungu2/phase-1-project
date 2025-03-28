document.addEventListener("DOMContentLoaded", function () {
    fetchSongs();
});

function fetchSongs() {
    fetch("http://localhost:3000/songs")
        .then(response => response.json())
        .then(songs => displaySongs(songs))
        .catch(error => console.error("Error fetching songs:", error));
}

function searchSongs() {
    const searchTerm = document.getElementById("search").value.toLowerCase();

    fetch("http://localhost:3000/songs")
        .then(response => response.json())
        .then(songs => {
            const filteredSongs = songs.filter(song =>
                song.title.toLowerCase().includes(searchTerm) ||
                song.artist.toLowerCase().includes(searchTerm) ||
                song.album.toLowerCase().includes(searchTerm)
            );
            displaySongs(filteredSongs);
        })
        .catch(error => console.error("Error fetching songs:", error));
}

function displaySongs(songs) {
    const songList = document.getElementById("song-list");
    songList.innerHTML = "";

    if (songs.length === 0) {
        songList.innerHTML = "<li>No songs found</li>";
        return;
    }

    songs.forEach(song => {
        const li = document.createElement("li");

        const img = document.createElement("img");
        img.src = song.image;
        img.alt = song.title;
        img.width = 100;

        const details = document.createElement("div");
        details.innerHTML = `<strong>${song.title}</strong> - ${song.artist} (${song.album})`;

        const viewButton = document.createElement("a");
        viewButton.href = song.link;
        viewButton.target = "_blank";
        viewButton.textContent = "View Song";

        li.appendChild(img);
        li.appendChild(details);
        li.appendChild(viewButton);
        songList.appendChild(li);
    });
}
