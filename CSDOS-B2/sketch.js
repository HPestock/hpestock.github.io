//var docui = DocumentApp.getUi();
//var docbody = DocumentApp.getActiveDocument().getBody();

window.onkeydown = function(e) { 
    e = e || window.event;  //normalize the evebnt for IE
    var target = e.srcElement || e.target;  //Get the element that event was triggered on
    var tagName = target.tagName;  //get the tag name of the element [could also just compare elements]
    return !(tagName==="BODY" && e.keyCode == 32);  //see if it was body and space
};

var video = "";
var clrvideo = "";
var blkvideo = "";
var videomode="buffer";
var backgroundcol = [0,0,0];
var textcol = [255,255,255];

var machine_running = true;

var files = [['boot/autoexec.sh','rjef /quickalias/setup.ef\\n'],['boot/autoexec.ef','console.log(\'AE UNCHANGED\');runcmdscript(\"boot/autoexec.sh\");textbufferpre=\"CSDOS b0.33 -- Copy for development, press and test use only\\nBeta version, do not distribute. \\n\\nPlease use the help command if required and available\\nIf the screen is frozen, press a shift key momentarily. \\n\";'],['/bin/version.dat','CSDOS b0.34 -- development build 6, not for public use'],['/bin/aliaslist.dat',';ls:!lsdir!;test1:!clr!;test2:!rjef /bin/bac /bin/test.sh!;$:!rjef!;#:!rjef /bin/bac!'],['/bin/help.txt','lsdir - list the contents of the current directory\ncd [dir] - changes the current directory to [dir]\nshutdown - use \'shutdown --\' to halt CSDOS\nhelp - display this dialog from /bin/help.txt\ncat [dir] - display the contents of the file [dir] in the console\nclr - clear the screen\nrjef [dir] - run the file [dir] in JavaScript from processcmd() using eval()\nejs [code] - run [code] in eval() from processcmd(), note that all blocks of spaces will be changed into a single space\nalias [aliasname] [aliascontents] - add an alias, typing [aliasname] as a command will run [aliascontents] through processcmd() with any arguments/parameters from after [aliasname] appended to the str_input for processcmd()\nreadext - open a prompt that will write contents to ext/input\necho [text] - display [text] in console\nver - display version info\n'],['/bin/test.ef','function _06341_test(f){textbufferpre+=f;} _06341_test(cmdinpt[2]+\'\\n\')'],['/bin/ejs','let p=[...cmdinpt];p.splice(0,2);eval(p.join(\' \'));'],['/bin/ejss','let p=[...cmdinpt];p.splice(0,1);eval(p.join(\' \'));'],['/bin/test.sh','clr\nrjef boot/autoexec.ef\nhelp'],['/bin/bac','runcmdscript(dirreltoab(cmdinpt[2]));'],['/quickalias/qa.ef','retcmd=\"rjef /quickalias/qa.ef\";if(retvar===-1){retvar=0;}if(retvar===0){textbuffer=\"Enter alias name: \"+\"\\n\"+keyinput+\"_\";if(ckeydo){if(ckey===\"Enter\"){placecheapfile(\"/quickalias/\",\"nm.tmp\",keyinput);keyinput=\"\";retvar=1;}else if(ckey===\"Backspace\"){keyinput=keyinput.slice(0,keyinput.length-1);}ckeydo=false;}}else if(retvar===1){textbuffer=\"Enter alias contents: \"+\"\\n\"+keyinput+\"_\";if(ckeydo){if(ckey===\"Enter\"){var _tmp=retfile(\"/quickalias/nm.tmp\");processcmd(\"dealias \"+_tmp);processcmd(\"alias \"+_tmp+\" \"+keyinput);keyinput=\"\";retvar=-1;retcmd=\"\";}else if(ckey===\"Backspace\"){keyinput=keyinput.slice(0,keyinput.length-1);}ckeydo=false;}}'],['/quickalias/test.ef','textbuffer=\"Press any key to continue... \";if(retcmd!==\"rjef /quickalias/test.ef\"){keydown=false;video=clrvideo;placetextbuffer(textbuffer);}retcmd=\"rjef /quickalias/test.ef\";if(keydown){retcmd=\"\";keyinput=\"\"}'],['/quickalias/setup.ef','processcmd(\"alias qal rjef /quickalias/qa.ef\");console.log(\"QuickAlias Setup Complete. \");'],['/bin/restart.ef','video=\"\";workingdir=\"/\";keyinput = \"\";keydown = false;keymr = \'\';ckey = \"\";ckeydo = false;textbuffer = \"\";textbufferpre = \"\";textbufferlin = \"\";textbufferinpt = \"\";retcmd = \"\";retvar=-1;Main();'],['/bin/text.ef','var f = \"\";textbuffer = \"\";if(retvar===-1){	retvar=0;	retcmd=\"rjef /bin/text.ef\";	keyinput=\"\";}else{	f = retfile(\"/bin/text.tmp\");}if(retvar===0){	if(ckeydo){		ckeydo=false;		switch(ckey){			case \"Enter\":				if(keyinput.charAt(0)===\"+\"){					f+=keyinput.slice(1)+\"\\n\";					keyinput=\"\";				}else if(keyinput.charAt(0)===\"e\"){					retvar=1;					keyinput=\"\";				}else if(keyinput.charAt(0)===\"r\"){					f=f.slice(0,f.length-1);					retvar=1;					keyinput=\"\";				}else if(keyinput.charAt(0)===\"q\"){					retvar=-1;					retcmd=\"\";					keyinput=\"\";				}				break;			case \"Backspace\":				keyinput=keyinput.slice(0,keyinput.length-1);				break;		}	}}else if(retvar===1){	textbuffer+=\"Enter file name: \\n\";	if(ckeydo){		ckeydo=false;		switch(ckey){			case \"Enter\":				var fda = keyinput.split(\"/\");				var fdb = fda[fda.length-1];				fda.splice(fda.length-1,1);				placecheapfile(fda.join(\"/\")+\"/\",fdb,f);				retvar=-1;				retcmd=\"\";				keyinput=\"\";				break;			case \"Backspace\":				keyinput=keyinput.slice(0,keyinput.length-1);				break;		}	}}placecheapfile(\"/bin/\",\"text.tmp\",f);textbuffer += f+\"\\n\"+keyinput+\"_\";'],['/bin/copy.ef','var f = retfile(dirreltoab(cmdinpt[cmdinpt.length-2]));var to = dirreltoab(cmdinpt[cmdinpt.length-1]).split(\'/\');var tb = to[to.length-1];to.splice(to.length-1,1);placecheapfile(to.join(\"/\")+\"/\",tb,f);'],['/bin/del.ef','zerodirfile(dirreltoab(cmdinpt[cmdinpt.length-1]));'],['/bin/clz.ef','removefile(\"0\");'],['/bin/delcl.ef','removefile(dirreltoab(cmdinpt[cmdinpt.length-1]));'],['/system/userfile.dat','system\ninstall\nUser\nroot\n'],['ext/input','#NOFILE'],['/bin/cmd','textbufferlin = username+ccatat+machinename+ccatbar+workingdir+ccatend;    var inputln = keyinput;    if(ckeydo){      ckeydo=false;      if(ckey===\"Enter\"){        keyinput = \"\";        textbufferpre+=textbufferlin+textbufferinpt+inputln+\"\\n\";        processcmd(inputln);       }else if(ckey===\"Backspace\"||ckey===\"Delete\"){        keyinput = keyinput.slice(0,keyinput.length-1);      }    }      textbuffer=textbufferpre+textbufferlin+keyinput+ccatcur;']];// name/ tags, then file.ex

var sysvars = [0];
var sysvarnames = ["SYS_TEST_RESV"];

var workingdir = "/";
var wddom = "/";

var keyinput = "";
var keydown = false;
var keymr = '';
var ckey = "";
var ckeydo = false;

var textbuffer = "";
var textbufferpre = "";
var textbufferlin = "";
var textbufferinpt = "";

var retcmd = "";
var retvar=-1;

var mainret = "rjef /bin/cmd";

var username = "system";
var machinename = "CSDOS";

var ccatat = "@";
var ccatbar= ":";
var ccatend= "$ ";
var ccatcur= "_";

const WIDTH = 100;
const HEIGHT = 30;

function setup(){
  createCanvas(Math.floor(7.214*WIDTH),15*HEIGHT);
  Main();
}

function draw(){
  MainLoop();
}

function get_sysvar(n){
  //var out = -255;
  for(var i=0;i<sysvars.length;i++){
    if(sysvarnames[i]===n){
      return sysvars[i];
    }
  }
  return -255;//ERROR_CODE
}

function set_sysvar(n,x){
  //var out = -255;
  var df = true;
  for(var i=0;i<sysvars.length;i++){
    if(sysvarnames[i]===n){
      df=i;
      break;
    }
  }
  if(df===true){
    sysvars.push(x);
    sysvarnames.push(n);
  }else{
    sysvars[df]=x;
  }
}

function force_rem_sysvar(n){
  for(var i=0;i<sysvars.length;i++){
    if(sysvarnames[i]===n){
      sysvars.splice(i,1);
      sysvarnames.splice(i,1);
    }
  }
}

function get_blank_screen(w,h,s){
  var out = "";
  var preout = "";
  var i;
  var b=brtochar(s);
  for(i=0;i<w;i++){
    preout+=b;
  }
  for(i=0;i<h;i++){
    out+=preout;
  }
  return out;
}

function MainOnOpen(){
  //Main();
}

function keyPressed(){
  if(key.length===1){
    keydown=true;
    keyinput+=key;
    keymr=key;
  }else{
    ckeydo=true;
    ckey=key;
    keymr=key;
    keydown=true;
  }
}

function keyReleased(){
  keydown=false;
  keymr=key;
}

function Main() {
  blkvideo = get_blank_screen(WIDTH,HEIGHT,0);
  clrvideo = get_blank_screen(WIDTH,HEIGHT,255);
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
  textbufferlin = username+ccatat+machinename+ccatbar+workingdir+ccatend;
  textbuffer=textbufferpre+textbufferlin+keyinput+ccatcur;
  video=clrvideo;
  placetextbuffer(textbuffer);
}

function MainLoop(){
  //while(machine_running){
  var smr = machine_running;
  var videold = "";
  if(machine_running){
    if(retcmd===""){
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
      retcmd=mainret;
    }else{
      processcmd(retcmd);
    }
    
    if(keydown){
      if(videomode==="buffer"){
        video=clrvideo;
        placetextbuffer(textbuffer);
      }
    }
    if(video!==videold){
      proto_render(video);
      videold=video;
    }
  //}
  }
  if(!machine_running&&smr){
  textbufferlin = "";
  textbuffer=textbufferpre+"_";
  video=blkvideo;
  placetextbuffer(textbuffer);
  proto_render(video);
  //video=blkvideo;
  //setvwrap("abc",5);
  //console.log(video.length);
  //setdocall(video);
  }
}

function placetextbuffer(str){
  var y = 0;
  var i;
  //video = "";
  var lines = [];
  var temp = "";
  //var w = true;
  for(i=0;i<str.length;i++){
    if(str.charAt(i)==="\n"){
      //if(!w){
        //w = true;
        lines.push(temp);
        temp="";
      //}
    }else{
      temp+=str.charAt(i);
      //w = false;
    }
  }
  if(temp!==""){
    lines.push(temp);
  }
  //console.log(lines);
  for(i=Math.max(0,lines.length-HEIGHT);i<lines.length;i++){
    setvwrap(lines[i],y*WIDTH);
    //console.log(lines[i]);
    y++;
  }
}

function runcmdscript(dir){
  var line = 0;
  var lines = retfile(dirreltoab(dir)).split('\n');
  var labels = [];
  var dogoto = true;
  while(line<lines.length){
    if(lines[line].charAt(0)===":"){
      labels.push([lines[line].slice(1),line+1]);
      line++;
    }else if(lines[line].split(' ')[0]==="goto"){
      if(dogoto){
        var c=true;
        for(var i=0;i<labels.length;i++){
          if(labels[i][0]===lines[line].slice(5)){
            line=labels[i][1];
            c=false;
            break;
          }
        }
        if(c){
          line++;
        }
      }else{
        line++;
      }
    }else{
      processcmd(lines[line]);
      line++;
    }
  }
}

function processcmd(inpt){
  var cmdinpt = breakspace(inpt);
  var i,f;
  if(cmdinpt[0] === "lsdir"){
    var lwdd = listddir(workingdir);
    var space = 0;
    var w = "";
    for(i=0;i<lwdd.length;i++){
      space += lwdd[i].length+1;
      if(space > WIDTH){
        space = lwdd[i].length+1;
        textbufferpre+=w+"\n";
        w=lwdd[i]+" ";
      }else{
        w+=lwdd[i]+" ";
      }
    }
    if(w!==""){
      textbufferpre+=w+"\n";
    }
    textbufferpre+="\n";
  }else if(cmdinpt[0] === "cd"){
    if(cmdinpt.length<2){return;}
    changedir(cmdinpt[1]);
  }else if(cmdinpt[0] === "shutdown"){
    if(cmdinpt[1]==="--"){
      textbufferpre+="Shutting down... "
      machine_running=false;
    }else{
      textbufferpre+="Add -- as second command parameter to confirm. \n";
    }
  }else if(cmdinpt[0]==="help"){
    processcmd('cat /bin/help.txt');
  }else if(cmdinpt[0]==="cat"){
    if(cmdinpt.length<2){return;}
    f = retfile(dirreltoab(cmdinpt[1]))
    //textbufferpre+=f+"\n";
    if(f!==undefined&&f===f){
    var d = 0;
    for(i=0;i<f.length;i++){
      d++;
      if(d>WIDTH){
        d=0;
        textbufferpre+="\n";
      }
      if(f.charAt(i)==="\n"){
        d=0;
      }
      textbufferpre+=f.charAt(i);
    }
  }
    textbufferpre+="\n";
  }else if(cmdinpt[0]==="clr"){
    textbufferpre="";
  }else if(cmdinpt[0]==="rjef"){
    if(cmdinpt.length<2){return;}
    eval(retfile(dirreltoab(cmdinpt[1])));
  }else if(cmdinpt[0]==="ejs"){
    eval(retfile(dirreltoab('/bin/ejss')));
  }else if(cmdinpt[0]==="alias"){
    //alias name command (name will run command through processcmd())
    var na = [...cmdinpt];
    na.splice(0,2);
    na = na.join(' ');
    f = retfile('/bin/aliaslist.dat');
    f+=";"+cmdinpt[1]+":!"+na+"!";
    placecheapfile('/bin/','aliaslist.dat',f);
  }else if(cmdinpt[0]==="dealias"){
    //dealias name
    f = retfile('/bin/aliaslist.dat');
    f = albrksmc(f);
    for(i=0;i<f.length;i++){
      if(f[i].split(':')[0]===cmdinpt[1]){
        f.splice(i,1);
        break;
      }
    }
    placecheapfile('/bin/','aliaslist.dat',f.join(';'));
  }else if(cmdinpt[0]==="qalias"){
    processcmd("dealias "+cmdinpt[1]);
    var _fxal=[...cmdinpt];
    _fxal.splice(0,1);
    processcmd("alias "+_fxal.join(" "));
  }else if(cmdinpt[0]==="readext"){
    placecheapfile('ext/','input',prompt(""));
  }else if(cmdinpt[0]==="echo"){
    textbufferpre+=inpt.slice(5)+"\n";
  }else if(cmdinpt[0]==="ver"){
    processcmd("cat /bin/version.dat");
  }else if(inpt===""){

  }else{
    if(!attralias(cmdinpt)){
      textbufferpre+="\'"+cmdinpt[0]+"\' is not recognized as a valid command. \n";
    }
  }
}

function attralias(cmdinpt){
  var f = retfile('/bin/aliaslist.dat');
  f = albrksmc(f);
  //console.log(f);
  for(var i=0;i<f.length;i++){
    if(f[i].split(':')[0]===cmdinpt[0]){
      var acmd = f[i].split(':')[1].split('!')[1];
      var pcmd = [...cmdinpt];
      pcmd.splice(0,1);
      //console.log(acmd+" "+pcmd.join(' '));
      processcmd(acmd+" "+pcmd.join(' '));
      return true;
    }
  }
  return false;
}

function albrksmc(str){
  var exc = false;
  var out = [];
  var temp = "";
  for(var i=0;i<str.length;i++){
    if(str.charAt(i)==="!"){
      exc=!exc;
      temp+=str.charAt(i);
    }else if(str.charAt(i)===";"&&!exc){
      out.push(temp);
      temp="";
    }else{
      temp+=str.charAt(i);
    }
  }
  if(temp!==""){
    out.push(temp);
  }
  return out;
}

function changedir(dir){
  //console.log(dir);
  if(dir.charAt(0)==="."&&dir.charAt(1)==="/"){
    workingdir = workingdir+dir.slice(2);
    //console.log(workingdir);
  }else if(dir.charAt(0)==="."&&dir.charAt(1)==="."&&dir.charAt(2)==="/"){
    var dl = getdirlist(workingdir);
    dl.splice(dl.length-1,1);
    dl = dl.join('');
    workingdir = dl+dir.slice(3);
    if(workingdir===""){
      workingdir=wddom;
    }else{
      if(workingdir.charAt(workingdir.length-1)!=="/"){
        workingdir=wddom;//
      }
    }
  }else{
    workingdir=dir;
    //console.log(workingdir==="/bin/");
  }
}

function dirreltoab(dir){
  // ./
  // ../
  // x
  if(dir.charAt(0)==='.'&&dir.charAt(1)==='/'){
    dir = workingdir+dir.slice(2);
  }else if(dir.charAt(0)==='.'&&dir.charAt(1)==='.'&&dir.charAt(2)==='/'){
    var dl = getdirlist(workingdir);
    dl.splice(dl.length-1,1);
    dl = dl.join('');
    dir = dl+dir.slice(3);
    if(dir===""){
      dir=wddom;
    }
  }
  return dir;
}

function breakspace(s){
  var w = true;
  var temp = "";
  var out = [];
  for(var i=0;i<s.length;i++){
    if(s.charAt(i)===" "){
      if(w){
        
      }else{
        w = true;
        out.push(temp);
        temp="";
      }
    }else{
      w=false;
      temp+=s.charAt(i);
    }
  }
  if(temp!==""){
    out.push(temp);
  }
  return out;
}

function getdirlist(dir){
  var out = [];
  var cur = "";
  for(var i=0;i<dir.length;i++){
    cur+=dir.charAt(i);
    if(dir.charAt(i)==="/"){
      out.push(cur);
      cur="";
    }
  }
  if(cur!==""){
    out.push(cur);
  }
  return out;
}

function listddir(dir){ //must be passed a non-empty string directory
  var temp;
  var comp = getdirlist(dir);
  var out = [];
  var dirsin = comp.length-1;
  for(var i=0;i<files.length;i++){
    temp = getdirlist(files[i][0]);
    if(samedir(comp,temp)){
      out.push(temp[temp.length-1]);
    }
    var cond = true;
    if(temp[dirsin]!==comp[dirsin]){
      //cond=false;
    }else{
      //var co = cutdir(comp,temp);
      var j;
      for(j=0;j<comp.length;j++){
        if(comp[j]!==temp[j]){
          cond=false;
          break;
        }
      }
      if(cond){
        for(j=0;j<out.length;j++){
          if(out[j]===temp[dirsin+1]){
            cond=false;
            break;
          }
        }
        if(cond){
          out.push(temp[dirsin+1]);
        }
      }
    }
  }
  return out;
}

function cutdir(m,c){
  if(m.length>c.length){
    return [...m];
  }
  var f = [...c];
  f.splice(m.length,c.length-m.length);
  return f;
}

function samedir(a,b){
  var ta = a[a.length-1].charAt(a[a.length-1].length-1)==="/";
  var tb = b[b.length-1].charAt(b[b.length-1].length-1)==="/";
  var ca = a.length;
  var cb = b.length;
  if(!ta){
    ca--;
  }
  if(!tb){
    cb--;
  }
  if(ca!==cb){
    return false;
  }
  for(var i=0;i<ca;i++){
    if(a[i]!==b[i]){
      return false;
    }
  }
  return true;
}

function prtundf(x){
  if(x!=x||x===undefined){
    return 0;
  }
  return x;
}

function retfile(dir){
  for(var i=0;i<files.length;i++){
    if(files[i][0]===dir){
      return files[i][1];
    }
  }
}

function placecheapfile(dir,fname,file){
  removefile(dir+fname);
  files.push([dir+fname,file]);
}

function zerodirfile(dir){
  for(var i=0;i<files.length;i++){
    if(files[i][0]===dir){
      files[i][0]="0";
    }
  }
}

function removefile(dir){
  for(var i=0;i<files.length;i++){
    if(files[i][0]===dir){
      files.splice(i,1);
    }
  }
}

function placefile(dir){//give dir name/name/ side, but not file.ext

}

function setdocall(v){
  //uses Courier
  var brkvid = "";
  var c = 0;
  for(var i=0;i<video.length;i++){
    if(c>=WIDTH){
      c=0;
      brkvid+="\n";
    }
    brkvid+=v.charAt(i);
    c++;
  }
  //docbody.editAsText().setText(brkvid);
  //docbody.editAsText().setFontFamily("Courier");
  background(backgroundcol);
  fill(textcol);
  textSize('20');
  textAlign(LEFT,TOP);
  textFont('Courier');
  text(brkvid,0,0);
}

function setvwrap(str,st){
  if(str.length+st>video.length){ //"ABCDEFG"
    video = video.slice(0,st)+str.slice(st,video.length-st);
    video = str.slice(0,str.length+st-video.length)+video.slice(str.length+st-video.length);
  }else{
    video = video.slice(0,st)+str+video.slice(str.length+st);
  }
}

function proto_getln(){
  //return textboxgetlnok("getln","");
  return prompt("getln");
}

function proto_render(v){
  //console.log(v);
  setdocall(v);
}

function brtochar(t){ //ranged 0 to 255
  var out = " ";
    if(t<=40){
      out = "*";
    }else if(t<=70){
      out = "#";
    }else if(t<=95){
      out = "M";
    }else if(t<=120){
      out = "%";
    }else if(t<=140){
      out = "$"
    }else if(t<=153){
      out = "@";
    }else if(t<=187){
      out = "=";
    }else if(t<=227){
      out = "!";
    }else if(t<=241){
      out = "-";
  }
  return out;
}

function textboxgetlnok(t,d){
  //return docui.prompt(t, d, docui.ButtonSet.OK).getResponseText();
  return prompt(d);
}
