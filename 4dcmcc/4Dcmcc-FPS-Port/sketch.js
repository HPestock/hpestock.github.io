//Snek4
const update = "Release (0)";

var CLIPBOARDSTR = "";

//var points = [[0,0,0,0,255,255,0,255],[-1,0,0,0,255,0,255,255],[-1,-1,-1,-1,255,255,255,127]];
var points = [];
//const bplines = [[1,0,0,0,-1,0,0,0,255,0,0,255],[0,1,0,0,0,-1,0,0,0,255,0,255],[0,0,1,0,0,0,-1,0,0,0,255,255],[0,0,0,1,0,0,0,-1,255,0,255,255]];
const bplines = [];
var plines = [];
var qlines = [];

var XV = [1,0];
var YV = [0,-1];
var ZV = [0.7071,-0.7071];
var WV = [-0.7071,-0.7071];

var VS = 50;//20

var XY=0,XZ=0,XW=0,YZ=0,YW=0,ZW=0;

var ox=0,oy=0;

var Ox=0,Oy=0,Oz=-15,Ow=0;

var prad = 3;
//var pcol = [255,0,0,10];

var lt = 1;
var qlcol = [0,0,0,255];

var kxym=76,kxzm=85,kxwm=70,kyzm=75,kywm=82,kzwm=71,kxyp=74,kxzp=79,kxwp=72,kyzp=73,kywp=89,kzwp=84;
var iz=187,dz=189;
var Kxp=72,Kxm=70,Kyp=84,Kym=66,Kzp=89,Kzm=86,Kwp=82,Kwm=78,Kstep=71;

var tr=0;

var ObjCube = [0,0,0,0];

var GAME_Xl = 25;
var GAME_Yl = 25;
var GAME_Zl = 25;
var GAME_Wl = 25;
var GAME_APPLE = [1,1,1,1];
var GAME_HEAD = [0,0,0,0];
var LIST_GAME_SNAKE = [GAME_HEAD];
var GAME_SCORE = 0;
var GAME_APPLE_SQRAD = 1;
var GAME_DIR = [0,0,0,0];
var GAME_ALIVE = true;

var GS_X;
var GS_Y;

var GR_X;
var GR_Y;

var G_MOUSEMODE=0;

var G_MOUSESENS=0.01;

var clippl = 0.1;

var MOVE_DIR = [0,0,1,0];

var game = [];
var BX = 10;
var BY = 10;
var BZ = 15;
var BW = 10;
var sv_gravityv = [0, 0, -0.01, 0];

var frxpr = 3;
var frxp = frxpr+2;

var lpx=0,lpy=0,lpz=0,lpw=0;
var px=0,py=0,pz=0.97,pw=0;

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
  createCanvas(720, 450);
  tr=PI/64;
  //alert(sBtDec("01a01")); // write it backwards, man... for now. (Not anymore. )
  
  //alert(incSb("1111"));
  //alert(setChar("abcv",3,"A"));
  
  /*var C = hcube(0,0,0,0,2,2,2,2,0,1,255,0,255,255);
  alert(C);
  for(var i=0;i<C.length;i++){
  	points.push(C[i]);
  }
  var L = hcube(-1,-1,-1,-1,0.3,0.3,0.3,0.3,1,1,255,0,0,255);
  //alert(L);
  for(var i=0;i<L.length;i++){
  	plines.push(L[i]);
  }
  textSize(15);
  textAlign(LEFT,TOP);*/
  
  //changeapple();
  game = initgame();
  stroke(0);
  //game = [[[[0,0,0,0,0],[0,0,0,0,1],[0,0,1,1,1],[0,1,0,1,0],[1,0,1,0,0]],[[0,0,0,0,0],[1,0,0,1,0],[0,0,1,0,1],[0,1,0,1,1],[1,0,1,0,0]],[[0,0,0,0,0],[1,0,0,0,1],[0,0,1,0,1],[0,1,0,1,1],[1,0,1,0,0]],[[0,0,0,0,0],[1,0,0,0,0],[0,0,1,0,0],[0,1,0,1,1],[1,0,1,0,0]],[[0,0,0,0,0],[0,0,0,0,0],[0,0,1,1,0],[0,1,0,0,1],[1,0,1,0,0]]],[[[0,0,0,0,0],[0,0,1,0,1],[0,0,0,1,1],[0,1,0,0,1],[1,0,1,0,0]],[[1,0,0,0,1],[1,0,0,1,0],[1,0,0,1,0],[0,1,0,0,1],[1,0,1,0,0]],[[0,0,0,0,0],[0,1,0,0,1],[1,1,0,1,1],[0,1,0,0,1],[1,0,1,0,0]],[[1,0,0,0,0],[1,0,0,0,0],[1,0,0,1,1],[0,1,0,0,1],[1,0,1,0,0]],[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,1,1],[0,1,0,0,1],[1,0,1,0,0]]],[[[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,1],[0,1,0,0,1],[1,0,1,0,1]],[[1,0,0,0,0],[1,0,0,1,1],[1,0,1,0,0],[1,1,0,0,0],[1,0,1,0,1]],[[1,0,0,0,0],[0,1,0,1,0],[0,1,1,0,1],[1,1,0,0,1],[1,0,1,0,1]],[[1,0,0,0,0],[1,0,0,1,1],[1,0,1,0,0],[1,1,0,0,1],[1,0,1,0,0]],[[0,0,0,0,0],[0,0,0,1,0],[0,0,0,1,1],[0,1,0,0,1],[1,0,1,0,0]]],[[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,1,0],[0,1,0,0,1],[1,0,1,1,1]],[[1,0,0,0,0],[1,0,0,0,0],[1,0,0,1,1],[1,1,0,0,0],[1,0,1,1,0]],[[1,0,0,0,0],[1,0,0,0,0],[0,1,0,1,1],[0,0,1,0,1],[1,1,1,1,1]],[[1,0,0,0,0],[1,0,0,0,1],[1,0,0,1,0],[1,1,0,0,0],[1,0,1,0,1]],[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,1,1],[0,1,0,0,1],[1,0,1,0,0]]],[[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,1,0,0,0],[1,0,1,1,1]],[[0,0,0,0,0],[0,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1],[1,0,0,0,0]],[[0,0,0,0,0],[0,0,0,0,0],[1,1,0,0,0],[0,0,1,0,1],[1,0,1,1,1]],[[0,0,0,0,0],[0,0,0,0,0],[1,0,0,0,1],[1,1,0,0,0],[1,1,1,0,0]],[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,1,0,0,1],[1,0,1,0,0]]]];
}

function mousePressed(){
	GS_X=mouseX;
	GS_Y=mouseY;
	//GR_X=0;
	//GR_Y=0;
	
	if(G_MOUSEMODE===1){
		//X:XY
		//Y:YZ
		GR_X=XY;
		GR_Y=YZ;
	}else if(G_MOUSEMODE===2){
		//X:XZ
		//Y:YW
		GR_X=XZ;
		GR_Y=YW;
	}else if(G_MOUSEMODE===3){
		//X:XW
		//Y:ZW
		GR_X=XW;
		GR_Y=ZW;
	}
}

function mouseDragged(){
	if(G_MOUSEMODE===1){
		//X:XY
		//Y:YZ
		XY=GR_X-(mouseX-GS_X)*G_MOUSESENS;
		YZ=GR_Y-(mouseY-GS_Y)*G_MOUSESENS;
	}else if(G_MOUSEMODE===2){
		//X:XZ
		//Y:YW
		XZ=GR_X-(mouseX-GS_X)*G_MOUSESENS;
		YW=GR_Y-(mouseY-GS_Y)*G_MOUSESENS;
	}else if(G_MOUSEMODE===3){
		//X:XW
		//Y:ZW
		XW=GR_X-(mouseX-GS_X)*G_MOUSESENS;
		ZW=GR_Y+(mouseY-GS_Y)*G_MOUSESENS;
	}
}

function setgamerender(){
	plines=[];
	//plines=bplines;
	var L = hcube(GAME_APPLE[0]-0.5*GAME_APPLE_SQRAD,GAME_APPLE[1]-0.5*GAME_APPLE_SQRAD,GAME_APPLE[2]-0.5*GAME_APPLE_SQRAD,GAME_APPLE[3]-0.5*GAME_APPLE_SQRAD,GAME_APPLE_SQRAD,GAME_APPLE_SQRAD,GAME_APPLE_SQRAD,GAME_APPLE_SQRAD,1,1,255,0,0,255);
  	//alert(L);
  	for(var i=0;i<bplines.length;i++){
  		plines.push(bplines[i]);
  	}
  	for(i=0;i<L.length;i++){
  		plines.push(L[i]);
  	}
  	var H;
  	for(var j=0;j<LIST_GAME_SNAKE.length;j++){
  	H = hcube(LIST_GAME_SNAKE[j][0]-0.5*GAME_APPLE_SQRAD,LIST_GAME_SNAKE[j][1]-0.5*GAME_APPLE_SQRAD,LIST_GAME_SNAKE[j][2]-0.5*GAME_APPLE_SQRAD,LIST_GAME_SNAKE[j][3]-0.5*GAME_APPLE_SQRAD,GAME_APPLE_SQRAD,GAME_APPLE_SQRAD,GAME_APPLE_SQRAD,GAME_APPLE_SQRAD,1,1,0,255,0,200);
  		for(i=0;i<H.length;i++){
  			plines.push(H[i]);
  		}
  	}
  	H = axialflines(GAME_HEAD[0],GAME_HEAD[1],GAME_HEAD[2],GAME_HEAD[3],255,0,0,255,0,255,0,255,0,0,255,255,255,0,255,255);
  	for(i=0;i<H.length;i++){
  		plines.push(H[i]);
  	}
  	H = hcube(-0.5,-0.5,-0.5,-0.5,2*GAME_Xl,2*GAME_Yl,2*GAME_Zl,2*GAME_Wl,1,1,255,255,255,230);
  	H2 = hcube(-0.5,-0.5,-0.5,-0.5,2*GAME_Xl,2*GAME_Yl,2*GAME_Zl,2*GAME_Wl,0,1,255,255,255,230);
  	for(i=0;i<H.length;i++){
  		plines.push(H[i]);
  	}
  	points = [];
  	for(i=0;i<H2.length;i++){
  		//points = [];
  		points.push(H2[i]);
  	}
  	//alert(H);
  	//fill(255,0,255);
  	//text('score: '+GAME_SCORE,0,0);
  	//text(GAME_DIR,0,30);
  	text("Mouse Mode: "+G_MOUSEMODE,0,45);
  	if(!GAME_ALIVE){
  		text('game over.',0,15);
  	}
}

function dogamelogic(){
	//move one frame forward
	if(!GAME_ALIVE){
		return;
	}
	var newpos = [GAME_HEAD[0]+GAME_DIR[0],GAME_HEAD[1]+GAME_DIR[1],GAME_HEAD[2]+GAME_DIR[2],GAME_HEAD[3]+GAME_DIR[3]];
	for(var i=0;i<LIST_GAME_SNAKE.length;i++){
		if((newpos[0] === LIST_GAME_SNAKE[i][0])&&(newpos[1] === LIST_GAME_SNAKE[i][1])&&(newpos[2] === LIST_GAME_SNAKE[i][2])&&(newpos[3] === LIST_GAME_SNAKE[i][3])){
			GAME_ALIVE=false;
			return;
		}
	}
	if(abs(newpos[0])>GAME_Xl){newpos[0]=-GAME_HEAD[0];}
	if(abs(newpos[1])>GAME_Yl){newpos[1]=-GAME_HEAD[1];}
	if(abs(newpos[2])>GAME_Zl){newpos[2]=-GAME_HEAD[2];}
	if(abs(newpos[3])>GAME_Wl){newpos[3]=-GAME_HEAD[3];}
	if((newpos[0] == GAME_APPLE[0])&&(newpos[1] == GAME_APPLE[1])&&(newpos[2] == GAME_APPLE[2])&&(newpos[3] == GAME_APPLE[3])){
		LIST_GAME_SNAKE.push(newpos);
		changeapple();
		GAME_SCORE++;
	}else{
		LIST_GAME_SNAKE.push(newpos);
		LIST_GAME_SNAKE.shift();
	}
	GAME_HEAD=newpos;
}

function testmod(){
	//5
	//-5
	//5+Xl = 10
	//(10%10)-Xl = -5
	var X = 6;
	//alert((X+(0.5*GAME_Xl))%(2*GAME_Xl)-(0.5*GAME_Xl));
}

function axialflines(x,y,z,w,R0,G0,B0,A0,R1,G1,B1,A1,R2,G2,B2,A2,R3,G3,B3,A3){
	return [[1+x,y,z,w,x,y,z,w,R0,G0,B0,A0],[x,1+y,z,w,x,y,z,w,R1,G1,B1,A1],[x,y,1+z,w,x,y,z,w,R2,G2,B2,A2],[x,y,z,1+w,x,y,z,w,R3,G3,B3,A3]];
}

function changeapple(){
	GAME_APPLE[0]=Math.round(Math.random()*2*GAME_Xl-GAME_Xl);
	GAME_APPLE[1]=Math.round(Math.random()*2*GAME_Yl-GAME_Yl);
	GAME_APPLE[2]=Math.round(Math.random()*2*GAME_Zl-GAME_Zl);
	GAME_APPLE[3]=Math.round(Math.random()*2*GAME_Wl-GAME_Wl);
	//alert(GAME_APPLE);
}

function keyPressed(){
	/*if(keyIsDown(Kxp)){
  	GAME_DIR = [1,0,0,0];
  	//alert("x");
  	dogamelogic();
  	Ox+=0.1;
  }
  if(keyIsDown(Kxm)){
  	GAME_DIR = [-1,0,0,0];
  	dogamelogic();
  	Ox-=0.1;
  }
  if(keyIsDown(Kyp)){
  	GAME_DIR = [0,1,0,0];
  	dogamelogic();
  	Oy+=0.1;
  }
  if(keyIsDown(Kym)){
  	GAME_DIR = [0,-1,0,0];
  	dogamelogic();
  	Oy-=0.1;
  }
  if(keyIsDown(Kzp)){
  	GAME_DIR = [0,0,1,0];
  	dogamelogic();
  	Oz+=0.1;
  }
  if(keyIsDown(Kzm)){
  	GAME_DIR = [0,0,-1,0];
  	dogamelogic();
  	Oz-=0.1;
  }
  if(keyIsDown(Kwp)){
  	GAME_DIR = [0,0,0,1];
  	dogamelogic();
  	Ow+=0.1;
  }
  if(keyIsDown(Kwm)){
  	GAME_DIR = [0,0,0,-1];
  	dogamelogic();
  	Ow-=0.1;
  }
  if(keyIsDown(Kstep)){
  	dogamelogic();
  }
  if(keyIsDown(77)){
  	alert(GAME_APPLE);
  	alert(GAME_HEAD);
  	testmod();
  }
  if(keyIsDown(90)&&keyIsDown(67)){
  	GAME_ALIVE=true;
  }*/
  if(key === "`"||key === "~"){
  	flipJsConsole();
  }
  if(key === "B"){
  	cclip(CLIPBOARDSTR);
  }
  if(key === "N"){
  	navigator.clipboard.readText().then(
  clipText => CLIPBOARDSTR = clipText);
  }
  if(key === "2"){
		G_MOUSEMODE=0;
	}
	if(key === "3"){
		G_MOUSEMODE=1;
	}
	if(key === "4"){
		G_MOUSEMODE=2;
	}
	if(key === "5"){
		G_MOUSEMODE=3;
	}
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
  }else if(key === ";"||key === ":"){
    sapv[2]-=1;
    if(eq4l(sapv,[0,0,0,0])){
      sapv = [0,0,-1,0];
    }
  }else if(key === "."||key === ">"){
    sapv[2]+=1;
    if(eq4l(sapv,[0,0,0,0])){
      sapv = [0,0,1,0];
    }
  }else if(key === ","||key === "<"){
    sapv[3]-=1;
    if(eq4l(sapv,[0,0,0,0])){
      sapv = [0,0,0,-1];
    }
  }else if(key === "/"||key === "?"){
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

function draw() {
  background(20);
  //noStroke();
  //WV[0]+=0.05;
  //WV[1]+=0.05;
  
  //changeapple();
  
  if(keyIsDown(kxym)){
    XY-=tr;
  }
  if(keyIsDown(kxzm)){
    XZ-=tr;
  }
  if(keyIsDown(kxwm)){
    XW-=tr;
  }
  if(keyIsDown(kyzm)){
    YZ-=tr;
  }
  if(keyIsDown(kywm)){
    YW-=tr;
  }
  if(keyIsDown(kzwm)){
    ZW-=tr;
  }
  if(keyIsDown(kxyp)){
    XY+=tr;
  }
  if(keyIsDown(kxzp)){
    XZ+=tr;
  }
  if(keyIsDown(kxwp)){
    XW+=tr;
  }
  if(keyIsDown(kyzp)){
    YZ+=tr;
  }
  if(keyIsDown(kywp)){
    YW+=tr;
  }
  if(keyIsDown(kzwp)){
    ZW+=tr;
  }
  
  if(keyIsDown(iz)){
  	VS+=0.1;
  }
  if(keyIsDown(dz)){
  	VS-=0.1;
  }
  
  /*if(keyIsDown(Kxp)){
  	MOVE_DIR[0] = 1;
  	//alert("x");
  	//dogamelogic();
  	//Ox+=0.5;
  }
  if(keyIsDown(Kxm)){
  	MOVE_DIR[0] = -1;
  	//dogamelogic();
  	//Ox-=0.5;
  }
  if(keyIsDown(Kyp)){
  	MOVE_DIR[1] = 1;
  	//dogamelogic();
  	//Oy+=0.5;
  }
  if(keyIsDown(Kym)){
  	MOVE_DIR[1] = -1;
  	//dogamelogic();
  	//Oy-=0.5;
  }
  if(keyIsDown(Kzp)){
  	MOVE_DIR[2] = 1;
  	//dogamelogic();
  	//Oz+=0.5;
  }
  if(keyIsDown(Kzm)){
  	MOVE_DIR[2] = -1;
  	//dogamelogic();
  	//Oz-=0.5;
  }
  if(keyIsDown(Kwp)){
  	MOVE_DIR[3] = 1;
  	//dogamelogic();
  	//Ow+=0.5;
  }
  if(keyIsDown(Kwm)){
  	MOVE_DIR[3] = -1;
  	//dogamelogic();
  	//Ow-=0.5;
  }
  if((!keyIsDown(Kxp)&&!keyIsDown(Kxm))||(keyIsDown(Kxp)&&keyIsDown(Kxm))){
  	MOVE_DIR[0]=0;
  }
  if((!keyIsDown(Kyp)&&!keyIsDown(Kym))||(keyIsDown(Kyp)&&keyIsDown(Kym))){
  	MOVE_DIR[1]=0;
  }
  if((!keyIsDown(Kzp)&&!keyIsDown(Kzm))||(keyIsDown(Kzp)&&keyIsDown(Kzm))){
  	MOVE_DIR[2]=0;
  }
  if((!keyIsDown(Kwp)&&!keyIsDown(Kwm))||(keyIsDown(Kwp)&&keyIsDown(Kwm))){
  	MOVE_DIR[3]=0;
  }*/
  
  //begin paste
  
  if(frxp>frxpr+2){
    frxp=frxpr+1;
  }else{
    frxp++;
  }
  //background(220);
  points = [];
  plines = [];
  var tempstroke = [0, 0, 0];
  var tempcolor = [0, 0, 0];
  var temphalter = false;
  for(var l=0;l<BW;l++){
    for(var k=0;k<BZ;k++){
      
      for(var i=0;i<BX;i++){
        for(var j=0;j<BY;j++){
          var outline = false;
if(floor(selx)==i&&floor(sely)==j&&floor(selz)==k&&floor(selw)==l){
            outline = [0, 255, 0];
          }        
          if(floor(px)==i&&floor(py)==j&&floor(pz)==k&&floor(pw)==l){
            tempcolor = [255, 0, 0];
          }else if(game[i][j][k][l]==1){
            tempcolor = [0, 0, 255];
          }else{
            tempcolor = [255,255,255];
            temphalter = true;
          }
          //
          if(outline != false){
            tempstroke = outline;
            tempcolor = outline;
            temphalter = false;
          }
          //rect((r_boxoffx+i*r_boxlx+l*r_boxlx*BX+l*r_boxgdx),(r_boxoffy+j*r_boxly+k*r_boxly*BY+k*r_boxgdy),r_boxlx,r_boxly);
          //X: i
          //Y: j
          //Z: k
          //W: l
          if(!temphalter){
          var C1 = hcube(i+0.5,j+0.5,k+0.5,l+0.5,1,1,1,1,0,1,tempcolor[0],tempcolor[1],tempcolor[2],255);
          var C2 = hcube(i+0.5,j+0.5,k+0.5,l+0.5,1,1,1,1,1,1,tempcolor[0],tempcolor[1],tempcolor[2],255);
          for(var iMarker = 0;iMarker<C1.length;iMarker++){
          	points.push(C1[iMarker]);
          }
          for(var iMarker = 0;iMarker<C2.length;iMarker++){
          	plines.push(C2[iMarker]);
          }
          }
          tempstroke = [0,0,0];
          temphalter = false;
        }
      }
      
    }
  }
  for(i=0;i<bplines.length;i++){
  	plines.push(bplines[i]);
  }
  //add a bpoints
  var C3 = hcube(BX*0.5,BY*0.5,BZ*0.5,BW*0.5,BX,BY,BZ,BW,1,1,255,255,255,255);
  for(i=0;i<C3.length;i++){
  	plines.push(C3[i]);
  }
  
  var rotvec = [0,0,0,0,0,0,0,0];
  
  if(keyIsDown(65)){
  	rotvec = [-1,0,0,0,0,0,0,0];
  	rotvec = ApplyRotations(XY,0,XW,0,YW,0,[0,0,0,0],rotvec);
  	/*var temphc = hcube(px+rotvec[0],py+rotvec[1],pz+rotvec[2],pw+rotvec[3],0.7,0.7,0.7,0.7,1,1,0,255,255,255);
  	for(iMarker=0;iMarker<temphc.length;iMarker++){
  		plines.push(temphc[iMarker]);
  	}*/
  	//alert(rotvec);
    lpx=px;
    lpy=py;
    lpz=pz;//should not be required
    lpw=pw;
    px+=rotvec[0]*(mpl_xmsp)*(host_tps/frameRate());
    py-=rotvec[1]*(mpl_ymsp)*(host_tps/frameRate());
    //pz-=rotvec[2];//should not be required
    pw+=rotvec[3]*(mpl_wmsp)*(host_tps/frameRate());
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||px>=BX||px<0){
      px=lpx;
    }
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||py>=BY||py<0){
      py=lpy;
    }
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||pz>=BY||pz<0){
      pz=lpz;
    }
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||pw>=BW||pw<0){
      pw=lpw;
    }
  }
  if(keyIsDown(68)){
    rotvec = [1,0,0,0,0,0,0,0];
  	rotvec = ApplyRotations(XY,0,XW,0,YW,0,[0,0,0,0],rotvec);
  	/*var temphc = hcube(px+rotvec[0],py+rotvec[1],pz+rotvec[2],pw+rotvec[3],0.7,0.7,0.7,0.7,1,1,0,255,255,255);
  	for(iMarker=0;iMarker<temphc.length;iMarker++){
  		plines.push(temphc[iMarker]);
  	}*/
  	//alert(rotvec);
    lpx=px;
    lpy=py;
    lpz=pz;//should not be required
    lpw=pw;
    px+=rotvec[0]*(mpl_xmsp)*(host_tps/frameRate());
    py-=rotvec[1]*(mpl_ymsp)*(host_tps/frameRate());
    //pz-=rotvec[2];//should not be required
    pw+=rotvec[3]*(mpl_wmsp)*(host_tps/frameRate());
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||px>=BX||px<0){
      px=lpx;
    }
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||py>=BY||py<0){
      py=lpy;
    }
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||pz>=BY||pz<0){
      pz=lpz;
    }
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||pw>=BW||pw<0){
      pw=lpw;
    }
  }
  if(keyIsDown(87)){
    rotvec = [0,1,0,0,0,0,0,0];
  	rotvec = ApplyRotations(XY,0,XW,0,YW,0,[0,0,0,0],rotvec);
  	/*var temphc = hcube(px+rotvec[0],py+rotvec[1],pz+rotvec[2],pw+rotvec[3],0.7,0.7,0.7,0.7,1,1,0,255,255,255);
  	for(iMarker=0;iMarker<temphc.length;iMarker++){
  		plines.push(temphc[iMarker]);
  	}*/
  	//alert(rotvec);
    lpx=px;
    lpy=py;
    lpz=pz;//should not be required
    lpw=pw;
    px+=rotvec[0]*(mpl_xmsp)*(host_tps/frameRate());
    py-=rotvec[1]*(mpl_ymsp)*(host_tps/frameRate());
    //pz-=rotvec[2];//should not be required
    pw+=rotvec[3]*(mpl_wmsp)*(host_tps/frameRate());
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||px>=BX||px<0){
      px=lpx;
    }
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||py>=BY||py<0){
      py=lpy;
    }
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||pz>=BY||pz<0){
      pz=lpz;
    }
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||pw>=BW||pw<0){
      pw=lpw;
    }
  }
  if(keyIsDown(83)){
    rotvec = [0,-1,0,0,0,0,0,0];
  	rotvec = ApplyRotations(XY,0,XW,0,YW,0,[0,0,0,0],rotvec);
  	/*var temphc = hcube(px+rotvec[0],py+rotvec[1],pz+rotvec[2],pw+rotvec[3],0.7,0.7,0.7,0.7,1,1,0,255,255,255);
  	for(iMarker=0;iMarker<temphc.length;iMarker++){
  		plines.push(temphc[iMarker]);
  	}*/
  	//alert(rotvec);
    lpx=px;
    lpy=py;
    lpz=pz;//should not be required
    lpw=pw;
    px+=rotvec[0]*(mpl_xmsp)*(host_tps/frameRate());
    py-=rotvec[1]*(mpl_ymsp)*(host_tps/frameRate());
    //pz-=rotvec[2];//should not be required
    pw+=rotvec[3]*(mpl_wmsp)*(host_tps/frameRate());
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||px>=BX||px<0){
      px=lpx;
    }
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||py>=BY||py<0){
      py=lpy;
    }
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||pz>=BY||pz<0){
      pz=lpz;
    }
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||pw>=BW||pw<0){
      pw=lpw;
    }
  }
  if(keyIsDown(81)){
    rotvec = [0,0,0,-1,0,0,0,0];
  	rotvec = ApplyRotations(XY,0,XW,0,YW,0,[0,0,0,0],rotvec);
  	/*var temphc = hcube(px+rotvec[0],py+rotvec[1],pz+rotvec[2],pw+rotvec[3],0.7,0.7,0.7,0.7,1,1,0,255,255,255);
  	for(iMarker=0;iMarker<temphc.length;iMarker++){
  		plines.push(temphc[iMarker]);
  	}*/
  	//alert(rotvec);
    lpx=px;
    lpy=py;
    lpz=pz;//should not be required
    lpw=pw;
    px+=rotvec[0]*(mpl_xmsp)*(host_tps/frameRate());
    py-=rotvec[1]*(mpl_ymsp)*(host_tps/frameRate());
    //pz-=rotvec[2];//should not be required
    pw+=rotvec[3]*(mpl_wmsp)*(host_tps/frameRate());
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||px>=BX||px<0){
      px=lpx;
    }
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||py>=BY||py<0){
      py=lpy;
    }
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||pz>=BY||pz<0){
      pz=lpz;
    }
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||pw>=BW||pw<0){
      pw=lpw;
    }
  }
  if(keyIsDown(69)){
    rotvec = [0,0,0,1,0,0,0,0];
  	rotvec = ApplyRotations(XY,0,XW,0,YW,0,[0,0,0,0],rotvec);
  	/*var temphc = hcube(px+rotvec[0],py+rotvec[1],pz+rotvec[2],pw+rotvec[3],0.7,0.7,0.7,0.7,1,1,0,255,255,255);
  	for(iMarker=0;iMarker<temphc.length;iMarker++){
  		plines.push(temphc[iMarker]);
  	}*/
  	//alert(rotvec);
    lpx=px;
    lpy=py;
    lpz=pz;//should not be required
    lpw=pw;
    px+=rotvec[0]*(mpl_xmsp)*(host_tps/frameRate());
    py-=rotvec[1]*(mpl_ymsp)*(host_tps/frameRate());
    //pz-=rotvec[2];//should not be required
    pw+=rotvec[3]*(mpl_wmsp)*(host_tps/frameRate());
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||px>=BX||px<0){
      px=lpx;
    }
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||py>=BY||py<0){
      py=lpy;
    }
    if(game[Ffloor(px,BX,0)][Ffloor(py,BY,0)][Ffloor(pz,BZ,0)][Ffloor(pw,BW,0)]==1||pz>=BY||pz<0){
      pz=lpz;
    }
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
  
  //end paste
  
  Ox = px;
  Oy = py;
  Oz = pz;
  Ow = pw;
  
  //camallmove(MOVE_DIR,0.5);
  
  //setgamerender();
  
  var np = [];
  var npl = [];
  
  for(var i=0;i<points.length;i++){
    np.push(ApplyRotations(XY,XZ,XW,YZ,YW,ZW,[Ox,Oy,Oz,Ow],[points[i][0],points[i][1],points[i][2],points[i][3],points[i][4],points[i][5],points[i][6],points[i][7]]));
  }
  strokeWeight(lt);
  drawPoints(np);
  drawQLines(np,qlines);
  var la,lb;
  for(i=0;i<plines.length;i++){
    la = ApplyRotations(XY,XZ,XW,YZ,YW,ZW,[Ox,Oy,Oz,Ow],[plines[i][0],plines[i][1],plines[i][2],plines[i][3]]);
    lb = ApplyRotations(XY,XZ,XW,YZ,YW,ZW,[Ox,Oy,Oz,Ow],[plines[i][4],plines[i][5],plines[i][6],plines[i][7]]);
    //npl.push(ApplyRotations(XY,XZ,XW,YZ,YW,ZW,[0,0,0,0],points[i]));
    npl.push([la[0],la[1],la[2],la[3],lb[0],lb[1],lb[2],lb[3],plines[i][8],plines[i][9],plines[i][10],plines[i][11]]);
  }
  drawPLines(npl);
  //XW+=PI/128;
  //XY+=PI/128;
  //XZ+=PI/128;
  //YZ+=PI/128;
  //YW+=PI/128;
  //ZW+=PI/128;
  //ObjCube[3]+=0.01;
  //Oz+=0.01;
  //Ow+=0.01;
  stroke(0);
  fill(255,0,255);
  //text('score: '+GAME_SCORE,0,0);
  textSize(12);
  text("XY: "+XY,600,45);
  text("XZ: "+XZ,600,60);
  text("XW: "+XW,600,75);
  text("YZ: "+YZ,600,90);
  text("YW: "+YW,600,105);
  text("ZW: "+ZW,600,120);
  text("Mouse Mode: "+G_MOUSEMODE,600,30);
}

function camallmove(move_dir, speed){
	var newforwv = ApplyRotations(XY,XZ,XW,YZ,YW,ZW,[0,0,0,0],[move_dir[0],move_dir[1],move_dir[2],move_dir[3],0,0,0,0]);
	cammove(newforwv,speed);
}

function flipJsConsole(){
	eval(prompt(""));
}

function worldSave(){
	alert("Saving, Worldsize: "+BX+", "+BY+", "+BZ+", "+BW);
	var SAVEOUTPUT = "[";
	for(var Si=0;Si<game.length;Si++){
		SAVEOUTPUT+="[";
		for(var Sj=0;Sj<game[Si].length;Sj++){
			SAVEOUTPUT+="[";
			for(var Sk=0;Sk<game[Si][Sj].length;Sk++){
				SAVEOUTPUT+="[";
				for(var Sl=0;Sl<game[Si][Sj][Sk].length;Sl++){
					if(Sl<game[Si][Sj][Sk].length-1){
						SAVEOUTPUT+=(game[Si][Sj][Sk][Sl]+",");
					}else{
						SAVEOUTPUT+=(game[Si][Sj][Sk][Sl]+"");
					}
				}
				//SAVEOUTPUT+="]";
				if(Sk<game[Si][Sj].length-1){
						SAVEOUTPUT+="],";
					}else{
						SAVEOUTPUT+="]";
					}
			}
			if(Sj<game[Si].length-1){
						SAVEOUTPUT+="],";
					}else{
						SAVEOUTPUT+="]";
					}
		}
		if(Si<game.length-1){
						SAVEOUTPUT+="],";
					}else{
						SAVEOUTPUT+="]";
					}
	}
	SAVEOUTPUT+="]";
	//alert(SAVEOUTPUT);
	//console.log(SAVEOUTPUT);
	return SAVEOUTPUT;
}

function loadtestworld(){
	//eval('game = [[[[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]]][[[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]]][[[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]]][[[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[1,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[1,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]]][[[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[1,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]]][[[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[1,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]]][[[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]]][[[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]]][[[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]]][[[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]][[0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0][0,0,0,0,0,0,0,0,0,0]]]];');
}

function cammove(move_dir,speed){
	Ox+=move_dir[0]*speed;
	Oy+=move_dir[1]*speed;
	Oz+=move_dir[2]*speed;
	Oy+=move_dir[3]*speed;
}

function drawPLines(P){
  var lA,lB;
  
  for(var i=0;i<P.length;i++){
    lA = [P[i][0],P[i][1],P[i][2],P[i][3]];
    lB = [P[i][4],P[i][5],P[i][6],P[i][7]];
    //X: ( x*VS+(width*0.5)+(ox*VS) )
    //Y: ( y*VS+(height*0.5)+(oy*VS) )
    //x: (XV[0]*P[i][0])+(YV[0]*P[i][1])+(ZV[0]*P[i][2])+(WV[0]*P[i][3])
    //y: (XV[1]*P[i][0])+(YV[1]*P[i][1])+(ZV[1]*P[i][2])+(WV[1]*P[i][3])
    var x0,y0,x1,y1;
    //x0 = (XV[0]*lA[0])+(YV[0]*lA[1])+(ZV[0]*lA[2])+(WV[0]*lA[3]);
    //y0 = (XV[1]*lA[0])+(YV[1]*lA[1])+(ZV[1]*lA[2])+(WV[1]*lA[3]);
    
    //new rendering pipeline
    
    
    //old rendering pipeline
    if(lA[2]>clippl&&lB[2]>clippl&&lA[3]>clippl&&lB[3]>clippl){
    x0 = XV[0]*lA[0];
    y0 = YV[1]*lA[1];
    x0 = (x0/lA[3])/(lA[2]/lA[3]);
    y0 = (y0/lA[3])/(lA[2]/lA[3]);
    //console.log(y);
    x0 = ( x0*VS+(width*0.5)+(ox*VS) );
    y0 = ( y0*VS+(height*0.5)+(oy*VS) );
    
    //x1 = (XV[0]*lB[0])+(YV[0]*lB[1])+(ZV[0]*lB[2])+(WV[0]*lB[3]);
    //y1 = (XV[1]*lB[0])+(YV[1]*lB[1])+(ZV[1]*lB[2])+(WV[1]*lB[3]);
    x1 = XV[0]*lB[0];
    y1 = YV[1]*lB[1];
    x1 = (x1/lB[3])/(lB[2]/lB[3]);
    y1 = (y1/lB[3])/(lB[2]/lB[3]);
    //console.log(y);
    x1 = ( x1*VS+(width*0.5)+(ox*VS) );
    y1 = ( y1*VS+(height*0.5)+(oy*VS) );
    stroke([P[i][8],P[i][9],P[i][10],P[i][11]]);
    line(x0,y0,x1,y1);
    }else if((lA[2]>clippl||lA[3]>clippl||lB[2]>clippl||lB[3]>clippl)){
    	
    	var V = 0;
    	var zV = 0;
    	var wV = 0;
    	//var oV = 0;
    	
    	if(lA[2]>clippl&&lA[3]>clippl){
    		V++;
    	}else if(lA[2]>clippl&&lA[3]<=clippl){
    		zV++;
    	}else if(lA[2]<=clippl&&lA[3]>clippl){
    		wV++;
    	}/*else{
    		oV++;
    	}*/
    	
    	if(lB[2]>clippl&&lB[3]>clippl){
    		V++;
    	}else if(lB[2]>clippl&&lB[3]<=clippl){
    		zV++;
    	}else if(lB[2]<=clippl&&lB[3]>clippl){
    		wV++;
    	}/*else{
    		oV++;
    	}*/
    	
    	if((V==1)||(wV==1&&(V==1||zV==1))||(zV==1&&(V==1||wV==1))){
    	
    	var lin = lB;
    	var out = lA;
    	if(lA[2]<=clippl){
    		out = lB;
    		lin = lA;
    	}
    	
    	if(lin[2]<=clippl){
    		lin = [((((lA[0]-lB[0])*clippl)-((lA[0]-lB[0])*lB[2]))/(lA[2]-lB[2]))+lB[0],((((lA[1]-lB[1])*clippl)-((lA[1]-lB[1])*lB[2]))/(lA[2]-lB[2]))+lB[1],clippl,((((lA[3]-lB[3])*clippl)-((lA[3]-lB[3])*lB[2]))/(lA[2]-lB[2]))+lB[3]];
    	}
    	
    	if((lA[2]-lB[2])!==0){
    		lA = lin;
    		lB = out;
    	}
    	
    	lin = lA;
    	out = lB;
    	
    	if(lB[3]<=clippl){
    		out = lA;
    		lin = lB;
    	}
    	
    	if(lin[3]<=clippl){
    		lin = [((((lA[0]-lB[0])*clippl)-((lA[0]-lB[0])*lB[3]))/(lA[3]-lB[3]))+lB[0],((((lA[1]-lB[1])*clippl)-((lA[1]-lB[1])*lB[3]))/(lA[3]-lB[3]))+lB[1],((((lA[2]-lB[2])*clippl)-((lA[2]-lB[2])*lB[3]))/(lA[3]-lB[3]))+lB[2],clippl];
    		//alert(lin);
    		//alert(out);
    	}
    	
    	if((lA[3]-lB[3])!==0){
    		lA = lin;
    		lB = out;
    	}
    	
    	if(lA[2]>clippl||lB[2]>clippl||lA[3]>clippl||lB[3]>clippl){
    	x0 = XV[0]*lA[0];
    y0 = YV[1]*lA[1];
    x0 = (x0/lA[3])/(lA[2]/lA[3]);
    y0 = (y0/lA[3])/(lA[2]/lA[3]);
    //console.log(y);
    x0 = ( x0*VS+(width*0.5)+(ox*VS) );
    y0 = ( y0*VS+(height*0.5)+(oy*VS) );
    
    //x1 = (XV[0]*lB[0])+(YV[0]*lB[1])+(ZV[0]*lB[2])+(WV[0]*lB[3]);
    //y1 = (XV[1]*lB[0])+(YV[1]*lB[1])+(ZV[1]*lB[2])+(WV[1]*lB[3]);
    x1 = XV[0]*lB[0];
    y1 = YV[1]*lB[1];
    x1 = (x1/lB[3])/(lB[2]/lB[3]);
    y1 = (y1/lB[3])/(lB[2]/lB[3]);
    //console.log(y);
    x1 = ( x1*VS+(width*0.5)+(ox*VS) );
    y1 = ( y1*VS+(height*0.5)+(oy*VS) );
    stroke([P[i][8],P[i][9],P[i][10],P[i][11]]);
    line(x0,y0,x1,y1);
    }
    
    }
    }
  }
}

function drawQLines(L,Q){
  var lA,lB;
  stroke(qlcol);
  for(var i=0;i<Q.length;i++){
    lA = L[Q[i][0]];
    lB = L[Q[i][1]];
    //X: ( x*VS+(width*0.5)+(ox*VS) )
    //Y: ( y*VS+(height*0.5)+(oy*VS) )
    //x: (XV[0]*P[i][0])+(YV[0]*P[i][1])+(ZV[0]*P[i][2])+(WV[0]*P[i][3])
    //y: (XV[1]*P[i][0])+(YV[1]*P[i][1])+(ZV[1]*P[i][2])+(WV[1]*P[i][3])
    var x0,y0,x1,y1;
    x0 = (XV[0]*lA[0])+(YV[0]*lA[1])+(ZV[0]*lA[2])+(WV[0]*lA[3]);
    y0 = (XV[1]*lA[0])+(YV[1]*lA[1])+(ZV[1]*lA[2])+(WV[1]*lA[3]);
    //console.log(y);
    x0 = ( x0*VS+(width*0.5)+(ox*VS) );
    y0 = ( y0*VS+(height*0.5)+(oy*VS) );
    
    x1 = (XV[0]*lB[0])+(YV[0]*lB[1])+(ZV[0]*lB[2])+(WV[0]*lB[3]);
    y1 = (XV[1]*lB[0])+(YV[1]*lB[1])+(ZV[1]*lB[2])+(WV[1]*lB[3]);
    //console.log(y);
    x1 = ( x1*VS+(width*0.5)+(ox*VS) );
    y1 = ( y1*VS+(height*0.5)+(oy*VS) );
    //stroke(qlcol);
    line(x0,y0,x1,y1);
    //ellipse(x,y,prad);
    //console.log(P[i]);
    //ellipse(1*VS+(width*0.5),1*VS+(width*0.5),10);
  }
}

function drawPoints(P){
  noStroke();
  for(var i=0;i<P.length;i++){
    //X: ( x*VS+(width*0.5)+(ox*VS) )
    //Y: ( y*VS+(height*0.5)+(oy*VS) )
    //x: (XV[0]*P[i][0])+(YV[0]*P[i][1])+(ZV[0]*P[i][2])+(WV[0]*P[i][3])
    //y: (XV[1]*P[i][0])+(YV[1]*P[i][1])+(ZV[1]*P[i][2])+(WV[1]*P[i][3])
    var x,y;
    /*x = (XV[0]*P[i][0])+(YV[0]*P[i][1])+(ZV[0]*P[i][2])+(WV[0]*P[i][3]);
    y = (XV[1]*P[i][0])+(YV[1]*P[i][1])+(ZV[1]*P[i][2])+(WV[1]*P[i][3]);
    //console.log(y);
    x = ( x*VS+(width*0.5)+(ox*VS) );
    y = ( y*VS+(height*0.5)+(oy*VS) );*/
    if(P[i][2]>0){
    x = XV[0]*P[i][0];
    y = YV[1]*P[i][1];
    x = (x/P[i][3])/(P[i][2]/P[i][3]);
    y = (y/P[i][3])/(P[i][2]/P[i][3]);
    x = ( x*VS+(width*0.5)+(ox*VS) );
    y = ( y*VS+(height*0.5)+(oy*VS) );
    fill(P[i][4],P[i][5],P[i][6],P[i][7]);
    ellipse(x,y,prad);
    }
    //console.log(P[i]);
    //ellipse(1*VS+(width*0.5),1*VS+(width*0.5),10);
  }
}

function clipz([lax,lay,laz,law],[lbx,lby,lbz,lbw]){
	
}

function clipw(){
	
}

function ApplyRotations(XYr,XZr,XWr,YZr,YWr,ZWr,[ox,oy,oz,ow],[vx,vy,vz,vw,R,G,B,A]){
  var ov = [vx-ox,vy-oy,vz-oz,vw-ow];
  /*
  ov = RotateXY(XYr, ov);
  ov = RotateXZ(XZr, ov);
  ov = RotateXW(XWr, ov);
  ov = RotateYZ(YZr, ov);
  ov = RotateYW(YWr, ov);
  ov = RotateZW(ZWr, ov);
  */
  ov = RotateXY(XYr, ov);
  ov = RotateXW(XWr, ov);
  ov = RotateYW(YWr, ov);
  ov = RotateXZ(XZr, ov);
  ov = RotateYZ(YZr, ov);
  ov = RotateZW(ZWr, ov);
  return [ov[0],ov[1],ov[2],ov[3],R,G,B,A];
}

function RotateXY(XYr, [px, py, pz, pw]){
  var rx,ry;
  rx = (px*cos(XYr))+(py*-sin(XYr));
  ry = (px*sin(XYr))+(py*cos(XYr));
  return [rx,ry,pz,pw];
}

function RotateXZ(XZr, [px, py, pz, pw]){
  var rx,rz;
  rx = (px*cos(XZr))+(pz*-sin(XZr));
  rz = (px*sin(XZr))+(pz*cos(XZr));
  return [rx,py,rz,pw];
}

function RotateXW(XWr, [px, py, pz, pw]){
  var rx,rw;
  rx = (px*cos(XWr))+(pw*-sin(XWr));
  rw = (px*sin(XWr))+(pw*cos(XWr));
  return [rx,py,pz,rw];
}

function RotateYZ(YZr, [px, py, pz, pw]){
  var ry,rz;
  ry = (py*cos(YZr))+(pz*-sin(YZr));
  rz = (py*sin(YZr))+(pz*cos(YZr));
  return [px,ry,rz,pw];
}

function RotateYW(YWr, [px, py, pz, pw]){
  var ry,rw;
  ry = (py*cos(YWr))+(pw*-sin(YWr));
  rw = (py*sin(YWr))+(pw*cos(YWr));
  return [px,ry,pz,rw];
}

function RotateZW(ZWr, [px, py, pz, pw]){
  var rz,rw;
  rz = (pz*cos(ZWr))+(pw*-sin(ZWr));
  rw = (pz*sin(ZWr))+(pw*cos(ZWr));
  return [px,py,rz,rw];
}

function hcube(x,y,z,w,d,h,wh,l,PL01,a,R,G,B,A){
	//x<->d
	//y<->h
	//z<->wh
	//w<->l
	
	if(PL01===0){
		//if(aRGBA===1){
		if(a==1){
			return [[0.5*d+x,0.5*h+y,0.5*wh+z,0.5*l+w,R,G,B,A],[0.5*d+x,0.5*h+y,0.5*wh+z,-0.5*l+w,R,G,B,A],[0.5*d+x,0.5*h+y,-0.5*wh+z,0.5*l+w,R,G,B,A],[0.5*d+x,0.5*h+y,-0.5*wh+z,-0.5*l+w,R,G,B,A],[0.5*d+x,-0.5*h+y,0.5*wh+z,0.5*l+w,R,G,B,A],[0.5*d+x,-0.5*h+y,0.5*wh+z,-0.5*l+w,R,G,B,A],[0.5*d+x,-0.5*h+y,-0.5*wh+z,0.5*l+w,R,G,B,A],[0.5*d+x,-0.5*h+y,-0.5*wh+z,-0.5*l+w,R,G,B,A],[-0.5*d+x,0.5*h+y,0.5*wh+z,0.5*l+w,R,G,B,A],[-0.5*d+x,0.5*h+y,0.5*wh+z,-0.5*l+w,R,G,B,A],[-0.5*d+x,0.5*h+y,-0.5*wh+z,0.5*l+w,R,G,B,A],[-0.5*d+x,0.5*h+y,-0.5*wh+z,-0.5*l+w,R,G,B,A],[-0.5*d+x,-0.5*h+y,0.5*wh+z,0.5*l+w,R,G,B,A],[-0.5*d+x,-0.5*h+y,0.5*wh+z,-0.5*l+w,R,G,B,A],[-0.5*d+x,-0.5*h+y,-0.5*wh+z,0.5*l+w,R,G,B,A],[-0.5*d+x,-0.5*h+y,-0.5*wh+z,-0.5*l+w,R,G,B,A]];
		//}//else{
		}else{
			return [[0.5*d+x,0.5*h+y,0.5*wh+z,0.5*l+w],[0.5*d+x,0.5*h+y,0.5*wh+z,-0.5*l+w],[0.5*d+x,0.5*h+y,-0.5*wh+z,0.5*l+w],[0.5*d+x,0.5*h+y,-0.5*wh+z,-0.5*l+w],[0.5*d+x,-0.5*h+y,0.5*wh+z,0.5*l+w],[0.5*d+x,-0.5*h+y,0.5*wh+z,-0.5*l+w],[0.5*d+x,-0.5*h+y,-0.5*wh+z,0.5*l+w],[0.5*d+x,-0.5*h+y,-0.5*wh+z,-0.5*l+w],[-0.5*d+x,0.5*h+y,0.5*wh+z,0.5*l+w],[-0.5*d+x,0.5*h+y,0.5*wh+z,-0.5*l+w],[-0.5*d+x,0.5*h+y,-0.5*wh+z,0.5*l+w],[-0.5*d+x,0.5*h+y,-0.5*wh+z,-0.5*l+w],[-0.5*d+x,-0.5*h+y,0.5*wh+z,0.5*l+w],[-0.5*d+x,-0.5*h+y,0.5*wh+z,-0.5*l+w],[-0.5*d+x,-0.5*h+y,-0.5*wh+z,0.5*l+w],[-0.5*d+x,-0.5*h+y,-0.5*wh+z,-0.5*l+w]];
		}
		//alert("x");
	}else{
		var fpl = [];
		//alert("NYF: L");
		var c = "0000";
		for(var i=0;i<16;i++){
			if(a){
				if(c.charAt(c.length-1)=="0"){
					fpl.push([0.5*(2*parseInt(c.charAt(c.length-4))-1)*d+x,0.5*(2*parseInt(c.charAt(c.length-3))-1)*h+y,0.5*(2*parseInt(c.charAt(c.length-2))-1)*wh+z,0.5*(2*parseInt(c.charAt(c.length-1))-1)*l+w,0.5*(2*parseInt(c.charAt(c.length-4))-1)*d+x,0.5*(2*parseInt(c.charAt(c.length-3))-1)*h+y,0.5*(2*parseInt(c.charAt(c.length-2))-1)*wh+z,-0.5*(2*parseInt(c.charAt(c.length-1))-1)*l+w,R,G,B,A]);
				}
				if(c.charAt(c.length-2)=="0"){
					fpl.push([0.5*(2*parseInt(c.charAt(c.length-4))-1)*d+x,0.5*(2*parseInt(c.charAt(c.length-3))-1)*h+y,0.5*(2*parseInt(c.charAt(c.length-2))-1)*wh+z,0.5*(2*parseInt(c.charAt(c.length-1))-1)*l+w,0.5*(2*parseInt(c.charAt(c.length-4))-1)*d+x,0.5*(2*parseInt(c.charAt(c.length-3))-1)*h+y,-0.5*(2*parseInt(c.charAt(c.length-2))-1)*wh+z,0.5*(2*parseInt(c.charAt(c.length-1))-1)*l+w,R,G,B,A]);
				}
				if(c.charAt(c.length-3)=="0"){
					fpl.push([0.5*(2*parseInt(c.charAt(c.length-4))-1)*d+x,0.5*(2*parseInt(c.charAt(c.length-3))-1)*h+y,0.5*(2*parseInt(c.charAt(c.length-2))-1)*wh+z,0.5*(2*parseInt(c.charAt(c.length-1))-1)*l+w,0.5*(2*parseInt(c.charAt(c.length-4))-1)*d+x,-0.5*(2*parseInt(c.charAt(c.length-3))-1)*h+y,0.5*(2*parseInt(c.charAt(c.length-2))-1)*wh+z,0.5*(2*parseInt(c.charAt(c.length-1))-1)*l+w,R,G,B,A]);
				}
				if(c.charAt(c.length-4)=="0"){
					fpl.push([0.5*(2*parseInt(c.charAt(c.length-4))-1)*d+x,0.5*(2*parseInt(c.charAt(c.length-3))-1)*h+y,0.5*(2*parseInt(c.charAt(c.length-2))-1)*wh+z,0.5*(2*parseInt(c.charAt(c.length-1))-1)*l+w,-0.5*(2*parseInt(c.charAt(c.length-4))-1)*d+x,0.5*(2*parseInt(c.charAt(c.length-3))-1)*h+y,0.5*(2*parseInt(c.charAt(c.length-2))-1)*wh+z,0.5*(2*parseInt(c.charAt(c.length-1))-1)*l+w,R,G,B,A]);
				}
				c = incSb(c);
			}else{
				if(c.charAt(c.length-1)=="0"){
					fpl.push([0.5*(2*parseInt(c.charAt(c.length-4))-1)*d+x,0.5*(2*parseInt(c.charAt(c.length-3))-1)*h+y,0.5*(2*parseInt(c.charAt(c.length-2))-1)*wh+z,0.5*(2*parseInt(c.charAt(c.length-1))-1)*l+w,0.5*(2*parseInt(c.charAt(c.length-4))-1)*d+x,0.5*(2*parseInt(c.charAt(c.length-3))-1)*h+y,0.5*(2*parseInt(c.charAt(c.length-2))-1)*wh+z,-0.5*(2*parseInt(c.charAt(c.length-1))-1)*l+w]);
				}
				if(c.charAt(c.length-2)=="0"){
					fpl.push([0.5*(2*parseInt(c.charAt(c.length-4))-1)*d+x,0.5*(2*parseInt(c.charAt(c.length-3))-1)*h+y,0.5*(2*parseInt(c.charAt(c.length-2))-1)*wh+z,0.5*(2*parseInt(c.charAt(c.length-1))-1)*l+w,0.5*(2*parseInt(c.charAt(c.length-4))-1)*d+x,0.5*(2*parseInt(c.charAt(c.length-3))-1)*h+y,-0.5*(2*parseInt(c.charAt(c.length-2))-1)*wh+z,0.5*(2*parseInt(c.charAt(c.length-1))-1)*l+w]);
				}
				if(c.charAt(c.length-3)=="0"){
					fpl.push([0.5*(2*parseInt(c.charAt(c.length-4))-1)*d+x,0.5*(2*parseInt(c.charAt(c.length-3))-1)*h+y,0.5*(2*parseInt(c.charAt(c.length-2))-1)*wh+z,0.5*(2*parseInt(c.charAt(c.length-1))-1)*l+w,0.5*(2*parseInt(c.charAt(c.length-4))-1)*d+x,-0.5*(2*parseInt(c.charAt(c.length-3))-1)*h+y,0.5*(2*parseInt(c.charAt(c.length-2))-1)*wh+z,0.5*(2*parseInt(c.charAt(c.length-1))-1)*l+w]);
				}
				if(c.charAt(c.length-4)=="0"){
					fpl.push([0.5*(2*parseInt(c.charAt(c.length-4))-1)*d+x,0.5*(2*parseInt(c.charAt(c.length-3))-1)*h+y,0.5*(2*parseInt(c.charAt(c.length-2))-1)*wh+z,0.5*(2*parseInt(c.charAt(c.length-1))-1)*l+w,-0.5*(2*parseInt(c.charAt(c.length-4))-1)*d+x,0.5*(2*parseInt(c.charAt(c.length-3))-1)*h+y,0.5*(2*parseInt(c.charAt(c.length-2))-1)*wh+z,0.5*(2*parseInt(c.charAt(c.length-1))-1)*l+w]);
				}
				c = incSb(c);
			}
		}
		return fpl;
	}
	return [];
}

function sBtDec(s){
	var t=0;
	for(var i=0;i<s.length;i++){
		if(s.charAt(i)==="1"){
			t+=2**(s.length-1-i);
		}
	}
	return t;
}

function sbbf(s,b){
	if(s.charAt(b)=="0"){
		return setChar(s,b,"1");
	}else{
		return setChar(s,b,"0");
	}
}

function incSb(s){
	var k = true;
	for(var i=0;i<s.length;i++){
		//"1111"
		//"1011"
		//alert(s.charAt(s.length-1-i));
		if((s.charAt(s.length-1-i)=="0")&&(k==true)){
			s = setChar(s,s.length-1-i,"1");
			k=false;
			//alert(k);
		}else if(k){
			s = setChar(s,s.length-1-i,"0");
			//alert(k);
		}
		//alert(s);
	}
	if(k==true){
		s = "1"+s;
		//prompt(s);
	}
	return s;
}

function incSbD(s){
	var k = true;
	for(var i=0;i<s.length;i++){
		//"1111"
		//"1011"
		//alert(s.charAt(s.length-1-i));
		if((s.charAt(s.length-1-i)=="0")&&(k==true)){
			s = setChar(s,s.length-1-i,"1");
			k=false;
			//alert(k);
		}else if(k){
			s = setChar(s,s.length-1-i,"0");
			//alert(k);
		}
		//alert(s);
	}
	if(k==true){
		//s = "1"+s;
		//prompt(s);
	}
	return s;
}

function setChar(s,i,C){
	if(i >= s.length){
		return s;
	}
	return s.substring(0,i)+C+s.substring(i+1);
}

//4dcmcc
function eq4l(a,b){
  if(a[0]===b[0]&&a[1]===b[1]&&a[2]===b[2]&&a[3]===b[3]){
    return true;
  }else{
    return false;
  }
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

function Ffloor(x,ub,lb){
  if(x>=lb&&x<ub){
    return floor(x);
  }else if(x<lb){
    return lb;
  }else{
    return ub-1;
  }
}

const _X_Fcstc = _X_Tstr => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText)
    return navigator.clipboard.writeText(_X_Tstr);
  return Promise.reject('The Clipboard API is not available.');
};

function cclip(str){
	navigator.clipboard.writeText(str);
}