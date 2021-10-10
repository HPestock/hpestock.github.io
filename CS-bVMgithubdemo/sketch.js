var memory;
var SP;
var PC;
var PCRET;
var w = 800;
var h = 600;
var i;
var j;
var stack;

var kdown;
var mdown;

var program = [];

var flag_cmp;

//insts
var NOP = 0x0000;
var PUSH = 0x0001; // (VALUE)
var PUSHM = 0x0004; // (MEMORY LOCATION) push memory
var POP = 0x0002; // (STACK NUMBER)
var CLRST = 0x0003; // clear stack
var MSM = 0x0005; // (STACK NUMBER), (MEMORY LOCATION)
var ADDT = 0x0006; // ADD stack[SP.length - 2] and stack[SP.length - 3]
var SUB = 0x0007;
var MULT = 0x0008;
var DIV = 0x0009;
var MOD = 0x000A;
var DRAW = 0x000B; // SP-4, SP-3, SP-2, SP-1, SP X,Y,R,G,B,S
var JMP = 0x000C; // (MEMLOC)
var JSR = 0x000D; // (MENLOC) {ALSO SAVES CUR PC TO PCRET}
var RTS = 0x000E;
var CMPEQ = 0x000F;
var CMPNEQ = 0x0010;
var CMPGT = 0x0011;
var CMPGE = 0x0012;
var CMPLT = 0x0013;
var CMPLE = 0x0014;
var BIP = 0x0015;
var HALT = 0xFFFF;
//MOVRM
//MOVMR

function setup() {
	createCanvas(w,h);
	valset();
	//memory[2] = 99;
	program = prompt("enter semi-/compiled program");
	program = program.split(', ');
	for(var i=0; i < program.length; i++){
		program[i] = eval(program[i]);
		memory[i + 600] = program[i];
	}
 background(0);
}
//CLRST, PUSH, 1, PUSH, 1, PUSH, 255, PUSH, 0, PUSH, 5, PUSH, 3, DRAW, CLRST, PUSH, 1, PUSH, 1, PUSH, 0, PUSH, 255, PUSH, 5, PUSH, 3, DRAW, JMP, 600
function valset(){
	SP = -1;
	PC = 600;
	PCRET = 600;
	memory = [];
	for(i=0;i<0xffff;i++){
		memory.push(0x0);
	}
	stack = [];
	flag_cmp = 0;
	key = String.fromCharCode(0);
	memory[0xfffb] = 0;
	memory[0xfffa] = 0;
	memory[0xfff9] = 0;
	memory[0xfff8] = 0;
}

function mousePressed(){
	mdown = 1;
}
function mouseReleased(){
	mdown = 0;
}

function keyPressed(){
	kdown = 1;
}
function keyReleased(){
	kdown = 0;
}

function draw() {
	noStroke();
	memory[0xffff] = key.charCodeAt(0);
	memory[0xfffe] = key;
	memory[0xfffd] = Math.floor(Math.random() * 0x10000);
	memory[0xfffc] = Math.floor(Math.random() * 2);
	memory[0xfffb] = mdown;
	memory[0xfffa] = kdown;
	memory[0xfff9] = mouseY;
	memory[0xfff8] = mouseX;
	if(memory[PC] == NOP){
		if(PC<1000){PC+=1;}
	}
	if(memory[PC] == PUSH){
		stack.push(memory[PC + 1]);
		SP+=1;
		if(PC<1000){PC+=2;}
	}
	if(memory[PC] == POP){
		stack.splice(stack.length - memory[PC + 1] - 1, 1);
		SP-=1;
		if(PC<1000){PC+=2;}
	}
	if(memory[PC] == CLRST){
		stack = [];
		SP=-1;
		if(PC<1000){PC+=1;}
	}
	if(memory[PC] == PUSHM){
		stack.push(memory[memory[PC + 1]]);
		SP+=1;
		if(PC<1000){PC+=2;}
	}
	if(memory[PC] == MSM){
		//SN, ML
		memory[memory[PC + 2]] = stack[stack.length - memory[PC + 1] - 1];
		if(PC<1000){PC+=3;}
	}
	if(memory[PC] == ADDT){
		stack.push(stack[SP - 1] + stack[SP]);
		SP-=1;
		stack.splice(SP, 2);
		if(PC<1000){PC+=1;}
	}
	if(memory[PC] == SUB){
		stack.push(stack[SP - 1] - stack[SP]);
		SP-=1;
		stack.splice(SP, 2);
		if(PC<1000){PC+=1;}
	}
	if(memory[PC] == MULT){
		stack.push(stack[SP - 1] * stack[SP]);
		SP-=1;
		stack.splice(SP, 2);
		if(PC<1000){PC+=1;}
	}
	if(memory[PC] == DIV){
		stack.push(stack[SP - 1] / stack[SP]);
		SP-=1;
		stack.splice(SP, 2);
		if(PC<1000){PC+=1;}
	}
	if(memory[PC] == MOD){
		stack.push(stack[SP - 1] % stack[SP]);
		SP-=1;
		stack.splice(SP, 2);
		if(PC<1000){PC+=1;}
	}
	if(memory[PC] == DRAW){
		fill(stack[SP-3], stack[SP-2], stack[SP-1]);
		rect(stack[SP-5], stack[SP-4], stack[SP], stack[SP]);
		stack.splice(SP-5, 6);
		SP-=6;
		if(PC<1000){PC+=1;}
	}
	if(memory[PC] == JMP){
		PC = memory[PC + 1];
	}
	if(memory[PC] == JSR){
		PCRET = PC + 2;
		PC = memory[PC + 1];
	}
	if(memory[PC] == RTS){
		PC = PCRET;
	}
	if(memory[PC] == CMPEQ){
		if(stack[SP - 1] == stack[SP]){ flag_cmp = 1; } else { flag_cmp = 0; }
		if(PC<1000){PC+=1;}
	}
	if(memory[PC] == CMPNEQ){
		if(stack[SP - 1] != stack[SP]){ flag_cmp = 1; } else { flag_cmp = 0; }
		if(PC<1000){PC+=1;}
		//console.log(stack);
		//console.log(SP);
	}
	if(memory[PC] == CMPGT){
		if(stack[SP - 1] > stack[SP]){ flag_cmp = 1; } else { flag_cmp = 0; }
		if(PC<1000){PC+=1;}
	}
	if(memory[PC] == CMPGE){
		if(stack[SP - 1] >= stack[SP]){ flag_cmp = 1; } else { flag_cmp = 0; }
		if(PC<1000){PC+=1;}
	}
	if(memory[PC] == CMPLT){
		if(stack[SP - 1] < stack[SP]){ flag_cmp = 1; } else { flag_cmp = 0; }
		if(PC<1000){PC+=1;}
	}
	if(memory[PC] == CMPLE){
		if(stack[SP - 1] <= stack[SP]){ flag_cmp = 1; } else { flag_cmp = 0; }
		if(PC<1000){PC+=1;}
	}
	if(memory[PC] == BIP){
		if(flag_cmp == 1){PC = memory[PC + 1]} else {if(PC<1000){PC+=2;}}
		//console.log(flag_cmp);
	}
	
	if(memory[PC] == HALT){
		
	}
}
