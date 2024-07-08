const musicContent=document.querySelector(".music-content"),playPauseButton=musicContent.querySelector(".music-play-pause"),nextButton=musicContent.querySelector("#next"),audioPlayer=musicContent.querySelector("#audio-player"),progressArea=musicContent.querySelector(".music-progress-area"),previousButton=musicContent.querySelector("#previous"),musicImage=musicContent.querySelector(".music-img-area img"),songName=musicContent.querySelector(".music-details .music-name"),artistName=musicContent.querySelector(".music-details .music-artist"),progressBar=progressArea.querySelector(".music-progress-bar"),musicList=musicContent.querySelector(".music-list"),musicListButton=musicContent.querySelector("#music-list-icon"),closeListButton=musicList.querySelector("#close-list");

let songIndex=Math.floor((Math.random()*allMusic.length)+1);isSongPaused=!0;

window.addEventListener("load",()=>{loadSong(songIndex),playingSong()});

function loadSong(e){songName.innerText=allMusic[e-1].name,artistName.innerText=allMusic[e-1].artist,musicImage.src=`images/${allMusic[e-1].src}.jpg`,audioPlayer.src=`songs/${allMusic[e-1].src}.mp3`,musicContent.style.backgroundImage=`url(images/${allMusic[e-1].src}.jpg)`}

function playSong(){musicContent.classList.add("paused"),playPauseButton.querySelector("i").innerText="pause",audioPlayer.play()}

function pauseSong(){musicContent.classList.remove("paused"),playPauseButton.querySelector("i").innerText="play_arrow",audioPlayer.pause()}

function previousSong(){songIndex--,songIndex<1?songIndex=allMusic.length:songIndex=songIndex,loadSong(songIndex),playSong(),playingSong()}

function nextSong(){songIndex++,songIndex>allMusic.length?songIndex=1:songIndex=songIndex,loadSong(songIndex),playSong(),playingSong()}

playPauseButton.addEventListener("click",()=>{const e=musicContent.classList.contains("paused");e?pauseSong():playSong(),playingSong()});

previousButton.addEventListener("click",()=>{previousSong()});

nextButton.addEventListener("click",()=>{nextSong()});

audioPlayer.addEventListener("timeupdate",(e)=>{const t=e.target.currentTime,a=e.target.duration,o=t/a*100;progressBar.style.width=`${o}%`;let n=musicContent.querySelector(".time-current"),r=musicContent.querySelector(".time-max");audioPlayer.addEventListener("loadeddata",()=>{let e=audioPlayer.duration,t=Math.floor(e/60),a=Math.floor(e%60);a<10&&(a=`0${a}`),r.innerText=`${t}:${a}`});let s=Math.floor(t/60),c=Math.floor(t%60);c<10&&(c=`0${c}`),n.innerText=`${s}:${c}`});

progressArea.addEventListener("click",(e)=>{let t=progressArea.clientWidth,a=e.offsetX,o=audioPlayer.duration;audioPlayer.currentTime=a/t*o,playSong(),playingSong()});

const ulTag=musicContent.querySelector("ul");

for(let e=0;e<allMusic.length;e++){let t=`<li li-index="${e+1}">
                <div class="music-row">
                  <span>${allMusic[e].name}</span>
                  <p>${allMusic[e].artist}</p>
                </div>
                <span id="${allMusic[e].src}" class="audio-duration">3:40</span>
                <audio class="${allMusic[e].src}" src="songs/${allMusic[e].src}.mp3"></audio>
              </li>`;ulTag.insertAdjacentHTML("beforeend",t);let a=ulTag.querySelector(`#${allMusic[e].src}`),o=ulTag.querySelector(`.${allMusic[e].src}`);o.addEventListener("loadeddata",()=>{let e=o.duration,t=Math.floor(e/60),a=Math.floor(e%60);a<10&&(a=`0${a}`),a.innerText=`${t}:${a}`,a.setAttribute("t-duration",`${t}:${a}`)})}

function playingSong(){const e=ulTag.querySelectorAll("li");for(let t=0;t<e.length;t++){let a=e[t].querySelector(".audio-duration");e[t].classList.contains("playing")&&(e[t].classList.remove("playing"),a.innerText=a.getAttribute("t-duration"));e[t].getAttribute("li-index")==songIndex&&(e[t].classList.add("playing"),a.innerText="Playing"),e[t].setAttribute("onclick","clicked(this)")}}

function clicked(e){let t=e.getAttribute("li-index");songIndex=t,loadSong(songIndex),playSong(),playingSong()}

const repeatButton=musicContent.querySelector("#repeat-playlist");

repeatButton.addEventListener("click",()=>{let e=repeatButton.innerText;switch(e){case"repeat":repeatButton.innerText="repeat_one",repeatButton.setAttribute("title","Song looped");break;case"repeat_one":repeatButton.innerText="shuffle",repeatButton.setAttribute("title","Playback shuffled");break;case"shuffle":repeatButton.innerText="repeat",repeatButton.setAttribute("title","Playlist looped")}});

audioPlayer.addEventListener("ended",()=>{let e=repeatButton.innerText;switch(e){case"repeat":nextSong();break;case"repeat_one":audioPlayer.currentTime=0,loadSong(songIndex),playSong();break;case"shuffle":let e=Math.floor((Math.random()*allMusic.length)+1);do{e=Math.floor((Math.random()*allMusic.length)+1)}while(songIndex==e);songIndex=e,loadSong(songIndex),playSong(),playingSong()}});

musicListButton.addEventListener("click",()=>{musicList.classList.toggle("show")}),closeListButton.addEventListener("click",()=>{musicListButton.click()});
