/**
 * this script is responsible for scrolling when 
 * clicked on the icon 'Mouse' on block 'Cover'
 */

( function( $ ) {
    // fadding in content on scroll
    $("#mouse-icon").on('click', function(e) {
        e.preventDefault();

        $masthead = $('#masthead').innerHeight(); // this is dangerous

        $('html, body').animate({
            scrollTop: ($(window).innerHeight() - $masthead)+'px'
           }, 800)
    });

})( jQuery );
