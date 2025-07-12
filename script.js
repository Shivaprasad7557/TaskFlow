
let taskadder = document.querySelector('.task-adder')
let addbtn = document.querySelector('.add-btn')
let addbtnflag = false
let taskname = document.querySelector('#task-name')
let mainCont = document.querySelector('.main-cont')
let priorityBoxes = document.querySelectorAll('.priority')
let selectedPriority = document.querySelector('.selected')
let filterPriorityColor = document.querySelectorAll('.color')
let removebtn = document.querySelector('.remove-btn')
let priorityColor = 'black'
let lock = 'fa-lock'
let unlock = 'fa-lock-open'
let dontremove = 'fa-trash'
let remove = 'fa-xmark'
let ticketColors = ['red','green','blue','black']


addbtn.addEventListener('click',()=>{
    addbtnflag = !addbtnflag
    if(addbtnflag === true){
        taskadder.style.display = 'flex'
    }
    else{
        taskadder.style.display = 'none'
    }
})

// ticket creater

taskadder.addEventListener('keydown',(event)=>{
    if(event.key === 'Enter'){
        let task = taskname.value
        let ticketID = shortid()
        createTask(task , ticketID, priorityColor)
        taskname.value = ''
        taskadder.style.display = 'none'

        priorityBoxes.forEach((box)=>{
            box.classList.remove('selected')
        })
    }
})

// ticket details

function createTask(task , ticketID, ticketColor){
    
    let ticket = document.createElement('div')
    ticket.setAttribute("class","ticket")
    ticket.innerHTML = `
    <div class="priority-label" style="background-color: ${ticketColor};" ></div>
            <div class="ticket-id">${ticketID}</div>
            <div class="edit">
            <div class="ticket-task" contenteditable="false" >${task}</div>
           <div class="ticket-lock ">
                <i class="fa-solid fa-lock"></i>
            </div>
            </div>
    `
    mainCont.appendChild(ticket)

    handleLock(ticket)

    colorChange(ticket)

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

// locking mechanism

function handleLock(ticket){

    let ticketLock = ticket.querySelector('.ticket-lock')
    let ticketLockIcon = ticketLock.children[0]
    let ticketTask = ticket.querySelector('.ticket-task')

   ticketLockIcon.addEventListener('click',()=>{
         
    if(ticketLockIcon.classList.contains(lock)){
        ticketLockIcon.classList.remove(lock)
        ticketLockIcon.classList.add(unlock)
        ticketTask.setAttribute('contenteditable','true')
    }
    else{
        ticketLockIcon.classList.remove(unlock)
        ticketLockIcon.classList.add(lock)
        ticketTask.setAttribute('contenteditable','false')
    }

   })   
   
}

// priority color toggle

function colorChange(ticket){
     
     let priorityLabel = ticket.querySelector('.priority-label');

     let i = 0;

     priorityLabel.addEventListener('click',()=>{
          if(i == ticketColors.length){
            i = 0
          }
          priorityLabel.style.backgroundColor = ticketColors[i]
          i++
     })
     }

     // filter tickets by priority colors

filterPriorityColor.forEach((color)=>{

    color.addEventListener('click',()=>{
         
        let selectedColor = color.classList[0]

        console.log(selectedColor)

        let allTickets = mainCont.querySelectorAll('.ticket')

        allTickets.forEach((EachTicket)=>{
              
             let prioritylabel = EachTicket.querySelector('.priority-label')
             if(prioritylabel.style.backgroundColor === selectedColor){
                EachTicket.style.display = 'flex'
             }
             else{
                EachTicket.style.display = 'none'
             }
        })
    })

})

// delete tickets feature
let toggle = false

removebtn.addEventListener('click',()=>{

    if(removebtn.children[0].classList.contains(remove)){
        removebtn.children[0].classList.remove(remove)
        removebtn.children[0].classList.add(dontremove)
        toggle = false
    }
    else{
        removebtn.children[0].classList.remove(dontremove)
        removebtn.children[0].classList.add(remove)
        toggle = true
    }})
    
    mainCont.addEventListener('click', (event) => {

        const clickedTicket = event.target.closest('.ticket');
    
        if (toggle && clickedTicket) {
            console.log("Ticket clicked in remove mode, removing:", clickedTicket);
            clickedTicket.remove(); 
        }
    });

