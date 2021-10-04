$(function(){
  $(document).ready(function () {
        ValidateCarouselControls();
    });

    $('#shared-post_pics_1').on('slid.bs.carousel', ValidateCarouselControls);

    function ValidateCarouselControls() {
        var $this = $('#shared-post_pics_1');
        if ($('.carousel-inner .carousel-item').first().hasClass('active')) {
            // Hide left arrow
            $this.children('.carousel-control-prev').hide();
            // Show right arrow
            $this.children('.carousel-control-next').show();
        } else if ($('.carousel-inner .carousel-item').last().hasClass('active')) {
            // Hide right arrow
            $this.children('.carousel-control-next').hide();
            // Show left arrow
            $this.children('.carousel-control-prev').show();
        } else {
            $this.children('.carousel-control-prev').show();
            $this.children('.carousel-control-show').show();
        }
    }
});
