const express = require('express');
const app = express();
const port = 5000;
app.use(express.json());
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://reactjs-project-b7b3a-default-rtdb.firebaseio.com"
});

app.get('/', (req, res) => {
    const db = admin.database();
    res.send('Hello, World!');
    const dataToAdd = {
        name: 'John Doe',
        email: 'john@example.com',
        age: 30
    };
    const ref = db.ref('usersData');
    const newRef = ref.push(dataToAdd);
    console.log('New data added with key:', newRef.key);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
