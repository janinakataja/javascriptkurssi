
// luodaan sulje -painike
    
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
   var txt = document.createTextNode("✘");
  span.className = "sulje";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// sulje painike piilottaa listan kohteen
    
var sulje = document.getElementsByClassName("sulje");
var i;
for (i = 0; i < sulje.length; i++) {
  sulje[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// lisää symbolin merkitylle listan kohdalle
    
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Luo uuden tehtäväkohdan listaan kun painetaan lisää painiketta
    
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("JaninaInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("Sinun pitää kirjoittaa jotain!");
  } else {
    document.getElementById("JaninaUL").appendChild(li);
  }
  document.getElementById("JaninaInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("✘");
  span.className = "sulje";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < sulje.length; i++) {
    sulje[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}
