$(function() {
    // Mobile navigation toggle
    $('#nav-toggle').click(function() {
        $('#nav-menu').toggleClass('active');
        $(this).toggleClass('active');
    });

    // Close mobile menu when clicking on a nav link
    $('.nav-link').click(function() {
        $('#nav-menu').removeClass('active');
        $('#nav-toggle').removeClass('active');
    });

    // Legacy resume accordion functionality
    $(".resume button").click(function(){
        var panelID = $(this).attr('data-panelid');
        $('#'+panelID).toggle();
    });

    $(".resume button").click(function(){
        var chil = $(this).find('i');
        $(chil).toggleClass("rotate90");
    }); 

    // Smooth scrolling for anchor links
    $(document).ready(function() {
        $('a[href*=\\#]').on('click', function(e){
            if (this.hash !== "") {
                var target = $(this.hash);
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top - 64 // Account for fixed navbar
                    }, 500);
                }
            }
        });
    });

    // Handle hash on page load
    $(document).ready(function() {
        if (window.location.hash) {
            var hash = window.location.hash;
            var target = $(hash);
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 64
                }, 500);
            }
        }
    });

    // Add scroll effect to navbar (optional enhancement)
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });
});