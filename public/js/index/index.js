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
        numberError.innerHTML = "";
        numberInput.value = 1;
      } else {
        numberError.innerHTML = "Lütfen sıfırdan büyük bir değer giriniz"
      }
    } else if (event.target.className == "product-number-close-button") {
      numberWrapper.classList.add('popUpCloseAnimationClass');
      numberWrapper.classList.remove('popUpOpenAnimationClass');
      numberError.innerHTML = "";
      numberInput.value = 1;
    } else if (event.target.classList.contains("product-number-wrapper") && event.target.parentNode.classList.contains("product-number-wrapper") && event.target.parentNode.parentNode.classList.contains("product-number-wrapper")) {
      numberWrapper.classList.add('popUpCloseAnimationClass');
      numberWrapper.classList.remove('popUpOpenAnimationClass');
      numberError.innerHTML = "";
      numberInput.value = 1;
    }

    if (event.target.className == "add-to-basket-button" && event.target.id.length > 0) {
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
}
