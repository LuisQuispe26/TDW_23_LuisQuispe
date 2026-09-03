document.addEventListener("DOMContentLoaded", () => {

    // Obtener los elementos del carrusel
    const slides = document.querySelectorAll(".slide");
    const indicadores = document.querySelectorAll(".indicador");

    const btnAnterior = document.getElementById("btnAnterior");
    const btnSiguiente = document.getElementById("btnSiguiente");
    const btnPausar = document.getElementById("btnPausar");

    const iconoPausa = document.getElementById("iconoPausa");
    const textoPausa = document.getElementById("textoPausa");

    const barraProgreso = document.getElementById("barraProgreso");


    // Verificar que existan imágenes
    if (slides.length === 0) {
        console.error("No se encontraron slides.");
        return;
    }


    // Variables
    let indiceActual = 0;
    let reproduciendo = true;

    const tiempoCambio = 5000;

    let intervalo;


    // Mostrar una imagen
    function mostrarSlide(indice) {

        // Corregir índices fuera del rango
        if (indice >= slides.length) {
            indiceActual = 0;
        } else if (indice < 0) {
            indiceActual = slides.length - 1;
        } else {
            indiceActual = indice;
        }


        // Ocultar todos los slides
        slides.forEach((slide) => {
            slide.classList.remove("activo");
        });


        // Desactivar indicadores
        indicadores.forEach((indicador) => {
            indicador.classList.remove("activo");
        });


        // Mostrar slide actual
        if (slides[indiceActual]) {
            slides[indiceActual].classList.add("activo");
        }


        // Activar indicador actual
        if (indicadores[indiceActual]) {
            indicadores[indiceActual].classList.add("activo");
        }


        // Reiniciar barra de progreso
        reiniciarProgreso();
    }


    // Imagen siguiente
    function siguienteSlide() {

        mostrarSlide(indiceActual + 1);

    }


    // Imagen anterior
    function anteriorSlide() {

        mostrarSlide(indiceActual - 1);

    }


    // Iniciar reproducción automática
    function iniciarCarrusel() {

        clearInterval(intervalo);

        intervalo = setInterval(() => {

            siguienteSlide();

        }, tiempoCambio);

    }


    // Detener reproducción automática
    function detenerCarrusel() {

        clearInterval(intervalo);

    }


    // Barra de progreso
    function reiniciarProgreso() {

        if (!barraProgreso) {
            return;
        }


        barraProgreso.style.transition = "none";
        barraProgreso.style.width = "0%";


        setTimeout(() => {

            if (reproduciendo) {

                barraProgreso.style.transition =
                    `width ${tiempoCambio}ms linear`;

                barraProgreso.style.width = "100%";

            }

        }, 50);

    }


    // Botón siguiente
    if (btnSiguiente) {

        btnSiguiente.addEventListener("click", () => {

            siguienteSlide();

            if (reproduciendo) {
                iniciarCarrusel();
            }

        });

    }


    // Botón anterior
    if (btnAnterior) {

        btnAnterior.addEventListener("click", () => {

            anteriorSlide();

            if (reproduciendo) {
                iniciarCarrusel();
            }

        });

    }


    // Indicadores
    indicadores.forEach((indicador) => {

        indicador.addEventListener("click", () => {

            const indice =
                Number(indicador.dataset.slide);

            mostrarSlide(indice);

            if (reproduciendo) {
                iniciarCarrusel();
            }

        });

    });


    // Pausar y continuar
    if (btnPausar) {

        btnPausar.addEventListener("click", () => {

            if (reproduciendo) {

                detenerCarrusel();

                reproduciendo = false;

                if (iconoPausa) {
                    iconoPausa.textContent = "▶";
                }

                if (textoPausa) {
                    textoPausa.textContent = "Continuar";
                }

                if (barraProgreso) {
                    barraProgreso.style.transition = "none";
                }

            } else {

                reproduciendo = true;

                iniciarCarrusel();

                reiniciarProgreso();

                if (iconoPausa) {
                    iconoPausa.textContent = "❚❚";
                }

                if (textoPausa) {
                    textoPausa.textContent = "Pausar";
                }

            }

        });

    }


    // Control con teclado
    document.addEventListener("keydown", (evento) => {

        if (evento.key === "ArrowRight") {

            siguienteSlide();

            if (reproduciendo) {
                iniciarCarrusel();
            }

        }


        if (evento.key === "ArrowLeft") {

            anteriorSlide();

            if (reproduciendo) {
                iniciarCarrusel();
            }

        }

    });


    // Iniciar carrusel
    mostrarSlide(0);

    iniciarCarrusel();

});