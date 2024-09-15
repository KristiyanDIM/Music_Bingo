let usedCells = []; // Списък за следене на използвани клетки
let currentAudio = null;

function playRandomSong() {
    const cells = document.querySelectorAll('.cell');
    let availableCells = Array.from(cells).filter(cell => !usedCells.includes(cell)); // Филтриране на използвани клетки

    if (availableCells.length === 0) {
        alert('Всички клетки са използвани!');
        return;
    }

    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const selectedCell = availableCells[randomIndex];
    const songId = selectedCell.getAttribute('data-song');
    const audio = document.getElementById(songId);

    if (audio) {
        if (currentAudio) {
            currentAudio.pause();
        }
        audio.currentTime = 0;
        audio.play();
        currentAudio = audio;

        // Премахване на "cell-enlarged" клас от предишния enlarged cell
        const existingEnlarged = document.querySelector('.cell-enlarged');
        if (existingEnlarged) {
            existingEnlarged.remove();
        }

        // Добавяне на "used" клас на избраната клетка и добавяне в списъка с използвани клетки
        selectedCell.classList.add('used');
        usedCells.push(selectedCell);

        // Създаване на нов елемент за увеличената клетка
        const enlargedCell = selectedCell.cloneNode(true);
        enlargedCell.classList.add('cell-enlarged');
        document.body.appendChild(enlargedCell);

        // Добавяне на клас show за анимация
        requestAnimationFrame(() => {
            enlargedCell.classList.add('show');
        });

        // Премахване на увеличената клетка след спиране на песента
        setTimeout(() => {
            if (audio === currentAudio) {
                audio.pause();
                audio.currentTime = 0;
                enlargedCell.remove(); // Премахване на увеличения елемент след спиране на песента
            }
        }, 10000); // 10 секунди
    } else {
        console.error(`Audio element with id ${songId} not found.`);
    }
}

document.querySelector('.btn').addEventListener('click', playRandomSong);
