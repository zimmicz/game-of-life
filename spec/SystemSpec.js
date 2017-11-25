const System = require("../lib/System");
const Cell = require("../lib/Cell");

describe("System", function() {
    let mySystem;

    beforeEach(function() {
        mySystem = new System(4, 4);
    });

    it("can have population", function() {
        expect(mySystem.grid[0][0] instanceof Cell).toBe(true);
    });

    it("evolves", function() {
        mySystem.step();
    });
});
