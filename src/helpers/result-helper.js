import { dominoes } from "../constants";
import { randomShuffles } from "./shuffle-helper";
import { settleHand } from "./settle-rule";

const settlementRuleEntries = Object.entries({
    spade: (roundResult) => settleHand(roundResult.banker, roundResult.spade),
    heart: (roundResult) => settleHand(roundResult.banker, roundResult.heart),
    club: (roundResult) => settleHand(roundResult.banker, roundResult.club),
    diamond: (roundResult) => settleHand(roundResult.banker, roundResult.diamond),
});

export const generateResult = (randomMode) => {
    const shuffle = randomShuffles[randomMode] || randomShuffles[1];
    return shuffle(dominoes).slice(0, 20);
};

export const getSettlementResult = (roundResult) => {
    return settlementRuleEntries.reduce((result, [choice, rule]) => {
        result[choice] = rule(roundResult);

        return result;
    }, {});
};

export const generateRawResultForHash = (roundResult) => {
    const dominoMapping = {
        "00": "🁣",
        "01": "🁤",
        "02": "🁥",
        "03": "🁦",
        "04": "🁧",
        "05": "🁨",
        "06": "🁩",
        11: "🁫",
        12: "🁬",
        13: "🁭",
        14: "🁮",
        15: "🁯",
        16: "🁰",
        22: "🁳",
        23: "🁴",
        24: "🁵",
        25: "🁶",
        26: "🁷",
        33: "🁻",
        34: "🁼",
        35: "🁽",
        36: "🁾",
        44: "🂃",
        45: "🂄",
        46: "🂅",
        55: "🂋",
        56: "🂌",
        66: "🂓",
    };
    const rawResult = roundResult.reduce((result, domino, index) => {
        result += dominoMapping[domino];
        return (index + 1) % 4 === 0 && index !== 19 ? `${result},` : result;
    }, "");
    return `{${rawResult}}`;
};
