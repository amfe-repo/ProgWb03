import { ApiConnect } from "./ApiConnect.js";

let btn_send = document.getElementById("btn-send");
let input = document.querySelectorAll("input");

let apiConection = new ApiConnect("http://www.raydelto.org/agenda.php", 
{ nombre: "", apellido: "", telefono: ""});

async function insertDataList()
{

    let list = document.getElementById("list");
    let counter = 0; 
    const myData = await apiConection.getInfoGet();

    myData.forEach(element => 
    {
        let li = document.createElement("li");
        let h3 = document.createElement("h3");
        let p = document.createElement("p");
        h3.appendChild(document.createTextNode(`[${counter}]: ${element.nombre} ${element.apellido}`));
        p.appendChild(document.createTextNode(`${element.telefono}`));
        li.appendChild(h3);
        li.appendChild(p);
        list.appendChild(li);
        counter++;
    });
            
}

async function postData(name, last_name, phone)
{
    let response = await apiConection.putInfoPost(
        {
            nombre: name, apellido: last_name, telefono: phone}
        );
    
    if(response != null)
        if(response.exito == true)
            alert(`Se inserto correctamente:
            ${response.nombre}
            ${response.apellido}
            ${response.telefono}
            `);
    window.location.reload();
}


//Events
window.onload = function()
{
    insertDataList();
}

btn_send.addEventListener("click", ()=>
{
    postData(input[0].value, input[1].value, input[2].value);
    return false; 
});