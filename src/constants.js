const values = [0, 1, 2, 3, 4, 5, 6];

export const dominoes = values.flatMap((value) => values.slice(value).map((value2) => `${value}${value2}`));

export const handRankingId = {
    sixDevil: 5,
    twin: 4,
    small: 3,
    big: 2,
    qiuQiu: 1,
    ordinaryCard: 0,
};

export const settlementResultMapper = {
    lose: 0,
    win: 1,
    tie: 2,
};

export const betChoices = { spade: "spade", heart: "heart", club: "club", diamond: "diamond" };

export const oddsMapper = { 5: "sixDevil", 4: "twin", 3: "small", 2: "big", 1: "qiuQiu", 0: "ordinaryCard" };

export const botChips = [
    20_000_000, 5_000_000, 1_000_000, 500_000, 200_000, 100_000, 50_000, 20_000, 10_000, 2000, 1000, 500, 200, 100, 50, 10, 5, 1,
];
