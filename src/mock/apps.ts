export const TEST_APPS = {
    message: 'Apps retrieved successfully!',
    data: [
        {
            version: '1.0.3',
            app_url: 'https://nearapps.io/',
            downloads_count: 21408376,
            name: 'Crypto Vault',
            app_callback_url: 'https://nearapps.io/home',
            owner_id: 'h315j-3kn1i5-315j3',
            app_id: '24ouy682yt',
            developer: 'Nearlabs',
            module_access: [
                'listing',
                'offers',
                'transactions',
                'users'
            ],
            category: 'Finance',
            users_count: 22336391,
            tags: [
                'vault',
                'crypto'
            ]
        }
    ]
};

export const TEST_DETAILED_APP = {
    message: 'App retrieved successfully!',
    data: {
        version: '1.0.3',
        app_url: 'https://nearapps.io/',
        image_url: '/assets/mock/docu.svg',
        downloads_count: 21408376,
        name: 'Docu sign',
        description: 'sign smart contracts seamlessly',
        details: 'it is easy to electronically sign, manage and distribute all your contracts and documents safely, securely, anywhere, anytime- paperlessly.',
        app_callback_url: 'https://nearapps.io/home',
        owner_id: 'x1dO0CVk4RDfnXcszT263',
        app_id: 'c2dO0CVk4RDfnXcszT251',
        developer: 'Nearlabs',
        module_access: [
            'listing',
            'offers',
            'transactions',
            'users'
        ],
        category: 'Utilities',
        users_count: 22336391,
        tags: [
            'vault',
            'crypto'
        ],
        activities: [
            {
                user: {
                    avatar: '/assets/mock/johndoe.svg',
                    account: 'johndoe.near',
                },
                activity: 'signed the contract successfully',
                date: '19.01.2022'
            },
            {
                user: {
                    avatar: '/assets/mock/cryptoking.svg',
                    account: 'CryptoKing.near',
                },
                activity: 'requested to sign the contract',
                date: '13.01.2022'
            }
        ],
    }
};
