export const EXPERIENCES = {
  recent: [
    {
      name: 'DeFi Swap',
      description: 'Swap your digital assets',
      image: './assets/mock/images/defi.svg',
      subscribeAmount: '+200',
    },
    {
      name: 'Docu sign',
      description: 'sign smart contracts seamlessly',
      image: './assets/mock/images/docu.svg',
      subscribeAmount: '+1k',
    },
  ],
  other: [
    {
      name: 'DeFi Swap',
      description: 'Invest in digital assets',
      image: './assets/mock/images/defi.svg',
      subscribeAmount: '+200',
    },
    {
      name: 'DeFi Invest',
      description: 'Swap your digital assets',
      image: './assets/mock/images/defi-invest.svg',
      subscribeAmount: '+15k',
    },
    {
      name: 'DeFolio',
      description: 'Track your DeFi assets',
      image: './assets/mock/images/defolio.svg',
      subscribeAmount: '+12k',
    },
    {
      name: 'Docu sign',
      description: 'sign smart contracts seamlessly',
      image: './assets/mock/images/docu.svg',
      subscribeAmount: '+1k',
    },
  ],
};

export const TEST_COLLECTIBLES: Array<any> = [
  {
    nft_id: "thHkGvISXhucKPxr9BvB4",
    updated: 1642181349003,
    status: "active",
    category: "Digital Arts",
    created: 1642181349003,
    attributes: [
        {}
    ],
    description: "Al diego le gusta esto",
    owner_id: "wQWFNYPkTYy5rRzmWnO76",
    file_url: "/assets/panda_collectible.png",
    title: "medabot trucho"
  }
];

export const TEST_OFFERS: Array<any> = [
  {
    id: "136516",
    ammount: "20.055",
    date: "2021-06-07 09:22:06",
    owner: 'El kun'
  },
  {
    id: "994654",
    ammount: "0.325",
    date: "2021-12-07 09:22:06",
    owner: 'Lea'
  },
  {
    id: "55111",
    ammount: "1.231",
    date: "2022-01-07 09:22:06",
    owner: 'Julio'
  },
  {
    id: "123561",
    ammount: "12.221",
    date: "2022-01-01 09:22:06",
    owner: 'Fede'
  },
];

export const CATEGORIES: Array<any> = [
  {
    name: 'Exchanges',
    icon: './assets/experience/categories/exchanges.svg',
    backgroundColor: '#EAEFFF',
  },
  {
    name: 'Games',
    icon: './assets/experience/categories/games.svg',
    backgroundColor: '#F5F5F5',
  },
  {
    name: 'Marketplaces',
    icon: './assets/experience/categories/marketplaces.svg',
    backgroundColor: '#E2F9F3',
  },
  {
    name: 'Defi',
    icon: './assets/experience/categories/defi.svg',
    backgroundColor: '#FFF3EC',
  },
  {
    name: 'Collectibles',
    icon: './assets/experience/categories/collectibles.svg',
    backgroundColor: '#EBF5FF',
  },
  {
    name: 'Utilities',
    icon: './assets/experience/categories/utilities.svg',
    backgroundColor: '#F0EBFF',
  },
];

export const TEST_HISTORY: Array<any> = [
  {
    type: 'send',
    owner: 'Fede.near',
    id: "123",
    to: 'Lea.near',
    date: "2022-01-07 09:22:06",
    image: "/assets/account-1.png",

  },
  {
    type: 'mint',
    owner: 'kun.near',
    id: "124",
    to: '',
    date: "2022-01-07 09:22:06",
    image: "/assets/account-1.png",

  },
  {
    type: 'send',
    owner: 'Fede.near',
    id: "125",
    to: 'Lea.near',
    date: "2022-01-07 09:22:06",
    image: "/assets/account-1.png",

  }
];
