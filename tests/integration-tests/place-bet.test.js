import { GameClientDriver, normalUser, eventTypes } from "sc-game-service-integration-utils";
import gameSettings from "./_stubs/game-settings";
import { startService } from "./_stubs/test-jobs";
import {
    getProcessId,
    buildConfigs,
    getTimeOutToBetInvalid,
    getTimeOutToPlacingBetTime,
    initUserSession,
    checkConnect,
} from "./_stubs/helper";
import { socketOptionsFunc } from "./_stubs/test-data";
const path = require("path");

const scriptName = path.basename(__filename);
const processId = getProcessId(scriptName);
const overrideGameConfigs = { botenabled: false };
startService(processId, overrideGameConfigs);

const appConfigs = buildConfigs(processId);
const socketOptions = socketOptionsFunc(appConfigs.hostingPort);

describe("place bet", () => {
    it("check connect", (done) => {
        checkConnect(processId, done);
    });

    describe("when place bet in placing bet time", () => {
        it("should return own bet data", async () => {
            // Arrange
            const client = new GameClientDriver(socketOptions, initUserSession(normalUser));
            await client.handleSignedInEvent();
            client.sendInGameEvent();
            const inGameData = await client.handleGameEvent((data) => data.remainingTime);
            const timeout = getTimeOutToPlacingBetTime(inGameData.remainingTime, gameSettings.durations) * 1000;

            // Act
            setTimeout(() => {
                client.emit(eventTypes.bet, { betChoice: "spade", amount: 101 });
            }, timeout);

            // Assert
            const data = await client.handleGameEvent((data) => data.endBet);
            client.close();

            expect(data.betChoice).toBe("spade");
            expect(data.endBet).toBe(101);
            expect(data.ownBets).toEqual({ spade: 101 });
            expect(data.ownChip).toEqual({ betChoice: "spade", amount: 101 });
        });
    });

    describe("when place bet NOT in placing bet time", () => {
        it("should return invalid", async () => {
            // Arrange
            const client = new GameClientDriver(socketOptions, initUserSession(normalUser));
            await client.handleSignedInEvent();
            client.sendInGameEvent();
            const inGameData = await client.handleGameEvent((data) => data.remainingTime);

            // Act
            setTimeout(() => {
                client.emit(eventTypes.bet, { betChoice: "spade", amount: 100 });
            }, getTimeOutToBetInvalid(inGameData.remainingTime, gameSettings.durations) * 1000);

            // Assert
            const data = await client.handleGameEvent((data) => data.endBet);
            client.close();
            expect(data.endBet).toBe(-1);
        });
    });
});
