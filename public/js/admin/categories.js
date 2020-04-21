window.onload = () => {
  const contentWrapper = document.querySelector(".content-wrapper");
  const newProductFormWrapper = document.querySelector(".new-category-form-wrapper");

  document.addEventListener("click", (event) => {
    if (event.target.className == "new-category-button") {
      contentWrapper.style.display = "none";
      newProductFormWrapper.style.display = "block";
    } else if (event.target.className == "back-button") {
      contentWrapper.style.display = "block";
      newProductFormWrapper.style.display = "none";
    }
  });
}
