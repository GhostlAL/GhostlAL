const audio = document.getElementById("audio");
const playPause = document.getElementById("play");
const forward = document.getElementById("forward");
const backward = document.getElementById("backward");
const currentTimeDisplay = document.getElementById("current-time");
const totalDurationDisplay = document.getElementById("total-duration");
const range = document.getElementById("range");
const songTitle = document.getElementById("song-title");

// Lista de canciones y sus títulos
const songs = [
  { src: "assets/media/song1.mp3", title: "Nueva Direccion" },
  { src: "assets/media/song2.mp3", title: "Nada es Imposible" },
  { src: "assets/media/song3.mp3", title: "Mejor que Ayer" },
  { src: "assets/media/song4.mp3", title: "Quiero ser Feliz" },
  { src: "assets/media/song5.mp3", title: "Libre Estoy" },
  { src: "assets/media/Cautivos del Vacío.mp3", title: "Cautivos del Vacío" },
  { src: "assets/media/Ciclo Sin Fin.mp3", title: "Ciclo Sin Fin" },
  { src: "assets/media/Deseo de Tu Presencia.mp3", title: "Deseo de Tu Presencia" },
  { src: "assets/media/Luz que se Apaga.mp3", title: "Luz que se Apaga" },
  { src: "assets/media/Noche Solitaria.mp3", title: "Noche Solitaria" },
  { src: "assets/media/Refugio Natural.mp3", title: "Refugio Natural" },
  { src: "assets/media/Soledad Involuntaria.mp3", title: "Soledad Involuntaria" },
  { src: "assets/media/Sombras del Alma.mp3", title: "Sombras del Alma" }
];

let currentSongIndex = 0;

// Función para actualizar el tiempo de reproducción, duración y título
function updateTimeDisplays() {
  const currentTime = audio.currentTime;
  const duration = audio.duration;

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  currentTimeDisplay.textContent = formatTime(currentTime);
  totalDurationDisplay.textContent = formatTime(duration);

  // Actualiza el control deslizante con el progreso del audio
  range.value = (currentTime / duration) * 100;
}

// Actualiza el título de la canción
function updateSongTitle() {
  songTitle.textContent = songs[currentSongIndex].title;
}

// Cambia a la siguiente canción
function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  audio.src = songs[currentSongIndex].src;
  audio.play();
  updateSongTitle();
}

// Manejar el cambio de canción al hacer clic en el botón "Forward"
forward.addEventListener("click", () => {
  playNextSong();
});

// Manejar el cambio de canción al hacer clic en el botón "Backward"
backward.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  audio.src = songs[currentSongIndex].src;
  audio.play();
  updateSongTitle();
});

// Actualizar el tiempo de reproducción y duración cada vez que se actualiza el tiempo
audio.addEventListener('timeupdate', updateTimeDisplays);

// Actualizar la duración total cuando los metadatos de la canción se cargan
audio.addEventListener('loadedmetadata', updateTimeDisplays);

// Cambiar a la siguiente canción al terminar la actual
audio.addEventListener('ended', playNextSong);

// Manejar la reproducción/pausa
playPause.addEventListener("click", () => {
  if (audio.paused || audio.ended) {
    playPause.querySelector(".pause-btn").classList.remove("hide");
    playPause.querySelector(".play-btn").classList.add("hide");
    audio.play();
  } else {
    audio.pause();
    playPause.querySelector(".pause-btn").classList.add("hide");
    playPause.querySelector(".play-btn").classList.remove("hide");
  }
});

// Manejar el cambio de posición de reproducción cuando se mueve el control deslizante
range.addEventListener("input", () => {
  const duration = audio.duration;
  const newTime = (range.value / 100) * duration;
  audio.currentTime = newTime;
});
