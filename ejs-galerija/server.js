const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.static('public')); //sve u public dostupno poslužitelju


app.get('/', (req, res) => {
  res.redirect('/slike');
});


app.get('/slike', (req, res) => {
  const folderPath = path.join(__dirname, 'public', 'images');
  const files = fs.readdirSync(folderPath);

  const images = files
    .filter(file => file.endsWith('.svg') || file.endsWith('.png'))
    .map((file, index) => ({
      url: `/images/${file}`,
      id: `slika${index + 1}`,
      title: `Slika ${index + 1}`
    }));

  res.render('slike', { images }); 
});

app.listen(PORT, () => {
  console.log(`Server pokrenut na http://localhost:${PORT}`);
});
