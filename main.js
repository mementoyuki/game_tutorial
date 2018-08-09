enchant();

window.onload = function(){

	var core = new Core(320,320);
	core.preload('images/chara1.png','images/end.png','images/monster/monster3.gif','images/effect0.png');
	core.fps = 10;

	core.onload = function(){
		core.keybind('Z'.charCodeAt(0), 'a');
		var bat_counter = 0;

		var game_scene = function(){
			var scene = new Scene();

			//define of Bat
			var Bat = Class.create(Sprite,{
				initialize:function(x,y){
					Sprite.call(this,48,48);	
						this.image = core.assets['images/monster/monster3.gif'];
						this.x = x;
						this.y = y;
						this.frame = 1; 
						this.tl
							.moveBy(rand(100),-rand(10),rand(100),enchant.Easing.BOUNCE_EASEOUT)
							.moveBy(-rand(100),rand(10),rand(100),enchant.Easing.BOUNCE_EASEOUT)
							.loop();
						this.on('enterframe',function(){
							if(this.within(bear,10)){
								core.replaceScene(gameover_scene());
							};
							this.frame = (this.age % 3) + 8
						})
					scene.addChild(this);
					}
			});
			//random bats
			var bats = [];
				for(var i=0 ; i < 10 ; ++i){
					bats[i] = new Bat(rand(320),rand(320));
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
			//config for bullets
			var Bullet = Class.create(Sprite,{
				initialize:function(){
					Sprite.call(this,16,16);
					this.image = core.assets['images/effect0.png']
					this.frame = 1;
					this.x = bear.x + 10;
					this.y = bear.y + 20;
					this.on('enterframe',function(){
						this.x +=10;
						for(var i in bats){
							if(this.within(bats[i],10)){
								scene.removeChild(this);
								scene.removeChild(bats[i]);
								bat_counter += 1; 
							}
							if(bat_counter > 10 ){
								core.replaceScene(gameclear_scene());
								bat_counter = 0;
							}
						}
					})
				}
			})

			scene.on('abuttondown',function(){
				var bullet = new Bullet;
				scene.addChild(bullet);
			})

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
						bat_counter = 0;
					});
				return scene;
			}

			var gameclear_scene = function(){
				var scene = new Scene();
				scene.backgroundColor = 'red';	
				scene.on('touchstart',function(){
						core.replaceScene(game_scene());
						bat_counter = 0;
					});
					var label = new Label;
					label.x = 70;
					label.y = 70;
					label.text = 'GAME CLEAR';
					label.color = 'white';
					scene.addChild(label);
				return scene;
	
			}


			core.replaceScene(game_scene());
	};

	core.start();
};
