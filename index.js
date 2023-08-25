const express = require('express');
const app = express();
const port = 5000;
app.use(express.json());
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const functions = require('firebase-functions')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://wevois-office-management.firebaseio.com/"
    
});
// const db = admin.database();


app.post('/Authentication',(req, res) => {
    const userId = req.body.username;
    const db = admin.database();
    if (!req.body.username) {
        return res.status(401).send('Unauthorized');
    }
   
    // const data = req.body; 
    const data={password:req.body.password,username:req.body.username};
    const ref = db.ref('Authentication');
    ref.child(userId).update(data, (error) => {
        if (error) {
            res.status(500).send('Data could not be added.');
        } else {
            res.status(200).send('Data added successfully.');
        }
    });
});

 

app.get('/Authentication', async (req, res) => {
    const db = admin.database();
    const usersRef = db.ref('Authentication');
    usersRef.get().then((data) => {
    return res.status(201).json(data);

    })
})

app.listen(port, function () {
    console.log(`Server is running on port ${port}`);
    exports.app = functions.https.onRequest(app);
})
