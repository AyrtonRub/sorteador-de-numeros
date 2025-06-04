(function () {
  const btnDrawAgain = document.getElementById("drawAgain");
  const btnDraw = document.getElementById("draw");
  const isEnabled = document.getElementById("toggle");
  const dataInputs = document.querySelectorAll("[data-input]");
  const fieldset = document.getElementById("fieldset");

  //FUNÇÃO PARA NÃO PERMITIR LETRAS E SÍMBOLOS NOS INPUTS
  function removeLettersAndSumbols() {
    dataInputs.forEach((input) => {
      input.oninput = function (e) {
        e.target.value = e.target.value.replace(/\D+/g, "");
      };
    });
  }
  removeLettersAndSumbols();

  //FUNÇÃO PARA A CRIAÇÃO DE TAGS
  function createTag(tagName, className) {
    const tag = document.createElement(tagName);
    if (className) {
      tag.classList.add(className);
    }
    return tag;
  }

  //FUNÇÃO PARA GERAR OS NUMEROS RANDOMICOS
  function random(min, max) {
    if (min > max) {
      return alert(`O número mínimo é maior que o máximo!`);
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //VARIÁVEL PARA ARMAZENAMENTO DA QUANTIDADE DE RESULTADOS
  let resultCounter = 0;

  //VARIÁVEL PARA ARMAZENAR O HTML DA PÁGINA ATUAL
  const currentPageHtml = fieldset.innerHTML;

  //FUNÇÃO PARA AGUARDAR A EXECUÇÃO DAS ANIMAÇÕES
  function waitForAnimation(element) {
    return new Promise((resolve) => {
      element.addEventListener(
        "animationend",
        function () {
          resolve();
        },
        { once: true }
      ); // <- garante que o listener será removido automaticamente
    });
  }

  //FUNÇÃO PARA CRIAR A CAIXA DE ITENS
  function createItem(item) {
    const span = createTag("span");
    const p = createTag("p", "draw-number");
    p.textContent = item;
    span.appendChild(p);

    return span;
  }

  //FUNÇÃO PARA SORTEAR OS NÚMEROS
  function draw(e) {
    e.preventDefault();
    //VARIÁVEIS PARA ARMAZENAMENTO DOS NÚMEROS DOS INPUTS
    const qtdNumbers = parseInt(document.getElementById("numbers").value);
    const min = parseInt(document.getElementById("min").value);
    const max = parseInt(document.getElementById("max").value);

    //VERIFICA A PRESENÇA DOS NUMEROS NOS INPUTS
    if (isNaN(qtdNumbers) || isNaN(min) || isNaN(max)) {
      return alert(`Preencha todos os campos paa continuar`);
    }
    //VERIFICA SE A QUANDIDADE DE NÚMEROS ESTÁ DENTRO DO RANGE ENTRE MIN E MAX
    if (qtdNumbers > max - min + 1) {
      return alert(
        `A quantidade solicitada e maior que o range entre min e max`
      );
    }

    //ARRAY PARA ARMAZENAMENTO DOS NÚMEROS SORTEADOS
    const drawNumbers = [];

    //LAÇO PARA ADICIONAR OS NÚMEROS SORTEADOS DENTRO DO ARRAY
    while (drawNumbers.length < qtdNumbers) {
      const numSort = random(min, max);
      if (!isEnabled.checked) {
        drawNumbers.push(numSort);
      } else {
        if (!drawNumbers.includes(numSort)) {
          drawNumbers.push(numSort);
        }
      }
    }

    loadItens(drawNumbers);
 
  }

  //FUNÇÃO PARA CARREGAR O HTML NA PÁGINA
  async function uploadHTML() {
    try {
      const response = await fetch("pagina.html");

      if (!response.ok) {
        throw new Error(`Erro ao carregar o conteúdo err: ${response.status}`);
      }

      const html = await response.text();
      fieldset.innerHTML = html;
      await new Promise(requestAnimationFrame);

      const counter = document.getElementById("counter");
      resultCounter++;
      counter.textContent = `${resultCounter}° resultado`;
    } catch (err) {
      console.error(err);
    }
  }

  //FUNÇÃO PARA RENDERIZAR NA TELA OS NÚMEROS SORTEADOS
  async function loadItens(arr) {
    try {
      await uploadHTML();
      const output = document.getElementById("output");
      
      console.log(arr)
      for (let i of arr) {
        const num = i;
        const item = createItem(num);
        console.log(item);
        output.appendChild(item);
        await waitForAnimation(item);
      }

      btnDrawAgain.classList.add('appearButton')
      

    } catch (err) {
      console.error(err);
    }
  }

  function drawAgain(e) {
    e.preventDefault()
    fieldset.innerHTML = currentPageHtml
  }

 
  btnDraw.addEventListener("click", draw);
  btnDrawAgain.addEventListener('click', drawAgain)
})();
