//Populate heavy items after DOM loaded
$(document).ready( function() {
  //higher res profile picture
  $('#profile-img').attr('src', '/img/profile.png');
  // about me iframe
  $('iframe#ytvideo').attr('src', 'https://www.youtube-nocookie.com/embed/L9VBpbnXhWk?rel=0');
  // projects album
  $('#album1').attr('src', '/img/album/philmont.png');
  $('#album2').attr('src', '/img/album/rigv3.png');
  $('#album3').attr('src', '/img/album/eagleproject.jpg');
  $('#album4').attr('src', '/img/album/drone.png');
  $('#album5').attr('src', '/img/album/evc.png');
  $('#album6').attr('src', '/img/album/minibike.png');
  $('#album7').attr('src', '/img/album/realrandom.png');
  $('#album8').attr('src', '/img/album/shoe.jpg');
  $('#album9').attr('src', '/img/album/398project.jpg');
  // inspiration album
  $('iframe#inspire1').attr('src', 'https://www.youtube-nocookie.com/embed/ji5_MqicxSo');
  $('iframe#inspire2').attr('src', 'https://www.youtube-nocookie.com/embed/T76FdtKreNQ');
  $('iframe#inspire3').attr('src', 'https://www.youtube-nocookie.com/embed/y6T-pKTGTFw');
  $('iframe#inspire4').attr('src', 'https://www.youtube-nocookie.com/embed/LZM9YdO_QKk');
  $('iframe#inspire5').attr('src', 'https://www.youtube-nocookie.com/embed/nyqLJSclNb4');
  $('iframe#inspire6').attr('src', 'https://www.youtube-nocookie.com/embed/0RxlJ2TdYPo');
  $('iframe#inspire7').attr('src', 'https://www.youtube-nocookie.com/embed/TmQmEVPViaY');
  $('iframe#inspire8').attr('src', 'https://www.youtube-nocookie.com/embed/YUwi1yUGk0Y');
  $('iframe#inspire9').attr('src', 'https://www.youtube-nocookie.com/embed/ItmAVmvfTyY');
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
  if (this.hash != null && this.hash !== "" && $(this.hash).length > 0) {
    event.preventDefault();
    var hash = this.hash;
    $('html, body').animate({
      scrollTop: $(hash).offset().top - 65
    }, 900);
  }
});