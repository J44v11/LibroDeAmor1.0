// script.js
let currentPageIndex = 1;
const totalPages = 9;

// Obtenemos la referencia al elemento de audio
const audio = document.getElementById('musicaFondo');

// Función para intentar iniciar la reproducción (se llama en cada clic)
function playMusic() {
    // Intentamos quitar el silencio y reproducir
    if (audio.muted) {
        audio.muted = false;
    }
    audio.play().catch(error => {
        console.log("Autoplay bloqueado. El usuario debe interactuar de nuevo.", error);
    });
}

// Función para ir a la página siguiente
function nextPage() {
    playMusic(); 
    
    // Lógica especial para el primer clic (de Portada a Página 2)
    if (currentPageIndex === 1) {
        
        // 1. Oculta la portada y le aplica la animación de giro
        const coverPage = document.getElementById('page1');
        if (coverPage) {
            coverPage.classList.remove('active'); 
            coverPage.classList.add('flipped'); // <-- Gira la portada
        }
        
        currentPageIndex = 2; 
        
        // 2. Muestra la página 2
        const nextFront = document.getElementById(`page${currentPageIndex}`);
        
        if (!nextFront) {
             console.error("ERROR CRÍTICO: No se encuentra el elemento con ID: page2. Revisa el HTML.");
             return; 
        }

        nextFront.classList.add('active'); 
        return; 
    }
    
    // Lógica para el resto de las transiciones (página 2 -> 3, 3 -> 4, etc.)
    if (currentPageIndex < totalPages) {
        // 1. Ocultar/Girar la página actual
        const currentFront = document.getElementById(`page${currentPageIndex}`);
        if (currentFront) {
            currentFront.classList.remove('active');
            currentFront.classList.add('flipped');
        }
        
        currentPageIndex++;

        // 2. Mostrar la nueva página
        const nextFront = document.getElementById(`page${currentPageIndex}`);
        if (nextFront) {
            nextFront.classList.add('active');
        }
    }
}

// Función para ir a la página anterior
function prevPage() {
    // Si ya estamos en la página 2, volver a la portada (1)
    if (currentPageIndex === 2) {
        // 1. Oculta la página 2
        const currentFront = document.getElementById(`page${currentPageIndex}`);
        if (currentFront) {
             currentFront.classList.remove('active');
        }
        // 2. Des-gira la página 1 y la activa
        const coverPage = document.getElementById('page1');
        if (coverPage) {
             coverPage.classList.remove('flipped'); // <--- Deshace el giro
             coverPage.classList.add('active');    // <--- Muestra la portada
        }
        currentPageIndex = 1;
        resetMusic(); 
        return;
    }
    
    // Lógica para el resto de las transiciones
    if (currentPageIndex > 1) {
        
        // 1. Ocultar la página actual
        const currentFront = document.getElementById(`page${currentPageIndex}`);
        if (currentFront) {
            currentFront.classList.remove('active');
        }
        
        currentPageIndex--;

        // 2. Mostrar la página anterior des-girándola
        const prevFront = document.getElementById(`page${currentPageIndex}`);
        if (prevFront) {
            prevFront.classList.remove('flipped');
            prevFront.classList.add('active');
        }
    }
}

// Función para reiniciar el libro a la portada (página 1)
function resetBook() {
    // 1. Quitar todas las clases de todas las páginas
    for (let i = 1; i <= totalPages; i++) {
        const page = document.getElementById(`page${i}`);
        if (page) {
            page.classList.remove('active');
            page.classList.remove('flipped');
        }
    }

    // 2. Activar SOLO la portada (page1)
    const coverPage = document.getElementById('page1');
    if (coverPage) {
        coverPage.classList.add('active'); 
    }
    
    currentPageIndex = 1;
    resetMusic();
}