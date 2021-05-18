document.getElementsByClassName("nav-options")[2].style="background-color: rgb(253, 75, 75);color: white;border-color:transparent;";
function dropdownDisplay(id){
    if(id.style.display!="flex"){
        id.style.display="flex";
    }
    else{
        id.style.display="none";
    }

}
