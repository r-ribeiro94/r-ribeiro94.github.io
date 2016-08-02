//jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }

    var ht = $('.services-section').offset().top,
        hH = $('.services-section').outerHeight(),
        wH = $(window).height(),
        wS = $(this).scrollTop();

    if(wS > (ht + hH - wH)) {
        $('.services-section-left i').animate({'opacity':'1'}, {duration: 2000, easing: 'easeInBounce'});
        $('.services-section-right i').animate({'opacity':'1'}, {duration: 2000, easing: 'easeInBounce'});
    }
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});


$(window).load(function() {        
    // Animate loader off screen
    $(".se-pre-con").fadeOut("slow");
    
});
