var game = [];
var BX = 5;
var BY = 5;
var BZ = 5;
var BW = 5;
var sv_gravityv = [0, 0, -0.01, 0];

var frxpr = 3;
var frxp = frxpr+2;

var lpx=0,lpy=0,lpz=0,lpw=0;
var px=0,py=0,pz=0,pw=0;

var pvv = [0,0,0,0];

var selx=0,sely=0,selz=0,selw=0;
var sapv = [0,1,0,0];

var r_boxlx = 9;
var r_boxly = 9;
var r_boxgdx = 3;
var r_boxgdy = 3;
var r_boxoffx = 3;
var r_boxoffy = 3;

var host_tps = 60;

var mpl_ymsp = 7/60;
var mpl_ypsp = 7/60;
var mpl_xmsp = 7/60;
var mpl_xpsp = 7/60;
var mpl_wmsp = 7/60;
var mpl_wpsp = 7/60;
var mpl_jmpav= [0, 0, 0.15, 0];

function setup() {
  createCanvas(400, 300);
  game = initgame();
  stroke(0);
}

function eq4l(a,b){
  if(a[0]===b[0]&&a[1]===b[1]&&a[2]===b[2]&&a[3]===b[3]){
    return true;
  }else{
    return false;
  }
}

function keyPressed(){
  if(key === "ArrowLeft"){
    sapv[0]-=1;
    if(eq4l(sapv,[0,0,0,0])){
      sapv = [-1,0,0,0];
    }
  }else if(key === "ArrowRight"){
    sapv[0]+=1;
    if(eq4l(sapv,[0,0,0,0])){
      sapv = [1,0,0,0];
    }
  }else if(key === "ArrowUp"){
    sapv[1]-=1;
    if(eq4l(sapv,[0,0,0,0])){
      sapv = [0,-1,0,0];
    }
  }else if(key === "ArrowDown"){
    sapv[1]+=1;
    if(eq4l(sapv,[0,0,0,0])){
      sapv = [0,1,0,0];
    }
  }else if(key === "i"||key === "I"){
    sapv[2]-=1;
    if(eq4l(sapv,[0,0,0,0])){
      sapv = [0,0,-1,0];
    }
  }else if(key === "k"||key === "K"){
    sapv[2]+=1;
    if(eq4l(sapv,[0,0,0,0])){
      sapv = [0,0,1,0];
    }
  }else if(key === "j"||key === "J"){
    sapv[3]-=1;
    if(eq4l(sapv,[0,0,0,0])){
      sapv = [0,0,0,-1];
    }
  }else if(key === "l"||key === "L"){
    sapv[3]+=1;
    if(eq4l(sapv,[0,0,0,0])){
      sapv = [0,0,0,1];
    }
  }else if(key === "0"){
    if(floor(px)+sapv[0]>=0&&floor(px)+sapv[0]<BX&&floor(py)+sapv[1]>=0&&floor(py)+sapv[1]<BY&&floor(pz)+sapv[2]>=0&&floor(pz)+sapv[2]<BZ&&floor(pw)+sapv[3]>=0&&floor(pw)+sapv[3]<BW&&game[Ffloor(floor(px)+sapv[0],BX,0)][Ffloor(floor(py)+sapv[1],BY,0)][Ffloor(floor(pz)+sapv[2],BZ,0)][Ffloor(floor(pw)+sapv[3],BW,0)]===1){
      game[floor(px)+sapv[0]][floor(py)+sapv[1]][floor(pz)+sapv[2]][floor(pw)+sapv[3]]=0;
    }
  }else if(key === "1"){
    if(floor(px)+sapv[0]>=0&&floor(px)+sapv[0]<BX&&floor(py)+sapv[1]>=0&&floor(py)+sapv[1]<BY&&floor(pz)+sapv[2]>=0&&floor(pz)+sapv[2]<BZ&&floor(pw)+sapv[3]>=0&&floor(pw)+sapv[3]<BW&&game[Ffloor(floor(px)+sapv[0],BX,0)][Ffloor(floor(py)+sapv[1],BY,0)][Ffloor(floor(pz)+sapv[2],BZ,0)][Ffloor(floor(pw)+sapv[3],BW,0)]===0){
      game[floor(px)+sapv[0]][floor(py)+sapv[1]][floor(pz)+sapv[2]][floor(pw)+sapv[3]]=1;
  }
  }
  if(sapv[0]>2){sapv[0]=2}
  if(sapv[0]<-2){sapv[0]=-2}
  
  if(sapv[1]>2){sapv[1]=2}
  if(sapv[1]<-2){sapv[1]=-2}
  
  if(sapv[2]>2){sapv[2]=2}
  if(sapv[2]<-2){sapv[2]=-2}
  
  if(sapv[3]>2){sapv[3]=2}
  if(sapv[3]<-2){sapv[3]=-2}
  
}

function initgame(){
  var TEMP = [];
  for(var i=0;i<BX;i++){
    var L0 = [];
    for(var j=0;j<BY;j++){
      var L1 = [];
      for(var k=0;k<BZ;k++){
        var L2 = [];
        for(var l=0;l<BW;l++){
          L2.push(0);
        }
        L1.push(L2);
      }
      L0.push(L1);
    }
    TEMP.push(L0);
  }
  return TEMP;
}

function draw() {
  if(frxp>frxpr+2){
    frxp=frxpr+1;
  }else{
    frxp++;
  }
  background(220);
  for(var l=0;l<BW;l++){
    for(var k=0;k<BZ;k++){
      
      for(var i=0;i<BX;i++){
        for(var j=0;j<BY;j++){
          var outline = false;
if(floor(selx)==i&&floor(sely)==j&&floor(selz)==k&&floor(selw)==l){
            outline = [0, 255, 0];
          }        
          if(floor(px)==i&&floor(py)==j&&floor(pz)==k&&floor(pw)==l){
            fill(255, 0, 0);
          }else if(game[i][j][k][l]==1){
            fill(0, 0, 255);
          }else{
            fill(255);
          }
          //
          if(outline != false){
            stroke(color(outline));
          }
          rect((r_boxoffx+i*r_boxlx+l*r_boxlx*BX+l*r_boxgdx),(r_boxoffy+j*r_boxly+k*r_boxly*BY+k*r_boxgdy),r_boxlx,r_boxly);
          stroke(0);
        }
      }
      
    }
  }
  
  if(keyIsDown(65)){
    lpx=px;
    px-=(mpl_xmsp)*(host_tps/frameRate());
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||px>=BX||px<0){
      px=lpx;
    }
  }
  if(keyIsDown(68)){
    lpx=px;
    px+=(mpl_xpsp)*(host_tps/frameRate());
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||px>=BX||px<0){
      px=lpx;
    }
  }
  if(keyIsDown(87)){
    lpy=py;
    py-=(mpl_ymsp)*(host_tps/frameRate());
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||py>=BY||py<0){
      py=lpy;
    }
  }
  if(keyIsDown(83)){
    lpy=py;
    py+=(mpl_ypsp)*(host_tps/frameRate());
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||py>=BY||py<0){
      py=lpy;
    }
  }
  if(keyIsDown(81)){
    lpw=pw;
    pw-=(mpl_wmsp)*(host_tps/frameRate());
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||pw>=BW||pw<0){
      pw=lpw;
    }
  }
  if(keyIsDown(69)){
    lpw=pw;
    pw+=(mpl_wpsp)*(host_tps/frameRate());
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||pw>=BW||pw<0){
      pw=lpw;
    }
  }
  
  if((game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz-1,BZ,0)][Ffloor(pw,BW,0)]==1||floor(pz)==0)&&frxp>frxpr){
    //fvel
    pvv=[0,0,0,0];
    //rect(200,200,50,150)
    if(keyIsDown(32)){
       pvv[0]+=mpl_jmpav[0];
      pvv[1]+=mpl_jmpav[1];
      pvv[2]+=mpl_jmpav[2];
      pvv[3]+=mpl_jmpav[3];
      frxp=0;
    }
  }
  var c = host_tps/frameRate();
  if(!isNaN(0*c)){
  lpx=px;
    px+=(pvv[0])*(c);
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||px>=BX||px<0){
      px=lpx;
      pvv[0]=0;
    }
  }
  
  if(!isNaN(0*c)){
  lpy=py;
    py+=(pvv[1])*(c);
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||py>=BY||py<0){
      py=lpy;
      pvv[1]=0;
    }
  }
  
  if(!isNaN(0*c)){
  lpz=pz;
    pz+=(pvv[2])*(c);
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||pz>=BZ||pz<0){
      pz=lpz;
      pvv[2]=0;
    }
  }
  
  if(!isNaN(0*c)){
  lpw=pw;
    pw+=(pvv[3])*(c);
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||pw>=BW||pw<0){
      pw=lpw;
      pvv[3]=0;
    }
  }
  
  selx=floor(px)+sapv[0];sely=floor(py)+sapv[1];selz=floor(pz)+sapv[2];selw=floor(pw)+sapv[3];
  
  pvv[0]+=sv_gravityv[0];
  pvv[1]+=sv_gravityv[1];
  pvv[2]+=sv_gravityv[2];
  pvv[3]+=sv_gravityv[3];
}

function Ffloor(x,ub,lb){
  if(x>=lb&&x<ub){
    return floor(x);
  }else if(x<lb){
    return lb;
  }else{
    return ub-1;
  }
}