enchant();

var game = null;
var originX, originY;
var kumaCount = 0;
var game_width = 400;
var game_hight = 300;

window.onload = function(){
game = new Game(game_width, game_hight);
game.score = 0;
game.time = 30;
game.fps = 30;
game.preload('./assets/images/chara1.png');
game.preload('./assets/images/map0.png');
game.preload('./assets/images/icon0.png');

game.onload = function() {
  var scene = game.rootScene;
  scene.backgroundColor = 'gray';
  var kuma = new Kuma();
  kuma.speed = 0;
  kuma.scaleX = 3;
  kuma.scaleY = 3;
  kuma.moveTo(350, 40)
  scene.addChild(kuma);
  var kuam2 = new Kuma();
  kuam2.frame = 5;
  kuam2.speed = 0;
  kuam2.scaleX = 3;
  kuam2.scaleY = 3;
  kuam2.moveTo(70, 40)
  scene.addChild(kuam2);
  //スコアラベル作成
  var scoreLabel = new Label("SCORE : 0");
  scoreLabel.font = "16px Tahoma";
  scoreLabel.color = "white";
  scene.addChild(scoreLabel);
  var katen = new Label();
  katen.font = "10px Tahome";
  katen.color = "red";
  katen.x = this.x;
  katen.y = this.y;
  katen.onenterframe = function() {
	  this.y -= 1;
  }
  var out =  new Sprite(16, 16);
  out.image = game.assets['./assets/images/icon0.png'];
  out.frame = 11;
  out.x = this.x;
  out.y = this.y;
  out.onenterframe = function() {
	  this.y -= 1;
  }
  //タイムリミット作成
  var timeLabel = new Label();
  timeLabel.text = 'Time: ' + game.time;
  timeLabel.font = "16px Tahoma";
  timeLabel.x = 320;
  timeLabel.addEventListener('enterframe',function(e){
	  if(game.frame % game.fps == 0){
		  game.time --;
		  this.text = 'Time: ' + game.time;
		  if(game.time == 0){
        alert(game.score + "得点でした！");
        game.time = -1;
      }
    }
  });
  game.rootScene.addChild(timeLabel);

  scene.onenterframe = function() {
    var kuma = new Kuma(0);
    var x = Math.floor(Math.random()*(250-150)+150);
    var y = 0;
    kuma.moveTo(x, y);
    var kuma2 = new Kuma(5);
    var x = Math.floor(Math.random()*(250-150)+150);
    var y = 0;
    kuma2.moveTo(x, y);
    if (game.frame % 20 == 0) {
      if (kumaCount % 5 == 0) {
      scene.addChild(kuma);
      kumaCount++;
      }else if (kumaCount % 6 == 0){
      scene.addChild(kuma2);
      kumaCount++;
      }else if(kumaCount > 10){
        if (kumaCount % 2 == 0) {
        scene.addChild(kuma);
        var timer = function(){
          scene.removeChild(kuma);
          game.score = game.score - 100;
          scoreLabel.text = "SCORE : "+game.score;
          }
          setTimeout(timer, 10000);     
        } 
        kumaCount++;
        }else {
        kumaCount++;
      }
    };
    function dd(xx, yy, z){
    z.addEventListener('enterframe', function() {
      if (this.intersect(xx)) {
        this.vy = Math.floor ? 0 : 1;
        scene.removeChild(z);
        game.score = game.score + 100;	// スコアを加算(10点)
        scoreLabel.text = "SCORE : "+game.score;
        katen.text = "+100";
        katen.moveTo(this.x, this.y);
        scene.addChild(katen);
      }else if (this.intersect(yy)){
        scene.removeChild(z);
        game.score = game.score - 100;
        scoreLabel.text = "SCORE : "+game.score;
        katen.text = "-100";
        scene.addChild(katen);
        katen.moveTo(this.x, this.y);
        scene.addChild(katen);
        out.moveTo(this.x + 5, this.y +15);
        scene.addChild(out);
      }
    });
  }
  dd(map, map2, kuma);
  dd(map2, map, kuma2);
    kuma.addEventListener(enchant.Event.TOUCH_START, function(e){
      originX = e.x - this.x;
      originY = e.y - this.y;
    });
    kuma.addEventListener(enchant.Event.TOUCH_MOVE, function(e){
      this.x = e.x - originX;
      this.y = e.y - originY;
    });
    kuma2.addEventListener(enchant.Event.TOUCH_START, function(e){
      originX = e.x - this.x;
      originY = e.y - this.y;
    });
    kuma2.addEventListener(enchant.Event.TOUCH_MOVE, function(e){
      this.x = e.x - originX;
      this.y = e.y - originY;
    });
  }
  var map = new Map(16, 16);
  map.image = game.assets['./assets/images/map0.png'];
  map.loadData([
    [20,20,20,20,20,20],
    [,,,,,20],
    [,,,,,20],
    [,,,,,20],
    [20,20,20,20,20,20]
  ]);
  map.x = 304
  map.y = 100;
  game.rootScene.addChild(map);
  var map2 = new Map(16, 16);
  map2.image = game.assets['./assets/images/map0.png'];
  map2.loadData([
    [21,21,21,21,21,21],
    [21],
    [21],
    [21],
    [21,21,21,21,21,21]
  ]);
  map2.x = 0;
  map2.y = 100;
  game.rootScene.addChild(map2);
}
game.start();
};
var Kuma = Class.create(Sprite, {
  // 初期化
  initialize: function(id) {
    Sprite.call(this, 32, 32);
    this.image = game.assets["./assets/images/chara1.png"];
    this.frame = id;
	  this.vx = 0;
	  this.vy = Math.floor ? +1 : 1
	  this.speed = 2;
  },
// クマ系クラス共通処理
  onenterframe: function() {
// 更新処理
    this.update();
  },
// 更新
  update: function() {
// TODO: 動きを変更したいときはここに書く(継承先も同様)
// 移動
    this.x += this.vx * this.speed;
    this.y += this.vy * this.speed;
    this.control();
  },
// 画面からはみ出ないよう制御
  control: function() {
    var left   = 0;
    var right  = game_hight;
    var top    = 0;
    var bottom = game_hight;
    if (this.x < left) {
      this.x = left; this.vx *= -1; this.scaleX *= -1;
    }
    if (this.x > right) {
      this.x = right; this.vx *= -1; this.scaleX *= -1;
    }
    if (this.y < top) {
      this.y = left; this.vy *= -1;
    }
    if (this.y > bottom) {
      this.y = right; this.vy *= -1;
    }
  }
});