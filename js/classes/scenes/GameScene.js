let isWarping;
let bossSpawned = false;
let mouseTouchDown = false;
let planetIsActive = false;
let killCountText;
let fuelText;
let overheathText;
let overheath = 0;
let bossLabelText;
let bossHealthBar;
let bossHealth;
const bossMaxHealth = 30;
let playerHealthLabelText;
let playerHealthBar;
let playerHealth = 5;
const playerMaxHealth = 5;
let boss;
let killCount;
let playerScale = 1;
let fuelLevel = 0;
let gravitationalPull = false;
let planetScale = 0;
let gravity = 0;
let spawnEnemyInterval;
let spawnEarthInterval;
let spawnEnemyLaserInterval;
export default class GameScene extends Phaser.Scene{

  constructor(config){
    super(config);
  }

  init({kills, health}){
    //reset some variables
    console.log(`GameScene INIT`);
    bossSpawned = false;
    planetIsActive = false;
    planetScale = 0;
    playerScale = 1;
    gravitationalPull = false;
    playerHealth = 5;
    if(kills != undefined){
      killCount = kills;
   
    }else{
      killCount = 0;
    }

    console.log(health)
    if(health != undefined){
      bossHealth = health;
    }else{
      bossHealth = 30;
    }
   
    overheath = 0;
    fuelLevel = 0;
    isWarping = false;
    
  }
  preload(){
    console.log(`GameScene PRELOAD`);
    //1. Preloading images
    
    this.load.image('galaxy', 'assets/galaxy.jpg')
    this.load.image('planet', 'assets/planettest.png')
    this.load.image('spaceshipPlayer', 'assets/spaceshipPlayer.png')
    this.load.image('laser', 'assets/playerlaser.png')
    this.load.spritesheet('enemy', 'assets/enemy.png', { frameWidth: 65, frameHeight: 51 });
    this.load.spritesheet('boss', 'assets/boss.png', { frameWidth: 380, frameHeight: 166 });
    this.load.image('bosslaser', 'assets/bosslaser.png')
    this.load.image('fuel', 'assets/fuel.png')
    this.load.spritesheet('explosion', 'assets/explosion.png', { frameWidth: 192, frameHeight: 192 });
    this.load.audio('explode1', 'assets/explosion1.mp3');  
    this.load.audio('explode2', 'assets/explosion2.mp3');  
    this.load.audio('explode3', 'assets/explosion3.mp3');  
    this.load.audio('laserShot', 'assets/laser.mp3'); 
    this.load.audio('collectFuel', 'assets/fuelCollect.mp3'); 
    this.load.audio('warp', 'assets/warp.mp3'); 
    this.load.image('ui', 'assets/ui.png')

   
  }
  create(){
    console.log(`GameScene CREATE`);
    
    this.cursors = this.input.keyboard.createCursorKeys(
      
    );
    // add custom cursor inputs
    this.cursors = this.input.keyboard.addKeys({
      up:Phaser.Input.Keyboard.KeyCodes.Z,
      down:Phaser.Input.Keyboard.KeyCodes.S,
      left:Phaser.Input.Keyboard.KeyCodes.Q,
      right:Phaser.Input.Keyboard.KeyCodes.D,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE
    });
    // create background image
    let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'galaxy')
    

    this.warp = this.sound.add('warp');
  


    // create groups
    this.lasers = this.physics.add.group();
    this.bossLasers = this.physics.add.group();
    this.enemies = this.physics.add.group();
    this.explosions = this.physics.add.group();
    this.fuels = this.physics.add.group();
    this.enemyLasers = this.physics.add.group();

    // create animations
    this.anims.create({
      key: 'enemyleft',
      frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
       key: 'explosion',
       frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 8 }),
       frameRate: 10,
       repeat: 0,
       hideOnComplete: true
    });

    this.anims.create({
      key: 'bossHummer',
      frames: this.anims.generateFrameNumbers('boss', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
   });

 

   // spawn a planet every 30 seconds 
    this.spawnEarth();
    spawnEarthInterval = this.time.addEvent({
      delay: 30000,             
      callback: this.spawnEarth,
      callbackScope: this,
      args: [],
      loop: true  
  });
  // create a player sprite
  this.player = this.physics.add.sprite(100, 450, 'spaceshipPlayer');
  // collide with canvas bounds
  this.player.setCollideWorldBounds(true);
  this.player.setDepth(1)
  playerHealthBar = this.makeBar(870, 1100, 0x2ecc71, 200, 50);

  this.ui = this.physics.add.sprite(850, 1100, 'ui');

  // enemies are being spawned every 1 seconde
    spawnEnemyInterval = this.time.addEvent({
      delay: 1000,             
      callback: this.spawnEnemies,
      callbackScope : this,
      args: [this.enemies],
      loop: true
  });

  // fuel is being spawned every 1 second
  this.time.addEvent({
    delay: 1000,             
    callback: this.spawnFuel,
    callbackScope : this,
    args: [],
    loop: true
});

  // boss shoots lasers every .5 second
  this.time.addEvent({
    delay: 500,             
    callback: this.spawnBossLaser,
    callbackScope: this,
    args: [],
    loop: true  
});



  // add colliders to physics bodies
  this.physics.add.collider(this.lasers, this.enemies, this.hitLaser, null, this);
  this.physics.add.collider(this.enemies, this.player, this.hitPlayer, null, this);
  this.physics.add.collider(this.bossLasers, this.player, this.bossLaserHitPLayer, null, this);
  this.physics.add.collider(this.fuels, this.player, this.collectFuel, null, this);
  // create texts
  this.warningText = this.add.text(400, 400, '', { fontFamily: 'armada bold, "Goudy Bookletter 1911", Times, serif', fontSize: '50px', align: 'center' });
  this.warningText.setAlpha(0);
  this.warningText.setDepth(2);
  // give tween animation to warning text
  this.tweens.add({
   targets: this.warningText, 
   duration: 750, 
   ease: 'Bounce',
   alpha: 1, 
   repeat: -1, 
   yoyo: true
 });


 fuelText = this.add.text(630, 1050, 'Fuel level: 0', { fontFamily: 'armada bold, "Goudy Bookletter 1911", Times, serif' });
 overheathText = this.add.text(630, 1100, 'Overheat: 0%', { fontFamily: 'armada bold, "Goudy Bookletter 1911", Times, serif' });
 killCountText = this.add.text(630, 1150, 'Kills: 0', { fontFamily: 'armada bold, "Goudy Bookletter 1911", Times, serif' });
 if(killCount !=0){
   killCountText.setText("Kills: " + killCount);
 }
 playerHealthLabelText = this.add.text(870, 1050, 'Health', { fontFamily: 'armada bold, "Goudy Bookletter 1911", Times, serif' });

 // move the boss on randomly on Y-axis every 2s
 this.time.addEvent({
  delay: 2000,             
  callback: this.moveBoss,
  callbackScope: this,
  args: [],
  loop: true
});
  }

  makeBar(x, y, color, w, h) {
    //draw the bar
    let bar = this.add.graphics();

    //color the bar
    bar.fillStyle(color, 1);

    //fill the bar with a rectangle
    bar.fillRect(0, 0, w, h);

    //position the bar
    bar.x = x;
    bar.y = y;

    //return the bar
    return bar;
}

setValue(bar, percentage) {
  //scale the bar
    bar.scaleX -= percentage/100;
}
  
 
  update(){
    // overheath always diminishes over time
    overheath -= .01;
    if(overheath <= 0){
      overheath = 0;
    }
    if(overheath >= 10){
      overheathText.setColor('#ff0000');
    }else{
      overheathText.setColor('#ffffff');
    }
    overheathText.setText('Overheat ' + overheath.toFixed(2) + '%');
    // give enemies motor animation
    this.enemies.children.iterate(function (child) {
      child.anims.play('enemyleft', true);
  });
 // give explosions animation
  this.explosions.children.iterate(function (child) {
    child.anims.play('explosion', true);
});


if(bossSpawned){
  this.boss.anims.play('bossHummer', true);
}

this.fuels.children.iterate(function (child) {
  child.angle ++;
});
    if(!this){
      return;
    }
    // player loses controls if planet is too big
    if(gravitationalPull){
      this.player.setVelocityY(0);
      this.player.setVelocityX(0);
      playerScale -= .01;
      if(playerScale <= 0){
        playerScale = 0
      }
      if(playerScale === 0){
        this.scene.start('nextscene', {kills: killCount, health: bossHealth});
      
      }
      this.player.setScale(playerScale)
    // player controls
    }else{
    if (this.cursors.right.isDown){

        this.player.setVelocityX(160);
    }else 
        if(this.cursors.left.isDown){
            this.player.setVelocityX(-160);
    }else 
        if(this.cursors.up.isDown){
          this.player.setVelocityY(-160);
         
    }else 
        if(this.cursors.down.isDown){
          this.player.setVelocityY(160);
    }else{
      this.player.setVelocityY(0);
      this.player.setVelocityX(0);
    }

    // warp away from the approaching planet to get out of the gravitational pull
    if(this.cursors.space.isDown){
    
      if(fuelLevel > 0){
  
        fuelLevel -= 0.01;
        fuelText.setText('Fuel level: ' + fuelLevel.toFixed(2));
        planetScale = planetScale - 0.002;
        gravity = gravity - 1;

        if(isWarping === false){
          this.warp.play({volume: .3});
          isWarping = true;
        }

    }else{
      this.warp.stop();
      isWarping = false;
      }
    }else{
      this.warp.stop();
      isWarping = false;
    }
   

    if (this.game.input.activePointer.isDown) {
      // We'll manually keep track if the pointer wasn't already down
      if (!mouseTouchDown) {
        mouseTouchDown = true;
        this.fireLaser();
      }
    } else {
      if (mouseTouchDown) {
        mouseTouchDown = false;
      }
      }
    }


      if(planetIsActive){
        // check if planet spawn in upper half or lower half of canvas to set the gravity directional pull
        if(this.earth.x >= 850 && this.player.x <= 850){
          this.player.setGravityX(gravity);
        }
        if(this.earth.x <= 850 && this.player.x >= 850){
          this.player.setGravityX(-gravity);
        }
        if(this.earth.y < 500){
          this.player.setGravityY(-gravity);
        }else{
          this.player.setGravityY(gravity);
        }

        // gravity aand scale gradually go up
        gravity = gravity + 1;
        planetScale = planetScale + 0.001;
        this.earth.setScale(planetScale);
        // give the player warnings 
        if(planetScale > .9){
          this.warningText.setColor('#FF0000')
          this.warningText.setText('Warning gravitational pull imminent');
        }else if(planetScale > .7){
          this.warningText.setColor('#FFA500')
          this.warningText.setText('Warning gravitational pull approaching');
        }else{
          this.warningText.setText('');
        }

        // when planet is too big, player crashes on the planet
        if(planetScale > 1){
          gravitationalPull = true;
          this.player.angle ++;
        }

        // remove the planet if it is out of the canvas
        if(this.earth.x <= -400){
          this.earth.destroy();
          planetIsActive = false;
          this.player.setGravityX(0);
          this.player.setGravityY(0);
        }
       
      }
      // prevent negative scaling
      if(planetScale < 0){
        planetScale = 0;
      }

      // GAMEOVER
      if(playerHealth <= 0){
        this.warp.stop();
        this.scene.start('gameoverscene');
      
      }
      
      // spawn boss when conditions are met
      if(killCount >= 20 && bossSpawned === false && bossHealth > 0){
        this.spawnBoss();
        bossSpawned = true;
      }

      // boss can't go further than certain x, make the player able to shoot boss
      if(this.boss){
        if(this.boss.x < 800){
          this.boss.x = 800;
        }
      }
     

    }
    spawnBoss(){
      bossLabelText = this.add.text(800, 20, 'Boss', { fontFamily: 'armada bold, "Goudy Bookletter 1911", Times, serif', fontSize: '40px'});
      bossHealthBar = this.makeBar(350,100,0xff0000, 1000, 30);
      console.log("temped")
      if(bossHealth != 30){
        for (let temp = bossMaxHealth - bossHealth; temp > 0 ; temp--) {
          console.log("temped")
          this.setValue(bossHealthBar, (1/bossMaxHealth)*100);
        }
        
      }
      this.boss = this.physics.add.sprite(1500, 600, 'boss');
      this.physics.add.collider(this.lasers, this.boss, this.playerLaserHitBoss, null, this);
      

    }
    moveBoss(){
      if(bossSpawned){
        this.boss.setVelocityY(Phaser.Math.Between(100, -100))
        this.boss.setVelocityX(-20);
        this.boss.setCollideWorldBounds(true);
       }
    }
   

    spawnBossLaser(){
      if(bossSpawned){
        const bossLaser = this.physics.add.sprite(this.boss.x - 190, this.boss.y + 45, 'bosslaser');
        this.bossLasers.add(bossLaser);
        bossLaser.setVelocityX(-200);
      }
    }

    bossLaserHitPLayer(player, laser){
      laser.disableBody(true, true);
      playerHealth--;
      this.setValue(playerHealthBar, (1/playerMaxHealth)*100);
      this.renderExplosion(laser);
  }


    spawnEnemies(){
      const enemy = this.physics.add.sprite(1700, Phaser.Math.Between(0, 1200), 'enemy');
      this.enemies.add(enemy);
      enemy.setVelocityX(Phaser.Math.Between(0, -1000))
  }

  spawnFuel(){
    const fuel = this.physics.add.sprite(1700, Phaser.Math.Between(0, 1200), 'fuel').setScale(.2);
    this.fuels.add(fuel);
    fuel.setVelocityX(-200);
  }

  spawnEarth() {
    if(planetIsActive === false){
    planetScale = 0;
    gravity = 0;
    planetIsActive = true;
    let randomEarthY = Math.random();
    if(randomEarthY > .5){
      randomEarthY = 200;
    }else{
      randomEarthY = 800;
    }
   this.earth = this.physics.add.sprite(1000, randomEarthY, 'planet');
   this.earth.setVelocityX(-30);
  }

}
  spawnEnemyLaser() {
      const enemyLaser = this.physics.add.sprite(enemy.x - 20, enemy.y, 'laser');
      this.enemyLasers.add(enemyLaser);
      enemyLaser.setVelocityX(-100);
}


collectFuel (player, fuel){
  this.sound.play('collectFuel', {volume: 0.1})
  fuel.disableBody(true, true);
  fuel.destroy();
  fuelLevel++;
  fuelText.setText('Fuel level: ' + fuelLevel.toFixed(2));
}

   
    
    fireLaser() {
      if(overheath > 10){
        overheathText.setColor('#ff0000');
      }else{
        this.sound.play('laserShot', {volume: .05});
        overheathText.setColor('#ffffff');
        const laser = this.physics.add.sprite(this.player.x, this.player.y, 'laser');
        this.lasers.add(laser);
        overheath ++;
       

        overheathText.setText('Overheat ' + overheath.toFixed(2) + '%');
        laser.setVelocityX(1000);
        laser.setCollideWorldBounds(true);
        laser.body.onWorldBounds = true;
        laser.body.world.on('worldbounds', function(body) {
        // Check if the body's game object is the laser you are listening for
        if (body.gameObject === this) {
          // Stop physics and render updates for this object
          this.destroy();
          }
        }, laser);  
      }       
    } 

     hitLaser(laser, enemy){
      this.renderExplosion(enemy);
      enemy.disableBody(true, true);
      laser.disableBody(true, true);
      killCount++;
      killCountText.setText("Kills: " + killCount);
      fuelText.setText("Fuel level: " + fuelLevel.toFixed(2));
  }

    renderExplosion(position){
      const randomExplosionSound =  Math.floor(Math.random() * 3) + 1 
      switch(randomExplosionSound){
        case 1:this.sound.play('explode1', {volume: 0.1});break;
        case 2:this.sound.play('explode2', {volume: 0.1});break;
        case 3:this.sound.play('explode3', {volume: 0.1});break;
        default: this.sound.play('explode3', {volume: 0.1});break;
      }
      const explosion = this.physics.add.sprite(position.x, position.y, 'explosion');
      this.explosions.add(explosion);
    }
  
    hitPlayer(player, enemy){
      playerHealth--;
      if(playerHealth <= 0){
        playerHealthBar.scaleX = 0;
      }else{
        this.setValue(playerHealthBar, (1/playerMaxHealth)*100)
      }

      if(playerHealth <= 0){
        this.physics.pause(); 
      }
      
      this.renderExplosion(enemy);
      enemy.disableBody(true, true);
      enemy.destroy();
    
  }

  playerLaserHitBoss(boss, laser){
    this.renderExplosion(boss);
    laser.disableBody(true, true);
    this.setValue(bossHealthBar, (1/bossMaxHealth)*100)
    this.boss.anims.play("bossHurt");
    bossHealth --;

    // VICTORY
    if(bossHealth <= 0){
      bossLabelText.destroy();
      this.boss.destroy();
      bossSpawned = false;
      this.warp.stop();
      this.scene.start('victoryscene');
    
    }
  }
}