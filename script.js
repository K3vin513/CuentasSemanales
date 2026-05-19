 var dia = "";
 var mes = "";
 var newMes = "";
 var first = "";
 var oldFirst = "";
 var type= "";
 var typeFruit = "";
 var value = "";
 var numFilas = 0;
 var total = 0;
 var discountedTotal = 0; 
 var negativeTest = "false";
 let register = JSON.parse(
        localStorage.getItem("registryFiles")
    ) || [];
 let registerSaved = JSON.parse(
        localStorage.getItem("filesSaved")
    ) || [];
var resultFinal = 0;

function setType(result, type) {

  if(type == "Tijera"){
      total = result * 1;
      return total;
  }

  if(type == "Mano"){
      total = result * 0.90;
      return total;
  }
  if(type == "Selección"){
      total = result * 1.15;
      return total;
  }

}

function setQuantity(value, fruit) {

    const ficAlViv = 238.41;
    const descTra = 67.40;


    if(fruit == "Man.Base"){

       if(value >= 39 && value <= 55 ){
          result = (value * 22.27) + ficAlViv + descTra;
         return result;
       }
       else if(value < 39){
            result = 809.82 + ficAlViv + descTra;
            return result;
       }
       else {
           const sum = value - 55;
           console.log(sum);
           result = (sum * 33.4) + (55 * 22.27) + ficAlViv + descTra;
           return result;
       }
    }


    if (fruit == "Nar.Base"){
       if(value <= 55){
          result = (value * 16.70) + ficAlViv + descTra;
         return result;
       }
       else {
           const sum = value - 55;
           result = (sum * 25.05) + (55 * 16.70) + ficAlViv + descTra;
           return result;
       }
    }
}

function extraHoursValue(initialResult){

   const extraHours = Number(document.getElementById("hours").value);
    const extraHoursValue = extraHours * 220.38;

    console.log("Valor de horas extra: " + extraHours);

    discountedTotal = initialResult + extraHoursValue;
    return discountedTotal;
}

function discounts(result){

    firstDiscount = result * 0.85;
    secondDiscount = firstDiscount * 0.97;
    result = secondDiscount * 0.99;
    return result;

}
function callResult(){

    testNegative();

    typeFruit = document.getElementById("fruit").value;
    value = document.getElementById("quantity").value;
    type = document.getElementById("type").value;

if(negativeTest == "true"){
    alert("No hace falta calcular un resultado");
    return;
}
else{
   if (value === "" || value < 0) {
    alert("Ingrese un número válido para la cantidad.");
    return;
   }
    const result = setQuantity(value, typeFruit);
    total = setType(result, type);
    console.log(result);
    console.log(type);

    discountedTotal = discounts(total);
    console.log(discountedTotal);

    const resetQuantity = document.getElementById("quantity");
    resetQuantity.value = "";
   
    const showResult = document.getElementById("showResult");
    showResult.textContent = "Resultado: $" + total.toFixed(2);
    return { typeFruit, result, total, type, discountedTotal };
  }
}



function makeMonth(date){
    
    const [year, month, day] = date.split("-");

    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                   "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    mes = meses[parseInt(month) - 1];

    if(mes == undefined){
        mes = "";
    }

    var titleDate = document.getElementById("titleDate");
    var titleDateContent = titleDate.textContent;
    console.log("Mes: " + mes);

      if (mes != "" ){
      // Actualizar el título con el mes
      titleDate.textContent = mes;
      newMes = mes;
      console.log(dia);
      console.log(first);
     }
     else if (mes != newMes && mes != ""){ 
        
        titleDateContent = newMes + "-" + mes;
          console.log(mes);      
     }
    localStorage.setItem("mes", mes);
}
function makeDay(date){

    const dateObj = new Date(date);

    const days = [ "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

    dia = days[dateObj.getDay()];

    return dia;
}
function makeNumberDay(date){

    const [year, month, day] = date.split("-");

    first = day;
    return day;
}


    
function deleteActions(){
    
    const deleteTable = document.getElementById("deleteTable");
    const renoir = document.getElementById("father");
    const action = deleteTable.value;
    const showSaved = document.getElementById("showSaved");


    // Si se selecciona "eliminarTodo" se selecciona la tabla, se vacía junto con el titulo de esta y se eliminan todas las listas.
    if(action === "eliminarTodo"){
        console.log("Pur la vie");
        renoir.style.backgroundColor = "CadetBlue";

        const table = document.getElementById("tableFirst");
        table.style.display = "none";
        numFilas = 0;

        var titleDate = document.getElementById("titleDate");
        titleDate.textContent = "";
        mes = "";
        newMes = "";
        first = "";
        oldFirst = "";
        register = [];
        localStorage.removeItem("registryFiles");
        localStorage.removeItem("mes");


        resultFinal = 0;
            const pasteResult = document.getElementById("finalResult");
            pasteResult.textContent = " ";
            localStorage.removeItem("resultFinal");

        const tableBody = document.getElementById("tBody");
        while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.firstChild);
        }
    }

    // Si se selecciona "eliminarFila" se verifica si el numero de filas es mayor a uno y si lo es se elimina la última fila, si es
    // igual a uno entonces se selecciona la tabla, se vacía junto con el título y se elimina la fila.
    if(action === "eliminarFila"){
        console.log("Pleurer en couleurs");
        renoir.style.backgroundColor = "BlanchedAlmond";

        const table = document.getElementById("tBody");
        if(numFilas > 1){
            table.deleteRow(-1);
            numFilas--;
            console.log("Se elimina la última fila");
            oldFirst--;
            register.pop();
            result = 0;
            
            resultFinal = resultFinal - discountedTotal;
            const pasteResult = document.getElementById("finalResult");
            pasteResult.textContent = "Total: $" + Math.ceil(resultFinal);
            localStorage.removeItem("resultFinal");

            localStorage.setItem("first", first);
            localStorage.setItem("oldFirst", oldFirst);
            localStorage.setItem("registryFiles", JSON.stringify(register));
            console.log(resultFinal);
        }
        else{

             const table = document.getElementById("tableFirst");
        table.style.display = "none";
        numFilas = 0;

        var titleDate = document.getElementById("titleDate");
        titleDate.textContent = "";
        mes = "";
        newMes = "";
        first = "";
        oldFirst = "";
        register = [];
        localStorage.removeItem("registryFiles");
        localStorage.removeItem("mes");

        resultFinal = 0;
            const pasteResult = document.getElementById("finalResult");
            pasteResult.textContent = " ";
            localStorage.removeItem("resultFinal");

        const tableBody = document.getElementById("tBody");
        while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.firstChild);
        }
        }
    }
    // Al seleccionar "guardarFila" se muestra un mensaje de guardado y se guarda en el siguiente div

    if(action == "guardarFila"){
        console.log("Saving file...");
        saveTable();

        console.log("Pur la vie");
        renoir.style.backgroundColor = "CadetBlue";

        const table = document.getElementById("tableFirst");
        table.style.display = "none";
        numFilas = 0;

        var titleDate = document.getElementById("titleDate");
        titleDate.textContent = "";
        mes = "";
        newMes = "";
        first = "";
        oldFirst = "";
        register = [];
        localStorage.removeItem("registryFiles");

        resultFinal = 0;
            const pasteResult = document.getElementById("finalResult");
            pasteResult.textContent = " ";
            localStorage.removeItem("resultFinal");
            
        const tableBody = document.getElementById("tBody");
        while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.firstChild);
        }
    
    }
    deleteTable.selectedIndex = 0;

}


//Al cumplires la condición de que se ha agregado una fila a la tabla, se crea un botón para eliminar la tabla o eliminar la última fila, el cual se muestra al lado del título de la tabla. Este botón se crea una sola vez y se muestra cada vez que se agrega una fila a la tabla, siempre y cuando no haya filas en la tabla. Si el número de filas es mayor a cero entonces el botón se muestra, si el número de filas es igual a cero entonces el botón se oculta.
function deleteButton(){
 
    if (document.getElementById("deleteTable")) {
        return;
    }
    console.log("Creating delete button...");
    const deleteTable = document.createElement("select");
     deleteTable.id = "deleteTable";
     deleteTable.className = "fontSize";
     deleteTable.addEventListener("change", deleteActions);

     deleteTable.innerHTML =  `
                                <option value="" disabled selected hidden>...</option>
                                <option value="eliminarTodo">Eliminar Tabla</option>
                                <option value="eliminarFila">Eliminar Ultima Fila</option>
                                <option value="guardarFila">Guardar Tabla</option>
                              `; 

    var child = document.getElementById("titleDate");
    child.appendChild(deleteTable);
    //Cambiar fondo del div
    var background = document.getElementById("father1");
    background.style.backgroundColor = "#F0F8FF";
}

function testNegative(){
    negativeTest = document.getElementById("fruit").value;
}

function getNegative(){
 
    var date = document.getElementById("date").value;
    var resetDate = document.getElementById("date");
    const selectFruit = document.getElementById("fruit");

    negativeTest = document.getElementById("fruit").value;
    console.log(negativeTest);
    
    console.log("Negative test is Forgiveness");

    if( date != "" && numFilas == 0){
     const deleteTable = document.createElement("select");
     deleteTable.id = "deleteTable";
     deleteTable.className = "fontSize";
     deleteTable.addEventListener("change", deleteActions);

     deleteTable.innerHTML =  `
                                  <option value="" disabled selected hidden>...</option>
                                  <option value="eliminarTodo">Eliminar Tabla</option>
                                  <option value="eliminarFila">Eliminar Ultima Fila</option>
                                  <option value="guardarFila">Guardar Tabla</option>

                             `; 

     var child = document.getElementById("titleDate");
     child.appendChild(deleteTable);
   }

    const condition = Math.abs(first - oldFirst) == 1 &&
                      first > oldFirst || 
                      oldFirst == "";

    const condition1 = Math.abs(first - oldFirst) > 1 &&
                       oldFirst != "" 
                       || first < oldFirst;

    if(date != "" && numFilas <= 5 && condition){

        const tableNegative = document.createElement("tr");
         tableNegative.innerHTML = `
                               <tbody>
                                <th> ${dia} ${first} </th>
                                <td> Negativo </td>
                                <td> - </td>
                                <td> - </td>
                                <td> $- </td>
                                <td> $- </td>
                                </tbody>
                              `;
                            
          var table = document.getElementById("tBody");
          var showTable = document.getElementById("tableFirst");
          showTable.style.display = "table";
          table.appendChild(tableNegative);

          var background = document.getElementById("father1");
          background.style.backgroundColor = "#F0F8FF";

          oldFirst = first; 
          localStorage.setItem("first", first);
          localStorage.setItem("oldFirst", oldFirst);
          resetDate.value = "";
          console.log(oldFirst);
          numFilas++;
          deleteButton();

        saveArrays();
        console.log("Daydreaming all the time");
        console.log(negativeTest);
        console.log(date.value);
    }

    else if(condition1){
        alert("Las fechas no son consecutivas");
    }

    else if (numFilas > 5){
        alert("No se pueden agrergar más filas a la tabla");
        first = "";
        oldFirst = "";
    }
    
   else if (date == ""){
    alert("Ingrese una fecha para guardar el día");
    console.log("Moving on");
   }
    selectFruit.selectedIndex = 0;
  }

  function saveArrays(){

    const extraHours = Number(document.getElementById("hours").value);


    if(negativeTest == "true"){
        register.push ({
            fecha : dia + " " + first,
            type : "Negativo",
            typeFruit : "-",
            value : "-",
            total : "-",
            discountedTotal : "-"
        });
        localStorage.setItem("registryFiles", JSON.stringify(register));
        return;
        }
            
    if(extraHours > 0){
        register.push (
        {
          fecha : dia + " " + first,
          type : type,
          typeFruit : typeFruit,
          value : value,
          total : Math.ceil(total),
          discountedTotal : Math.ceil(discountedTotal) + "*"
        }
    );
    localStorage.setItem("first", first);
    localStorage.setItem("oldFirst", oldFirst);
    localStorage.setItem("registryFiles", JSON.stringify(register));
    localStorage.setItem("totalSavedWeek", resultFinal );
    return
    }
    register.push (
        {
          fecha : dia + " " + first,
          type : type,
          typeFruit : typeFruit,
          value : value,
          total : Math.ceil(total),
          discountedTotal : Math.ceil(discountedTotal)
        }
    );
    
    
    localStorage.setItem("first", first);
    localStorage.setItem("oldFirst", oldFirst);
    localStorage.setItem("registryFiles", JSON.stringify(register));
    localStorage.setItem("totalSavedWeek", resultFinal );
 }


  function getTable(){

    const fila = document.createElement("tr");
    const extraHours = Number(document.getElementById("hours").value);

      fila.innerHTML = `
       <th></th>
       <td></td>
       <td></td>
       <td></td>
       <td></td>
       <td></td>
     `;

    var table = document.getElementById("tBody");
    var showTable = document.getElementById("tableFirst");
    showTable.style.display = "table";
    table.appendChild(fila);
    numFilas++;

    var resetDate = document.getElementById("date");
    resetDate.value = "";
    const showResult = document.getElementById("showResult");
    showResult.textContent = "";

    // Seleccionar los elementos de la tabla por su ID para actualizar su contenido
    const celdas = fila.children;

    extraHoursValue(discountedTotal);


    //Rellenar las celdas con los datos correspondientes.
    
        celdas[0].textContent = dia + " " + first;
        celdas[1].textContent = type;
        celdas[2].textContent = typeFruit;
        celdas[3].textContent = value;
        celdas[4].textContent = "$" + Math.ceil(total);
        celdas[5].textContent = "$" + Math.ceil(discountedTotal);

    if(extraHours > 0){
        celdas[5].textContent = "$" + Math.ceil(discountedTotal) + "*";
    }

    oldFirst = first;    
    deleteButton();
    saveArrays();
    total = 0;
    value = "";
    console.log("Array guardado: " + JSON.stringify(register));
  }

  function getDomingo(){

    const fila = document.createElement("tr");
    const extraHours = Number(document.getElementById("hours").value);

      fila.innerHTML = `
       <th></th>
       <td></td>
       <td></td>
       <td></td>
       <td></td>
       <td></td>
     `;

    var table = document.getElementById("tBody");
    var showTable = document.getElementById("tableFirst");
    showTable.style.display = "table";
    table.appendChild(fila);
    numFilas++;

    var resetDate = document.getElementById("date");
    resetDate.value = "";
    const showResult = document.getElementById("showResult");
    showResult.textContent = "";

    // Seleccionar los elementos de la tabla por su ID para actualizar su contenido
    const celdas = fila.children;

    extraHoursValue(discountedTotal);

    total = total * 2;
    discountedTotal = discountedTotal * 2;

    //Rellenar las celdas con los datos correspondientes.
    
        celdas[0].textContent = dia + " " + first;
        celdas[1].textContent = type;
        celdas[2].textContent = typeFruit;
        celdas[3].textContent = value;
        celdas[4].textContent = "$" + Math.ceil(total );
        celdas[5].textContent = "$" + Math.ceil(discountedTotal);

    if(extraHours > 0){
        celdas[5].textContent = "$" + Math.ceil(discountedTotal) + "*";
    }


    deleteButton();
    saveArrays();
    total = 0;
    value = "";
    console.log("Array guardado: " + JSON.stringify(register));
  }

  function finalResult(afterDiscount){

    console.log("asi queda antes de la suma " + resultFinal);
    resultFinal = resultFinal + afterDiscount;
    const pasteResult = document.getElementById("finalResult");
    

    console.log("Asi queda luego del reinicio " + afterDiscount);
    console.log("Result final: " + resultFinal);
    pasteResult.textContent = "Total: $" + Math.ceil(resultFinal);
    total = 0;


    localStorage.setItem("resultFinal", resultFinal);
    return resultFinal;
  }

function makeWeek(){

    // Obtener el valor del input de fecha y los datos del mes y día
    var date = document.getElementById("date").value;
    const selectExtraHoras = document.getElementById("hours");
    makeDay(date);
    makeNumberDay(date);
    testNegative();

    const condition1 = value != "" 
                       && dia != undefined 
                       && mes != undefined 
                       && numFilas <= 5;
    const condition = Math.abs(first - oldFirst) == 1 
                      && first > oldFirst  
                      || oldFirst =="";



 if(value != "" || negativeTest == "true"){
    makeMonth(date);
}

if(negativeTest == "true"){
    getNegative();
    selectExtraHoras.selectedIndex = 0;
}

else{
    
 if(condition1){

   console.log("first condition");
   console.log(first);
   console.log(oldFirst);

  // Condicion para crear la tabla, agregar filas a la tabla y crear el botón para eliminar la tabla o eliminar la última fila. La condición se cumple si el número de filas es menor o igual a 5, se ha ingresado un valor para calcular el resultado, se ha seleccionado una fecha y las fechas son consecutivas o no hay fechas anteriores. Si se cumplen estas condiciones entonces se crea la tabla, se agregan filas a la tabla y se crea el botón para eliminar la tabla o eliminar la última fila. Si el número de filas es mayor a 5 entonces se muestra una alerta indicando que no se pueden agregar más filas a la tabla. Si no se ha ingresado un valor para calcular el resultado o no se ha seleccionado una fecha entonces se muestra una alerta indicando que se debe ingresar un valor para calcular el resultado y seleccionar una fecha antes de guardarlo en la tabla. 
  if(condition){
    // Crear la fila y agregarla a la tabla
    getTable();
    finalResult(discountedTotal);
    selectExtraHoras.selectedIndex = 0;
  }
  else if(Math.abs(first - oldFirst) > 1 && oldFirst != "" || first < oldFirst){
    alert("Las fechas no son consecutivas");
        deleteButton();

  }
  else if(oldFirst == first){
    alert("Las fechas no son consecutivas");
        deleteButton();

  }
  console.log(numFilas);

}
  else if(value == "" || dia == undefined || mes == undefined){
    alert("Ingrese una cantidad para calcular el resultado y seleccione una fecha antes de guardarlo en la tabla.");
  }
  else if(numFilas > 5){
    if (dia == "Dom"){
        getDomingo();
    }
    else{
    alert("No se pueden agregar más filas a la tabla");
        deleteButton();
    }
  }
 }
} 
