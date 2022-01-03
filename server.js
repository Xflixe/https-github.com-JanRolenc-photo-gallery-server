const express = require('express');
const cors = require('cors');

const app = express();

//bez techto dvou radku by hlasil error, ze nerozumi, co je body.password
// TypeError: Cannot destructure property 'password' of 'req.body' as it is undefined.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send(database.users)
})

const database = {
    users: [
        { followers_count: '1000000000000', statuses_count: '1000000000000', coefficient: '1000000' },
        { user_name: 'binance', email: 'jana@gmail.com', heslo: 'jana' },
        { name: 'janek', email: 'janek@gmail.com', heslo: 'janek' }
    ]
}

app.post('/signin', (req, res) => {
    const { password } = req.body;
    if (!password) {
        res.status(400).json('the password is not filled in');
    } else if (password === database.users[0].heslo) {
        // return res.json('heslo is ok') //funguje s i bez return
        res.json('ok');
    } else {
        res.status(400).json('error loggin in');
    }
})
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    if ((!password) || (!name) || (!email)) {
        res.status(400).json('some data is not filled in');
    } else {
        database.users.push({
            name: name,
            email: email,
            heslo: password
        });
        res.json(database.users[database.users.length - 1]);
    }

})

// app.listen(process.env.PORT || 3000, (req, res) => {
//     console.log(`server is running on port ${process.env.PORT}`);
// })
app.listen(3000, (req, res) => {
    console.log("server is running on port 3000");
})
