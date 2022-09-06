const path=require('path')
const express=require('express') 
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')


const app=express();

//Define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath =path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location for setting express config
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Jimin Park'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Jimin Park'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helperText:'This is some helful text.',
        title:'Help',
        name:'Jimin Park'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:"You must provide an address"})
    }
    geocode(req.query.address,(error,{latitude,longitude,country}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error
                }) 
            }
            res.send({
                address:req.query.address,
                forecast:forecastData,
                country
            })
        })
    })
    
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({error:"You must provide a search term"})
    }
    res.send({
        product:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Jimin Park',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Jimin Park',
        errorMessage:'Page not found'
    })
})

app.listen(3000,()=>{
    console.log("Server is up on port 3000")
})


// app.get('',(req,res)=>{
//     res.send('<h1>Hello express!!!</h1>')
// })

// app.get('/help',(req,res)=>{
//     res.send('Help Page')
// })

// app.get('/about',(req,res)=>{
//     res.send(`<div>
//         <h4 style=color:purple;font-size:24px>About Page</h4>
//     </div>`)
// })