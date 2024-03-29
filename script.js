let game = {
    canvas: null,
    ctx: null,
    board: null,
    snake: null,
    width: 0,
    height: 0,
    dimensions: {
        max: {
            width: 640,
            height: 360
        },
        min: {
            width: 300,
            height:300
        }
    },
    sprite: {
        background: null,
        cell: null,
        body: null,
        food: null
    },
    start() {
        this.init();
        this.preload(() => {
            this.run();
        });
    },
    init() {
        this.canvas = document.getElementById('mycanvas');
        this.ctx = this.canvas.getContext('2d');
        this.initDimensions();
    },
    initDimensions() {
      let data = {
          maxWidth: this.dimensions.max.width,
          maxHeight: this.dimensions.max.height,
          minWidth: this.dimensions.min.width,
          minHeight: this.dimensions.min.height,
          realWidth: window.innerWidth,
          realHeight: window.innerHeight
      };

      if (data.realWidth/data.realHeight > data.maxWidth/data.maxHeight) {
        this.firWidth(data);
      } else {
          this.fitHeight(data);
      }

      this.fitHeight(data);

      this.canvas.width = this.width;
      this.canvas.height = this.height;

    },
    firWidth(data) {
        this.height = Math.round(this.width * data.realHeight / data.realWidth);
        this.height = Math.min(this.height, data.maxHeight);
        this.height = Math.max(this.height, data.minHeight);
        this.width = Math.round(data.realWidth * this.height / data.realHeight);
        this.canvas.style.widows = '100%';
    },
    fitHeight(data) {
        this.width = Math.floor(data.realWidth * data.maxHeight / data.realHeight);
        this.width = Math.min(this.width, data.maxWidth);
        this.width = Math.max(this.width, data.minWidth);
        this.height = Math.floor(this.width * data.realHeight / data.realWidth);
        this.canvas.style.height = '100%';
    },
    preload(callback) {
        let loaded = 0;
        let required = Object.keys(this.sprite).length;
        let onAssetLoad = () => {
            ++loaded;

            if (loaded >= required) {
                callback();
            }
        };
        for (let key in this.sprite) {
            this.sprite[key] = new Image();
            this.sprite[key].src = './img/'+key+'.png';
            this.sprite[key].addEventListener('load', onAssetLoad)
        }
    },
    create() {
        this.board.create();
        this.snake.create();
        this.board.createFood();
        window.addEventListener('keydown', (e) => {
           this.snake.start(e.keyCode);
        });
    },
    render() {
        window.requestAnimationFrame(() => {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.ctx.drawImage(this.sprite.background, (this.width - this.sprite.background.width) / 2, (this.height - this.sprite.background.height) / 2);
            this.board.render();
            this.snake.render();
        });
    },
    update() {
        this.snake.move();
        this.render();
    },
    run() {
        this.create();

        setInterval(() => {
            this.update();
        }, 150);


    }
};

game.start();




