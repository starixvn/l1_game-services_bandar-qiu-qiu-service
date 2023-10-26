import { handRankingId } from "../../../src/constants";
import { calculateHand } from "../../../src/helpers/hand-helper";
import { bigHandTestCases, smallHandTestCases, twinTestCases, sixDevilTestCases, qiuQiuTestCases } from "./testcases";

describe("hand-helper tests", () => {
    describe("calculateHand", () => {
        describe("when hand is SixDevil", () => {
            it("should return expected", () => {
                // arrange
                const dominoes = sixDevilTestCases[0].dominoes;
                const expected = {
                    dominoes,
                    handRankingId: handRankingId.sixDevil,
                    pipsOfSet: null,
                };

                // act
                const actual = calculateHand(dominoes);

                // assert
                expect(actual).toEqual(expected);
            });
        });

        describe("when hand is Twin", () => {
            it.each(twinTestCases)("should return expected", ({ dominoes }) => {
                // arrange
                const expected = {
                    dominoes,
                    handRankingId: handRankingId.twin,
                    pipsOfSet: null,
                };

                // act
                const actual = calculateHand(dominoes);

                // assert
                expect(actual).toEqual(expected);
            });
        });

        describe("when hand is small", () => {
            it.each(smallHandTestCases)("should return expected", ({ dominoes }) => {
                // arrange
                const expected = {
                    dominoes,
                    handRankingId: handRankingId.small,
                    pipsOfSet: null,
                };

                // act
                const actual = calculateHand(dominoes);

                // assert
                expect(actual).toEqual(expected);
            });
        });

        describe("when hand is big", () => {
            it.each(bigHandTestCases)("should return expected", ({ dominoes }) => {
                // arrange
                const expected = {
                    dominoes,
                    handRankingId: handRankingId.big,
                    pipsOfSet: null,
                };

                // act
                const actual = calculateHand(dominoes);

                // assert
                expect(actual).toEqual(expected);
            });
        });

        describe("when hand is qiu qiu", () => {
            it.each(qiuQiuTestCases)("should return expected", ({ dominoes }) => {
                // arrange
                const expected = {
                    dominoes,
                    handRankingId: handRankingId.qiuQiu,
                    pipsOfSet: [9, 9],
                };

                // act
                const actual = calculateHand(dominoes);

                // assert
                expect(actual).toEqual(expected);
            });
        });

        describe("when hand is ordinary card", () => {
            const testCases = [
                { dominoes: ["15", "02", "44", "36"], pipsOfSet: [8, 7] },
                { dominoes: ["45", "00", "24", "14"], pipsOfSet: [9, 1] },
                { dominoes: ["44", "46", "00", "16"], pipsOfSet: [8, 7] },
                { dominoes: ["14", "04", "01", "03"], pipsOfSet: [9, 4] },
                { dominoes: ["16", "11", "55", "22"], pipsOfSet: [9, 4] },
                { dominoes: ["46", "06", "04", "15"], pipsOfSet: [6, 0] },
                { dominoes: ["12", "24", "34", "16"], pipsOfSet: [9, 4] },
                { dominoes: ["26", "01", "66", "35"], pipsOfSet: [9, 0] },
                { dominoes: ["00", "36", "56", "13"], pipsOfSet: [9, 5] },
                { dominoes: ["03", "15", "02", "05"], pipsOfSet: [9, 7] },
                { dominoes: ["16", "66", "24", "11"], pipsOfSet: [9, 8] },
                { dominoes: ["14", "04", "44", "55"], pipsOfSet: [9, 8] },
                { dominoes: ["01", "35", "12", "04"], pipsOfSet: [9, 7] },
                { dominoes: ["24", "03", "26", "14"], pipsOfSet: [9, 3] },
                { dominoes: ["15", "12", "35", "23"], pipsOfSet: [9, 3] },
            ];
            it.each(testCases)("should return expected", ({ dominoes, pipsOfSet }) => {
                // arrange
                const expected = {
                    dominoes,
                    handRankingId: handRankingId.ordinaryCard,
                    pipsOfSet,
                };

                // act
                const actual = calculateHand(dominoes);

                // assert
                expect(actual).toEqual(expected);
            });
            const testCasesInCheckList = [
                { dominoes: ["25", "33", "24", "34"], sortedDominoes: ["25", "34", "33", "24"], pipsOfSet: [4, 2] },
                { dominoes: ["33", "05", "23", "44"], sortedDominoes: ["33", "44", "05", "23"], pipsOfSet: [4, 0] },
                { dominoes: ["12", "01", "66", "11"], sortedDominoes: ["12", "66", "01", "11"], pipsOfSet: [5, 3] },
                { dominoes: ["46", "04", "15", "06"], sortedDominoes: ["46", "15", "04", "06"], pipsOfSet: [6, 0] },
                { dominoes: ["34", "23", "45", "14"], sortedDominoes: ["34", "45", "23", "14"], pipsOfSet: [6, 0] },
                { dominoes: ["55", "01", "14", "23"], sortedDominoes: ["01", "14", "55", "23"], pipsOfSet: [6, 5] },
                { dominoes: ["26", "35", "02", "03"], sortedDominoes: ["26", "35", "02", "03"], pipsOfSet: [6, 5] },
                { dominoes: ["03", "26", "44", "02"], sortedDominoes: ["26", "44", "03", "02"], pipsOfSet: [6, 5] },
                { dominoes: ["44", "35", "03", "02"], sortedDominoes: ["44", "35", "03", "02"], pipsOfSet: [6, 5] },
                { dominoes: ["26", "12", "35", "02"], sortedDominoes: ["26", "35", "12", "02"], pipsOfSet: [6, 5] },
                { dominoes: ["26", "44", "02", "12"], sortedDominoes: ["26", "44", "02", "12"], pipsOfSet: [6, 5] },
                { dominoes: ["12", "35", "44", "02"], sortedDominoes: ["35", "44", "12", "02"], pipsOfSet: [6, 5] },
                { dominoes: ["26", "35", "03", "11"], sortedDominoes: ["26", "35", "03", "11"], pipsOfSet: [6, 5] },
                { dominoes: ["12", "04", "44", "66"], sortedDominoes: ["12", "04", "44", "66"], pipsOfSet: [7, 0] },
                { dominoes: ["11", "23", "55", "00"], sortedDominoes: ["11", "23", "55", "00"], pipsOfSet: [7, 0] },
                { dominoes: ["06", "56", "23", "14"], sortedDominoes: ["06", "56", "23", "14"], pipsOfSet: [7, 0] },
                { dominoes: ["26", "06", "45", "16"], sortedDominoes: ["26", "45", "06", "16"], pipsOfSet: [7, 3] },
                { dominoes: ["16", "03", "22", "25"], sortedDominoes: ["03", "22", "16", "25"], pipsOfSet: [7, 4] },
                { dominoes: ["01", "15", "00", "22"], sortedDominoes: ["01", "15", "00", "22"], pipsOfSet: [7, 4] },
                { dominoes: ["66", "05", "11", "02"], sortedDominoes: ["66", "05", "11", "02"], pipsOfSet: [7, 4] },
                { dominoes: ["26", "45", "04", "66"], sortedDominoes: ["26", "45", "04", "66"], pipsOfSet: [7, 6] },
                { dominoes: ["35", "46", "44", "05"], sortedDominoes: ["35", "46", "44", "05"], pipsOfSet: [8, 3] },
                { dominoes: ["05", "03", "25", "35"], sortedDominoes: ["05", "03", "25", "35"], pipsOfSet: [8, 5] },
                { dominoes: ["24", "66", "26", "44"], sortedDominoes: ["24", "66", "26", "44"], pipsOfSet: [8, 6] },
                { dominoes: ["15", "02", "44", "36"], sortedDominoes: ["15", "02", "44", "36"], pipsOfSet: [8, 7] },
                { dominoes: ["00", "44", "12", "22"], sortedDominoes: ["00", "44", "12", "22"], pipsOfSet: [8, 7] },
                { dominoes: ["12", "00", "23", "25"], sortedDominoes: ["12", "23", "00", "25"], pipsOfSet: [8, 7] },
                { dominoes: ["12", "23", "00", "34"], sortedDominoes: ["12", "23", "00", "34"], pipsOfSet: [8, 7] },
                { dominoes: ["13", "00", "16", "22"], sortedDominoes: ["13", "22", "00", "16"], pipsOfSet: [8, 7] },
                { dominoes: ["00", "13", "22", "25"], sortedDominoes: ["13", "22", "00", "25"], pipsOfSet: [8, 7] },
                { dominoes: ["13", "00", "22", "34"], sortedDominoes: ["13", "22", "00", "34"], pipsOfSet: [8, 7] },
                { dominoes: ["00", "26", "14", "66"], sortedDominoes: ["00", "26", "14", "66"], pipsOfSet: [8, 7] },
                { dominoes: ["00", "35", "14", "66"], sortedDominoes: ["00", "35", "14", "66"], pipsOfSet: [8, 7] },
                { dominoes: ["00", "44", "14", "66"], sortedDominoes: ["00", "44", "14", "66"], pipsOfSet: [8, 7] },
                { dominoes: ["16", "56", "00", "25"], sortedDominoes: ["16", "56", "00", "25"], pipsOfSet: [8, 7] },
                { dominoes: ["00", "26", "16", "46"], sortedDominoes: ["00", "26", "16", "46"], pipsOfSet: [8, 7] },
                { dominoes: ["00", "26", "16", "55"], sortedDominoes: ["00", "26", "16", "55"], pipsOfSet: [8, 7] },
                { dominoes: ["16", "56", "00", "34"], sortedDominoes: ["16", "56", "00", "34"], pipsOfSet: [8, 7] },
                { dominoes: ["00", "35", "16", "46"], sortedDominoes: ["00", "35", "16", "46"], pipsOfSet: [8, 7] },
                { dominoes: ["00", "35", "16", "55"], sortedDominoes: ["00", "35", "16", "55"], pipsOfSet: [8, 7] },
                { dominoes: ["00", "44", "16", "46"], sortedDominoes: ["00", "44", "16", "46"], pipsOfSet: [8, 7] },
                { dominoes: ["16", "00", "44", "55"], sortedDominoes: ["00", "44", "16", "55"], pipsOfSet: [8, 7] },
                { dominoes: ["00", "26", "23", "66"], sortedDominoes: ["00", "26", "23", "66"], pipsOfSet: [8, 7] },
                { dominoes: ["55", "03", "26", "14"], sortedDominoes: ["55", "26", "03", "14"], pipsOfSet: [8, 8] },
                { dominoes: ["45", "26", "01", "56"], sortedDominoes: ["26", "01", "45", "56"], pipsOfSet: [9, 0] },
                { dominoes: ["12", "24", "02", "35"], sortedDominoes: ["12", "24", "02", "35"], pipsOfSet: [9, 0] },
                { dominoes: ["45", "00", "24", "14"], sortedDominoes: ["45", "00", "24", "14"], pipsOfSet: [9, 1] },
                { dominoes: ["23", "13", "66", "00"], sortedDominoes: ["23", "13", "66", "00"], pipsOfSet: [9, 2] },
                { dominoes: ["11", "33", "06", "25"], sortedDominoes: ["11", "25", "33", "06"], pipsOfSet: [9, 2] },
                { dominoes: ["22", "66", "56", "05"], sortedDominoes: ["22", "05", "66", "56"], pipsOfSet: [9, 3] },
                { dominoes: ["24", "03", "26", "14"], sortedDominoes: ["24", "03", "26", "14"], pipsOfSet: [9, 3] },
                { dominoes: ["15", "12", "35", "23"], sortedDominoes: ["15", "12", "35", "23"], pipsOfSet: [9, 3] },
                { dominoes: ["14", "04", "01", "03"], sortedDominoes: ["14", "04", "01", "03"], pipsOfSet: [9, 4] },
                { dominoes: ["16", "55", "22", "11"], sortedDominoes: ["16", "11", "55", "22"], pipsOfSet: [9, 4] },
                { dominoes: ["05", "02", "04", "03"], sortedDominoes: ["05", "04", "02", "03"], pipsOfSet: [9, 5] },
                { dominoes: ["44", "46", "01", "05"], sortedDominoes: ["44", "01", "46", "05"], pipsOfSet: [9, 5] },
                { dominoes: ["66", "36", "16", "06"], sortedDominoes: ["66", "16", "36", "06"], pipsOfSet: [9, 5] },
                { dominoes: ["13", "34", "14", "55"], sortedDominoes: ["13", "14", "34", "55"], pipsOfSet: [9, 7] },
                { dominoes: ["24", "16", "66", "11"], sortedDominoes: ["16", "66", "24", "11"], pipsOfSet: [9, 8] },
                { dominoes: ["11", "36", "34", "45"], sortedDominoes: ["11", "34", "36", "45"], pipsOfSet: [9, 8] },
            ];
            testCasesInCheckList.forEach((testCase, index) => {
                it(`STT: ${index + 1} - point checklist - should sort dominoes ${JSON.stringify(
                    testCase.sortedDominoes
                )} and get correct pipsOfSet ${JSON.stringify(testCase.pipsOfSet)}`, () => {
                    // arrange
                    const { dominoes, pipsOfSet, sortedDominoes } = testCase;

                    // act
                    const hand = calculateHand(dominoes);

                    // assert
                    expect(hand.dominoes).toEqual(sortedDominoes);
                    expect(hand.pipsOfSet).toEqual(pipsOfSet);
                    expect(hand.handRankingId).toEqual(handRankingId.ordinaryCard);
                });
            });
        });
    });
});
