(function () {
  const btnDraw = document.getElementById("draw");
//   const btnDrawAgain = document.getElementById("drawAgain");
  const output = document.getElementById("output");
//   const isRepeat = document.getElementById("toggle");
  const inputs = document.querySelectorAll("[data-input]");

  //inpede o usuário de inserir letras nos inputs
  inputs.forEach((input) => {
    input.addEventListener("input", function (e) {
      e.target.value = e.target.value.replace(/[^\d]/g, "");
    });
  });

  // Função para gerar numeros aleatorios
  function random(min, max) {
    if (min > max) {
      [min, max] = [max, min];
    }
    const result = Math.floor(Math.random() * (max - min + 1) + min);
    return result;
  }

  // função para criar tags
  function createTag(tagName, className) {
    const element = document.createElement(tagName)
    if (className) {
        element.classList.add(className)
    }
    return element
  }

  let drawnNumbers = []; // array para armazenamento dos números sorteados
  
  function clickButton() {
    const qtdnum = document.getElementById("numbers");
    const minNum = document.getElementById("min");
    const maxNum = document.getElementById("max");

    //Verifica se os valores foram passados
    if (qtdnum.value === "" || minNum.value === "" || maxNum.value === "") {
      alert("Favor digite os valores");
      return;
    }

    const qtdNumbers = parseInt(qtdnum.value);
    const min = parseInt(minNum.value);
    const max = parseInt(maxNum.value);

    drawnNumbers = [] //Limpa o array ao executar novamente

    //Adiciona o número sorteado dentro do array
    function storeNumbers(qtdNum, arr) {
      if (qtdNum > (max - min + 1)) {//Verifica se a quantidade de num e maior que a quantidade maxima
       alert(
          `A quantidade de números digitados (${qtdNum}) excede o limite permitido (${max - min + 1}). Por favor, digite um valor válido`
        );
         return;
      }
      while(arr.length < qtdNum) {
        let sortNum = random(min, max)
        if(!arr.includes(sortNum)) {
            arr.push(sortNum)
        }
      }
  }

  storeNumbers(qtdNumbers, drawnNumbers)

  function createElement(value) {
    const span = createTag('span')
    const p = createTag('p', 'draw-number')
    p.textContent = value
    span.appendChild(p)

    return span
  }

  console.log(createElement('5'))

  function waitForNextAnimation(item) {
    return new Promise(resolve => {
        if(item) {
            item.addEventListener('animationend', function() {
                resolve()
            }, {once: true})
        }
    })
  }

  console.log(drawnNumbers)

  async function renderItem () {
    try {
        for(let i in drawnNumbers) {
            const el = drawnNumbers[i]
            const item = createElement(el)
            output.appendChild(item)
            await waitForNextAnimation(item)
            
        }
    } catch(err) {
        throw new Error(err)
    }
  }

  renderItem()
}


  btnDraw.addEventListener("click", clickButton);

 
})();
