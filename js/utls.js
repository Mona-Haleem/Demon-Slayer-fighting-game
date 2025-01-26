function rectangularCollision({ rectangular1, rectangular2 }) {
  return (
    rectangular1.attackBox.possition.x + rectangular1.attackBox.width >=
      rectangular2.possition.x &&
    rectangular1.attackBox.possition.x <=
      rectangular2.possition.x + rectangular2.width &&
    rectangular1.attackBox.possition.y + rectangular1.attackBox.height >=
      rectangular2.attackBox.possition.y &&
    rectangular1.attackBox.possition.y <=
      rectangular2.possition.y + rectangular2.height
  );
}

function determinWinner({ player, enmy, timerId }) {
  let gameResault = document.querySelector("#resultOfGame");
  gameResault.style.display = "flex";
  clearTimeout(timerId);
  if (player.health === enmy.health) {
    gameResault.innerHTML = "Tie";
  } else if (player.health > enmy.health) {
    // enmy.switchSprite("death");
    gameResault.innerHTML = "Player 1 Wins";
  } else if (player.health < enmy.health) {
    gameResault.innerHTML = "Player 2 Wins";
  }
  
  // update the flag to stop game with the timmer
  matchEnd = true;
  // add button for rematch 
  gameResault.innerHTML += `<button onclick="rematch()" style="
                                background: red;
                                color: white;
                                font-weight: bold;
                                padding: 10px;
                                width: 200px;
                                margin: 10px;
                                box-shadow: 5px 5px 5px  rgba(0,0,0,0.8);
                                border: none;
                                border-radius: 20px;
                                cursor:pointer;
                            ">Rematch</button>`
}

function resetFighter(fighter, initialPosition){
  fighter.possition = { ...initialPosition };
  fighter.currentFrame = 0;
  fighter.framesElapsed = 0 ;
  fighter.velocity = { x: 0, y: 0 };
  fighter.health = 100;
  fighter.img = fighter.sprites.idle.img;
  fighter.dead = false;
  fighter.isAttacking = false;
  console.log(fighter,fighter==enmy);

}

function rematch(){
  matchEnd = false;
  timer = 51;
  resetFighter(player1, { x: 0, y: 0 });
  document.querySelector('#playerHealth').style.width ='100%';
  
  document.querySelector('#enemyHealth').style.width ='100%';

  resetFighter(enmy,  { x: 450, y: 100 });
  document.querySelector("#resultOfGame").innerHTML = ''; 
  window.requestAnimationFrame(animate);
  decreaseTimer();
}

let timer = 51;
let timerId;

function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector("#timer").innerHTML = timer;
  }
  if (timer === 0) {
    determinWinner({ player: player1, enmy: enmy, timerId });
  }
}
