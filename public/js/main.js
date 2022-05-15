// Populate heavy items after DOM loaded
const documentReady = function() {
  //higher res profile picture
  const can_webp = canUseWebP();
  const profileOverride = document.querySelector('#profile-override');
  if (profileOverride !== null){
    if(can_webp){
      profileOverride.setAttribute('type', 'image/webp');
      profileOverride.setAttribute('srcset', '/img/profile.webp');
    } 
    else {
      profileOverride.setAttribute('type', 'image/png');
      profileOverride.setAttribute('srcset', '/img/profile.png');
    }
  }

  // wait to load youtube videos
  loadYoutube();

  // add lazy load listeners
  addLazyListeners();
};

// register lazy load listener
const addLazyListeners = function() {
  let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  let active = false;
  let can_webp = canUseWebP();

  const lazyLoad = function() {
    if (active === false) {
      active = true;

      setTimeout(function() {
        lazyImages.forEach(function(lazyImage) {
          if ((lazyImage.getBoundingClientRect().top <= window.innerHeight+250 && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
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
};


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

// Check if WebP image format is supported by the browser
function canUseWebP() {
  const elem = document.createElement('canvas');

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
        'src="https://www.youtube-nocookie.com/embed/' + this.dataset.embed + 
        '?modestbranding=1&playsinline=1&rel=0"' +
        ' allowFullScreen></iframe>';
  this.removeEventListener("click", ytClickListener)
}

// populate youtube iframes on main & inspiration pages
function loadYoutube() {
  //Load YouTube Videos on page...
  const youtubeVideos = document.querySelectorAll('.youtube');
  if (youtubeVideos !== null && youtubeVideos.length > 0) {
    youtubeVideos.forEach(video => {
      const thumbnail = "https://img.youtube.com/vi/" + video.dataset.embed + "/maxresdefault.jpg";

      //set microdata attributes for SEO
      video.setAttribute("itemprop", "video");
      video.setAttribute("itemscope", '');
      video.setAttribute("itemtype", "http://schema.org/VideoObject");

      //set HTML
      video.innerHTML = '<div class="play"></div>' +
        '<meta itemprop="embedURL" content="https://www.youtube.com/embed/' + video.dataset.embed + '" />' +
        '<img style="cursor: pointer;" class="img-fluid" alt="youtube thumbnail" src="' + thumbnail + '" />';

      //add click event that will load YouTube video
      video.addEventListener("click", ytClickListener);
    });
  }

  const inspireVideos = document.querySelectorAll('.youtube-inspire');
  if (inspireVideos !== null && inspireVideos.length > 0) {
    inspireVideos.forEach(video => {
      //set microdata attributes for SEO
      video.setAttribute("itemprop", "video");
      video.setAttribute("itemscope", '');
      video.setAttribute("itemtype", "http://schema.org/VideoObject");

      //set HTML
      video.innerHTML = '<iframe frameBorder="0" class="video" ' +
        'allow="encrypted-media; picture-in-picture"' +
        'src="https://www.youtube-nocookie.com/embed/' + video.dataset.embed + 
        '?modestbranding=1&playsinline=1&rel=0"' +
        ' allowFullScreen></iframe>';
    });
  }
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