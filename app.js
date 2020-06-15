const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSsve");

const INITTIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle = INITTIAL_COLOR;
ctx.fillStyle = INITTIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting(){
  stopPainthing();
}

function stopPainthing(){
  painting = false;
}
function startPainthing(){
  painting = true;
}

function onMouseMove(event){
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting){
    ctx.beginPath();
    ctx.moveTo(x,y);
  }else{
    ctx.lineTo(x,y);
    ctx.stroke();
  }
}
function changeColor(event){
  console.log(event.target.style);
}
function onMouseDown(event){
  painting= true;
}
function handleColorClick(event){
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;

}
function handleRangeChange(event){
  const size = event.target.value;
  ctx.lineWidth = size;
}
function handleModeClick(){
  if(filling === true ){
      filling = false;
      mode.innerText = "Fill";
      canvas.style.cursor = "url(pen.png) 0 32, auto";
  }else{
      filling = true;
      mode.innerText = "Paint";
      canvas.style.cursor = "url(paintbucket.png), auto";
  }
}
function handleCanvasClick(){
  if (filling){
    ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
  }
}
function handleCM(event){
  event.preventDefault();
}
function handleSaveClick(){
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image
  link.download = "PaintJS[GR]";
  link.click();
}
if(canvas) {
  canvas.addEventListener("mousemove",onMouseMove);
  canvas.addEventListener("mousedown",startPainthing);
  canvas.addEventListener("mouseup",stopPainthing);
  canvas.addEventListener("mouseleave",stopPainthing);
  canvas.addEventListener("click",handleCanvasClick);
  canvas.addEventListener("contextmenu",handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click",handleColorClick));

if(range){
  range.addEventListener("input", handleRangeChange);
}
if(mode){
  mode.addEventListener("click",handleModeClick);
}
if(saveBtn){
  saveBtn.addEventListener("click",handleSaveClick);
}