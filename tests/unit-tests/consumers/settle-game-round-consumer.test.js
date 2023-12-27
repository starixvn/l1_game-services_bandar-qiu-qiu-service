import { stub } from "jest-micro-auto-stub";
import { Core, Table } from "sc-game-base";
import SettleGameRoundConsumer from "../../../src/consumers/settle-game-round-consumer";
import { calculateHand } from "../../../src/helpers/hand-helper";
import { handRankingId } from "../../../src/constants";
import GameManagementApiClientFactory from "sc-game-base/src/core/game-management-api";

jest.mock("../../../src/helpers/hand-helper", () => ({
    calculateHand: jest.fn(),
}));

const gameManagementApiClientFactory = new GameManagementApiClientFactory({});
describe("SettleGameRoundConsumer tests", () => {
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
        gameManagementApiClientFactory,
    });
    it("Inherit Table.EventConsumers.TableSettleGameRoundConsumer", () => {
        expect(consumer instanceof Table.EventConsumers.TableSettleGameRoundConsumer).toBeTruthy();
    });

    describe("generateResult", () => {
        it("should return expected", () => {
            // arrange
            consumer.gameData.result = [
                "00",
                "01",
                "02",
                "03",
                "11",
                "12",
                "13",
                "14",
                "22",
                "23",
                "24",
                "25",
                "33",
                "34",
                "35",
                "36",
                "44",
                "45",
                "46",
                "55",
            ];
            const banker = { dominoes: ["00", "01", "02", "03"], handRankingId: 1 };
            const spade = { dominoes: ["11", "12", "13", "14"], handRankingId: 2 };
            const heart = { dominoes: ["22", "23", "24", "25"], handRankingId: 3 };
            const club = { dominoes: ["33", "34", "35", "36"], handRankingId: 4 };
            const diamond = { dominoes: ["44", "45", "46", "55"], handRankingId: 0 };
            calculateHand
                .mockReturnValueOnce(banker)
                .mockReturnValueOnce(spade)
                .mockReturnValueOnce(heart)
                .mockReturnValueOnce(club)
                .mockReturnValueOnce(diamond);

            // act
            const actual = consumer.generateResult();

            // assert
            expect(actual).toEqual({ banker, spade, heart, club, diamond });
        });
    });

    describe("calculateBetResult", () => {
        const odds = { ordinaryCard: 2, qiuQiu: 3, big: 4, small: 5, twin: 6, sixDevil: 7 };

        const testCases = [
            {
                roundResult: { spade: { handRankingId: handRankingId.ordinaryCard }, heart: { handRankingId: handRankingId.ordinaryCard } },
                settlementResult: { spade: 1, heart: 1, club: 1, diamond: 1 },
                expected: {
                    totalBetAmount: 20,
                    totalWin: 40,
                    netWin: 20,
                    totalLost: 0,
                    winningByChoices: { spade: 20, heart: 20, club: 0, diamond: 0 },
                },
                bet: { spade: 10, heart: 10 },
                name: "win all bets",
            },
            {
                roundResult: { spade: { handRankingId: handRankingId.ordinaryCard }, heart: { handRankingId: handRankingId.ordinaryCard } },
                settlementResult: { spade: 2, heart: 2, club: 1, diamond: 1 },
                expected: {
                    totalBetAmount: 20,
                    totalWin: 20,
                    netWin: 0,
                    totalLost: 0,
                    winningByChoices: { spade: 10, heart: 10, club: 0, diamond: 0 },
                },
                bet: { spade: 10, heart: 10 },
                name: "tie all bets",
            },
            {
                roundResult: { spade: { handRankingId: handRankingId.ordinaryCard }, heart: { handRankingId: handRankingId.ordinaryCard } },
                settlementResult: { spade: 0, heart: 0, club: 1, diamond: 1 },
                expected: {
                    totalBetAmount: 20,
                    totalWin: 0,
                    netWin: 0,
                    totalLost: 20,
                    winningByChoices: { spade: 0, heart: 0, club: 0, diamond: 0 },
                },
                bet: { spade: 10, heart: 10 },
                name: "lose all bets",
            },
            {
                roundResult: { spade: { handRankingId: handRankingId.ordinaryCard }, heart: { handRankingId: handRankingId.ordinaryCard } },
                settlementResult: { spade: 1, heart: 0, club: 1, diamond: 1 },
                expected: {
                    totalBetAmount: 20,
                    totalWin: 20,
                    netWin: 10,
                    totalLost: 10,
                    winningByChoices: { spade: 20, heart: 0, club: 0, diamond: 0 },
                },
                bet: { spade: 10, heart: 10 },
                name: "win 1 lose 1",
            },
            {
                roundResult: { spade: { handRankingId: handRankingId.ordinaryCard }, heart: { handRankingId: handRankingId.ordinaryCard } },
                settlementResult: { spade: 1, heart: 2, club: 1, diamond: 1 },
                expected: {
                    totalBetAmount: 20,
                    totalWin: 30,
                    netWin: 10,
                    totalLost: 0,
                    winningByChoices: { spade: 20, heart: 10, club: 0, diamond: 0 },
                },
                bet: { spade: 10, heart: 10 },
                name: "win 1 tie 1",
            },
        ];

        testCases.forEach((testCase) => {
            it(`should return expected when ${testCase.name}`, () => {
                // arrange
                const { roundResult, settlementResult, expected, bet } = testCase;

                // act
                const actual = consumer.calculateBetResult(settlementResult, bet, odds, roundResult);

                // assert
                expect(actual).toEqual(expected);
            });
        });
    });
});
