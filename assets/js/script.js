(function () {
  const btnDraw = document.getElementById("draw");
  const btndisplayNone = document.querySelector(".btn-hover");
  const btnDrawAgain = document.getElementById("drawAgain");
  const configDraw = document.getElementById("configDraw");
  const inputsNumb = document.querySelectorAll("[data-input]");
  const toggle = document.getElementById("toggle");
  const output = document.getElementById("output");
  const result = document.querySelector("#resultado");
  const resultOriginal = result.innerHTML;

  //Função para não permitir letras e números nos inputs de números
  inputsNumb.forEach((input) => {
    input.addEventListener("input", function (e) {
      e.target.value = e.target.value.replace(/\D+/g, "");
    });
  });

  //função para gerar números aleatórios

  function random(min, max) {
    if (min > max) {
      return alert(
        `O número minimo ${min} é maior que máximo ${max}, por favor, digite novamente os dados`
      );
    }

    return Math.floor(Math.random() * (max - min)) + min;
  }

  //função para criar tags

  function createTag(tagName, className) {
    const element = document.createElement(tagName);
    if (className) {
      element.classList.add(className);
    }

    return element;
  }

  const arrNumbersDraw = [];

  // função para gerar os numeros e mostrar na tela

  function drawNumbers(e) {
    e.preventDefault();

    const qtdNumbers = document.getElementById("numbers").value;
    const min = document.getElementById("min").value;
    const max = document.getElementById("max").value;
    const appearAnimation = document.querySelector("[data-appearAnimation]");

    if (!qtdNumbers || !min || !max) {
      return alert(`Por favor, insira todos os números antes de continuar`);
    }

    const parseQtdNumbers = parseInt(qtdNumbers);
    const parseMin = parseInt(min);
    const parseMax = parseInt(max);

    if (parseQtdNumbers > parseMax - parseMin + 1) {
      return alert(
        `a quantidde de números ${parseQtdNumbers} é maior que o range entre min e max, por favor realize o ajuste para continuar`
      );
    }

    const enabled = toggle.checked;

    while (arrNumbersDraw.length < parseQtdNumbers) {
      const numSort = random(parseMin, parseMax);
      if (!enabled) {
        arrNumbersDraw.push(numSort);
      } else {
        if (!arrNumbersDraw.includes(numSort)) {
          arrNumbersDraw.push(numSort);
        }
      }
    }

    btndisplayNone.classList.toggle("display-none");
    configDraw.classList.toggle("display-none");

     let contador = 0
    
    //Fech para carregar html
    fetch("teste.html")
      .then((response) => response.text())
      .then((html) => {
        result.innerHTML = html;
        
        const contResult = document.getElementById('contResult')
         contador++
        contResult.textContent = `${contador}° resultado`
      });

      console.log(contador)

     //função para contar a quantidade de resultados 
   

    //função para a criação dos números na tela
    function createItem(num) {
      const span = createTag("span");
      span.setAttribute("data-appearAnimation", "");
      const p = createTag("p", "draw-number");
      p.textContent = num;
      span.appendChild(p);

      return span;
    }

    const arr = [];

    arrNumbersDraw.forEach((el) => {
      arr.push(createItem(el));
    });

    function eventAnimation(item) {
      return new Promise((resolve) => {
        item.addEventListener("animationend", function () {
          resolve();
        });
      });
    }

    async function waitForEvent() {
      try {
        for (let i of arr) {
          const item = i;
          output.appendChild(item);
          await eventAnimation(item);
        }
        appearAnimation.classList.add("appearButton");
      } catch (err) {
        throw new Error(err);
      }
    }

    waitForEvent();
  }
  btnDraw.addEventListener("click", drawNumbers);

  btnDrawAgain.addEventListener("click", function (e) {
    e.preventDefault();
    this.classList.remove("appearButton");
    result.innerHTML = resultOriginal;
    output.textContent = "";
    arrNumbersDraw.length = 0;
    btndisplayNone.classList.toggle("display-none");
    configDraw.classList.toggle("display-none");
  });
})();
