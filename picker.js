var el = document.getElementById('fileinput');
if(el){
  el.addEventListener('change', readSingleFile, false);
}