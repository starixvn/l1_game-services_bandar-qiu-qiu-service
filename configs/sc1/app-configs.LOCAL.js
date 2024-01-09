export default {
    hostingPort: 5000,
    apiSettings: {
        enabledApi: true,
        apiUrl: "http://l1-aws-game-api-local-service:5000",
        authUrl: "https://auth.lumigame.com",
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
        url: "mongodb://lmn_backend:LmnBackend@10.6.48.200:27101,10.6.64.200:27101,10.6.80.200:27101/?replicaSet=L1AWSLocal&appName=BandarQiuQiu",
        options: {
            dbName: "minigame",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            auto_reconnect: true,
        },
    },
    sentry: {
        sentryUrl: "http://d8f3387c3012766a47af79687de14a70@sentry-local-nginx.sentry/2",
        logIdentifier: "BandarQiuQiu",
        env: "AWS_LOCAL",
    },
    authenticateSettings: {
        url: "https://auth.lumigame.com",
        id: "game-services",
        secret: "gameservices@20luminet&",
        requestTimeout: 10000,
        useAuthenticate: true,
        audiences: ["api", "admin-api"],
    },
    userServiceSettings: {
        url: "https://l1-proxy.lumigame.com/user",
    },
    adminSecretKey: "asWDEerfOIdgsdqRTFabvmgh",
    metrics: {
        enable: true,
        secretKey: "6c1f0f28-70f2-46ae-b031-22624a6cd8df",
    },
    enableMsgpackParser: false,
    gameManagementApiSettings: {
        BASE: "https://l1-proxy.lumigame.com/game-management-service",
    },
    disableCors: false,
    otel: {
        system: "SG",
        enabled: true,
        endpoint: "https://jaeger-collector.lumigame.com/v1/traces",
    },
};
