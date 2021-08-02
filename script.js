
const container=document.querySelector('.container');
const playbutt=document.querySelector('#play');
const prevbutt=document.querySelector('#prev');
const nextbutt=document.querySelector('#next');
const audio=document.querySelector('#audio');
const progressbar=document.querySelector('.progress-bar');
const progress=document.querySelector('.progress');
const title=document.querySelector('#titleM');

//song titles
const songs= ['Alan Walker - Faded','DJ Snake & Justin Bieber - Let Me Love You','Ed Sheeran - Shape of You','The Chainsmokers feat. Daya - Dont Let Me Down','Love Yourself'];

let songIndex = 4;



loadSong(songs[songIndex])

function loadSong(song) {
   
    title.innerHTML = `<marquee direction="right" height="20" width="200" bgcolor="white">${song}</marquee>`
    audio.src = `music/${song}.mp3`;
}

function playSong(){
    container.classList.add('play');
    playbutt.querySelector('i.fas').classList.remove('fa-play');
    playbutt.querySelector('i.fas').classList.add('fa-pause');
    document.body.classList.add("animation");
    audio.play();

  
    
}

function pauseSong(){
    container.classList.remove('play');
    playbutt.querySelector('i.fas').classList.add('fa-play');
    playbutt.querySelector('i.fas').classList.remove('fa-pause');
    document.body.classList.remove("animation");
   
    audio.pause();
    
}

function prevSong(){
    
   songIndex--;

   if(songIndex < 0) {
       songIndex = songs.length -1;
   }
   loadSong(songs[songIndex]);
   playSong();

   
}



function nextSong(){
    songIndex++;

    if(songIndex > songs.length -1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }
  
  // Set progress bar
  function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
  
    audio.currentTime = (clickX / width) * duration;
  }

//event listeners
playbutt.addEventListener('click',() => {
  const isplaying = container.classList.contains('play');

  if(isplaying){
      pauseSong()
  } else {
      playSong()
  }
});

prevbutt.addEventListener('click',prevSong);
nextbutt.addEventListener('click',nextSong);


audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressbar.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

