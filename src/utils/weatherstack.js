const request=require('request')
const forecast=(latitude,longitude,callback)=>
{
    const url='http://api.weatherstack.com/current?access_key=c3deda83328f748bc12fc5800417c186&query='+latitude+','+longitude
    request({url,json:true},(error,{body}={})=>
    {
    if(error)
        {
            callback('unable to connect to internet',undefined)
        }
    else
    {
        //callback(undefined,body.current.weather_descriptions[0] +' it is currently '+ body.current.temperature + ' in '+ body.location.name + ' and feel like '+ body.current.feelslike)
        callback(undefined, body)
    }
    })
}
module.exports=forecast