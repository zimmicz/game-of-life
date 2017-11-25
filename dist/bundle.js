(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{"./Cell":1}],3:[function(require,module,exports){
const System = require("./lib/System");

window.System = System;

},{"./lib/System":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvQ2VsbC5qcyIsImxpYi9TeXN0ZW0uanMiLCJtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRkE7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG5jbGFzcyBDZWxsIHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5LCBhbGl2ZSwgc3lzdGVtKSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMuYWxpdmUgPSAhIWFsaXZlO1xuICAgICAgICB0aGlzLnN5c3RlbSA9IHN5c3RlbTtcbiAgICB9XG5cbiAgICBpc0FsaXZlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hbGl2ZTtcbiAgICB9XG5cbiAgICBzZXRBbGl2ZShhbGl2ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hbGl2ZSA9IGFsaXZlO1xuICAgIH1cblxuICAgIHNob3VsZERpZSgpIHtcbiAgICAgICAgY29uc3QgbmVpZ2hib3JzID0gdGhpcy5nZXROZWlnaGJvcnMoKTtcbiAgICAgICAgY29uc3QgYWxpdmUgPSBuZWlnaGJvcnMuZmlsdGVyKChuKSA9PiBuLmlzQWxpdmUoKSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaXNBbGl2ZSgpICYmIChhbGl2ZS5sZW5ndGggPCAyIHx8IGFsaXZlLmxlbmd0aCA+IDMpO1xuICAgIH1cblxuICAgIHNob3VsZExpdmUoKSB7XG4gICAgICAgIGNvbnN0IG5laWdoYm9ycyA9IHRoaXMuZ2V0TmVpZ2hib3JzKCk7XG4gICAgICAgIGNvbnN0IGFsaXZlID0gbmVpZ2hib3JzLmZpbHRlcigobikgPT4gbi5pc0FsaXZlKCkpO1xuICAgICAgICBjb25zdCBkZWFkID0gbmVpZ2hib3JzLmZpbHRlcigobikgPT4gIW4uaXNBbGl2ZSgpKTtcbiAgICAgICAgY29uc3QgYWxpdmVTaG91bGRMaXZlID0gdGhpcy5pc0FsaXZlKCkgJiYgKGFsaXZlLmxlbmd0aCA9PT0gMiB8fCBhbGl2ZS5sZW5ndGggPT09Myk7XG4gICAgICAgIGNvbnN0IGRlYWRTaG91ZExpdmUgPSAhdGhpcy5pc0FsaXZlKCkgJiYgYWxpdmUubGVuZ3RoID09PSAzO1xuXG4gICAgICAgIHJldHVybiBhbGl2ZVNob3VsZExpdmUgfHwgZGVhZFNob3VkTGl2ZTtcbiAgICB9XG5cbiAgICB0b2dnbGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnNob3VsZERpZSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zaG91bGRMaXZlKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWxpdmU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXROZWlnaGJvcnMoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IHJvd3MgPSBbdGhpcy54IC0gMSwgdGhpcy54LCB0aGlzLnggKyAxXS5maWx0ZXIoKHIpID0+IHIgPiAtMSAmJiByIDwgdGhpcy5zeXN0ZW0ud2lkdGgpO1xuICAgICAgICBsZXQgY29scyA9IFt0aGlzLnkgLSAxLCB0aGlzLnksIHRoaXMueSArIDFdLmZpbHRlcigocikgPT4gciA+IC0xICYmIHIgPCB0aGlzLnN5c3RlbS5oZWlnaHQpO1xuICAgICAgICBsZXQgbmVpZ2hib3JzID0gW107XG5cbiAgICAgICAgcm93cy5mb3JFYWNoKGZ1bmN0aW9uKHIpIHtcbiAgICAgICAgICAgIGNvbHMuZm9yRWFjaChmdW5jdGlvbihjKSB7XG4gICAgICAgICAgICAgICAgaWYgKHIgIT09IHNlbGYueCB8fCBjICE9PSBzZWxmLnkpIHtcbiAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JzLnB1c2goc2VsZi5zeXN0ZW0uZ3JpZFtyXVtjXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBuZWlnaGJvcnM7XG4gICAgfVxuXG4gICAgZ2V0WCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueDtcbiAgICB9XG5cbiAgICBnZXRZKCkge1xuICAgICAgICByZXR1cm4gdGhpcy55O1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDZWxsO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5jb25zdCBDZWxsID0gcmVxdWlyZShcIi4vQ2VsbFwiKTtcblxuY2xhc3MgU3lzdGVtIHtcbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuZ3JpZCA9IFtdO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLnBvcHVsYXRlKCk7XG4gICAgICAgIHRoaXMudG9DYW52YXMoKTtcbiAgICB9XG5cbiAgICBwb3B1bGF0ZSgpIHtcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgdGhpcy53aWR0aDsgcm93ICs9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuZ3JpZFtyb3ddID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCB0aGlzLmhlaWdodDsgY29sICs9IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdyaWRbcm93XVtjb2xdID0gbmV3IENlbGwocm93LCBjb2wsIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSksIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0SGVpZ2h0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQ7XG4gICAgfVxuXG4gICAgZ2V0V2lkdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndpZHRoO1xuICAgIH1cblxuICAgIHN0ZXAoKSB7XG4gICAgICAgIGxldCBzdGF0ZSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IHJvdyBpbiB0aGlzLmdyaWQpIHtcbiAgICAgICAgICAgIHN0YXRlW3Jvd10gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbCBpbiB0aGlzLmdyaWRbcm93XSkge1xuICAgICAgICAgICAgICAgIHN0YXRlW3Jvd11bY29sXSA9IHRoaXMuZ3JpZFtyb3ddW2NvbF0udG9nZ2xlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCByb3cgaW4gc3RhdGUpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNvbCBpbiBzdGF0ZVtyb3ddKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW3Jvd11bY29sXS5zZXRBbGl2ZShzdGF0ZVtyb3ddW2NvbF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50b0NhbnZhcygpO1xuICAgIH1cblxuICAgIHRvQ2FudmFzKCkge1xuICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdvbFwiKTtcbiAgICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgY29uc3QgY2VsbFdpZHRoID0gNjAwIC8gdGhpcy5nZXRXaWR0aCgpO1xuICAgICAgICBjb25zdCBjZWxsSGVpZ2h0ID0gNjAwIC8gdGhpcy5nZXRIZWlnaHQoKTtcblxuICAgICAgICBmb3IgKGxldCByID0gMDsgciA8IHRoaXMuZ2V0V2lkdGgoKTsgciArPSAxKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjID0gMDsgYyA8IHRoaXMuZ2V0SGVpZ2h0KCk7IGMgKz0gMSkge1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmdyaWRbcl1bY10uaXNBbGl2ZSgpXG4gICAgICAgICAgICAgICAgICAgID8gXCJyZ2IoMCwwLDApXCJcbiAgICAgICAgICAgICAgICAgICAgOiBcInJnYigyNTUsMjU1LDI1NSlcIjtcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiNjY2NjY2NcIjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QociAqIGNlbGxXaWR0aCwgYyAqIGNlbGxIZWlnaHQsIGNlbGxXaWR0aCwgY2VsbEhlaWdodCk7XG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZVJlY3QociAqIGNlbGxXaWR0aCwgYyAqIGNlbGxIZWlnaHQsIGNlbGxXaWR0aCwgY2VsbEhlaWdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b0hUTUwoKSB7XG4gICAgICAgIGZvciAobGV0IHQgb2YgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ0YWJsZVwiKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcblxuICAgICAgICBmb3IgKGxldCByb3cgaW4gdGhpcy5ncmlkKSB7XG4gICAgICAgICAgICBsZXQgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XG4gICAgICAgICAgICBmb3IgKGxldCBjb2wgaW4gdGhpcy5ncmlkW3Jvd10pIHtcbiAgICAgICAgICAgICAgICBsZXQgdGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gICAgICAgICAgICAgICAgdGQuY2xhc3NOYW1lID0gdGhpcy5ncmlkW3Jvd11bY29sXS5pc0FsaXZlKClcbiAgICAgICAgICAgICAgICAgICAgPyBcImFsaXZlXCJcbiAgICAgICAgICAgICAgICAgICAgOiBcImRlYWRcIjtcbiAgICAgICAgICAgICAgICB0ci5hcHBlbmRDaGlsZCh0ZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YWJsZS5hcHBlbmRDaGlsZCh0cik7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRhYmxlKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3lzdGVtO1xuIiwiY29uc3QgU3lzdGVtID0gcmVxdWlyZShcIi4vbGliL1N5c3RlbVwiKTtcblxud2luZG93LlN5c3RlbSA9IFN5c3RlbTtcbiJdfQ==
