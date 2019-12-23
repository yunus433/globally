window.onload = () => {
  document.addEventListener("focus", event => {
    if (event.target.tagName == "INPUT") {
      event.target.parentNode.style.borderColor = "rgb(39, 53, 131)";
    }
  }, true);

  document.addEventListener("focusout", event => {
    if (event.target.tagName == "INPUT") {
      event.target.parentNode.style.borderColor = "rgb(236, 236, 236)";
    }
  }, true);

  document.addEventListener("click", event => {
    if (event.target.classList.contains("all-header-responsive-menu-open-button")) {
      document.querySelector(".responsive-menu-wrapper").classList.remove("close-menu-animation-class");
      document.querySelector(".responsive-menu-wrapper").classList.add("open-menu-animation-class");
    } else if (event.target.classList.contains("all-header-responsive-menu-close-button")) {
      document.querySelector(".responsive-menu-wrapper").classList.remove("open-menu-animation-class");
      document.querySelector(".responsive-menu-wrapper").classList.add("close-menu-animation-class");
    }

    if (event.target.className == "responsive-all-product-button" || event.target.parentNode.className == "responsive-all-product-button") {
      const categoryWrapperResponsive = document.querySelector(".header-category-wrapper-responsive");

      if (categoryWrapperResponsive.classList.contains("open-bottom-animation-class")) {
        categoryWrapperResponsive.classList.remove("open-bottom-animation-class");
        categoryWrapperResponsive.classList.add("close-up-animation-class");
      } else {
        categoryWrapperResponsive.classList.add("open-bottom-animation-class");
        categoryWrapperResponsive.classList.remove("close-up-animation-class");
      }
    }

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

  document.addEventListener("mouseover", (event) => {
    if (event.target.className == "all-product-button" || event.target.parentNode.className == "all-product-button" || event.target.parentNode.parentNode.className == "all-product-button") {
      document.querySelector(".header-category-wrapper").style.display = "block";
    } else {
      document.querySelector(".header-category-wrapper").style.display = "none";
    }
  });
}
