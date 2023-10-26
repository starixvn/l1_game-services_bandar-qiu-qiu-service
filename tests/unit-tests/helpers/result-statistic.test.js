import { settlementResultMapper } from "../../../src/constants";
import { calculateHand } from "../../../src/helpers/hand-helper";
import { generateResult, getSettlementResult } from "../../../src/helpers/result-helper";

describe("result statistic: 100,000 times", () => {
    // arrange
    const total = 100_000;
    for (let index = 0; index < 3; index++) {
        it(`should generate results statistically correct with mode ${index + 1}`, () => {
            // arrange
            const statisticResult = {
                spade: { [settlementResultMapper.lose]: 0, [settlementResultMapper.win]: 0, [settlementResultMapper.tie]: 0 },
                heart: { [settlementResultMapper.lose]: 0, [settlementResultMapper.win]: 0, [settlementResultMapper.tie]: 0 },
                club: { [settlementResultMapper.lose]: 0, [settlementResultMapper.win]: 0, [settlementResultMapper.tie]: 0 },
                diamond: { [settlementResultMapper.lose]: 0, [settlementResultMapper.win]: 0, [settlementResultMapper.tie]: 0 },
            };

            // act
            for (let i = 0; i < total; i++) {
                const dominoes = generateResult(index + 1);
                const roundResult = {
                    dealer: calculateHand(dominoes.slice(0, 4)),
                    spade: calculateHand(dominoes.slice(4, 8)),
                    heart: calculateHand(dominoes.slice(8, 12)),
                    club: calculateHand(dominoes.slice(12, 16)),
                    diamond: calculateHand(dominoes.slice(16, 20)),
                };
                const settlementResult = getSettlementResult(roundResult);
                statisticResult.spade[settlementResult.spade]++;
                statisticResult.heart[settlementResult.heart]++;
                statisticResult.club[settlementResult.club]++;
                statisticResult.diamond[settlementResult.diamond]++;
            }

            // assert
            const resultPercentage = Object.keys(statisticResult).reduce(
                (percentage, choice) => {
                    Object.keys(statisticResult[choice]).forEach((key) => {
                        percentage[choice][key] = +parseFloat((statisticResult[choice][key] / total) * 100).toFixed(2);
                    });

                    return percentage;
                },
                { spade: {}, heart: {}, club: {}, diamond: {} }
            );
            console.log(
                `Mode:${index + 1}, countResult: ${JSON.stringify(statisticResult)}, percentageResult: ${JSON.stringify(resultPercentage)}`
            );
            expect(resultPercentage.spade[settlementResultMapper.lose]).toBeGreaterThanOrEqual(48);
            expect(resultPercentage.spade[settlementResultMapper.win]).toBeGreaterThanOrEqual(48);
            expect(resultPercentage.spade[settlementResultMapper.tie]).toBeLessThanOrEqual(2);
            expect(resultPercentage.heart[settlementResultMapper.lose]).toBeGreaterThanOrEqual(48);
            expect(resultPercentage.heart[settlementResultMapper.win]).toBeGreaterThanOrEqual(48);
            expect(resultPercentage.heart[settlementResultMapper.tie]).toBeLessThanOrEqual(2);
            expect(resultPercentage.club[settlementResultMapper.lose]).toBeGreaterThanOrEqual(48);
            expect(resultPercentage.club[settlementResultMapper.win]).toBeGreaterThanOrEqual(48);
            expect(resultPercentage.club[settlementResultMapper.tie]).toBeLessThanOrEqual(2);
            expect(resultPercentage.diamond[settlementResultMapper.lose]).toBeGreaterThanOrEqual(48);
            expect(resultPercentage.diamond[settlementResultMapper.win]).toBeGreaterThanOrEqual(48);
            expect(resultPercentage.diamond[settlementResultMapper.tie]).toBeLessThanOrEqual(2);
        });
    }
});
