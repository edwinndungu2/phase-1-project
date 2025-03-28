document.addEventListener("DOMContentLoaded", function () {
    const songs = [
        { title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", image: "images/blindinglights.jpeg" },
        { title: "Shape of You", artist: "Ed Sheeran", album: "Divide", image: "images/shapeofyou.png" },
        { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", album: "Uptown Special", image: "images/uptownfunk.jpeg" },
        { title: "Someone Like You", artist: "Adele", album: "21", image: "images/someonelikeyou.jpeg" },
        { title: "God's Plan", artist: "Drake", album: "Scorpion", image: "images/godsplan.png" }
    ];

    function searchSongs() {
        const searchTerm = document.getElementById("search").value.toLowerCase();
        const songList = document.getElementById("song-list");
        songList.innerHTML = "";

        const filteredSongs = songs.filter(song =>
            song.title.toLowerCase().includes(searchTerm) || 
            song.artist.toLowerCase().includes(searchTerm) ||
            song.album.toLowerCase().includes(searchTerm)
        );

        if (filteredSongs.length > 0) {
            filteredSongs.forEach(song => {
                const li = document.createElement("li");
                li.classList.add("song-item");

                const img = document.createElement("img");
                img.src = song.image;
                img.alt = song.title;
                img.classList.add("song-image");

                const details = document.createElement("div");
                details.innerHTML = `<strong>${song.title}</strong> - ${song.artist} (${song.album})`;

                li.appendChild(img);
                li.appendChild(details);
                songList.appendChild(li);
            });
        } else {
            songList.innerHTML = '<li class="no-results">No results found</li>';
        }
    }

    document.getElementById("search").addEventListener("input", searchSongs);
    document.querySelector("button").addEventListener("click", searchSongs);
});
