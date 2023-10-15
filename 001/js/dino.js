class DINO {
  constructor() {
  	this.x = 10;
  	this.y = 200;
  	this.width = 50;
  	this.height = 50;
  }
  draw(ctx) {
	ctx.fillStyle = 'green';
	ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export var DINOMANAGER = {
	dino = new DINO(),
	draw(ctx) {
		this.dino.draw(ctx);
	}
}
