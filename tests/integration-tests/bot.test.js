import { GameClientDriver, normalUser, eventTypes } from "sc-game-service-integration-utils";
import { startService } from "./_stubs/test-jobs";
import { getProcessId, buildConfigs, initUserSession, checkConnect } from "./_stubs/helper";
import { socketOptionsFunc } from "./_stubs/test-data";
const path = require("path");

const scriptName = path.basename(__filename);
const processId = getProcessId(scriptName);
startService(processId);

const appConfigs = buildConfigs(processId);
const socketOptions = socketOptionsFunc(appConfigs.hostingPort);

describe("bot", () => {
    it("check connect", (done) => {
        checkConnect(processId, done);
    });

    it("should receive bot bets", async () => {
        // Arrange
        const client = new GameClientDriver(socketOptions, initUserSession(normalUser));
        await client.handleSignedInEvent();
        client.sendInGameEvent();

        // Act
        const result = await client.handleGameEvent((data) => data.playerChip);
        client.close();

        // Assert
        expect(result.playerChip).not.toBeNull();
    });
});
