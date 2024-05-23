
const colorPicker = document.getElementById("colorPicker");
const canvasColor = document.getElementById("canvasColor");
const canvas =document.getElementById("mycanvas");
const clearButton=document.getElementById("clearButton");
const saveButton=document.getElementById("saveButton");
const fontPicker=document.getElementById("fontPicker");// add new element
const retrieveButton=document.getElementById('retrieveButton');
const ctx=canvas.getContext('2d');

colorPicker.addEventListener('change',(e)=>{
    ctx.strokeStyle =e.target.value;
    ctx.fillStyle=e.target.value;

})
canvas.addEventListener('mousedown',(e)=>{
    isDrawing =true;
    lastX =e.offsetX;
    lastY=e.offsetY;
})
canvas.addEventListener('mousemove',(e)=>{
    if(isDrawing){
        ctx.beginPath();
        ctx.moveTo(lastX,lastY);
        ctx.lineTo(e.offsetX,e.offsetY);
        ctx.stroke();

        lastX= e.offsetX;
        lastY=e.offsetY;
    }
})
canvas.addEventListener('mouseup',()=>{
    isDrawing=false;
})
canvasColor.addEventListener('change',(e)=>{
    ctx.fillStyle=e.target.value;
    ctx.fillRect(0,0,800,500);
})
fontPicker.addEventListener('change',(e)=>{
    ctx.lineWidth=e.target.value
})
clearButton.addEventListener('click',()=>{
     // Clear the canvas
    ctx.clearRect(0,0,canvas.width,canvas.height);
})
 // Add event listener for the save button
saveButton.addEventListener('click',()=>{
    localStorage.setItem('canvasContents',canvas.toDataURL());
     // Create a new <a> element
    let link=document.createElement('a');
     // Set the download attribute and the href attribute of the <a> element
    link.download='my.canvas.png';

    link.href =canvas.toDataURL();
    // Dispatch a click event on the <a> element
    link.click();
})
 // Add event listener for the retrieve button
retrieveButton.addEventListener('click',()=>{
    let savedCanvas= localStorage.getItem('canvasContents');

    if(savedCanvas){
        let img=new Image();
        img.src=savedCanvas;
        ctx.drawimage(img,0,0);
    }
})
