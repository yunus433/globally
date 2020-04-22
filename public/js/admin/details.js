function createNewProductPhoto(imageSrc) {  
  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add('each-product-photo');
  const image = document.createElement('img');
  image.src= imageSrc;
  const i = document.createElement('i');
  i.classList.add('each-product-edit-icon');
  i.classList.add('fas');
  i.classList.add('fa-trash');
  imageWrapper.appendChild(image);
  imageWrapper.appendChild(i);

  if (document.querySelector('.images-wrapper').childNodes.length >= 5) {
    document.querySelector('.add-new-button').style.display = 'none';
  }

  document.querySelector('.images-wrapper').appendChild(imageWrapper);
  document.querySelector('.images-wrapper').insertBefore(imageWrapper, imageWrapper.previousElementSibling);
  document.querySelector('.images-outer-wrapper').scrollLeft =  document.querySelector('.images-outer-wrapper').scrollWidth;
}


window.onload = () => {
  const product = JSON.parse(document.getElementById("product").value);
  const typeInputs = document.querySelectorAll(".type-input");

  typeInputs.forEach(input => {
    if (input.value == product.type)
      input.checked = true;
  });

  const productPhotoInput = document.getElementById('product-image-input');
  if (productPhotoInput)
    productPhotoInput.onchange = (event) => {
      const file = productPhotoInput.files[0];
      var formdata = new FormData();
      formdata.append('file', file);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", `/admin/details/photo/add?id=${product._id}`);
      xhr.send(formdata);
      
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.responseText){
          if (xhr.status == 500) {
            alert("Bir hata oluştu, lütfen tekrar deneyin.");
            productPhotoInput.value = ''
            if (!/safari/i.test(navigator.userAgent)){
              productPhotoInput.type = ''
              productPhotoInput.type = 'file'
            }
          } else {
            createNewProductPhoto(xhr.responseText);
            productPhotoInput.value = ''
            if (!/safari/i.test(navigator.userAgent)){
              productPhotoInput.type = ''
              productPhotoInput.type = 'file'
            }
          }
        };
      };
    };

  document.addEventListener('click', (event) => {
    if (event.target.className == 'each-product-edit-icon fas fa-trash') {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `/admin/details/photo/delete?id=${product._id}`);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify({
        "photo": event.target.parentNode.childNodes[0].src.toString()
      }));
      
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4){
          if (xhr.status == 200) {
            event.target.parentNode.parentNode.removeChild(event.target.parentNode);
          } else {
            alert("Bir hata oluştu, lütfen tekrar deneyin.");
          };
        };
      };
    };
  });
}
