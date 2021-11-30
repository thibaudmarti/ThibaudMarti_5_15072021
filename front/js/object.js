//  Objet Kanap

export class ModelKanap {
  constructor(json) {
    this.name = json.name;
    this.id = json._id;
    this.price = json.price;
    this.altTxt = json.altTxt;
    this.desc = json.description;
    this.img = json.imageUrl;
    this.colors = json.colors;
  }

  /**
   * Add items data in index page
   */
  getHtmlKanaps() {
    let htmlKanaps = "";
    htmlKanaps += `<a href="./product.html?id=${this.id}">
        <article>
        <img src="${this.img}" alt="${this.altTxt}">
        <h3 class="productName">${this.name}</h3>
        <p class="productDescription">${this.desc}</p>
        </article>
        </a>`;
    return htmlKanaps;
  }

  /**
   * Add item data in page product
   */
  bindDataToProductPage() {
    const pageTitle = document.querySelector("title");
    pageTitle.textContent = `${this.name}`;

    const itemImage = document.createElement("img");
    document.querySelector(".item__img").appendChild(itemImage);
    itemImage.setAttribute("src", `${this.img}`);
    itemImage.setAttribute("alt", `${this.altTxt}`);

    const itemName = document.getElementById("title");
    itemName.textContent = `${this.name}`;

    const itemPrice = document.getElementById("price");
    itemPrice.textContent = `${this.price}`;

    const itemDescription = document.getElementById("description");
    itemDescription.textContent = `${this.desc}`;

    const itemColors = document.getElementById("colors");
    const itemColorsTable = `${this.colors}`;
    const itemColorsWords = itemColorsTable.split(",");
    for (let i = 0; i <= itemColorsWords.length - 1; i++) {
      const itemColor = document.createElement("option");
      itemColor.setAttribute("value", itemColorsWords[i]);
      itemColor.textContent = itemColorsWords[i];
      itemColors.appendChild(itemColor);
    }
  }
  //-------------------------------
  // bindDataToCartPage() {
  //   const section = document.getElementById("cart__items");
  //   const article = document.createElement("article");
  //   const articleContainer = section.appendChild(article);
  //   articleContainer.classList.add("cart__item");
  //   const div = document.createElement("div");
  //   const itemImage = document.createElement("img");
  //   article.appendChild(div);
  //   div.classList.add("cart__item__img");
  //   div.appendChild(itemImage);
  //   itemImage.setAttribute("src", `${this.img}`);
  //   itemImage.setAttribute("alt", `${this.altTxt}`);
  //   article.innerHTML += `<div class="cart__item__content">
  //   <div class="cart__item__content__titlePrice">
  //     <h2>${this.name}</h2>
  //     <p>${this.price}€</p>
  //   </div>
  //   <div class="cart__item__content__settings">
  //     <div class="cart__item__content__settings__quantity">
  //       <p>Qté : </p>
  //       <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
  //     </div>
  //     <div class="cart__item__content__settings__color">
  //       <p>Couleur : </p>
  //     </div>
  //     <div class="cart__item__content__settings__delete">
  //       <p class="deleteItem">Supprimer</p>
  //     </div>
  //   </div>
  // </div>`;
  // }
  //---------------------

  //   bindDataToCartPage() {
  //     const json = localStorage.getItem("cart");
  //     const arrayInLocalStorage = JSON.parse(json);
  //     document.getElementById("cart__items").innerHTML = arrayInLocalStorage
  //       .map(
  //         (item) => `
  //     <article class="cart__item" data-id="${item.itemDataId}">
  //     <div class="cart__item__img">
  //       <img src="${this.img}" alt="Photographie d'un canapé">
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
  //         <div class="cart__item__content__settings__delete">
  //           <p class="deleteItem">Supprimer</p>
  //         </div>
  //       </div>
  //     </div>
  //   </article>
  // `
  //       )
  //       .join("");
  //   }
}

export class KanapOrderLine {
  constructor(model, colorIndex, quantity) {
    this.model = model;
    this.color = colorIndex;
    this.quantity = quantity;
  }

  /**
   * Check if item already exist in local storage
   * and then export product in local storage for cart
   */
  exportToLocalStorage() {
    /*
     * Check if item exist in local storage
     */
    function checkItemsDataStorage(
      item,
      array,
      itemId,
      itemColor,
      itemQuantity
    ) {
      for (item of array) {
        if (item.itemDataId == itemId && item.itemDataColor == itemColor) {
          item.itemDataQuantity =
            parseInt(item.itemDataQuantity, 10) + parseInt(itemQuantity, 10);
          if (item.itemDataQuantity > 100) {
            item.itemDataQuantity = 100;
            alert(
              "Attention, votre quantité pour cet article dépasse le maximum. Elle passe donc à 100 unités."
            );
          }
          return true;
        }
      }
    }

    /**
     * Add product in local storage for cart
     *
     */
    const params = new URL(window.location.href);
    const itemId = params.searchParams.get("id");
    let itemsDataForStorage = [];
    const itemDataObject = {
      itemDataId: itemId,
      itemDataQuantity: this.quantity,
      itemDataColor: this.color,
      itemDataImage: this.model.img,
      itemDataImageAltTxt: this.model.altTxt,
      itemDataName: this.model.name,
      itemDataPrice: this.model.price,
    };

    if (localStorage.getItem("cart")) {
      itemsDataForStorage = JSON.parse(localStorage.getItem("cart"));
      if (
        checkItemsDataStorage(
          this.model,
          itemsDataForStorage,
          itemDataObject.itemDataId,
          itemDataObject.itemDataColor,
          itemDataObject.itemDataQuantity
        )
      ) {
        localStorage.setItem("cart", JSON.stringify(itemsDataForStorage));
      } else {
        itemsDataForStorage.push(itemDataObject);
        localStorage.setItem("cart", JSON.stringify(itemsDataForStorage));
      }
    } else {
      itemsDataForStorage.push(itemDataObject);
      localStorage.setItem("cart", JSON.stringify(itemsDataForStorage));
    }
  }

  bindDataToCartPage() {
    const section = document.getElementById("cart__items");
    const article = document.createElement("article");
    const articleContainer = section.appendChild(article);
    articleContainer.classList.add("cart__item");
    const div = document.createElement("div");
    const itemImage = document.createElement("img");
    article.appendChild(div);
    div.classList.add("cart__item__img");
    div.appendChild(itemImage);
    itemImage.setAttribute("src", `${this.model.img}`);
    itemImage.setAttribute("alt", `${this.model.altTxt}`);
    article.innerHTML += `<div class="cart__item__content">
    <div class="cart__item__content__titlePrice">
      <h2>${this.model.name}</h2>
      <p>${this.model.price * this.quantity}€</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
          this.quantity
        }">
      </div>
      <div class="cart__item__content__settings__color">
        <p>Couleur : ${this.color}</p>
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>`;
  }

  // setUpQuantity(e) {
  //   const inputQuantity = document.querySelectorAll(
  //     "div.cart__item__content__settings__quantity input[name='itemQuantity']"
  //   );
  //   console.log(inputQuantity);
  //   for (i = 0; i < inputQuantity.length; i++) {
  //     e.itemDataQuantity = inputQuantity[i].value;
  //     console.log(e.itemDataQuantity);
  //   }
  // }
}

export class KanapCart {
  constructor(kanapOrderLineInLocalStorage) {
    this.kanapsInCart = kanapOrderLineInLocalStorage;
  }

  // itemCartInfo() {
  //   // Article contenant les données du produit commandé
  //   const itemArticle = document.createElement("article");
  //   itemArticle.classList.add("cart__item");
  //   itemArticle.setAttribute("data-id", this.kanapsInCart[i].itemDataId);
  //   itemArticle.setAttribute("data-color", this.kanapsInCart[i].itemDataColor);

  //   // Bloc affichant l'image du produit
  //   const itemImageDiv = document.createElement("div");
  //   itemImageDiv.classList.add("cart__item__img");
  //   const itemImage = document.createElement("img");
  //   itemImage.setAttribute("src", this.kanapsInCart[i].itemDataImage);
  //   itemImage.setAttribute("alt", this.kanapsInCart[i].itemDataImageAltTxt);
  //   itemImageDiv.appendChild(itemImage);

  //   // Div regroupant les infos du produit
  //   const itemInfoDiv = document.createElement("div");
  //   itemInfoDiv.classList.add("cart__item__content");

  //   // Div contenant le nom, la couleur et le prix du produit
  //   const itemDescriptionDiv = document.createElement("div");
  //   itemDescriptionDiv.classList.add("cart__item__content__description");
  //   const itemH2 = document.createElement("h2");
  //   itemH2.textContent = this.kanapsInCart[i].itemDataName;
  //   const itemColorParagraph = document.createElement("p");
  //   itemColorParagraph.textContent = this.kanapsInCart[i].itemDataColor;
  //   const itemPriceParagraph = document.createElement("p");
  //   itemPriceParagraph.textContent = this.kanapsInCart[i].itemDataPrice + " €";
  //   itemDescriptionDiv.appendChild(itemH2);
  //   itemDescriptionDiv.appendChild(itemColorParagraph);
  //   itemDescriptionDiv.appendChild(itemPriceParagraph);

  //   // Div regroupant la quantité et la suppression d'un produit
  //   const itemSettingsDiv = document.createElement("div");
  //   itemSettingsDiv.classList.add("cart__item__content__settings");

  //   // Div contenant la quantité modifiable du produit
  //   const itemQuantitySettingsDiv = document.createElement("div");
  //   itemQuantitySettingsDiv.classList.add(
  //     "cart__item__content__settings__quantity"
  //   );
  //   const itemQuantityParagraph = document.createElement("p");
  //   itemQuantityParagraph.textContent = "Qté : ";
  //   const itemQuantityInput = document.createElement("input");
  //   itemQuantityInput.setAttribute("type", "number");
  //   itemQuantityInput.classList.add("itemQuantity");
  //   itemQuantityInput.setAttribute("name", "itemQuantity");
  //   itemQuantityInput.setAttribute("min", "1");
  //   itemQuantityInput.setAttribute("max", "100");
  //   itemQuantityInput.setAttribute(
  //     "value",
  //     this.kanapsInCart[i].itemDataQuantity
  //   );
  //   itemQuantitySettingsDiv.appendChild(itemQuantityParagraph);
  //   itemQuantitySettingsDiv.appendChild(itemQuantityInput);

  //   // Div contenant le bouton de suppression du produit
  //   const itemDeleteSettingsDiv = document.createElement("div");
  //   itemDeleteSettingsDiv.classList.add(
  //     "cart__item__content__settings__delete"
  //   );
  //   const itemDeleteButton = document.createElement("p");
  //   itemDeleteButton.classList.add("deleteItem");
  //   itemDeleteButton.textContent = "Supprimer";
  //   itemDeleteSettingsDiv.appendChild(itemDeleteButton);

  //   // Connexion parents/enfants des blocs principaux
  //   itemSettingsDiv.appendChild(itemQuantitySettingsDiv);
  //   itemSettingsDiv.appendChild(itemDeleteSettingsDiv);

  //   itemInfoDiv.appendChild(itemDescriptionDiv);
  //   itemInfoDiv.appendChild(itemSettingsDiv);

  //   itemArticle.appendChild(itemImageDiv);
  //   itemArticle.appendChild(itemInfoDiv);

  //   return itemArticle;
  // }

  // /**
  //  * Insertion des articles dans le panier
  //  */
  // cartPagination() {
  //   const cartList = document.getElementById("cart__items");
  //   for (let i = 0; i <= this.kanapsInCart.length - 1; i++) {
  //     cartList.appendChild(itemCartInfo(this.kanapsInCart[i]));
  //   }
  // }
}
