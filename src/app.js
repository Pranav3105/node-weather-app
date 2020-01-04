const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const static = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, '../templates/partials')
const app = express()
const port = process.env.PORT || 3000
app.use(express.static(static))

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application',
        name: 'Pranav'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'You are in the help section',
        name: 'Pranav'

    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Pranav'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error: 'location missing'
        })
    }
    geocode(address, (error,{lat,long,place}={})=>{
        if(error){
            console.log('Inside error')
            return res.send({error})
        }
        forecast(lat,long,(error,{summary,temperature,precipitation}={})=>{
            if(error){
                return res.send({error})
            }
            res.send({
                place,
                summary,
                temperature,
                precipitation
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        message: 'Requested help article not found!',
        name: 'Pranav'
    })
})
app.get('*', (req, res) => {
    res.render('error', {
        message: 'Page Not Found!',
        name: 'Pranav'
    })
})
app.listen(port, () => {
    console.log('Server is up on port port')
})
