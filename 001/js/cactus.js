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
	cactusArray : [],
	draw(ctx, timer) {
		if (timer % 120 === 0) {
			this.cactusArray.push(new CACTUS());
		}

		this.cactusArray.forEach((a)=> {
			a.x--;
			a.draw(ctx);
		});
	}
}
