import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Welcome: '',
      FairDetails: '/fair-details',
      BarDetails: '/bar-details',
      TicketDetails: '/ticket-details',
      BetaTester: '/beta-test',
      BetaTesterVerify: '/beta-test/verify/:verification_code',
      WinebarDetails: '/winebar/:id',
      RestaurantDetails: '/restaurant/:id',
      Privacy: '/privacy',
      Terms: '/terms',
      CookiePolicy: '/cookies',
      AcceptableUsePolicy: '/aup',
      NotFound: '*',
    },
  },
};