"use strict";
const Cell = require("./Cell");

class System {
    constructor(width, height) {
        this.grid = [];
        this.height = height;
        this.width = width;
        this.populate();
        this.toCanvas();
    }

    populate() {
        for (let row = 0; row < this.width; row += 1) {
            this.grid[row] = [];
            for (let col = 0; col < this.height; col += 1) {
                this.grid[row][col] = new Cell(row, col, Math.round(Math.random()), this);
            }
        }
    }

    getHeight() {
        return this.height;
    }

    getWidth() {
        return this.width;
    }

    step() {
        let state = [];

        for (let row in this.grid) {
            state[row] = [];
            for (let col in this.grid[row]) {
                state[row][col] = this.grid[row][col].toggle();
            }
        }

        for (let row in state) {
            for (let col in state[row]) {
                this.grid[row][col].setAlive(state[row][col]);
            }
        }

        this.toCanvas();
    }

    toCanvas() {
        if (typeof document === "undefined") {
            return;
        }

        const canvas = document.getElementById("gol");
        const ctx = canvas.getContext("2d");
        const cellWidth = 600 / this.getWidth();
        const cellHeight = 600 / this.getHeight();

        for (let r = 0; r < this.getWidth(); r += 1) {
            for (let c = 0; c < this.getHeight(); c += 1) {
                ctx.fillStyle = this.grid[r][c].isAlive()
                    ? "rgb(0,0,0)"
                    : "rgb(255,255,255)";
                ctx.strokeStyle = "#cccccc";
                ctx.fillRect(r * cellWidth, c * cellHeight, cellWidth, cellHeight);
                ctx.strokeRect(r * cellWidth, c * cellHeight, cellWidth, cellHeight);
            }
        }
    }

    toHTML() {
        if (typeof document === "undefined") {
            return;
        }

        for (let t of document.getElementsByTagName("table")) {
            document.body.removeChild(t);
        }

        let table = document.createElement("table");

        for (let row in this.grid) {
            let tr = document.createElement("tr");
            for (let col in this.grid[row]) {
                let td = document.createElement("td");
                td.className = this.grid[row][col].isAlive()
                    ? "alive"
                    : "dead";
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }

        document.body.appendChild(table);
    }
}

module.exports = System;
