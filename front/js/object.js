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

  getHtmlKanaps() {
    let htmlKanaps = "";
    htmlKanaps += `<a href="./product.html?id=${this.id}">
        <article>
        <img src="${this.img}" alt="${this.altTxt}">
        <h3 class="productName">${this.name}</h3>
        <p class="productDescription">${this.desc}</p>
        </article>
        </a>`;
    // console.log(htmlKanaps);
    return htmlKanaps;
  }
}
