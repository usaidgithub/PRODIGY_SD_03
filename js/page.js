let form1=document.getElementsByClassName('main form')[0]
let button1=document.getElementById('button1')
let form2=document.getElementsByClassName('main1 form')[0]
let button2=document.getElementById('button2')
let form3=document.getElementsByClassName('main3 form')[0]
let button3=document.getElementById('button3')
let form4=document.getElementsByClassName('main4 form')[0]
let button4=document.getElementById('button4')
button1.addEventListener('click',(e)=>{
    form1.style.display="block"
    e.preventDefault()
});
document.addEventListener('click',(e)=>{
    if (!form1.contains(e.target) && e.target !== button1) {
        form1.style.display="none"
    }
})
button2.addEventListener('click',(e)=>{
    form2.style.display="block"
    e.preventDefault()
})
document.addEventListener('click',(e)=>{
    if (!form2.contains(e.target) && e.target !== button2) {
        form2.style.display="none"
    }
})
button3.addEventListener('click',(e)=>{
    form3.style.display="block"
    e.preventDefault()
})
document.addEventListener('click',(e)=>{
    if (!form3.contains(e.target) && e.target !== button3) {
        form3.style.display="none"
    }
})
button4.addEventListener('click',(e)=>{
    form4.style.display="block"
    e.preventDefault()
});
document.addEventListener('click',(e)=>{
    if (!form4.contains(e.target) && e.target !== button4) {
        form4.style.display="none"
    }
})