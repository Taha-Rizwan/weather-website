//requiring stuff
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

//Defining path. -_-
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setting up handelbars. ;)
app.set('view engine', 'hbs')
app.set('views' , viewsPath )
hbs.registerPartials(partialsPath)

//Setting static directory
app.use(express.static(publicDirectoryPath))



app.get('', (req,res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Taha Rizwan'
  })
})
app.get('/about', (req,res) => {
  res.render('about', {
    title: 'About me',
    name: 'Taha Rizwan'
  })
})

app.get('/help', (req,res) => {
  res.render('help', {
    msg: 'Want some help?',
    title: 'Help',
    name: 'Taha Rizwan'
  })
})

app.get('/weather',(req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!'
    })
  }
    geoCode(req.query.address, (error, { latitude, longitude, location}= {}) =>{ 
      if (error) {
      return res.send({error})
    }
      forecast(latitude,longitude, (error, forecastData) => {
        if (error) {
           return res.send({error})
        }

        res.send({
          forecast:forecastData,
          location,
          address: req.query.address
        })
      })
  })
})
   

app.get('/help/*',(req,res) => {
  res.render('help-404', {
    title: 404,
    name: 'Taha Rizwan',
    error: 'Help article not found'
  })
})

app.get('*',(req,res) => {
  res.render('404', {
    title: 404,
    name: 'Taha Rizwan',
    error: 'Page not found'
  })
})


//Starting up server
app.listen(port, () => {
  console.log('Server is up on port ' + port)
})