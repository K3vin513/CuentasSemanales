let allTables = JSON.parse(localStorage.getItem("allTablesSaved")) || [];

window.onload = function() {

    const select = document.getElementById("selectTable");
    select.addEventListener("change", showTable);

    const mesGuardado = localStorage.getItem("mes");
    if (mesGuardado) {
        document.getElementById("titleDate").innerHTML = mesGuardado;
    }

    const delButton = localStorage.getItem("deleteButton");

    if (delButton === "true") {
        console.log("Delete button is true");
        console.log(delButton);
        deleteButton();
    } 

    recreateTable();
    if(numFilas > 0){
    first = localStorage.getItem("first");
    oldFirst = localStorage.getItem("oldFirst");
    
    console.log("Luego de crear tabla: ", register);
    console.log(numFilas);
    console.log(first);
    console.log(oldFirst);

    resultFinal = parseFloat(
                             localStorage.getItem("resultFinal")
                            ) || 0;
    reloadFinalResult();
    }


    recreateTableSelect();
}

function reloadFinalResult(){

    const pasteResult = document.getElementById("finalResult");
    
    pasteResult.textContent = "Total: $" + Math.ceil(resultFinal);

  }

function saveTable(){

    allTables.push({
        nombre : localStorage.getItem("mes") + "(" + register[0].fecha + "/" + register[register.length - 1].fecha + ")",
        mes : localStorage.getItem("mes"),
        tabla : [...register]
    })
    console.log(register[0].fecha);
    makeTableSelect();
    register = [];
    localStorage.setItem("register", JSON.stringify(register)); 
    localStorage.removeItem("mes");
    localStorage.removeItem("first");
    localStorage.removeItem("oldFirst");
    localStorage.setItem("deleteButton", "false");
    localStorage.setItem("allTablesSaved", JSON.stringify(allTables));
}

function makeTableSelect(){

    const select = document.getElementById("selectTable");
    
    const lastIndex = allTables.length - 1;

    const lastTable = allTables[lastIndex]; 

    const option = document.createElement("option");

    option.value = lastIndex;
    option.textContent = lastTable.nombre;

    select.appendChild(option);
}

function recreateTableSelect(){

    const select = document.getElementById("selectTable");

    // Limpiar opciones anteriores
    select.innerHTML = `
        <option value="" disabled selected hidden>
            Seleccionar tabla
        </option>
    `;

    allTables.forEach((table, index) => {

        const option = document.createElement("option");

        option.value = index;
        option.textContent = table.nombre;

        select.appendChild(option);
    });
}


function clearTable(){

    var titleDate = document.getElementById("titleSaved");
        titleDate.textContent = "";

    const tableBody = document.getElementById("tBodySaved");

    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
}

function showTable(event) {

    const selectedIndex = event.target.value;
    recreateSavedTable(selectedIndex);
}

function recreateWeekSaved(){

       localStorage.setItem("allTablesSaved", JSON.stringify(allTables));
       allTables = JSON.parse(localStorage.getItem("allTablesSaved")) || [];
       makeTableSelect();
}   

function recreateSavedTable(index){

    clearTable();

    const savedTable = allTables[index];

    const titleDate = document.getElementById("titleSaved");
    var aline = document.getElementById("father2");

    console.log(savedTable);
    titleDate.innerHTML = savedTable.mes;
    
    const tableBody = document.getElementById("tBodySaved");

    savedTable.tabla.forEach(function(item) {
        
        const fila = document.createElement("tr");

        fila.innerHTML = `
        <th>${item.fecha}</th>
        <td>${item.type}</td>
        <td>${item.typeFruit}</td>
        <td>${item.value}</td>
        <td>$${item.total}</td>
        <td>$${item.discountedTotal}</td>
        `;  

    tableBody.appendChild(fila);

    });

    document.getElementById("tableSaved")
        .style.display = "table";
    aline.style.backgroundColor = "#dbedfc";
}

function recreateTable(){

    const tableBody = document.getElementById("tBody");
    console.log("Recreating table...");

    register.forEach(function(item) {
        
        const fila = document.createElement("tr");

        fila.innerHTML = `
        <th>${item.fecha}</th>
        <td>${item.type}</td>
        <td>${item.typeFruit}</td>
        <td>${item.value}</td>
        <td>$${item.total}</td>
        <td>$${item.discountedTotal}</td>
        `;

        tableBody.appendChild(fila);
    });
    if(register.length > 0){
        deleteButton();
    }
    numFilas = register.length;
    var showTable = document.getElementById("tableFirst");
    if(numFilas > 0){
    showTable.style.display = "table";
       }
    console.log(numFilas);
    }
