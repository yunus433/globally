window.onload = () => {
  addEventListener(document);

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
        numberWrapper.classList.add('popUpCloseAnimationClass');
        numberWrapper.classList.remove('popUpOpenAnimationClass');
        setTimeout(() => {
          numberWrapper.style.display = "none";
        }, 500);
        numberError.innerHTML = "";
        numberInput.value = 1;
      } else {
        numberError.innerHTML = "Lütfen sıfırdan büyük bir değer giriniz"
      }
    } else if (event.target.className == "product-number-close-button") {
      numberWrapper.classList.add('popUpCloseAnimationClass');
      numberWrapper.classList.remove('popUpOpenAnimationClass');
      setTimeout(() => {
        numberWrapper.style.display = "none";
      }, 500);
      numberError.innerHTML = "";
      numberInput.value = 1;
    }

    if (event.target.className == "add-to-basket-button" && event.target.id.length > 0) {
      event.preventDefault();
      numberWrapper.style.display = "flex";
      numberWrapper.classList.add('popUpOpenAnimationClass');
      numberWrapper.classList.remove('popUpCloseAnimationClass');
      clickedButton = event.target;
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
    if (event.target.className == "each-category") {
      event.target.childNodes[3].style.visibility = "hidden";
    } else if (event.target.parentNode.className == "each-category") {
      event.target.parentNode.childNodes[3].style.visibility = "hidden";
    } else if (event.target.parentNode.className == "each-category") {
      event.target.parentNode.childNodes[3].style.visibility = "hidden";
    } else if (event.target.parentNode.parentNode.className == "each-category") {
      event.target.parentNode.parentNode.childNodes[3].style.visibility = "hidden";
    } else if (event.target.parentNode.parentNode.parentNode.className == "each-category") {
      event.target.parentNode.parentNode.parentNode.childNodes[3].style.visibility = "hidden";
    }
  });

  document.addEventListener("mouseover", (event) => {
    if (event.target.className == "each-category") {
      event.target.childNodes[3].style.visibility = "visible";
    } else if (event.target.parentNode.className == "each-category") {
      event.target.parentNode.childNodes[3].style.visibility = "visible";
    } else if (event.target.parentNode.className == "each-category") {
      event.target.parentNode.childNodes[3].style.visibility = "visible";
    } else if (event.target.parentNode.parentNode.className == "each-category") {
      event.target.parentNode.parentNode.childNodes[3].style.visibility = "visible";
    } else if (event.target.parentNode.parentNode.parentNode.className == "each-category") {
      event.target.parentNode.parentNode.parentNode.childNodes[3].style.visibility = "visible";
    }
  });
}
