import { ethers } from 'ethers';

export const PROTOCOL_ADDRESS = '0xdCF5b52f2E64C49F2E51B8D39899e4d2D63f3640';
export const MOBL_ADDRESS = '0x5FeF39b578DeEefa4485A7E5944c7691677d5dd4';
export const GOVERNOR_ADDRESS = '0x64E62AedFF4D5aE8Ed811fC73258624D4e5553b3';
export const VAULT_ADDRESS = '0x85Ca27FefC226E5B7DeBAb80f7564Df2BfaB8Cd4';

export const RPC_URL = 'https://polygon-rpc.com';

export const supportedRPCs = [
    { name: 'Avalanche C-Chain', url: 'https://api.avax.network/ext/bc/C/rpc', explorer: 'https://snowtrace.io' },
    { name: 'BNB Smart Chain (BEP20)', url: 'https://bsc-dataseed.binance.org/', explorer: 'https://bscscan.com' },
    { name: 'Ethereum', url: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161', explorer: 'https://etherscan.io' },
    { name: 'Fantom', url: 'https://rpc.ftm.tools/', explorer: 'https://ftmscan.com' },
    { name: 'Polygon', url: 'https://polygon-rpc.com', explorer: 'https://polygonscan.com' },
    { name: 'Cronos', url: 'https://evm-cronos.crypto.org', explorer: 'https://cronos.crypto.org/explorer' },
    { name: 'Metis Andromeda', url: 'https://andromeda.metis.io/owner1088', explorer: 'https://andromeda-explorer.metis.io' },
    { name: 'Aurora', url: 'https://mainnet.aurora.dev', explorer: 'https://aurorascan.dev' },
    { name: 'Arbitrum', url: 'https://rpc.ankr.com/arbitrum', explorer: 'https://arbiscan.io/' }
]

export const getIdFromBlockchain = {
    'Ethereum': 1,
    'BNB Smart Chain (BEP20)': 56,
    'Polygon': 137
}

export const getBlockchainFromId = {
    1: 'Ethereum',
    56: 'BNB Smart Chain (BEP20)',
    137: 'Polygon'
}

export const defaultTokens = {
    1: [{
        symbol: 'ETH',
        logo: '/ethereum.png'
    }],
    56: [{
        symbol: 'BNB',
        logo: '/bnb.png',
        decimals: 18,
    }, {
        symbol: 'BUSD',
        logo: 'https://assets.coingecko.com/coins/images/9576/large/BUSD.png?1568947766',
        address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
        decimals: 18
    }, {
        symbol: 'USDT',
        logo: 'https://assets.coingecko.com/coins/images/325/large/Tether-logo.png?1598003707',
        address: '0x55d398326f99059ff775485246999027b3197955',
        decimals: 18
    }, {
        symbol: 'ETH',
        logo: '/ethereum.png',
        address: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
        decimals: 18,

    }, {
        symbol: 'BTC',
        logo: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
        address: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
        decimals: 18,
    },
    {
        symbol: 'MATIC',
        logo: '/polygon.png',
        address: '0xcc42724c6683b7e57334c4e856f4c9965ed682bd',
        decimals: 18,
    },],
    137: [{
        symbol: 'MATIC',
        logo: '/polygon.png',
        decimals: 18
    }, {
        symbol: 'BNB',
        logo: '/bnb.png',
        address: '0xecdcb5b88f8e3c15f95c720c51c71c9e2080525d',
        decimals: 18
    }, {
        symbol: 'BUSD',
        logo: 'https://assets.coingecko.com/coins/images/9576/large/BUSD.png?1568947766',
        address: '0xa8d394fe7380b8ce6145d5f85e6ac22d4e91acde',
        decimals: 18
    }, {
        symbol: 'USDT',
        logo: 'https://assets.coingecko.com/coins/images/325/large/Tether-logo.png?1598003707',
        address: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
        decimals: 6
    }, {
        symbol: 'ETH',
        logo: '/ethereum.png',
        address: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
        decimals: 18
    }, {
        symbol: 'BTC',
        logo: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
        address: '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6',
        decimals: 8
    }],

}

export const priceOracles = {
    'BNB Smart Chain (BEP20)': '0x76482ea163b4C11c415f23B3E55A1B7F139d91f5',
    'Polygon': '0x87D64164C3c16fb9735D96B92Ee81FFfa5eEDE10'
}

export const specialTokens = ['0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', '0x0000000000000000000000000000000000001010'];

export const BNBProvider = ethers.getDefaultProvider('https://bsc-dataseed.binance.org/')
export const EthereumProvider = ethers.getDefaultProvider('https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161')
export const PolygonProvider = ethers.getDefaultProvider('https://polygon-rpc.com')
export const AvalancheProvider = ethers.getDefaultProvider('https://api.avax.network/ext/bc/C/rpc')
export const FantomProvider = ethers.getDefaultProvider('https://rpc.ftm.tools/')

export const mobulaRouter = {
    137: '0x7189384C1a46DBc5265bd0bd040E06F76761Ef24'
}
//Mapping the providers
export const providers = {
    'BNB Smart Chain (BEP20)': BNBProvider,
    'Fantom': FantomProvider,
    'Polygon': PolygonProvider,
    'Avalanche C-Chain': AvalancheProvider,
    'Ethereum': EthereumProvider
}

export const volumeOracles = {
    'BNB Smart Chain (BEP20)': [
        {
            url: 'https://bsc.streamingfast.io/subgraphs/name/pancakeswap/exchange-v2',
            dailyVolumeQuery: 'dailyVolumeUSD',
            dailyLiquidityQuery: 'totalLiquidityUSD',
            query: 'tradeVolumeUSD'
        }/*,
          {
              url: 'https://graph.apeswap.finance/subgraphs/name/ape-swap/apeswap-subgraph',
              dailyVolumeQuery: 'dailyVolumeUSD',
              dailyLiquidityQuery: 'totalLiquidityUSD',
              query: 'tradeVolumeUSD'
          }*/
    ],


    'Ethereum': [
        {
            url: 'https://api.thegraph.com/subgraphs/name/zippoxer/sushiswap-subgraph-fork',
            dailyVolumeQuery: 'dailyVolumeUSD',
            dailyLiquidityQuery: 'totalLiquidityUSD',
            hourDateQuery: 'hourlyVolumeUSD',
            query: 'tradeVolumeUSD'

        },
        {
            url: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
            dailyVolumeQuery: 'dailyVolumeUSD',
            dailyLiquidityQuery: 'totalLiquidityUSD',
            query: 'tradeVolumeUSD'
        },
    ],
    'Avalanche C-Chain': [
        {
            url: 'https://api.thegraph.com/subgraphs/name/traderjoe-xyz/exchange',
            dailyVolumeQuery: 'volumeUSD',
            dailyLiquidityQuery: 'liquidityUSD',
            query: 'volumeUSD'
        }
    ],
    'Polygon': [
        {
            url: 'https://polygon.furadao.org/subgraphs/name/quickswap',
            dailyVolumeQuery: 'dailyVolumeUSD',
            dailyLiquidityQuery: 'totalLiquidityUSD',
            query: 'tradeVolumeUSD'
        }
    ],
    'Fantom': [
        {
            url: 'https://api.fura.org/subgraphs/name/spookyswap',
            dailyVolumeQuery: 'dailyVolumeUSD',
            dailyLiquidityQuery: 'totalLiquidityUSD',
            query: 'tradeVolumeUSD'
        }
    ]
}

export const tokensPerBlockchain = {
    'Ethereum': ['0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', '0xdAC17F958D2ee523a2206206994597C13D831ec7'],// '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', '0xa47c8bf37f92aBed4A126BDA807A7b7498661acD'],
    'Polygon': ['0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', '0xc2132D05D31c914a87C6611C10748AEb04B58e8F'],//, '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', '0x692597b009d13C4049a947CAB2239b7d6517875F']
    'BNB Smart Chain (BEP20)': ['0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'],
    'Avalanche C-Chain': ['0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E'],
    'Fantom': ['0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83', '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75']
}

export const stableTokens = {
    'BNB Smart Chain (BEP20)': [
        {
            vsToken0: '0xe9e7cea3dedca5984780bafc599bd69add087d56',//BUSD
            vsToken1: '0x55d398326f99059ff775485246999027b3197955'//USDT
        }
    ],
    'Ethereum': [
        {
            vsToken0: '0xdac17f958d2ee523a2206206994597c13d831ec7',//USDT
            vsToken1: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'//USDC
        }
    ],
    'Avalanche C-Chain': [
        {
            vsToken0: '0xc7198437980c041c805a1edcba50c1ce5db95118',//USDTe
            vsToken1: '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e'//USDC
        }
    ],
    'Polygon': [
        {
            vsToken0: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',//USDC
            vsToken1: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f'//USDT
        }
    ],
    'Fantom': [
        {
            vsToken0: '0x04068da6c83afcfa0e13ba15a6696662335d5b75',//USDC
            vsToken1: '0x049d68029688eabf473097a2fc38ef61633a3c7a'//Frapped USD
        }
    ],
}