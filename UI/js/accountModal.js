
const firstModal = document.getElementById('firstModal');
const secondModal = document.getElementById('secondModal');
const thirdModal = document.getElementById('thirdModal');

const closeOne = document.getElementById('closeOne').addEventListener('click', ()=>{
    firstModal.style.display = "none";
});

const closeTwo = document.getElementById('closeTwo').addEventListener('click', ()=>{
    secondModal.style.display = "none"; 
});

const closeThree = document.getElementById('closeThree').addEventListener('click', ()=>{
    thirdModal.style.display = "none";
});

