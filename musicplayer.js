let $ = document
const image = $.getElementById("cover")
const title = $.getElementById("title")
const artist = $.getElementById("artist")
const currentTimeE1 = $.getElementById("current-time")
const music = $.querySelector("audio")
const durationE1 = $.getElementById("duration")
const progress = $.getElementById("progress")
const progressContainer = $.getElementById("progress-container")
const prevBtn = $.getElementById("prev")
const playBtn = $.getElementById("play")
const nextBtn = $.getElementById("next")
const background = $.getElementById("background")

const songs = [
    { path: "song3.mp3", musicName: "Ezebube", artist: "Neon Adejoh", cover: "img3.jpg" },
    { path: "song2.mp3", musicName: "Victory Dance", artist: "petersom Okopi", cover: "img2.jpg" },
    { path: "song1.mp3", musicName: "Confidence", artist: "Mercy Chinwo", cover: "img1.png" }
]

let isLoading = false
function playSong() {
    isLoading = true
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "play");
    music.play()
}

function pauseSong() {
    isLoading = true
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "play");
    music.pause()
}

function playToggle() {
    if (isLoading) {
        pauseSong()
    } 
    else {
        playSong()
    }
}

function loadSongs(song) {
    title.innerHTML = song.musicName
    artist.innerHTML = song.artist
    music.src = song.path
    changeCover(song.cover)
}

function changeCover(cover) {
    image.classList.remove("active");
    setTimeout(function () {
        image.src = cover
        image.classList.add("active");
    }, 100)
    background.src = cover
}

let songIndex = 0
function prevSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex = 2
    }
    loadSongs(songs[songIndex])
    playSong()
}

function nextSong() {
    songIndex++
    if (songIndex > songs.length -1) {
        songIndex = 0
    }
    loadSongs(songs[songIndex])
    playSong()
}

loadSongs(songs[songIndex])
function updateProgressBar() {
    if (isLoading) {
        const duration = music.duration
        let currentTime = music.currentTime
        let progressPercent = (currentTime / duration) * 100
        progress.style.width = progressPercent + "%"
        const durationMinutes = Math.floor(duration / 60)
        let durationSeconds = Math.floor(duration % 60)
        if (durationSeconds < 10) 
        {
            durationSeconds = "0" + durationSeconds
        }
        if (durationSeconds) 
        {
            durationE1.innerHTML = durationMinutes + ":" + durationSeconds
        }
        const currentMinutes = Math.floor(currentTime / 60)
        let currentSeconds = Math.floor(currentTime % 60)
        if (currentSeconds < 10) 
        {
            currentSeconds = "0" + currentSeconds
        }
        currentTimeE1.innerHTML = currentMinutes + ":" + currentSeconds
    }
}

function setProgressBar(e) {
    const width = this.clientwidth;
    const clickx = e.offsetx;
    const duration = music.duration;
    music.currentTime = (clickx / width) * duration;
}

playBtn.addEventListener("click", playToggle)
prevBtn.addEventListener("click", prevSong)
nextBtn.addEventListener("click", nextSong)
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);