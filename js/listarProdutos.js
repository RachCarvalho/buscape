const divRoot = document.querySelector('div#root');

const mainContainer = document.createElement('div');
mainContainer.setAttribute('id', "mainContainer");
const cart = document.getElementById('cart');


// const qtd = document.createElement('input')


fetch('https://raw.githubusercontent.com/buscape-company/exercicios/master/frontend/resources/data.json')
  .then(res => res.json())
  .then(res => {
    const arrayProducts = res;
    const arrayModified = arrayProducts.items;
    console.log(arrayModified);

    arrayModified.forEach(productReduced => {
      const allProducts = productReduced.product;

      const divProduct = document.createElement('div');
      const productName = document.createElement('h2');
      const productImage = document.createElement('img');
      const divPrice = document.createElement('div');
      const price = document.createElement('h4');
      const installments = document.createElement('p');
      const installmentValue = document.createElement('p');
      const buyBtn = document.createElement('button')

      buyBtn.setAttribute('class', "buyBtn");
      buyBtn.setAttribute('id', allProducts.id);

      divProduct.setAttribute('id', "card");

      divPrice.setAttribute('id', "price");

      productName.innerText = allProducts.name;

      productImage.setAttribute('src', allProducts.images[0]);
      productImage.setAttribute('alt', allProducts.name);
      productImage.addEventListener('error', (event) => {
        event.target.setAttribute('src', 'https://source.unsplash.com/random');
      });

      const priceConfig = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(allProducts.price.value);
      const installmentsChanged = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(allProducts.price.installmentValue);
      price.innerText = `Valor: ${priceConfig}`;
      installments.innerText = `Parecele em ${allProducts.price.installments}x no cartão de crédito`;
      installmentValue.innerText = `Valor da parcela: ${installmentsChanged}`;
      buyBtn.innerText = 'Comprar';

      // const prodtCart = document.getElementById("input")
      // const btnSavePeople = document.querySelector("button")
      // const result = document.querySelector("#result ol")
      buyBtn.addEventListener('click', () => {
        let prodtCart = new Array()
        
        if (localStorage.hasOwnProperty("prodtCart")) {
          prodtCart = JSON.parse(localStorage.getItem("prodtCart"))
        }

        prodtCart.push({ name: allProducts.name, price: priceConfig, qty: 1 })

        localStorage.setItem("prodtCart", JSON.stringify(prodtCart))

        Object.keys(localStorage).forEach(function (value) {
          console.log(localStorage.getItem(value));
          const cartPrdctArray = (localStorage.getItem(value));
          console.log(cartPrdctArray);

            const cartArray1 = cartPrdctArray.replaceAll('[{"', '');
            console.log(cartArray1);
            console.log(typeof cartArray1);
            const cartArray2 = cartArray1.replaceAll('":', ': ');
            console.log(cartArray2);
            console.log(typeof cartArray2);
            const cartArray3 = cartArray2.replaceAll(',"', ', ');
            console.log(cartArray3);
            console.log(typeof cartArray3);
            const cartArray4 = cartArray3.replaceAll('}]', '');
            console.log(cartArray4);
            console.log(typeof cartArray4);


            const cartArray = cartArray4.split(/\s*,\s*/);
            console.log(cartArray);
            console.log(typeof cartArray);

          

          // const cartArray1 = cartPrdctArray.flatMap(cartPrdctArray(  
          //   cartPrdctArray.split("{}")));
          // console.log(cartArray1);
          // var ra = /\s*;\s*/;
          // const cartArray = cartArray1.split(re);
          // console.log(cartArray);
          // const cartArray = new Map ();
          // cartArray.push({cartPrdctArray});
          // console.log(cartArray);
          // Array.from(cartPrdctArray);
          // cartArray.push(cartPrdctArray)
          // const finalcart = 


          const cartItem = document.createElement('div');
          const productCart = document.createElement('div');
          const priceCart = document.createElement('div');
          const productCartName = document.createElement('span');
          const priceCartValue = document.createElement('span');
          const cartdivider = document.createElement('hr');

          cartItem.setAttribute = ('class', "cartItem")
          productCartName.setAttribute = ('class', "spanCartText")
          priceCartValue.setAttribute = ('class', "spanCartText")

          productCartName.innerHTML = `${(localStorage.getItem(value))}`;
          priceCartValue.innerHTML = `${(localStorage.getItem(value))}`;

          productCart.innerHTML = `${'Produto: ' + productCartName}`;
          priceCart.innerHTML = `${'Preço: ' + priceCartValue + cartdivider}`;

          cart.appendChild(cartItem);
          cartItem.appendChild(productCart);
          cartItem.appendChild(priceCart);
        });

        document.getElementById("cartbar").style.display = "block";

        alert("Produto adicionado ao carrinho!");
      });

      console.log(allProducts, buyBtn);

      divPrice.appendChild(price);
      divPrice.appendChild(installments);
      divPrice.appendChild(installmentValue);

      divProduct.appendChild(productName);
      divProduct.appendChild(productImage);
      divProduct.appendChild(divPrice);
      divProduct.appendChild(buyBtn);

      mainContainer.appendChild(divProduct);



    });

    divRoot.appendChild(mainContainer);


  });