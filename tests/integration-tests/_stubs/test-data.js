import gameSetting from "../../../src/game-settings";

const game = {
    id: gameSetting.id,
    name: gameSetting.name,
};

const currencyData = { code: "USD", name: "$US" };

const socketOptionsFunc = (port) => {
    return {
        socketUri: `http://localhost:${port}/user/${gameSetting.name.toLowerCase()}`,
        gameName: game.name,
        proxyRoute: "/socket.io",
    };
};

const gameConfig = {
    type: 0,
    name: gameSetting.name.toLowerCase(),
    minBet: 1,
    maxBet: 3000,
    maxBetPerChoices: { spade: 3000, heart: 3000, club: 3000, diamond: 3000 },
    odds: { sixDevil: 7, twin: 6, small: 5, big: 4, qiuQiu: 3, ordinaryCard: 2 },
    botenabled: true,
    hour_maxbot: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    bot_maxbet: 1000,
    choices_maxbet: { spade: 3000, heart: 3000, club: 3000, diamond: 3000 },
};

const tempRoundResult = {
    banker: { dominoes: [], handRankingId: 0, pipsOfSet: null },
    spade: { dominoes: [], handRankingId: 0, pipsOfSet: null },
    heart: { dominoes: [], handRankingId: 0, pipsOfSet: null },
    club: { dominoes: [], handRankingId: 0, pipsOfSet: null },
    diamond: { dominoes: [], handRankingId: 0, pipsOfSet: null },
};

const roundsData = [
    {
        id: 1,
        result: { ...tempRoundResult },
        settlementResult: {
            spade: 0,
            heart: 1,
            club: 0,
            diamond: 2,
        },
        exchangeRateId: 1,
    },
    {
        id: 2,
        result: { ...tempRoundResult },
        settlementResult: {
            spade: 0,
            heart: 1,
            club: 0,
            diamond: 2,
        },
        exchangeRateId: 1,
    },
    {
        id: 3,
        result: { ...tempRoundResult },
        settlementResult: {
            spade: 0,
            heart: 1,
            club: 0,
            diamond: 2,
        },
        exchangeRateId: 1,
    },
];

const userBetData = (uid) => {
    return [
        {
            freeBet: false,
            uid: uid,
            betwin: 0,
            currency: "$US",
            playerId: "1",
            name: "NormalUser",
            odds: gameConfig.odds,
            operatorId: "dummy-operator-id",
            rate: 1,
            spade: 102,
            heart: 0,
            club: 12,
            diamond: 0,
            siteId: "111",
            roundId: 1,
            paid: true,
            totalAmount: 114,
        },
        {
            freeBet: false,
            uid: uid,
            betwin: 0,
            currency: "$US",
            playerId: "1",
            name: "NormalUser",
            odd: 0,
            odds: gameConfig.odds,
            operatorId: "dummy-operator-id",
            rate: 1,
            spade: 100,
            heart: 10,
            club: 20,
            diamond: 0,
            siteId: "111",
            roundId: 3,
            paid: true,
            totalAmount: 130,
        },
    ];
};

const userBetLogData = (uid) => {
    return [
        {
            uid: uid,
            currency: "$US",
            playerId: "1",
            name: "NormalUser",
            operatorId: "dummy-operator-id",
            choice: "spade",
            amount: 100,
            rate: 1,
            siteId: "111",
            roundId: 3,
        },
        {
            uid: uid,
            currency: "$US",
            playerId: "1",
            name: "NormalUser",
            operatorId: "dummy-operator-id",
            choice: "heart",
            amount: 10,
            rate: 1,
            siteId: "111",
            roundId: 3,
        },
        {
            uid: uid,
            currency: "$US",
            playerId: "1",
            name: "NormalUser",
            operatorId: "dummy-operator-id",
            choice: "club",
            amount: 20,
            rate: 1,
            siteId: "111",
            roundId: 3,
        },
    ];
};

const promotions = [
    {
        gameId: gameSetting.id,
        startDateTime: new Date(new Date().setSeconds(new Date().getSeconds() + 15)),
        endDateTime: new Date(new Date().setSeconds(new Date().getSeconds() + 15 + 6)),
        isDaily: false,
        odds: { sixDevil: 7, twin: 6, small: 5, big: 4, qiuQiu: 3, ordinaryCard: 2 },
        status: "enabled",
    },
];

export { currencyData, game, gameConfig, promotions, roundsData, socketOptionsFunc, userBetData, userBetLogData };

