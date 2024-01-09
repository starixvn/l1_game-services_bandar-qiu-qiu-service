export default {
    hostingPort: 5000,
    apiSettings: {
        enabledApi: true,
        apiUrl: "http://l2-aws-game-api-uat-service:5000",
        authUrl: "https://l2uatauth.sgamesuat.com",
        client: {
            id: "game-server",
            secret: "gameserver@20luminet&",
        },
        useAuthenticate: true,
        placeBetTimeout: 2000,
        requestTimeout: 10000, // 10s
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
        url: "mongodb://lmn_backend:LmnBackend%4022027@10.88.127.152:37201/?replicaSet=L2AWSuat&appName=BandarQiuQiu",
        options: {
            dbName: "minigame",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            auto_reconnect: true,
        },
    },
    sentry: {
        sentryUrl: "http://fb02b60de4de831e4633fbb4d8a5d26f@sentry-nginx.sentry/8",
        logIdentifier: "BandarQiuQiu",
        env: "AWS_UAT",
    },
    authenticateSettings: {
        url: "https://l2uatauth.sgamesuat.com",
        id: "game-services",
        secret: "gameservices@20luminet&",
        requestTimeout: 10000,
        useAuthenticate: true,
        audiences: ["api", "admin-api"],
    },
    userServiceSettings: {
        url: "https://l2uatproxy.sgamesuat.com/uat/user",
    },
    adminSecretKey: "asWDEerfOIdgsdqRTFabvmgh",
    metrics: {
        enable: true,
        secretKey: "6c1f0f28-70f2-46ae-b031-22624a6cd8df",
    },
    enableMsgpackParser: true,
    gameManagementApiSettings: {
        BASE: "https://l2uatproxy.sgamesuat.com/uat/game-management-service",
    },
};
