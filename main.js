//Bodyn ladatessa haetaan ja listataan Finnkinon teatterit
function loadAreas() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "https://www.finnkino.fi/xml/TheatreAreas/", true);
  xmlhttp.send();

  xmlhttp.onreadystatechange=function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status==200) {
      // Tallenetaan vastaustiedot muuttujaan käsittelyiden helpottamiseksi
      var xmlDoc = xmlhttp.responseXML;
        
      //Etsii getElementsByTagName:n avulla xml tiedot teatterien nimet yms.
      var theatreNames = xmlDoc.getElementsByTagName("Name");
      var theatreIDs = xmlDoc.getElementsByTagName("ID");

      //Käy läpi taulukon
      for(var i = 0; i < theatreNames.length; i++) {
        //Teksti xml tiedostoista
        var theatreText = theatreNames[i].innerHTML;
        var theatreID = theatreIDs[i].innerHTML;

        
          // Luo uuden vaihtoehdon valitulle luettelolle ja tekee siitä ID:n xml-tiedostosta
        document.getElementById("theatreList").innerHTML +=  '<option value = ' + theatreID + '>' + theatreText + '</option>';
      }
    }
  }
}

// Kun käyttäjä valitsee teatterin ni se kutsuu tätä funktiota joka hakee finnkinon sivuilta kyseisen teatterin elokuva aikataulun
function loadSchedule() {
  //Näyttää hakukentän kun teatteri on valittu
  document.getElementById("userInput").style.display="block";
  //Tyhjentää luettelon eikä tulosta uusia tietoja vanhojen päälle
  document.getElementById("list").innerHTML = "";
  //Hakee ID:n valitulle teatterille
  var id = document.getElementById("theatreList").value;
  //Lähettää pyynnöön, käyttää teatterin ID:tä saadakseen tälle teatterille ominaisia tietoja
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", "https://www.finnkino.fi/xml/Schedule/?area=" + id, true);
  xmlhttp.send();

  xmlhttp.onreadystatechange=function() {
    if(xmlhttp.readyState == 4 && xmlhttp.status==200) {
      // Tallenna vastaustiedot muuttujaan
      var xmlDoc = xmlhttp.responseXML;
      var titles = xmlDoc.getElementsByTagName("Title");
      var imageURLs = xmlDoc.getElementsByTagName("EventSmallImagePortrait");
      var timeTable = xmlDoc.getElementsByTagName("dttmShowStart");
      var rating = xmlDoc.getElementsByTagName("RatingImageUrl");
      var contentDescriptors = xmlDoc.getElementsByTagName("ContentDescriptors");
      var duration = xmlDoc.getElementsByTagName("LengthInMinutes")
      for(var i = 0; i < titles.length; i++) {
        var imageURL = '<img class="images" src="' + imageURLs[i].innerHTML + '">';
        //Elokuvan nimi
        var title = titles[i].innerHTML;
        //Elokuvan aikataulu
        var xmlSchedule = timeTable[i].innerHTML;
        //Elokuvan arviointi
        var ratingIMG = '<img src="' + rating[i].innerHTML + '">';
       //Elokuvan kesto
        var xmlDuration = duration[i].innerHTML;

        //Xml:stä tarvittavat aikataulutiedot
        var time = xmlSchedule.slice(11, 16);
        var date = xmlSchedule.slice(8, 10);
        var month = xmlSchedule.slice(5,7);
        var year = xmlSchedule.slice(0,4);

        //Elokuvan varoitukset
        var contentDescriptor = contentDescriptors[i].getElementsByTagName("ContentDescriptor");
        var descriptionImages = "";
        for(var j = 0; j < contentDescriptor.length; j++) {
          descriptionImages += '<img src="' + contentDescriptor[j].getElementsByTagName("ImageURL")[0].innerHTML + '">';
        }
        $("#list").hide();
        document.getElementById("list").innerHTML += '<tr><td>'+ imageURL + '</td><td>' + title + '<br/>' + date + "."+ month+ "." + year + " " + time + '<br/>' + "Kesto: " + xmlDuration + " minuuttia <br/> <br/>" + ratingIMG + descriptionImages + '</td>';
        $("#list").fadeIn(500);
      }
    }
  }
}
function searchFunction() {
  //Muuttujat
  var input = document.getElementById("userInput");
  var filter = input.value.toUpperCase();
  var table = document.getElementById("list");
  var tr = table.getElementsByTagName("tr");

  // Käy läpi listan kohteen ja piilottaa ne jotka eivät täsmää
  for(var i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    txtValue = td.innerHTML;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
    $("#list").find('tr').eq(i).fadeIn(1000);
    } else {
      $("#list").find('tr').eq(i).fadeOut(1000);
    }
  }
}
