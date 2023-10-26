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
        describe("when other hand ranking > dealer hand ranking", () => {
            const testCases = [
                {
                    name: "other is Six Devil, dealer is Twin",
                    otherHand: sixDevil,
                    dealerHand: twin,
                },
                {
                    name: "other is Six Devil, dealer is Small",
                    otherHand: sixDevil,
                    dealerHand: small,
                },
                {
                    name: "other is Six Devil, dealer is Big",
                    otherHand: sixDevil,
                    dealerHand: big,
                },
                {
                    name: "other is Six Devil, dealer is Qiu Qiu",
                    otherHand: sixDevil,
                    dealerHand: qiuQiu,
                },
                {
                    name: "other is Six Devil, dealer is Ordinary Card",
                    otherHand: sixDevil,
                    dealerHand: ordinaryCard,
                },
                {
                    name: "other is Twin, dealer is Small",
                    otherHand: twin,
                    dealerHand: small,
                },
                {
                    name: "other is Twin, dealer is Small",
                    otherHand: twin,
                    dealerHand: big,
                },
                {
                    name: "other is Twin, dealer is Small",
                    otherHand: twin,
                    dealerHand: qiuQiu,
                },
                {
                    name: "other is Twin, dealer is Small",
                    otherHand: twin,
                    dealerHand: ordinaryCard,
                },
                {
                    name: "other is Twin, dealer is Small",
                    otherHand: small,
                    dealerHand: big,
                },
                {
                    name: "other is Twin, dealer is Small",
                    otherHand: small,
                    dealerHand: qiuQiu,
                },
                {
                    name: "other is Twin, dealer is Small",
                    otherHand: small,
                    dealerHand: ordinaryCard,
                },
                {
                    name: "other is Twin, dealer is Small",
                    otherHand: big,
                    dealerHand: qiuQiu,
                },
                {
                    name: "other is Twin, dealer is Small",
                    otherHand: big,
                    dealerHand: ordinaryCard,
                },
                {
                    name: "other is Twin, dealer is Small",
                    otherHand: qiuQiu,
                    dealerHand: ordinaryCard,
                },
            ];
            it.each(testCases)("should return win", ({ otherHand, dealerHand }) => {
                // act
                const actual = settleHand(dealerHand, otherHand);

                // assert
                expect(actual).toBe(settlementResultMapper.win);
            });
        });
        describe("when other hand ranking < dealer hand ranking", () => {
            const testCases = [
                {
                    name: "other is Six Devil, dealer is Twin",
                    dealerHand: sixDevil,
                    otherHand: twin,
                },
                {
                    name: "other is Six Devil, dealer is Small",
                    dealerHand: sixDevil,
                    otherHand: small,
                },
                {
                    name: "other is Six Devil, dealer is Big",
                    dealerHand: sixDevil,
                    otherHand: big,
                },
                {
                    name: "other is Six Devil, dealer is Qiu Qiu",
                    dealerHand: sixDevil,
                    otherHand: qiuQiu,
                },
                {
                    name: "other is Six Devil, dealer is Ordinary Card",
                    dealerHand: sixDevil,
                    otherHand: ordinaryCard,
                },
                {
                    name: "other is Twin, dealer is Small",
                    dealerHand: twin,
                    otherHand: small,
                },
                {
                    name: "other is Twin, dealer is Small",
                    dealerHand: twin,
                    otherHand: big,
                },
                {
                    name: "other is Twin, dealer is Small",
                    dealerHand: twin,
                    otherHand: qiuQiu,
                },
                {
                    name: "other is Twin, dealer is Small",
                    dealerHand: twin,
                    otherHand: ordinaryCard,
                },
                {
                    name: "other is Twin, dealer is Small",
                    dealerHand: small,
                    otherHand: big,
                },
                {
                    name: "other is Twin, dealer is Small",
                    dealerHand: small,
                    otherHand: qiuQiu,
                },
                {
                    name: "other is Twin, dealer is Small",
                    dealerHand: small,
                    otherHand: ordinaryCard,
                },
                {
                    name: "other is Twin, dealer is Small",
                    dealerHand: big,
                    otherHand: qiuQiu,
                },
                {
                    name: "other is Twin, dealer is Small",
                    dealerHand: big,
                    otherHand: ordinaryCard,
                },
                {
                    name: "other is Twin, dealer is Small",
                    dealerHand: qiuQiu,
                    otherHand: ordinaryCard,
                },
            ];
            it.each(testCases)("should return lose", ({ otherHand, dealerHand }) => {
                // act
                const actual = settleHand(dealerHand, otherHand);

                // assert
                expect(actual).toBe(settlementResultMapper.lose);
            });
        });
        describe("when other hand ranking = dealer hand ranking != ordinary Card", () => {
            const testCases = [
                {
                    name: "hand is Twin",
                    otherHand: twin,
                    dealerHand: twin2,
                },
                {
                    name: "hand is Small",
                    otherHand: small,
                    dealerHand: small2,
                },
                {
                    name: "hand is Big",
                    otherHand: big,
                    dealerHand: big2,
                },
                {
                    name: "hand is Qiu Qiu",
                    otherHand: qiuQiu,
                    dealerHand: qiuQiu2,
                },
            ];
            it.each(testCases)("should return tie", ({ otherHand, dealerHand }) => {
                // act
                const actual = settleHand(dealerHand, otherHand);

                // assert
                expect(actual).toBe(settlementResultMapper.tie);
            });
        });
        describe("when other hand ranking = dealer hand ranking = ordinary Card", () => {
            describe("when otherPips1 > dealerPips1", () => {
                describe("when otherPips2 > dealerPips2", () => {
                    it("should return win", () => {
                        // arrange
                        const otherHand = calculateHand(["11", "55", "16", "22"]);
                        const dealerHand = calculateHand(["15", "04", "06", "46"]);

                        // act
                        const actual = settleHand(dealerHand, otherHand);

                        // assert
                        expect(actual).toBe(settlementResultMapper.win);
                    });
                });
                describe("when otherPips2 = dealerPips2", () => {
                    it("should return win", () => {
                        // arrange
                        const otherHand = calculateHand(["26", "01", "66", "35"]);
                        const dealerHand = calculateHand(["46", "06", "04", "15"]);

                        // act
                        const actual = settleHand(dealerHand, otherHand);

                        // assert
                        expect(actual).toBe(settlementResultMapper.win);
                    });
                });
                describe("when otherPips2 < dealerPips2", () => {
                    describe("when there are double dominoes", () => {
                        it("should compare double dominoes", () => {
                            // arrange
                            const otherHand = calculateHand(["15", "02", "44", "36"]);
                            const dealerHand = calculateHand(["45", "00", "24", "14"]);

                            // act
                            const actual = settleHand(dealerHand, otherHand);

                            // assert
                            expect(actual).toBe(settlementResultMapper.win);
                        });
                    });

                    describe("when there are not double dominoes", () => {
                        it("should compare number of big dominoes", () => {
                            // arrange
                            const otherHand = calculateHand(["15", "02", "35", "36"]);
                            const dealerHand = calculateHand(["13", "23", "24", "14"]);

                            // act
                            const actual = settleHand(dealerHand, otherHand);

                            // assert
                            expect(actual).toBe(settlementResultMapper.win);
                        });
                    });

                    describe("when there are not double dominoes and number of big dominoes are equal", () => {
                        it("should return tie", () => {
                            // arrange
                            const otherHand = calculateHand(["04", "05", "01", "02"]);
                            const dealerHand = calculateHand(["12", "23", "56", "03"]);

                            // act
                            const actual = settleHand(dealerHand, otherHand);

                            // assert
                            expect(actual).toBe(settlementResultMapper.tie);
                        });
                    });
                });
            });
            describe("when otherPips1 = dealerPips1", () => {
                describe("when otherPips2 > dealerPips2", () => {
                    it("should return win", () => {
                        // arrange
                        const otherHand = calculateHand(["12", "24", "34", "16"]);
                        const dealerHand = calculateHand(["26", "01", "66", "35"]);

                        // act
                        const actual = settleHand(dealerHand, otherHand);

                        // assert
                        expect(actual).toBe(settlementResultMapper.win);
                    });
                });
                describe("when otherPips2 = dealerPips2", () => {
                    describe("when there are double dominoes", () => {
                        it("should compare double domino", () => {
                            // arrange
                            const otherHand = calculateHand(["33", "03", "02", "13"]);
                            const dealerHand = calculateHand(["22", "23", "01", "04"]);

                            // act
                            const actual = settleHand(dealerHand, otherHand);

                            // assert
                            expect(actual).toBe(settlementResultMapper.win);
                        });
                    });
                    describe("when there are not double dominoes and number of big dominoes are not equal", () => {
                        it("should compare number of big dominoe", () => {
                            // arrange
                            const otherHand = calculateHand(["15", "03", "02", "04"]);
                            const dealerHand = calculateHand(["13", "23", "56", "05"]);

                            // act
                            const actual = settleHand(dealerHand, otherHand);

                            // assert
                            expect(actual).toBe(settlementResultMapper.lose);
                        });
                    });
                    describe("when there are not double dominoes and number of big dominoes are equal", () => {
                        it("should return tie", () => {
                            // arrange
                            const otherHand = calculateHand(["15", "03", "02", "04"]);
                            const dealerHand = calculateHand(["13", "23", "01", "05"]);

                            // act
                            const actual = settleHand(dealerHand, otherHand);

                            // assert
                            expect(actual).toBe(settlementResultMapper.tie);
                        });
                    });
                });
                describe("when otherPips2 < dealerPips2", () => {
                    it("should return lose", () => {
                        // arrange
                        const dealerHand = calculateHand(["12", "24", "34", "16"]);
                        const otherHand = calculateHand(["26", "01", "66", "35"]);

                        // act
                        const actual = settleHand(dealerHand, otherHand);

                        // assert
                        expect(actual).toBe(settlementResultMapper.lose);
                    });
                });
            });
            describe("when otherPips1 < dealerPips1", () => {
                describe("when otherPips2 > dealerPips2", () => {
                    describe("when there are double dominoes", () => {
                        it("should compare double dominoes", () => {
                            // arrange
                            const dealerHand = calculateHand(["15", "02", "44", "36"]);
                            const otherHand = calculateHand(["45", "00", "24", "14"]);

                            // act
                            const actual = settleHand(dealerHand, otherHand);

                            // assert
                            expect(actual).toBe(settlementResultMapper.lose);
                        });
                    });

                    describe("when there are not double dominoes", () => {
                        it("should compare number of big dominoes", () => {
                            // arrange
                            const dealerHand = calculateHand(["15", "02", "35", "36"]);
                            const otherHand = calculateHand(["13", "23", "24", "14"]);

                            // act
                            const actual = settleHand(dealerHand, otherHand);

                            // assert
                            expect(actual).toBe(settlementResultMapper.lose);
                        });
                    });

                    describe("when there are not double dominoes and number of big dominoes are equal", () => {
                        it("should return tie", () => {
                            // arrange
                            const dealerHand = calculateHand(["04", "05", "01", "02"]);
                            const otherHand = calculateHand(["12", "23", "56", "03"]);

                            // act
                            const actual = settleHand(dealerHand, otherHand);

                            // assert
                            expect(actual).toBe(settlementResultMapper.tie);
                        });
                    });
                });
                describe("when otherPips2 = dealerPips2", () => {
                    it("should return lose", () => {
                        // arrange
                        const dealerHand = calculateHand(["26", "01", "66", "35"]);
                        const otherHand = calculateHand(["46", "06", "04", "15"]);

                        // act
                        const actual = settleHand(dealerHand, otherHand);

                        // assert
                        expect(actual).toBe(settlementResultMapper.lose);
                    });
                });
                describe("when otherPips2 < dealerPips2", () => {
                    it("should return lose", () => {
                        // arrange
                        const dealerHand = calculateHand(["11", "55", "16", "22"]);
                        const otherHand = calculateHand(["15", "04", "06", "46"]);

                        // act
                        const actual = settleHand(dealerHand, otherHand);

                        // assert
                        expect(actual).toBe(settlementResultMapper.lose);
                    });
                });
            });
        });
    });
});
