const Cell = require("../lib/Cell");
const System = require("../lib/System");

describe("Cell", function() {
    let myCell;
    let mySystem = new System(8, 8);

    beforeEach(function() {
        myCell = mySystem.grid[0][0];
    });

    it("has a state", function() {
        expect(typeof myCell.isAlive).toBe("function");
    });

    it("is on the first row", function() {
        expect(myCell.getX()).toEqual(0);
    });

    it("is in the first column", function() {
        expect(myCell.getY()).toEqual(0);
    });

    it("has 3 neighbors", function() {
        const neighbors = myCell.getNeighbors();
        const expected = [[0, 1], [1, 1], [1, 0]];

        neighbors.forEach((n) => {
            let found = false;
            expected.forEach((e) => {
                if (n.getX() === e[0] && n.getY() === e[1]) {
                    found = true;
                }
            });
            expect(found).toBe(true);
        });
    });

    it("has 8 neighbors", function() {
        const myCenterCell = mySystem.grid[4][4];
        const neighbors = myCenterCell.getNeighbors();
        const expected = [
            [3, 3],
            [3, 4],
            [3, 5],
            [4, 3],
            [4, 5],
            [5, 3],
            [5, 4],
            [5, 5]
        ];
        neighbors.forEach((n) => {
            let found = false;
            expected.forEach((e) => {
                if (n.getX() === e[0] && n.getY() === e[1]) {
                    found = true;
                }
            });
            expect(found).toBe(true);
        });
    });
});
