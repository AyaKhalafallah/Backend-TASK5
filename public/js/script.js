let form=document.getElementById("form1")
const errorf = document.getElementById("error")
const locationf = document.getElementById("location")
const forecastf = document.getElementById("forecast")
const longtitudef = document.getElementById("longtitude")
const latitudef = document.getElementById("latitude")





form.addEventListener("submit",(e)=>
{
    e.preventDefault()
    weatherFunction()
    form.reset()
    console.log("xs")})



    let weatherFunction = async() =>{
        try{
            const address = document.getElementById('address').value
            const res = await fetch('http://localhost:3000/weather?address='+address)
            const data = await res.JSON()
            console.log(data)
            if(data.error){
                errorf.innerText = data.error
                locationf.innerText = ""
                latitudef.innerText = ""
                longtitudef.innerText = ""
                forecastf.innerText = ""
                
            }
            else{
                locationf.innerText = data.location
                setTimeout(() => {
                    latitudef.innerText = data.latitude
                    longtitudef.innerText = data.longtitude  
                }, 500);
                
                setTimeout(() => {
                    forecastf.innerText = data.forecast
                }, 1000);
               
                
                errorf.innerText = ""
            }
        }
        catch(e){
            console.log(e)
        }
    }

    

