1. My server main file are `app.js` (root folder), i will trim some unnecessary code:

```js
/* Define express, path, cors... */

var indexRouter = require('./app/routes/index');

/* Setup view engine... */
/* Setup cors (app.use(cors())...)... */

app.use('/', indexRouter);

/* Error handler... */

module.exports = app;
```

2. My routes are setup in `app/routes/{subfolder}` like `app/routes/chat`, `app/routes/feed`...:
   All of them are export using the `app\routes\index.js`

```js
/* Define... */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/auth', require('./auth'));
router.use('/question', require('./topic'));
/* Other routes... */
router.use('/chat', require('./chat'));

module.exports = router;
```

3. Each subroute have their own controller, service and repository and an index file:
   `app\routes\chat\index.js`

```js
const chatController = require('../../controller/chat/Chat.controller');

router.get('/conversations/:userId', chatController.getConversations);
router.get('/messages/:conversationId', chatController.getMessages);
router.post('/messages', chatController.sendMessage);

module.exports = router;
```

Do you need any further information?

Btw, "I need to see your current server setup to integrate Socket.IO properly", nice to see you're remember the collabration guidance !
