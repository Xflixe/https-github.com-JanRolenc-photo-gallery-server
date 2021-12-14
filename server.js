const express = require('express');
const cors = require('cors');

const app = express();


//bez techto dvou radku by hlasil error, ze nerozumi, co je body.input
// TypeError: Cannot destructure property 'input' of 'req.body' as it is undefined.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('ahoj')
})

const heslo = 'kkz';

app.post('/confirm', (req, res) => {
    const { input } = req.body;
    if (!input) {
        res.status(400).json('the password is not filled in')
    }
    if (input === heslo) {
        // return res.json('heslo is ok') //funguje s i bez return
        res.json('ok')
    } else {
        res.status(400).json('error loggin in')
    }
})


app.listen(3000, (req, res) => {
    console.log('server is running on port 3000');
})