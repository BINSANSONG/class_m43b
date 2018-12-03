## Deploy MERN

```sh
$ pwd
/.../.../MERN/server/client
$ npm run build
```

우리 리액트 앱에는 `/dashboard` 라는 라우트가 있지만, 실제로 Express 서버는 이 라우팅을 모른다.

Express 에게 새로운 라우팅을 해줘야 한다.

## Routing in production

`/.../.../server/index.js`

```js
require('./services/passport');

const User = require('./models/User');

const auth = require('./routes/auth');
const users = require('./routes/users');


const config = require('config');
const cookieSession = require('cookie-session'); // 추가
const passport = require('passport'); // 추가
const mongoose = require('mongoose');
const express = require("express");
const app = express();

mongoose.connect(config.DB.mongoURI, { useNewUrlParser: true })
  .then(() => console.log(`Connected to MongoDB in ${app.get('env')}`))
  .catch((error) => console.error(error.message));

app.use(
  cookieSession({
    name: 'MERN cookie',
    maxAge: (30 * 24 * 60 * 60 * 1000),// 30일 millie seconds
    keys: [config.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use('/auth/google', auth);
app.use('/api/users', users);

if (app.get('env') === 'production') {
  // Express 가 production 어셋들을 제공한다. (main.js, main.css ...)
  
  // Express 가 라우트를 구분하지 못하면 index.html 을 제공한다.
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
```

```js
...
if (app.get('env') === 'production') {
  // Express 가 production 어셋들을 제공한다. (main.js, main.css ...)
  app.use(express.static('client/build'));
  
  // Express 가 라우트를 구분하지 못하면 index.html 을 제공한다.
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
...
```

## Deploy를 위한 옵션

1. 빌드 => 커밋 => 푸시
2. **커밋 => 푸시 => 빌드(in heroku)** 
3. CI (Continuous Integration - [지속적 통합](https://aws.amazon.com/ko/devops/continuous-integration/) )
   1. CI 서버로 푸시
   2. 테스트
   3. CI 가 빌드 => 푸시

## Heroku build step

`server/package.json` (`server/client/package.json` 는 heroku 가 전혀 신경쓰지 않는다.)

```json
...
"scripts": {
    "start": "node index.js",
    "server": "nodemon index.js",
    "client": "npm run start --prefix client",
    "dev": "concurrently \"nodemon index.js\" \"npm run client\"",
    "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
  },
...
```

```sh
$ pwd
/.../.../server
$ git add .
$ git commit -m 'ready to deploy'
$ git push heroku master
```

