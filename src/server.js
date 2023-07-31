const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.route('/', '/index.html');

app.use('/', express.static(__dirname + '/pages/game/'))

app.post('/0', (req, res) => {
    console.log(req.body);
    res.send();
})