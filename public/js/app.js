console.log('Client side javascript file is loaded!')

const weatherForm=document.querySelector('form')
const inputElement=document.querySelector('input')
const messageOne=document.querySelector('#Message-1')
const messageTwo=document.querySelector('#Message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const location=inputElement.value
    messageOne.textContent='Loading.....'
    messageTwo.textContent=''
    fetch(`/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log("error:",data.error)
                messageOne.textContent=data.error
            }else{
                messageOne.textContent=data.forecast
                messageTwo.textContent=data.address
                
            }
        })
    })

})