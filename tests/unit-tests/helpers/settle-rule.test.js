import { Chance } from "chance";
import { bigHandTestCases, qiuQiuTestCases, sixDevilTestCases, smallHandTestCases, twinTestCases } from "./testcases";
import { settlementResultMapper } from "../../../src/constants";
import { calculateHand } from "../../../src/helpers/hand-helper";
import { settleHand } from "../../../src/helpers/settle-rule";

const chance = new Chance();
describe("settle-rule tests", () => {
    describe("settleHand", () => {
        const sixDevil = calculateHand(sixDevilTestCases[0].dominoes);
        const twinSets = chance.pickset(twinTestCases, 2);
        const twin = calculateHand(twinSets[0].dominoes);
        const twin2 = calculateHand(twinSets[1].dominoes);
        const smallSets = chance.pickset(smallHandTestCases, 2);
        const small = calculateHand(smallSets[0].dominoes);
        const small2 = calculateHand(smallSets[1].dominoes);
        const bigSets = chance.pickset(bigHandTestCases, 2);
        const big = calculateHand(bigSets[0].dominoes);
        const big2 = calculateHand(bigSets[1].dominoes);
        const qiuQiuSets = chance.pickset(qiuQiuTestCases, 2);
        const qiuQiu = calculateHand(qiuQiuSets[0].dominoes);
        const qiuQiu2 = calculateHand(qiuQiuSets[1].dominoes);
        const ordinaryCard = calculateHand(["15", "02", "44", "36"]);
        describe("when other hand ranking > banker hand ranking", () => {
            const testCases = [
                {
                    name: "other is Six Devil, banker is Twin",
                    otherHand: sixDevil,
                    bankerHand: twin,
                },
                {
                    name: "other is Six Devil, banker is Small",
                    otherHand: sixDevil,
                    bankerHand: small,
                },
                {
                    name: "other is Six Devil, banker is Big",
                    otherHand: sixDevil,
                    bankerHand: big,
                },
                {
                    name: "other is Six Devil, banker is Qiu Qiu",
                    otherHand: sixDevil,
                    bankerHand: qiuQiu,
                },
                {
                    name: "other is Six Devil, banker is Ordinary Card",
                    otherHand: sixDevil,
                    bankerHand: ordinaryCard,
                },
                {
                    name: "other is Twin, banker is Small",
                    otherHand: twin,
                    bankerHand: small,
                },
                {
                    name: "other is Twin, banker is Small",
                    otherHand: twin,
                    bankerHand: big,
                },
                {
                    name: "other is Twin, banker is Small",
                    otherHand: twin,
                    bankerHand: qiuQiu,
                },
                {
                    name: "other is Twin, banker is Small",
                    otherHand: twin,
                    bankerHand: ordinaryCard,
                },
                {
                    name: "other is Twin, banker is Small",
                    otherHand: small,
                    bankerHand: big,
                },
                {
                    name: "other is Twin, banker is Small",
                    otherHand: small,
                    bankerHand: qiuQiu,
                },
                {
                    name: "other is Twin, banker is Small",
                    otherHand: small,
                    bankerHand: ordinaryCard,
                },
                {
                    name: "other is Twin, banker is Small",
                    otherHand: big,
                    bankerHand: qiuQiu,
                },
                {
                    name: "other is Twin, banker is Small",
                    otherHand: big,
                    bankerHand: ordinaryCard,
                },
                {
                    name: "other is Twin, banker is Small",
                    otherHand: qiuQiu,
                    bankerHand: ordinaryCard,
                },
            ];
            it.each(testCases)("should return win", ({ otherHand, bankerHand }) => {
                // act
                const actual = settleHand(bankerHand, otherHand);

                // assert
                expect(actual).toBe(settlementResultMapper.win);
            });
        });
        describe("when other hand ranking < banker hand ranking", () => {
            const testCases = [
                {
                    name: "other is Six Devil, banker is Twin",
                    bankerHand: sixDevil,
                    otherHand: twin,
                },
                {
                    name: "other is Six Devil, banker is Small",
                    bankerHand: sixDevil,
                    otherHand: small,
                },
                {
                    name: "other is Six Devil, banker is Big",
                    bankerHand: sixDevil,
                    otherHand: big,
                },
                {
                    name: "other is Six Devil, banker is Qiu Qiu",
                    bankerHand: sixDevil,
                    otherHand: qiuQiu,
                },
                {
                    name: "other is Six Devil, banker is Ordinary Card",
                    bankerHand: sixDevil,
                    otherHand: ordinaryCard,
                },
                {
                    name: "other is Twin, banker is Small",
                    bankerHand: twin,
                    otherHand: small,
                },
                {
                    name: "other is Twin, banker is Small",
                    bankerHand: twin,
                    otherHand: big,
                },
                {
                    name: "other is Twin, banker is Small",
                    bankerHand: twin,
                    otherHand: qiuQiu,
                },
                {
                    name: "other is Twin, banker is Small",
                    bankerHand: twin,
                    otherHand: ordinaryCard,
                },
                {
                    name: "other is Twin, banker is Small",
                    bankerHand: small,
                    otherHand: big,
                },
                {
                    name: "other is Twin, banker is Small",
                    bankerHand: small,
                    otherHand: qiuQiu,
                },
                {
                    name: "other is Twin, banker is Small",
                    bankerHand: small,
                    otherHand: ordinaryCard,
                },
                {
                    name: "other is Twin, banker is Small",
                    bankerHand: big,
                    otherHand: qiuQiu,
                },
                {
                    name: "other is Twin, banker is Small",
                    bankerHand: big,
                    otherHand: ordinaryCard,
                },
                {
                    name: "other is Twin, banker is Small",
                    bankerHand: qiuQiu,
                    otherHand: ordinaryCard,
                },
            ];
            it.each(testCases)("should return lose", ({ otherHand, bankerHand }) => {
                // act
                const actual = settleHand(bankerHand, otherHand);

                // assert
                expect(actual).toBe(settlementResultMapper.lose);
            });
        });
        describe("when other hand ranking = banker hand ranking != ordinary Card", () => {
            const testCases = [
                {
                    name: "hand is Twin",
                    otherHand: twin,
                    bankerHand: twin2,
                },
                {
                    name: "hand is Small",
                    otherHand: small,
                    bankerHand: small2,
                },
                {
                    name: "hand is Big",
                    otherHand: big,
                    bankerHand: big2,
                },
                {
                    name: "hand is Qiu Qiu",
                    otherHand: qiuQiu,
                    bankerHand: qiuQiu2,
                },
            ];
            it.each(testCases)("should return tie", ({ otherHand, bankerHand }) => {
                // act
                const actual = settleHand(bankerHand, otherHand);

                // assert
                expect(actual).toBe(settlementResultMapper.tie);
            });
        });
        describe("when other hand ranking = banker hand ranking = ordinary Card", () => {
            describe("when otherPips1 > bankerPips1", () => {
                describe("when otherPips2 > bankerPips2", () => {
                    it("should return win", () => {
                        // arrange
                        const otherHand = calculateHand(["11", "55", "16", "22"]);
                        const bankerHand = calculateHand(["15", "04", "06", "46"]);

                        // act
                        const actual = settleHand(bankerHand, otherHand);

                        // assert
                        expect(actual).toBe(settlementResultMapper.win);
                    });
                });
                describe("when otherPips2 = bankerPips2", () => {
                    it("should return win", () => {
                        // arrange
                        const otherHand = calculateHand(["26", "01", "66", "35"]);
                        const bankerHand = calculateHand(["46", "06", "04", "15"]);

                        // act
                        const actual = settleHand(bankerHand, otherHand);

                        // assert
                        expect(actual).toBe(settlementResultMapper.win);
                    });
                });
                describe("when otherPips2 < bankerPips2", () => {
                    describe("when there are double dominoes", () => {
                        it("should compare double dominoes", () => {
                            // arrange
                            const otherHand = calculateHand(["15", "02", "44", "36"]);
                            const bankerHand = calculateHand(["45", "00", "24", "14"]);

                            // act
                            const actual = settleHand(bankerHand, otherHand);

                            // assert
                            expect(actual).toBe(settlementResultMapper.win);
                        });
                    });

                    describe("when there are not double dominoes", () => {
                        it("should compare number of big dominoes", () => {
                            // arrange
                            const otherHand = calculateHand(["15", "02", "35", "36"]);
                            const bankerHand = calculateHand(["13", "23", "24", "14"]);

                            // act
                            const actual = settleHand(bankerHand, otherHand);

                            // assert
                            expect(actual).toBe(settlementResultMapper.win);
                        });
                    });

                    describe("when there are not double dominoes and number of big dominoes are equal", () => {
                        it("should return tie", () => {
                            // arrange
                            const otherHand = calculateHand(["04", "05", "01", "02"]);
                            const bankerHand = calculateHand(["12", "23", "56", "03"]);

                            // act
                            const actual = settleHand(bankerHand, otherHand);

                            // assert
                            expect(actual).toBe(settlementResultMapper.tie);
                        });
                    });
                });
            });
            describe("when otherPips1 = bankerPips1", () => {
                describe("when otherPips2 > bankerPips2", () => {
                    it("should return win", () => {
                        // arrange
                        const otherHand = calculateHand(["12", "24", "34", "16"]);
                        const bankerHand = calculateHand(["26", "01", "66", "35"]);

                        // act
                        const actual = settleHand(bankerHand, otherHand);

                        // assert
                        expect(actual).toBe(settlementResultMapper.win);
                    });
                });
                describe("when otherPips2 = bankerPips2", () => {
                    describe("when there are double dominoes", () => {
                        it("should compare double domino", () => {
                            // arrange
                            const otherHand = calculateHand(["33", "03", "02", "13"]);
                            const bankerHand = calculateHand(["22", "23", "01", "04"]);

                            // act
                            const actual = settleHand(bankerHand, otherHand);

                            // assert
                            expect(actual).toBe(settlementResultMapper.win);
                        });
                    });
                    describe("when there are not double dominoes and number of big dominoes are not equal", () => {
                        it("should compare number of big dominoe", () => {
                            // arrange
                            const otherHand = calculateHand(["15", "03", "02", "04"]);
                            const bankerHand = calculateHand(["13", "23", "56", "05"]);

                            // act
                            const actual = settleHand(bankerHand, otherHand);

                            // assert
                            expect(actual).toBe(settlementResultMapper.lose);
                        });
                    });
                    describe("when there are not double dominoes and number of big dominoes are equal", () => {
                        it("should return tie", () => {
                            // arrange
                            const otherHand = calculateHand(["15", "03", "02", "04"]);
                            const bankerHand = calculateHand(["13", "23", "01", "05"]);

                            // act
                            const actual = settleHand(bankerHand, otherHand);

                            // assert
                            expect(actual).toBe(settlementResultMapper.tie);
                        });
                    });
                });
                describe("when otherPips2 < bankerPips2", () => {
                    it("should return lose", () => {
                        // arrange
                        const bankerHand = calculateHand(["12", "24", "34", "16"]);
                        const otherHand = calculateHand(["26", "01", "66", "35"]);

                        // act
                        const actual = settleHand(bankerHand, otherHand);

                        // assert
                        expect(actual).toBe(settlementResultMapper.lose);
                    });
                });
            });
            describe("when otherPips1 < bankerPips1", () => {
                describe("when otherPips2 > bankerPips2", () => {
                    describe("when there are double dominoes", () => {
                        it("should compare double dominoes", () => {
                            // arrange
                            const bankerHand = calculateHand(["15", "02", "44", "36"]);
                            const otherHand = calculateHand(["45", "00", "24", "14"]);

                            // act
                            const actual = settleHand(bankerHand, otherHand);

                            // assert
                            expect(actual).toBe(settlementResultMapper.lose);
                        });
                    });

                    describe("when there are not double dominoes", () => {
                        it("should compare number of big dominoes", () => {
                            // arrange
                            const bankerHand = calculateHand(["15", "02", "35", "36"]);
                            const otherHand = calculateHand(["13", "23", "24", "14"]);

                            // act
                            const actual = settleHand(bankerHand, otherHand);

                            // assert
                            expect(actual).toBe(settlementResultMapper.lose);
                        });
                    });

                    describe("when there are not double dominoes and number of big dominoes are equal", () => {
                        it("should return tie", () => {
                            // arrange
                            const bankerHand = calculateHand(["04", "05", "01", "02"]);
                            const otherHand = calculateHand(["12", "23", "56", "03"]);

                            // act
                            const actual = settleHand(bankerHand, otherHand);

                            // assert
                            expect(actual).toBe(settlementResultMapper.tie);
                        });
                    });
                });
                describe("when otherPips2 = bankerPips2", () => {
                    it("should return lose", () => {
                        // arrange
                        const bankerHand = calculateHand(["26", "01", "66", "35"]);
                        const otherHand = calculateHand(["46", "06", "04", "15"]);

                        // act
                        const actual = settleHand(bankerHand, otherHand);

                        // assert
                        expect(actual).toBe(settlementResultMapper.lose);
                    });
                });
                describe("when otherPips2 < bankerPips2", () => {
                    it("should return lose", () => {
                        // arrange
                        const bankerHand = calculateHand(["11", "55", "16", "22"]);
                        const otherHand = calculateHand(["15", "04", "06", "46"]);

                        // act
                        const actual = settleHand(bankerHand, otherHand);

                        // assert
                        expect(actual).toBe(settlementResultMapper.lose);
                    });
                });
            });
        });
    });
});
