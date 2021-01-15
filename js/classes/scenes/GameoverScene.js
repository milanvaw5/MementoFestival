
export default class GameoverScene extends Phaser.Scene{

  constructor(config){
    super(config);
  }

  init(){
    console.log(`GameoverScene INIT`);

    
  }
  preload(){
    console.log(`GameoverScene PRELOAD`);
   
  }
  create(){
    console.log(`GameoverScene CREATE`);
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;

    this.titleText = this.add.text(screenCenterX, 200, 'GAME OVER', { fontFamily: 'armada bold, "Goudy Bookletter 1911", Times, serif', fontSize: '50px', align: 'center' }).setOrigin(0.5);
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