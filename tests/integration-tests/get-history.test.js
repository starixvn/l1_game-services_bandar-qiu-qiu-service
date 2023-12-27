import { GameClientDriver, normalUser } from "sc-game-service-integration-utils";
import { startService } from "./_stubs/test-jobs";
import { getProcessId, buildConfigs, initUserSession, checkConnect } from "./_stubs/helper";
import { socketOptionsFunc } from "./_stubs/test-data";
const path = require("path");

const scriptName = path.basename(__filename);
const processId = getProcessId(scriptName);
const overrideGameConfigs = { botenabled: false };
startService(processId, overrideGameConfigs);

const appConfigs = buildConfigs(processId);
const socketOptions = socketOptionsFunc(appConfigs.hostingPort);

describe("when get history", () => {
    it("check connect", (done) => {
        checkConnect(processId, done);
    });

    it("should return history", async () => {
        // Arrange
        const expectedData = [
            {
                spade: 100,
                heart: 10,
                club: 20,
                diamond: 0,
                freeBet: false,
                name: "NormalUser",
                odds: { sixDevil: 7, twin: 6, small: 5, big: 4, qiuQiu: 3, ordinaryCard: 2 },
                rate: 1,
                betLogDetails: [
                    { choice: "club", amount: 20, rebet: false, rate: 1, roundId: 3 },
                    { choice: "heart", amount: 10, rebet: false, rate: 1, roundId: 3 },
                    { choice: "spade", amount: 100, rebet: false, rate: 1, roundId: 3 },
                ],
                roundId: 3,
                phien: 3,
                totalAmount: 130,
            },
            {
                spade: 102,
                heart: 0,
                club: 12,
                diamond: 0,
                freeBet: false,
                name: "NormalUser",
                odds: { sixDevil: 7, twin: 6, small: 5, big: 4, qiuQiu: 3, ordinaryCard: 2 },
                rate: 1,
                betLogDetails: [],
                roundId: 1,
                phien: 1,
                totalAmount: 114,
            },
        ];
        const client = new GameClientDriver(socketOptions, initUserSession(normalUser));
        await client.handleSignedInEvent();
        client.sendInGameEvent();
        await client.handleGameEvent((inGameData) => inGameData.remainingTime);
        setTimeout(() => {
            client.sendGetHistoryEvent();
        }, 1000);

        // Act
        const result = await client.handleGameEvent((data) => data.history);
        const { history } = result;
        client.close();

        // Assert
        const actualBetLogs = history.betLogs.map((betLog) => {
            delete betLog.result;
            delete betLog.settlementResult;
            delete betLog.betwin;
            return betLog;
        });

        expect(actualBetLogs).toEqual(expectedData);
        expect(history.total).toBeGreaterThan(0);
        expect(history.page).toBe(1);
        expect(history.pageSize).toBe(8);
    });
});
