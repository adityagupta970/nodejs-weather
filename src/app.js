const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')



console.log(__dirname)
console.log(path.join(__dirname,'../public'))

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

const app = express() //returns the entire app and methods can be used to modiify

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//setting up endpoints

app.get('', (req,res) => {
    res.render('index', {

        title: 'Weather',
        name: 'Aditya Gupta'

    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        title:'Help',
        message: 'This is the Help page',
        name: 'Aditya Gupta'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title:'About Me',
        name: 'Aditya Gupta'
    })
})

app.get('/weather',(req,res) => {

    if(!req.query.address) {
        return res.send({
            error:'Please enter the address'
        })
    }
    const address = req.query.address

    geocode(address, (error,{latitude,longitude,location} = {}) => {
        if(error) {
            return res.send({error})
        }
    
        forecast(latitude,longitude,(error,{summary,temperature,precipProbability}={}) => {
            if(error) {
                return res.send({error})
            }
            
            res.send({
                location,
                address,
                forecast: summary+" It is currently "+temperature+" degrees out. There is a "+(precipProbability*100)+"% chance of rain."
            })
            
            
        })
          
    })

})

app.get('/products', (req,res) => {

    if (!req.query.search) {
        return res.send({
            error:"You must provide a search term"
        })
    }
    

    console.log(req.query.search)

    res.send({
        products:[]
    })
    

    
})

app.get('/help/*', (req,res) => {
    res.render('error', {
        title:'404 ERROR',
        message:'Help article not found',
        name:'Aditya Gupta'
    })
})

app.get('*', (req,res) => {
    res.render('error', {
        title:'404 ERROR',
        message:'Page not found',
        name:'Aditya Gupta'
    })
})

app.listen(3000, () => {
    console.log("Server serving on port 3000")
})