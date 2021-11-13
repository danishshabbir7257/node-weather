const request=require('request')
const geocode=(address,callback)=>
{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiZGFuaXNoNzI1NyIsImEiOiJja3ZnaHFkcjYzbmFlMzNvazN2cm54amNhIn0.92L0emy0nx12hIYxPbDh9Q'
    request({url,json:true},(error,{body}={})=>
    {
        if(error)
        {
            callback('unable to connect to internet',undefined)
        }
        else if(body.features.length===0)
        {
            callback('unable to fetch this location',undefined)
        }
        else
        {
        const longitude =body.features[0].center[0]
        const latitude =body.features[0].center[1]
        const location=body.features[0].place_name
        const data =
         {
            latitude,
            longitude,
            location
         }
    callback(undefined,data)

        }
    })
}
// geocode('karachi',(error,data)=>{
// console.log(error,data)
// })
module.exports = geocode