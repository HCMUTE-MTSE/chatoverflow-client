So everything work qute well.

1. I login as User4, select a conversation and send a new message.
2. That message is displayed immediately in the chatbox.
3. When i refresh the page, the message is still there (because it's saved properly to database).

But then i have some problem with the database. So i need to mirgrate the `user`.

`seedUser.js`:

```js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../../models/User.model');

const usersData = [];

const genders = ['male', 'female', 'other'];
const statuses = ['active', 'inactive', 'banned', 'pending'];

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await User.deleteMany({});

    for (let i = 1; i <= 30; i++) {
      usersData.push({
        name: `User ${i}`,
        nickName: `nick${i}`,
        email: `user${i}@example.com`,
        password: bcrypt.hashSync('123456', 10),
        avatar: `https://i.pravatar.cc/150?img=${i}`,
        dateOfBirth: new Date(1990 + (i % 10), i % 12, i),
        address: {
          province: `Province ${i}`,
          ward: `Ward ${i}`,
          street: `Street ${i}`,
        },
        gender: genders[i % 3],
        status: statuses[0],
      });
    }

    await User.insertMany(usersData);
    console.log('✅ Seed users success!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed users failed:', err.message);
    process.exit(1);
  }
}

seedUsers();
```

Due to the id changes now it mismatch with conversation data.

So please recreate a clean verion of `seedConversation.js` and `seedMessage.js`.
