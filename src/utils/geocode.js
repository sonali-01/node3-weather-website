const request=require('request')

const geocode=(address,callback)=>{
    const url=`http://api.positionstack.com/v1/forward?access_key=9ae0c49e8a0e2a12ea3cfd4612f8bf5c&query=${address}`
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('Failed to connect to geocoding api')
        }else if(body.data===undefined){
            callback('Unable to find location .Try another search!')
        }else{
            callback(undefined,{
                latitude:body.data[0].latitude,
                longitude:body.data[0].longitude,
                country:body.data[0].country
            })
        }
    })
}

module.exports=geocode