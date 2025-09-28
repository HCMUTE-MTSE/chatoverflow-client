Shema name: "Message"
{
id: string;
senderID: string;
receiverID: string;
content: string;
}

---

Schema name: "Conversation"
Shape of the schema:
{
id: string;
user1ID: string;
user2ID: string;

    messages: Message[]

}
