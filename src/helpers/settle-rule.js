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

const settleHandDominoes = (dealerHand, otherHand) => {
    const otherDoubleDominoValue = getMaxOfDoubleDomino(otherHand.dominoes);
    const dealerDoubleDominoValue = getMaxOfDoubleDomino(dealerHand.dominoes);
    if (otherDoubleDominoValue > dealerDoubleDominoValue) {
        return settlementResultMapper.win;
    }
    if (otherDoubleDominoValue < dealerDoubleDominoValue) {
        return settlementResultMapper.lose;
    }
    const otherNumberBigDomino = getNumberOfBigDomino(otherHand.dominoes);
    const dealerNumberBigDomino = getNumberOfBigDomino(dealerHand.dominoes);
    if (otherNumberBigDomino > dealerNumberBigDomino) {
        return settlementResultMapper.win;
    }
    return otherNumberBigDomino === dealerNumberBigDomino ? settlementResultMapper.tie : settlementResultMapper.lose;
};

const settleOrdinaryCardHand = (dealerHand, otherHand) => {
    const [otherPips1, otherPips2] = otherHand.pipsOfSet;
    const [dealerPips1, dealerPips2] = dealerHand.pipsOfSet;
    if (otherPips1 > dealerPips1 && otherPips2 >= dealerPips2) {
        return settlementResultMapper.win;
    }
    if (otherPips1 === dealerPips1) {
        if (otherPips2 > dealerPips2) {
            return settlementResultMapper.win;
        }
        if (otherPips2 < dealerPips2) {
            return settlementResultMapper.lose;
        }
    }
    if (otherPips1 < dealerPips1 && otherPips2 <= dealerPips2) {
        return settlementResultMapper.lose;
    }
    return settleHandDominoes(dealerHand, otherHand);
};

export const settleHand = (dealerHand, otherHand) => {
    if (otherHand.handRankingId > dealerHand.handRankingId) {
        return settlementResultMapper.win;
    }
    if (otherHand.handRankingId < dealerHand.handRankingId) {
        return settlementResultMapper.lose;
    }
    if (otherHand.handRankingId === handRankingId.ordinaryCard) {
        return settleOrdinaryCardHand(dealerHand, otherHand);
    }
    return settlementResultMapper.tie;
};
