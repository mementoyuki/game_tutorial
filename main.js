enchant();

window.onload = function(){

	var core = new Core(320,320);
	core.preload('images/chara1.png','images/end.png');
	core.fps = 10;

	core.onload = function(){


		var game_scene = function(){
			var scene = new Scene();

			//define of Bear
			var Bear = Class.create(Sprite,{
				initialize:function(x,y){
					Sprite.call(this,32,32);	
						this.image = core.assets['images/chara1.png'];
						this.x = x;
						this.y = y;
						this.frame = rand(5)
						this.opacity = rand(100)/100;
						this.tl
							.moveBy(rand(100),-rand(10),rand(100),enchant.Easing.BOUNCE_EASEOUT)
							.moveBy(-rand(10),rand(100),rand(100),enchant.Easing.BOUNCE_EASEOUT)
							.fadeOut(5)
							.fadeIn(5)
							.loop();
						this.on('enterframe',function(){
							if(this.within(bear,10)){

								core.replaceScene(gameover_scene());
							};
						})
					scene.addChild(this);
					}
			});
			//random bears
			var bears = [];
				for(var i=0 ; i < 10 ; ++i){
					bears[i] = new Bear(rand(320),rand(320));
				}

			//config for 'bear'
			var bear = new Sprite(32,32);
				bear.image = core.assets['images/chara1.png'];
				bear.x = 0;
				bear.y = 0;
				bear.frame = 1;
				bear.on('enterframe',function(){
					this.frame = this.age % 3;
					if (core.input.left) this.x -= 5;
					if (core.input.right) this.x += 5;
					if (core.input.up) this.y -= 5;
					if (core.input.down) this.y += 5;

			});
			scene.addChild(bear);
			return scene;
		}

			//random function
			function rand(n) {
				return Math.floor(Math.random() * (n + 1));
			}

			var gameover_scene = function(){
				var scene = new Scene();
					scene.backgroundColor = 'black';
				var end = new Sprite(189,97);
				scene.addChild(end);
					end.x = 70;
					end.y = 0;
					end.image = core.assets['images/end.png'];
					end.tl.moveBy(0,70,100).and().fadeIn(100);
					scene.on('touchstart',function(){
						core.replaceScene(game_scene());
					});
				return scene;
			}
	};
var initializer = function(){

} 

	core.start();
	core.replaceScene(game_scene())
};
