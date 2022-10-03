const frame = document.querySelector('.sketch-container')
const btnSizes = document.querySelectorAll('.btn-sizes')
const btnColors = document.querySelectorAll('.btn-color')
let color = 'red'
let draw = false;


console.log(btnSizes[0].id);

function createTable (nrBlocks = 16 * 16, dimension = 640 / 16) {
    document.querySelector('.sketch-container').innerHTML = '';
    for (let index = 0; index < nrBlocks; index++) {
        const div = document.createElement('div')
        div.style.cssText = `width: ${dimension}px; height: ${dimension}px; `
        div.addEventListener('mousedown', () => {
            draw = true
        })
        div.addEventListener('mouseup', () => {
            draw = false
        })
        div.addEventListener('mousemove', () => {
            if (draw) {
                div.style.backgroundColor = color
            } 
        })
        frame.appendChild(div)
    }
}

createTable()

// Create a new Sketch table with size selected 
btnSizes.forEach(btn => {btn.addEventListener('click', () => {
    const size = Number(btn.id);
    const nrBlocks = size * size;
    const dimension = 640 / size;
    createTable(nrBlocks, dimension)
})
    
});

// change drawing color by clicking on the buttons 
btnColors.forEach(btn => {btn.addEventListener('click', () => {
    color = btn.id
})
    
});

