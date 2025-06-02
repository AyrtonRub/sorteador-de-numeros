(function () {
  const btnDraw = document.getElementById("draw");
  const btndisplayNone = document.querySelector(".btn-hover");
  const btnDrawAgain = document.getElementById("drawAgain");
  const configDraw = document.getElementById("configDraw");
  const inputsNumb = document.querySelectorAll("[data-input]");
  const toggle = document.getElementById("toggle");
  const output = document.getElementById('output')

  //Função para não permitir letras e números nos inputs de números
  inputsNumb.forEach((input) => {
    input.addEventListener("input", function (e) {
      e.target.value = e.target.value.replace(/\D+/g, "");
    });
  });

  //função para gerar números aleatórios

  function random(min, max) {
    if (min > max) {
      alert(
        `O número minimo ${min} é maior que máximo ${max}, por favor, digite novamente os dados`
      );
    }

    return Math.floor(Math.random() * (max - min)) +  min;
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

    if (!qtdNumbers || !min || !max) {
      return alert(`Por favor, insira todos os números antes de continuar`);
    }

    const parseQtdNumbers = parseInt(qtdNumbers)
    const parseMin = parseInt(min)
    const parseMax = parseInt(max)

    if (parseQtdNumbers > max - parseMin + 1) {
      return alert(
        `a quantidde de números ${parseQtdNumbers} é maior que o range entre min e max, por favor realize o ajuste para continuar`
      );
    }

    const enabled = toggle.checked;
    arrNumbersDraw.length = 0

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

    btndisplayNone.classList.toggle('display-none')
    btnDrawAgain.classList.toggle('display-none')
    configDraw.classList.toggle('display-none')

    //função para a criação dos números na tela
    function createItem(num) {
      const span = createTag('span')
      const p = createTag('p', 'draw-number')
      p.textContent = num
      span.appendChild(p)

      return span
    }



    function eventAnimation (item) {
      return new Promise (resolve => {
        item.addEventListener('animationend', function() {
          resolve()
        })
      })
    }

    async function waiForAnimation() {
      try {
        for(let i in arrNumbersDraw) {
          const numArr = arrNumbersDraw[i]
          const item = createItem(numArr)
          output.appendChild(item)
          await eventAnimation(item)
        }
      } catch(err) {
        throw new Error(err)
      }
    }

    waiForAnimation()

  }

  btnDraw.addEventListener("click", drawNumbers);

  btnDrawAgain.addEventListener('click', function(e) {
    e.preventDefault()
    output.textContent = ''

    btndisplayNone.classList.toggle('display-none')
    btnDrawAgain.classList.toggle('display-none')
    configDraw.classList.toggle('display-none')
  })
})();
