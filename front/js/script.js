const urlAllKanaps = "http://localhost:3000/api/products";
// import { variableTest } from "./object.js";
// alert(variableTest);

import { ModelKanap } from "./object.js";

/*
 * Request an url and return data as json
 *
 */
async function getJsonFromApi(url) {
  let jsonKanaps = await fetch(url).then((res) => res.json());
  return jsonKanaps;
}

/*
 * Convert a kanaps json array into html representation
 */
// async function getHtmlKanaps(jsonKanaps) {
//   htmlKanaps = "";

//   // jsonKanaps.forEach((kanap) => {
//     htmlKanaps += `<a href="./product.html?id=${._id}">
//         <article>
//           <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
//           <h3 class="productName">${kanap.name}</h3>
//           <p class="productDescription">${kanap.description}</p>
//         </article>
//       </a>`;
//   });

//   return htmlKanaps;
// }

// function getHtmlKanaps(modelKanap) {
//   //kanap._id => modelKanap._id

//   htmlKanaps += `<a href="./product.html?id=${modelKanap._id}">
//   <article>
//     <img src="${modelKanap.imageUrl}" alt="${modelKanap.altTxt}">
//     <h3 class="productName">${modelKanap.name}</h3>
//     <p class="productDescription">${modelKanap.description}</p>
//   </article>
// </a>`;

//   return htmlKanaps;
// }

function insertHtmlInPage(htmlToInsert, idParent) {
  document.getElementById(idParent).innerHTML = htmlToInsert;
}

// modelKanap => modelKanap.consoleLog();

// function callConsoleLog(modelKanap) {
//   modelKanap.consoleLog();
// }

async function DisplayKanaps() {
  getJsonFromApi(urlAllKanaps)
    .then((jsonKanaps) =>
      jsonKanaps.map((jsonKanap) => new ModelKanap(jsonKanap))
    )
    .then((arrayKanaps) =>
      arrayKanaps.map((modelKanap) => modelKanap.getHtmlKanaps())
    )
    .then((arrayHtmlKanaps) =>
      insertHtmlInPage(arrayHtmlKanaps.join(""), "items")
    );
  // .then((jsonKanaps) => {
  //   return getHtmlKanaps(jsonKanaps);
  // })
  // .then((htmlKanaps) => {
  //   insertHtmlInPage(htmlKanaps, "items");
  // });
}

DisplayKanaps();
