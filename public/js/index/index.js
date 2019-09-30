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

  const numberWrapper = document.querySelector(".product-number-wrapper");
  const numberInput = document.querySelector(".product-number-input");
  const numberError = document.querySelector(".product-number-error");

  let clickedButton;
  
  document.addEventListener("click", event => {
    if (event.target.className == "product-number-send-button") {
      if (numberInput.value && numberInput.value > 0) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/basket");
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify({
            id: clickedButton.id,
            number: numberInput.value
        }));
        clickedButton.innerHTML = "Sepetten Çıkar";
        clickedButton.className = "remove-from-basket-button";
        numberWrapper.style.display = "none";
        numberError.innerHTML = "";
        numberInput.value = 1;
      } else {
        numberError.innerHTML = "Lütfen sıfırdan büyük bir değer giriniz"
      }
    } else if (event.target.className == "product-number-close-button") {
      numberWrapper.style.display = "none";
      numberError.innerHTML = "";
      numberInput.value = 1;
    } else if (event.target.className != "product-number-wrapper" && event.target.parentNode.className != "product-number-wrapper" && event.target.parentNode.parentNode.className != "product-number-wrapper") {
      numberWrapper.style.display = "none";
      numberError.innerHTML = "";
      numberInput.value = 1;
    }

    if (event.target.className == "add-to-basket-button" && event.target.id.length > 0) {
      numberWrapper.style.display = "flex";
      clickedButton = event.target;
    }

    if (event.target.classList.contains("all-header-responsive-menu-open-button")) {
      document.querySelector(".responsive-menu-wrapper").classList.remove("close-menu-animation-class");
      document.querySelector(".responsive-menu-wrapper").classList.add("open-menu-animation-class");
    } else if (event.target.classList.contains("all-header-responsive-menu-close-button")) {
      document.querySelector(".responsive-menu-wrapper").classList.remove("open-menu-animation-class");
      document.querySelector(".responsive-menu-wrapper").classList.add("close-menu-animation-class");
    }

    if (event.target.className == "remove-from-basket-button" && event.target.id.length > 0) {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/basket/remove");
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify({
          id: event.target.id
      }));
      setTimeout(() => {
        event.target.innerHTML = "Sepete Ekle";
        event.target.className = "add-to-basket-button";
      }, 100);
    }
  });

  document.addEventListener("mouseout", (event) => {
    if (event.target.className == "each-product") {
      event.target.childNodes[4].style.visibility = "hidden";
    } else if (event.target.parentNode.className == "each-product") {
      event.target.parentNode.childNodes[4].style.visibility = "hidden";
    } else if (event.target.parentNode.className == "each-product") {
      event.target.parentNode.childNodes[4].style.visibility = "hidden";
    } else if (event.target.parentNode.parentNode.className == "each-product") {
      event.target.parentNode.parentNode.childNodes[4].style.visibility = "hidden";
    } else if (event.target.parentNode.parentNode.parentNode.className == "each-product") {
      event.target.parentNode.parentNode.parentNode.childNodes[4].style.visibility = "hidden";
    }
  });

  document.addEventListener("mouseover", (event) => {
    if (event.target.className == "each-product") {
      event.target.childNodes[4].style.visibility = "visible";
    } else if (event.target.parentNode.className == "each-product") {
      event.target.parentNode.childNodes[4].style.visibility = "visible";
    } else if (event.target.parentNode.className == "each-product") {
      event.target.parentNode.childNodes[4].style.visibility = "visible";
    } else if (event.target.parentNode.parentNode.className == "each-product") {
      event.target.parentNode.parentNode.childNodes[4].style.visibility = "visible";
    } else if (event.target.parentNode.parentNode.parentNode.className == "each-product") {
      event.target.parentNode.parentNode.parentNode.childNodes[4].style.visibility = "visible";
    }

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
