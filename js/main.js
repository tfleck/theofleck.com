//Populate heavy items after DOM loaded
$(document).ready( function() {
  //higher res profile picture
  let can_webp = canUseWebP();
  if(can_webp){
    $('#profile-override').attr('type', 'image/webp');
    $('#profile-override').attr('srcset', '/img/profile.webp');
  } 
  else {
    $('#profile-override').attr('type', 'image/png');
    $('#profile-override').attr('srcset', '/img/profile.png');
  }

  // wait to load youtube videos
  setTimeout(loadYoutube(),100);
});

// register lazy load listener
document.addEventListener("DOMContentLoaded", function() {
  let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  let active = false;
  let can_webp = canUseWebP();

  const lazyLoad = function() {
    if (active === false) {
      active = true;

      setTimeout(function() {
        lazyImages.forEach(function(lazyImage) {
          if ((lazyImage.getBoundingClientRect().top <= window.innerHeight+500 && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
            if(can_webp){
              lazyImage.src = lazyImage.dataset.src.split('.')[0]+'.webp';
            }
            else{
              lazyImage.src = lazyImage.dataset.src;
            }
            lazyImage.classList.remove("lazy");

            lazyImages = lazyImages.filter(function(image) {
              return image !== lazyImage;
            });

            if (lazyImages.length === 0) {
              document.removeEventListener("scroll", lazyLoad);
              window.removeEventListener("resize", lazyLoad);
              window.removeEventListener("orientationchange", lazyLoad);
            }
          }
        });

        active = false;
      }, 200);
    }
  };

  document.addEventListener("scroll", lazyLoad);
  window.addEventListener("resize", lazyLoad);
  window.addEventListener("orientationchange", lazyLoad);
});

//Shrink navbar on scroll
$(window).scroll(function() {
  if ($(document).scrollTop() > 50) {
    $('nav').addClass('shrink');
    $('#icon-img').css('max-width','30px');
  } else {
    $('nav').removeClass('shrink');
    $('#icon-img').css('max-width','40px');
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

function canUseWebP() {
  var elem = document.createElement('canvas');

  if (!!(elem.getContext && elem.getContext('2d'))) {
      // was able or not to get WebP representation
      return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
  }

  // very old browser like IE 8, canvas not supported
  return false;
}

function loadYoutube(){
  // about me iframe
  $('iframe#ytvideo').attr('src', 'https://www.youtube-nocookie.com/embed/L9VBpbnXhWk?modestbranding=1&playsinline=1&rel=0');

  // inspiration album
  $('iframe#inspire1').attr('src', 'https://www.youtube-nocookie.com/embed/ji5_MqicxSo?modestbranding=1&playsinline=1&rel=0');
  $('iframe#inspire2').attr('src', 'https://www.youtube-nocookie.com/embed/T76FdtKreNQ?modestbranding=1&playsinline=1&rel=0');
  $('iframe#inspire3').attr('src', 'https://www.youtube-nocookie.com/embed/y6T-pKTGTFw?modestbranding=1&playsinline=1&rel=0');
  $('iframe#inspire4').attr('src', 'https://www.youtube-nocookie.com/embed/LZM9YdO_QKk?modestbranding=1&playsinline=1&rel=0');
  $('iframe#inspire5').attr('src', 'https://www.youtube-nocookie.com/embed/nyqLJSclNb4?modestbranding=1&playsinline=1&rel=0');
  $('iframe#inspire6').attr('src', 'https://www.youtube-nocookie.com/embed/0RxlJ2TdYPo?modestbranding=1&playsinline=1&rel=0');
  $('iframe#inspire7').attr('src', 'https://www.youtube-nocookie.com/embed/TmQmEVPViaY?modestbranding=1&playsinline=1&rel=0');
  $('iframe#inspire8').attr('src', 'https://www.youtube-nocookie.com/embed/YUwi1yUGk0Y?modestbranding=1&playsinline=1&rel=0');
  $('iframe#inspire9').attr('src', 'https://www.youtube-nocookie.com/embed/ItmAVmvfTyY?modestbranding=1&playsinline=1&rel=0');
}