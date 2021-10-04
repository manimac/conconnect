//$(function(){
//  $(document).ready(function () {
//        ValidateCarouselControls();
//    });

//    $('#shared-post_pics_1').on('slid.bs.carousel', ValidateCarouselControls);

//    function ValidateCarouselControls() {
//        var $this = $('#shared-post_pics_1');
//        if ($('.carousel-inner .carousel-item').first().hasClass('active')) {
//            // Hide left arrow
//            $this.children('.carousel-control-prev').hide();
//            // Show right arrow
//            $this.children('.carousel-control-next').show();
//        } else if ($('.carousel-inner .carousel-item').last().hasClass('active')) {
//            // Hide right arrow
//            $this.children('.carousel-control-next').hide();
//            // Show left arrow
//            $this.children('.carousel-control-prev').show();
//        } else {
//            $this.children('.carousel-control-prev').show();
//            $this.children('.carousel-control-show').show();
//        }
//    }
//});


$('#recipeCarousel').carousel({
  interval: 10000
})

$('.carousel .carousel-item').each(function () {
  var minPerSlide = 3;
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(':first');
  }
  next.children(':first-child').clone().appendTo($(this));

  for (var i = 0; i < minPerSlide; i++) {
    next = next.next();
    if (!next.length) {
      next = $(this).siblings(':first');
    }

    next.children(':first-child').clone().appendTo($(this));
  }
});