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
                if (color == 'rainbow') {
                    div.style.backgroundColor = randomRGB()
                }else{
                    div.style.backgroundColor = color
                }
                
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

// Returns an integer random number between min (included) and max (included)
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function randomRGB(){
    return `rgb(${randomInteger(0, 250)}, ${randomInteger(0, 250)}, ${randomInteger(0, 250)})`
}

// change drawing color by clicking on the buttons 
btnColors.forEach(btn => {btn.addEventListener('click', () => {
    if (btn.id == 'random') {
        color = randomRGB()
    }else{
        color = btn.id;
    }
    
})
    
});


function resetSketch (){
    const pixels = document.querySelectorAll('.sketch-container div')
    for (const pixel of pixels) {
        //pixel.style.backgroundColor = 'transparent'
        pixel.style.removeProperty("background-color")
    }
}

// Reset btn
document.querySelector('#reset').addEventListener('click', () => resetSketch())


 
function getRgbFromPicker () {
    return document.querySelector("#selector").getAttribute('data-current-color')
}

// color picker
let observer;
console.log(observer);
document.querySelector('#selector').addEventListener('click', () => { 

    const observer = new MutationObserver(() => {
        color = getRgbFromPicker();
        console.log(color);
    });
    
    const target = document.getElementById('selector');
    observer.observe(target, { attributes : true, attributeFilter : ['style'] });


}, {once:true})




