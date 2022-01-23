_X_GPROGAUTH = "testpagetjs";
var n = _X_APIGETV("n");
if(n===null){
  n=0;
  _X_APISTOREV("n",0);
}else{
  n++;
  _X_APISTOREV("n",n);
}
_X_GOLDTEXT+=n+"\n";
_X_GTEXTBUFFER = _X_GOLDTEXT + _X_GCURPREF + _X_GINPTB + _X_GCURTEXT;
_X_APIRENDERTEXT();
if(n>59){
  _X_GPROGAUTH = "_X_MAIN"; //
}
