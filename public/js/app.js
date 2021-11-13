console.log('client side js')
const form_data=document.querySelector('form')
const input_data=document.querySelector('input')
const message=document.querySelector('#msg1')
const message_2=document.querySelector('#msg2')

form_data.addEventListener('submit',(e)=>
{ e.preventDefault();
  fetch('http://localhost:3000/weather?address='+input_data.value).then((response)=>
    {
    response.json().then((data)=>
            
        {
            if(data.error)
            {
                message.textContent='nothing'
            }
            else
            {
                message.textContent=data.current_weather
                message_2.textContent=data.location
            }
             

        })
    })  
})