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

    if (event.target.classList.contains("remove-button") && event.target.parentNode.id.length > 0) {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/basket/remove");
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify({
          id: event.target.parentNode.id
      }));
      event.target.parentNode.id = "";
      event.target.parentNode.style.display = "none";
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
  });

  document.addEventListener("mouseover", (event) => {
    if (event.target.className == "all-product-button" || event.target.parentNode.className == "all-product-button" || event.target.parentNode.parentNode.className == "all-product-button") {
      document.querySelector(".header-category-wrapper").style.display = "block";
    } else {
      document.querySelector(".header-category-wrapper").style.display = "none";
    }
  });

  const searchInput = document.querySelector(".search-input");
  searchInput.onkeypress = (event) => {
    if (!event) event = window.event;
    const keyCode = event.keyCode || event.which;

    if (keyCode == '13') {
      window.location = "/?keywords=" + searchInput.value;
    }
  }
}
