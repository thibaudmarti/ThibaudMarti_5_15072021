import { KanapOrderLine, ModelKanap, KanapCart } from "./object.js";
// import { KanapOrderLine } from "./object.js";

//-------------------------------------------------------
const json = localStorage.getItem("cart");
const arrayKanapInLocalStorage = JSON.parse(json);
// console.log(arrayKanapInLocalStorage);

// const inputQuantity = document.querySelectorAll(
//   "div.cart__item__content__settings__quantity input[name='itemQuantity']"
// );

// for (let kanap of arrayKanapInLocalStorage) {
//     console.log(kanap.itemDataId);
// }
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

// const getIdFromLocalStorage = (index) => {
//   const kanapId = arrayKanapInLocalStorage[index].itemDataId;
//   return kanapId;
// };
// const inputQuantity = document.querySelectorAll(
//   "div.cart__item__content__settings__quantity input[name='itemQuantity']"
// );
// console.log(inputQuantity);
// inputQuantity.addEventListener("click", () => {
//   e.itemDataQuantity += inputQuantity.value;
// });
// console.log(inputQuantity.value);

let displayKanap = async () => {
  arrayKanapInLocalStorage.forEach(async (e) => {
    const apiUrl = "http://localhost:3000/api/products/" + e.itemDataId;
    const kanapData = await getKanapDataItem(apiUrl);
    let modelKanap = new ModelKanap(kanapData);
    // console.log(modelKanap);
    let orderLine = new KanapOrderLine(
      modelKanap,
      e.itemDataColor,
      e.itemDataQuantity
    );

    orderLine.bindDataToCartPage();
    // orderLine.setUpQuantity(e);
  });
};

// const mainFunctionCartPage = async () => {
//   await displayKanap();
//   // console.log(inputQuantity);
// };

//   for (let i = 0; i < arrayKanapInLocalStorage.length; i++) {
//     const apiUrl =
//       "http://localhost:3000/api/products/" + getIdFromLocalStorage(i);
//     const kanapData = await getKanapDataItem(apiUrl);
//     let modelKanap = new ModelKanap(kanapData);
// let displayKanap = new KanapOrderLine(
//   modelKanap,
//   arrayKanapInLocalStorage[i].itemDataColor,
//   arrayKanapInLocalStorage[i].itemDataQuantity
// );
//     displayKanap.bindDataToCartPage();
//     console.log(displayKanap);
//   }

//   const totalQuantity = document.getElementById("totalQuantity");
//   let totalItemsQuantity = 0;
//   arrayKanapInLocalStorage.forEach((e) => {
//     totalItemsQuantity += parseInt(e.itemDataQuantity, 10);
//   });
//   totalQuantity.textContent = totalItemsQuantity;
// };

// mainFunctionCartPage();

//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------

/*NB!!: Penser au moment de la finalisation de la commande (commande validée) à vider le local storage avec localStorage.clear();*/

/**
 * Définition constante
 */
const itemsDataCart = JSON.parse(localStorage.getItem("cart"));
// console.log(itemsDataCart);
/**
 * création d'un item pour le cart.
 */
function itemCartInfo(item) {
  // Article contenant les données du produit commandé
  const itemArticle = document.createElement("article");
  itemArticle.classList.add("cart__item");
  itemArticle.setAttribute("data-id", item.itemDataId);
  itemArticle.setAttribute("data-color", item.itemDataColor);

  // Bloc affichant l'image du produit
  const itemImageDiv = document.createElement("div");
  itemImageDiv.classList.add("cart__item__img");
  const itemImage = document.createElement("img");
  itemImage.setAttribute("src", item.itemDataImage);
  itemImage.setAttribute("alt", item.itemDataImageAltTxt);
  itemImageDiv.appendChild(itemImage);

  // Div regroupant les infos du produit
  const itemInfoDiv = document.createElement("div");
  itemInfoDiv.classList.add("cart__item__content");

  // Div contenant le nom, la couleur et le prix du produit
  const itemDescriptionDiv = document.createElement("div");
  itemDescriptionDiv.classList.add("cart__item__content__description");
  const itemH2 = document.createElement("h2");
  itemH2.textContent = item.itemDataName;
  const itemColorParagraph = document.createElement("p");
  itemColorParagraph.textContent = item.itemDataColor;
  const itemPriceParagraph = document.createElement("p");
  itemPriceParagraph.textContent = item.itemDataPrice + " €";
  itemDescriptionDiv.appendChild(itemH2);
  itemDescriptionDiv.appendChild(itemColorParagraph);
  itemDescriptionDiv.appendChild(itemPriceParagraph);

  // Div regroupant la quantité et la suppression d'un produit
  const itemSettingsDiv = document.createElement("div");
  itemSettingsDiv.classList.add("cart__item__content__settings");

  // Div contenant la quantité modifiable du produit
  const itemQuantitySettingsDiv = document.createElement("div");
  itemQuantitySettingsDiv.classList.add(
    "cart__item__content__settings__quantity"
  );
  const itemQuantityParagraph = document.createElement("p");
  itemQuantityParagraph.textContent = "Qté : ";
  const itemQuantityInput = document.createElement("input");
  itemQuantityInput.setAttribute("type", "number");
  itemQuantityInput.classList.add("itemQuantity");
  itemQuantityInput.setAttribute("name", "itemQuantity");
  itemQuantityInput.setAttribute("min", "1");
  itemQuantityInput.setAttribute("max", "100");
  itemQuantityInput.setAttribute("value", item.itemDataQuantity);
  itemQuantitySettingsDiv.appendChild(itemQuantityParagraph);
  itemQuantitySettingsDiv.appendChild(itemQuantityInput);

  // Div contenant le bouton de suppression du produit
  const itemDeleteSettingsDiv = document.createElement("div");
  itemDeleteSettingsDiv.classList.add("cart__item__content__settings__delete");
  const itemDeleteButton = document.createElement("p");
  itemDeleteButton.classList.add("deleteItem");
  itemDeleteButton.textContent = "Supprimer";
  itemDeleteSettingsDiv.appendChild(itemDeleteButton);

  // Connexion parents/enfants des blocs principaux
  itemSettingsDiv.appendChild(itemQuantitySettingsDiv);
  itemSettingsDiv.appendChild(itemDeleteSettingsDiv);

  itemInfoDiv.appendChild(itemDescriptionDiv);
  itemInfoDiv.appendChild(itemSettingsDiv);

  itemArticle.appendChild(itemImageDiv);
  itemArticle.appendChild(itemInfoDiv);

  return itemArticle;
}

/**
 * Insertion des articles dans le panier
 */
function cartPagination(product) {
  const cartList = document.getElementById("cart__items");
  for (let i = 0; i < product.length; i++) {
    cartList.appendChild(itemCartInfo(product[i]));
  }
}

/**
 * Modification quantité article
 */
let allQuantityInput = document.getElementsByClassName("itemQuantity");

function changeQuantity() {
  for (let input of allQuantityInput) {
    let itemToModify = input.closest("article");

    input.addEventListener("change", function (e) {
      let itemTargetId = itemToModify.getAttribute("data-id");
      let itemTargetColor = itemToModify.getAttribute("data-color");
      let searchItem = itemsDataCart.find(
        (array) =>
          array.itemDataId == itemTargetId &&
          array.itemDataColor == itemTargetColor
      );
      Object.defineProperty(searchItem, "itemDataQuantity", {
        value: input.value,
      });
      localStorage.setItem("cart", JSON.stringify(itemsDataCart));

      if (input.value == 0) {
        itemToModify.remove();
        deleteItemInLocalStorage(itemToModify);
      }

      totalQuantity();
      calculTotalPrice(itemsDataCart);
    });
  }
}

/**
 * Suppression d'un article
 */
let allDeleteButton = document.getElementsByClassName("deleteItem");

function deleteItem() {
  for (let button of allDeleteButton) {
    let itemToDelete = button.closest("article");

    button.addEventListener("click", function (e) {
      deleteItemInLocalStorage(itemToDelete);
      itemToDelete.remove();
      totalQuantity();
      calculTotalPrice(itemsDataCart);
    });
  }
}

/**
 * Suppression d'un article dans le local storage
 */
function deleteItemInLocalStorage(targetItem) {
  let itemToDeleteId = targetItem.getAttribute("data-id");
  let itemToDeleteColor = targetItem.getAttribute("data-color");

  let searchItem = itemsDataCart.find(
    (array) =>
      array.itemDataId == itemToDeleteId &&
      array.itemDataColor == itemToDeleteColor
  );

  let targetItemIndex = itemsDataCart.indexOf(searchItem);

  let removedItem = itemsDataCart.splice(targetItemIndex, 1);

  localStorage.setItem("cart", JSON.stringify(itemsDataCart));
}

/**
 * Total quantité
 */
function totalQuantity() {
  const itemsTotalQuantity = document.querySelectorAll(".itemQuantity");
  let itemsSum = 0;
  for (let quantity of itemsTotalQuantity) {
    itemsSum = itemsSum + parseInt(quantity.value, 10);
  }
  const totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.textContent = itemsSum;
}

/**
 * Total prix
 */
function calculTotalPrice(items) {
  let itemsTotalPrice = 0;

  for (let item of items) {
    itemsTotalPrice =
      itemsTotalPrice +
      parseInt(item.itemDataQuantity, 10) * item.itemDataPrice;
  }
  const calculTotalPrice = document.getElementById("totalPrice");
  calculTotalPrice.textContent = itemsTotalPrice;
}

/**
 * Vérification des input
 */

let alphaRegex = /[a-zA-Z\-çñàéèêëïîôüù ]/g;
let alphaNumberRegex = /[0-9a-zA-Z\-çñàéèêëïîôüù ]/g;
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

function checkInput() {
  firstName.addEventListener("input", function (e) {
    if (alphaRegex.test(firstName.value) == false) {
      document.getElementById("firstNameErrorMsg").textContent =
        "Merci d'entrer un prénom valide, ex: James (lettres et - uniquement).";
      return false;
    } else {
      document.getElementById("firstNameErrorMsg").textContent = "";
      return true;
    }
  });
  lastName.addEventListener("input", function (e) {
    if (alphaRegex.test(lastName.value) == false) {
      document.getElementById("lastNameErrorMsg").textContent =
        "Merci d'entrer un nom valide, ex: Halliday (lettres et - uniquement).";
      return false;
    } else {
      document.getElementById("lastNameErrorMsg").textContent = "";
      return true;
    }
  });
  address.addEventListener("input", function (e) {
    if (alphaNumberRegex.test(address.value) == false) {
      document.getElementById("addressErrorMsg").textContent =
        "Merci d'entrer une adresse valide, ex: 4 Privet Drive (lettres, chiffres et - uniquement).";
      return false;
    } else {
      document.getElementById("addressErrorMsg").textContent = "";
      return true;
    }
  });
  city.addEventListener("input", function (e) {
    if (alphaRegex.test(city.value) == false) {
      document.getElementById("cityErrorMsg").textContent =
        "Merci d'entrer une ville valide, ex: Paimpont (lettres et - uniquement).";
      return false;
    } else {
      document.getElementById("cityErrorMsg").textContent = "";
      return true;
    }
  });
  email.addEventListener("input", function (e) {
    if (emailRegex.test(email.value) == false) {
      document.getElementById("emailErrorMsg").textContent =
        "Merci d'entrer un e-mail valide, ex: email@valide.com.";
      return false;
    } else {
      document.getElementById("emailErrorMsg").textContent = "";
      return true;
    }
  });
}

// const emptyCart = () => {
//   if (checkInput())
// }

/**
 * Récupération des données du formulaire de contact et création d'un objet
 */
const contact = {
  firstName: document.getElementById("firstName").textContent,
  lastName: document.getElementById("lastName").textContent,
  address: document.getElementById("address").textContent,
  city: document.getElementById("city").textContent,
  email: document.getElementById("email").textContent,
};

/**
 * Fonction principale
 */

const main = async () => {
  cartPagination(itemsDataCart);

  totalQuantity();

  calculTotalPrice(itemsDataCart);

  changeQuantity();

  deleteItem();

  checkInput();
};

// main();

const mainFunctionCartPage = async () => {
  const itemsDataCart = JSON.parse(localStorage.getItem("cart"));
  let kanaps = new KanapCart(itemsDataCart);
  // console.log(kanaps.kanapsInCart);
  cartPagination(kanaps.kanapsInCart);

  totalQuantity();

  calculTotalPrice(kanaps.kanapsInCart);

  changeQuantity();

  deleteItem();

  checkInput();

  // emptyCart();
};

mainFunctionCartPage();
