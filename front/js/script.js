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

const items = document.getElementById("items");
let itemIndex = 0;

  fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => {
      console.log(data.length);
    const itemNumber = data[itemIndex];

    const createElement = () => {
        items.innerHTML = `
      <a href="./product.html?id=${itemNumber._id}">
        <article>
            <img src="${itemNumber.imageUrl}" alt="${itemNumber.altTxt}">
            <h3 class="productName">${itemNumber.name}</h3>
            <p class="productDescription">${itemNumber.description}</p>
        </article>
      </a>`;
    }

    const allItem = () => {
        // if (itemIndex >= data.length) {

        // if (itemIndex < data.length) {
        //     createElement();
        //     itemIndex++;
        //     allItem();
        // }
        for (itemIndex = 0; itemIndex < data.length; itemIndex++) {
            // console.log(itemIndex);
            // console.log(data[i].technos[0]);
            // document.body.innerHTML += `<h2> ${data[i].pseudo} </h2>`;
            createElement();
        };
    };

    allItem();

    //   items.innerHTML = `
    //   <a href="./product.html?id=${itemNumber._id}">
    //     <article>
    //         <img src="${itemNumber.imageUrl}" alt="${itemNumber.altTxt}">
    //         <h3 class="productName">${itemNumber.name}</h3>
    //         <p class="productDescription">${itemNumber.description}</p>
    //     </article>
    //   </a>`;

      console.log(items);
  });

