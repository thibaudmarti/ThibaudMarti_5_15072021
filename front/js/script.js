
const urlAllKanaps = "http://localhost:3000/api/products";

// const kanapNumber = 0;

// const kanap = {
//   name: data[kanapNumber].name,
//   id: data[kanapNumber]._id,
//   imageUrl: data[kanapNumber].imageUrl,
//   altTxt: data[kanapNumber].altTxt,
//   description: data[kanapNumber].description,
//   price: data[kanapNumber].price,
//   colors: data[kanapNumber].colors,
// };

//--------------------------------------------------------------------------------------

// let kanaps;

// /*
// */
// const fetchKanaps = async () => {
//   kanaps = await fetch(urlAllKanaps)
//     .then((res) => res.json());
// };

// const showKanaps = async () => {
//   await fetchKanaps();

//   items.innerHTML = kanaps
//     .map(
//       (kanap) =>
//         `<a href="./product.html?id=${kanap._id}">
//            <article>
//             <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
//             <h3 class="productName">${kanap.name}</h3>
//             <p class="productDescription">${kanap.description}</p>
//            </article>
//          </a>`
//     )
//     .join("");
// };


// showKanaps();


//---------------------------------------------------------------------------
// const items = document.getElementById("items");
// let itemIndex = 0;

//   fetch("http://localhost:3000/api/products")
//   .then((res) => res.json())
//   .then((data) => {
//       console.log(data);
//     const itemNumber = data[itemIndex];
//     const createElement = () => {
//         items.innerHTML += `
//       <a href="./product.html?id=${itemNumber._id}">
//         <article>
//             <img src="${itemNumber.imageUrl}" alt="${itemNumber.altTxt}">
//             <h3 class="productName">${itemNumber.name}</h3>
//             <p class="productDescription">${itemNumber.description}</p>
//         </article>
//       </a>`;

//     }
//     itemIndex++;
//     // console.log(itemIndex);
//     createElement();

//     const allItem = () => {
//       // if (itemIndex >= data.length) {

//         // if (itemIndex < data.length) {
//         //     createElement();
//         //     itemIndex++;
//         //     allItem();
//         // }
//         for (itemIndex = 0; itemIndex < data.length; itemIndex++) {
//             // console.log(itemIndex);
//             // console.log(data[i].technos[0]);
//             // document.body.innerHTML += `<h2> ${data[i].pseudo} </h2>`;
//             createElement();
//         };
//     };

//     allItem();
//     // createElement();

//     //   items.innerHTML = `
//     //   <a href="./product.html?id=${itemNumber._id}">
//     //     <article>
//     //         <img src="${itemNumber.imageUrl}" alt="${itemNumber.altTxt}">
//     //         <h3 class="productName">${itemNumber.name}</h3>
//     //         <p class="productDescription">${itemNumber.description}</p>
//     //     </article>
//     //   </a>`;

//     console.log(items);
//   });

//----------------------------------------------------------------------------------------


/*
 * Request an url and return data as json
 *
 */
async function getJsonFromApi(url) {
  let jsonKanaps = await fetch(url)
    .then((res) => res.json());
    return jsonKanaps; 
    
};

/*
 * Convert a kanaps json array into html representation
 */
async function getHtmlKanaps(jsonKanaps) {
  htmlKanaps = "";

  jsonKanaps.forEach((kanap) => {
    htmlKanaps += `<a href="./product.html?id=${kanap._id}">
        <article>
          <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
          <h3 class="productName">${kanap.name}</h3>
          <p class="productDescription">${kanap.description}</p>
        </article>
      </a>`;
  });

  return htmlKanaps;
}

async function insertHtmlInPage(htmlToInsert, idParent) {
  document.getElementById(idParent).innerHTML = htmlToInsert;
}


async function DisplayKanaps() {
  getJsonFromApi(urlAllKanaps).then((jsonKanaps) => {
    return getHtmlKanaps(jsonKanaps);
  }).then((htmlKanaps) => {
    insertHtmlInPage(htmlKanaps, 'items');
  })
};


DisplayKanaps();
