import { getAllFechas, saveFecha, separarFechaHora } from './firebase.js';
var mesActual =localStorage.getItem('mesActual');
/**function saveFechaSelect() {
    calendar.getElement().addEventListener('change', e => {
        var resultado = calendar.value().format('LLL');
        localStorage.setItem("fechaSeleccionada", resultado);
    });
}*/

const mostrarFechaMes = async (mes) => {
    const contentFechas = document.getElementById("fechas-contenedor");
    const querySnapshot = await getAllFechas();
    let template = "";

    querySnapshot.forEach(element => {
        let resultado = separarFechaHora(element.fecha);

        if (mes.trim().toLowerCase() === resultado.mes.trim().toLowerCase()) {
            template += `<li class="list-group-item d-flex justify-content-between align-items-start"
                style="background-color: #212529;">
                <div class="ms-2 me-auto" style="color: blanchedalmond; background-color: #212529;">
                    <div class="fw-bold">${element.fecha}</div>
                </div>
                <span class="badge rounded-pill" style="background-color: #FBA007;">${resultado.dia}</span>
            </li>`;
        }
    });

    contentFechas.innerHTML = template;
   
}

window.addEventListener("DOMContentLoaded", async () => {
    //saveFechaSelect();
    let mesActual = localStorage.getItem('mesActual');
    mostrarFechaMes(mesActual);
});

window.addEventListener('storage', async(event) => {
    
    contentFechas.innerHTML = "";
    if (event.key === 'mesActual') {
        console.log('Se ha cambiado el mes');
        let mes = event.newValue;
        console.log(mes)
        mostrarFechaMes(mes);
        while(true){
            console.log(localStorage.getItem('mesActual'));
        }
    }
});
