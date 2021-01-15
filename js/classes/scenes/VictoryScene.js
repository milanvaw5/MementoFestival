
export default class VictoryScene extends Phaser.Scene{

    constructor(config){
      super(config);
    }
  
    init(){
      console.log(`GameScene INIT`);

      
    }
    preload(){
      console.log(`GameScene PRELOAD`);
     
    }
    create(){
      console.log(`NextScene CREATE`);
      const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;

      this.titleText = this.add.text(screenCenterX, 200, 'VICTORY', { fontFamily: 'armada bold, "Goudy Bookletter 1911", Times, serif', fontSize: '50px', align: 'center' }).setOrigin(0.5);
      this.retryText = this.add.text(screenCenterX, 400, 'Try again?', { fontFamily: 'armada bold, "Goudy Bookletter 1911", Times, serif', fontSize: '50px', align: 'center' }).setOrigin(0.5);
      this.retryText.setInteractive({ useHandCursor: true  });
      this.input.on('gameobjectdown',this.onObjectClicked, this); //context 'this' meegeven ! 
  
    }
  
    
    onObjectClicked(pointer,gameObject) {
      this.scene.start('menuscene');
     }
  
   
    update(){
      
      }
  
  
      
  }