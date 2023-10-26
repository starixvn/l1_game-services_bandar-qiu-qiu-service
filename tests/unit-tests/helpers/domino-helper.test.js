import { isBigDomino, isDoubleDomino, getTotalPipsOnDomino } from "../../../src/helpers/domino-helper";

describe("domino-helper tests", () => {
    describe("isBigDomino", () => {
        const testCase = [
            { domino: "05", expected: true },
            { domino: "06", expected: true },
            { domino: "15", expected: true },
            { domino: "16", expected: true },
            { domino: "24", expected: true },
            { domino: "25", expected: true },
            { domino: "26", expected: true },
            { domino: "34", expected: true },
            { domino: "35", expected: true },
            { domino: "36", expected: true },
            { domino: "45", expected: true },
            { domino: "46", expected: true },
            { domino: "56", expected: true },
            { domino: "00", expected: false },
            { domino: "01", expected: false },
            { domino: "02", expected: false },
            { domino: "03", expected: false },
            { domino: "04", expected: false },
            { domino: "11", expected: false },
            { domino: "12", expected: false },
            { domino: "13", expected: false },
            { domino: "14", expected: false },
            { domino: "22", expected: false },
            { domino: "23", expected: false },
            { domino: "33", expected: false },
            { domino: "44", expected: false },
            { domino: "55", expected: false },
            { domino: "66", expected: false },
        ];
        it.each(testCase)("should return expected", ({ domino, expected }) => {
            // act
            const actual = isBigDomino(domino);

            // assert
            expect(actual).toBe(expected);
        });
    });

    describe("isDoubleDomino", () => {
        const testCase1 = ["00", "11", "22", "33", "44", "55", "66"];
        const testCase2 = ["01", "12", "24", "35"];
        it.each(testCase1)("should return true when is double domino", (domino) => {
            // act
            const actual = isDoubleDomino(domino);

            // assert
            expect(actual).toBe(true);
        });

        it.each(testCase2)("should return false when is not double domino", (domino) => {
            // act
            const actual = isDoubleDomino(domino);

            // assert
            expect(actual).toBe(false);
        });
    });

    describe("getTotalPipsOnDomino", () => {
        const testCase = [
            { domino: "01", expected: 1 },
            { domino: "02", expected: 2 },
            { domino: "13", expected: 4 },
            { domino: "24", expected: 6 },
            { domino: "33", expected: 6 },
            { domino: "45", expected: 9 },
            { domino: "66", expected: 12 },
            { domino: "56", expected: 11 },
        ];
        it.each(testCase)("should return expected", ({ domino, expected }) => {
            // act
            const actual = getTotalPipsOnDomino(domino);

            // assert
            expect(actual).toBe(expected);
        });
    });
});
