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
    { name: 'Aurora', url: 'https://mainnet.aurora.dev	', explorer: 'https://aurorascan.dev' }
]

export const volumeOracles = {
    'BNB Smart Chain (BEP20)': [
        {
            url: 'https://bsc.streamingfast.io/subgraphs/name/pancakeswap/exchange-v2',
            query: 'tradeVolumeUSD'
        },
        {
            url: 'https://graph.apeswap.finance/subgraphs/name/ape-swap/apeswap-subgraph',
            query: 'tradeVolumeUSD'
        }

    ],
    'Ethereum': [
        {
            url: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
            query: 'tradeVolumeUSD'
        },
        {
            url: 'https://api.thegraph.com/subgraphs/name/zippoxer/sushiswap-subgraph-fork',
            query: 'tradeVolumeUSD'
        }

    ],
    'Avalanche C-Chain': [
        {
            url: 'https://api.thegraph.com/subgraphs/name/traderjoe-xyz/exchange',
            query: 'volumeUSD'
        }
    ],
    'Polygon': [
        {
            url: 'https://polygon.furadao.org/subgraphs/name/quickswap',
            query: 'tradeVolumeUSD'
        }
    ],
    'Fantom': [
        {
            url: 'https://api.fura.org/subgraphs/name/spookyswap',
            query: 'tradeVolumeUSD'
        }
    ]
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

//Mapping the providers
export const providers = {
    'BNB Smart Chain (BEP20)': BNBProvider,
    'Fantom': FantomProvider,
    'Polygon': PolygonProvider,
    'Avalanche C-Chain': AvalancheProvider,
    'Ethereum': EthereumProvider
}