//definicion de variables
let url = 'http://localhost:3000/api/empleado/'
const contenedor = document.querySelector('tbody')
let resultados = ''

const modalEmpleados = new bootstrap.Modal(document.getElementById('modalEmpleados'))
const formEmpleados = document.querySelector("form")
const nombre = document.getElementById('nombre')
const posicion = document.getElementById('posicion')
const email = document.getElementById('email')
const descripcion = document.getElementById('descripcion')

let opcion = ''

btnCrear.addEventListener('click', () => {
    modalEmpleados.show()
    nombre.value = ''
    posicion.value = ''
    email.value = ''
    descripcion.value = ''
    opcion = 'crear'
})

//funcion para mostrar resultados
const mostrar = (data) => {
    data.forEach(e => {
        resultados += ` <tr>
                        <td>${e.id}</td>
                        <td>${e.nombre}</td>
                        <td>${e.posicion}</td>
                        <td>${e.email}</td>
                        <td>${e.descripcion}</td>
                        <td class = "text-center"> <a class="btnEditar btn btn-primary">Editar</a> <a class="btnBorrar btn btn-danger">Borrar</a></td>
                    </tr>
    
                `



    })
    contenedor.innerHTML = resultados


}

//Procedimiento mostrar
fetch(url)
    .then(res => res.json())
    .then(data => mostrar(data))
    .catch(err => console.log(err));


const on = (element, event, selector, handler) => {
    console.log(element)
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }

    })
}



// procedimiento borrar
on(document, 'click', '.btnBorrar', e => {
    console.log("asdasd")  //borrar    
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    alertify.confirm("¿Estas seguro que quieres borar?",
        function () {
            fetch(url + id, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(() => location.reload())
            //alertify.success('Ok');
        },
        function () {
            alertify.error('Cancel');
        });
})


//procedimiento editar
on(document, "click", ".btnEditar", (e) => {
   
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    const nombreForm = fila.children[1].innerHTML
    const posicionForm = fila.children[2].innerHTML
    const emailForm = fila.children[3].innerHTML
    const descripcionForm = fila.children[4].innerHTML
    // console.log(`${idForm} ${nombreForm} ${posicionForm} ${emailForm} ${descripcionForm}`)
    nombre.value = nombreForm
    posicion.value = posicionForm
    email.value = emailForm
    descripcion.value = descripcionForm
    opcion = "editar"
    modalEmpleados.show()
})

//procedimiento crear y editar
formEmpleados.addEventListener("submit", (e) => {
    e.preventDefault()
    if (opcion == "crear") {
        //console.log("opcion crear")
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre.value,
                posicion: posicion.value,
                email: email.value,
                descripcion: descripcion.value
            })
        })
            .then(response => response.json())
            .then(data => {
                const nuevoEmpleado = []
                nuevoEmpleado.push(data)
                mostrar(nuevoEmpleado)
            })
    }
    if (opcion == "editar") {
        console.log("opcion editar")
        fetch(url+idForm,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre.value,
                posicion: posicion.value,
                email: email.value,
                descripcion: descripcion.value
            })
        })
        .then(response => response.json())
        .then(response => location.reload())
    }
    modalEmpleados.hide()
    
})
