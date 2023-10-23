import { handRankingId } from "../constants";
import { getTotalPipsOnDomino, isDoubleDomino } from "./domino-helper";

const sortDominoes = (dominoes) => {
    return dominoes
        .flatMap((domino, index) =>
            dominoes.slice(index + 1).map((nextDomino, i) => {
                const nextIndex = index + i + 1;
                return {
                    total: (getTotalPipsOnDomino(domino) + getTotalPipsOnDomino(nextDomino)) % 10,
                    sortedDominoes: [
                        dominoes[index],
                        dominoes[nextIndex],
                        ...dominoes.filter((_, ind) => ind !== index && ind !== nextIndex),
                    ],
                };
            })
        )
        .sort((a, b) => b.total - a.total)[0].sortedDominoes;
};

const isSixDevil = (dominoes) => {
    return !dominoes.some((domino) => getTotalPipsOnDomino(domino) !== 6);
};

const isTwin = (dominoes) => {
    return !dominoes.some((domino) => !isDoubleDomino(domino));
};

const getTotalPipsOnHand = (dominoes) => {
    return dominoes.reduce((total, domino) => total + getTotalPipsOnDomino(domino), 0);
};

export const calculateHand = (dominoes) => {
    const hand = {
        dominoes,
        handRankingId: handRankingId.ordinaryCard,
        pipsOfSet: null,
    };

    if (isSixDevil(dominoes)) {
        hand.handRankingId = handRankingId.sixDevil;
        return hand;
    }

    if (isTwin(dominoes)) {
        hand.handRankingId = handRankingId.twin;
        return hand;
    }

    const totalPipsOnHand = getTotalPipsOnHand(dominoes);

    if (totalPipsOnHand <= 9) {
        hand.handRankingId = handRankingId.small;
        return hand;
    }

    if (totalPipsOnHand >= 39) {
        hand.handRankingId = handRankingId.big;
        return hand;
    }

    const sortedDominoes = sortDominoes(dominoes);
    const pipsOfSet1 = (getTotalPipsOnDomino(sortedDominoes[0]) + getTotalPipsOnDomino(sortedDominoes[1])) % 10;
    const pipsOfSet2 = (getTotalPipsOnDomino(sortedDominoes[2]) + getTotalPipsOnDomino(sortedDominoes[3])) % 10;

    hand.dominoes = sortedDominoes;
    hand.pipsOfSet = [pipsOfSet1, pipsOfSet2];

    if (pipsOfSet2 === 9) {
        hand.handRankingId = handRankingId.qiuQiu;
        return hand;
    }

    return hand;
};
