import { GameClientDriver, normalUser } from "sc-game-service-integration-utils";
import gameSettings from "./_stubs/game-settings";
import { startService } from "./_stubs/test-jobs";
import {
    getProcessId,
    buildConfigs,
    getTimeOutToPlacingBetTime,
    getTimeOutToSettleTime,
    initUserSession,
    checkConnect,
} from "./_stubs/helper";
import { socketOptionsFunc } from "./_stubs/test-data";
const path = require("path");

const scriptName = path.basename(__filename);
const processId = getProcessId(scriptName);
const overrideGameConfigs = { botenabled: false };
const overrideAppConfigs = { enabledBoostedOdds: false };
startService(processId, overrideGameConfigs, overrideAppConfigs);

const appConfigs = buildConfigs(processId);
const socketOptions = socketOptionsFunc(appConfigs.hostingPort);

describe("when user joins game", () => {
    it("check connect", (done) => {
        checkConnect(processId, done);
    });

    describe("test data join game", () => {
        let userClientDriver;

        beforeEach(async () => {
            userClientDriver = new GameClientDriver(socketOptions, initUserSession(normalUser));
            await userClientDriver.handleSignedInEvent();
            userClientDriver.sendInGameEvent();
        });

        afterEach(() => {
            userClientDriver.close();
            userClientDriver = null;
        });

        it("should return game configs", async () => {
            // Act
            const result = await userClientDriver.handleGameEvent((inGameData) => inGameData.gameConfigs);
            const { gameConfigs } = result;

            // Assert
            expect(gameConfigs.minBet).toEqual(1);
            expect(gameConfigs.maxBet).toEqual(3000);
            expect(gameConfigs.maxBetPerChoices).toStrictEqual({
                spade: 3000,
                heart: 3000,
                club: 3000,
                diamond: 3000,
            });
            expect(gameConfigs.odds).toStrictEqual({
                sixDevil: 7,
                twin: 6,
                small: 5,
                big: 4,
                qiuQiu: 3,
                ordinaryCard: 2,
            });
        });

        it("should return user info", async () => {
            // Act
            const result = await userClientDriver.handleGameEvent((inGameData) => inGameData.user?.UID);
            const { user } = result;

            // Assert
            expect(user).toStrictEqual({
                UID: 1,
                avatarId: 1,
                currency: "$US",
                name: "NormalUser",
                rate: 1,
                red: 20000,
                type: false,
            });
        });

        it("should return round history", async () => {
            // Act
            const result = await userClientDriver.handleGameEvent((inGameData) => inGameData.roundHistory);
            const { roundHistory } = result;

            // Assert
            expect(roundHistory.length).toBeGreaterThan(0);
        });
    });

    describe("when join game in placing bet time", () => {
        let userClientDriver;

        beforeEach(async () => {
            userClientDriver = new GameClientDriver(socketOptions, initUserSession(normalUser));
            await userClientDriver.handleSignedInEvent();
            const inGameData = await userClientDriver.handleGameEvent((inGameData) => inGameData.remainingTime);
            const timeout = getTimeOutToPlacingBetTime(inGameData.remainingTime, gameSettings.durations) * 1000;
            setTimeout(() => {
                userClientDriver.sendInGameEvent();
            }, timeout);
        });

        afterEach(() => {
            userClientDriver.close();
            userClientDriver = null;
        });

        it("should return resultHash with hashValue when join game in placing bet time", async () => {
            // Act
            const result = await userClientDriver.handleGameEvent((inGameData) => inGameData.gameConfigs && inGameData.resultHash);
            const { resultHash } = result;

            // Assert
            expect(resultHash.hashValue).not.toBeEmpty();
        });
    });

    describe("when join game in settle time", () => {
        let userClientDriver;

        beforeEach(async () => {
            userClientDriver = new GameClientDriver(socketOptions, initUserSession(normalUser));
            await userClientDriver.handleSignedInEvent();
            const inGameData = await userClientDriver.handleGameEvent((inGameData) => inGameData.remainingTime);
            const timeout = getTimeOutToSettleTime(inGameData.remainingTime, gameSettings.durations) * 1000;
            setTimeout(() => {
                userClientDriver.sendInGameEvent();
            }, timeout);
        });

        afterEach(() => {
            userClientDriver.close();
            userClientDriver = null;
        });
        it("should return resultHash with rawValue", async () => {
            // Act
            const result = await userClientDriver.handleGameEvent((inGameData) => inGameData.gameConfigs && inGameData.resultHash);
            const { resultHash } = result;

            // Assert
            expect(resultHash.rawValue).not.toBeEmpty();
        });
    });
});
