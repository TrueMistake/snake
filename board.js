game.board = {
    game: game,
    size: 15,
    cells: [],
    create() {
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                let cell = this.createCell(row, col);
                this.cells.push(cell);
            }
        }
    },
    createCell(row, col) {
        let cellSize = this.game.sprite.cell.width + 1;
        let offsetX = (this.game.width - cellSize * this.size) / 2;
        let offsetY = (this.game.height - cellSize * this.size) / 2;
        let cell = {
            row: row,
            col: col,
            x: offsetX + cellSize * col,
            y: offsetY + cellSize * row
        };
        return cell;
    },
    createFood() {
        let cell = this.cells[0];
        cell.hasFood = true;
    },
    getCell(row,col) {
        return this.cells.find(cell => cell.row === row && cell.col === col);
    },
    render() {
        console.log('132');
        this.cells.forEach(cell => {
            this.game.ctx.drawImage(this.game.sprite.cell, cell.x, cell.y);
            if (cell.hasFood) {
                this.game.ctx.drawImage(this.game.sprite.food, cell.x, cell.y);
            }

        })
    }
};







