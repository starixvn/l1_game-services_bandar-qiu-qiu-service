import { betChoices, oddsMapper, settlementResultMapper } from "./constants";
import { calculateHand } from "./helpers/hand-helper";
import { generateResult, getSettlementResult } from "./helpers/result-helper";

const number = 100_000;
const stake = 10;
const odds = { sixDevil: 7, twin: 6, small: 5, big: 4, qiuQiu: 3, ordinaryCard: 2 };

const statistic = {
    1: {
        spade: { totalBet: 0, totalWin: 0, rank: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, settlementResult: { 0: 0, 1: 0, 2: 0 } },
        heart: { totalBet: 0, totalWin: 0, rank: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, settlementResult: { 0: 0, 1: 0, 2: 0 } },
        club: { totalBet: 0, totalWin: 0, rank: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, settlementResult: { 0: 0, 1: 0, 2: 0 } },
        diamond: { totalBet: 0, totalWin: 0, rank: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, settlementResult: { 0: 0, 1: 0, 2: 0 } },
    },
    2: {
        spade: { totalBet: 0, totalWin: 0, rank: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, settlementResult: { 0: 0, 1: 0, 2: 0 } },
        heart: { totalBet: 0, totalWin: 0, rank: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, settlementResult: { 0: 0, 1: 0, 2: 0 } },
        club: { totalBet: 0, totalWin: 0, rank: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, settlementResult: { 0: 0, 1: 0, 2: 0 } },
        diamond: { totalBet: 0, totalWin: 0, rank: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, settlementResult: { 0: 0, 1: 0, 2: 0 } },
    },
    3: {
        spade: { totalBet: 0, totalWin: 0, rank: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, settlementResult: { 0: 0, 1: 0, 2: 0 } },
        heart: { totalBet: 0, totalWin: 0, rank: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, settlementResult: { 0: 0, 1: 0, 2: 0 } },
        club: { totalBet: 0, totalWin: 0, rank: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, settlementResult: { 0: 0, 1: 0, 2: 0 } },
        diamond: { totalBet: 0, totalWin: 0, rank: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, settlementResult: { 0: 0, 1: 0, 2: 0 } },
    },
};

const getRoundResult = (randomMode) => {
    const dominoes = generateResult(randomMode);
    return {
        banker: calculateHand(dominoes.slice(0, 4)),
        spade: calculateHand(dominoes.slice(4, 8)),
        heart: calculateHand(dominoes.slice(8, 12)),
        club: calculateHand(dominoes.slice(12, 16)),
        diamond: calculateHand(dominoes.slice(16, 20)),
    };
};

const calculateTotalWin = (settlementResult, roundResult, choice) => {
    const win = settlementResult[choice];
    const betAmount = stake;
    if (win === settlementResultMapper.tie) {
        return betAmount;
    } else {
        const originalOdds = odds[oddsMapper[roundResult[choice]?.handRankingId]];
        return win === settlementResultMapper.win ? betAmount * originalOdds : 0;
    }
};

const run = () => {
    const modes = [1, 2, 3];
    modes.forEach((mode) => {
        let t = 0;
        for (let i = 0; i < number; i++) {
            const roundResult = getRoundResult(mode);
            const settlementResult = getSettlementResult(roundResult);
            Object.values(betChoices).forEach((choice) => {
                const totalWin = calculateTotalWin(settlementResult, roundResult, choice);
                statistic[mode][choice].totalBet += stake;
                statistic[mode][choice].totalWin += totalWin;
                statistic[mode][choice].rank[roundResult[choice]?.handRankingId] += 1;
                statistic[mode][choice].settlementResult[settlementResult[choice]] += 1;
                t += totalWin;
            });
        }
        console.log(t / 4_000_000);
    });
    console.log(JSON.stringify(statistic, null, 4));
};
run();
