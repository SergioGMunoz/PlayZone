// Valores de guerreros iniciales
const templateWarriors = {
    1 : {
        img: 'img/Warrior1.svg',
        cost: 2,
        live: 4,
        power: 2
    },
    2:  {
        img: 'img/Warrior2.svg',
        cost: 3,
        live: 6,
        power: 3
    },
    3:  {
        img: 'img/Warrior3.svg',
        cost: 4,
        live: 5,
        power: 5
    }
}

// Guerreros situados en el campo de batalla
const enemyWarriors = [null,null,null]
const playerWarriors = [null,null,null]

//Revisar esto mañana

function updateShopWarriors() {
    Object.entries(templateWarriors).forEach(([id, data]) => {
      const container = document.getElementById(`warrior${id}-shop`);
      if (!container) return;
  
      // 1. Imagen del guerrero
      const imgEl = container.querySelector('.img-warrior-shop');
      imgEl.src = data.img;
      imgEl.alt = `Warrior ${id}`;
  
      // 2. Datos: coste, fuerza, vida (en el mismo orden que los <div.info-element>)
      const pEls = container.querySelectorAll('.warrior-info-shop .info-element p');
      // pEls[0] → coste (coin), pEls[1] → power, pEls[2] → life
      pEls[0].textContent = data.cost;
      pEls[1].textContent = data.power;
      pEls[2].textContent = data.live;
    });
  }
  
  // Llamamos al cargar la página
  document.addEventListener('DOMContentLoaded', updateShopWarriors);