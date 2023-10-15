class Cactus {
  constructor() {
  	x : 500,
  	y : 200,
  	width : 50,
  	height : 50
  }
	draw(ctx) {
		ctx.fillStyle = 'green';
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

export var cactus = new Cactus();
