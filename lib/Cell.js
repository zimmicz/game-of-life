"use strict";
class Cell {
    constructor(x, y, alive, system) {
        this.x = x;
        this.y = y;
        this.alive = !!alive;
        this.system = system;
    }

    isAlive() {
        return this.alive;
    }

    setAlive(alive) {
        return this.alive = alive;
    }

    shouldDie() {
        const neighbors = this.getNeighbors();
        const alive = neighbors.filter((n) => n.isAlive());

        return this.isAlive() && (alive.length < 2 || alive.length > 3);
    }

    shouldLive() {
        const neighbors = this.getNeighbors();
        const alive = neighbors.filter((n) => n.isAlive());
        const dead = neighbors.filter((n) => !n.isAlive());
        const aliveShouldLive = this.isAlive() && (alive.length === 2 || alive.length ===3);
        const deadShoudLive = !this.isAlive() && alive.length === 3;

        return aliveShouldLive || deadShoudLive;
    }

    toggle() {
        if (this.shouldDie()) {
            return false;
        } else if (this.shouldLive()) {
            return true;
        } else {
            return this.alive;
        }
    }

    getNeighbors() {
        let self = this;
        let rows = [this.x - 1, this.x, this.x + 1].filter((r) => r > -1 && r < this.system.width);
        let cols = [this.y - 1, this.y, this.y + 1].filter((r) => r > -1 && r < this.system.height);
        let neighbors = [];

        rows.forEach(function(r) {
            cols.forEach(function(c) {
                if (r !== self.x || c !== self.y) {
                    neighbors.push(self.system.grid[r][c]);
                }
            });
        });

        return neighbors;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
}

module.exports = Cell;
