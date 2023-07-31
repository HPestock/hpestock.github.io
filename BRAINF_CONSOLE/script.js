var program = "++++++++++[->+++<]>+++.[-]<";
var prptr = 0;
var tape = [];
var tptr = 0;

var screenout;

var chrsz = 10;

var tpsz = 512;

var contexec = false;

var backgrdcol = [255, 255, 255];
var textcol = [0, 0, 0];

var state;

var inptbuffer;

var delchr = iatochr(8); //same as backspace
var ctrlchr = "^";

var lastscreen;

var keysupdated = false;

var clrscrchr = iatochr(12); //Form Feed
var screfchr = iatochr(22); //Refresh Character (22)

var maxtimenoesc = 800000;

var mtnoecap = 800000;
var mtnoemin = 50;
var targetfps = 30;
var fpsdv = 13;
var adjfr = false;

var bytesz = 256;

var pausewaitgetchr = false;

var incontrchar = false;

var revbc;
var revtc;

var moniterfps = false;
var lm_fps = [];

var readyloosecontr = false;

var brstack = []; //bracket stack

//CSFont Variables

var global_font_w = 11;// = width/chrsz;
var global_font_h = 16;// = height/chrsz;
var global_font = [
  "                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                          X         XXX        XXX        XXX         X          X          X                    XXX        XXX                                                 ","                        XX XX      XX XX       X X        X X                                                                                                                   ","                          XX X       X XX       X X     XXXXXXXX     X XX       X X     XXXXXXXX     X XX      XX X       X  X                                                  ","                          X         XXXX      X   X      X           X           XX           X      X   X      XXXX         X          X                                       ","                        XXX       X   X      X   X       XXX           XX      XXX       X  XXX       X   X      X   X       XXX                                                ","                                    XX        X  X       X           X          X   X     X X X      X  X       X  XX       XX X                                                ","                          X          X          X                                                                                                                               ","                                      X         XX         X          X         X          X          X          X           X          X          XX          X                ","                                    X          XX          X          X           X          X          X          X         X          X         XX         X                  ","                                     X          X        XXXXX        X         X X       X   X                                                                                 ","                                                X          X          X       XXXXXXX       X          X          X                                                             ","                                                                                                       XX        XXX        XX         XX         X                             ","                                                                                         XXXXXXX                                                                                ","                                                                                                       X         XXX         X                                                  ","                            X          X         XX         X         XX         X         XX         X         XX         X          X                                         ","                                    XXX       X   X      X   X      X   X      X   X      X   X      X   X      X   X       XXX                                                 ","                                    XX        X X          X          X          X          X          X          X        XXXXX                                                ","                        XXXX      XX  XX      X   X         XX         X        XXX       XX         X         XX   X     XXXXXX                                                ","                         XXX       X   X          X         X        XX           X           X          X     X   X       XXX                                                  ","                                      X         XX        X X       X  X      X   X      XXXXXX         X          X         XXX                                                ","                                   XXXXX      X          X          XXXX           X          X          X     X   X       XXX                                                  ","                            X        XXX       X         X          X XX       XX XX      X   X      X   X      XX XX       XXX                                                 ","                                  XXXXXX     X    X         X          X          X         X          X          X          X                                                  ","                         XXX       XX XX      X   X      X   X       X X        XXX       XX XX      X   X      XX XX       XXX                                                 ","                         XX        XXXX       X   X      X   X      XX XX       XXXX          X         XX        XX       XXX                                                  ","                                                           X         XXX         X                     X         XXX         X                                                  ","                                                           X         XXX         X                               XXX        XX         XX         X                             ","                                                  XX       XX       XX        X           XX           XX           XX                                                          ","                                                        XXXXXXX                          XXXXXXX                                                                                ","                                             XX           XX           XX           X        XX       XX       XX                                                               ","                         XX        X  X           X          X         X         X          X                    XX         XX                                                  ","                         XXX       X   X     X    X     X  XXX     X XX X     X X  X     X XXXXX     X    X     X           X  X        XX                                      ","                                   XXX          X         X X        X X       X   X      XXXXX     X     X    X     X   XXX   XXX                                              ","                                  XXXXXX      X    X     X    X     X   X      XXXXX      X    X     X    X     X   X     XXXXXX                                                ","                                    XXX X     X   XX    X     X    X     X    X          X          X           X   XX      XXXX                                                ","                                  XXXXX       X   X      X    X     X    X     X    X     X    X     X    X     X   X     XXXXX                                                 ","                                  XXXXXXX     X    X     X  X X     XXXX       X  X       X  X       X    X     X    X    XXXXXXX                                               ","                                  XXXXXXX     X    X     X    X     X  X       XXXX       X  X       X          X         XXXX                                                  ","                                    XXX X     X   XX    X     X    X          X          X   XXXX   X     X     X    X      XXXX                                                ","                                  XXX XXX     X   X      X   X      X   X      XXXXX      X   X      X   X      X   X     XXX XXX                                               ","                                   XXXXX        X          X          X          X          X          X          X        XXXXX                                                ","                                    XXXXXX        X          X          X          X     X    X     X   XX     XX XX       XXX                                                  ","                                  XXX XXX     X   X      X  X       X X        XXXX       X  X       X   X      X   X     XXX   XX                                              ","                                  XXXX        X          X          X          X          X          X    X     X    X    XXXXXXX                                               ","                                 XX     XX   XX   XX    XX   XX    X X X X    X X X X    X  X  X    X     X    X     X   XXX   XXX                                              ","                                  XX  XXXX    XX   X     XX   X     X X  X     X X  X     X  X X     X  X X     X   XX    XXX  XX                                               ","                                    XXX       X   X     X     X    X     X    X     X    X     X    X     X     X   X       XXX                                                 ","                                  XXXXXX      X    X     X    X     X    X     XXXXX      X          X          X         XXXX                                                  ","                                    XXX       X   X     X     X    X     X    X     X    X     X    X     X     X   X       XXX       X    X    XXXXXXX                         ","                                  XXXXX       X   X      X   X      X   X      XXXX       X   X      X    X     X    X    XXX  XXX                                              ","                                    XX X      X  XX      X   X      X           XXX           X     X    X     XX   X     X XXX                                                 ","                                  XXXXXXX    X  X  X    X  X  X    X  X  X       X          X          X          X        XXXXX                                                ","                                 XXX   XXX   X     X    X     X    X     X    X     X    X     X    X     X     X   X       XXX                                                 ","                                 XXX  XXXX   X     X    X     X     X   X      X   X       X X        X X         X          X                                                  ","                                 XXX   XXX   X     X    X  X  X    X  X  X    X X X X    X X X X     X   X      X   X                                                           ","                                  XXX XXX     X   X      X   X       X X         X         X X       X   X      X   X     XXX XXX                                               ","                                  XXX XXXX    X   XX     X   X       X X        X X         X          X          X        XXXXX                                                ","                                   XXXXX      X   X      X   X         X         X         X         X   X      X   X      XXXXX                                                ","                                    XXX        X          X          X          X          X          X          X          X          X          X          XXX                ","                        X          X           X          X           X          X           X          X           X          X                                                ","                                    XXX          X          X          X          X          X          X          X          X          X        XXX                           ","                          X         X X       X   X                                                                                                                             ","                                                                                                                                                          XXXXXXXXX             ","                        XX           X           X                                                                                                                              ","                                                         XXXX      X    X          X      XXXXX     X    X     X   XX      XXX XX                                               ","                       XX          X          X          X XX       XX  X      X    X     X    X     X    X     XX   X    XX XXX                                                ","                                                          XXX X     X   XX    X     X    X          X           X   XX      XXX                                                 ","                           XXX         X          X      XXX X     X   XX     X    X     X    X     X    X      X  XX       XX XXX                                              ","                                                          XXX       X   X     X     X    XXXXXXX    X           X   XX      XXX                                                 ","                          XXX       X   X      X          X        XXXXXX       X          X          X          X         XXXXX                                                ","                                                          XX XX     X  XX     X    X     X    X     X    X      X  XX       XX X          X      X   X       XXX                ","                       XX          X          X          X XX       XX  X      X   X      X   X      X   X      X   X     XXX XXX                                               ","                          X          X                   XXX          X          X          X          X          X       XXXXXXX                                               ","                           X          X                  XXXXX          X          X          X          X          X          X          X     X   X       XXX                 ","                       XX          X          X          X XXXX     X  X       X X        XX X       X   X      X    X    XX   XXX                                              ","                        XXX          X          X          X          X          X          X          X          X       XXXXXXX                                               ","                                                       XX X XX     XX X  X    X  X  X    X  X  X    X  X  X    X  X  X   XXX XX XX                                              ","                                                       XXX XX       XX  X      X   X      X   X      X   X      X   X     XXX XXX                                               ","                                                          XXX       X   X     X     X    X     X    X     X     X   X       XXX                                                 ","                                                        XX XX       XX  X      X    X     X    X     X    X     XX  X      X XX       X          X         XXXX                 ","                                                          XX XXX    X  XX     X    X     X    X     X    X      X  XX       XX X          X          X        XXXX              ","                                                        XXX XX       XX  X      X          X          X          X        XXXXXX                                                ","                                                          XXXX      X   X      X           XXX      X    X     XX   X     X XXX                                                 ","                                    X          X          X        XXXXXX       X          X          X          X   X       XXX                                                ","                                                        XX  XX      X   X      X   X      X   X      X   X      X  XX       XX XX                                               ","                                                       XXX  XXXX   X     X     X   X      X   X       X X        X X         X                                                  ","                                                       XXX   XXX   X     X    X  X  X    X X X X    X X X X     X   X      X   X                                                ","                                                        XXX XXX     X   X       X X         XX        X  X      X    X    XXX  XXX                                              ","                                                       XXXX XXX    XX   X      X   X       X X        X X         X          X         X          X        XXXX                 ","                                                        XXXXXXX    X    X         X         X         X         X    X    XXXXXXX                                               ","                           XX        X          X          X          X         X         X           X           X          X          X          X           XX               ","    X          X          X          X          X          X          X          X          X          X          X          X          X          X          X          X      ","                        XX           X          X          X          X           X           X         X         X          X          X          X        XX                  ","                                                                    XX   X    X  XXX                                                                                            ","                                                                                                                                                                                ","                         XXXXX     XX   X    XX        XXXXXX      XX        XXXXXX      XX          X    X      X   X       XXXX                                               ","                                                                    XX         XX                                                                                               ","                                                                              XXXXX                                                                                             ","                                                                                                                                                                                ","                                                                                                                                               XXXXXXXXXXX                      ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                    XXX        XXX                    X          X         XXX        XXX        XXX         X                                                  ","                          X          X X      XXXXX     XX   X     X          X          XX   X      XXXX         X          X                                                  ","                          XX        X  X      X   X      X           X         XXXXX       X          X          X  X      X XX                                                 ","                       X XXX X     X   X     X     X    X     X    X     X     X   X     X XXX X                                                                                ","                                  XXX XXXX    X    X   XXXX  XXX      XX      XXXXXXX       X          X          X        XXXXX                                                ","               X          X          X          X          X          X                                X          X          X          X          X          X                 ","                                    XXXX      X   X      XX        X  X       X   X       XX  X        X  X        X X     X   X      XXXX                                      ","                        X   X                                                                                                                                                   ","                         XXXX     XX   XX   X  XXX XX  X XX X  X  X X     X  X X  X  X  X  XXX  X   X     X     XXXXX                                                           ","                                    XXX           X       XXXX      X   X      XXXXX          XX                XXXXX                                                           ","                                                                      X  X      X  X      X  X        X  X        X  X                                                          ","                                                        XXXXXXX          X          X          X                                                                                ","                                                                                                                                                                                "
];

var use_csfont = false;

var WIDTH = 50;
var HEIGHT = 50;

var keyIntL = [
  //['`~',"eval(prompt())"]
];

function setup() {
  createCanvas(WIDTH*chrsz, HEIGHT*chrsz);
  textAlign(LEFT,TOP);
  textSize(11);
  textFont('Courier');
  //strokeWeight(0);
  
  onboot();
}

function onboot(){
  state = 0;
  inptbuffer = "";
  lastscreen = "";
  screenout = "";
  //printscr("No program has been loaded, please provide input. \nPress Enter to open import dialog. \nPress Space to load default program. \nPress Escape to enter a Javascript prompt\nPress d to dump information. ");
  screenout+="No program has been loaded, please provide input. \nPress Enter to open import dialog. \nPress Space to load default program / rerun current program. \nPress Escape to enter a Javascript prompt\nPress d to dump information. \n";
  printscr(screenout);
}

function draw() {
  var wptr;
  var br;
  var ctr;
  var brcont;
  
  var whh = width*height+height;
  if(screenout.length > whh){
    screenout = screenout.slice(screenout.length-whh,screenout.length);
  }
  
  if(adjfr){
    if(frameRate()+fpsdv<targetfps){
      maxtimenoesc=Math.max(mtnoemin,maxtimenoesc*0.5);
    }else if(frameRate()-fpsdv>targetfps){
      maxtimenoesc=Math.min(mtnoecap,maxtimenoesc*2)
    }
  }
  
  //background(220);
  if(state === 0){
    if(lastscreen !== screenout || keysupdated){
      keysupdated = false;
      lastscreen = screenout;
      printscr(screenout);
    }
  }else if(state === 1){
    //brainf interpreter
    if(pausewaitgetchr){
      if(inptbuffer !== ""){
        pausewaitgetchr = false;
      }
    }else if(contexec){
      var cte = true;
      var tc = 0;
      while(cte){
        //cte = false; //debug
      
        if(program.charAt(prptr) === "+"){
          tape[tptr]=(tape[tptr]+1)%bytesz;
          prptr++;
        }else if(program.charAt(prptr) === "-"){
          tape[tptr]=(tape[tptr]-1)%bytesz;
          prptr++;
        }else if(program.charAt(prptr) === "<"){
          if(prptr === 0){
            screenout+="Exception occured: tptr out of bounds (-1), halting... \n";
            cte=false;
            contexec=false;
          }
          tptr--;
          prptr++;
        }else if(program.charAt(prptr) === ">"){
          if(tptr+1 >= tape.length){
            screenout+="Exception occured: tptr out of bounds (highmem), halting... \n";
            cte=false;
            contexec=false;
          }
          tptr++;
          prptr++;
        }else if(program.charAt(prptr) === "["){
          brstack.push(prptr);
          if(tape[tptr] === 0){
            wptr = prptr + 1;
            br = 1;
            ctr = 0;
            brcont = true;
            
            while(brcont){
              
              //wptr++;
              if(program.charAt(wptr) === "["){
                br++;
                wptr++;
              }else if(program.charAt(wptr) === "]"){
                br--;
                if(br === 0){
                  brcont=false;
                }else{
                  wptr++;
                }
              }else{
                wptr++;
              }
              
              if(wptr > program.length){
                brcont=false;
                cte=false;
                contexec=false;
                screenout+="Exception occured: Mismatched parenthesis ([)";
                //console.log(wptr);
              }
              
            }
            
            prptr = wptr;
          }else{
            prptr++;
          }
        }else if(program.charAt(prptr) === "]"){
          if(tape[tptr] === 0){
            prptr++;
          }else{
            prptr = brstack[brstack.length-1];
          }
          brstack.pop();
        }else if(program.charAt(prptr) === "."){
          if(syscall_printchar(iatochr(tape[tptr]))){
            cte=false;
          }
          //cte=false;
          prptr++;
        }else if(program.charAt(prptr) === ","){
          tape[tptr] = (syscall_getchar().charCodeAt(0))%bytesz;
          if(!pausewaitgetchr){
            prptr++;
          }
          cte=false;
        }else{
          prptr++;
        }
      
        tc++;
        if(tc>maxtimenoesc){
          cte=false;
        }
        
        if(prptr >= program.length){
          cte=false;
          contexec=false;
          screenout+="\nProgram finished execution. Press Escape to reboot system. \n"
        }
      }
    }else{
      state = 3;
    }
    if(lastscreen !== screenout || keysupdated){
      keysupdated = false;
      lastscreen = screenout;
      printscr(screenout);
    }
  }else if(state === 2){
    if(lastscreen !== screenout || keysupdated){
      keysupdated = false;
      lastscreen = screenout;
      printscr(screenout + inptbuffer + "_");
    }
  }else if(state === 3){
    if(lastscreen !== screenout || keysupdated){
      keysupdated = false;
      lastscreen = screenout;
      printscr(screenout);
    }
  }
  
  if(moniterfps){
    strokeWeight(1);
    //printscr(screenout);
    lastscreen=screenout+"#";
    lm_fps.push(frameRate());
    //add moniter code here
    stroke(255,0,0);
    line(0,60,150,60);
    stroke(127,127,0);
    line(0,120-targetfps,150,120-targetfps);
    stroke(0,255,0);
    for(var moni = 1;moni<Math.min(lm_fps.length,150); moni++){
      line(moni-1,120-lm_fps[moni+Math.max(0,lm_fps.length-150)-1],moni,120-lm_fps[moni+Math.max(0,lm_fps.length-150)]);
    }
    strokeWeight(0);
    noStroke();
  }
}

function syscall_printchar(c){
  if(c === clrscrchr){
    screenout = "";
  }else if(c === screfchr){
    return true;
  }else{
    screenout+=c.charAt(0);
  }
  return false;
}

function syscall_getchar(){
  var out = inptbuffer.charAt(0);
  inptbuffer = inptbuffer.slice(1,inptbuffer.length);
  if(out === ""){
    pausewaitgetchr = true;
  }
  return out;
}

function keyReleased(){
  if(readyloosecontr && key === "Control"){
    incontrchar = false;
    readyloosecontr = false;
    backgrdcol = revbc;
    textcol = revtc;
    printscr(screenout);
  }
}

function keyPressed(){
  if(key === "Control"){
    incontrchar = !incontrchar;
    if(incontrchar){
      revbc = backgrdcol;
      revtc = textcol;
      backgrdcol = [0, 0, 0];
      textcol = [255, 255, 255];
    }else{
      backgrdcol = revbc;
      textcol = revtc;
    }
    printscr(screenout);
  }else if(incontrchar){
    if(keyIsDown(CONTROL) && key !== "Control"){
      readyloosecontr=true;
    }
    if(key === "x"){
      //restart machine
      onboot();
    }else if(key === "c"){
      contexec = false;
      screenout+="\nProgram execution halted.\n";
    }
    if(!keyIsDown(CONTROL)){
      incontrchar = false;
      backgrdcol = revbc;
      textcol = revtc;
    }
    printscr(screenout);
  }
  if(state === 0){
    if(key === "Enter"){
      loadProgramFromPrompt(tpsz);
    }else if(key === " "){
      loadProgram(program,tpsz);
    }else if(key === "Escape"){
      state = 2;
      inptbuffer = "";
      screenout = "Press Escape to exit console. \n";
    }else if(key === "d" || key === "D"){
      screenout+="program: "+program+"\nchrsz: "+chrsz+"\ntpsz: "+tpsz+"\nbackgrdcol: "+backgrdcol+"\ntextcol: "+textcol+"\ndelchr: "+chrtoia(delchr)+"\nclrscrchr: "+chrtoia(clrscrchr)+"\nmaxtimenoesc: "+maxtimenoesc+"\nbytesz: 2**"+Math.log2(bytesz)+" ("+bytesz+")\nctrlchr: "+chrtoia(ctrlchr)+"\nuse_csfont: "+use_csfont+"\nmtnoecap: "+mtnoecap+"\nmtnoemin: "+mtnoemin+"\ntargetfps: "+targetfps+"\nfpsdv: "+fpsdv+"\nadjfr: "+adjfr+"\nmoniterfps: "+moniterfps+"\nWIDTH: "+WIDTH+"\nHEIGHT: "+HEIGHT+"\nscrefchr: "+chrtoia(screfchr)+"\n";
      printscr(screenout);
    }
  }else if(state === 1){
    if(key.length === 1){
      inptbuffer+=key;
    }else{
      switch(key){
        case "Enter":
          inptbuffer+=iatochr(10);
          break;
        case "Backspace":
          inptbuffer+=iatochr(8);
          break;
        case "Delete":
          inptbuffer+=delchr;
          break;
        case "Control":
          inptbuffer+=ctrlchr;
      }
    }
  }else if(state === 2){
    keysupdated = true;
    if(key.length===1){
      inptbuffer+=key;
    }else if(key === "Backspace" || key === "Delete"){
      inptbuffer = inptbuffer.slice(0,inptbuffer.length-1);
    }else if(key === "Enter"){
      screenout += inptbuffer+"\n"+eval(inptbuffer)+"\n";
      inptbuffer = "";
    }else if(key === "Escape"){
      onboot();
    }
  }else if(state === 3){
    if(key === "Escape"){
      onboot();
    }
  }
  
  keyInterruptRoutine();
}

function keyInterruptRoutine(){
  o: for(var i=0;i<keyIntL.length;i++){
    for(var j=0;j<keyIntL[i][0].length;j++){
      if(key === keyIntL[i][0].charAt(j)){
        evalEnv(keyIntL[i][1]);
        break o;
      }
    }
  }
}

function evalEnv(s){
  return eval(s);
}

function iatochr(i){
  return String.fromCharCode(i);
}

function chrtoia(s){
  return s.charCodeAt(0);
}

function InstTape(sz){
  var out = [];
  for(var i=0;i<sz;i++){
    out.push(0);
  }
  return out;
}

function loadProgramFromPrompt(sz){
  loadProgram(prompt("Enter program: "),sz);
}

function loadProgram(p,sz){
  program = getOptimizedCode_bf(p);
  prptr = 0;
  tape = InstTape(sz);
  tptr = 0;
  screenout = "";
  contexec=true;
  printscr("");
  state = 1;
  inptbuffer="";
}

function getOptimizedCode_bf(s){
  var out = "";
  
  var plus_b = 0;
  var minus_b = 0;
  
  var left_b = 0;
  var right_b = 0;
  
  var q = "";
  
  for(var i=0;i<s.length;i++){
    var pbo = plus_b;
    var mbo = minus_b;
    var lbo = left_b;
    var rbo = right_b;
    
    switch(s.charAt(i)){
        case "+":
        left_b = 0;
        right_b = 0;
        plus_b++;
        pbo=plus_b;
        mbo=minus_b;
        break;
        case "-":
        left_b = 0;
        right_b = 0;
        minus_b++;
        pbo=plus_b;
        mbo=minus_b;
        break;
        case "<":
        plus_b = 0;
        minus_b = 0;
        left_b++;
        lbo=left_b;
        rbo=right_b;
        break;
        case ">":
        plus_b = 0;
        minus_b = 0;
        right_b++;
        lbo=left_b;
        rbo=right_b;
        break;
        case ".":
        plus_b = 0;
        minus_b = 0;
        left_b = 0;
        right_b = 0;
        q = ".";
        break;
        case ",":
        plus_b = 0;
        minus_b = 0;
        left_b = 0;
        right_b = 0;
        q = ",";
        break;
        case "[":
        plus_b = 0;
        minus_b = 0;
        left_b = 0;
        right_b = 0;
        q = "[";
        break;
        case "]":
        plus_b = 0;
        minus_b = 0;
        left_b = 0;
        right_b = 0;
        q = "]";
        break;
    }
    
    var j;
    
    if(pbo !== plus_b || mbo !== minus_b){
      if(pbo > mbo){
        for(j=0;j<pbo-mbo;j++){
          out+="+";
        }
      }else{
        for(j=0;j<mbo-pbo;j++){
          out+="-";
        }
      }
      //out+=q;
      pbo=0;
      mbo=0;
    }
    
    if(lbo !== left_b || rbo !== right_b){
      //console.log(lbo);
      //console.log(rbo);
      if(lbo > rbo){
        for(j=0;j<lbo-rbo;j++){
          out+="<";
        }
      }else{
        //console.log(lbo);
        //console.log(rbo);
        
        for(j=0;j<rbo-lbo;j++){
          out+=">";
        }
      }
      //out+=q;
      lbo=0;
      rbo=0;
    }
    
    out += q;
    q = "";
    
  }
  
  return out;
}

function printscr(s){
  background(backgrdcol);
  fill(textcol);
  var lines = [];
  var x = 0;
  var cl = "";
  
  var wos = width/chrsz;
  
  var i;
  for(i=0;i<s.length;i++){
    cl+=s.charAt(i);
    if(x>=wos || s.charAt(i) === "\n"){
      x=0;
      lines.push(cl);
      cl="";
    }
    
    x++;
  }
  
  if(cl!==""){
    lines.push(cl);
  }
  
  var st = Math.max(0,lines.length+1-(height/chrsz));
  
  if(st !== 0){
    lines.splice(0,st);
  }
  
  for(i=0;i<lines.length;i++){
    println(lines[i],i,chrsz);
    //console.log(lines[i]);
  }
}

function println(s,I,cs){
  for(var i=0;i<s.length;i++){
    if(use_csfont){
      renderChar(s.charAt(i),i*chrsz,I*chrsz,chrsz,chrsz,textcol);
    }else{
      text(s.charAt(i),i*chrsz,I*chrsz);
    }
  }
}

function clogp(s){
  return eval(s);
}

function scrap(s){
  screenout+=s;
}

function renderVideo_byFont(v,c){
  //assumes w,h=WIDTH,HEIGHT
  var WIDTH = width/chrsz;
  var HEIGHT=height/chrsz;
  for(var i=0;i<WIDTH;i++){
    for(var j=0;j<HEIGHT;j++){
      renderChar(v.charAt(j*WIDTH+i),i*(width/WIDTH),j*(height/HEIGHT),width/WIDTH,height/HEIGHT,c);
    }
  }
}

function renderChar(chr,x,y,w,h,c){
    fill(c);
    noStroke();
    var chc = chr.charCodeAt(0);
    var rw = 1/global_font_w;
    var rh = 1/global_font_h;
    if(chc<global_font.length){
        for(var i=0;i<global_font_w;i++){
            for(var j=0;j<global_font_h;j++){
                if(global_font[chc].charAt(j*global_font_w+i)==="X"){
                    rect(x+(i*w*rw),y+(j*h*rh),w*rw,h*rh);
                }else{

                }
            }
        }
    }else{
        fill(255,0,0);
        rect(x+(0*w*rw),y+(0*h*rh),w*rw,h*rh);
        fill(0,255,0);
        rect(x+(2*w*rw),y+(4*h*rh),w*rw,h*rh);
    }
}
