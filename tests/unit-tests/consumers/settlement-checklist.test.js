import { stub } from "jest-micro-auto-stub";
import { Core, Table } from "sc-game-base";
import SettleGameRoundConsumer from "../../../src/consumers/settle-game-round-consumer";
import { calculateHand } from "../../../src/helpers/hand-helper";
import { qiuQiuTestCases, sixDevilTestCases, smallHandTestCases, twinTestCases } from "../helpers/testcases";
import { settleHand } from "../../../src/helpers/settle-rule";

describe("Settlement checklist", () => {
    const definition = new Table.TableGameDefinition({ id: 1, name: "game name" });
    definition.choices = ["spade", "heart", "club", "diamond"];
    definition.generateResult = jest.fn();
    definition.settle = jest.fn();
    const gameData = new Table.TableGameData(0);
    const roundResultPublisher = stub(Core.BaseEventPublishers.RoundResultPublisher);
    const userBetResultPublisher = stub(Core.BaseEventPublishers.UserBetResultPublisher);
    const endGame = jest.fn();

    /** @type {mongoose.Model}*/
    const roundsRepository = { find: () => {}, create: () => {} };
    /** @type {mongoose.Model}*/
    const betsRepository = { find: () => {} };

    /** @type {mongoose.Model}*/
    const tempBetsRepository = { find: () => {} };
    const consumer = new SettleGameRoundConsumer({
        definition,
        gameData,
        roundResultPublisher,
        userBetResultPublisher,
        endGame,
        roundsRepository,
        betsRepository,
        tempBetsRepository,
    });
    const odds = { ordinaryCard: 2, qiuQiu: 3, big: 4, small: 5, twin: 6, sixDevil: 7 };

    const betSpade = { spade: 100 };

    const testCase = [
        {
            name: "s2",
            playerDominoes: { spade: ["06", "15", "24", "33"] },
            bankerDominoes: twinTestCases[0].dominoes,
            bet: betSpade,
            expected: {
                totalBetAmount: 100,
                totalWin: 700,
                netWin: 600,
                totalLost: 0,
                winningByChoices: { spade: 700 },
            },
        },
        {
            name: "s3",
            playerDominoes: { spade: ["00", "33", "55", "66"] },
            bankerDominoes: ["01", "12", "03", "02"],
            bet: betSpade,
            expected: {
                totalBetAmount: 100,
                totalWin: 600,
                netWin: 500,
                totalLost: 0,
                winningByChoices: { spade: 600 },
            },
        },
        {
            name: "s4",
            playerDominoes: { spade: ["00", "11", "55", "66"] },
            bankerDominoes: ["06", "15", "24", "33"],
            bet: betSpade,
            expected: {
                totalBetAmount: 100,
                totalWin: 0,
                netWin: 0,
                totalLost: 100,
                winningByChoices: { spade: 0 },
            },
        },
        {
            name: "s5",
            playerDominoes: { spade: ["01", "12", "03", "02"] },
            bankerDominoes: ["46", "55", "56", "66"],
            bet: betSpade,
            expected: {
                totalBetAmount: 100,
                totalWin: 500,
                netWin: 400,
                totalLost: 0,
                winningByChoices: { spade: 500 },
            },
        },
        {
            name: "s6",
            playerDominoes: { spade: ["01", "12", "03", "02"] },
            bankerDominoes: ["00", "33", "55", "66"],
            bet: betSpade,
            expected: {
                totalBetAmount: 100,
                totalWin: 0,
                netWin: 0,
                totalLost: 100,
                winningByChoices: { spade: 0 },
            },
        },
        {
            name: "s7",
            playerDominoes: { spade: ["36", "45", "46", "66"] },
            bankerDominoes: ["01", "26", "05", "22"],
            bet: betSpade,
            expected: {
                totalBetAmount: 100,
                totalWin: 400,
                netWin: 300,
                totalLost: 0,
                winningByChoices: { spade: 400 },
            },
        },
        {
            name: "s8",
            playerDominoes: { spade: ["36", "45", "46", "66"] },
            bankerDominoes: ["01", "12", "03", "02"],
            bet: betSpade,
            expected: {
                totalBetAmount: 100,
                totalWin: 0,
                netWin: 0,
                totalLost: 100,
                winningByChoices: { spade: 0 },
            },
        },
        {
            name: "s9",
            playerDominoes: { spade: ["04", "05", "66", "16"] },
            bankerDominoes: ["22", "14", "55", "26"],
            bet: betSpade,
            expected: {
                totalBetAmount: 100,
                totalWin: 300,
                netWin: 200,
                totalLost: 0,
                winningByChoices: { spade: 300 },
            },
        },
        {
            name: "s10",
            playerDominoes: { spade: ["12", "33", "44", "01"] },
            bankerDominoes: ["06", "03", "55", "45"],
            bet: betSpade,
            expected: {
                totalBetAmount: 100,
                totalWin: 100,
                netWin: 0,
                totalLost: 0,
                winningByChoices: { spade: 100 },
            },
        },
        {
            name: "s11",
            playerDominoes: { spade: ["12", "33", "44", "01"] },
            bankerDominoes: ["36", "45", "46", "66"],
            bet: betSpade,
            expected: {
                totalBetAmount: 100,
                totalWin: 0,
                netWin: 0,
                totalLost: 100,
                winningByChoices: { spade: 0 },
            },
        },
        {
            name: "s13",
            playerDominoes: { spade: ["44", "01", "02", "12"] },
            bankerDominoes: ["33", "11", "56", "06"],
            bet: betSpade,
            expected: {
                totalBetAmount: 100,
                totalWin: 200,
                netWin: 100,
                totalLost: 0,
                winningByChoices: { spade: 200 },
            },
        },
        {
            name: "s14",
            playerDominoes: { spade: ["44", "01", "02", "12"] },
            bankerDominoes: ["25", "56", "04", "03"],
            bet: betSpade,
            expected: {
                totalBetAmount: 100,
                totalWin: 200,
                netWin: 100,
                totalLost: 0,
                winningByChoices: { spade: 200 },
            },
        },
        {
            name: "s15",
            playerDominoes: { spade: ["05", "13", "23", "46"] },
            bankerDominoes: ["24", "02", "14", "01"],
            bet: betSpade,
            expected: {
                totalBetAmount: 100,
                totalWin: 200,
                netWin: 100,
                totalLost: 0,
                winningByChoices: { spade: 200 },
            },
        },
        {
            name: "s16",
            playerDominoes: { spade: ["05", "04", "12", "01"] },
            bankerDominoes: ["23", "03", "14", "02"],
            bet: betSpade,
            expected: {
                totalBetAmount: 100,
                totalWin: 200,
                netWin: 100,
                totalLost: 0,
                winningByChoices: { spade: 200 },
            },
        },
        {
            name: "s17",
            playerDominoes: { spade: ["14", "13", "23", "46"] },
            bankerDominoes: ["16", "01", "04", "03"],
            bet: betSpade,
            expected: {
                totalBetAmount: 100,
                totalWin: 100,
                netWin: 0,
                totalLost: 0,
                winningByChoices: { spade: 100 },
            },
        },
        {
            name: "s18",
            playerDominoes: { spade: ["22", "23", "01", "12"] },
            bankerDominoes: ["33", "02", "56", "06"],
            bet: betSpade,
            expected: {
                totalBetAmount: 100,
                totalWin: 0,
                netWin: 0,
                totalLost: 100,
                winningByChoices: { spade: 0 },
            },
        },
        {
            name: "s19",
            playerDominoes: { spade: ["06", "03", "13", "02"] },
            bankerDominoes: ["14", "12", "34", "46"],
            bet: betSpade,
            expected: {
                totalBetAmount: 100,
                totalWin: 0,
                netWin: 0,
                totalLost: 100,
                winningByChoices: { spade: 0 },
            },
        },
        {
            name: "s20",
            playerDominoes: { spade: ["15", "02", "14", "66"] },
            bankerDominoes: ["36", "55", "56", "13"],
            bet: betSpade,
            expected: {
                totalBetAmount: 100,
                totalWin: 200,
                netWin: 100,
                totalLost: 0,
                winningByChoices: { spade: 200 },
            },
        },
        {
            name: "s21",
            playerDominoes: { spade: ["56", "03", "46", "12"] },
            bankerDominoes: ["23", "04", "26", "02"],
            bet: betSpade,
            expected: {
                totalBetAmount: 100,
                totalWin: 200,
                netWin: 100,
                totalLost: 0,
                winningByChoices: { spade: 200 },
            },
        },
        {
            name: "s22",
            playerDominoes: { spade: ["16", "01", "04", "03"] },
            bankerDominoes: ["14", "13", "23", "46"],
            bet: betSpade,
            expected: {
                totalBetAmount: 100,
                totalWin: 100,
                netWin: 0,
                totalLost: 0,
                winningByChoices: { spade: 100 },
            },
        },
        {
            name: "s23",
            playerDominoes: { spade: ["14", "03", "23", "01"] },
            bankerDominoes: ["05", "04", "12", "02"],
            bet: betSpade,
            expected: {
                totalBetAmount: 100,
                totalWin: 0,
                netWin: 0,
                totalLost: 100,
                winningByChoices: { spade: 0 },
            },
        },
        {
            name: "s24",
            playerDominoes: { spade: ["14", "13", "23", "12"] },
            bankerDominoes: ["35", "00", "66", "01"],
            bet: betSpade,
            expected: {
                totalBetAmount: 100,
                totalWin: 200,
                netWin: 100,
                totalLost: 0,
                winningByChoices: { spade: 200 },
            },
        },
        {
            name: "s25",
            playerDominoes: { spade: ["35", "00", "66", "01"] },
            bankerDominoes: ["14", "13", "23", "12"],
            bet: betSpade,
            expected: {
                totalBetAmount: 100,
                totalWin: 0,
                netWin: 0,
                totalLost: 100,
                winningByChoices: { spade: 0 },
            },
        },
        {
            name: "s26",
            playerDominoes: { spade: ["24", "02", "13", "11"] },
            bankerDominoes: ["35", "55", "66", "00"],
            bet: betSpade,
            expected: {
                totalBetAmount: 100,
                totalWin: 200,
                netWin: 100,
                totalLost: 0,
                winningByChoices: { spade: 200 },
            },
        },
        {
            name: "s27",
            playerDominoes: { spade: ["35", "55", "66", "00"] },
            bankerDominoes: ["24", "02", "13", "11"],
            bet: betSpade,
            expected: {
                totalBetAmount: 100,
                totalWin: 0,
                netWin: 0,
                totalLost: 100,
                winningByChoices: { spade: 0 },
            },
        },
        {
            name: "s28",
            playerDominoes: { spade: ["44", "01", "02", "12"] },
            bankerDominoes: ["22", "14", "01", "13"],
            bet: betSpade,
            expected: {
                totalBetAmount: 100,
                totalWin: 200,
                netWin: 100,
                totalLost: 0,
                winningByChoices: { spade: 200 },
            },
        },
        {
            name: "s29",
            playerDominoes: { spade: ["22", "14", "01", "13"] },
            bankerDominoes: ["24", "12", "23", "46"],
            bet: betSpade,
            expected: {
                totalBetAmount: 100,
                totalWin: 200,
                netWin: 100,
                totalLost: 0,
                winningByChoices: { spade: 200 },
            },
        },
        {
            name: "s30",
            playerDominoes: { spade: ["14", "13", "23", "46"] },
            bankerDominoes: ["24", "03", "02", "12"],
            bet: betSpade,
            expected: {
                totalBetAmount: 100,
                totalWin: 100,
                netWin: 0,
                totalLost: 0,
                winningByChoices: { spade: 100 },
            },
        },
        {
            name: "s31",
            playerDominoes: { spade: ["22", "14", "01", "13"] },
            bankerDominoes: ["44", "01", "02", "12"],
            bet: betSpade,
            expected: {
                totalBetAmount: 100,
                totalWin: 0,
                netWin: 0,
                totalLost: 100,
                winningByChoices: { spade: 0 },
            },
        },
        {
            name: "s33",
            playerDominoes: {
                spade: smallHandTestCases[0].dominoes,
                heart: ["44", "01", "02", "24"],
                club: qiuQiuTestCases[1].dominoes,
                diamond: sixDevilTestCases[0].dominoes,
            },
            bankerDominoes: qiuQiuTestCases[0].dominoes,
            bet: { spade: 100, heart: 100, club: 100, diamond: 100 },
            expected: {
                totalBetAmount: 400,
                totalWin: 1300,
                netWin: 1000,
                totalLost: 100,
                winningByChoices: { spade: 500, heart: 0, club: 100, diamond: 700 },
            },
        },
        {
            name: "s34",
            playerDominoes: {
                spade: ["36", "00", "55", "45"],
                club: ["33", "11", "04", "13"],
                diamond: ["14", "03", "66", "56"],
            },
            bankerDominoes: ["16", "02", "23", "46"],
            bet: { spade: 100, club: 100, diamond: 100 },
            expected: {
                totalBetAmount: 300,
                totalWin: 500,
                netWin: 300,
                totalLost: 100,
                winningByChoices: { spade: 300, club: 200, diamond: 0 },
            },
        },
        {
            name: "s35",
            playerDominoes: {
                spade: ["12", "15", "04", "55"],
                heart: ["66", "16", "46", "56"],
                club: ["01", "35", "05", "22"],
                diamond: ["11", "34", "26", "03"],
            },
            bankerDominoes: ["25", "02", "44", "24"],
            bet: { spade: 100, heart: 100, club: 100, diamond: 100 },
            expected: {
                totalBetAmount: 400,
                totalWin: 900,
                netWin: 600,
                totalLost: 100,
                winningByChoices: { spade: 200, heart: 400, club: 300, diamond: 0 },
            },
        },
        {
            name: "s36",
            playerDominoes: {
                spade: ["23", "13", "66", "00"],
                heart: ["44", "01", "46", "05"],
                club: ["12", "24", "02", "35"],
                diamond: ["11", "34", "36", "45"],
            },
            bankerDominoes: ["55", "26", "03", "14"],
            bet: { spade: 100, heart: 100, club: 100, diamond: 100 },
            expected: {
                totalBetAmount: 400,
                totalWin: 400,
                netWin: 200,
                totalLost: 200,
                winningByChoices: { spade: 200, heart: 0, club: 0, diamond: 200 },
            },
        },
        {
            name: "s37",
            playerDominoes: {
                spade: ["04", "05", "13", "14"],
                heart: ["25", "46", "56", "66"],
                club: ["01", "02", "03", "12"],
                diamond: ["00", "11", "22", "44"],
            },
            bankerDominoes: ["06", "15", "24", "33"],
            bet: { spade: 100, heart: 100, club: 100, diamond: 100 },
            expected: {
                totalBetAmount: 400,
                totalWin: 0,
                netWin: 0,
                totalLost: 400,
                winningByChoices: { spade: 0, heart: 0, club: 0, diamond: 0 },
            },
        },
        {
            name: "s38",
            playerDominoes: {
                heart: ["25", "46", "56", "66"],
                diamond: ["36", "55", "16", "23"],
            },
            bankerDominoes: ["04", "05", "13", "14"],
            bet: { heart: 100, diamond: 100 },
            expected: {
                totalBetAmount: 200,
                totalWin: 400,
                netWin: 300,
                totalLost: 100,
                winningByChoices: { heart: 400, diamond: 0 },
            },
        },
    ];
    testCase.forEach((testCase) => {
        it(`case: ${testCase.name} - should return winning by choices ${JSON.stringify(testCase.expected.winningByChoices)}`, () => {
            // arrange
            const { playerDominoes, bankerDominoes, bet, expected } = testCase;
            const roundResult = Object.keys(playerDominoes).reduce((result, choice) => {
                result[choice] = calculateHand(playerDominoes[choice]);
                return result;
            }, {});
            const bankerHand = calculateHand(bankerDominoes);
            const settlementResult = Object.keys(playerDominoes).reduce((result, choice) => {
                result[choice] = settleHand(bankerHand, roundResult[choice]);
                return result;
            }, {});

            // act
            const actual = consumer.calculateBetResult(settlementResult, bet, odds, roundResult);

            // assert
            expect(actual).toEqual(expected);
        });
    });
});
