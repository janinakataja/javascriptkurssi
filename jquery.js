/*Mahdollistaa Enterin avulla tehtävän lisäämisen listalle */
var EnterKey = 13;

/*Tehdään funktio joka poistaa rivin listasta*/
$(document).ready(function() {
		function poislis() {
        $('.poista').on('click', function(e) {
          $currentListItem = $(this).closest('li');
          $currentListItem.remove();
            
        });
            
    /*Aina kun klikataan checkboxia, tehtävä yliviivataan*/        
        $('.vaihda').on('click', function(e) {
          var $currentListItemLabel = $(this).closest('li').find('label');
		
		  if ( $currentListItemLabel.attr('data') == 'tehty' ) {
			  $currentListItemLabel.attr('data', '');
		  }
            
		  else {
			  $currentListItemLabel.attr('data', 'tehty');
        $currentListItemLabel.css('text-decoration', 'line-through');
		  }
			});
		}
	
    /*Tehdään funktio, joka lisää uuden tehtävärivin*/
	$tehtlista = $('#tehtlista');
	$('#uusiteht').keypress(function(e) {
    if (e.which === EnterKey) {
			$('.poista').off('click');
			$('.vaihda').off('click');
			var teht = $tehtlista.html();
      teht += ""+
				"<li>" +
          "<div class='view'>" +
            "<input class='vaihda' type='checkbox'>" +
            "<label data=''>" + " " + $('#uusiteht').val() + "</label>" +
            "<a class='poista'></a>" +
          "</div>" +
        "</li>";
        
   	  /*Näyttää rivit, main näyttää koko taulukon*/
	  $(this).val('');
		$tehtlista.html(teht);
		poislis();
		$('#main').show();
    
  }});
});