const socket = io();

var output = document.getElementById('message');
var alertOutPut = document.getElementById('alertChat');

var state = document.getElementById('notMessage');
var message = document.getElementById('chatMessage');
var chatUser = document.getElementById('chatUser');
var chatBtn = document.getElementById('chatBtn');


chatBtn.addEventListener('click',() => {
    
    // console.log(`message : ${message.value} `);
    // console.log(`User : ${chatUser.value} `);
    socket.emit('chat:message',{
        message: message.value,
        chatUser : chatUser.value   
    });
});

message.addEventListener('keypress',() => {
    if(chatUser !== ''){
        socket.emit('chat:typing',chatUser.value);
    }
});

socket.on('chat:message',(data) => {

    if(chatUser !== '' && message !== ''){

        state.classList.add("hidden");
        output.innerHTML += `
            <div class="flex mt-5 items-center bg-white leading-none text-purple-600 rounded-full p-2 shadow text-sm">
                <span class="inline-flex bg-purple-600 text-white rounded-full h-6 px-3 justify-center items-center text-">${data.chatUser}</span>
                <span class="inline-flex px-2">${data.message}</span>
            </div>
        `;
        message.value = '';
        chatUser.value = '';
        alertOutPut.innerHTML = '';
    }
    // console.log(data);
});

socket.on('chat:typing',(data) => {
   alertOutPut.innerHTML = `
        <div class="bg-teal-100 border border-teal-400 text-teal-700 px-4 py-3 rounded relative" role="alert">
           <strong class="font-bold">${data}</strong>
           <span class="block sm:inline">is typeing.</span>
        </div>
   `; 
});