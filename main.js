var guardar=document.getElementById("guardar")
var modalEditar=document.getElementById("exampleModal")
var alumnos=new Array();

var nombre=document.getElementById("nom")
var paterno=document.getElementById("paterno")
var materno=document.getElementById("materno")
var grupo=document.getElementById("gru")
var carrera=document.getElementById("ca")

guardar.onclick=()=>{
    var nombre=document.getElementById("nom").value
    var paterno=document.getElementById("paterno").value
    var materno=document.getElementById("materno").value
    var grupo=document.getElementById("gru").value
    var carrera=document.getElementById("ca").value
    
    if(nombre.trim()==""||paterno.trim()==""||materno.trim()==""){
        Swal.fire({
            title:"Alumnos",
            text: "Falta llenar campos",
            icon:"error"
        })
        return
    }
    var alumno={nombre,paterno,materno,grupo,carrera}
    alumnos.push(alumno)
    localStorage.setItem("Alumnos",JSON.stringify(alumnos))
    imprimirTabla()
    limpiarForm()
}

const imprimirTabla=()=>{
    var a=JSON.parse(localStorage.getItem("Alumnos")==null)?[]:JSON.parse(localStorage.getItem("Alumnos"))

    let table=`<table class="table w-50 m-auto">
    <tr>
    <td>Nombre:</td>
    <td>Apellido parteno:</td>
    <td>Apellido materno:</td>
    <td>Grupo:</td>
    <td>Carrera:</td>
    <td>Editar</td>
    <td>Del</td>
    </tr>`;

    let index=0
    a.forEach(alum => {
        table+=`
        <tr>
    <td>${alum.nombre}</td>
    <td>${alum.paterno}</td>
    <td>${alum.materno}</td>
    <td>${alum.grupo}</td>
    <td>${alum.carrera}</td>
    <td><button type="button" class="btn btn-outline-primary" onclick="cargarAlumno(${index})" data-bs-toggle="modal" data-bs-target="#exampleModal">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
</svg>
  </button></td>

    <td> <button type="button" class="btn btn-outline-danger" onclick="eliminar(${index})">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
</svg>
  </button></td>
    </tr>
    `
    
    index++
    });
    document.getElementById("tabla").innerHTML=table
}
const limpiarForm=()=>{
    document.getElementById("nom").value=""
    document.getElementById("paterno").value=""
    document.getElementById("materno").value=""
    document.getElementById("gru").selectedIndex=0
    document.getElementById("ca").selectedIndex=0
}

const eliminar=(index)=>{
    Swal.fire({
        title: "Quieres eliminarlo?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Si",
        denyButtonText: `No`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Se borro", "", "success");
          alumnos.splice(index,1)
          localStorage.setItem("Alumnos",JSON.stringify(alumnos))
          imprimirTabla()
        } else if (result.isDenied) {
          Swal.fire("Se cancelo", "", "error");
        }
      });
}

var indiceAlumno;
const cargarAlumno=(index)=>{
    indiceAlumno=index
    var alumnos=JSON.parse(localStorage.getItem("Alumnos"))
    var alumno=alumnos[index]
    
    document.getElementById("nomb").value=alumno.nombre
    document.getElementById("p").value=alumno.paterno
    document.getElementById("m").value=alumno.materno
    document.getElementById("grup").value=alumno.grupo
    document.getElementById("carrer").value=alumno.carrera
}

const editar=()=>{
    var alumnos=JSON.parse(localStorage.getItem("Alumnos"))
    var alumno=alumnos|[indiceAlumno]

    alumno.nombre = document.getElementById("nomb").value
    alumno.paterno = document.getElementById("p").value
    alumno.materno = document.getElementById("m").value
    alumno.grupo = document.getElementById("grup").value
    alumno.carrera = document.getElementById("carrer").value
    
    localStorage.setItem("Alumnos", JSON.stringify(alumnos))
    imprimirTabla()
}



imprimirTabla()