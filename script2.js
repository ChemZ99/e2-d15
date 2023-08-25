const nameinput = document.getElementById("nameinput");
const descinput = document.getElementById("descinput");
const brandinput = document.getElementById("brandinput");
const imginput = document.getElementById("imginput");
const priceinput = document.getElementById("priceinput");

const postnewgame = async event => {
  event.preventDefault();
  try {
    await fetch("https://striveschool-api.herokuapp.com/api/product/", {
      method: "POST",
      body: JSON.stringify({
        name: nameinput.value,
        description: descinput.value,
        brand: brandinput.value,
        imageUrl: imginput.value,
        price: priceinput.value,
      }),
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4Njc3ZDEwYmNhMDAwMTQ1ODNmZTIiLCJpYXQiOjE2OTI5NTI0NDUsImV4cCI6MTY5NDE2MjA0NX0.ZV4YbUxty2vnx9jFkUmon4mlImMTNzrfNVxtYoPuLH0",
        "content-type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const resetform = function () {
  nameinput.value = "";
  descinput.value = "";
  brandinput.value = "";
  imginput.value = "";
  priceinput.value = "";
};
