import { dominoes } from "../../../src/constants";
import { generateRawResultForHash, generateResult, getSettlementResult } from "../../../src/helpers/result-helper";
import { settleHand } from "../../../src/helpers/settle-rule";

jest.mock("../../../src/helpers/settle-rule", () => ({
    settleHand: jest.fn(),
}));
describe("result-helper tests", () => {
    describe("generateResult", () => {
        it("should return array has 20 dominoes", () => {
            // act
            const result = generateResult(1);

            // assert
            expect(result.length).toBe(20);
            expect(result.every((domino) => dominoes.includes(domino))).toBe(true);
        });
    });

    describe("getSettlementResult", () => {
        it("should return expected", () => {
            // arrange
            settleHand.mockReturnValueOnce(0).mockReturnValueOnce(1).mockReturnValueOnce(0).mockReturnValueOnce(2);
            const roundResult = {
                banker: { dominoes: ["00"], handRankingId: 0 },
                spade: { dominoes: ["01"], handRankingId: 0 },
                heart: { dominoes: ["02"], handRankingId: 0 },
                club: { dominoes: ["03"], handRankingId: 0 },
                diamond: { dominoes: ["04"], handRankingId: 0 },
            };

            // act
            const settlementResult = getSettlementResult(roundResult);

            // assert
            expect(settleHand).toHaveBeenCalledTimes(4);
            expect(settleHand).toHaveBeenCalledWith(roundResult.banker, roundResult.spade);
            expect(settleHand).toHaveBeenCalledWith(roundResult.banker, roundResult.heart);
            expect(settleHand).toHaveBeenCalledWith(roundResult.banker, roundResult.club);
            expect(settleHand).toHaveBeenCalledWith(roundResult.banker, roundResult.diamond);
            expect(settlementResult).toEqual({
                spade: 0,
                heart: 1,
                club: 0,
                diamond: 2,
            });
        });
    });

    describe("generateRawResultForHash", () => {
        const testCase = [
            {
                result: [
                    "00",
                    "01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "11",
                    "12",
                    "13",
                    "14",
                    "15",
                    "16",
                    "22",
                    "23",
                    "24",
                    "25",
                    "26",
                    "33",
                    "34",
                ],
                expected: "{🁣🁤🁥🁦,🁧🁨🁩🁫,🁬🁭🁮🁯,🁰🁳🁴🁵,🁶🁷🁻🁼}",
            },
            {
                result: [
                    "12",
                    "13",
                    "14",
                    "15",
                    "16",
                    "22",
                    "23",
                    "24",
                    "25",
                    "26",
                    "33",
                    "34",
                    "35",
                    "36",
                    "44",
                    "45",
                    "46",
                    "55",
                    "56",
                    "66",
                ],
                expected: "{🁬🁭🁮🁯,🁰🁳🁴🁵,🁶🁷🁻🁼,🁽🁾🂃🂄,🂅🂋🂌🂓}",
            },
        ];
        it.each(testCase)("should return expected", ({ result, expected }) => {
            // act
            const actual = generateRawResultForHash(result);

            // assert
            expect(actual).toBe(expected);
        });
    });
});
