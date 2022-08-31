if(element.classList.contains('.remove-details')){
    var button = document.querySelector(".remove-details");
}


if(button){
    buttonChecked = button
}

dbuttonChecked.addEventListener('click', function(event){
    event.preventDefault();
    console.log('button pressed')
})