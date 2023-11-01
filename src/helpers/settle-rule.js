import { handRankingId, settlementResultMapper } from "../constants";
import { isBigDomino, isDoubleDomino } from "./domino-helper";

const getMaxOfDoubleDomino = (dominoes) => {
    return dominoes.reduce((result, domino) => (isDoubleDomino(domino) && +domino[0] > result ? +domino[0] : result), -1);
};

const getNumberOfBigDomino = (dominoes) => {
    return dominoes.reduce((result, domino) => {
        if (isBigDomino(domino)) {
            result++;
        }
        return result;
    }, 0);
};

const settleHandDominoes = (bankerHand, otherHand) => {
    const otherDoubleDominoValue = getMaxOfDoubleDomino(otherHand.dominoes);
    const bankerDoubleDominoValue = getMaxOfDoubleDomino(bankerHand.dominoes);
    if (otherDoubleDominoValue > bankerDoubleDominoValue) {
        return settlementResultMapper.win;
    }
    if (otherDoubleDominoValue < bankerDoubleDominoValue) {
        return settlementResultMapper.lose;
    }
    const otherNumberBigDomino = getNumberOfBigDomino(otherHand.dominoes);
    const bankerNumberBigDomino = getNumberOfBigDomino(bankerHand.dominoes);
    if (otherNumberBigDomino > bankerNumberBigDomino) {
        return settlementResultMapper.win;
    }
    return otherNumberBigDomino === bankerNumberBigDomino ? settlementResultMapper.tie : settlementResultMapper.lose;
};

const settleOrdinaryCardHand = (bankerHand, otherHand) => {
    const [otherPips1, otherPips2] = otherHand.pipsOfSet;
    const [bankerPips1, bankerPips2] = bankerHand.pipsOfSet;
    if (otherPips1 > bankerPips1 && otherPips2 >= bankerPips2) {
        return settlementResultMapper.win;
    }
    if (otherPips1 === bankerPips1) {
        if (otherPips2 > bankerPips2) {
            return settlementResultMapper.win;
        }
        if (otherPips2 < bankerPips2) {
            return settlementResultMapper.lose;
        }
    }
    if (otherPips1 < bankerPips1 && otherPips2 <= bankerPips2) {
        return settlementResultMapper.lose;
    }
    return settleHandDominoes(bankerHand, otherHand);
};

export const settleHand = (bankerHand, otherHand) => {
    if (otherHand.handRankingId > bankerHand.handRankingId) {
        return settlementResultMapper.win;
    }
    if (otherHand.handRankingId < bankerHand.handRankingId) {
        return settlementResultMapper.lose;
    }
    if (otherHand.handRankingId === handRankingId.ordinaryCard) {
        return settleOrdinaryCardHand(bankerHand, otherHand);
    }
    return settlementResultMapper.tie;
};
