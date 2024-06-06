const express = require('express');
const axios = require('axios');
const { JSDOM } = require('jsdom');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to enable CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Endpoint to scrape Amazon
app.get('/api/scrape', async (req, res) => {
    const { keyword } = req.query;
    if (!keyword) {
        return res.status(400).json({ error: 'Keyword is required' });
    }

    try {
        const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });

        const dom = new JSDOM(response.data);
        const document = dom.window.document;
        const products = [];

        const items = document.querySelectorAll('.s-result-item');

        items.forEach(item => {
            const title = item.querySelector('h2 .a-text-normal')?.textContent.trim();
            const rating = item.querySelector('.a-icon-alt')?.textContent.trim();
            const reviews = item.querySelector('.a-size-small .a-link-normal')?.textContent.trim();
            const image = item.querySelector('.s-image')?.src;

            if (title && rating && reviews && image) {
                products.push({ title, rating, reviews, image });
            }
        });

        res.json(products);

    } catch (error) {
        res.status(500).json({ error: 'Error scraping Amazon' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
