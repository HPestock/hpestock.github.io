//var docui = DocumentApp.getUi();
//var docbody = DocumentApp.getActiveDocument().getBody();

window.onkeydown = function (e) {
  e = e || window.event; //normalize the evebnt for IE
  var target = e.srcElement || e.target; //Get the element that event was triggered on
  var tagName = target.tagName; //get the tag name of the element [could also just compare elements]
  return !(tagName === "BODY" && e.keyCode == 32); //see if it was body and space
};

var video = "";
var clrvideo = "";
var blkvideo = "";
var videomode = "buffer";
var backgroundcol = [0, 0, 0];
var textcol = [255, 255, 255];

var machine_running = true;

var files = [
  ["boot/autoexec.sh", "rjef /quickalias/setup.ef\n"],
  [
    "boot/autoexec.ef",
    'console.log(\'AE UNCHANGED\');runcmdscript("boot/autoexec.sh");textbufferpre="CSDOS b0.46 -- Copy for development, press and test use only\\nBeta version, do not distribute. \\n\\nPlease use the help command if required and available\\n";',
  ],
  [
    "/bin/version.dat",
    "CSDOS b0.46 -- development build 19, not for public use",
  ],
  [
    "/bin/aliaslist.dat",
    ';ls:!lsdir!;test1:!clr!;test2:!rjef /bin/bac /bin/test.sh!;$:!rjef!;#:!rjef /bin/bac!;alof:!rjef /bin/alof.ef!;catof:!rjef /bin/catof.ef!;text:!rjef /bin/text.ef!;drawtest:!ejs retcmd="rjef /drawtest.ef"!',
  ],
  ["/root/userdata.dat", ""],
  [
    "/bin/help.txt",
    "lsdir [dir -- optional] - list the contents of the current directory, or [dir]\ncd [dir] - changes the current directory to [dir]\nshutdown - use 'shutdown --' to halt CSDOS\nhelp - display this dialog from /bin/help.txt\ncat [dir] - display the contents of the file [dir] in the console\nclr - clear the screen\nrjef [dir] - run the file [dir] in JavaScript from processcmd() using eval()\nejs [code] - run [code] in eval() from processcmd(), note that all blocks of spaces will be changed into a single space\nalias [aliasname] [aliascontents] - add an alias, typing [aliasname] as a command will run [aliascontents] through processcmd() with any arguments/parameters from after [aliasname] appended to the str_input for processcmd()\nreadext - open a prompt that will write contents to ext/input\necho [text] - display [text] in console\nver - display version info\n",
  ],
  [
    "/bin/test.ef",
    "function _06341_test(f){textbufferpre+=f;} _06341_test(cmdinpt[2]+'\\n')",
  ],
  ["/bin/ejs", "let p=[...cmdinpt];p.splice(0,2);eval(p.join(' '));"],
  ["/bin/ejss", "let p=[...cmdinpt];p.splice(0,1);eval(p.join(' '));"],
  ["/bin/test.sh", "clr\nrjef boot/autoexec.ef\nhelp"],
  ["/bin/bac", "runcmdscript(dirreltoab(cmdinpt[2]));"],
  [
    "/quickalias/qa.ef",
    'retcmd="rjef /quickalias/qa.ef";if(retvar===-1){retvar=0;}if(retvar===0){textbuffer="Enter alias name: "+"\\n"+keyinput+"_";if(ckeydo){if(ckey==="Enter"){placecheapfile("/quickalias/","nm.tmp",keyinput);keyinput="";retvar=1;}else if(ckey==="Backspace"){keyinput=keyinput.slice(0,keyinput.length-1);}ckeydo=false;}}else if(retvar===1){textbuffer="Enter alias contents: "+"\\n"+keyinput+"_";if(ckeydo){if(ckey==="Enter"){var _tmp=retfile("/quickalias/nm.tmp");processcmd("dealias "+_tmp);processcmd("alias "+_tmp+" "+keyinput);keyinput="";retvar=-1;retcmd="";}else if(ckey==="Backspace"){keyinput=keyinput.slice(0,keyinput.length-1);}ckeydo=false;}}',
  ],
  [
    "/quickalias/test.ef",
    'textbuffer="Press any key to continue... ";if(retcmd!=="rjef /quickalias/test.ef"){keydown=false;video=clrvideo;placetextbuffer(textbuffer);}retcmd="rjef /quickalias/test.ef";if(keydown){retcmd="";keyinput=""}',
  ],
  [
    "/quickalias/setup.ef",
    'processcmd("alias qal rjef /quickalias/qa.ef");console.log("QuickAlias Setup Complete. ");',
  ],
  [
    "/bin/restart.ef",
    'if(get_sysvar("SYS_AUTOPERSIST")){force_persist_cur_vars();}sysvars=[...sysvarsperr];sysvarnames=[...sysvarnamesperr];video="";workingdir="/";keyinput = "";keydown = false;keymr = \'\';ckey = "";ckeydo = false;textbuffer = "";textbufferpre = "";textbufferlin = "";textbufferinpt = "";retcmd = "";retvar=-1;Main();',
  ],
  [
    "/bin/text.ef",
    'var f = "";textbuffer = "";if(retvar===-1){	retvar=0;	retcmd="rjef /bin/text.ef";	keyinput="";}else{	f = retfile("/bin/text.tmp");}if(retvar===0){	if(ckeydo){		ckeydo=false;		switch(ckey){			case "Enter":				if(keyinput.charAt(0)==="+"){					f+=keyinput.slice(1)+"\\n";					keyinput="";				}else if(keyinput.charAt(0)==="e"){					retvar=1;					keyinput="";				}else if(keyinput.charAt(0)==="r"){					f=f.slice(0,f.length-1);					retvar=1;					keyinput="";				}else if(keyinput.charAt(0)==="q"){					retvar=-1;					retcmd="";					keyinput="";				}				break;			case "Backspace":				keyinput=keyinput.slice(0,keyinput.length-1);				break;		}	}}else if(retvar===1){	textbuffer+="Enter file name: \\n";	if(ckeydo){		ckeydo=false;		switch(ckey){			case "Enter":				var fda = keyinput.split("/");				var fdb = fda[fda.length-1];				fda.splice(fda.length-1,1);				placecheapfile(fda.join("/")+"/",fdb,f);				retvar=-1;				retcmd="";				keyinput="";				break;			case "Backspace":				keyinput=keyinput.slice(0,keyinput.length-1);				break;		}	}}placecheapfile("/bin/","text.tmp",f);textbuffer += f+"\\n"+keyinput+"_";',
  ],
  [
    "/bin/copy.ef",
    'var f = retfile(dirreltoab(cmdinpt[cmdinpt.length-2]));var to = dirreltoab(cmdinpt[cmdinpt.length-1]).split(\'/\');var tb = to[to.length-1];to.splice(to.length-1,1);placecheapfile(to.join("/")+"/",tb,f);',
  ],
  ["/bin/del.ef", "zerodirfile(dirreltoab(cmdinpt[cmdinpt.length-1]));"],
  ["/bin/clz.ef", 'removefile("0");'],
  ["/bin/delcl.ef", "removefile(dirreltoab(cmdinpt[cmdinpt.length-1]));"],
  ["/system/userfile.dat", "system\ninstall\nUser\nroot\n"],
  ["ext/input", "#NOFILE"],
  [
    "/bin/cmd",
    'textbufferlin = username+ccatat+machinename+ccatbar+workingdir+ccatend;    var inputln = keyinput;    if(ckeydo){      ckeydo=false;      if(ckey==="Enter"){        keyinput = "";        textbufferpre+=textbufferlin+textbufferinpt+inputln+"\\n";        processcmd(inputln);       }else if(ckey==="Backspace"||ckey==="Delete"){        keyinput = keyinput.slice(0,keyinput.length-1);      }    }      textbuffer=textbufferpre+textbufferlin+keyinput+ccatcur;',
  ],
  ["/bin/alof.ef", "alert(escform(retfile(dirreltoab(cmdinpt[2]))));"],
  [
    "/bin/catof.ef",
    'textbufferpre+=addlnbrks(escform(retfile(dirreltoab(cmdinpt[2]))))+"\\n"',
  ],
  [
    "/SSL10/setup.ef",
    'processcmd("alias ssllock rjef /SSL10/lock.ef");placecheapfile("/SSL10/","header.dat","Please enter your username and password: \\n");placecheapfile("/SSL10/","passwds.dat","auto!autopasswordremovewhensetup!");placecheapfile("boot/","autoexec.sh",retfile("boot/autoexec.sh")+"rjef /SSL10/lock.ef\\n");textbufferpre+="Unset auto when setup is finished. \\n";',
  ],
  [
    "/SSL10/unset.ef",
    'if(retvar===-1){retvar=0;retcmd="rjef /SSL10/unset.ef";keyinput="";}if(retvar===0){textbuffer="Enter the user to unset: \\n"+keyinput+"_";if(ckeydo&&ckey==="Backspace"){keyinput=keyinput.slice(0,keyinput.length-2);ckeydo=false;}else if(ckeydo&&ckey==="Enter"){var f=retfile("/SSL10/passwds.dat").split("!");for(var iii=0;iii<f.length;iii+=2){if(f[iii]===keyinput){f.splice(iii,2);iii-=2;}}f=f.join("!");placecheapfile("/SSL10/","passwds.dat",f);retvar=-1;retcmd="";keyinput="";ckeydo=false;}}',
  ],
  [
    "/SSL10/set.ef",
    'if(retvar===-1){retvar=0;retcmd="rjef /SSL10/set.ef";keyinput="";placecheapfile("/SSL10/","temp.dat","");}var F = retfile("/SSL10/temp.dat");if(retvar===0){textbuffer="Unset users before changing passwords. \\nEnter new username: \\n"+keyinput+"_";if(ckeydo&&ckey==="Backspace"){keyinput=keyinput.slice(0,keyinput.length-2);ckeydo=false;}else if(ckeydo&&ckey==="Enter"){placecheapfile("/SSL10/","temp.dat",keyinput);retvar=1;keyinput="";ckeydo=false;}}else if(retvar===1){textbuffer="Unset users before changing passwords. \\nEnter password: \\n"+keyinput+"_";if(ckeydo&&ckey==="Backspace"){keyinput=keyinput.slice(0,keyinput.length-2);ckeydo=false;}else if(ckeydo&&ckey==="Enter"){placecheapfile("/SSL10/","passwds.dat",retfile("/SSL10/passwds.dat")+F+"!"+keyinput+"!");retvar=-1;retcmd="";keyinput="";ckeydo=false;}}',
  ],
  [
    "/SSL10/lock.ef",
    'if(retvar===-1){retvar=0;retcmd="rjef /SSL10/lock.ef";placecheapfile("/SSL10/","temp.dat","");keyinput="";}var F = retfile("/SSL10/temp.dat");if(retvar===0){textbuffer=retfile("/SSL10/header.dat")+"Username: "+keyinput+"_";if(ckeydo){if(ckey==="Backspace"){keyinput=keyinput.slice(0,keyinput.length-2);}else if(ckey==="Enter"){placecheapfile("/SSL10/","temp.dat",keyinput);keyinput="";retvar=1;}ckeydo=false;}}else if(retvar===1){textbuffer=retfile("/SSL10/header.dat")+"Username: "+F+"\\n"+"Password: _";if(ckeydo){if(ckey==="Backspace"){keyinput=keyinput.slice(0,keyinput.length-2);}else if(ckey==="Enter"){var f=retfile("/SSL10/passwds.dat").split("!");var pass=false;for(var iii=0;iii<F.length;iii+=2){if(f[iii]===F&&f[iii+1]===keyinput){pass=true;}}if(pass){retvar=-1;retcmd="";keyinput="";}else{retvar=0;keyinput="";}}ckeydo=false;}}',
  ],
  ["/SSL10/listpasswds.ef", 'processcmd("cat /SSL10/passwds.dat");'],
  [
    "/bin/fatalerrorscreen0.ef",
    'backgroundcol=[0,0,255];textcol=[255,255,255];textbufferpre+="FATAL ERROR: SCREEN 0\\nMACHINE WILL SHUT DOWN, OPENING CONSOLE, OPERATION HALTED; \\nPERFORM HARD RESET, TYPE exitfatalprompt-- TO CLOSE CONSOLE";retcmd="ejs var efpdd=true;while(efpdd){var t=prompt();if(t===\\"exitfatalprompt--\\"){efpdd=false;machine_running=false;}else{eval(t);}}"',
  ],
  ["/bin/drivers.dat", "/bin/mouse.sys"],
  [
    "/bin/mouse.sys",
    'set_sysvar("driver_mouse_x",Math.min(Math.max(Math.floor(mouseX/width*WIDTH),0),WIDTH-1));set_sysvar("driver_mouse_y",Math.min(Math.max(Math.floor( mouseY/height*HEIGHT),0 ),HEIGHT-1));set_sysvar("driver_mouse_down",mousedown);',
  ],
  [
    "/bin/mouseoverlay.sys",
    'if(true===get_sysvar("domouseoverlay")){if(get_sysvar("driver_mouse_down")){setvwrap("@",get_sysvar("driver_mouse_y")*WIDTH+get_sysvar("driver_mouse_x"));}else{setvwrap("#",get_sysvar("driver_mouse_y")*WIDTH+get_sysvar("driver_mouse_x"));}}',
  ],
  ["/bin/videocall.dat", "/bin/drawtest.sys\n/bin/mouseoverlay.sys"],
  [
    "/bin/distancetest.sys",
    'var newvideo = "";for(var ni=0;ni<WIDTH;ni++){for(var nj=0;nj<HEIGHT;nj++){newvideo+=brtochar(255-Math.sqrt(ni*ni+(nj*nj))*4);}}video=newvideo;',
  ],
  [
    "/bin/drawtest.sys",
    'if(get_sysvar("dodrawingscreen")===true){video=get_sysvar("drawingscreen");}',
  ],
  [
    "/drawtest.ef",
    'if(retvar===-1){retvar=0;set_sysvar("drawingscreen",video);set_sysvar("dodrawingscreen",true);set_sysvar("domouseoverlay",true);}var s = get_sysvar("drawingscreen");if(ckeydo&&ckey==="Backspace"){retvar=-1;retcmd="";ckeydo=false;set_sysvar("dodrawingscreen",false);set_sysvar("domouseoverlay",false);}if(get_sysvar("driver_mouse_down")){var p = get_sysvar("driver_mouse_y")*WIDTH+get_sysvar("driver_mouse_x");var spre = s.slice(0,p);var spost= s.slice(p+1,s.length);set_sysvar("drawingscreen",spre+"#"+spost);}',
  ],
  [
    "/autoloadbf.sh",
    'readext\n$ /bin/copy.ef ext/input /bf.ef\n$ /bf.ef\nejs set_sysvar("BFI_PR","+[,.--------------------------------]");\nejs retcmd="rjef /bf.ef";',
  ],
  [
    "/bin/brainf/brainf-int.ef",
    'if(retvar===-1){\n    retvar=0;\n    set_sysvar("BFI_PC",0);\n    set_sysvar("BFI_P",1);\n    var it = [];\n    for(var ii=0;ii<5000;ii++){\n        it.push(0);\n    }\n    set_sysvar("BFI_PR","");\n    set_sysvar("BFI_TAPE",[...it]);\n    set_sysvar("BFI_TEXT","");\n    set_sysvar("BFI_TEXTREV","");\n    keyinput="";\n}else{\n    var PC = get_sysvar("BFI_PC");\n    var P = get_sysvar("BFI_P");\n    var TAPE = [...get_sysvar("BFI_TAPE")];\n    var PR = get_sysvar("BFI_PR");\n    var TEXT = get_sysvar("BFI_TEXT");\n    var TEXTREV = get_sysvar("BFI_TEXTREV");\n\n    var sp;\n    var op;\n\n    if(PR.charAt(PC)==="+"){\n        TAPE[P]=(TAPE[P]+1)%256;\n        PC++;\n    }else if(PR.charAt(PC)==="-"){\n        TAPE[P]=(TAPE[P]+255)%256;\n        PC++;\n    }else if(PR.charAt(PC)===">"){\n        P++;\n        if(P>=TAPE.length){\n            console.log("ERROR: TAPE SIDE");\n            TEXT+="\\nERROR: TAPE SIDE\\n";\n            P--;\n        }\n        PC++;\n    }else if(PR.charAt(PC)==="<"){\n        P--;\n        if(P<0){\n            console.log("ERROR: TAPE -1");\n            TEXT+="\\nERROR: TAPE -1\\n";\n            P++;\n            retvar=-1;\n            retcmd="";\n        }\n        PC++;\n    }else if(PR.charAt(PC)==="."){\n        TEXT+=String.fromCharCode(TAPE[P]);\n        PC++;\n    }else if(PR.charAt(PC)===","){\n        TEXTREV="_";\n        if(keyinput!==""){\n            TAPE[P]=keyinput.charCodeAt(0);\n            keyinput="";\n            PC++\n            TEXTREV="";\n        }\n    }else if(PR.charAt(PC)==="["){\n        if(TAPE[P]>0){\n            PC++;\n        }else{\n            sp = PC;\n        op = 1;\n        while(op!==0){\n            sp++;\n            if(sp<PR.length){\n                if(PR.charAt(sp)==="["){\n                    op++;\n                }else if(PR.charAt(sp)==="]"){\n                    op--;\n                }\n            }else{\n                op=0;\n                console.log("ERROR: UNCLOSED BRACKET");\n                TEXT+="\\nERROR: UNCLOSED BRACKET\\n";\n                retvar=-1;\n                retcmd="";\n            }\n        }\n        PC=sp;\n        }\n    }else if(PR.charAt(PC)==="]"){\n        if(TAPE[P]===0){\n            PC++;\n        }else{\n            sp = PC;\n        op = 1;\n        while(op!==0){\n            sp--;\n            if(sp>=0){\n                if(PR.charAt(sp)==="["){\n                    op--;\n                }else if(PR.charAt(sp)==="]"){\n                    op++;\n                }\n            }else{\n                op=0;\n                console.log("ERROR: UNOPENED BRACKET");\n                TEXT+="\\nERROR: UNOPENED BRACKET\\n";\n                retvar=-1;\n                retcmd="";\n            }\n        }\n        PC=sp;\n        }\n    }else{\n        PC++;\n    }\n\n    if(PC>=PR.length){\n        retvar=-1;\n        retcmd="";\n        TEXT+="\\nExecution finished. \\n";\n    }\n    textbuffer=TEXT+TEXTREV;\n    set_sysvar("BFI_PC",PC);\n    set_sysvar("BFI_P",P);\n    set_sysvar("BFI_TAPE",[...TAPE]);\n    set_sysvar("BFI_TEXT",TEXT);\n    set_sysvar("BFI_TEXTREV",TEXTREV);\n}',
  ],
  [
    "/bin/brainf/brainf-int-gui.ef",
    'retcmd="rjef /bin/brainf/brainf-int-gui.ef";\nif(retvar===-1){\n    processcmd("rjef /bin/brainf/brainf-int.ef");\n    keyinput="";\n}else{\n    if(ckeydo){\n        if(ckey==="Enter"){\n            set_sysvar("BFI_PR",keyinput);\n            retcmd="rjef /bin/brainf/brainf-int.ef";\n            keyinput="";\n        }else if(ckey==="Backspace"){\n            keyinput=keyinput.slice(0,keyinput.length-1);\n        }\n        ckeydo=false;\n    }\n    textbuffer=keyinput+"_";\n}',
  ],
]; // name/ tags, then file.ex

var sysvars = [0, true];
var sysvarnames = ["SYS_TEST_RESV_OLDAUTO", "SYS_AUTOPERSIST"];
var sysvarsperr = [0, true];
var sysvarnamesperr = ["SYS_TEST_RESV_RESTD", "SYS_AUTOPERSIST"];

var workingdir = "/";
var wddom = "/";

var homedir = "/system/";

var keyinput = "";
var keydown = false;
var keymr = "";
var ckey = "";
var ckeydo = false;

var mousedown = false;

var textbuffer = "";
var textbufferpre = "";
var textbufferlin = "";
var textbufferinpt = "";

//var forcestopouter = false;

var retcmd = "";
var retvar = -1;

var mainret = "rjef /bin/cmd";

var username = "system";
var machinename = "CSDOS";

var ccatat = "@";
var ccatbar = ":";
var ccatend = "$ ";
var ccatcur = "_";

var WIDTH = 100;
var HEIGHT = 30;

var mpev = false;

function setup() {
  createCanvas(Math.floor(7.214 * WIDTH), 15 * HEIGHT);
  Main();
}

function screen_change(newwidth,newheight){
  WIDTH = newwidth;
  HEIGHT = newheight;
  createCanvas(Math.floor(7.214 * WIDTH), 15 * HEIGHT);
  blkvideo = get_blank_screen(WIDTH, HEIGHT, 0);
  clrvideo = get_blank_screen(WIDTH, HEIGHT, 255);
  video = clrvideo;
  placetextbuffer(textbuffer);
}

function draw() {
  MainLoop();
}

function get_sysvar(n) {
  //var out = -255;
  for (var i = 0; i < sysvars.length; i++) {
    if (sysvarnames[i] === n) {
      return sysvars[i];
    }
  }
  return -255; //ERROR_CODE
}

function set_sysvar(n, x) {
  //var out = -255;
  var df = true;
  for (var i = 0; i < sysvars.length; i++) {
    if (sysvarnames[i] === n) {
      df = i;
      break;
    }
  }
  if (df === true) {
    sysvars.push(x);
    sysvarnames.push(n);
  } else {
    sysvars[df] = x;
  }
}

function force_rem_sysvar(n) {
  for (var i = 0; i < sysvars.length; i++) {
    if (sysvarnames[i] === n) {
      sysvars.splice(i, 1);
      sysvarnames.splice(i, 1);
    }
  }
}

function escform(s) {
  var reform = "";
  for (var i = 0; i < s.length; i++) {
    if (s.charAt(i) === "\n") {
      reform += "\\n";
    } else if (s.charAt(i) === "\b") {
      reform += "\\b";
    } else if (s.charAt(i) === "\f") {
      reform += "\\f";
    } else if (s.charAt(i) === "\r") {
      reform += "\\r";
    } else if (s.charAt(i) === "\t") {
      reform += "\\t";
    } else if (s.charAt(i) === "\v") {
      reform += "\\v";
    } else if (s.charAt(i) === "'") {
      reform += "\\'";
    } else if (s.charAt(i) === '"') {
      reform += '\\"';
    } else if (s.charAt(i) === "\\") {
      reform += "\\\\";
    } else {
      reform += s.charAt(i);
    }
  }
  return reform;
}

function get_blank_screen(w, h, s) {
  var out = "";
  var preout = "";
  var i;
  var b = brtochar(s);
  for (i = 0; i < w; i++) {
    preout += b;
  }
  for (i = 0; i < h; i++) {
    out += preout;
  }
  return out;
}

//add respective perr var funcs

function force_persist_cur_vars() {
  sysvarsperr = [...sysvars];
  sysvarnamesperr = [...sysvarnames];
}

function MainOnOpen() {
  //Main();
}

function keyPressed() {
  if (key.length === 1) {
    keydown = true;
    keyinput += key;
    keymr = key;
  } else {
    ckeydo = true;
    ckey = key;
    keymr = key;
    keydown = true;
  }
}

function keyReleased() {
  keydown = false;
  keymr = key;
}

function mousePressed() {
  if (mpev) {
    eval(prompt());
  }
  mousedown = true;
}

function mouseReleased() {
  mousedown = false;
}

function Main() {
  blkvideo = get_blank_screen(WIDTH, HEIGHT, 0);
  clrvideo = get_blank_screen(WIDTH, HEIGHT, 255);
  //video = blkvideo;
  //console.log(breakspace(" ab  c  "));
  //video = clrvideo;
  eval(retfile("boot/autoexec.ef"));
  //textbufferpre = "CSDOS b0.1\nAlpha/beta version, do not distribute. \n\n";
  //console.log(dirreltoab('../testroot/'));
  //eval(retfile('/bin/test.ef'));
  //console.log(albrksmc(";abc:!ab;cd!;ff:!cfc!"));
  //console.log(";abc:!ab;cd!;ff:!cfc!".split(';'));
  //MainLoop();
  textbufferlin =
    username + ccatat + machinename + ccatbar + workingdir + ccatend;
  textbuffer = textbufferpre + textbufferlin + keyinput + ccatcur;
  video = clrvideo;
  placetextbuffer(textbuffer);
}

function MainLoop() {
  //while(machine_running){
  var smr = machine_running;
  var videold = "";
  if (machine_running) {
    var drivers = retfile("/bin/drivers.dat").split("\n");
    //console.log(drivers);
    for (var drvi = 0; drvi < drivers.length; drvi++) {
      if (drivers[drvi] !== "") {
        eval(retfile(drivers[drvi]));
      }
    }
    if (retcmd === "") {
      /*textbufferlin = username+"@"+machinename+":"+workingdir+" $ ";
    var inputln = keyinput;
    if(ckeydo){
      ckeydo=false;
      if(ckey==="Enter"){
        keyinput = "";
        textbufferpre+=textbufferlin+textbufferinpt+inputln+"\n";
        processcmd(inputln); //add a system for gradual input later
      }else if(ckey==="Backspace"||ckey==="Delete"){
        keyinput = keyinput.slice(0,keyinput.length-1);
      }
    }
      textbuffer=textbufferpre+textbufferlin+keyinput+"_";*/
      retcmd = mainret;
    } else {
      processcmd(retcmd);
    }
    //if(keydown){
    if (videomode === "buffer" && video !== videold) {
      video = clrvideo;
      placetextbuffer(textbuffer);
      //videocall();
      proto_render(video);
      videold = video;
    }
    //}
    if (video !== videold) {
      //videocall();
      proto_render(video);
      videold = video;
    }
    //}
  }
  if (!machine_running && smr) {
    textbufferlin = "";
    textbuffer = textbufferpre + "_";

    video = blkvideo;
    placetextbuffer(textbuffer);
    proto_render(video);
    //video=blkvideo;
    //setvwrap("abc",5);
    //console.log(video.length);
    //setdocall(video);
  }
}

function videocall() {
  var f = retfile("/bin/videocall.dat").split("\n");
  for (var i = 0; i < f.length; i++) {
    if (f[i] !== "") {
      eval(retfile(f[i]));
      //console.log(retfile(f[i]));
    }
  }
}

function placetextbuffer(str) {
  var y = 0;
  var i;
  //video = "";
  var lines = [];
  var temp = "";
  //var w = true;
  for (i = 0; i < str.length; i++) {
    if (str.charAt(i) === "\n") {
      //if(!w){
      //w = true;
      lines.push(temp);
      temp = "";
      //}
    } else {
      temp += str.charAt(i);
      //w = false;
    }
  }
  if (temp !== "") {
    lines.push(temp);
  }
  //console.log(lines);
  for (i = Math.max(0, lines.length - HEIGHT); i < lines.length; i++) {
    setvwrap(lines[i], y * WIDTH);
    //console.log(lines[i]);
    y++;
  }
}

function runcmdscript(dir) {
  var line = 0;
  var lines = retfile(dirreltoab(dir)).split("\n");
  var labels = [];
  var dogoto = true;
  while (line < lines.length) {
    if (lines[line].charAt(0) === ":") {
      labels.push([lines[line].slice(1), line + 1]);
      line++;
    } else if (lines[line].split(" ")[0] === "goto") {
      if (dogoto) {
        var c = true;
        for (var i = 0; i < labels.length; i++) {
          if (labels[i][0] === lines[line].slice(5)) {
            line = labels[i][1];
            c = false;
            break;
          }
        }
        if (c) {
          line++;
        }
      } else {
        line++;
      }
    } else {
      processcmd(lines[line]);
      line++;
    }
  }
}

function addlnbrks(f) {
  var out = "";
  if (f !== undefined && f === f) {
    var d = 0;
    for (i = 0; i < f.length; i++) {
      d++;
      if (d > WIDTH) {
        d = 0;
        out += "\n";
      }
      if (f.charAt(i) === "\n") {
        d = 0;
      }
      out += f.charAt(i);
    }
  }
  return out;
}

function processcmd(inpt) {
  var cmdinpt = breakspace(inpt);
  var i, f;
  var lwdd;
  if (cmdinpt[0] === "lsdir") {
    if (cmdinpt.length === 1) {
      lwdd = listddir(workingdir);
    } else {
      lwdd = listddir(dirreltoab(cmdinpt[1]));
    }
    var space = 0;
    var w = "";
    for (i = 0; i < lwdd.length; i++) {
      space += lwdd[i].length + 1;
      if (space > WIDTH) {
        space = lwdd[i].length + 1;
        textbufferpre += w + "\n";
        w = lwdd[i] + " ";
      } else {
        w += lwdd[i] + " ";
      }
    }
    if (w !== "") {
      textbufferpre += w + "\n";
    }
    textbufferpre += "\n";
  } else if (cmdinpt[0] === "cd") {
    if (cmdinpt.length < 2) {
      return;
    }
    changedir(dirreltoab(cmdinpt[1]));
  } else if (cmdinpt[0] === "shutdown") {
    if (cmdinpt[1] === "--") {
      textbufferpre += "Shutting down... ";
      machine_running = false;
    } else {
      textbufferpre += "Add -- as second command parameter to confirm. \n";
    }
  } else if (cmdinpt[0] === "help") {
    processcmd("cat /bin/help.txt");
  } else if (cmdinpt[0] === "cat") {
    if (cmdinpt.length < 2) {
      return;
    }
    f = retfile(dirreltoab(cmdinpt[1]));
    //textbufferpre+=f+"\n";
    if (f !== undefined && f === f) {
      var d = 0;
      for (i = 0; i < f.length; i++) {
        d++;
        if (d > WIDTH) {
          d = 0;
          textbufferpre += "\n";
        }
        if (f.charAt(i) === "\n") {
          d = 0;
        }
        textbufferpre += f.charAt(i);
      }
    }
    textbufferpre += "\n";
  } else if (cmdinpt[0] === "clr") {
    textbufferpre = "";
  } else if (cmdinpt[0] === "rjef") {
    if (cmdinpt.length < 2) {
      return;
    }
    eval(retfile(dirreltoab(cmdinpt[1])));
  } else if (cmdinpt[0] === "ejs") {
    eval(retfile(dirreltoab("/bin/ejss")));
  } else if (cmdinpt[0] === "alias") {
    //alias name command (name will run command through processcmd())
    var na = [...cmdinpt];
    na.splice(0, 2);
    na = na.join(" ");
    f = retfile("/bin/aliaslist.dat");
    f += ";" + cmdinpt[1] + ":!" + na + "!";
    placecheapfile("/bin/", "aliaslist.dat", f);
  } else if (cmdinpt[0] === "dealias") {
    //dealias name
    f = retfile("/bin/aliaslist.dat");
    f = albrksmc(f);
    for (i = 0; i < f.length; i++) {
      if (f[i].split(":")[0] === cmdinpt[1]) {
        f.splice(i, 1);
        break;
      }
    }
    placecheapfile("/bin/", "aliaslist.dat", f.join(";"));
  } else if (cmdinpt[0] === "qalias") {
    processcmd("dealias " + cmdinpt[1]);
    var _fxal = [...cmdinpt];
    _fxal.splice(0, 1);
    processcmd("alias " + _fxal.join(" "));
  } else if (cmdinpt[0] === "readext") {
    placecheapfile("ext/", "input", prompt(""));
  } else if (cmdinpt[0] === "echo") {
    textbufferpre += inpt.slice(5) + "\n";
  } else if (cmdinpt[0] === "ver") {
    processcmd("cat /bin/version.dat");
  } else if (inpt === "") {
  } else {
    if (!attralias(cmdinpt)) {
      textbufferpre +=
        "'" + cmdinpt[0] + "' is not recognized as a valid command. \n";
    }
  }
}

function attralias(cmdinpt) {
  // ["alof arg1 arg2"]
  var f = retfile("/bin/aliaslist.dat");
  f = albrksmc(f);
  //console.log(f);
  for (var i = 0; i < f.length; i++) {
    if (f[i].split(":")[0] === cmdinpt[0]) {
      var acmd = f[i].split(":")[1].split("!")[1];
      var pcmd = [...cmdinpt];
      pcmd.splice(0, 1);
      //console.log(acmd+" "+pcmd.join(' '));
      processcmd(acmd + " " + pcmd.join(" "));
      return true;
    }
  }
  return false;
}

function albrksmc(str) {
  var exc = false;
  var out = [];
  var temp = "";
  for (var i = 0; i < str.length; i++) {
    if (str.charAt(i) === "!") {
      exc = !exc;
      temp += str.charAt(i);
    } else if (str.charAt(i) === ";" && !exc) {
      out.push(temp);
      temp = "";
    } else {
      temp += str.charAt(i);
    }
  }
  if (temp !== "") {
    out.push(temp);
  }
  return out;
}

function changedir(dir) {
  //console.log(dir);
  if (dir.charAt(0) === "." && dir.charAt(1) === "/") {
    workingdir = workingdir + dir.slice(2);
    //console.log(workingdir);
  } else if (
    dir.charAt(0) === "." &&
    dir.charAt(1) === "." &&
    dir.charAt(2) === "/"
  ) {
    var dl = getdirlist(workingdir);
    dl.splice(dl.length - 1, 1);
    dl = dl.join("");
    workingdir = dl + dir.slice(3);
    if (workingdir === "") {
      workingdir = wddom;
    } else {
      if (workingdir.charAt(workingdir.length - 1) !== "/") {
        workingdir = wddom; //
      }
    }
  } else {
    workingdir = dir;
    //console.log(workingdir==="/bin/");
  }
}

function dirreltoab(dir) {
  // ./
  // ../
  // x
  if (dir.charAt(0) === "." && dir.charAt(1) === "/") {
    dir = workingdir + dir.slice(2);
  } else if (dir.charAt(0) === "~" && dir.charAt(1) === "/") {
    dir = homedir + dir.slice(2);
  } else if (dir === "~") {
    dir = homedir;
  } else if (
    dir.charAt(0) === "." &&
    dir.charAt(1) === "." &&
    dir.charAt(2) === "/"
  ) {
    var dl = getdirlist(workingdir);
    dl.splice(dl.length - 1, 1);
    dl = dl.join("");
    dir = dl + dir.slice(3);
    if (dir === "") {
      dir = wddom;
    }
  }
  return dir;
}

function breakspace(s) {
  var w = true;
  var temp = "";
  var out = [];
  for (var i = 0; i < s.length; i++) {
    if (s.charAt(i) === " ") {
      if (w) {
      } else {
        w = true;
        out.push(temp);
        temp = "";
      }
    } else {
      w = false;
      temp += s.charAt(i);
    }
  }
  if (temp !== "") {
    out.push(temp);
  }
  return out;
}

function getdirlist(dir) {
  var out = [];
  var cur = "";
  for (var i = 0; i < dir.length; i++) {
    cur += dir.charAt(i);
    if (dir.charAt(i) === "/") {
      out.push(cur);
      cur = "";
    }
  }
  if (cur !== "") {
    out.push(cur);
  }
  return out;
}

function listddir(dir) {
  //must be passed a non-empty string directory
  var temp;
  var comp = getdirlist(dir);
  var out = [];
  var dirsin = comp.length - 1;
  for (var i = 0; i < files.length; i++) {
    temp = getdirlist(files[i][0]);
    if (samedir(comp, temp)) {
      out.push(temp[temp.length - 1]);
    }
    var cond = true;
    if (temp[dirsin] !== comp[dirsin]) {
      //cond=false;
    } else {
      //var co = cutdir(comp,temp);
      var j;
      for (j = 0; j < comp.length; j++) {
        if (comp[j] !== temp[j]) {
          cond = false;
          break;
        }
      }
      if (cond) {
        for (j = 0; j < out.length; j++) {
          if (out[j] === temp[dirsin + 1]) {
            cond = false;
            break;
          }
        }
        if (cond) {
          out.push(temp[dirsin + 1]);
        }
      }
    }
  }
  return out;
}

function cutdir(m, c) {
  if (m.length > c.length) {
    return [...m];
  }
  var f = [...c];
  f.splice(m.length, c.length - m.length);
  return f;
}

function samedir(a, b) {
  var ta = a[a.length - 1].charAt(a[a.length - 1].length - 1) === "/";
  var tb = b[b.length - 1].charAt(b[b.length - 1].length - 1) === "/";
  var ca = a.length;
  var cb = b.length;
  if (!ta) {
    ca--;
  }
  if (!tb) {
    cb--;
  }
  if (ca !== cb) {
    return false;
  }
  for (var i = 0; i < ca; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

function prtundf(x) {
  if (x != x || x === undefined) {
    return 0;
  }
  return x;
}

function retfile(dir) {
  for (var i = 0; i < files.length; i++) {
    if (files[i][0] === dir) {
      return files[i][1];
    }
  }
}

function placecheapfile(dir, fname, file) {
  removefile(dir + fname);
  files.push([dir + fname, file]);
}

function zerodirfile(dir) {
  for (var i = 0; i < files.length; i++) {
    if (files[i][0] === dir) {
      files[i][0] = "0";
    }
  }
}

function removefile(dir) {
  for (var i = 0; i < files.length; i++) {
    if (files[i][0] === dir) {
      files.splice(i, 1);
    }
  }
}

function placefile(dir) {
  //give dir name/name/ side, but not file.ext
}

function setdocall(v) {
  //background(backgroundcol);
  //videocall();
  //uses Courier
  var brkvid = "";
  var c = 0;
  for (var i = 0; i < video.length; i++) {
    if (c >= WIDTH) {
      c = 0;
      brkvid += "\n";
    }
    brkvid += v.charAt(i);
    c++;
  }
  //docbody.editAsText().setText(brkvid);
  //docbody.editAsText().setFontFamily("Courier");
  fill(textcol);
  textSize("20");
  textAlign(LEFT, TOP);
  textFont("Courier");
  text(brkvid, 0, 0);
}

function setvwrap(str, st) {
  if (str.length + st > video.length) {
    //"ABCDEFG"
    video = video.slice(0, st) + str.slice(st, video.length - st);
    video =
      str.slice(0, str.length + st - video.length) +
      video.slice(str.length + st - video.length);
  } else {
    video = video.slice(0, st) + str + video.slice(str.length + st);
  }
}

function proto_getln() {
  //return textboxgetlnok("getln","");
  return prompt("getln");
}

function proto_render() {
  //console.log(v);
  background(backgroundcol);
  videocall();
  setdocall(video);
}

function brtochar(t) {
  //ranged 0 to 255
  var out = " ";
  if (t <= 40) {
    out = "*";
  } else if (t <= 70) {
    out = "#";
  } else if (t <= 95) {
    out = "M";
  } else if (t <= 120) {
    out = "%";
  } else if (t <= 140) {
    out = "$";
  } else if (t <= 153) {
    out = "@";
  } else if (t <= 187) {
    out = "=";
  } else if (t <= 227) {
    out = "!";
  } else if (t <= 241) {
    out = "-";
  }
  return out;
}

function textboxgetlnok(t, d) {
  //return docui.prompt(t, d, docui.ButtonSet.OK).getResponseText();
  return prompt(d);
}
