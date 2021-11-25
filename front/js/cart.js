import { ModelKanap } from "./object.js";
// import { KanapOrderLine } from "./object.js";

//-------------------------------------------------------
const json = localStorage.getItem("cart");
const arrayKanapInLocalStorage = JSON.parse(json);
console.log(arrayKanapInLocalStorage);
for (let kanap of arrayKanapInLocalStorage) {
  //   console.log(kanap.itemDataId);
}
// const arraySliceForId = arrayInLocalStorage.slice(2);
// console.log(arraySliceForId);

// function to get Url from an id in array cart
// const getUrlFromId = (itemIndex) => {
//   const id = arrayInLocalStorage[itemIndex].itemDataId;
//   const apiUrlForCartItem = "http://localhost:3000/api/products/" + id;
//   return apiUrlForCartItem;
// };

// document.getElementById("cart__items").innerHTML = arrayInLocalStorage
//   .map(
//     (item) => `
//     <article class="cart__item" data-id="${item.itemDataId}">
//     <div class="cart__item__img">
//       <img src="" alt="Photographie d'un canapé">
//     </div>
//     <div class="cart__item__content">
//       <div class="cart__item__content__titlePrice">
//         <h2>Nom du produit</h2>
//         <p>42,00 €</p>
//       </div>
//       <div class="cart__item__content__settings">
//         <div class="cart__item__content__settings__quantity">
//           <p>Qté : ${item.itemDataQuantity}</p>
//           <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
//         </div>
//         <div class="cart__item__content__settings__color">
//             <p>Couleur : ${item.itemDataColor}</p>
//         </div>
//         <div class="cart__item__content__settings__delete">
//           <p class="deleteItem">Supprimer</p>
//         </div>
//       </div>
//     </div>
//   </article>
// `
//   )
//   .join("");

// bindDataToCartPage();
// console.log(getUrlFromId(1));
// arrayInLocalStorage.forEach((item) => console.log(getUrlFromId(item)));

// const objId1 = obj[0].itemDataId;
// console.log(objId1);

// GET URL FROM ID
// const getUrlFromId = () => {};

const getKanapDataItem = (url) =>
  fetch(url)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(function (err) {
      console.log(err);
      console.log(
        "Une erreur est survenue lors de l'appel des données à l'API"
      );
    });
const getIdFromLocalStorage = (index) => {
  const kanapId = arrayKanapInLocalStorage[index].itemDataId;
  return kanapId;
};

const mainFunctionCartPage = async () => {
  for (let i = 0; i < arrayKanapInLocalStorage.length; i++) {
    const apiUrl =
      "http://localhost:3000/api/products/" + getIdFromLocalStorage(i);
    const kanapData = await getKanapDataItem(apiUrl);
    let modelKanap = new ModelKanap(kanapData);
    modelKanap.bindDataToCartPage();
  }
};

mainFunctionCartPage();
