const dataMusic = [
    {
      id: '1',
      artist: 'The weekend',
      track: 'Save your tears',
      poster: 'img/Photo1.jpg',
      mp3: 'audio/The Weekend - Save Your Tears.mp3',
    },
    {
      id: '2',
      artist: 'Imagine Dragons',
      track: 'Follow You',
      poster: 'img/Photo2.jpg',
      mp3: 'audio/Imagine Dragons - Follow You.mp3',
    },
    {
      id: '3',
      artist: 'Tove Lo',
      track: 'How Long',
      poster: 'img/Photo3.jpg',
      mp3: 'audio/Tove Lo - How Long.mp3',
    },
    {
      id: '4',
      artist: 'Tom Odell',
      track: 'Another Love',
      poster: 'img/Photo4.jpg',
      mp3: 'audio/Tom Odell - Another Love.mp3',
    },
    {
      id: '5',
      artist: 'Lana Del Rey',
      track: 'Born To Die',
      poster: 'img/Photo5.jpg',
      mp3: 'audio/Lana Del Rey - Born To Die.mp3',
    },
    {
      id: '6',
      artist: 'Adele',
      track: 'Hello',
      poster: 'img/Photo6.jpg',
      mp3: 'audio/Adele - Hello.mp3',
    },
    {
      id: '7',
      artist: 'Tom Odell',
      track: "Can't Pretend",
      poster: 'img/Photo7.jpg',
      mp3: "audio/Tom Odell - Can't Pretend.mp3",
    },
    {
      id: '8',
      artist: 'Lana Del Rey',
      track: 'Young And Beautiful',
      poster: 'img/Photo8.jpg',
      mp3: 'audio/Lana Del Rey - Young And Beautiful.mp3',
    },
    {
      id: '9',
      artist: 'Adele',
      track: 'Someone Like You',
      poster: 'img/Photo9.jpg',
      mp3: 'audio/Adele - Someone Like You.mp3',
    },
    {
      id: '10',
      artist: 'Imagine Dragons',
      track: 'Natural',
      poster: 'img/Photo10.jpg',
      mp3: 'audio/Imagine Dragons - Natural.mp3',
    },
    {
      id: '11',
      artist: 'Drake',
      track: 'Laugh Now Cry Later',
      poster: 'img/Photo11.jpg',
      mp3: 'audio/Drake - Laugh Now Cry Later.mp3',
    },
    {
      id: '12',
      artist: 'Madonna',
      track: 'Frozen',
      poster: 'img/Photo12.jpg',
      mp3: 'audio/Madonna - Frozen.mp3',
    },
  ];

const favoriteList = localStorage.getItem('favorite')
  ? JSON.parse(localStorage.getItem('favorite'))
  : [];

const audio = new Audio();
const favoriteBtn = document.querySelector('.header__favorite-btn')
const tracksCard = document.getElementsByClassName('track');
const catalogContainer = document.querySelector('.catalog__container');
const player = document.querySelector('.player');
const pauseBtn = document.querySelector('.player__controller-pause');
const stopBtn = document.querySelector('.player__controller-stop');
const prevBtn = document.querySelector('.player__controller-prev');
const nextBtn = document.querySelector('.player__controller-next');
const likeBtn = document.querySelector('.player__controller-like');
const muteBtn = document.querySelector('.player__controller-mute');
const playerProgressInput = document.querySelector('.player__progress-input');

const playerTimePassed = document.querySelector('.player__time-passed');
const playerTimeTotal = document.querySelector('.player__time-total');


const catalogAddBtn = document.createElement('button');
catalogAddBtn.classList.add('catalog__btn-add')
catalogAddBtn.innerHTML = `
  <span>Увидеть все</span>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z"/>  
`;              


const pausePlayer = () => {
  const trackActive = document.querySelector('.track_active')

  if (audio.paused) {
    audio.play();
    pauseBtn.classList.remove('player__icon_play');
    trackActive.classList.remove('track_pause');
  } else {
    audio.pause();
    pauseBtn.classList.add('player__icon_play');
    trackActive.classList.add('track_pause');
  }
};

const playMusic = (event) => {
    event.preventDefault();
 
    const trackActive = event.currentTarget;

    if (trackActive.classList.contains('track_active')) {
      pausePlayer();
      return
    }
    
    let i = 0;
    const id = trackActive.dataset.idTrack;

    const track = dataMusic.find((item, index) => {
      i = index;
      return id === item.id;
    });

    audio.src = track.mp3;

    audio.play();
    pauseBtn.classList.remove('player__icon_play');
    player.classList.add('player_active');

    const prevTrack = i === 0 ? dataMusic.length - 1 : i - 1;
    const nextTrack = i + 1 === dataMusic.length ? 0 : i + 1;
    prevBtn.dataset.idTrack = dataMusic[prevTrack].id;
    nextBtn.dataset.idTrack = dataMusic[nextTrack].id;

    for (let i = 0; i < tracksCard.length; i++) {
      if (id === tracksCard[i].dataset.idTrack) {
        tracksCard[i].classList.add('track_active');
      } else {
        tracksCard[i].classList.remove('track_active');
      }        
    };



    
};

const addHandlerTrack = () => {
  for (let i = 0; i < tracksCard.length; i++) {

    tracksCard[i].addEventListener('click', playMusic);
  }
};

pauseBtn.addEventListener('click', pausePlayer);

stopBtn.addEventListener('click', () => {
  player.classList.remove('player_active');
  audio.src = '';
  document.querySelector('.track_active').classList.remove('.track_active')
})

const createCard = (data) => {
  const card = document.createElement('a');
  card.href = '#';
  card.classList.add('catalog__item', 'track');
  card.dataset.idTrack = data.id;

  card.innerHTML = `
    <div class="track__img-wrap">
      <img src="${data.poster}" alt="${data.artist} ${data.track}" class="track__poster" width="180" height="180">
    </div>
    <div class="track__info track-info">
      <p class="track-info__title">${data.track}</p>
      <p class="track-info__artist">${data.artist}</p>
    </div>
  `;

  return card
};

const renderCatalog = (dataList) => {
    catalogContainer.textContent = '';
    const listCards = dataList.map(createCard);
    catalogContainer.append(...listCards);
    addHandlerTrack();
};

const checkCount = (i = 1) => {
  tracksCard[0]
  if(catalogContainer.clientHeight > tracksCard[0].clientHeight * 3) {
    tracksCard[tracksCard.length - i].style.display = 'none';
    checkCount(i + 1);
  } else if(i !== 1) {
      catalogContainer.append(catalogAddBtn);   
  }
};

const updateTime = () => {
  const duration = audio.duration;
  const currentTime = audio.currentTime;
  const progress = (currentTime / duration) * 1000;
  playerProgressInput.value = progress ? progress : 0;

  const minutesPassed = Math.floor(currentTime / 60) || '0';
  const secondsPassed = Math.floor(currentTime % 60) || '0';

  const minutesDuration = Math.floor(duration / 60) || '0';
  const secondsDuration = Math.floor(duration % 60) || '0';

  playerTimePassed.textContent = `${minutesPassed}:${secondsPassed < 10 ? '0' + secondsPassed : secondsPassed}`
  playerTimeTotal.textContent = `${minutesDuration}:${secondsDuration < 10 ? '0' + secondsDuration : secondsDuration}`

}


const init = () => {
    renderCatalog(dataMusic);
    checkCount();

    catalogAddBtn.addEventListener('click', () => {
      [...tracksCard].forEach((trackCard) => {
        trackCard.style.display = '';
        catalogAddBtn.remove();
      });
    });

    prevBtn.addEventListener('click', playMusic);
    nextBtn.addEventListener('click', playMusic);

    audio.addEventListener('ended', () => {
      nextBtn.dispatchEvent(new Event('click', {bubbles: true}));
    });


    audio.addEventListener('timeupdate', updateTime);

    playerProgressInput.addEventListener('change', () => {
      const progress = playerProgressInput.value;
      audio.currentTime = (progress / 1000) * audio.duration;
    })
};

init();


