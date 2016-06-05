jQuery(document).ready(function($) {

	/**
	 * Load new post when the link is clicked.
	 */
	$('.portfolio-item').click(function() {
	    var that = this;
	    
	    $('body').css('cursor', 'wait');
	    $(this).append('<div class="ajax-progress ajax-progress-throbber"><div class="throbber">&nbsp;</div></div>');
	    
	    var $post_id = $(this).attr('id');
		
			// Show that we're working.
			$('#project-info').html('<div class="text-center"><div class="ajax-progress ajax-progress-throbber"><div class="throbber">&nbsp;</div></div></div>');
      
      $('#project-info').load("?p=" + $post_id + ' #content',
        function() {
          
          $("html, body, .page-section-current").animate({ scrollTop: "0" },1000);
          $('#project-info').removeClass('hide');
          $('#project-info').css('display' , 'block');
          $('body').css('cursor', 'auto');
          
          $(that).find('.ajax-progress-throbber').remove();
        }
      );	
		return false;
	});
});