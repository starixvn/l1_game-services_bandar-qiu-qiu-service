import { betChoices } from "./constants";

export default {
    id: 75,
    name: "BandarQiuQiu",
    durations: {
        wholeRound: 39,
        placingBets: 25,
        lockingBet: 3,
        dealDominoes: 4,
    },
    choices: Object.values(betChoices),
    choicesMapper: { spade: 1, heart: 2, club: 3, diamond: 4 },
    hedgeBetGroups: [],
    numberOfRoundHistory: 100,
};
