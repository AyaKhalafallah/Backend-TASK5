const express=require("express")
const app=express()
const geocode = require('./data/geocode')
const forecast = require('./data/forecaste')
const port=process.env.PORT || 3000
//

const path = require("path")
const x = path.join(__dirname, "../public")
app.use(express.static(x))


const hbs=require("hbs")
const partialspath = path.join(__dirname,"../temp1/partials")
 hbs.registerPartials(partialspath)

 app.set('view engine', 'hbs');
const viewsDirectory = path.join(__dirname, "../temp1/views")
app.set("views", viewsDirectory)
console.log("Please enter the country")

app.get("/",(req,res)=>
{res.render("index",{
    title:"welcome to our website",
})})
app.get("/weather",(res,req)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide address'
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({error})
        }
        forecast(data.latitude,data.longtitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location:req.query.address,
                latitude: data.latitude,
                longtitude:data.longtitude,
            })
        })
    })





}

)







app.set("view engine","hbs")



app.get('*' , (req , res)=> {
    res.send('404 Page Not Founded')
 })

app.listen(port,()=>{
console.log(port)})