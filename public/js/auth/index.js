window.onload = () => {
  addEventListener(document);

  document.addEventListener("click", event => {
    if (event.target.className == "right-side-open-button" || event.target.parentNode.className == "right-side-open-button") {
      document.querySelector(".left-side-open-button").style.borderColor = "rgb(205, 204, 204)";
      document.querySelector(".main-wrapper-left-side").style.display = "none";
      document.querySelector(".right-side-open-button").style.borderColor = "rgb(136, 136, 136)";
      document.querySelector(".main-wrapper-right-side").style.display = "flex";
    } else if (event.target.className == "left-side-open-button" || event.target.parentNode.className == "left-side-open-button") {
      document.querySelector(".right-side-open-button").style.borderColor = "rgb(205, 204, 204)";
      document.querySelector(".main-wrapper-right-side").style.display = "none";
      document.querySelector(".left-side-open-button").style.borderColor = "rgb(136, 136, 136)";
      document.querySelector(".main-wrapper-left-side").style.display = "flex";
    }
  });

  document.addEventListener("focus", event => {
    if (event.target.tagName == "INPUT" && event.target.className != 'all-header-search-wrapper' && event.target.parentNode.className != 'all-header-search-wrapper') {
      if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
      ) {
        document.querySelector('.all-header').style.display = 'none';
      }
    }
  }, true);

  document.addEventListener("focusout", event => {
    if (event.target.tagName == "INPUT" && event.target.className != 'all-header-search-wrapper' && event.target.parentNode.className != 'all-header-search-wrapper') {
      if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
      ) {
        document.querySelector('.all-header').style.display = 'flex';
      }
    }
  }, true);
}
