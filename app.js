const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const shortid = require('shortid');
const users = {

}
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/:shorturlId', (req, res) => {
    const longUrl = users[req.params.shorturlId];
    if (longUrl) {
        if (longUrl.indexOf('https://') != 0) {
            res.redirect('https://' + longUrl);
        } else {
            res.redirect(longUrl);
        }
    } else {
        res.status('404').send("url does not exist");
    }
})
app.post('/', (req, res) => {
    const userData = req.body;
    const longUrl = userData.longUrl;
    const shorturlId = shortid.generate();

    users[shorturlId] = longUrl;
    res.send({ shortUrl: `http://localhost:3000/${shorturlId}` });
})



app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});