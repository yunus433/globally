const productPhotoNameArray = [];

function createNewProductPhoto(imageData) {  
  productPhotoNameArray.push(JSON.stringify(imageData));

  const imageWrapper = document.createElement("div");
  imageWrapper.classList.add("each-product-photo");
  const image = document.createElement("img");
  image.src= "/res/uploads/" + imageData.name;
  imageWrapper.appendChild(image);

  if (productPhotoNameArray.length >= 5) {
    document.querySelector(".add-new-button").style.display = "none";
  }

  document.getElementById("file-name-array").value = productPhotoNameArray.join('/');
  document.querySelector(".images-wrapper").appendChild(imageWrapper);
  document.querySelector(".images-wrapper").insertBefore(imageWrapper, imageWrapper.previousElementSibling);
  document.querySelector(".images-outer-wrapper").scrollLeft =  document.querySelector(".images-outer-wrapper").scrollWidth;
}


window.onload = () => {
  const contentWrapper = document.querySelector(".content-wrapper");
  const newProductFormWrapper = document.querySelector(".new-product-form-wrapper");

  document.addEventListener("click", (event) => {
    if (event.target.className == "new-product-button") {
      contentWrapper.style.display = "none";
      newProductFormWrapper.style.display = "block";
    } else if (event.target.className == "back-button") {
      contentWrapper.style.display = "block";
      newProductFormWrapper.style.display = "none";
    }
  });

  const productPhotoInput = document.getElementById("product-image-input");
  productPhotoInput.onchange = (event) => {
    const file = productPhotoInput.files[0];
    var formdata = new FormData();
    formdata.append("file", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/admin/products/photo");
    xhr.send(formdata);
    
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.responseText){
        if (xhr.status == 500) {
          alert("Bir hata oluştu, lütfen tekrar deneyin");
          productPhotoInput.value = "";
          if (!/safari/i.test(navigator.userAgent)){
            productPhotoInput.type = "";
            productPhotoInput.type = "file";
          }
        } else {
          createNewProductPhoto(JSON.parse(xhr.responseText));
          productPhotoInput.value = "";
          if (!/safari/i.test(navigator.userAgent)){
            productPhotoInput.type = "";
            productPhotoInput.type = "file";
          }
        }
      };
    };
  };
}
