We need two schemas:

Conversation:

```
Conversation {
  id: string;
  participantIDs: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

Message:

```
Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: Date;
}
```

First task is convert them to real MongoDB-Mongoose models.

Second task is to create a simple seeder route for them. My seeder files are simple:

- Each model has its own seeder file, in app\database\seeders\seed{modelName}.js and runing directly using `node`.
  The core structure is:

```js
async function seedModel() {
    const modelData = [];
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await Model.deleteMany({});

        for(int i = 0; i < 20; i++) {
            modelData.push(({/* Model props */}));
        }

        await Model.insertMany(modelData);
    }
    /* error handling */
}
```

Warning reminds that the server is plain JS, not TS !
