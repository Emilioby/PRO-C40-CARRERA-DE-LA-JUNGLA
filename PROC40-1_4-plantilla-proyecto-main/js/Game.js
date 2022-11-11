class Game {
  constructor() {}

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    animal1 = createSprite(width / 2 - 50, height - 100);
    animal1.addImage(" animal1",  animal1_img);
    animal1.scale = 0.07;

    animal2 = createSprite(width / 2 + 100, height - 100);
    animal2.addImage(" animal2",  animal2_img);
    animal2.scale = 0.07;

    animals = [ animal1,  animal2];

    // C38 AM
    bush = new Group();
    grass = new Group();

    // Agregando sprites de arbustos en el juego
    this.addSprites(bush, 4, bushImage, 0.02);

    // Agregando sprites de pasto en el juego
    this.addSprites(grass, 18, grassImage, 0.09);
  }

  // C38 AM
  addSprites(spriteGroup, numberOfSprites, spriteImage, scale) {
    for (var i = 0; i < numberOfSprites; i++) {
      var x, y;

      x = random(width / 2 + 150, width / 2 - 150);
      y = random(-height * 4.5, height - 400);

      var sprite = createSprite(x, y);
      sprite.addImage("sprite", spriteImage);

      sprite.scale = scale;
      spriteGroup.add(sprite);
    }
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }

  play() {
    this.handleElements();

    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      // Indice del arreglo
      var index = 0;
      for (var plr in allPlayers) {
        // Agrega 1 al índice en cada ciclo
        index = index + 1;

        // Usa datos de la base de datos para mostrar los autos en dirección x e y
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        animals[index - 1].position.x = x;
        animals[index - 1].position.y = y;

        // C38  AA
        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);

          this.handleBush(index);
          this.handleGrass(index);

          // Cambiar posición de la cámara en la dirección y
         }
      }

      // Manipulación de eventos de teclado
      if (keyIsDown(UP_ARROW)) {
        player.positionY += 10;
        player.update();
      }

      drawSprites();
    }
  }

  handleBush(index) {
    // Agregando arbustos
    animals[index - 1].overlap(bush, function(collector, collected) {
      player.bush = 185;
      // "collected" es el sprite en el grupo de coleccionables que detona
      // el evento
      collected.remove();
    });
  }

  handleGrass(index){

    // animals[index - 1].overlap(grass, function(collector, collected) {
    //   player.score += 21;
    //   player.update();
    //   collected.remove();
    // });


     animals[index - 1].overlap(grass, function(collected, collector) {
      player.score += 21;
      player.update();
       collector.remove();
    });


  //   animals[index].overlap(grass, function(collector, collected) {
  //     player.score += 21;
  //     player.update();
  //     collected.update();
  //   });

  }

    
}
