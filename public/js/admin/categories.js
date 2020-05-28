const insertBeforeArray = (categories, id) => {
  let newCategories = categories;
  newCategories.forEach((category, i) => {
    if (category._id.toString() == id.toString()) {
      const temp = newCategories[i-1];
      newCategories[i-1] = category;
      newCategories[i] = temp;
    }
  });
  return newCategories;
}

window.onload = () => {
  let categories = JSON.parse(document.getElementById('categories-input').value);

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

  document.addEventListener('click', event => {
    if (event.target.classList.contains('up-button')) {
      const element = event.target.parentNode.parentNode;
      if (element.previousElementSibling) {
        categories = insertBeforeArray(categories, element.id);

        element.parentNode.insertBefore(element, element.previousElementSibling);
      } else {
        return;
      }
    }

    if (event.target.className == "send-new-order-button") {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/admin/categories/order");
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify({
        "categories": categories
      }));

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4)
          return location.reload();
      }
    }
  });
}
