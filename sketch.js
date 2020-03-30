let matrix = [];
let rows = 100;
let cols = 100;
let openingCells = (rows * cols) / 3;
let cellW = window.innerWidth / cols;
let cellH = window.innerHeight / rows;
let delta = [];

let inertval;
let countKeyPressed = 0;

function initListener() {
  document.body.onclick = function() {
    let c = floor(mouseX / cellW);
    let r = floor(mouseY / cellH);

    matrix[r][c] = matrix[r][c] == 1 ? 0 : 1;
    drawMatrix();
  };

  document.body.ondblclick = function() {
    let c = floor(mouseX / cellW);
    let r = floor(mouseY / cellH);

    floodFill(r, c, 0, 2);
  };

  // double click --> start fill
}

function initMatrix() {
  for (let r = 0; r < rows; r++) matrix[r] = new Array(cols).fill(0);

  for (let oc = 0; oc < openingCells; oc++) {
    var rR = floor(random(rows));
    var rC = floor(random(cols));
    if (matrix[rR][rC] == 1) oc--;
    matrix[rR][rC] = 1;
  }
}

function drawMatrix() {
  translate(0, 0);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if(matrix[r][c] == 1)
        fill(51, 204, 51)
      else if(matrix[r][c] == 0)
        fill(50);
      else
        fill(255)
      rect(c * cellW, r * cellH, cellW, cellH);
    }
  }
}

function floodFill(row, col, target, replacement){
  // console.log(row,col)
  if(matrix[row][col] == replacement){
    // non devo colorare 
    // console.log("1");
    return;
  } 
  if(matrix[row][col] != target){
    // non devo colorare 
    // console.log("2");
    return;
  } 
  else{
    // console.log("colorato");
    matrix[row][col] = replacement;
  }

  drawMatrix();

  setTimeout(function(){
    // if(row > 0 && col > 0)
      // floodFill(row-1, col-1, target, replacement);
      if(row > 0)
      floodFill(row-1, col, target, replacement);
    // if(row > 0 && col < cols)
      // floodFill(row-1, col+1, target, replacement);
    if(col > 0)
      floodFill(row, col-1, target, replacement);
    if(col < cols)
      floodFill(row, col+1, target, replacement);
    // if(row < rows && col > 0)
      // floodFill(row+1, col-1, target, replacement);
    if(row < rows)
      floodFill(row+1, col, target, replacement);
    // if(row < rows && col < cols)
      // floodFill(row+1, col+1, target, replacement);
  }, 0)

  return;
}


function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0, 0);
  cnv.doubleClicked(function(){
    floodFill
  })
  noStroke();

  background(111);

  initMatrix();
  drawMatrix();
  initListener();
}
