const express = require('express');
const app = express();
var cors = require('cors');
const port = process.env.PORT || 5000;

const categories = require('./data/categories.json');
const news = require('./data/news.json');



app.use(cors());

app.get('/', (req, res) => {
    res.send('Dragon news is running on...')
})

//left side nav bar er category data loaded
app.get('/categories', (req, res) => {
    res.send(categories)
})

// all news loaded-1
app.get('/news', (req, res) => {
    res.send(news)
})

//specific data find by id
app.get('/news/:id', (req, res) => {
    const id = req.params.id;
    const selectedNews = news.find(n => n._id === id);
    res.send(selectedNews)
})

// specific category find by category_id
app.get('/categories/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id === 0) {
        req.send(id)
    }
    else {
        const categoryNews = news.filter(n => parseInt(n.category_id) === id);
        res.send(categoryNews)
    }
})


app.listen(port, () => {
    console.log(`Dragon API is running on port ${port}`)
})