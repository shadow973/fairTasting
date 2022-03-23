import * as React from 'react';
import * as Updates from 'expo-updates';

const FTENV = () => {
    if (Updates.releaseChannel.startsWith('test')) {
        return { envName: 'testing', enableSentry: true, sentryEnv: 'testing', sentryDebug: true, apiUrl: 'https://test-api.fairtasting.io/v1', public: false, testPayments: true };
    } else if (Updates.releaseChannel.startsWith('stag')) {
        return { envName: 'staging', enableSentry: true, sentryEnv: 'staging', sentryDebug: true, apiUrl: 'https://api.fairtasting.io/v1', public: false, testPayments: false };
    }else if (Updates.releaseChannel.startsWith('prod')) {
        return { envName: 'production', enableSentry: true, sentryEnv: 'production', sentryDebug: true, apiUrl: 'https://api.fairtasting.io/v1', public: true, testPayments: false };
    }else{
        return { envName: 'development', sentryEnv: 'development', sentryDebug: true, apiUrl: 'https://dev-api.fairtasting.io/v1', public: false, testPayments: true };

        //   return { envName: 'development', sentryEnv: 'development', sentryDebug: true, apiUrl: 'http://192.168.1.249:8080/v1', public: false, testPayments: true };

    }
}

export default FTENV