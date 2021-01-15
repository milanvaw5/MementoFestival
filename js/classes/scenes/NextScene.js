//import NextScene from "./NextScene";

let parts = 0;
let gameover = false;
let lives = 3;
let immume = false;
export default class NextScene extends Phaser.Scene{

  constructor(config){
    super(config);
  }

  init({kills, health}){
    // reset some variables
    console.log(`NextScene INIT`);
    parts = 0;

    this.killCount = kills;
    this.bossHealth = health;
    console.log(this.bossHealth);
  
  }
  preload(){
    console.log(`NextScene PRELOAD`);
    //1. Preloading images
    this.load.image('bluesky', 'assets/bluesky.jpg');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('life', 'assets/life.png');
    this.load.image('part', 'assets/part.png');
    this.load.image('crashedSpaceship', 'assets/spaceship.png');
    this.load.spritesheet('player', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });  
    this.load.spritesheet('groundEnemy', 'assets/alien.png', { frameWidth: 37.5, frameHeight: 31 });  
    this.load.audio('collectPart', 'assets/collectPart.mp3');  
    this.load.audio('kill', 'assets/kill.mp3');  
    this.load.audio('damage', 'assets/damage.mp3');  
   
  }
  create(){
    console.log(`NextScene CREATE`);
    
    // create background image
    let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'bluesky')

  

    // add custom cursor inputs
    this.cursors = this.input.keyboard.addKeys({
        up:Phaser.Input.Keyboard.KeyCodes.Z,
        down:Phaser.Input.Keyboard.KeyCodes.S,
        left:Phaser.Input.Keyboard.KeyCodes.Q,
        right:Phaser.Input.Keyboard.KeyCodes.D,
        space: Phaser.Input.Keyboard.KeyCodes.SPACE
      });
    // create platforms 
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(0, 400, 'ground').setScale(.5).refreshBody();
    this.platforms.create(100, 500, 'ground').setScale(.5).refreshBody();
    this.platforms.create(250, 600, 'ground').setScale(.5).refreshBody();
    this.platforms.create(250, 900, 'ground').setScale(.5).refreshBody();

    this.platforms.create(1500, 950, 'ground').setScale(.6, .5).refreshBody();
    this.platforms.create(1500, 1030, 'ground').setScale(1, .5).refreshBody();

    this.platforms.create(600, 600, 'ground').setScale(.3, .5).refreshBody();
    this.platforms.create(700, 500, 'ground').setScale(.3, .5).refreshBody();
    this.platforms.create(800, 600, 'ground').setScale(.3, .5).refreshBody();
    this.platforms.create(900, 500, 'ground').setScale(.3, .5).refreshBody();

    this.platforms.create(600, 1000, 'ground').setScale(1, .5).refreshBody();
    this.platforms.create(400, 800, 'ground').setScale(.3, .5).refreshBody();
    this.platforms.create(800, 700, 'ground').setScale(1, .5).refreshBody();
    this.platforms.create(1500, 700, 'ground').setScale(1.3, .5).refreshBody();
    this.platforms.create(1200, 500, 'ground').setScale(.2, .5).refreshBody();
    this.platforms.create(1300, 450, 'ground').setScale(.2, .5).refreshBody();
    this.platforms.create(1400, 400, 'ground').setScale(.2, .5).refreshBody();
    this.platforms.create(1500, 350, 'ground').setScale(.2, .5).refreshBody();
    this.platforms.create(1600, 300, 'ground').setScale(.2, .5).refreshBody();

    this.platforms.create(100, 800, 'ground').setScale(.5).refreshBody();
    this.platforms.create(1200, 600, 'ground').setScale(.5).refreshBody();

    this.platforms.create(1200, 800, 'ground').setScale(.5).refreshBody();
    this.platforms.create(1000, 1030, 'ground').setScale(.5).refreshBody();

    this.platforms.create(850, 1200, 'ground').setScale(6).refreshBody();

    this.crashedSpaceship = this.physics.add.staticSprite(100, 1065, 'crashedSpaceship');

    this.player = this.physics.add.sprite(200, 1050, 'player');
    this.player.setGravityY(500);

    this.playerLives = this.physics.add.staticGroup({
        key: 'life',
        repeat: 2,
        setXY: { x: 100, y: 1150, stepX: 40 }
    });
    //create texts
    this.partsText = this.add.text(0, 1000, 'Collect parts: 0/10', { fontFamily: 'armada, "Goudy Bookletter 1911", Times, serif' });
    this.playerLifeLabel = this.add.text(20, 1150, 'Lives', { fontFamily: 'armada, "Goudy Bookletter 1911", Times, serif' });

    // create 10 enemies
    this.enemies = this.physics.add.group({
        key: 'groundEnemy',
        repeat: 10,
        setXY: { x: 0, y: 0, stepX: 140 }
    });
    // give all enemies gravity and collider with canvas bounds
    this.enemies.children.iterate(function (child) {
        child.setGravityY(200);
        child.setCollideWorldBounds(true);
    });
    // create 10 parts in a group
    this.parts = this.physics.add.group();
    // loop with for loop to keep a random X and Y pos
    for (let index = 0; index < 10; index++) {
        const part = this.physics.add.sprite(Phaser.Math.Between(200, 1700), Phaser.Math.Between(0, 800), 'part');
        part.setScale(.5);
        this.parts.add(part);
    }
    // gravity is handled in iterate loop !
    this.parts.children.iterate(function (child) {
        child.setGravityY(200);
    });
    // create animations
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'player', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'alienleft',
        frames: this.anims.generateFrameNumbers('groundEnemy', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'alienright',
        frames: this.anims.generateFrameNumbers('groundEnemy', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    // add colliders to sprites
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.crashedSpaceship, this.player, this.repairShip, null, this);
    this.physics.add.collider(this.parts, this.platforms);
    this.physics.add.collider(this.enemies, this.platforms);
    this.physics.add.collider(this.enemies, this.player, this.enemyAttack, null, this);
    this.physics.add.overlap(this.player, this.parts, this.collectPart, null, this);

    // every 2 seconds the enemies will move randomly on X-axis
    this.time.addEvent({
        delay: 2000,             
        callback: this.moveGroundEnemy,
        callbackScope: this,
        args: [],
        loop: true
    });
  }
  

 
  update(){
      // render correct animations for enemies when going left or right
      if(this.enemies){

        this.enemies.children.iterate(function (child) {
            if(child.body.velocity.x < 0){
                child.anims.play('alienleft', true);
            }else{
                child.anims.play('alienright', true);
            }
            if(child.body.touching.down){
                child.setVelocityY(Phaser.Math.Between(-10, -200));
            }
          });
      }

      

   

    // player controls
    if (this.cursors.left.isDown)
    {
        this.player.setVelocityX(-160);

       this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown)
    {
        this.player.setVelocityX(160);

        this.player.anims.play('right', true);
    }
    else
    {
        this.player.setVelocityX(0);

        this.player.anims.play('turn');
    }

    if (this.cursors.space.isDown && this.player.body.touching.down)
    {
        this.player.setVelocityY(-330);
    }



    }

    repairShip(){
        if(parts >= 10 && this){
         this.scene.start('gamescene', {kills: this.killCount, health: this.bossHealth});
  
        }
    }

    moveGroundEnemy(){
        this.enemies.children.iterate(function (child) {
            child.setVelocityX(Phaser.Math.Between(-200, 200))
        });
    }

 collectPart (player, part){
    this.sound.play('collectPart', {volume: 0.1});
    part.disableBody(true, true);

    //Add and update the parts
    parts++;
    this.partsText.setText('Collect parts: '+ parts + '/10');
    if(parts >= 10){
        this.partsText.setText('Ship repair available!');
    }

    
}

enemyAttack(player, groundEnemy){
    //kill and enemy when you collide on its head
   if(player.body.touching.down && groundEnemy.body.touching.up){
    this.sound.play('kill' , {volume: 0.1});
    groundEnemy.disableBody(true, true);
    //if the collision is not of the above, player takes damage if player doens't have immumity (else player would die from one collision)
   }else if(immume === false){
       this.sound.play('damage', {volume: 0.1});
       lives--;
       let count = 0;
       this.playerLives.children.iterate(function (child) {
        count++;
        if(count === lives +1){
           child.destroy();
        }
     
    });
       immume = true;
       player.setTint(0xff0000);
      
// GAMEOVER
       if(lives <= 0){
            player.anims.play('turn');
            gameover = true;
            this.scene.start('gameoverscene');
       }else{
        setTimeout(function(){ immume = false;  player.clearTint(); }, 1000);
       }
    
   }
}

playerAttack(player, groundEnemy){
   
    groundEnemy.disableBody(true, true);

    if(groundEnemy.body.touching.up){
    
        groundEnemy.disableBody(true, true);

    }
}
    
}