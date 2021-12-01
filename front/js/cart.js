import { KanapCart } from "./object.js";

/**
 * Const
 */
const itemsDataCart = JSON.parse(localStorage.getItem("cart"));
/**
 * Create item for cart
 */
function itemCartInfo(item) {
  // Article
  const itemArticle = document.createElement("article");
  itemArticle.classList.add("cart__item");
  itemArticle.setAttribute("data-id", item.itemDataId);
  itemArticle.setAttribute("data-color", item.itemDataColor);

  // Image
  const itemImageDiv = document.createElement("div");
  itemImageDiv.classList.add("cart__item__img");
  const itemImage = document.createElement("img");
  itemImage.setAttribute("src", item.itemDataImage);
  itemImage.setAttribute("alt", item.itemDataImageAltTxt);
  itemImageDiv.appendChild(itemImage);

  // Div
  const itemInfoDiv = document.createElement("div");
  itemInfoDiv.classList.add("cart__item__content");

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

  const itemSettingsDiv = document.createElement("div");
  itemSettingsDiv.classList.add("cart__item__content__settings");

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

  const itemDeleteSettingsDiv = document.createElement("div");
  itemDeleteSettingsDiv.classList.add("cart__item__content__settings__delete");
  const itemDeleteButton = document.createElement("p");
  itemDeleteButton.classList.add("deleteItem");
  itemDeleteButton.textContent = "Supprimer";
  itemDeleteSettingsDiv.appendChild(itemDeleteButton);

  itemSettingsDiv.appendChild(itemQuantitySettingsDiv);
  itemSettingsDiv.appendChild(itemDeleteSettingsDiv);

  itemInfoDiv.appendChild(itemDescriptionDiv);
  itemInfoDiv.appendChild(itemSettingsDiv);

  itemArticle.appendChild(itemImageDiv);
  itemArticle.appendChild(itemInfoDiv);

  return itemArticle;
}

/**
 * Display kanaps in cart page
 */
function cartPagination(product) {
  const cartList = document.getElementById("cart__items");
  for (let i = 0; i < product.length; i++) {
    cartList.appendChild(itemCartInfo(product[i]));
  }
}

/**
 * Quantity modifier
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
 * Remove item
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
 * Remove item in local storage
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
 * Total quantity
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
 * Total price
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
 * Regex for form
 * Add function empty cart
 */

let alphaRegex = /[a-zA-Z\-çñàéèêëïîôüù ]/g;
let alphaNumberRegex = /[0-9a-zA-Z\-çñàéèêëïîôüù ]/g;
// let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
let emailRegex = /^[\w_.-]+@[\w-]+\.[a-z]{2,8}$/i;
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
 * Form data object
 */
const contact = {
  firstName: document.getElementById("firstName").textContent,
  lastName: document.getElementById("lastName").textContent,
  address: document.getElementById("address").textContent,
  city: document.getElementById("city").textContent,
  email: document.getElementById("email").textContent,
};

/**
 * Main function
 */

const mainFunctionCartPage = async () => {
  let kanaps = new KanapCart(itemsDataCart);

  cartPagination(kanaps.kanapsInCart);

  totalQuantity();

  calculTotalPrice(kanaps.kanapsInCart);

  changeQuantity();

  deleteItem();

  checkInput();
};

mainFunctionCartPage();
