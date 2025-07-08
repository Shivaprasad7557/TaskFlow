
let taskadder = document.querySelector('.task-adder')
let addbtn = document.querySelector('.add-btn')
let addbtnflag = false
let taskname = document.querySelector('#task-name')
let mainCont = document.querySelector('.main-cont')
let priorityBoxes = document.querySelectorAll('.priority')
let selectedPriority = document.querySelector('.selected')
let priorityColor = 'white'

addbtn.addEventListener('click',()=>{
    addbtnflag = !addbtnflag
    if(addbtnflag === false){
        taskadder.style.display = 'flex'
    }
    else{
        taskadder.style.display = 'none'
    }
})
taskadder.addEventListener('keydown',(event)=>{
    if(event.key === 'Enter'){
        let task = taskname.value
        let ticketID = shortid()
        createTask(task , ticketID, priorityColor)
        taskname.value = ''
        taskadder.style.display = 'none'
    }
})

function createTask(task , ticketID, ticketColor){
    
    let ticket = document.createElement('div')
    ticket.setAttribute("class","ticket")
    ticket.innerHTML = `
    <div class="priority-label" style="background-color: ${ticketColor};" ></div>
            <div class="ticket-id">${ticketID}</div>
            <div class="edit">
            <div class="ticket-task">${task}</div>
           <div class="ticket-lock">
                <i class="fa-solid fa-lock"></i>
            </div>
            </div>
    `
    mainCont.appendChild(ticket)
}

priorityBoxes.forEach((box)=>{
  box.addEventListener('click',()=>{
       priorityBoxes.forEach((box)=>{
           box.classList.remove('selected')
       })
       box.classList.add('selected')
       priorityColor = box.classList[1]
  })
})
