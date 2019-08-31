$(function() {
    var scroll_start = 0;
    var startchange = $('#navbar');
    var offset = startchange.offset();
     if (startchange.length){
   $(document).scroll(function() { 
      scroll_start = $(this).scrollTop();
    if(scroll_start >= offset.top) {
        $("#navbar").addClass("shrink").removeClass("scrolled");
    } else {
        $('#navbar').addClass("scrolled").removeClass("shrink");
    }

});
     }

     $(".resume button").click(function(){
         var panelID = $(this).attr('data-panelid');
         $('#'+panelID).toggle();
      
      });

      $(".resume button").click(function(){
        var chil = $(this).find('i')
       
       $(chil).toggleClass("rotate90");
       
     }); 

     $(document).ready(function() {
      $('a[href*=\\#]').on('click', function(e){
         // e.preventDefault();
          $('html, body').animate({
              scrollTop : $(this.hash).offset().top
          }, 500);
      });
  });

  $(document).ready(function() {
    if (window.location.hash) {
        var hash = window.location.hash;
        $('html, body').animate({
            scrollTop :  $(hash).offset().top
        }, 500);
    };
});
    });