let spaceshipPlayer = false;

export default class MenuScene extends Phaser.Scene{

  constructor(config){
    super(config);
  }
  init(){
    console.log(`GameScene INIT`);

  }
  preload(){
    console.log(`GameScene PRELOAD`);
    this.load.image('spaceship', 'assets/spaceship.png');
    this.load.image('spaceshipPlayer', 'assets/spaceshipPlayer.png');
    this.load.image('controls', 'assets/controls.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.spritesheet('player', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });  
  }

  create(){
    console.log(`NextScene CREATE`);
    this.cursors = this.input.keyboard.addKeys({
        up:Phaser.Input.Keyboard.KeyCodes.Z,
        down:Phaser.Input.Keyboard.KeyCodes.S,
        left:Phaser.Input.Keyboard.KeyCodes.Q,
        right:Phaser.Input.Keyboard.KeyCodes.D,
        space: Phaser.Input.Keyboard.KeyCodes.SPACE
      });

    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;


    this.player = this.physics.add.sprite(600, 450, 'player');
    this.spaceship = this.physics.add.sprite(800, 450, 'spaceship');

    // create texts
    this.controls = this.physics.add.sprite(800, 900, 'controls');  
    this.titleText = this.add.text(screenCenterX, 200, 'Devine in Space', { fontFamily: 'armada bold, "Goudy Bookletter 1911", Times, serif', fontSize: '50px', align: 'center' }).setOrigin(0.5);
    this.subTitleText = this.add.text(screenCenterX, 250, 'Launch the Devineship into space and see what happens!', { fontFamily: 'armada, "Goudy Bookletter 1911", Times, serif', fontSize: '20px', align: 'center' }).setOrigin(0.5);
    
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

    this.physics.add.overlap(this.player, this.spaceship, this.enterSpaceship, null, this);

  }



    enterSpaceship(player, spaceship){
        player.disableBody(true, true);
        spaceship.disableBody(true, true);
        spaceshipPlayer = true;
        this.spaceshipPlayer = this.physics.add.sprite(800, 450, 'spaceshipPlayer');
        this.spaceshipPlayer.setGravityY(200);
    }
  

 
  update(){
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

  

    if(spaceshipPlayer){
        if(this.cursors.up.isDown){
            this.spaceshipPlayer.setVelocityY(-330);
        }
        else if(this.cursors.left.isDown){
            this.spaceshipPlayer.setVelocityX(-330);
        }else if(this.cursors.right.isDown){
            this.spaceshipPlayer.setVelocityX(330);
        }
        else{
            this.spaceshipPlayer.setVelocityY(0);
            this.spaceshipPlayer.setVelocityX(0);
        }
        if(this.spaceshipPlayer.y <= 0){
            spaceshipPlayer = false;
            this.scene.start('gamescene', {kills: 0, health: 30});
        }
    }

   


    }


    
}