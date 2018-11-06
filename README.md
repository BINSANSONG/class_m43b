# SoundCloud API 

## Get started

### installation

url 에서 기본 템플릿을 받는다. 

* `javascripts/`
  * `main.js` : 우리가 작성할 JS
  * `semantinc.min.js` : semanticUI 에서 사용하는 js / empty
* `styles/`
  * `themes/` : font + etc
  * `main.css` : custom css
  * `reset.css` : reset
  * `sementic.min.jss` : sementicUI 에서 사용하는 minified css
* `index.html` : HTML

`javascipts/main.js`

```js
/* 1. Search */

/* 2. SoundCloud API */

/* 3. Display Cards*/

/* 4. Add to playlist and play */
```

## SoundCloud API 연결하기

- [developers.soundcloud.com](https://developers.soundcloud.com/)
- https://developers.soundcloud.com/docs/api/guide#search

`index.html`

```html
<!doctype html>
<html>
<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>SoundCloud Player</title>
    <link rel='stylesheet' href='styles/semantic.min.css'>
    <link rel='stylesheet' href='styles/main.css'>

</head>
<body id="soundcloud-player">

<div class="ui container col">
    <div class="col-left js-playlist">
        <div class="inner"></div>
    </div>
    <div class="col-right">
        <div class="main">
            <div class="ui massive icon input">
                <input type="text" placeholder="Search for a song or artist..." class="js-search input-search">
                <i class="search icon js-submit"></i>
            </div>

            <div class="search-results js-search-results ui cards">

                <!-- BEGIN CARD -->
                <div class="card">
                    <div class="image">
                        <img class="image_img" src="http://www.placekitten.com/290/290">
                    </div>
                    <div class="content">
                        <div class="header">
                            <a href="https://soundcloud.com/barsuk-records/rilo-kiley-science-vs-romance" target="_blank">"Science Vs. Romance"</a>
                        </div>
                    </div>
                    <div class="ui bottom attached button js-button">
                        <i class="add icon"></i>
                        <span>Add to playlist</span>
                    </div>
                </div>
                <!-- END CARD -->

            </div>
        </div>
    </div>
</div>

<!-- 추가 -->
<script src="https://connect.soundcloud.com/sdk/sdk-3.3.0.js"></script>
<script src='javascripts/semantic.min.js'></script>
<script src="javascripts/main.js"></script>
</body>
</html>
```

```js
client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
```

`javascripts/main.js`

```js
/* 1. Search */

/* 2. SoundCloud API */
SC.initialize({
  client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
});
// find all sounds of buskers licensed under 'creative commons share alike'
SC.get('/tracks', {
  q: 'buskers', 
  license: 'cc-by-sa',
}).then( tracks => {
  console.log(tracks);
});
/* 3. Display Cards*/

/* 4. Add to playlist and play */
```

### Anonymous function 

```js
function sayHello(name) {
    console.log( 안녕, `${name}`);
    return(`Said Hello to ${name}`);
}

function(){
    console.log('BOOOOOOOOM');
};

const varOrFunction = () => {
    console.log('who am i?')
}
```

### Object

```js
const happyHacking = {
    address: '봉은사로',
    hackers: {
        ceo1: 'john',
        ceo2: 'tak',
        developer: 'zzulu',
        lecturer: 'change',
        creater: 'neo',   
    },
    interns: {
        intern1: 'js',
        intern2: 'juno',
    },
};

console.log(happyHacking.hackers.creater);
```

#### Why use object

> 우리의 코드(데이터)를 더 정렬하기 위해서.

1. Encapsulation
2. Inheritance
3. Namespacing
4. ...

Use class if we need to

https://google.github.io/styleguide/jsguide.html#naming-rules-common-to-all-identifiers

### SoundCloud code 를 object 로 감싸기.

이전에도 함수로 묶어보자.

```js
/* 1. Search */

/* 2. SoundCloud API */

const getTrack = (inputValue) => {
  SC.initialize({
    client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
  });

  SC.get('/tracks', {
    q: inputValue,
    license: 'cc-by-sa',
  }).then( tracks => {
    console.log(tracks);
  });
};

Sound
/* 3. Display Cards*/

/* 4. Add to playlist and play */

```

그런데 만약 10000줄짜리 코드에서 엄청나게 많은 function 들을 찾아내려면..? function 들도 object 로 묶자!

```js
/* 1. Search */

/* 2. SoundCloud API */

// const SoundCloudAPI = {};
// SoundCloudAPI.init = () => {
//   SC.initialize({
//     client_id: "cd9be64eeb32d1741c17cb39e41d254d"
//   });
// };
// SoundCloudAPI.getTrack = (inputValue) => {
//   SC.get("/tracks", {
//     q: inputValue,
//     license: "cc-by-sa"
//   }).then(tracks => {
//     console.log(tracks);
//   });
// };
const SoundCloudAPI = {
  init: () => {
    SC.initialize({
      client_id: "cd9be64eeb32d1741c17cb39e41d254d"
    });
  },

  getTrack: inputValue => {
    SC.get("/tracks", {
      q: inputValue,
      license: "cc-by-sa"
    }).then(tracks => {
      console.log(tracks);
    });
  }
};

SoundCloudAPI.init();
SoundCloudAPI.getTrack('busker');

/* 3. Display Cards*/

/* 4. Add to playlist and play */

```

## HTML card 를 동적으로 만들어보자.

직접 카드 복붙..? ㄴㄴ

```js
/* 1. Search */

/* 2. SoundCloud API */

const SoundCloudAPI = {
  init: () => {
    SC.initialize({
      client_id: "cd9be64eeb32d1741c17cb39e41d254d"
    });
  },

  getTrack: inputValue => {
    SC.get("/tracks", {
      q: inputValue,
      license: "cc-by-sa"
    }).then(tracks => {
      console.log(tracks);
    });
  }
};

SoundCloudAPI.init();
SoundCloudAPI.getTrack('busker');

// find all sounds of buskers licensed under 'creative commons share alike'

/* 3. Display Cards*/

SoundCloudAPI.renderTracks = () => {
  const card = document.createElement('div');
  card.classList.add("card");

  const searchResults = document.querySelector(".js-search-results");
  searchResults.appendChild(card);
};

SoundCloudAPI.renderTracks();
/* 4. Add to playlist and play */

```

이어서 전체 카드 파트를 js 로 옮겨보자

---

기존의 카드는 삭제한다.

`index.html`

```html
<!doctype html>
<html>
<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>SoundCloud Player</title>
    <link rel='stylesheet' href='styles/semantic.min.css'>
    <link rel='stylesheet' href='styles/main.css'>

</head>
<body id="soundcloud-player">

<div class="ui container col">
    <div class="col-left js-playlist">
        <div class="inner"></div>
    </div>
    <div class="col-right">
        <div class="main">
            <div class="ui massive icon input">
                <input type="text" placeholder="Search for a song or artist..." class="js-search input-search">
                <i class="search icon js-submit"></i>
            </div>

            <div class="search-results js-search-results ui cards">
                <!-- 삭제 -->
            </div>
        </div>
    </div>
</div>

<!-- 추가 -->
<script src="https://connect.soundcloud.com/sdk/sdk-3.3.0.js"></script>
<script src='javascripts/semantic.min.js'></script>
<script src="javascripts/main.js"></script>
</body>
</html>
```

js 로 전체 카드를 생성하는 코드를 작성하고, API 에서 성공적으로 응답을 받았을 때, render 한다.

```js
/* 1. Search */

/* 2. SoundCloud API */

const SoundCloudAPI = {
  init: () => {
    SC.initialize({
      client_id: "cd9be64eeb32d1741c17cb39e41d254d"
    });
  },

  getTrack: inputValue => {
    SC.get("/tracks", { // tracks 를 가져와 (with q,license)
      q: inputValue,
      license: "cc-by-sa"
    }).then(tracks => { // 그리고 이게 되면,
      console.log(tracks);
      SoundCloudAPI.renderTracks(tracks); // 트랙들을 인자로 넘기자
    });
  }
};

SoundCloudAPI.init();
SoundCloudAPI.getTrack('busker');

/* 3. Display Cards*/

SoundCloudAPI.renderTracks = tracks => {
    
  // Card
  const card = document.createElement('div');
  card.classList.add("card");

  // Image
  const imageDiv = document.createElement('div');
  imageDiv.classList.add('image');

  const imageImg  = document.createElement('img');
  imageImg.classList.add('image_img');
  imageImg.src = 'http://www.placekitten.com/290/290';

  imageDiv.appendChild(imageImg);

  // Content
  const content = document.createElement('div');
  content.classList.add('content');

  // Header
  const header = document.createElement('div');
  header.classList.add('header');
  header.innerHTML = '<a href="#" target="_blank">This hits that Ice Cold</a>';

  // Button
  const button = document.createElement('div');
  button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');

  const icon = document.createElement('i');
  icon.classList.add('add', 'icon');

  const buttonText = document.createElement('span');
  buttonText.innerHTML = 'Add to playlist';

  // 붙이기!
  content.appendChild(header);

  button.appendChild(icon);
  button.appendChild(buttonText);

  card.appendChild(imageDiv);
  card.appendChild(content);
  card.appendChild(button);

  const searchResults = document.querySelector(".js-search-results");
  searchResults.appendChild(card);
};

/* 4. Add to playlist and play */

```

이제 `SoundCloudAPI.renderTracks()`  에 tracks 가 인자로 들어오고, 이 tracks 는 6개의 object 를 가진 배열이다. 이 배열을 `forEach()` 헬퍼를 통해 돌면서 출력해보자.

```js

/* 3. Display Cards*/

SoundCloudAPI.renderTracks = tracks => {
  tracks.forEach(track => {
    console.log(track);
    ...
  });
};

```

이제 `track` 에서 원하는 정보를 가져올 수 있다.

```js
/* 1. Search */

/* 2. SoundCloud API */

const SoundCloudAPI = {
  ...
};

SoundCloudAPI.init();
SoundCloudAPI.getTrack('busker');

/* 3. Display Cards*/

SoundCloudAPI.renderTracks = tracks => {
  tracks.forEach(track => {
    // Card
    const card = document.createElement('div');
    card.classList.add("card");

    // Image
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('image');

    const imageImg  = document.createElement('img');
    imageImg.classList.add('image_img');
      // 수정
    imageImg.src = track.artwork_url; 

    imageDiv.appendChild(imageImg);

    // Content
    const content = document.createElement('div');
    content.classList.add('content');

    // Header
    const header = document.createElement('div');
    header.classList.add('header');
      // 수정
    header.innerHTML = `<a href="${track.permalink_url}" target="_blank">${track.permalink}</a>`;

    // Button
    const button = document.createElement('div');
    button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');

    const icon = document.createElement('i');
    icon.classList.add('add', 'icon');

    const buttonText = document.createElement('span');
    buttonText.innerHTML = 'Add to playlist';

    // 붙이기!
    content.appendChild(header);

    button.appendChild(icon);
    button.appendChild(buttonText);

    card.appendChild(imageDiv);
    card.appendChild(content);
    card.appendChild(button);

    const searchResults = document.querySelector(".js-search-results");
    searchResults.appendChild(card);
  });
};

/* 4. Add to playlist and play */

```

그런데 이미지가 존재하지 않는(`track.artwork_url`)  이 없는(`null`) 트랙들이 있다. 랜덤 이미지로 대체하자. `null` 은 `false` 이기 때문에 `track.artwork_url` 이 없으면 랜덤 이미지를 제공하자.

`http://lorempixel.com/100/100/abstract/` : 100 * 100 px 랜덤 이미지를 제공한다.

```js
	imageImg.src = (track.artwork_url || 'http://lorempixel.com/100/100/abstract/';
```

Done!

```js
/* 1. Search */

/* 2. SoundCloud API */

const SoundCloudAPI = {
  init: () => {
    SC.initialize({
      client_id: "cd9be64eeb32d1741c17cb39e41d254d"
    });
  },

  getTrack: inputValue => {
    SC.get("/tracks", { // tracks 를 가져와 (with q,license)
      q: inputValue,
      license: "cc-by-sa"
    }).then(tracks => { // 그리고 이게 되면,
      console.log(tracks);
      SoundCloudAPI.renderTracks(tracks); // 트랙들을 인자로 넘기자
    });
  }
};

SoundCloudAPI.init();
SoundCloudAPI.getTrack('busker');

/* 3. Display Cards*/

SoundCloudAPI.renderTracks = tracks => {
  tracks.forEach(track => {
    // Card
    const card = document.createElement('div');
    card.classList.add("card");

    // Image
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('image');

    const imageImg  = document.createElement('img');
    imageImg.classList.add('image_img');
    // 수정
    imageImg.src = track.artwork_url || 'http://lorempixel.com/100/100/abstract';

    imageDiv.appendChild(imageImg);

    // Content
    const content = document.createElement('div');
    content.classList.add('content');

    // Header
    const header = document.createElement('div');
    header.classList.add('header');
    // 수정
    header.innerHTML = `<a href="${track.permalink_url}" target="_blank">${track.permalink}</a>`;

    // Button
    const button = document.createElement('div');
    button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');

    const icon = document.createElement('i');
    icon.classList.add('add', 'icon');

    const buttonText = document.createElement('span');
    buttonText.innerHTML = 'Add to playlist';

    // 붙이기!
    content.appendChild(header);

    button.appendChild(icon);
    button.appendChild(buttonText);

    card.appendChild(imageDiv);
    card.appendChild(content);
    card.appendChild(button);

    const searchResults = document.querySelector(".js-search-results");
    searchResults.appendChild(card);
  });
};

/* 4. Add to playlist and play */


```

## Playlist and play

현재의 url은 해당 링크로 이동해 버리지만, 이게 아니라 실제 삽입(embeded)된 플레이어를 사용하도록 해보자.

https://developers.soundcloud.com/docs/api/sdks#embedding

```js
...
/* 4. Add to playlist and play */

SC.oEmbed('http://soundcloud.com/forss/flickermood', {
  auto_play: true
}).then(function(embed){
  console.log('oEmbed response: ', embed);
});
```

콘솔에서 나오는 `<iframe>` 데이터를 하드코딩 해보자.

```js
{
    ...
    html: '<iframe width="100%" height="400" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F293&show_artwork=true&auto_play=true"></iframe>'
    ...
}
```

`index.html`

```html
<!doctype html>
<html>
<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>SoundCloud Player</title>
    <link rel='stylesheet' href='styles/semantic.min.css'>
    <link rel='stylesheet' href='styles/main.css'>

</head>
<body id="soundcloud-player">

<div class="ui container col">
    <div class="col-left js-playlist">
        <div class="inner">
            <!-- 여기에 추가하자 -->
            <iframe width="100%" height="400" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F228607149&show_artwork=true&auto_play=true"></iframe>
        </div>
    </div>
    <div class="col-right">
        <div class="main">
            <div class="ui massive icon input">
                <input type="text" placeholder="Search for a song or artist..." class="js-search input-search">
                <i class="search icon js-submit"></i>
            </div>

            <div class="search-results js-search-results ui cards">

            </div>
        </div>
    </div>
</div>
    
<script src="https://connect.soundcloud.com/sdk/sdk-3.3.0.js"></script>
<script src='javascripts/semantic.min.js'></script>
<script src="javascripts/main.js"></script>
</body>
</html>
```

이제 대략 감이 온다.  `<div class="inner">` 안에 `embed.html` 내용인 `<iframe>` 을 밀어 넣으면 된다!

```js
/* 4. Add to playlist and play */

SC.oEmbed('https://soundcloud.com/abdallah-soliman-kujuk/jack-broadbent-on-the-road-again', {
  auto_play: true
}).then(function(embed){
  console.log('oEmbed response: ', embed);
  const sidebar = document.querySelector('.inner');
  sidebar.innerHTML = embed.html;
});
```

## Add to playlist - Event 추가

```js
/* 1. Search */

/* 2. SoundCloud API */

const SoundCloudAPI = {
  init: () => {
    SC.initialize({
      client_id: "cd9be64eeb32d1741c17cb39e41d254d"
    });
  },

  getTrack: inputValue => {
    SC.get("/tracks", { // tracks 를 가져와 (with q,license)
      q: inputValue,
      license: "cc-by-sa"
    }).then(tracks => { // 그리고 이게 되면,
      console.log(tracks);
      SoundCloudAPI.renderTracks(tracks); // 트랙들을 인자로 넘기자
    });
  }
};

SoundCloudAPI.init();
SoundCloudAPI.getTrack('busker');

/* 3. Display Cards*/

SoundCloudAPI.renderTracks = tracks => {
  tracks.forEach(track => {
    // Card
    const card = document.createElement('div');
    card.classList.add("card");

    // Image
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('image');

    const imageImg  = document.createElement('img');
    imageImg.classList.add('image_img');
    imageImg.src = track.artwork_url || 'http://lorempixel.com/100/100/abstract';
    imageDiv.appendChild(imageImg);

    // Content
    const content = document.createElement('div');
    content.classList.add('content');

    // Header
    const header = document.createElement('div');
    header.classList.add('header');
    header.innerHTML = `<a href="${track.permalink_url}" target="_blank">${track.permalink}</a>`;

    // Button
    const button = document.createElement('div');
    button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');
      // 이벤트 리스너 추가 => 여기에서 함수 호출
    button.addEventListener('click', (e) => {
      SoundCloudAPI.addPlaylist(track.permalink_url);
    });


    const icon = document.createElement('i');
    icon.classList.add('add', 'icon');

    const buttonText = document.createElement('span');
    buttonText.innerHTML = 'Add to playlist';

    content.appendChild(header);

    button.appendChild(icon);
    button.appendChild(buttonText);

    card.appendChild(imageDiv);
    card.appendChild(content);
    card.appendChild(button);

    const searchResults = document.querySelector(".js-search-results");
    searchResults.appendChild(card);
  });
};

/* 4. Add to playlist and play */
  // 함수 정의
SoundCloudAPI.addPlaylist = (trackURL) => {
  SC.oEmbed(trackURL, {
    auto_play: true
  }).then((embed) => {
    const sidebar = document.querySelector('.inner');
    sidebar.innerHTML = embed.html;
  });
};
```

거의 완성된 것 처럼 보인다. 이제 남은건 플레이 리스트에 계속해서 추가해 나가는 것이다.

```js
/* 4. Add to playlist and play */

SoundCloudAPI.addPlaylist = (trackURL) => {
  SC.oEmbed(trackURL, {
    auto_play: true
  }).then((embed) => {
    const sidebar = document.querySelector('.inner');
    const playBox = document.createElement('div');
    playBox.innerHTML = embed.html;
    // sidebar.appendChild(playBox);
    sidebar.insertBefore(playBox, sidebar.firstChild);
  });
};
```



## Search

이제 검색기능을 구현해 보자. `SoundCloudAPI.getTracks()` 의 인자를 바꾸면 된다.

```js
/* 1. Search */

const inputArea = document.querySelector('.js-search');
inputArea.addEventListener( 'keyup', e => {
  if (e.which === 13) SoundCloudAPI.getTracks(inputArea.value);
});

const searchButton = document.querySelector('.js-submit');
searchButton.addEventListener( 'click', () => {
  SoundCloudAPI.getTracks(inputArea.value);
});

/* 2. SoundCloud API */

const SoundCloudAPI = {
  init: () => {
    SC.initialize({
      client_id: "cd9be64eeb32d1741c17cb39e41d254d"
    });
  },

  getTracks: inputValue => {
    SC.get("/tracks", { // tracks 를 가져와 (with q,license)
      q: inputValue,
      // license: "cc-by-sa"
    }).then(tracks => { // 그리고 이게 되면,
      console.log(tracks);
      SoundCloudAPI.renderTracks(tracks); // 트랙들을 인자로 넘기자
    });
  }
};

SoundCloudAPI.init();


/* 3. Display Cards*/

SoundCloudAPI.renderTracks = tracks => {
  let searchResults = document.querySelector(".js-search-results"); // 새롭게 비우고 시작하기.
  searchResults.innerHTML = '';

  tracks.forEach(track => {
    // Card
    const card = document.createElement('div');
    card.classList.add("card");

    // Image
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('image');

    const imageImg  = document.createElement('img');
    imageImg.classList.add('image_img');
    imageImg.src = track.artwork_url || 'http://lorempixel.com/100/100/abstract';
    imageDiv.appendChild(imageImg);

    // Content
    const content = document.createElement('div');
    content.classList.add('content');

    // Header
    const header = document.createElement('div');
    header.classList.add('header');
    header.innerHTML = `<a href="${track.permalink_url}" target="_blank">${track.permalink}</a>`;

    // Button
    const button = document.createElement('div');
    button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');

    button.addEventListener('click', (e) => {
      SoundCloudAPI.addPlaylist(track.permalink_url);
    });


    const icon = document.createElement('i');
    icon.classList.add('add', 'icon');

    const buttonText = document.createElement('span');
    buttonText.innerHTML = 'Add to playlist';

    content.appendChild(header);

    button.appendChild(icon);
    button.appendChild(buttonText);

    card.appendChild(imageDiv);
    card.appendChild(content);
    card.appendChild(button);

    searchResults.appendChild(card);
  });
};

/* 4. Add to playlist and play */
SoundCloudAPI.addPlaylist = (trackURL) => {
  SC.oEmbed(trackURL, {
    auto_play: true
  }).then((embed) => {
    const sidebar = document.querySelector('.inner');
    const playBox = document.createElement('div');
    playBox.innerHTML = embed.html;
    sidebar.insertBefore(playBox, sidebar.firstChild);
  });
};
```

## Local storage

https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

```js
/* 4. Add to playlist and play */
SoundCloudAPI.addPlaylist = (trackURL) => {
  SC.oEmbed(trackURL, {
    auto_play: true
  }).then((embed) => {
    const sidebar = document.querySelector('.inner');
    const playBox = document.createElement('div');
    playBox.innerHTML = embed.html;
    sidebar.insertBefore(playBox, sidebar.firstChild);

    // local storage
    localStorage.setItem('playList', sideBar.innerHTML);
    console.log(localStorage);
  });
};
```



## Upgrade (reset button)

```html
<!doctype html>
<html>
<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>SoundCloud Player</title>
    <link rel='stylesheet' href='./styles/semantic.min.css'>
    <link rel='stylesheet' href='./styles/main.css'>
</head>
<body id="soundcloud-player">

<div class="ui container col">
    <div class="col-left js-playlist">
        <div class="reset">
            <button id="js-reset" class="ui inverted purple button">Reset</button>
        </div>

        <div class="inner">

        </div>
    </div>
    <div class="col-right">
        <div class="main">
            <div class="ui massive icon input">
                <input type="text" placeholder="Search for a song or artist..." class="js-search input-search">
                <i class="search icon js-submit"></i>
            </div>

            <div class="search-results js-search-results ui cards">

            </div>
        </div>
    </div>
</div>

<!-- 추가 -->
<script src="https://connect.soundcloud.com/sdk/sdk-3.3.0.js"></script>
<script src='javascripts/semantic.min.js'></script>
<script src="javascripts/main.js"></script>
</body>
</html>
```

```js
/* 1. Search */

const inputArea = document.querySelector('.js-search');
inputArea.addEventListener( 'keyup', e => {
  if (e.which === 13) SoundCloudAPI.getTracks(inputArea.value);
});

const searchButton = document.querySelector('.js-submit');
searchButton.addEventListener( 'click', () => {
  SoundCloudAPI.getTracks(inputArea.value);
});

const sideBar = document.querySelector('.inner');
sideBar.innerHTML= localStorage.getItem('playList');

const resetButton = document.querySelector('#js-reset');
resetButton.addEventListener('click', () => {
  localStorage.clear();
  sideBar.innerHTML = '';
});


/* 2. SoundCloud API */

const SoundCloudAPI = {
  init: () => {
    SC.initialize({
      client_id: "cd9be64eeb32d1741c17cb39e41d254d"
    });
  },

  getTracks: inputValue => {
    SC.get("/tracks", { // tracks 를 가져와 (with q,license)
      q: inputValue,
      // license: "cc-by-sa"
    }).then(tracks => { // 그리고 이게 되면,
      console.log(tracks);
      SoundCloudAPI.renderTracks(tracks); // 트랙들을 인자로 넘기자
    });
  }
};

SoundCloudAPI.init();


/* 3. Display Cards*/

SoundCloudAPI.renderTracks = tracks => {
  let searchResults = document.querySelector(".js-search-results");
  searchResults.innerHTML = '';

  tracks.forEach(track => {
    // Card
    const card = document.createElement('div');
    card.classList.add("card");

    // Image
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('image');

    const imageImg  = document.createElement('img');
    imageImg.classList.add('image_img');
    imageImg.src = track.artwork_url || 'http://lorempixel.com/100/100/abstract';
    imageDiv.appendChild(imageImg);

    // Content
    const content = document.createElement('div');
    content.classList.add('content');

    // Header
    const header = document.createElement('div');
    header.classList.add('header');
    header.innerHTML = `<a href="${track.permalink_url}" target="_blank">${track.permalink}</a>`;

    // Button
    const button = document.createElement('div');
    button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');
    // 이벤트 리스너 추가 => 여기에서 함수 호출
    button.addEventListener('click', () => {
      SoundCloudAPI.addPlaylist(track.permalink_url);
    });


    const icon = document.createElement('i');
    icon.classList.add('add', 'icon');

    const buttonText = document.createElement('span');
    buttonText.innerHTML = 'Add to playlist';

    content.appendChild(header);

    button.appendChild(icon);
    button.appendChild(buttonText);

    card.appendChild(imageDiv);
    card.appendChild(content);
    card.appendChild(button);

    searchResults.appendChild(card);
  });
};

/* 4. Add to playlist and play */
SoundCloudAPI.addPlaylist = (trackURL) => {
  SC.oEmbed(trackURL, {
    auto_play: true
  }).then((embed) => {
    const sidebar = document.querySelector('.inner');
    const playBox = document.createElement('div');
    playBox.innerHTML = embed.html;
    sidebar.insertBefore(playBox, sidebar.firstChild);

    // local storage
    localStorage.setItem('playList', sideBar.innerHTML);
  });
};

```

