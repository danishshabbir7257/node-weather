const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const weatherstack=require('./utils/weatherstack')
const publicdirectory=path.join(__dirname, '../public')
const app=express()
const viewpath=path.join(__dirname, '../templates/views')
const partials=path.join(__dirname, '../templates/partials')
app.use(express.static(publicdirectory))
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partials)
app.get('',(req,res)=>{
    res.render('index',{home:'This is Home page',Age:24})
})
app.get('/about',(req,res)=>{
    res.render('about',{about:'this is about page'})
})
app.get('/contact',(req,res)=>{
    res.render('contact',{contact:'this is contact page'})
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    return res.send({Error:'You must provide an address'})
    geocode(req.query.address,(error,{latitude,longitude}={})=>{
        if(error)
        {
           return res.send("cannot find the location")
        }
        else
        {
            weatherstack(latitude,longitude,(error,response)=>{
                if(error)
                {
                   return res.send("Eror in weather stack")
                }
                else
                {
                     return res.send(
                     {
                        current_weather:response.current.weather_descriptions[0] +' it is currently '+ response.current.temperature + ' in '+ response.location.name + ' and feel like '+ response.current.feelslike,
                        location: response.location.name
                     })
                }
            })
        }
    })
})
// app.get('/we',(req,res)=>{
   
// })
app.get('*',(req,res)=>{
  res.render('404',{error:'Page not found'})  
})


app.listen(3000,()=>{
    console.log('listening at port 3000')
})