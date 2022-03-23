const FTENV = () => {
    if (window.location.href.startsWith('https://test.fairtasting')) {
        return { imageModifier: 'test', envName: 'testing', sentryEnv: 'testing', sentryDebug: true, apiUrl: 'https://test-api.fairtasting.io/v1', public: false, testPayments: true };
    } else if (window.location.href.startsWith('https://stage.fairtasting')) {
        return { imageModifier: 'stage', envName: 'staging', sentryEnv: 'staging', sentryDebug: true, apiUrl: 'https://api.fairtasting.io/v1', public: false, testPayments: false };
    } else if (window.location.href.startsWith('https://fairtasting')) {
        return { imageModifier: 'fairtasting', envName: 'production', sentryEnv: 'production', sentryDebug: false, apiUrl: 'https://api.fairtasting.io/v1', public: true, testPayments: false };
    } else {
        return { imageModifier: 'dev', envName: 'development', sentryEnv: 'development', sentryDebug: true, apiUrl: 'https://dev-api.fairtasting.io/v1', public: false, testPayments: true };
    }
}

export default FTENV