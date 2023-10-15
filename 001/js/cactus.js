class CACTUS {
  constructor() {
  	this.x = 500;
  	this.y = 200;
  	this.width = 50;
  	this.height = 50;
  }
  draw(ctx) {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export var CACTUSMANAGER = {
	cactus : new CACTUS(),
	draw(ctx) {
		this.cactus.draw(ctx);
	}
}