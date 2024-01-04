export default {
    hostingPort: 5000,
    apiSettings: {
        enabledApi: true,
        apiUrl: "http://l1-aws-game-api-sit-service:5000",
        authUrl: "https://l1sitauth.sgamesuat.com",
        client: {
            id: "game-server",
            secret: "gameserver@20luminet&",
        },
        useAuthenticate: true,
        requestTimeout: 10000,
        placeBetTimeout: 2000,
        enabledApiLogs: true,
    },
    socketOptions: {
        pingInterval: 60 * 1000,
        pingTimeout: 60 * 1000,
        transports: ["websocket"],
        allowUpgrades: false,
        perMessageDeflate: false,
    },
    enabledLogs: true,
    database: {
        url: "mongodb://lmn_backend:LmnBackend%40517@10.88.127.154:27301/?replicaSet=L1AWSsit&appName=BandarQiuQiu",
        options: {
            dbName: "minigame",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            auto_reconnect: true,
        },
    },
    sentry: {
        sentryUrl: "https://52368c4019044019885440599c180bda@scsentry.sgamesuat.com/24",
        logIdentifier: "BandarQiuQiu",
        env: "AWS_SIT",
    },
    authenticateSettings: {
        url: "https://l1sitauth.sgamesuat.com",
        id: "game-services",
        secret: "gameservices@20luminet&",
        requestTimeout: 10000,
        useAuthenticate: true,
        audiences: ["api", "admin-api"],
    },
    userServiceSettings: {
        url: "https://l1uatproxy.sgamesuat.com/sit/user",
    },
    adminSecretKey: "asWDEerfOIdgsdqRTFabvmgh",
    metrics: {
        enable: true,
        secretKey: "6c1f0f28-70f2-46ae-b031-22624a6cd8df",
    },
    enableMsgpackParser: true,
    gameManagementApiSettings: {
        BASE: "https://l1uatproxy.sgamesuat.com/sit/game-management-service",
    },
};
