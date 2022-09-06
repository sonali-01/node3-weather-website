const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=834c4d052b0cc010409b3772493d462d&query=${latitude},${longitude}&units=f`
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('Failed to connect to Weather api',undefined)
        }else if(body.error){
            callback('Passed improper query',undefined)
        }else{
            const currentData=body.current
            callback(undefined,`It is currently ${currentData.temperature} degrees in ${body.location.country}. It feels like ${currentData.feelslike} degree out`)
        }
    })
}

module.exports=forecast