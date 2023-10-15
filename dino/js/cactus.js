class Cactus {
  constructor() {
  	this.x = 500;
  	this.y = 200;
  	this.width = 50;
  	this.height = 50;
  }
	draw(ctx) {
		ctx.fillStyle = 'green';
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

export var cactus = new Cactus();
