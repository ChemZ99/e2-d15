const maincontainer = document.getElementById("columnscontainer");
const namecont = document.getElementById("exampleModalLabel");
const brandcont = document.getElementById("brandcont");
const desccont = document.getElementById("desccont");
const imgcont = document.getElementById("imgcont");
const pricecont = document.getElementById("pricecont");
const idcont = document.getElementById("idcont");
const delbutton = document.getElementById("delbutton");

const createcard = function (name, brand, desc, url, price, id) {
  const columnContainer = document.createElement("div");
  columnContainer.classList.add("col-md-4");
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card");
  cardContainer.classList.add("mb-4");
  cardContainer.classList.add("shadow-sm");
  const imageElem = document.createElement("img");
  imageElem.classList.add("bd-placeholder-img");
  imageElem.classList.add("card-img-top");
  imageElem.setAttribute("src", url);
  imageElem.setAttribute("height", "500");
  imageElem.setAttribute("width", "100%");
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.innerText = name;
  const cardBrand = document.createElement("p");
  cardBrand.classList.add("card-subtitle");
  cardBrand.classList.add("mb-2");
  cardBrand.classList.add("text-muted");
  cardBrand.innerText = brand;
  const cardText = document.createElement("p");
  cardText.classList.add("card-text");
  cardText.innerText = desc;
  const btnContainer = document.createElement("div");
  btnContainer.classList.add("d-flex");
  btnContainer.classList.add("justify-content-between");
  btnContainer.classList.add("align-items-center");
  const btnslot = document.createElement("div");
  btnslot.classList.add("btn-group");
  const viewbtn = document.createElement("button");
  viewbtn.classList.add("btn");
  viewbtn.classList.add("btn-dark");
  viewbtn.classList.add("btn-sm");
  viewbtn.classList.add("btn-outline-secondary");
  viewbtn.setAttribute("type", "button");
  viewbtn.setAttribute("data-bs-toggle", "modal");
  viewbtn.setAttribute("data-bs-target", "#exampleModal");
  viewbtn.setAttribute("onclick", `handlemodal(event, ${JSON.stringify(id)})`);
  viewbtn.innerText = "view";
  const hidebtn = document.createElement("button");
  hidebtn.classList.add("btn-sm");
  hidebtn.classList.add("btn-dark");
  hidebtn.classList.add("btn");
  hidebtn.classList.add("btn-outline-secondary");
  hidebtn.setAttribute("onclick", "deletecard(event)");
  hidebtn.innerText = "hide";
  const cardFooter = document.createElement("small");
  cardFooter.classList.add("text-muted");
  cardFooter.innerText = `${price} $`;
  btnslot.appendChild(viewbtn);
  btnslot.appendChild(hidebtn);
  btnContainer.appendChild(btnslot);
  btnContainer.appendChild(cardFooter);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardBrand);
  cardBody.appendChild(cardText);
  cardBody.appendChild(btnContainer);
  cardContainer.appendChild(imageElem);
  cardContainer.appendChild(cardBody);
  columnContainer.appendChild(cardContainer);
  maincontainer.appendChild(columnContainer);
};

const deletecard = function (ev) {
  ev.target.closest(".col-md-4").remove();
};

const handlemodal = function (ev, id) {
  console.log(id);
  const targetcard = ev.target.closest(".card");
  namecont.innerText = targetcard.querySelector(".card-title").innerText;
  brandcont.innerText = targetcard.querySelector(".card-subtitle").innerText;
  desccont.innerText = targetcard.querySelector(".card-text").innerText;
  imgcont.src = targetcard.querySelector(".card-img-top").src;
  pricecont.innerText = targetcard.querySelector("small").innerText;
  idcont.innerText = `ID = ${id}`;
  delbutton.addEventListener("click", event => handledelete(event, id));
  delbutton.setAttribute("data-bs-dismiss", "modal");
};

const handledelete = async function (ev, id) {
  console.log(id);
  try {
    const resp = await fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4Njc3ZDEwYmNhMDAwMTQ1ODNmZTIiLCJpYXQiOjE2OTI5NTI0NDUsImV4cCI6MTY5NDE2MjA0NX0.ZV4YbUxty2vnx9jFkUmon4mlImMTNzrfNVxtYoPuLH0",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

window.onload = async () => {
  try {
    const resp = await fetch("https://striveschool-api.herokuapp.com/api/product/", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4Njc3ZDEwYmNhMDAwMTQ1ODNmZTIiLCJpYXQiOjE2OTI5NTI0NDUsImV4cCI6MTY5NDE2MjA0NX0.ZV4YbUxty2vnx9jFkUmon4mlImMTNzrfNVxtYoPuLH0",
      },
    });
    const data = await resp.json();
    maincontainer.innerHTML = "";
    data.forEach(element => {
      createcard(element.name, element.brand, element.description, element.imageUrl, element.price, element._id);
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
