import { GameClientDriver, normalUser } from "sc-game-service-integration-utils";
import gameSettings from "./_stubs/game-settings";
import { startService } from "./_stubs/test-jobs";
import { getProcessId, buildConfigs, getTimeOutToPlacingBetTime, initUserSession, checkConnect } from "./_stubs/helper";
import { socketOptionsFunc } from "./_stubs/test-data";
const path = require("path");

const scriptName = path.basename(__filename);
const processId = getProcessId(scriptName);
const overrideGameConfigs = { botenabled: false };
startService(processId, overrideGameConfigs);

const appConfigs = buildConfigs(processId);
const socketOptions = socketOptionsFunc(appConfigs.hostingPort);

describe("rebet", () => {
    it("check connect", (done) => {
        checkConnect(processId, done);
    });

    it("should return rebet data", async () => {
        // Arrange
        const client = new GameClientDriver(socketOptions, initUserSession(normalUser));
        await client.handleSignedInEvent();
        client.sendInGameEvent();
        const inGameData = await client.handleGameEvent((inGameData) => inGameData.remainingTime);

        // Act
        setTimeout(() => {
            client.emit("rebet", { m: 1 });
        }, getTimeOutToPlacingBetTime(inGameData.remainingTime, gameSettings.durations) * 1000);

        // Assert
        const data = await client.handleGameEvent((data) => data.rebet);
        client.close();
        expect(data.ownBets).toEqual({ spade: 100, heart: 10, club: 20 });
    });
});
