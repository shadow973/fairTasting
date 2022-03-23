module.exports = function(api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                require.resolve('babel-plugin-module-resolver'),
                {
                    root: ['./'],
                    extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg', '.mp4'],
                    alias: {
                        '@assets': './assets',
                        '@fair': './src',
                        'react-native-maps': 'react-native-web-maps',
                    }
                }
            ],
            'react-native-reanimated/plugin'

        ]

    };
};