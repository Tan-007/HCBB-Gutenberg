( function( $ ) {
    // fadding in content on scroll
        $(window).scroll(function() {
            
            $('.wp-block-hcbb-blocks-section-title .title__text').each(function () {
                var bottom_of_object = $(this).offset().top + ($(this).outerHeight());
                var bottom_of_window = $(window).scrollTop() + $(window).height();
                var top_of_object = $(this).offset().top;

                if(bottom_of_window > bottom_of_object) {
                    $(this).addClass('animate-title');
                }
                if(bottom_of_window < top_of_object) {
                    $(this).removeClass('animate-title');
                }
            });

        });

})( jQuery );
