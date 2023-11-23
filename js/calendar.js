function separarFechaHora(entrada) {
    var partes = entrada.split(" ");
    var dia = partes[0];
    var mes = partes[2];
    var año = partes[4];
    var hora = partes[5];

    return {
        mes: mes,
        dia: dia,
        año: año,
        hora: hora,
    };
}
class Calendar {
    constructor(id) {
        // La clase Calendar tiene un constructor que recibe un parámetro 'id' para identificar el elemento HTML del calendario.
        // Inicializa las propiedades de la clase.
        this.cells = []; // Almacena las celdas del calendario.
        this.selectedDate = null; // Almacena la fecha seleccionada actualmente.
        this.currentMonth = moment(); // Almacena el mes actual utilizando la librería Moment.js.
        this.elCalendar = document.getElementById(id); // Obtiene el elemento del calendario a través del ID.
        this.showTemplate(); // Llama al método showTemplate para mostrar la estructura HTML del calendario.
        this.elGridBody = this.elCalendar.querySelector(".grid__body"); // Obtiene el elemento del cuerpo de la cuadrícula del calendario.
        this.elMonthName = this.elCalendar.querySelector(".month-name"); // Obtiene el elemento que muestra el nombre del mes en el calendario.
        this.showCells(); // Llama al método showCells para mostrar las celdas del calendario.
    }

    showTemplate() {
        // El método showTemplate se encarga de mostrar la estructura HTML del calendario en el elemento del calendario.
        this.elCalendar.innerHTML = this.getTemplate(); // Asigna la plantilla HTML al contenido del elemento del calendario.
        this.addEventListenerToControls(); // Agrega el evento click a los controles del calendario.
    }

    getTemplate() {
        // El método getTemplate devuelve una cadena que representa la estructura HTML del calendario.
        let template = `
            <!-- Estructura HTML del calendario -->
            
            <div class="calendar__header">
                <button id="btnEventLeft" type="button" class="control control--prev">&lt;</button>
                <span class="month-name">dic 2019</span>
                <button id="btnEventRight" type="button" class="control control--next">&gt;</button>
            </div>
            <div class="calendar__body">
                <div class="grid">
                    <div class="grid__header">
                        <span class="grid__cell grid__cell--gh">Lun</span>
                        <span class="grid__cell grid__cell--gh">Mar</span>
                        <span class="grid__cell grid__cell--gh">Mié</span>
                        <span class="grid__cell grid__cell--gh">Jue</span>
                        <span class="grid__cell grid__cell--gh">Vie</span>
                        <span class="grid__cell grid__cell--gh">Sáb</span>
                        <span class="grid__cell grid__cell--gh">Dom</span>
                    </div>
                    <div class="grid__body">

                    </div>
                </div>
            </div>
        
        `;
        return template;
    }

    addEventListenerToControls() {
        // El método addEventListenerToControls agrega eventos de clic a los controles (botones prev y next) del calendario.
        let elControls = this.elCalendar.querySelectorAll(".control"); // Obtiene los elementos de los controles.
        elControls.forEach((elControl) => {
            elControl.addEventListener("click", (e) => {
                // Agrega un evento de clic a cada control.
                let elTarget = e.target;
                if (elTarget.classList.contains("control--next")) {
                    // Si se hace clic en el botón "next", llama al método changeMonth con el valor "true".
                    this.changeMonth(true);
                } else {
                    // Si se hace clic en el botón "prev", llama al método changeMonth con el valor "false".
                    this.changeMonth(false);
                }
                this.showCells(); // Muestra las celdas actualizadas después de cambiar el mes.
            });
        });
    }

    changeMonth(next = true) {
        // El método changeMonth actualiza el mes actual según la dirección especificada (siguiente o anterior).
        if (next) {
            this.currentMonth.add(1, "months"); // Aumenta el mes actual en 1 utilizando Moment.js.
        } else {
            this.currentMonth.subtract(1, "months"); // Reduce el mes actual en 1 utilizando Moment.js.
        }
    }

    showCells() {
        // El método showCells muestra las celdas del calendario en el cuerpo de la cuadrícula.
        this.cells = this.generateDates(this.currentMonth); // Genera las fechas del mes actual y las almacena en la propiedad 'cells'.
        if (this.cells === null) {
            // Si no se pueden generar las fechas del calendario, muestra un mensaje de error y sale del método.
            console.error("No fue posible generar las fechas del calendario.");
            return;
        }

        this.elGridBody.innerHTML = ""; // Limpia el contenido actual del cuerpo de la cuadrícula del calendario.
        let templateCells = ""; // Variable para almacenar la plantilla de las celdas del calendario.
        let disabledClass = ""; // Variable para almacenar la clase de estilo para celdas deshabilitadas.
        let variabledia = JSON.parse(localStorage.getItem("fechasinbd"));

        //var resultado = separarFechaHora(variabledia);
        // console.log(variabledia);
        for (let i = 0; i < this.cells.length; i++) {
            disabledClass = "";

            variabledia.forEach((e) => {
                let res = separarFechaHora(e.fecha);
                if (!this.cells[i].isInCurrentMonth) {
                    // Si la fecha no está en el mes actual, agrega la clase 'grid__cell--disabled' para deshabilitar la celda.
                    disabledClass = "grid__cell--disabled";
                }

                // Verifica si la fecha coincide con la variable  y asigna un color personalizado.
                if (
                    this.cells[i].date.date() == res.dia &&
                    this.currentMonth.format("MMMM") == res.mes
                ) {
                    disabledClass = "grid__cell--selected";

                    //let gb=separarFechaHora(fechasbd);
                }
            });

            // Crea la plantilla HTML para cada celda del calendario.
            templateCells += `
                <!-- Estructura HTML de una celda del calendario -->
                
                <span class="grid__cell grid__cell--gd ${disabledClass}" data-cell-id="${i}">
                    ${this.cells[i].date.date()}
                </span>
            
            `;
        }

        this.elMonthName.innerHTML = this.currentMonth.format("MMM YYYY"); // Actualiza el nombre del mes en el calendario.
        this.elGridBody.innerHTML = templateCells; // Agrega las celdas generadas al cuerpo de la cuadrícula del calendario.

        // Guardar una variable en el almacenamiento local
        localStorage.setItem("mesActual", this.currentMonth.format("MMMM"));

        this.addEventListenerToCells(); // Agrega eventos de clic a las celdas del calendario.
    }

    generateDates(monthToShow = moment()) {
        // El método generateDates genera las fechas del mes especificado utilizando Moment.js.
        if (!moment.isMoment(monthToShow)) {
            return null;
        }
        let dateStart = moment(monthToShow).startOf("month"); // Obtiene la fecha de inicio del mes.
        let dateEnd = moment(monthToShow).endOf("month"); // Obtiene la fecha de fin del mes.
        let cells = []; // Almacena las fechas generadas del mes.

        // Encuentra la primera fecha que se mostrará en el calendario retrocediendo hasta llegar a un lunes.
        while (dateStart.day() !== 1) {
            dateStart.subtract(1, "days");
        }

        // Encuentra la última fecha que se mostrará en el calendario avanzando hasta llegar a un domingo.
        while (dateEnd.day() !== 0) {
            dateEnd.add(1, "days");
        }

        // Genera las fechas del calendario y las agrega a la matriz 'cells'.
        do {
            cells.push({
                date: moment(dateStart),
                isInCurrentMonth: dateStart.month() === monthToShow.month(),
            });
            dateStart.add(1, "days");
        } while (dateStart.isSameOrBefore(dateEnd));

        return cells;
    }

    addEventListenerToCells() {
        // El método addEventListenerToCells agrega eventos de clic a las celdas del calendario.
        let elCells = this.elCalendar.querySelectorAll(".grid__cell--gd"); // Obtiene las celdas del calendario.
        elCells.forEach((elCell) => {
            elCell.addEventListener("click", (e) => {
                let elTarget = e.target;
                if (
                    elTarget.classList.contains("grid__cell--disabled") ||
                    elTarget.classList.contains("grid__cell--selected")
                ) {
                    // Si la celda está deshabilitada o ya está seleccionada, no se realiza ninguna acción.
                    return;
                }
                // Deselecciona la celda anterior.
                let selectedCell = this.elGridBody.querySelector(
                    ".grid__cell--selected"
                );
                if (selectedCell) {
                    selectedCell.classList.remove("grid__cell--selected");
                }
                // Selecciona la nueva celda.
                elTarget.classList.add("grid__cell--selected");
                this.selectedDate = this.cells[parseInt(elTarget.dataset.cellId)].date; // Actualiza la fecha seleccionada.
                // Dispara el evento 'change'.
                this.elCalendar.dispatchEvent(new Event("change"));
            });
        });
    }

    getElement() {
        // El método getElement devuelve el elemento HTML del calendario.
        return this.elCalendar;
    }

    value() {
        // El método value devuelve la fecha seleccionada actualmente.
        return this.selectedDate;
    }
}
