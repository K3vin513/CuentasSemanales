let allTables = JSON.parse(localStorage.getItem("allTablesSaved")) || [];

window.onload = function() {

    const select = document.getElementById("selectTable");
    select.addEventListener("change", showTable);

    const mesGuardado = localStorage.getItem("mes");
    if (mesGuardado) {
        document.getElementById("titleDate").innerHTML = mesGuardado;
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

    recreateDiscounts();
    recreateTableSelect();
}

function recreateDiscounts(){

    const matrimonio = localStorage.getItem("matrimonio");
    const concubinato = localStorage.getItem("concubinato");
    const manutención = localStorage.getItem("manutención");
    const descuentoHijos = localStorage.getItem("descuentoHijos");

    const selectHijos = document.getElementById("descuentoHijos");
    selectHijos.value = descuentoHijos;

    const selectMatrimonio = document.getElementById("matrimonio");
    selectMatrimonio.value = matrimonio;

    const selectConcubinato = document.getElementById("concubinato");
    selectConcubinato.value = concubinato;

    const selectManutención = document.getElementById("manutencion");
    selectManutención.value = manutención;
}

function reloadFinalResult(){

    const pasteResult = document.getElementById("finalResult");
    
    pasteResult.textContent = "Total: $" + Math.ceil(resultFinal);

  }

function reloadFinalResultWeek(index){

    const pasteResult = document.getElementById("totalWeek");
    const selectedTable = allTables[index];
    let totalSemana = 0;


    selectedTable.tabla.forEach(item => {

        totalSemana += parseFloat(
            item.discountedTotal
        ) || 0;
    });

    if(totalSemana > 9420 ){
        totalSemana = discountsFinal(totalSemana);
    }

    pasteResult.textContent = "Total: $" + Math.ceil(totalSemana);

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
    const semanaAnteriorCopia = localStorage.getItem("semanaActual") || 0;
    localStorage.setItem("semanaAnterior", semanaAnteriorCopia);
    localStorage.removeItem("semanaActual");
    console.log(localStorage.getItem("semanaAnterior"));
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
    reloadFinalResultWeek(index)

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

        deleteButtonWeekSaved()

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
        console.log("Table recreated with " + register.length + " rows.");
    }
    numFilas = register.length;
    var showTable = document.getElementById("tableFirst");
    if(numFilas > 0){
    showTable.style.display = "table";
       }
    console.log(numFilas);
}

function deleteButtonWeekSaved(){

    if(document.getElementById("deleteTableSaved")){
        return;
    }
 
    console.log("Creating delete button...");
    const deleteTable = document.createElement("select");
     deleteTable.id = "deleteTableSaved";
     deleteTable.className = "fontSize";
     deleteTable.addEventListener("change", deleteTableSaved);

     deleteTable.innerHTML =  `
                                <option value="initialSelect" disabled selected hidden>...</option>
                                <option value="eliminarSemana">Eliminar Tabla</option>
                                `;

    var child = document.getElementById("titleSaved");
    child.appendChild(deleteTable);
    //Cambiar fondo del div
}

function deleteTableSaved(){

 const select = document.getElementById("selectTable");
 const selectDelete = document.getElementById("deleteTableSaved");
 const selectIndex = select.value;
 const verification = confirm("¿Está seguro de que quiere eliminar esta tabla?");

 if (!verification) {
    selectDelete.selectedIndex = "initialSelect";
    return;
 }

 allTables.splice(selectIndex, 1);

 localStorage.setItem(
                      "allTablesSaved",
                       JSON.stringify(allTables)
                    );

  clearTable();

  document.getElementById("tableSaved").style.display = "none";

  recreateTableSelect();

  const finalResult = document.getElementById("totalWeek");
    finalResult.textContent = "";

    selectDelete.selectedIndex = "initialSelect";
 
}

function Presentismo(){

    const semanaAnterior = parseFloat(localStorage.getItem("semanaAnterior")) || 0;
    const semanaActual = parseFloat(localStorage.getItem("semanaActual")) || 0;

}
