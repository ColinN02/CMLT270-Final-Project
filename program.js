const { argv } = require('process')
const PORT = argv[2]
const express = require('express')
const path = require('path')
const app = express()
const sharp = require('sharp');
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static('public'));
app.use('/images', express.static('images'));
app.set("views", path.resolve(__dirname, "templates"));
app.set('view engine', '.ejs')
app.use('/css', express.static('css'))
app.listen(PORT, () => {
  console.log(`Web server started and running at http://localhost:${PORT}`)
  process.stdout.write('Stop to shutdown the server: ')
})


let data = '';

process.stdin.on('readable', () => {
  let chunk;
  while ((chunk = process.stdin.read()) !== null) {
    data += chunk;
  }

  let command = data.trim();
  if (command === 'stop') {
    console.log('Shutting down server');
    process.exit(0);
  } else {
    console.log('Invalid command. Please enter "stop" to shutdown the server.');
  }

  data = ''; // Reset the data variable after processing each command
});

process.stdin.on('end', () => {
  process.stdout.resume();
});

process.stdin.on('error', (err) => {
  console.error('Error reading input:', err);
  process.exit(1);
});

app.get('/', (request, response) => {
  response.render('index.ejs')
})
app.get('/persepolis', (request, response) => {
  response.render('persepolis')
})
app.get('/spiderman', (request, response) => {
  response.render('spiderman')
})
app.get('/introduction', (request, response) => {
  response.render('introduction')
})
app.get('/babel', (request, response) => {
  response.render('babel')
})
app.get('/mountainsMayDepart', (request, response) => {
  response.render('mountainsMayDepart')
})
app.get('/whiteTiger', (request, response) => {
  response.render('whiteTiger')
})
app.get('/compLiterature', (request, response) => {
  response.render('compLiterature')
})
app.get('/outcome', (request, response) => {
  response.render('outcome')
})
const images = ['part1.PNG', 'part2.PNG', 'part3.PNG', 'part4.PNG'];

// Store the current index
let currentIndex = 0;

// Define the route for the next button click
app.get('/next', (req, res) => {
  // Increment the current index
  currentIndex = (currentIndex + 1) % images.length;
  res.sendStatus(200);
});
