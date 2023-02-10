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
  ["boot/autoexec.sh", "rjef /quickalias/setup.ef\nejs set_sysvar(\"AEBOOT_DISPSPLASH\",true);set_sysvar(\"AEBOOT_SPLASHTIME\",4);set_sysvar(\"AEBOOT_SPLASHALLESC\",false);set_sysvar(\"CMD_HISTORY\",[]);\nejs mainret=\"rjef /bin/schf\"\nalias 2t2 $ /bin/2t2.ef\nalias hex $ /bin/hexedit.ef\n"],
  [
    "boot/autoexec.ef",
    'console.log(\'AE UNCHANGED\');runcmdscript("boot/autoexec.sh");textbufferpre="CSDOS b0.524 -- Copy for development, press and test use only\\nBeta version, do not distribute. \\n\\nPlease use the help command if required and available\\n";if(get_sysvar(\"AEBOOT_DISPSPLASH\")){if(get_sysvar(\"AEBOOT_SPLASHALLESC\")){processcmd(\"rjef /bin/displaypxt.ef /info/splash.pxt -t \"+get_sysvar(\"AEBOOT_SPLASHTIME\"))}else{processcmd(\"rjef /bin/displaypxt.ef /info/splash41.pxt -t \"+get_sysvar(\"AEBOOT_SPLASHTIME\")+\" -l\")}};disableScroll();',
  ],
  [
    "/bin/version.dat",
    "CSDOS b0.524 -- development build 44, not for public use",
  ],
  ["/info/updates.txt","CSDOS Beta Version 0.52 Development Build 37:\n  Made minor modifications to keep scheduler from crashing machine\n\nCSDOS Beta Version 0.521 Development Build 38:\n  Created global-font system for rendering video. \n\nCSDOS Beta Version 0.522 Development Build 39:\n  Added bfc-asm.ef and bfc-clr.ef tools for compilation to brainf. \n  Added make-bfc-clr-comp-bac.ef tool. \n\nCSDOS Beta Version 0.5221 Development Build 40:\n  Added 2t2.ef updated text tool. (legacy text command still available)\n\nCSDOS Beta Version 0.5221 Development Build 40:\n  Added 2t2.ef updated text tool. (legacy text command still available)\n\nCSDOS Beta Version 0.5221 Development Build 41:\n  Minor updates. \n\nCSDOS Beta Version 0.523 Development Build 42:\n  Implemented history scrolling in command shell. \n  Changed font in fontstack. \n\nCSDOS Beta Version 0.524 Development Build 44:\n  Added hex editor (hexedit.ef) and hex alias. \n"],
  ["/info/updateshistory.txt","\nCSDOS Beta Version 0.48 Development Build 22:\n  Made major optimizations to brainf-int\n\nCSDOS Beta Version 0.49 Development Build 23:\n  Added /bin/paint.ef program\n\nCSDOS Beta Version 0.49 Development Build 24:\n  Made minor changes including fixing double backspacing problems\n  Added paint alias\n\nCSDOS Beta Version 0.49 Development Build 25:\n  Added splash screen\n  Added /bin/makeclrpxt.ef\n\nCSDOS Beta Version 0.491 Development Build 26:\n  Made minor changes and additions\n\nCSDOS Beta Version 0.4911 Development Build 27:\n  Changed how video function is handled slightly for future included features\n\nCSDOS Beta Version 0.4912 Development Build 28:\n  Added /bin/folderpkg.ef and /bin/folderunpkg.ef\n\nCSDOS Beta Version 0.492 Development Build 29:\n  Added /bin/schf for scheduling multitasker capabilities\n\nCSDOS Beta Version 0.49201 Development Build 30:\n  Made minor modifications to command shell program for scheduler\n\nCSDOS Beta Version 0.49201 Development Build 31:\n  Added check to not place files with no name\n\nCSDOS Beta Version 0.5 Development Build 32:\n  Created .UEF standard and API functions (Universal Executable File)\n\nCSDOS Beta Version 0.51 Development Build 33:\n  Added exception protocals to keep scheduler from crashing system when no programs are scheduled in task list\n\nCSDOS Beta Version 0.51 Development Build 34:\n  Changed note in repair_schf_noprogram exception screen\n\nCSDOS Beta Version 0.51 Development Build 35:\n  Added /bin/list_tasks.ef\n\nCSDOS Beta Version 0.51 Development Build 36:\n  Added exception safety measures\n\nCSDOS Beta Version 0.52 Development Build 37:\n  Made minor modifications to keep scheduler from crashing machine\n\nCSDOS Beta Version 0.521 Development Build 38:\n  Created global-font system for rendering video. \n\nCSDOS Beta Version 0.51 Development Build 36:\n  Added exception safety measures\n\nCSDOS Beta Version 0.52 Development Build 37:\n  Made minor modifications to keep scheduler from crashing machine\n\nCSDOS Beta Version 0.522 Development Build 39:\n  Added bfc-asm.ef and bfc-clr.ef tools for compilation to brainf. \n  Added make-bfc-clr-comp-bac.ef tool. \n\nCSDOS Beta Version 0.5221 Development Build 40:\n  Added 2t2.ef updated text tool. (legacy text command still available)\n\nCSDOS Beta Version 0.5221 Development Build 41:\n  Minor updates. \n\nCSDOS Beta Version 0.523 Development Build 42:\n  Implemented history scrolling in command shell. \n  Changed font in fontstack. \n\nCSDOS Beta Version 0.523 Development Build 43:\n  Minor updates. \n\nCSDOS Beta Version 0.524 Development Build 44:\n  Added hex editor (hexedit.ef) and hex alias. \n"],
  [
    "/bin/aliaslist.dat",
    ';ls:!lsdir!;test1:!clr!;test2:!rjef /bin/bac /bin/test.sh!;$:!rjef!;#:!rjef /bin/bac!;alof:!rjef /bin/alof.ef!;catof:!rjef /bin/catof.ef!;text:!rjef /bin/text.ef!;drawtest:!ejs retcmd="rjef /drawtest.ef"!;mvinpt:!rjef /bin/mvinpt.ef!;loadoutput:!rjef /bin/loadoutput.ef!;verinfo:!cat /info/updates.txt!;paint:!rjef /bin/paint.ef!;jsh:!rjef /bin/jsh.ef!;brainf-int:!rjef /bin/brainf/brainf-int.ef!;brainf-int-gui:!rjef /bin/brainf/brainf-int-gui.ef!;brainf-int-load:!rjef /bin/brainf/brainf-int-load.ef!',
  ],
  ["/root/userdata.dat", ""],
  [
    "/bin/help.txt",
    "ls / lsdir [dir -- optional] - list the contents of the current directory, or [dir]\ncd [dir] - changes the current directory to [dir]\nshutdown - use 'shutdown --' to halt CSDOS\nhelp - display this dialog from /bin/help.txt\ncat [dir] - display the contents of the file [dir] in the console\nclr - clear the screen\n$ / rjef [dir] - run the file [dir] in JavaScript from processcmd() using eval()\nejs [code] - run [code] in eval() from processcmd(), note that all blocks of spaces will be changed into a single space\nalias [aliasname] [aliascontents] - add an alias, typing [aliasname] as a command will run [aliascontents] through processcmd() with any arguments/parameters from after [aliasname] appended to the str_input for processcmd()\nreadext - open a prompt that will write contents to ext/input\necho [text] - display [text] in console\nver - display version info\n# [dir] - run the shell file [dir], this command is an alias\nalof [dir] - uses alert dialogue to display the contents of file at [dir], this command is an alias\ncatof [dir] - displays the contents of the file [dir] in the console in editor form\nmvinpt [dir] - copy ext/input to file [dir]\nloadoutput [dir] - copy file [dir] to ext/output\noutext [mode -- optional, default: -a] - displays the contents of ext/output using argument [mode] (-a: alert dialogue, -c: JavaScript console)\nverinfo - display version info and brief overview of update details\njsh - open a JavaScript console, press escape key to exit, uses alias\n",
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
    'textbufferlin = username+ccatat+machinename+ccatbar+workingdir+ccatend;\nvar inputln = keyinput;\nif(ckeydo){\n    ckeydo=false;\n    if(ckey===\"Enter\"){\n        keyinput = \"\";\n        var arr = get_sysvar(\"CMD_HISTORY\");\n        set_sysvar(\"CMD_CUR\",-1);\n        arr.push(inputln);\n        set_sysvar(\"CMD_HISTORY\",arr);\n        textbufferpre+=textbufferlin+textbufferinpt+inputln+\"\\n\";\n        var r = get_sysvar(\"schf_active\");\n        set_sysvar(\"schf_active\",false);\n        processcmd(inputln);\n        set_sysvar(\"schf_active\",r);\n    }else if(ckey===\"Backspace\"||ckey===\"Delete\"){\n        keyinput = keyinput.slice(0,keyinput.length-1);\n    }else if(ckey===\"ArrowUp\"){\n        var cur = get_sysvar(\"CMD_CUR\");\n        if(cur===-255){\n            cur=-1;\n            set_sysvar(\"CMD_CUR\",-1);\n        }else{\n            var arr2 = get_sysvar(\"CMD_HISTORY\");\n            if(cur===-1){\n                cur=arr2.length-1;\n            }else if(cur>0){\n                cur--;\n            }\n            if(cur!==-1&&cur<arr2.length){\n                keyinput=arr2[cur];\n            }\n            set_sysvar(\"CMD_CUR\",cur);\n        }\n    }else if(ckey===\"ArrowDown\"){\n        var cur = get_sysvar(\"CMD_CUR\");\n        if(cur===-255){\n            cur=-1;\n            set_sysvar(\"CMD_CUR\",-1);\n        }else{\n            var arr2 = get_sysvar(\"CMD_HISTORY\");\n            if(cur===-1){\n                cur=arr2.length-1;\n            }else if(cur<arr2.length){\n                if(cur===arr2.length-1){\n                    keyinput=\"\";\n                }\n                cur++;\n            }\n            if(cur!==-1&&cur<arr2.length){\n                keyinput=arr2[cur];\n            }\n            set_sysvar(\"CMD_CUR\",cur);\n        }\n    }\n}\ntextbuffer=textbufferpre+textbufferlin+keyinput+ccatcur;',
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
    'if(retvar===-1){retvar=0;retcmd="rjef /SSL10/unset.ef";keyinput="";}if(retvar===0){textbuffer="Enter the user to unset: \\n"+keyinput+"_";if(ckeydo&&ckey==="Backspace"){keyinput=keyinput.slice(0,keyinput.length-1);ckeydo=false;}else if(ckeydo&&ckey==="Enter"){var f=retfile("/SSL10/passwds.dat").split("!");for(var iii=0;iii<f.length;iii+=2){if(f[iii]===keyinput){f.splice(iii,2);iii-=2;}}f=f.join("!");placecheapfile("/SSL10/","passwds.dat",f);retvar=-1;retcmd="";keyinput="";ckeydo=false;}}',
  ],
  [
    "/SSL10/set.ef",
    'if(retvar===-1){retvar=0;retcmd="rjef /SSL10/set.ef";keyinput="";placecheapfile("/SSL10/","temp.dat","");}var F = retfile("/SSL10/temp.dat");if(retvar===0){textbuffer="Unset users before changing passwords. \\nEnter new username: \\n"+keyinput+"_";if(ckeydo&&ckey==="Backspace"){keyinput=keyinput.slice(0,keyinput.length-1);ckeydo=false;}else if(ckeydo&&ckey==="Enter"){placecheapfile("/SSL10/","temp.dat",keyinput);retvar=1;keyinput="";ckeydo=false;}}else if(retvar===1){textbuffer="Unset users before changing passwords. \\nEnter password: \\n"+keyinput+"_";if(ckeydo&&ckey==="Backspace"){keyinput=keyinput.slice(0,keyinput.length-1);ckeydo=false;}else if(ckeydo&&ckey==="Enter"){placecheapfile("/SSL10/","passwds.dat",retfile("/SSL10/passwds.dat")+F+"!"+keyinput+"!");retvar=-1;retcmd="";keyinput="";ckeydo=false;}}',
  ],
  [
    "/SSL10/lock.ef",
    'if(retvar===-1){retvar=0;retcmd="rjef /SSL10/lock.ef";placecheapfile("/SSL10/","temp.dat","");keyinput="";}var F = retfile("/SSL10/temp.dat");if(retvar===0){textbuffer=retfile("/SSL10/header.dat")+"Username: "+keyinput+"_";if(ckeydo){if(ckey==="Backspace"){keyinput=keyinput.slice(0,keyinput.length-1);}else if(ckey==="Enter"){placecheapfile("/SSL10/","temp.dat",keyinput);keyinput="";retvar=1;}ckeydo=false;}}else if(retvar===1){textbuffer=retfile("/SSL10/header.dat")+"Username: "+F+"\\n"+"Password: _";if(ckeydo){if(ckey==="Backspace"){keyinput=keyinput.slice(0,keyinput.length-1);}else if(ckey==="Enter"){var f=retfile("/SSL10/passwds.dat").split("!");var pass=false;for(var iii=0;iii<F.length;iii+=2){if(f[iii]===F&&f[iii+1]===keyinput){pass=true;}}if(pass){retvar=-1;retcmd="";keyinput="";}else{retvar=0;keyinput="";}}ckeydo=false;}}',
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
    "if(retvar===-1){\n    retvar=0;\n    set_sysvar(\"BFI_PC\",0);\n    set_sysvar(\"BFI_P\",1);\n    var it = [];\n    for(var ii=0;ii<5000;ii++){\n        it.push(0);\n    }\n    set_sysvar(\"BFI_PR\",\"\");\n    set_sysvar(\"BFI_TAPE\",[...it]);\n    set_sysvar(\"BFI_TEXT\",\"\");\n    set_sysvar(\"BFI_TEXTREV\",\"\");\n    if(get_sysvar(\"BFI_BITSIZE\")===-255){\n        set_sysvar(\"BFI_BITSIZE\",256);\n    }\n    keyinput=\"\";\n}else{\n    var PC = get_sysvar(\"BFI_PC\");\n    var P = get_sysvar(\"BFI_P\");\n    var TAPE = [...get_sysvar(\"BFI_TAPE\")];\n    var PR = get_sysvar(\"BFI_PR\");\n    var TEXT = get_sysvar(\"BFI_TEXT\");\n    var TEXTREV = get_sysvar(\"BFI_TEXTREV\");\n\n    var BITSIZE = get_sysvar(\"BFI_BITSIZE\");\n\n    var sp;\n    var op;\n\n    var cont = true;\n\n    while(cont){\n    if(PR.charAt(PC)===\"+\"){\n        TAPE[P]=(TAPE[P]+1)%BITSIZE;\n        PC++;\n    }else if(PR.charAt(PC)===\"-\"){\n        TAPE[P]=(TAPE[P]+BITSIZE-1)%BITSIZE;\n        PC++;\n    }else if(PR.charAt(PC)===\">\"){\n        P++;\n        if(P>=TAPE.length){\n            console.log(\"ERROR: TAPE SIDE\");\n            TEXT+=\"\\nERROR: TAPE SIDE\\n\";\n            P--;\n        }\n        PC++;\n    }else if(PR.charAt(PC)===\"<\"){\n        P--;\n        if(P<0){\n            console.log(\"ERROR: TAPE -1\");\n            TEXT+=\"\\nERROR: TAPE -1\\n\";\n            P++;\n            retvar=-1;\n            retcmd=\"\";\n            cont=false;\n        }\n        PC++;\n    }else if(PR.charAt(PC)===\".\"){\n        TEXT+=String.fromCharCode(TAPE[P]);\n        PC++;\n    }else if(PR.charAt(PC)===\",\"){\n        TEXTREV=\"_\";\n        if(keyinput!==\"\"){\n            TAPE[P]=keyinput.charCodeAt(0);\n            keyinput=\"\";\n            PC++\n            TEXTREV=\"\";\n        }\n        cont=false;\n    }else if(PR.charAt(PC)===\"[\"){\n        if(TAPE[P]>0){\n            PC++;\n        }else{\n            sp = PC;\n        op = 1;\n        while(op!==0){\n            sp++;\n            if(sp<PR.length){\n                if(PR.charAt(sp)===\"[\"){\n                    op++;\n                }else if(PR.charAt(sp)===\"]\"){\n                    op--;\n                }\n            }else{\n                op=0;\n                console.log(\"ERROR: UNCLOSED BRACKET\");\n                TEXT+=\"\\nERROR: UNCLOSED BRACKET\\n\";\n                retvar=-1;\n                retcmd=\"\";\n                cont=false;\n            }\n        }\n        PC=sp;\n        }\n    }else if(PR.charAt(PC)===\"]\"){\n        if(TAPE[P]===0){\n            PC++;\n        }else{\n            sp = PC;\n        op = 1;\n        while(op!==0){\n            sp--;\n            if(sp>=0){\n                if(PR.charAt(sp)===\"[\"){\n                    op--;\n                }else if(PR.charAt(sp)===\"]\"){\n                    op++;\n                }\n            }else{\n                op=0;\n                console.log(\"ERROR: UNOPENED BRACKET\");\n                TEXT+=\"\\nERROR: UNOPENED BRACKET\\n\";\n                retvar=-1;\n                retcmd=\"\";\n                cont=false;\n            }\n        }\n        PC=sp;\n        }\n    }else{\n        PC++;\n    }\n\n    if(PC>=PR.length){\n        retvar=-1;\n        retcmd=\"\";\n        TEXT+=\"\\nExecution finished. \\n\";\n        cont=false;\n    }\n    }\n    textbuffer=TEXT+TEXTREV;\n    set_sysvar(\"BFI_PC\",PC);\n    set_sysvar(\"BFI_P\",P);\n    set_sysvar(\"BFI_TAPE\",[...TAPE]);\n    set_sysvar(\"BFI_TEXT\",TEXT);\n    set_sysvar(\"BFI_TEXTREV\",TEXTREV);\n}",
  ],
  [
    "/bin/brainf/brainf-int-gui.ef",
    'retcmd="rjef /bin/brainf/brainf-int-gui.ef";\nif(retvar===-1){\n    processcmd("rjef /bin/brainf/brainf-int.ef");\n    keyinput="";\n}else{\n    if(ckeydo){\n        if(ckey==="Enter"){\n            set_sysvar("BFI_PR",keyinput);\n            retcmd="rjef /bin/brainf/brainf-int.ef";\n            keyinput="";\n        }else if(ckey==="Backspace"){\n            keyinput=keyinput.slice(0,keyinput.length-1);\n        }\n        ckeydo=false;\n    }\n    textbuffer=keyinput+"_";\n}',
  ],
  [
    "/bin/brainf/brainf-int-load.ef",
    'processcmd("rjef /bin/brainf/brainf-int.ef");\nset_sysvar("BFI_PR",retfile(dirreltoab(cmdinpt[cmdinpt.length-1])));\nretcmd="rjef /bin/brainf/brainf-int.ef";',
  ],
  ["ext/output", "#NOFILE"],
  ["/bin/mvinpt.ef", "processcmd(\"rjef /bin/copy.ef ext/input \"+cmdinpt[2]);"],
  ["/bin/loadoutput.ef","processcmd(\"rjef /bin/copy.ef \"+cmdinpt[2]+\" ext/output\");"],
  ["/bin/paint.ef","if(retvar===-1){\n    retcmd=\"rjef /bin/paint.ef\";\n    set_sysvar(\"PAINT_WF\",clrvideo);\n    set_sysvar(\"PAINT_DOT\",\"#\");\n    set_sysvar(\"PAINT_WFW\",WIDTH);\n    set_sysvar(\"PAINT_WFH\",HEIGHT);\n    if(cmdinpt.length>2){\n        var f = retfile(dirreltoab(cmdinpt[2]));\n        var cont = true;\n        var w = \"\";\n        var i = 0;\n        while(cont){\n            if(f.charAt(i)===\"*\"){\n                cont=false;\n            }else{\n                w+=f.charAt(i);\n            }\n            i++;\n        }\n        var h = \"\";\n        cont = true;\n        while(cont){\n            if(f.charAt(i)===\":\"){\n                cont=false;\n            }else{\n                h+=f.charAt(i);\n            }\n            i++;\n        }\n        w = parseInt(w);\n        h = parseInt(h);\n        set_sysvar(\"PAINT_WFW\",w);\n        set_sysvar(\"PAINT_WFH\",h);\n        set_sysvar(\"PAINT_WF\",f.slice(i,f.length));\n    }\n    retvar=0;\n}\nif(retvar===0){\n    var WF = get_sysvar(\"PAINT_WF\");\n    var DOT = get_sysvar(\"PAINT_DOT\");\n    var MD = get_sysvar(\"driver_mouse_down\");\n\n    if(keydown){\n        if(ckeydo){\n            if(ckey===\"Escape\"){\n                retvar=1;\n                keyinput=\"\";\n            }\n            ckeydo=false;\n        }else{\n            if(keyinput!==\"\"){\n                DOT=keyinput.charAt(0);\n            }\n            keyinput=\"\";\n        }\n    }\n\n    if(MD){\n        WF = chchar(WF,DOT,Math.min(get_sysvar(\"driver_mouse_y\"),get_sysvar(\"PAINT_WFH\")-1)*get_sysvar(\"PAINT_WFW\")+Math.min(get_sysvar(\"driver_mouse_x\"),get_sysvar(\"PAINT_WFW\")-1));\n    }\n\n    textbuffer=fittocwh(WF,get_sysvar(\"PAINT_WFW\"));\n    set_sysvar(\"PAINT_WF\",WF);\n    set_sysvar(\"PAINT_DOT\",DOT);\n}else if(retvar===1){\n    textbuffer=\"Save file? (y/n)\";\n    if(keyinput!==\"\"){\n        if(keyinput.charAt(0)===\"y\"||keyinput.charAt(0)===\"Y\"){\n            retvar=2;\n        }else if(keyinput.charAt(0)===\"n\"||keyinput.charAt(0)===\"N\"){\n            retvar=-1;\n            retcmd=\"\";\n        }\n        keyinput=\"\";\n    }\n}else if(retvar===2){\n    textbuffer=\"Enter file name: \"+keyinput+\"_\";\n    if(ckeydo){\n        if(ckey===\"Enter\"){\n            placecheapfilelong(dirreltoab(keyinput),\"\"+get_sysvar(\"PAINT_WFW\")+\"*\"+get_sysvar(\"PAINT_WFH\")+\":\"+get_sysvar(\"PAINT_WF\"));\n            keyinput=\"\";\n            retcmd=\"\";\n            retvar=-1;\n        }else if(ckey===\"Backspace\"){\n            keyinput=keyinput.slice(0,keyinput.length-1);\n        }\n        ckeydo=false;\n    }\n}"],
  ["/bin/makeclrpxt.ef","var f = \"\";\nf+=cmdinpt[2]+\"*\"+cmdinpt[3]+\":\";\nvar l = parseInt(cmdinpt[2])*parseInt(cmdinpt[3]);\nfor(var i=0;i<l;i++){\n    f+=\" \";\n}\nplacecheapfilelong(dirreltoab(cmdinpt[4]),f);"],
  ["/info/splashold.pxt","50*15:CSDOS:~$ _                                       #                                                 #                                                 #                                                 #      @@@@   @@@   @@@    @@@ @@@@         @@    #   @@@@  @@  @ @@@ @ @@   @ @ @@ @         @@    #   @      @  @     @  @@  @ @  @@@    @  @ @     #   @         @ @@  @  @@@@@ @@  @   @@    @@     #   @         @@@@  @  @ @@  @@  @@   @@  @@      #   @@           @  @  @  @  @ @@ @    @@@@       #    @@   @@  @ @@  @  @  @@@  @@@@               #     @@@@@   @@@   @@@     @                     #                                                 #                                                 ###################################################"],
  ["/bin/displaypxt.ef","if(retvar===-1){\n    retcmd=\"rjef /bin/displaypxt.ef\";\n    retvar=0;\n    var f = retfile(dirreltoab(cmdinpt[2]));\n    var cont = true;\n    var w = \"\";\n    var i = 0;\n    while(cont){\n        if(f.charAt(i)===\"*\"){\n            cont=false;\n        }else{\n            w+=f.charAt(i);\n        }\n        i++;\n    }\n    var h = \"\";\n    cont = true;\n    while(cont){\n        if(f.charAt(i)===\":\"){\n            cont=false;\n        }else{\n            h+=f.charAt(i);\n        }\n        i++;\n    }\n    w = parseInt(w);\n    h = parseInt(h);\n    set_sysvar(\"DPXT_WFW\",w);\n    set_sysvar(\"DPXT_WFH\",h);\n    set_sysvar(\"DPXT_WF\",f.slice(i,f.length));\n    set_sysvar(\"DPXT_ALLOWESC\",true);\n    set_sysvar(\"DPXT_WAIT\",false);\n    var i;\n    for(i=0;i<cmdinpt.length;i++){\n        if(cmdinpt[i]===\"-l\"){\n            set_sysvar(\"DPXT_ALLOWESC\",false);\n        }else if(cmdinpt[i]===\"-t\"){\n            if(i<cmdinpt.length-1){\n                set_sysvar(\"DPXT_WAIT\",true);\n                set_sysvar(\"DPXT_WAITAMT\",Math.floor(1000*parseFloat(cmdinpt[i+1])));\n                set_sysvar(\"DPXT_WAITSTART\",Date.now());\n                i++;\n            }else{\n                /*NAVA*/\n            }\n        }\n    }\n}\nvar ALLOWESCAPE = get_sysvar(\"DPXT_ALLOWESC\");\ntextbuffer=fittocwh(get_sysvar(\"DPXT_WF\"),get_sysvar(\"DPXT_WFW\"));\nif(keydown){\n    if(ckeydo){\n        if(ckey===\"Escape\"&&ALLOWESCAPE){\n            retvar=-1;\n            retcmd=\"\";\n            keyinput=\"\";\n        }\n        ckeydo=false;\n    }\n}\nif(get_sysvar(\"DPXT_WAIT\")&&Date.now()-get_sysvar(\"DPXT_WAITSTART\")>=get_sysvar(\"DPXT_WAITAMT\")){\n    retvar=-1;\n    retcmd=\"\";\n}"],
  ["/info/splash.pxt","100*30:                                                                                                     ##################################################################################################  ##################################################################################################  ##                                                                                              ##  ##                                                                                              ##  ##      ###########      #####        ####                                                      ##  ##     #### #### ###   ##########     #######       #####       ########                        ##  ##    ####            ###     ###     #########   ##########    ###  ####                       ##  ##    ###             ##              ###  #####  ##      ###   ###                             ##  ##    ###             ##              ###    #### ##      ###   ####                            ##  ##    ##               ###########    ###     ### ##       ##   ###########                     ##  ##    ###               ############  ###     ### ##       ##    ###########                    ##  ##    ###                         ##  ###     ### ###      ##             ###                   ##  ##    ###                        ###  ###     ###  ###    ###             ###                   ##  ##    #####          ####       ###   ###    ####   ###   ###            ####                   ##  ##     #####      #########  ######   ###   ####    ######### #        ######                   ##  ##      #############  #########      #########      #####    ##############                    ##  ##       ###########    ######        ######                   ########## #                     ##  ##                                                                                              ##  ##                                                                    Shout out to Nickkey T.   ##  ##                                                                                              ##  ##                                                                    Special thanks to all my  ##  ##                                                                    homies from Sumerian Nose ##  ##                                                                    Job, and all my mans      ##  ##                                                                    around the way.           ##  ##  CSDOS Beta -- In Development         C. Pestock (c) 2022          And trout.                ##  ##                                                                                              ##  ##################################################################################################  ##################################################################################################                                                                                                     "],
  ["/bin/jsh.ef","if(retvar===-1){\n    set_sysvar(\"JSH_TEXT\",\"\");\n    retvar=0;\n    retcmd=\"rjef /bin/jsh.ef\";\n    keyinput=\"\";\n}\n\nvar JSH_TEXT = get_sysvar(\"JSH_TEXT\");\n\nfunction JSH_COUT(s){\n    JSH_TEXT+=s+\"\\n\";\n}\n\nif(ckeydo){\n    if(ckey===\"Enter\"){\n        JSH_TEXT+=keyinput+\"\\n\";\n        eval(keyinput);\n        keyinput=\"\";\n    }else if(ckey===\"Escape\"){\n        retcmd=\"\";\n        retvar=-1;\n    }else if(ckey===\"Backspace\"){\n        keyinput=keyinput.slice(0,keyinput.length-1);\n    }\n    ckeydo=false;\n}\n\nset_sysvar(\"JSH_TEXT\",JSH_TEXT);\n\ntextbuffer=JSH_TEXT+keyinput+\"_\";"],["/bin/folderpkg.ef","var dir = dirreltoab(cmdinpt[2]);\nvar outdir = dirreltoab(cmdinpt[3]);\nvar out = \"[\";\nvar x = false;\nfor(var i=0;i<=gethighestfileindex();i++){\n    var dt = retfilenamebyindex(i).slice(0,dir.length);\n    if(dt===dir){\n        if(x){\n            out+=\",\";\n        }\n        out+=\"[\\\"\"+retfilenamebyindex(i).slice(dir.length)+\"\\\",\\\"\"+escform(retfilebyindex(i))+\"\\\"]\";\n        x=true;\n    }\n}\nout+=\"]\";\nplacecheapfilelong(outdir,out);"],["/bin/folderunpkg.ef","var f = retfile(dirreltoab(cmdinpt[2]));\nvar dir = dirreltoab(cmdinpt[3]);\nvar fr = eval(f);\nfor(var i=0;i<fr.length;i++){\n    placecheapfilelong(dir+fr[i][0],fr[i][1]);\n}"],
  ["/bin/schf","var M_LIST = get_sysvar(\"schf_list\");\nif(M_LIST===-255){\n    M_LIST = [\"rjef /bin/cmd\"];\n    //set_sysvar(\"shcf_list\",M_LIST);\n}\nvar M_CSCH = get_sysvar(\"schf_csch\");\nif(M_CSCH===-255){\n    M_CSCH = 0;\n    //set_sysvar(\"schf_csch\",0);\n}\nif(M_LIST.length===0){\n    exception_schf_noprogram();\n}else{\n    set_sysvar(\"schf_active\",true);\n    processcmd(M_LIST[M_CSCH]);\n    set_sysvar(\"schf_active\",false);\n    M_CSCH=(M_CSCH+1)%M_LIST.length;\n    set_sysvar(\"schf_list\",M_LIST);\n    set_sysvar(\"schf_csch\",M_CSCH);\n}"], 
  ["/bin/ueftest.uef","if(get_sysvar(\"schf_active\")===true){\n    //opened as background program\n    schf_killTask(\"rjef \"+API_DIRCALLED());\n    API_APPENDTEXTBUFFERPRE(\"Task (?) Killed\\n\");\n}else{\n    //opened as standard program\n    if(API_GETRETVAR()===-1){\n        schf_killTask(\"rjef \"+API_DIRCALLED());\n        schf_addTask(\"rjef \"+API_DIRCALLED());\n        //alert(API_DIRCALLED());\n        API_SETRETVAR(0);\n        API_SETRETCMD(\"rjef \"+API_DIRCALLED());\n    }\n    API_SETTEXTBUFFER(\"Press Backspace/Delete\"+API_GETCCATCUR());\n    if(API_CKEYDO()){\n        API_DIDCKEYCHK();\n        if(API_CKEY()===\"Backspace\"||API_CKEY()===\"Delete\"){\n            API_RESETRET();\n            API_CLRINPT();\n        }\n    }\n}"],
  ["/bin/repair_schf_noprogram.ef","retcmd=\"rjef /bin/repair_schf_noprogram.ef\";\nretvar=-1;\nbackgroundcol=[0,0,255];\ntextcol=[255,255,255];\ntextbuffer=\"An exception has occured, \\nOrdered: Reset scheduler variables, quit scheduler, set mainret program to /bin/cmd\\nNonfatal exception repair_schf_noprogram\\n\\n  Press Backspace/Delete to ignore this order, \\n  Press Enter to run this order (recommended); Note: system should be restarted in order to restart scheduler\\n\\nCSDOS Exception Handler Program\\n\"+retfile(\"/bin/version.dat\")+\"\\n_\";\nif(API_CKEYDO()){\n    API_DIDCKEYCHK();\n    if(API_CKEY()===\"Backspace\"||API_CKEY()===\"Delete\"){\n        retcmd=mainret;\n        retvar=-1;\n        backgroundcol=[0,0,0];\n        textcol=[255,255,255];\n    }else if(API_CKEY()===\"Enter\"){\n        force_rem_sysvar(\"schf_list\");\n        force_rem_sysvar(\"schf_csch\");\n        force_rem_sysvar(\"schf_active\");\n        mainret=\"rjef /bin/cmd\";\n        API_RESETRET();\n        API_CLRINPT();\n        backgroundcol=[0,0,0];\n        textcol=[255,255,255];\n    }\n}"],
  ["/bin/repair_schf_nolist.ef","retcmd=\"rjef /bin/repair_schf_nolist.ef\";\nretvar=-1;\nbackgroundcol=[0,0,255];\ntextcol=[255,255,255];\ntextbuffer=\"An exception has occured, \\nOrdered: Prevent action from occuring, notify user that UEF files cannot be run without scheduler\\nNonfatal exception repair_schf_nolist\\n\\n  Press Enter to continue\\n\\nCSDOS Exception Handler Program\\n\"+retfile(\"/bin/version.dat\")+\"\\n_\";\nif(API_CKEYDO()){\n    API_DIDCKEYCHK();\n    if(API_CKEY()===\"Enter\"){\n        API_RESETRET();\n        API_CLRINPT();\n        dircalled=\"\";\n        backgroundcol=[0,0,0];\n        textcol=[255,255,255];\n    }\n}"],
  ["/bin/list_tasks.ef","var T = get_sysvar(\"schf_list\");\nfor(var i=0;i<T.length;i++){\n    API_APPENDTEXTBUFFERPRE(T[i]+\"\\n\");\n}"],
  ["/bin/kernelwarnings/exc_retfile_nofilefound.ef","retcmd=\"rjef /bin/kernelwarnings/exc_retfile_nofilefound.ef\";\nretvar=-1;\nbackgroundcol=[0,0,255];\ntextcol=[255,255,255];\ntextbuffer=\"An exception has occured, \\nOrdered: Prevent action from occuring\\nNonfatal exception exc_retfile_nofilefound\\n\\n  Press Enter to continue\\n\\nCSDOS Exception Handler Program\\n\"+retfile(\"/bin/version.dat\")+\"\\n_\";\nif(API_CKEYDO()){\n    API_DIDCKEYCHK();\n    if(API_CKEY()===\"Enter\"){\n        API_RESETRET();\n        API_CLRINPT();\n        dircalled=\"\";\n        backgroundcol=[0,0,0];\n        textcol=[255,255,255];\n    }\n}"],["/bin/bfc-asm.ef","//alert(\"test\");\n\nvar program;// = \"setup 26\\nset 1 1\\ninv 1 2 3\";\n\nvar repldct = [\n[\"setup n\",\">-<{n}><+[<+]+<\"], //setup (final allocated memory index): initializes memory format\n[\"set c x\",\"{c}>[-]+{x}+{c}<\"], //set (cell) (value): sets cell (cell) to (value)\n[\"mvr c\",\"{c}>\"],//mvr (amt): move pointer right by (amt)\n[\"dec c x\",\"{c}>{x}-{c}<\"],//dec (cell) (amt): decrements cell (cell) by (amt)\n[\"inc c x\",\"{c}>{x}+{c}<\"],//inc (cell) (amt): increments cell (cell) by (amt)\n[\"goto c\",\"[<]{c}>\"],//goto (cell): sets pointer to (cell)\n[\"gotof_ncz c\",\"<[<]{c}>\"],//gotof_ncz (cell): sets pointer to (cell), do not use if at cell 0\n[\"mv i o\",\"{o}>[-]+{o}<{i}>-[-{i}<{o}>+{o}<{i}>]+{i}<\"],//mv (input cell) (output cell): sets cell (output cell) to value at (input cell), then sets value at (input cell) to 0\n[\"printaz char\",\"{char}+.[-]\"],//printaz (character number): prints character with numerical code (character number), use when at cell 0\n[\"printanz char\",\"{char}+.[-]+\"],//printanz (character number): prints character with numerical code (character number), use when not at cell 0\n[\"getchar store\",\"{store}>,+{store}<\"],//getchar (cell): stores input char at cell (cell)\n[\"loop x\",\"{x}>-[+{x}<\"],//loop (cell): start of loop, will halt when value at (cell) is 0; make sure value at (cell) is not 0 or -1, otherwise issues will occur\n[\"endloop x\",\"{x}>-]+{x}<\"],//endloop (cell): end of loop, will halt and continue if value at (cell) is 0, otherwise jumps to start of loop\n[\"if x\",\"{x}>-[+{x}<\"],//if (cell): start of if statement, will execute if value at (cell) is not 0\n[\"endif x\",\"{x}>[-]]+{x}<\"],//endif (cell): end of if statement (cell)\n[\"inv ct cs w\",\"{cs}>[-]++{cs}<{w}>[-]+{w}<{ct}>-[+{ct}<{w}>[-]++{w}<{cs}>[-]+{cs}<{ct}>[-]][-]+{ct}<{w}>-[-{w}<{ct}>+{ct}<{w}>]+{w}<\"],//inv (cell i) (cell p) (cell w): if (cell i) is equal to 0 will set (cell i) to 0 and (cell p) to 1, if (cell i) is equal to 1 will set (cell i) to 1 and (cell p) to 0, uses (cell w) for temporary calculation memory allocation\n[\"mvtr i o\",\"{i}>-[-{i}<{o}>+{o}<{i}>]+{i}<\"],//mvtr (cell input) (cell output): will add the value at (cell input) to (cell output) and leave (cell input) set to 0\n[\"mvab i a b\",\"{i}>-[-{i}<{a}>+{a}<{b}>+{b}<{i}>]+{i}<\"],//mvab (cell input) (cell output a) (cell output b): will add the value at (cell input) to (cell output a) and (cell output b), leaves (cell input) set to 0\n[\"getcharneq store comp w\",\"{store}>[-]+{store}<{w}>,{comp}-[{w}<{store}>+{store}<{w}>[-]]+{w}<\"],//getcharneq (cell store) (comp) (cell w): gets input char, if input char is not equal to (comp) sets (cell store) to 1, otherwise sets (cell store) to 0, uses (cell w) for temporary calculation memory allocation\n[\"mult a b o w\",\"{a}>-[+{a}<{b}>-[-{b}<{o}>+{o}<{w}>+{w}<{b}>]+{b}<{w}>-[-{w}<{b}>+{b}<{w}>]+{w}<{a}>--]+{a}<\"],//mult (cell input a) (cell input b) (cell output) (cell w): sets (cell output) to product of (cell input a) and (cell input b), sets (cell input a) to 0 and preserves (cell input b), uses (cell w) for temporary calculation memory allocation\n[\"printcell c\",\"{c}>-.+{c}<\"],//printcell (cell): prints character at (cell)\n[\"startprintcell c\",\"{c}>-.+\"],//startprintcell (cell): prints character at (cell) without returning to cell 0, use printnext to continue, use endprint to finish\n[\"printnext\",\">-.+\"],//printnext: prints next character in memory\n[\"endprint\",\"[<]\"],//endprint: ends print sequence\n[\"printuntil c comp\",\"{c}>{comp}--[{comp}++-.+>{comp}--]{comp}++<[<]\"],//printuntil (cell) (comp): print all characters starting from (cell) until first next cell equal to (comp); (comp) must be less than all characters in sequence, (comp) = 0 is recommended\n[\"RAW_PLUS x\",\"{x}+\"],\n[\"RAW_MINUS x\",\"{x}-\"],\n[\"RAW_LEFT x\",\"{x}<\"],\n[\"RAW_RIGHT x\",\"{x}>\"],\n[\"RAW_OPBR x\",\"{x}[\"],\n[\"RAW_CLBR x\",\"{x}]\"],\n[\"RAW_DOT x\",\"{x}.\"],\n[\"RAW_COMMA x\",\"{x},\"]\n];\n\n//alert(compile(program));\n//alert(rmws(\"     setup  25\\n         setup  5 \\n\"));\n\nfunction compile_frominpt(){\n    //program = document.getElementById(\"inpt\").value;\n    //document.getElementById(\"outp\").value = compile(rmws(program));\n\n    //program = inpt\n    //outpt = compile(rmws(program))\n}\n\nfunction rmws(s){\n    var ns = \"\";\n    var hnws = false;\n    var qs = false;\n    for(var i=0;i<s.length;i++){\n        if(s.charAt(i)===\" \"){\n            if(hnws){\n                //ns+=\" \";\n                qs=true;\n                hnws = false;\n            }else{\n\n            }\n        }else if(s.charAt(i)===\"\\n\"){\n            ns+=\"\\n\";\n            qs=false;\n            hnws = false;\n        }else if(s.charAt(i)!==\"\\t\"&&s.charAt(i)!==\"\\f\"&&s.charAt(i)!==\"\\r\"&&s.charAt(i)!==\"\\v\"){\n            if(qs){\n                ns+=\" \";\n                qs=false;\n            }\n            ns+=s.charAt(i);\n            hnws = true;\n        }\n    }\n    return ns;\n}\n\nfunction compile(p){\n    var out = \"\";\n    p = p.split(\'\\n\');\n    for(var i=0;i<p.length;i++){\n        //var t = p[i].split(\' \');\n        //alert(p[i]);\n        out+=getrepldct(p[i]);\n    }\n    return out;\n}\n\nfunction getrepldct(line){\n    var ls = line.split(\' \');\n    var rs = -1;\n    var i,j;\n    for(i=0;i<repldct.length;i++){\n        if(ls[0]===repldct[i][0].split(\' \')[0]){\n            rs = i;\n            break;\n        }\n    }\n    //alert(rs);\n    if(rs === -1){\n        return \"\";\n    }else{\n        var ref = repldct[rs][0].split(\' \');\n        var str = repldct[rs][1];\n        var newstr = \"\";\n        var brm = false;\n        var br = \"\";\n        var amt = 1;\n        for(i=0;i<str.length;i++){\n            if(brm){\n                if(str.charAt(i)===\"}\"){\n                    //var r;\n                    brm = false;\n                    for(j=1;j<ref.length;j++){\n                        if(br===ref[j]){\n                            amt = parseInt(ls[j]);\n                        }\n                    }\n                }else{\n                    br+=str.charAt(i);\n                }\n            }else{\n                if(str.charAt(i)===\"{\"){\n                    brm=true;\n                    br = \"\";\n                }else{\n                    for(j=0;j<amt;j++){\n                        newstr+=str.charAt(i);\n                    }\n                    amt=1;\n                }\n            }\n        }\n        return newstr;\n    }\n    //return \"TEST\";\n}\n\n//New Code (CSDOS Port)\nfunction getCLIParams(inl){\n    var inpfile = \"\";\n    var outpfile = \"\";\n    var outpcli = false;\n    for(var i=2;i<inl.length;i++){\n        switch(inl[i]){\n            case \"-fi\":\n                if(inl.length-i>1){\n                    inpfile=inl[i+1];\n                    i+=1;\n                }\n                break;\n            case \"-fo\":\n                if(inl.length-i>1){\n                    outpfile=inl[i+1];\n                    i+=1;\n                }\n                break;\n            case \"-p\":\n                outpcli = true;\n                break;\n        }\n    }\n    return [inpfile,outpfile,outpcli];\n}\n\nvar params = getCLIParams(cmdinpt);\nprogram = retfile(dirreltoab(params[0]));\nvar outputfilecontents = compile(rmws(program));\nif(params[2]){\n    textbufferpre+=outputfilecontents+\"\\n\";\n}\nplacecheapfilelong(params[1],outputfilecontents);"],["/bin/bfc-clr.ef","var program = \"int a 1;int b 2;int t;set %b 3;set %a %b %t;\";\n//x x;x;x \" \"   x   \"  x     \" x\n\nvar varnames = [];\nvar vartypes = [];\nvar varinfo =  [];\nvar macronames = [];\nvar macros = [];\n\n//int: name, \"i\", pointer; char: name, \"c\", pointer; const: name, \"_\", value; bool: name, \"b\", pointer\n\nfunction compile(P){\n    var p = rmws(P);\n    var ifs = [];\n    var loops = [];\n    varnames = [\"%ZERO\"];\n    vartypes = [\"i\"];\n    varinfo = [0];\n\n    var i;\n    var curstr = \"\";\n\n    var inmacro = false;\n    var curmacro = \"\";\n\n    var start = 0;\n\n    var out = \"\";\n    //console.log(p);\n    for(var i=0;i<=p.length;i++){\n        if(p.charAt(i)===\";\"||(i===p.length&&curstr!==\"\")){\n            var l = getlistfrcurstr(curstr);\n            //console.log(l);\n\n            if(inmacro){\n                if(l[0]===\"#endmacro\"){\n                    inmacro=false;\n                    macros.push(curmacro);\n                    console.log(macros);\n                }else{\n                    curmacro+=curstr+\";\";\n                }\n            }else{\n\n                console.log(l);\n\n                if(l[0]===\"test\"){\n                    out+=\"testsuccess\\n\";\n                    //console.log(\"test\");\n                }else if(l[0]===\"int\"){\n                    if(l.length===2){\n                        addVar(l[1],\"int\",\"\");\n                    }else if(l.length>2){\n                        addVar(l[1],\"int\",\"\");\n                        out+=\"set \"+formtypetolit(\"%\"+l[1])+\" \"+formtypetolit(l[2])+\"\\n\";\n                    }\n                    //console.log(l);\n                }else if(l[0]===\"char\"){\n                    if(l.length===2){\n                        addVar(l[1],\"char\",\"\");\n                    }else if(l.length>2){\n                        addVar(l[1],\"char\",\"\");\n                        out+=\"set \"+formtypetolit(\"%\"+l[1])+\" \"+formtypetolit(l[2])+\"\\n\";\n                    }\n                    //console.log(l);\n                }else if(l[0]===\"bool_cell\"){\n                    if(l.length===2){\n                        addVar(l[1],\"bool_cell\",\"\");\n                    }else if(l.length>2){\n                        addVar(l[1],\"bool_cell\",\"\");\n                        out+=\"set \"+formtypetolit(\"%\"+l[1])+\" \"+formtypetolit(l[2])+\"\\n\";\n                    }\n                    //console.log(l);\n                }else if(l[0]===\"#const\"){\n                    if(l.length>2){\n                        addVar(l[1],\"const\",formtypetolit(l[2]));\n                    }\n                    //console.log(l);\n                }else if(l[0]===\"cout\"){\n                    var t = feedtype(l[1]);\n                    switch(t){\n                        case \"char\":\n                            out+=\"printaz \"+formtypetolit(l[1])+\"\\n\";\n                            break;\n                        case \"string\":\n                            for(var ti=1;ti<l[1].length-1;ti++){\n                                out+=\"printaz \"+l[1].charCodeAt(ti)+\"\\n\";\n                            }\n                            break;\n                        case \"const\":\n                            out+=\"printaz \"+formtypetolit(l[1])+\"\\n\";\n                            break;\n                        case \"var\":\n                            out+=\"printcell \"+formtypetolit(l[1])+\"\\n\";\n                            break;\n                        case \"lit\":\n                            out+=\"printaz \"+formtypetolit(l[1])+\"\\n\";\n                            break;\n                    }\n                }else if(l[0]===\"if\"){\n                    ifs.push(formtypetolit(l[1]));\n                    out+=\"if \"+ifs[ifs.length-1]+\"\\n\";\n                }else if(l[0]===\"endif\"){\n                    out+=\"endif \"+ifs[ifs.length-1]+\"\\n\";\n                    ifs.pop();\n                }else if(l[0]===\"loop\"){\n                    loops.push(formtypetolit(l[1]));\n                    out+=\"loop \"+loops[loops.length-1]+\"\\n\";\n                }else if(l[0]===\"endloop\"){\n                    out+=\"endloop \"+loops[loops.length-1]+\"\\n\";\n                    loops.pop();\n                }else if(l[0]===\"#memory\"){\n                    out+=\"setup \"+formtypetolit(l[1])+\"\\n\";\n                }else if(l[0]===\"#automemorycellz\"){\n                    out+=\"RAW_MINUS 2\\nRAW_OPBR 1\\nRAW_MINUS 1\\nRAW_RIGHT 1\\nRAW_PLUS 1\\nRAW_LEFT 1\\nRAW_CLBR 1\\nRAW_RIGHT 1\\nRAW_MINUS 1\\nRAW_OPBR 2\\nRAW_RIGHT 1\\nRAW_CLBR 1\\nRAW_PLUS 1\\nRAW_OPBR 1\\nRAW_LEFT 1\\nRAW_CLBR 1\\nRAW_RIGHT 1\\nRAW_MINUS 1\\nRAW_CLBR 1\\nRAW_PLUS 1\\nRAW_LEFT 1\\n\";\n                }else if(l[0]===\"#RAW\"){\n                    out+=formtypetolit(l[1])+\"\\n\";\n                }else if(l[0]===\"#RAW_NOLF\"){\n                    out+=formtypetolit(l[1]);\n                }else if(l[0]===\"set\"){\n                    var ft = feedtype(l[2]);\n                    if(ft===\"char\"||ft===\"const\"||ft===\"lit\"){\n                        out+=\"set \"+formtypetolit(l[1])+\" \"+formtypetolit(l[2])+\"\\n\";\n                    }else if(ft===\"var\"){\n                        //mvtr i t\n                        //mvab t i o\n                        out+=\"mvtr \"+formtypetolit(l[2])+\" \"+formtypetolit(l[3])+\"\\nset \"+formtypetolit(l[1])+\" 0\\nset \"+formtypetolit(l[2])+\" 0\\nmvab \"+formtypetolit(l[3])+\" \"+formtypetolit(l[1])+\" \"+formtypetolit(l[2])+\"\\n\";\n                    }\n                }else if(l[0]===\"cin\"){\n                    out+=\"getchar \"+formtypetolit(l[1])+\"\\n\";\n                }else if(l[0]===\"#define_macro\"){\n                    inmacro=true;\n                    macronames.push(l[1]);\n                    //macros.push();\n                    curmacro=\"\";\n                }else if(l[0]===\"#domacro\"){\n                    var o = \"\";\n                    for(var j=0;j<macronames.length;j++){\n                        if(macronames[j]===l[1]){\n                            o=macros[j];\n                        }\n                    }\n                    console.log(o);\n                    console.log(macronames);\n                    p=p.slice(0,start)+o+p.slice(i+1,p.length);\n                    i=start-1;\n                    console.log(p);\n                }else if(l[0]===\"inc\"){\n                    out+=\"inc \"+formtypetolit(l[1])+\" \"+formtypetolit(l[2])+\"\\n\";\n                }else if(l[0]===\"dec\"){\n                    out+=\"dec \"+formtypetolit(l[1])+\" \"+formtypetolit(l[2])+\"\\n\";\n                }else if(l[0]===\"mult\"){\n                    out+=\"mult \"+formtypetolit(l[1])+\" \"+formtypetolit(l[2])+\" \"+formtypetolit(l[3])+\" \"+formtypetolit(l[4])+\"\\n\";\n                }\n\n            }\n\n            curstr=\"\";\n            start=i+1;\n        }else if(i<p.length){\n            curstr+=p.charAt(i);\n        }\n    }\n    return out;\n}\n\nfunction feedtype(s){\n    if(s.charAt(0)===\"\'\"){\n        return \"char\";\n    }else if(s.charAt(0)===\"\\\"\"){\n        return \"string\";\n    }else if(s.charAt(0)===\"_\"){\n        return \"const\";\n    }else if(s.charAt(0)===\"%\"){\n        return \"var\";\n    }else if(s===\"true\"||s===\"false\"){\n        return \"lit\";\n    }else{\n        return \"lit\";\n    }\n}\n\nfunction getlistfrcurstr(str){\n    var inq = false;\n    var temp = \"\";\n    var out = [];\n    var esc = false;\n    var qchar = \"\";\n    for(var i=0;i<str.length;i++){\n        if(esc){\n            temp+=str.charAt(i);\n            esc=false;\n        }else if(inq){\n            if(str.charAt(i)===\"\\\\\"){\n                esc=true;\n            }else{\n                temp+=str.charAt(i);\n            }\n            if(str.charAt(i)===qchar&&!esc){\n                inq=false;\n            }\n        }else if(str.charAt(i)===\"\\\\\"){\n            esc = true;\n            //temp+=\"\\\\\";\n        }else if(str.charAt(i)===\"\\\"\"||str.charAt(i)===\"\'\"){\n            qchar = str.charAt(i);\n            temp+=qchar;\n            inq=true;\n        }else if(str.charAt(i)===\" \"){\n            out.push(temp);\n            temp=\"\";\n        }else{\n            temp+=str.charAt(i);\n        }\n    }\n    if(temp!==\"\"){\n        out.push(temp);\n    }\n    return out;\n}\n\nfunction rmws(str){\n    var hitws = true;\n    var qws = false;\n    var out = \"\";\n    var esc = false;\n    var inq = false;\n    var qchar = \"\";\n    var hitany = false;\n    for(var i=0;i<str.length;i++){\n        if(inq){\n            if(esc){\n                if(str.charAt(i)===\"n\"){\n                    out+=\"\\n\";\n                }else if(str.charAt(i)===\"\\\"\"){\n                    out+=\"\\\"\";\n                }else if(str.charAt(i)===\"\'\"){\n                    out+=\"\'\";\n                }else{\n                    out+=str.charAt(i);\n                }\n                esc=false;\n            }else if(str.charAt(i)===\"\\\\\"){\n                esc=true;\n                out+=\"\\\\\";\n            }else if(str.charAt(i)===qchar){\n                inq=false;\n                out+=qchar;\n                if(qws){\n                    //hitws=false;\n                    qws=false;\n                    out+=\" \";\n                }\n                hitws=false;\n            }else{\n                out+=str.charAt(i);\n            }\n        }else{\n            if(esc){\n                if(str.charAt(i)===\"n\"){\n                    out+=\"\\n\";\n                }else if(str.charAt(i)===\"\\\"\"){\n                    out+=\"\\\"\";\n                }else if(str.charAt(i)===\"\'\"){\n                    out+=\"\'\";\n                }\n                esc=false;\n            }else if(str.charAt(i)===\"\\\\\"){\n                if(qws){\n                    //hitws=false;\n                    qws=false;\n                    out+=\" \";\n                }\n                hitws=false;\n                esc=true;\n                hitany=true;\n            }else if(str.charAt(i)===\"\\\"\"||str.charAt(i)===\"\'\"){\n                if(qws){\n                    //hitws=false;\n                    qws=false;\n                    out+=\" \";\n                }\n                hitws=false;\n                inq=true;\n                qchar=str.charAt(i);\n                out+=str.charAt(i);\n                hitany=true;\n            }else if(str.charAt(i)===\"\\n\"||str.charAt(i)===\";\"){\n                if(hitany){\n                    hitws=true;\n                    qws=false;\n                    out+=\";\";\n                    hitany=false;\n                }\n            }else if(str.charAt(i)===\" \"||str.charAt(i)===\"\\t\"){\n                if(!hitws){\n                    //out+=\" \";\n                    hitws=true;\n                    qws=true;\n                }\n                hitany=true;\n            }else{\n                if(qws){\n                    //hitws=false;\n                    qws=false;\n                    out+=\" \";\n                }\n                hitws=false;\n                out+=str.charAt(i);\n                hitany=true;\n            }\n        }\n    }\n    return out;\n}\n\nfunction formtypetolit(s){//returns an integer\n    var i;\n    if(s.charAt(0)===\'\\\'\'){\n        //char\n        return s.charCodeAt(1);\n    }else if(s.charAt(0)===\'\\\"\'){\n        //string\n\n    }else if(s.charAt(0)===\"_\"){\n        //const\n        var c = -1;\n        for(i=0;i<varnames.length;i++){\n            if(s===varnames[i]&&vartypes[i]===\"_\"){\n                c = varinfo[i];\n            }\n        }\n        return c;\n    }else if(s.charAt(0)===\"%\"){\n        //varpointer\n        var v = -1;\n        for(i=0;i<varnames.length;i++){\n            if(s===varnames[i]&&(vartypes[i]===\"i\"||vartypes[i]===\"c\"||vartypes[i]===\"b\")){\n                v = varinfo[i];\n            }\n        }\n        return v;\n    }else if(s===\"true\"){\n        return 1;\n    }else if(s===\"false\"){\n        return 0;\n    }else{\n        //number\n        return parseInt(s);\n    }\n}\n\nfunction addVar(name,type,info){\n    //Only use in instantiation, does not set values of vars\n    switch(type){\n        case \"const\":\n            varnames.push(\"_\"+name);\n            vartypes.push(\"_\");\n            varinfo.push(info);\n            break;\n        case \"int\":\n            varnames.push(\"%\"+name);\n            vartypes.push(\"i\");\n            varinfo.push(getnextunresvcell());\n            break;\n        case \"char\":\n            varnames.push(\"%\"+name);\n            vartypes.push(\"c\");\n            varinfo.push(getnextunresvcell());\n            break;\n        case \"bool_cell\":\n            varnames.push(\"%\"+name);\n            vartypes.push(\"b\");\n            varinfo.push(getnextunresvcell());\n            break;\n    }\n    //varinfo.push(info);\n}\n\nfunction getnextunresvcell(){\n    var a = 0;\n    for(var i=0;i<vartypes.length;i++){\n        if(vartypes[i]===\"c\"||vartypes[i]===\"i\"||vartypes[i]===\"b\"){\n            if(varinfo[i]===a){\n                a++;\n                i=-1;\n            }\n        }\n    }\n    return a;\n}\n\n//alert(rmws(program));\n//addVar(\"test\",\"int\",\"1\");\n//alert(formtypetolit(\"%test\"));\n//alert(getlistfrcurstr(\"a b c d \\\"   e   f  \\\\\\\"  f g  h\\\" i j k\"));\n/*addVar(\"0\",\"int\",3);\naddVar(\"1\",\"int\",2);\naddVar(\"2\",\"int\",0);\nalert(getnextunresvcell());\naddVar(\"3\",\"int\",1);\nalert(getnextunresvcell());*/\n//alert(compile(program));\n//console.log(getlistfrcurstr(\"a b c \\\"   \\\\\\\"   \\\" d e\"));\n\n//CSDOS Compatability Code\nfunction getCLIParams(inl){\n    var inpfile = \"\";\n    var outpfile = \"\";\n    var outpcli = false;\n    var linkfile = \"\";\n    for(var i=2;i<inl.length;i++){\n        switch(inl[i]){\n            case \"-fi\":\n                if(inl.length-i>1){\n                    inpfile=inl[i+1];\n                    i+=1;\n                }\n                break;\n            case \"-fo\":\n                if(inl.length-i>1){\n                    outpfile=inl[i+1];\n                    i+=1;\n                }\n                break;\n            case \"-p\":\n                outpcli = true;\n                break;\n            case \"-l\":\n                if(inl.length-i>1){\n                    linkfile+=retfile(dirreltoab(inl[i+1]));\n                    i+=1;\n                }\n                break;\n        }\n    }\n    return [inpfile,outpfile,outpcli,linkfile];\n}\n\nvar params = getCLIParams(cmdinpt);\nprogram = retfile(dirreltoab(params[0]));\nvar outputfilecontents = compile(params[3]+program);//links\nif(params[2]){\n    textbufferpre+=outputfilecontents+\"\\n\";\n}\nplacecheapfilelong(params[1],outputfilecontents);"],
  ["/bin/make-bfc-clr-comp-bac.ef","if(retvar===-1){\n    retvar=0;\n    retcmd=\"rjef \"+API_DIRCALLED();\n    keyinput=\"\";\n    set_sysvar(\"make_input\",\"\");\n    set_sysvar(\"make_output\",\"\");\n    set_sysvar(\"make_linkstr\",\"\");\n    set_sysvar(\"make_extra\",\"\");\n}\nif(retvar===0){\n    textbuffer=\"Make Compilation Script (BFC-CLR-CSDOS)\\n1. Set Input File\\n2. Set Output File\\n3. Link Header File(s)\\n4. Create File\\n5. Cancel\\n6. Add Custom Parameters\";\n    if(keyinput===\"1\"){\n        keyinput=\"\";\n        retvar=1;\n    }else if(keyinput===\"2\"){\n        keyinput=\"\";\n        retvar=2;\n    }else if(keyinput===\"3\"){\n        keyinput=\"\";\n        retvar=3;\n    }else if(keyinput===\"4\"){\n        keyinput=\"\";\n        retvar=4\n    }else if(keyinput===\"5\"){\n        keyinput=\"\";\n        retvar=-1;\n        retcmd=\"\";\n    }else if(keyinput===\"6\"){\n        keyinput=\"\";\n        retvar=6;\n    }else if(keyinput!==\"\"){\n        keyinput=\"\";\n    }\n}else if(retvar===1){\n    textbuffer=\"Enter Input File Name: \\n\"+keyinput+\"_\";\n    if(ckeydo){\n        if(ckey===\"Enter\"){\n            set_sysvar(\"make_input\",dirreltoab(keyinput));\n            keyinput=\"\";\n            retvar=0;\n        }else if(ckey===\"Backspace\"){\n            keyinput=keyinput.slice(0,keyinput.length-1);\n        }\n        ckeydo=false;\n    }\n}else if(retvar===2){\n    textbuffer=\"Enter Output File Name: \\n\"+keyinput+\"_\";\n    if(ckeydo){\n        if(ckey===\"Enter\"){\n            set_sysvar(\"make_output\",dirreltoab(keyinput));\n            keyinput=\"\";\n            retvar=0;\n        }else if(ckey===\"Backspace\"){\n            keyinput=keyinput.slice(0,keyinput.length-1);\n        }\n        ckeydo=false;\n    }\n}else if(retvar===3){\n    textbuffer=\"Enter Link File Name (Cannot be removed without restarting make-comp-bac): \\n\"+keyinput+\"_\";\n    if(ckeydo){\n        if(ckey===\"Enter\"){\n            //set_sysvar(\"make_output\",dirreltoab(keyinput));\n            set_sysvar(\"make_linkstr\",get_sysvar(\"make_linkstr\")+\" -l \"+keyinput);\n            keyinput=\"\";\n            retvar=0;\n        }else if(ckey===\"Backspace\"){\n            keyinput=keyinput.slice(0,keyinput.length-1);\n        }\n        ckeydo=false;\n    }\n}else if(retvar===4){\n    textbuffer=\"Enter Script File Name: \\n\"+keyinput+\"_\";\n    if(ckeydo){\n        if(ckey===\"Enter\"){\n            //set_sysvar(\"make_output\",dirreltoab(keyinput));\n            placecheapfilelong(dirreltoab(keyinput),\"$ /bin/bfc-clr.ef -fi \"+get_sysvar(\"make_input\")+\" -fo \"+\"/a.out\"+get_sysvar(\"make_linkstr\")+get_sysvar(\"make_extra\")+\"\\n$ /bin/bfc-asm.ef -fi /a.out -fo \"+get_sysvar(\"make_output\"));\n            keyinput=\"\";\n            retvar=-1;\n            retcmd=\"\";\n        }else if(ckey===\"Backspace\"){\n            keyinput=keyinput.slice(0,keyinput.length-1);\n        }\n        ckeydo=false;\n    }\n}else if(retvar===6){\n    textbuffer=\"Enter Parameters: \\n\"+keyinput+\"_\";\n    if(ckeydo){\n        if(ckey===\"Enter\"){\n            set_sysvar(\"make_extra\",\" \"+keyinput);\n            keyinput=\"\";\n            retvar=0;\n        }else if(ckey===\"Backspace\"){\n            keyinput=keyinput.slice(0,keyinput.length-1);\n        }\n        ckeydo=false;\n    }\n}"],
  ["/bin/2t2.ef","var f = [];\n\nfunction ftorf(arr){\n    var str=arr[0];\n    for(var i=1;i<arr.length;i++){\n        str+=\"\\n\"+arr[i];\n    }\n    return str;\n}\n\nfunction frtof(str){\n    var arr=[];\n    var temp = \"\";\n    for(var i=0;i<str.length;i++){\n        if(str.charAt(i)===\"\\n\"){\n            arr.push(temp);\n            temp=\"\";\n        }else{\n            temp+=str.charAt(i);\n        }\n    }\n    if(temp!==\"\"){\n        arr.push(temp);\n    }\n    if(arr.length===0){\n        arr.push(\"\");\n    }\n    return arr;\n}\n\nfunction renderClipArr(arr,c,l){\n    var out = \"\";\n    for(var i=Math.max(0,c-l);i<=Math.max(c,l);i++){\n        out+=i+\": \"+arr[i]+\"\\n\";\n    }\n    return out;\n}\n\nif(retvar===-1){\n    retvar=0;\n    retcmd=\"rjef \"+API_DIRCALLED();\n    set_sysvar(\"2t2_file\",\"\");\n    set_sysvar(\"2t2_line\",0);\n    if(cmdinpt.length>2){\n        set_sysvar(\"2t2_file\",retfile(dirreltoab(cmdinpt[2])));\n    }\n}\ntextbuffer=\"\";\nvar fr = get_sysvar(\"2t2_file\");\nvar f = frtof(fr);\nif(retvar===0){\n    textbuffer+=keyinput+\"_\\n\";\n    if(ckeydo){\n\t\tckeydo=false;\n\t\tswitch(ckey){\n\t\t\tcase \"Enter\":\n\t\t\t\tif(keyinput.charAt(0)===\"+\"){\n\t\t\t\t\t//f+=keyinput.slice(1)+\"\\n\";\n                    //retvar=2;\n\t\t\t\t\tkeyinput=f[get_sysvar(\"2t2_line\")];\n                    if(\"\"+keyinput===\"undefined\"){\n                        keyinput=\"\";\n                    }\n                    retvar=1;\n\t\t\t\t}else if(keyinput.charAt(0)===\"q\"){\n\t\t\t\t\tretvar=-1;\n\t\t\t\t\tretcmd=\"\";\n\t\t\t\t\tkeyinput=\"\";\n\t\t\t\t}else if(keyinput.charAt(0)===\"s\"){\n                    retvar=2;\n                    keyinput=\"\";\n                }\n\t\t\t\tbreak;\n\t\t\tcase \"Backspace\":\n\t\t\t\tkeyinput=keyinput.slice(0,keyinput.length-1);\n\t\t\t\tbreak;\n            case \"ArrowUp\":\n                set_sysvar(\"2t2_line\",Math.max(0,get_sysvar(\"2t2_line\")-1));\n                break;\n            case \"ArrowDown\":\n                set_sysvar(\"2t2_line\",get_sysvar(\"2t2_line\")+1);\n                if(get_sysvar(\"2t2_line\")>=f.length){\n                    for(var i=0;i<=get_sysvar(\"2t2_line\")-f.length+1;i++){\n                        f.push(\"\");\n                    }\n                    set_sysvar(\"2t2_file\",ftorf(f));\n                }\n                //console.log(f);\n                break;\n\t\t}\n\t}\n}else if(retvar===1){\n    \n    f[get_sysvar(\"2t2_line\")]=keyinput;\n    set_sysvar(\"2t2_file\",ftorf(f));\n\n    if(ckeydo){\n\t\tckeydo=false;\n\t\tswitch(ckey){\n\t\t\tcase \"Enter\":\n\t\t\t\tretvar=0;\n                keyinput=\"\";\n\t\t\t\tbreak;\n\t\t\tcase \"Backspace\":\n\t\t\t\tkeyinput=keyinput.slice(0,keyinput.length-1);\n\t\t\t\tbreak;\n\t\t}\n\t}\n}else if(retvar===2){\n    textbuffer+=\"Enter File Name: \\n\"+keyinput+\"_\\n\";\n    if(ckeydo){\n\t\tckeydo=false;\n\t\tswitch(ckey){\n\t\t\tcase \"Enter\":\n                placecheapfilelong(dirreltoab(keyinput),get_sysvar(\"2t2_file\"));\n\t\t\t\tretvar=0;\n                keyinput=\"\";\n\t\t\t\tbreak;\n\t\t\tcase \"Backspace\":\n\t\t\t\tkeyinput=keyinput.slice(0,keyinput.length-1);\n\t\t\t\tbreak;\n\t\t}\n\t}\n}\n//textbuffer+=get_sysvar(\"2t2_file\")+\"\\n\"+get_sysvar(\"2t2_line\");\ntextbuffer+=renderClipArr(f,get_sysvar(\"2t2_line\"),HEIGHT-5)+\"\\n\"+get_sysvar(\"2t2_line\");"],["/info/splash41.pxt","100*30:                                                                                                     ##################################################################################################  ##################################################################################################  ##                                                                                              ##  ##                                                                                              ##  ##      ###########      #####        ####                                                      ##  ##     #### #### ###   ##########     #######       #####       ########                        ##  ##    ####            ###     ###     #########   ##########    ###  ####                       ##  ##    ###             ##              ###  #####  ##      ###   ###                             ##  ##    ###             ##              ###    #### ##      ###   ####                            ##  ##    ##               ###########    ###     ### ##       ##   ###########                     ##  ##    ###               ############  ###     ### ##       ##    ###########                    ##  ##    ###                         ##  ###     ### ###      ##             ###                   ##  ##    ###                        ###  ###     ###  ###    ###             ###                   ##  ##    #####          ####       ###   ###    ####   ###   ###            ####                   ##  ##     #####      #########  ######   ###   ####    ######### #        ######                   ##  ##      #############  #########      #########      #####    ##############                    ##  ##       ###########    ######        ######                   ########## #                     ##  ##                           ##                                                                 ##  ##                          # #                                       Shout out to Nickkey T.   ##  ##                         #  #   #                                                             ##  ##                      #  ####  ##                                   Special thanks to all my  ##  ##                            #   #                                   homies from Sumerian Nose ##  ##                         #  #  ###   #                              Job, and all my mans      ##  ##                                                                    around the way.           ##  ##  CSDOS Beta -- In Development  #      C. Pestock (c) 2022          And trout.                ##  ##                                                                                              ##  ##################################################################################################  ##################################################################################################                                                                                                      "],["/bin/hexedit.ef","if(get_sysvar(\"schf_active\")===true){\n\n}else{\n    if(API_GETRETVAR()===-1){\n        API_SETRETVAR(0);\n        API_SETRETCMD(\"rjef \"+API_DIRCALLED());\n        set_sysvar(\"hxe_file\",\"\");\n        set_sysvar(\"hxe_cur\",0);\n        set_sysvar(\"hxe_perln\",6);\n        set_sysvar(\"hxe_offs\",0);\n        if(cmdinpt.length>2){\n            set_sysvar(\"hxe_file\",retfile(dirreltoab(cmdinpt[2])));\n        }\n    }\n    var fr = get_sysvar(\"hxe_file\");\n    var cur = get_sysvar(\"hxe_cur\");\n    var perln = get_sysvar(\"hxe_perln\");\n    var dispfull = getfulldisp(fr,perln);\n    var offs = get_sysvar(\"hxe_offs\");\n    textbuffer=\"\";\n    switch(API_GETRETVAR()){\n        case 0:\n            textbuffer+=getlines(dispfull,cur,HEIGHT-5)+\"\\n\";\n            textbuffer+=ito8dhexstr(cur*perln+Math.floor(offs*0.5))+\"\\n\";\n            textbuffer+=selbar(offs,perln*2);\n            textbuffer+=keyinput+\"_\";\n            if(API_CKEYDO()){\n                API_DIDCKEYCHK();\n                if(API_CKEY()===\"Backspace\"||API_CKEY()===\"Delete\"){\n                    keyinput=keyinput.slice(0,keyinput.length-1);\n                }else if(API_CKEY()===\"Enter\"){\n                    if(keyinput===\"q\"){\n                        retvar=-1;\n                        retcmd=\"\";\n                        keyinput=\"\";\n                    }else if(keyinput===\"s\"){\n                        keyinput=\"\";\n                        retvar=1;\n                    }else if(keyinput===\"h\"){\n                        retvar=2;\n                    }else if(keyinput===\"sc\"){\n                        keyinput=\"\";\n                        retvar=3;\n                    }else if(keyinput===\"s10\"){\n                        keyinput=\"\";\n                        retvar=5;\n                    }else if(keyinput===\"s16\"){\n                        keyinput=\"\";\n                        retvar=4;\n                    }else if(keyinput===\"add\"){\n                        keyinput=\"\";\n                        retvar=6;\n                    }else if(keyinput===\"rem\"){\n                        keyinput=\"\";\n                        retvar=7;\n                    }else{\n                        keyinput=\"\";\n                    }\n                }else if(API_CKEY()===\"ArrowUp\"){\n                    cur=Math.max(0,cur-1);\n                }else if(API_CKEY()===\"ArrowDown\"){\n                    cur=Math.min(Math.ceil((fr.length-1)/perln),cur+1);\n                }else if(API_CKEY()===\"ArrowLeft\"){\n                    offs=Math.max(0,offs-1);\n                }else if(API_CKEY()===\"ArrowRight\"){\n                    offs=Math.min(perln*2-1,offs+1);\n                }\n\n            }\n        break;\n        case 1:\n            textbuffer+=\"Enter File Name: \\n\"+keyinput+\"_\\n\";\n            if(ckeydo){\n\t\t        ckeydo=false;\n\t\t        switch(ckey){\n\t\t\t        case \"Enter\":\n                        placecheapfilelong(dirreltoab(keyinput),get_sysvar(\"hxe_file\"));\n\t\t\t\t        retvar=0;\n                        keyinput=\"\";\n\t\t\t\t        break;\n\t\t\t        case \"Backspace\":\n\t\t\t\t        keyinput=keyinput.slice(0,keyinput.length-1);\n\t\t\t\t        break;\n\t\t        }\n\t        }\n        break;\n        case 2:\n            textbuffer=\"Help page, press Enter/Return to exit\\n\\nCommands: \\nq: quit\\ns: save file\\nh: show help page\\nsc: set data at cursor by character\\ns10: set data at cursor and sub-byte by decimal\\ns16: set data  at cursor and sub-byte by hexadecimal\\nadd: add bytes to file\\nrem: remove bytes from file (cannot be undone)\\n\\n_\";\n            if(API_CKEYDO()){\n                API_DIDCKEYCHK();\n                if(API_CKEY()===\"Enter\"){\n                    keyinput=\"\";\n                    retvar=0;\n                }\n\n            }\n        break;\n        case 3: \n            var chiter = cur*perln+Math.floor(offs*0.5);\n            textbuffer+=getlines(dispfull,cur,HEIGHT-5)+\"\\n\";\n            textbuffer+=ito8dhexstr(cur*perln+Math.floor(offs*0.5))+\"\\n\";\n            textbuffer+=selbar(offs,perln*2);\n            textbuffer+=\"Set character at address \"+ito8dhexstr(chiter)+\" to: \"+keyinput+\"_\";\n            if(API_CKEYDO()){\n                API_DIDCKEYCHK();\n                if(API_CKEY()===\"Backspace\"||API_CKEY()===\"Delete\"){\n                    keyinput=keyinput.slice(0,keyinput.length-1);\n                }else if(API_CKEY()===\"Enter\"){\n                    fr=fr.slice(0,chiter)+keyinput.charAt(0)+fr.slice(chiter+1,fr.length);\n                    keyinput=\"\";\n                    retvar=0;\n                }\n\n            }\n        break;\n        case 4:\n            var chiter = cur*perln+Math.floor(offs*0.5);\n            textbuffer+=getlines(dispfull,cur,HEIGHT-5)+\"\\n\";\n            textbuffer+=ito8dhexstr(cur*perln+Math.floor(offs*0.5))+\"\\n\";\n            textbuffer+=selbar(offs,perln*2);\n            textbuffer+=\"Set byte at address \"+ito8dhexstr(chiter)+\", chunk \"+(2*((offs*0.5)-Math.floor(offs*0.5)))+\" to: \"+keyinput+\"_\";\n            if(API_CKEYDO()){\n                API_DIDCKEYCHK();\n                if(API_CKEY()===\"Backspace\"||API_CKEY()===\"Delete\"){\n                    keyinput=keyinput.slice(0,keyinput.length-1);\n                }else if(API_CKEY()===\"Enter\"){\n                    var orc = fr.charAt(chiter);\n                    //console.log(chiter);\n                    //console.log(orc);\n                    orc = ito4dhexstrms(orc.charCodeAt(0));\n                    //console.log(orc);\n                    if((offs*0.5)-Math.floor(offs*0.5)===0){\n                        orc = keyinput.slice(0,2)+orc.slice(3,5);\n                    }else{\n                        orc = orc.slice(0,2)+keyinput.slice(0,2);\n                    }\n                    fr=fr.slice(0,chiter)+String.fromCharCode(parseInt(orc,16))+fr.slice(chiter+1,fr.length);\n                    keyinput=\"\";\n                    retvar=0;\n                }\n\n            }\n        break;\n        case 5:\n            var chiter = cur*perln+Math.floor(offs*0.5);\n            textbuffer+=getlines(dispfull,cur,HEIGHT-5)+\"\\n\";\n            textbuffer+=ito8dhexstr(cur*perln+Math.floor(offs*0.5))+\"\\n\";\n            textbuffer+=selbar(offs,perln*2);\n            textbuffer+=\"Set byte at address \"+ito8dhexstr(chiter)+\", chunk \"+(2*((offs*0.5)-Math.floor(offs*0.5)))+\" to: \"+keyinput+\"_\";\n            if(API_CKEYDO()){\n                API_DIDCKEYCHK();\n                if(API_CKEY()===\"Backspace\"||API_CKEY()===\"Delete\"){\n                    keyinput=keyinput.slice(0,keyinput.length-1);\n                }else if(API_CKEY()===\"Enter\"){\n                    var orc = fr.charAt(chiter);\n                    //console.log(chiter);\n                    //console.log(orc);\n                    orc = ito4dhexstrms(orc.charCodeAt(0));\n                    //console.log(orc);\n                    if((offs*0.5)-Math.floor(offs*0.5)===0){\n                        orc = ito2dhexstr(parseInt(keyinput))+orc.slice(3,5);\n                    }else{\n                        orc = orc.slice(0,2)+ito2dhexstr(parseInt(keyinput));\n                    }\n                    //console.log(orc);\n                    //console.log(ito2dhexstr(parseInt(keyinput)));\n                    fr=fr.slice(0,chiter)+String.fromCharCode(parseInt(orc,16))+fr.slice(chiter+1,fr.length);\n                    keyinput=\"\";\n                    retvar=0;\n                }\n\n            }\n        break;\n        case 6:\n            var chiter = cur*perln+Math.floor(offs*0.5);\n            textbuffer+=getlines(dispfull,cur,HEIGHT-5)+\"\\n\";\n            textbuffer+=ito8dhexstr(cur*perln+Math.floor(offs*0.5))+\"\\n\";\n            textbuffer+=\"\\nAdd ? bytes: \"+keyinput+\"_\\n\";\n            if(ckeydo){\n\t\t        ckeydo=false;\n\t\t        switch(ckey){\n\t\t\t        case \"Enter\":\n                        for(var i=0;i<parseInt(keyinput);i++){\n                            fr+=String.fromCharCode(0);\n                        }\n\t\t\t\t        retvar=0;\n                        keyinput=\"\";\n\t\t\t\t        break;\n\t\t\t        case \"Backspace\":\n\t\t\t\t        keyinput=keyinput.slice(0,keyinput.length-1);\n\t\t\t\t        break;\n\t\t        }\n\t        }\n        break;\n        case 7:\n            var chiter = cur*perln+Math.floor(offs*0.5);\n            textbuffer+=getlines(dispfull,cur,HEIGHT-5)+\"\\n\";\n            textbuffer+=ito8dhexstr(cur*perln+Math.floor(offs*0.5))+\"\\n\";\n            textbuffer+=\"\\nRemove ? bytes (Cannot be undone, type 0 to remove none): \"+keyinput+\"_\\n\";\n            if(ckeydo){\n\t\t        ckeydo=false;\n\t\t        switch(ckey){\n\t\t\t        case \"Enter\":\n                        fr=fr.slice(0,fr.length-parseInt(keyinput));\n\t\t\t\t        retvar=0;\n                        keyinput=\"\";\n\t\t\t\t        break;\n\t\t\t        case \"Backspace\":\n\t\t\t\t        keyinput=keyinput.slice(0,keyinput.length-1);\n\t\t\t\t        break;\n\t\t        }\n\t        }\n        break;\n    }\n    set_sysvar(\"hxe_cur\",cur);\n    set_sysvar(\"hxe_file\",fr);\n    set_sysvar(\"hxe_perln\",perln);\n    set_sysvar(\"hxe_offs\",offs);\n}\n\nfunction selbar(x,p){\n    out = \"          \";\n    var i;\n    for(i=0;i<x;i++){\n        out+=\"   \";\n    }\n    out+=\"[] \";\n    for(i=x+1;i<p;i++){\n        out+=\"   \";\n    }\n    out+=\"| \";\n    for(i=0;i<(x-1)*0.5;i++){\n        out+=\" \";\n    }\n    out+=\"|\\n\";\n    return out;\n}\n\n//00000000: 00 00 FC AE  1D 00 00 01  13 21 2A 61 | ____________\n\nfunction getfulldisp(str,p){\n    var loc = 0;\n    var out = \"\";\n\n    while(loc<str.length){\n    //loop\n    var tempa = \"\";\n    var tempb = \"\";\n    out+=ito8dhexstr(loc)+\": \";\n    for(var i=loc;i<loc+p;i++){\n        if(i<str.length){\n        tempa+=ito4dhexstrms(str.charCodeAt(i));\n        if(chkrendchr(str.charCodeAt(i))){\n            tempb+=str.charAt(i);\n        }else{\n            tempb+=\".\";\n        }\n        }else{\n            tempa+=\"      \";\n            tempb+=\" \";\n        }\n    }\n    out+=tempa+\"| \"+tempb+\"\\n\";\n    loc+=p;\n    }\n\n    return out;\n}\n\nfunction getlines(str,cur,len){\n    var outi = [];\n    var temp = \"\";\n    var i;\n    for(i=0;i<str.length;i++){\n        if(str.charAt(i)===\"\\n\"){\n            outi.push(temp);\n            temp=\"\";\n        }else{\n            temp+=str.charAt(i);\n        }\n    }\n    if(temp!==\"\"){\n        outi.push(temp);\n    }\n    var out = \"\";\n    for(i=cur;i<cur+len;i++){\n        if(i<outi.length){\n            out+=outi[i];\n            if(i!==cur+len-1){\n                out+=\"\\n\";\n            }\n        }\n    }\n    return out;\n}\n\nfunction ito8dhexstr(i){\n    var o = i.toString(16);\n    var out = \"\";\n    if(o.length<8){\n        for(var j=0;j<8-o.length;j++){\n            out+=\"0\";\n        }\n        out+=o;\n    }else if(o.length===8){\n        out=o;\n    }else if(o.length>8){\n        out=\"--------\";//too large\n    }\n    return out;\n}\n\nfunction chrto2bd(chr){\n\n}\n\nfunction ito4dhexstrms(i){\n    //Big endian\n    var o = i.toString(16);\n    var out = \"\";\n    if(o.length<4){\n        for(var j=0;j<4-o.length;j++){\n            out+=\"0\";\n        }\n        out+=o;\n    }else if(o.length===4){\n        out=o;\n    }else if(o.length>4){\n        out=\"----\";//too large\n    }\n    return out.slice(0,2)+\" \"+out.slice(2,4)+\" \";\n}\n\nfunction ito2dhexstr(i){\n    var o = i.toString(16);\n    var out = \"\";\n    if(o.length===1){\n        out = \"0\"+o;\n    }else{\n        out = o.slice(o.length-2,o.length);\n    }\n    return out;\n}\n\nfunction chkrendchr(i){\n    if(i>31&&i<256){\n        return true;\n    }else{\n        return false;\n    }\n}"]
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

var WIDTH = 100;//122
var HEIGHT = 30;//33

var mpev = false;

var dircalled = "";

var global_font = ["                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                          X         XXX        XXX        XXX         X          X          X                    XXX        XXX                                                 ","                        XX XX      XX XX       X X        X X                                                                                                                   ","                          XX X       X XX       X X     XXXXXXXX     X XX       X X     XXXXXXXX     X XX      XX X       X  X                                                  ","                          X         XXXX      X   X      X           X           XX           X      X   X      XXXX         X          X                                       ","                        XXX       X   X      X   X       XXX           XX      XXX       X  XXX       X   X      X   X       XXX                                                ","                                    XX        X  X       X           X          X   X     X X X      X  X       X  XX       XX X                                                ","                          X          X          X                                                                                                                               ","                                      X         XX         X          X         X          X          X          X           X          X          XX          X                ","                                    X          XX          X          X           X          X          X          X         X          X         XX         X                  ","                                     X          X        XXXXX        X         X X       X   X                                                                                 ","                                                X          X          X       XXXXXXX       X          X          X                                                             ","                                                                                                       XX        XXX        XX         XX         X                             ","                                                                                         XXXXXXX                                                                                ","                                                                                                       X         XXX         X                                                  ","                            X          X         XX         X         XX         X         XX         X         XX         X          X                                         ","                                    XXX       X   X      X   X      X   X      X   X      X   X      X   X      X   X       XXX                                                 ","                                    XX        X X          X          X          X          X          X          X        XXXXX                                                ","                        XXXX      XX  XX      X   X         XX         X        XXX       XX         X         XX   X     XXXXXX                                                ","                         XXX       X   X          X         X        XX           X           X          X     X   X       XXX                                                  ","                                      X         XX        X X       X  X      X   X      XXXXXX         X          X         XXX                                                ","                                   XXXXX      X          X          XXXX           X          X          X     X   X       XXX                                                  ","                            X        XXX       X         X          X XX       XX XX      X   X      X   X      XX XX       XXX                                                 ","                                  XXXXXX     X    X         X          X          X         X          X          X          X                                                  ","                         XXX       XX XX      X   X      X   X       X X        XXX       XX XX      X   X      XX XX       XXX                                                 ","                         XX        XXXX       X   X      X   X      XX XX       XXXX          X         XX        XX       XXX                                                  ","                                                           X         XXX         X                     X         XXX         X                                                  ","                                                           X         XXX         X                               XXX        XX         XX         X                             ","                                                  XX       XX       XX        X           XX           XX           XX                                                          ","                                                        XXXXXXX                          XXXXXXX                                                                                ","                                             XX           XX           XX           X        XX       XX       XX                                                               ","                         XX        X  X           X          X         X         X          X                    XX         XX                                                  ","                         XXX       X   X     X    X     X  XXX     X XX X     X X  X     X XXXXX     X    X     X           X  X        XX                                      ","                                   XXX          X         X X        X X       X   X      XXXXX     X     X    X     X   XXX   XXX                                              ","                                  XXXXXX      X    X     X    X     X   X      XXXXX      X    X     X    X     X   X     XXXXXX                                                ","                                    XXX X     X   XX    X     X    X     X    X          X          X           X   XX      XXXX                                                ","                                  XXXXX       X   X      X    X     X    X     X    X     X    X     X    X     X   X     XXXXX                                                 ","                                  XXXXXXX     X    X     X  X X     XXXX       X  X       X  X       X    X     X    X    XXXXXXX                                               ","                                  XXXXXXX     X    X     X    X     X  X       XXXX       X  X       X          X         XXXX                                                  ","                                    XXX X     X   XX    X     X    X          X          X   XXXX   X     X     X    X      XXXX                                                ","                                  XXX XXX     X   X      X   X      X   X      XXXXX      X   X      X   X      X   X     XXX XXX                                               ","                                   XXXXX        X          X          X          X          X          X          X        XXXXX                                                ","                                    XXXXXX        X          X          X          X     X    X     X   XX     XX XX       XXX                                                  ","                                  XXX XXX     X   X      X  X       X X        XXXX       X  X       X   X      X   X     XXX   XX                                              ","                                  XXXX        X          X          X          X          X          X    X     X    X    XXXXXXX                                               ","                                 XX     XX   XX   XX    XX   XX    X X X X    X X X X    X  X  X    X     X    X     X   XXX   XXX                                              ","                                  XX  XXXX    XX   X     XX   X     X X  X     X X  X     X  X X     X  X X     X   XX    XXX  XX                                               ","                                    XXX       X   X     X     X    X     X    X     X    X     X    X     X     X   X       XXX                                                 ","                                  XXXXXX      X    X     X    X     X    X     XXXXX      X          X          X         XXXX                                                  ","                                    XXX       X   X     X     X    X     X    X     X    X     X    X     X     X   X       XXX       X    X    XXXXXXX                         ","                                  XXXXX       X   X      X   X      X   X      XXXX       X   X      X    X     X    X    XXX  XXX                                              ","                                    XX X      X  XX      X   X      X           XXX           X     X    X     XX   X     X XXX                                                 ","                                  XXXXXXX    X  X  X    X  X  X    X  X  X       X          X          X          X        XXXXX                                                ","                                 XXX   XXX   X     X    X     X    X     X    X     X    X     X    X     X     X   X       XXX                                                 ","                                 XXX  XXXX   X     X    X     X     X   X      X   X       X X        X X         X          X                                                  ","                                 XXX   XXX   X     X    X  X  X    X  X  X    X X X X    X X X X     X   X      X   X                                                           ","                                  XXX XXX     X   X      X   X       X X         X         X X       X   X      X   X     XXX XXX                                               ","                                  XXX XXXX    X   XX     X   X       X X        X X         X          X          X        XXXXX                                                ","                                   XXXXX      X   X      X   X         X         X         X         X   X      X   X      XXXXX                                                ","                                    XXX        X          X          X          X          X          X          X          X          X          X          XXX                ","                        X          X           X          X           X          X           X          X           X          X                                                ","                                    XXX          X          X          X          X          X          X          X          X          X        XXX                           ","                          X         X X       X   X                                                                                                                             ","                                                                                                                                                          XXXXXXXXX             ","                        XX           X           X                                                                                                                              ","                                                         XXXX      X    X          X      XXXXX     X    X     X   XX      XXX XX                                               ","                       XX          X          X          X XX       XX  X      X    X     X    X     X    X     XX   X    XX XXX                                                ","                                                          XXX X     X   XX    X     X    X          X           X   XX      XXX                                                 ","                           XXX         X          X      XXX X     X   XX     X    X     X    X     X    X      X  XX       XX XXX                                              ","                                                          XXX       X   X     X     X    XXXXXXX    X           X   XX      XXX                                                 ","                          XXX       X   X      X          X        XXXXXX       X          X          X          X         XXXXX                                                ","                                                          XX XX     X  XX     X    X     X    X     X    X      X  XX       XX X          X      X   X       XXX                ","                       XX          X          X          X XX       XX  X      X   X      X   X      X   X      X   X     XXX XXX                                               ","                          X          X                   XXX          X          X          X          X          X       XXXXXXX                                               ","                           X          X                  XXXXX          X          X          X          X          X          X          X     X   X       XXX                 ","                       XX          X          X          X XXXX     X  X       X X        XX X       X   X      X    X    XX   XXX                                              ","                        XXX          X          X          X          X          X          X          X          X       XXXXXXX                                               ","                                                       XX X XX     XX X  X    X  X  X    X  X  X    X  X  X    X  X  X   XXX XX XX                                              ","                                                       XXX XX       XX  X      X   X      X   X      X   X      X   X     XXX XXX                                               ","                                                          XXX       X   X     X     X    X     X    X     X     X   X       XXX                                                 ","                                                        XX XX       XX  X      X    X     X    X     X    X     XX  X      X XX       X          X         XXXX                 ","                                                          XX XXX    X  XX     X    X     X    X     X    X      X  XX       XX X          X          X        XXXX              ","                                                        XXX XX       XX  X      X          X          X          X        XXXXXX                                                ","                                                          XXXX      X   X      X           XXX      X    X     XX   X     X XXX                                                 ","                                    X          X          X        XXXXXX       X          X          X          X   X       XXX                                                ","                                                        XX  XX      X   X      X   X      X   X      X   X      X  XX       XX XX                                               ","                                                       XXX  XXXX   X     X     X   X      X   X       X X        X X         X                                                  ","                                                       XXX   XXX   X     X    X  X  X    X X X X    X X X X     X   X      X   X                                                ","                                                        XXX XXX     X   X       X X         XX        X  X      X    X    XXX  XXX                                              ","                                                       XXXX XXX    XX   X      X   X       X X        X X         X          X         X          X        XXXX                 ","                                                        XXXXXXX    X    X         X         X         X         X    X    XXXXXXX                                               ","                           XX        X          X          X          X         X         X           X           X          X          X          X           XX               ","    X          X          X          X          X          X          X          X          X          X          X          X          X          X          X          X      ","                        XX           X          X          X          X           X           X         X         X          X          X          X        XX                  ","                                                                    XX   X    X  XXX                                                                                            ","                                                                                                                                                                                ","                         XXXXX     XX   X    XX        XXXXXX      XX        XXXXXX      XX          X    X      X   X       XXXX                                               ","                                                                    XX         XX                                                                                               ","                                                                              XXXXX                                                                                             ","                                                                                                                                                                                ","                                                                                                                                               XXXXXXXXXXX                      ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                                                                                                                                                                ","                                    XXX        XXX                    X          X         XXX        XXX        XXX         X                                                  ","                          X          X X      XXXXX     XX   X     X          X          XX   X      XXXX         X          X                                                  ","                          XX        X  X      X   X      X           X         XXXXX       X          X          X  X      X XX                                                 ","                       X XXX X     X   X     X     X    X     X    X     X     X   X     X XXX X                                                                                ","                                  XXX XXXX    X    X   XXXX  XXX      XX      XXXXXXX       X          X          X        XXXXX                                                ","               X          X          X          X          X          X                                X          X          X          X          X          X                 ","                                    XXXX      X   X      XX        X  X       X   X       XX  X        X  X        X X     X   X      XXXX                                      ","                        X   X                                                                                                                                                   ","                         XXXX     XX   XX   X  XXX XX  X XX X  X  X X     X  X X  X  X  X  XXX  X   X     X     XXXXX                                                           ","                                    XXX           X       XXXX      X   X      XXXXX          XX                XXXXX                                                           ","                                                                      X  X      X  X      X  X        X  X        X  X                                                          ","                                                        XXXXXXX          X          X          X                                                                                ","                                                                                                                                                                                "];
var global_font_w = 11;
var global_font_h = 16;

function setup() {
  createCanvas(Math.floor(7.214 * WIDTH), 15 * HEIGHT);
  Main();
}

function screen_change(newwidth, newheight) {
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
    }else if(videomode === "buffer_fontstack" && video !== videold){
      video = clrvideo;
      placetextbuffer(textbuffer);
      //videocall();
      proto_render_fontstack(video);
      videold = video;
    }
    //}
    if (video !== videold&&videomode !== "p5") {
      //videocall();
      proto_render(video);
      videold = video;
    }else if(video !== videold){
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
    var retdir = dircalled;
    dircalled = cmdinpt[1];
    eval(retfile(dirreltoab(cmdinpt[1])));
    dircalled = retdir;
  } else if (cmdinpt[0] === "ejs") {
    //legacy, no dircalled support (none needed as of b0.49201 build 31)
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
  } else if (cmdinpt[0] === "outext") {
    if (cmdinpt.length === 1) {
      alert(retfile("ext/output"));
    } else if (cmdinpt[1] === "-a") {
      alert(retfile("ext/output"));
    } else if (cmdinpt[1] === "-c") {
      console.log(retfile("ext/output"));
    }
  } else if (inpt === "") {
  } else {
    if (!attralias(cmdinpt)) {
      textbufferpre +=
        "'" + cmdinpt[0] + "' is not recognized as a valid command. \n";
    }
  }
}

function EVAL_IH(str){
  return eval(str);
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
  }else if(dir.charAt(0)==="|"){
    
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
  if(dir.charAt(0)==="|"){
    return dir.slice(1);
  }else{
  var exc = true;
  for (var i = 0; i < files.length; i++) {
    if (files[i][0] === dir) {
      exc=false;
      return files[i][1];
    }
  }
  if(exc){
    exception_retfile_nofilefound();
    return "";
  }
  }
}

function retfilebyindex(i){
  return files[i][1];
}

function retfilenamebyindex(i){
  return files[i][0];
}

function gethighestfileindex(){
  return files.length-1;
}

function placecheapfile(dir, fname, file) {
  if(fname===""){
    return;
  }
  removefile(dir + fname);
  files.push([dir + fname, file]);
}

function placecheapfilelong(fname,file){
  var chk = fname.split('/');
  if(chk[chk.length]===""){
    return;
  }
  removefile(fname);
  files.push([fname,file]);
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

function proto_render_fontstack() {
  //console.log(v);
  background(backgroundcol);
  videocall();
  renderVideo_byFont(video);
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

function chchar(str,nc,p){
  return str.slice(0,p)+nc+str.slice(p+1);
}

function fittocwh(v,w){
  var out = "";
  var tc = "";
  var i;
  var t = -1;
  for(i=0;i<WIDTH-w;i++){
    tc+=" ";
  }
  for(i=0;i<v.length;i++){
    t++;
    if(t>=WIDTH){
      t=-1;
      i+=w-WIDTH-1;
    }else if(t<w){
      out+=v.charAt(i);
    }else{
      t=0;
      out+=tc+v.charAt(i);
    }
  }
  return out;
}

function cout_txtbfr(s){
  textbufferpre+=s+"\n";
}

function textboxgetlnok(t, d) {
  //return docui.prompt(t, d, docui.ButtonSet.OK).getResponseText();
  return prompt(d);
}

function schf_addTask(s){
    var T = get_sysvar("schf_list");
    if(T===-255){
      exception_schf_nolist();
    }else{
      T.push(s);
      set_sysvar("schf_list",T);
    }
}

function schf_killTask(s){
  var T = get_sysvar("schf_list");
  if(T===-255){
    exception_schf_nolist();
  }else{
    for(var i=0;i<T.length;i++){
        if(T[i]===s){
            //T.splice(i,1);
            //i--;
            T[i]="";
        }
    }
    set_sysvar("schf_list",T);
  }
}

function schf_sweep(){
  var T = get_sysvar("schf_list");
  for(var i=0;i<T.length;i++){
        if(T[i]===""){
            T.splice(i,1);
            i--;
            //T[i]="";
        }
    }
    set_sysvar("schf_list",T);
}

function renderVideo_byFont(v){
  //assumes w,h=WIDTH,HEIGHT
  for(var i=0;i<WIDTH;i++){
    for(var j=0;j<HEIGHT;j++){
      renderChar(v.charAt(j*WIDTH+i),i*(width/WIDTH),j*(height/HEIGHT),width/WIDTH,height/HEIGHT);
    }
  }
}

function renderChar(chr,x,y,w,h){
    fill(255);
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

function disableScroll() {
    // Get the current page scroll position
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  
        // if any scroll is attempted, set this to the previous value
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop);
        };
}
  
function enableScroll() {
    window.onscroll = function() {};
}

function exception_schf_nolist(){
  //processcmd("rjef /bin/repair_schf_nolist.ef");
  error_log("exception_schf_nolist occured\n");
}

function exception_schf_noprogram(){
  //mainret="rjef /bin/repair_schf_noprogram.ef";
  error_log("exception_schf_noprogram occured\n");
  processcmd("rjef /bin/repair_schf_noprogram.ef");
}

function exception_retfile_nofilefound(){
  error_log("exception_retfile_nofilefound occured\n");
  processcmd("rjef /bin/kernelwarnings/exc_retfile_nofilefound.ef");
}

function error_log(str){
  console.log(str);
}

function API_RESETRET(){
  //API_RESETRET(): Reset return variables (use at end of standard programs to terminate their frame-loop execution)
  retvar=-1;
  retcmd="";
}

function API_CKEY(){
  //API_CKEY(): Get string of most recently used control key
  return ckey;
}

function API_CKEYDO(){
  //API_CKEYDO(): Get boolean of whether a control key has been pressed
  return ckeydo;
}

function API_DIDCKEYCHK(){
  //API_DIDCKEYCHK(): Indicate that the most recently pressed control key has been processed (ckeydo = false)
  ckeydo=false;
}

function API_SETRETVAR(x){
  //API_SETRETVAR(retvar): Set the program return variable to retvar
  retvar=x;
}

function API_SETRETCMD(x){
  //API_SETRETCMD(retcmd): Set the program return command (use API_SETRETCMD("rjef "+API_DIRCALLED()) for standard program loop functionality)
  retcmd=x;
}

function API_GETRETVAR(){
  //API_GETRETVAR(): Get the program return variable
  return retvar;
}

function API_GETRETCMD(){
  //API_GETRETCMD(): Get the program return command
  return retcmd;
}

function API_DIRCALLED(){
  //API_DIRCALLED(): Get the directory of the currently running file (use so a file may be called without knowing its directory beforehand, allows for changing name and directory of any uef file)
  return dircalled;
}

function API_RETDIRCALLED(x){
  //API_RETDIRCALLED(dircalled): Set directory called (use after calling processcmd() with a variable saving API_GETDIRCALLED() from before processcmd() was called, only needed if rjef is a possible command)
  dircalled = x;
}

function API_CLRINPT(){
  //API_CLRINPT(): Clear input buffers (call at the beginning and end of a program's execution)
  keyinput = "";
  ckey = "";
  ckeydo = false;
}

function API_SETTEXTBUFFER(x){
  //API_SETTEXTBUFFER(textbuffer): Set the text buffer to textbuffer (video mode must be "buffer" for this to affect the display)
  textbuffer=x;
}

function API_GETCCATAT(){
  //API_GETCCATAT(): Get string of at symbol concatenator (@ by default in command line)
  return ccatat;
}

function API_GETCCATBAR(){
  //API_GETCCATBAR(): Get string of bar symbol concatenator (: by default in command line)
  return ccatbar;
}

function API_GETCCATEND(){
  //API_GETCCATEND(): Get string of end symbol concatenator ($[space] by default in command line)
  return ccatend;
}

function API_GETCCATCUR(){
  //API_GETCCATEND(): Get string of cursor symbol concatenator (_ by default in command line)
  return ccatcur;
}

function API_APPENDTEXTBUFFERPRE(x){
  //API_APPENDTEXTBUFFERPRE(string): Append string to the command line display (ending string with \n is suggested, otherwise will place text at beginning of machine info)
  textbufferpre+=x;
}

function API_GETVIDEOMODE(){
  //API_GETVIDEOMODE(): Get video mode string ("buffer", "p5")
  return videomode;
}

function API_SETVIDEOMODE(x){
  //API_SETVIDEOMODE(videomode): Set video mode ("buffer", "p5")
  videomode = x;
}

function API_BACKSPACEINPT(){
  keyinput=keyinput.slice(0,keyinput.length-1);
}

function API_GETKEYINPT(){
  return keyinput;
}

function API_SETKEYINPT(x){
  keyinput=x;
}
