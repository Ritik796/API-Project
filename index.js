const express = require('express');
const app = express();
const port = 5000;
app.use(express.json());
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
const functions = require('firebase-functions');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://reactjs-project-b7b3a-default-rtdb.firebaseio.com"
});
const db = admin.database();


app.post('/addData', (req, res) => {
    const db = admin.database();
    const data = req.body; 
    const ref = db.ref('usersData');

    ref.push(data, (error) => {
        if (error) {
            res.status(500).send('Data could not be added.');
        } else {
            res.status(200).send('Data added successfully.');
        }
    });
});

 

app.get('/users', async (req, res) => {
    const usersRef = db.ref('usersData');
    usersRef.get().then((data) => {
    return res.status(201).json(data);

    })
})

app.listen(port, function () {
    exports.app = functions.https.onRequest(app);
})
