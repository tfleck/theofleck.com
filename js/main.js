//Populate heavy items after DOM loaded
$(document).ready(function(){
    $('iframe#ytvideo').attr('src', 'https://www.youtube-nocookie.com/embed/L9VBpbnXhWk?rel=0');
    $('#album1').attr('src','img/album/philmont.jpg');
    $('#album2').attr('src','img/album/rigv3.jpg');
    $('#album3').attr('src','img/album/realrandom.jpg');
    $('#album4').attr('src','img/album/drone.jpg');
    $('#album5').attr('src','img/album/evc.jpg');
    $('#album6').attr('src','img/album/minibike.jpg');
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
      scrollTop: $(hash).offset().top
    }, 800, function(){
      window.location.hash = hash;
    });
  }
});
