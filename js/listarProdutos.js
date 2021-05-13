const divRaiz = document.querySelector('div#root');

const containerPai = document.createElement('div');
containerPai.setAttribute('id', "containerpai");

// const qtd = document.createElement('input')


fetch('https://raw.githubusercontent.com/buscape-company/exercicios/master/frontend/resources/data.json')
  .then(res => res.json())
  .then(res => {
    const arrayProdutos = res;
    const arrayConvertido = arrayProdutos.items;
    console.log(arrayConvertido);

    arrayConvertido.forEach(produtoRaiz => {
      const produto = produtoRaiz.product;
      const idProduto = produtoRaiz.id;

      const divProduto = document.createElement('div');
      const nomeProduto = document.createElement('h2');
      const imagemProduto = document.createElement('img');
      const divPreco = document.createElement('div');
      const preco = document.createElement('h4');
      const parcelas = document.createElement('p');
      const valorPorParcela = document.createElement('p');
      const btnCart = document.createElement('button')

      btnCart.setAttribute('id', "btnCart");

      divProduto.setAttribute('id', "card");

      divPreco.setAttribute('id', "preco");

      nomeProduto.innerText = produto.name;

      imagemProduto.setAttribute('src', produto.images[0]);
      imagemProduto.setAttribute('alt', produto.name);
      imagemProduto.addEventListener('error', (event) => {
        event.target.setAttribute('src', 'https://source.unsplash.com/random');
      });

      const precoFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.price.value);
      const parcelaFormatada = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.price.installmentValue);
      preco.innerText = `Valor: ${precoFormatado}`;
      parcelas.innerText = `Parecele em ${produto.price.installments}x no cartão de crédito`;
      valorPorParcela.innerText = `Valor da parcela: ${parcelaFormatada}`;
      btnCart.innerText = 'Comprar';

      btnCart.addEventListener('click', (event) => {
        localStorage.setItem('produto', produto.name);
        localStorage.setItem('preco', precoFormatado);
        localStorage.setItem('imagem', imagemProduto);
        alert("Produto adicionado ao carrinho!");
      });


      divPreco.appendChild(preco);
      divPreco.appendChild(parcelas);
      divPreco.appendChild(valorPorParcela);

      divProduto.appendChild(nomeProduto);
      divProduto.appendChild(imagemProduto);
      divProduto.appendChild(divPreco);
      divProduto.appendChild(btnCart);

      containerPai.appendChild(divProduto);

      document.getElementById("item").innerHTML += localStorage.getItem('produto');
      document.getElementById("price").innerHTML += localStorage.getItem('preco');
      document.getElementById("imgProdt").innerHTML += localStorage.getItem('imagem');
    });

    divRaiz.appendChild(containerPai);


  });