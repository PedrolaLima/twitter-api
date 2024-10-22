require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, 'public')));


app.get('/user/:username', async (req, res) => {
    const username = req.params.username;
    const bearerToken = process.env.BEARER_TOKEN;

    try {
        const response = await fetch(`https://api.twitter.com/2/users/by/username/${username}`, {
            headers: {
                'Authorization': `Bearer ${bearerToken}`
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).send('Erro ao buscar o usuário.');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
