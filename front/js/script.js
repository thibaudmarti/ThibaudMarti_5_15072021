// fetch("http://localhost:3000/api/products")
//     .then((res) => {
//         console.log(res);
//     if (res.ok) {
//       return res.json();
//     }
//   })
//   .then((value) => {
//     console.log(value);
//   })
//   .catch((err) => {
//     // Une erreur est survenue
//   });

const urlAllKanaps = "http://localhost:3000/api/products";
const kanapNumber = 0;

const kanap = {
  name : arrayKanaps[kanapNumber].name
};

fetch(urlAllKanaps)
.then((res) => res.json())
.then((data) => {
  // console.log(data);
  const arrayKanaps = data;
  console.log(arrayKanaps);
});

    

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
function getJsonFromApi (url) {
  fetch(url)
  .then((res) => {
    //if (res.status == 200)
    res.json();
  })
  .then((data) => {
    return data;
  }).catch ();
};



/*
* Convert a kanaps json array into html representation
*/
function getHtmlKanaps (jsonKanaps) {
    htmlKanaps = "";

    jsonKanaps.array.forEach((kanap) => {
      htmlKanaps += 
      `<a href="./product.html?id=${kanap._id}">
        <article>
          <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
          <h3 class="productName">${kanap.name}</h3>
          <p class="productDescription">${kanap.description}</p>
        </article>
      </a>`
    });

    return htmlKanaps;
  
}

function insertHtmlInPage (htmlToInsert, idParent) {

}

  function DisplayKanaps () {
    let jsonKanaps = getJsonFromApi(urlAllKanaps);//.then
    let htmlKanaps = getHtmlKanaps(); //.then-
    insertHtmlInPage();

  }
