//Populate heavy items after DOM loaded
$(window).on("load", function() {
  $('iframe#ytvideo').attr('src', 'https://www.youtube-nocookie.com/embed/L9VBpbnXhWk?rel=0');
  $('#album1').attr('src', 'img/album/philmont.png');
  $('#album2').attr('src', 'img/album/rigv3.png');
  $('#album3').attr('src', 'img/album/eagleproject.jpg');
  $('#album4').attr('src', 'img/album/drone.png');
  $('#album5').attr('src', 'img/album/evc.png');
  $('#album6').attr('src', 'img/album/minibike.png');
  $('#album7').attr('src', 'img/album/realrandom.png');
  $('#album8').attr('src', 'img/album/shoe.jpg');
  $('#album9').attr('src', 'img/album/398project.jpg');
});
//Shrink navbar on scroll
$(window).scroll(function() {
  if ($(document).scrollTop() > 50) {
    $('nav').addClass('shrink');
  } else {
    $('nav').removeClass('shrink');
  }
});
// Add smooth scrolling on all links inside the navbar
$("nav a").on('click', function(event) {
  if (this.hash !== "") {
    event.preventDefault();
    var hash = this.hash;
    $('html, body').animate({
      scrollTop: $(hash).offset().top - 65
    }, 900);
  }
});