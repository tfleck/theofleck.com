// Populate heavy items after DOM loaded
var documentReady = function() {
  //higher res profile picture
  let can_webp = canUseWebP();
  if(can_webp){
    document.querySelector('#profile-override').setAttribute('type', 'image/webp');
    document.querySelector('#profile-override').setAttribute('srcset', '/img/profile.webp');
  } 
  else {
    document.querySelector('#profile-override').setAttribute('type', 'image/png');
    document.querySelector('#profile-override').setAttribute('srcset', '/img/profile.png');
  }

  // add smooth scroll listeners to nav
  setupSmoothScroll();

  // wait to load youtube videos
  loadYoutube();
};

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
window.onscroll = function() {
  if (document.documentElement.scrollTop > 50) {
    document.querySelector('nav').classList.add('shrink');
    document.querySelector('#icon-img').classList.add('shrink');
  } else {
    document.querySelector('nav').classList.remove('shrink');
    document.querySelector('#icon-img').classList.remove('shrink');
  }
};

// Add smooth scrolling on all links inside the navbar
function setupSmoothScroll() {
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach(navLink => {
    navLink.addEventListener('click', function (event) {
      const hash = this.hash;
      if (hash != null && hash !== "" && hash.length > 1) {
        event.preventDefault();

        const href = this.getAttribute("href");
        const offsetTop = document.querySelector(href).offsetTop + 40;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        })

        // Add hash (#) to URL when done scrolling (default click behavior), without jumping to hash
        if (history.pushState) {
          history.pushState(null, null, hash); 
        } else {
            window.location.hash = hash;
        } 
      }
    });
  });
}

// Check if WebP image format is supported by the browser
function canUseWebP() {
  var elem = document.createElement('canvas');

  if (!!(elem.getContext && elem.getContext('2d'))) {
      // was able or not to get WebP representation
      return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
  }

  // very old browser like IE 8, canvas not supported
  return false;
}

function ytClickListener(){
  this.innerHTML = '<iframe frameBorder="0" class="video" ' +
        'allow="encrypted-media; picture-in-picture"' +
        'src="https://www.youtube-nocookie.com/embed/' + this.dataset.embed + '?modestbranding=1&playsinline=1&rel=0"' +
        ' allowFullScreen></iframe>';
  this.removeEventListener("click", ytClickListener)
}

// populate youtube iframes on main & inspiration pages
function loadYoutube(){
  //Load YouTube Videos on page...
  var youTubeVideos = document.querySelectorAll('.youtube');
  for (var i = 0; i < youTubeVideos.length; i++) {
      var thumbnail = "https://img.youtube.com/vi/"+ youTubeVideos[i].dataset.embed +"/maxresdefault.jpg";

      //set microdata attributes for SEO
      youTubeVideos[i].setAttribute("itemprop", "video");
      youTubeVideos[i].setAttribute("itemscope", '');
      youTubeVideos[i].setAttribute("itemtype", "http://schema.org/VideoObject");

      //set HTML
      youTubeVideos[i].innerHTML = '<div class="play"></div>' +
          '<meta itemprop="embedURL" content="https://www.youtube.com/embed/' +  youTubeVideos[i].dataset.embed +'" />' +
          '<img style="cursor: pointer;" class="img-fluid" src="' + thumbnail + '" />';

      //add click event that will load YouTube video
      youTubeVideos[i].addEventListener("click", ytClickListener);

  }

  /*

  ytvideos = [
    // about me video
    {
      selector: 'iframe#ytvideo',
      url: 'https://www.youtube-nocookie.com/embed/L9VBpbnXhWk?modestbranding=1&playsinline=1&rel=0'
    },
    // inspiration album
    {
      selector: 'iframe#inspire1',
      url: 'https://www.youtube-nocookie.com/embed/ji5_MqicxSo?modestbranding=1&playsinline=1&rel=0'
    },
    {
      selector: 'iframe#inspire2',
      url: 'https://www.youtube-nocookie.com/embed/T76FdtKreNQ?modestbranding=1&playsinline=1&rel=0'
    },
    {
      selector: 'iframe#inspire3',
      url: 'https://www.youtube-nocookie.com/embed/y6T-pKTGTFw?modestbranding=1&playsinline=1&rel=0'
    },
    {
      selector: 'iframe#inspire4',
      url: 'https://www.youtube-nocookie.com/embed/LZM9YdO_QKk?modestbranding=1&playsinline=1&rel=0'
    },
    {
      selector: 'iframe#inspire5',
      url: 'https://www.youtube-nocookie.com/embed/nyqLJSclNb4?modestbranding=1&playsinline=1&rel=0'
    },
    {
      selector: 'iframe#inspire6',
      url: 'https://www.youtube-nocookie.com/embed/0RxlJ2TdYPo?modestbranding=1&playsinline=1&rel=0'
    },
    {
      selector: 'iframe#inspire7',
      url: 'https://www.youtube-nocookie.com/embed/TmQmEVPViaY?modestbranding=1&playsinline=1&rel=0'
    },
    {
      selector: 'iframe#inspire8',
      url: 'https://www.youtube-nocookie.com/embed/YUwi1yUGk0Y?modestbranding=1&playsinline=1&rel=0'
    },
    {
      selector: 'iframe#inspire9',
      url: 'https://www.youtube-nocookie.com/embed/ItmAVmvfTyY?modestbranding=1&playsinline=1&rel=0'
    },
  ]
  ytvideos.forEach(video => {
    const elem = document.querySelector(video.selector);
    if (elem !== null) {
      elem.setAttribute('src', video.url);
    }
  });
  */
}

// run code when document reaches 'ready' state (alt for jQuery .ready())
if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  documentReady();
} else {
  document.addEventListener("DOMContentLoaded", documentReady);
}