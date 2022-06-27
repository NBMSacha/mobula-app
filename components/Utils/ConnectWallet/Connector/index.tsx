import { RPC_URL } from "../../../../constants"
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { BscConnector } from '@binance-chain/bsc-connector'
import { PortisConnector } from "@web3-react/portis-connector";
import { LedgerConnector } from "@web3-react/ledger-connector";
import { TrezorConnector } from "@web3-react/trezor-connector";

export const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 56, 137]
})

export const walletconnect = new WalletConnectConnector({
    rpc: {
        1: "https://mainnet.infura.io/v3/00ca1859789d4b40bce01f4104844224",
        56: "https://bsc-dataseed.binance.org/",
        137: RPC_URL
    },
    qrcode: true,
})

export const resetWalletConnector = (connector: any) => {
    if (
        connector &&
        connector instanceof WalletConnectConnector
    ) {
        console.log('Setting to undefined')
        connector.walletConnectProvider = undefined
    }
}

export const walletlink = new WalletLinkConnector({
    url: RPC_URL,
    appName: "Mobula",
    supportedChainIds: [137]
})

export const bsc = new BscConnector({
    supportedChainIds: [137] // later on 1 ethereum mainnet and 3 ethereum ropsten will be supported
})

export const ledger = new LedgerConnector({
    chainId: 137,
    url: RPC_URL,
    pollingInterval: 15000
});

export const trezor = new TrezorConnector({
    chainId: 137,
    url: RPC_URL,
    pollingInterval: 15000,
    manifestEmail: "dummy@abc.xyz",
    manifestAppUrl: "https://8rg3h.csb.app/"
});

export const portis = new PortisConnector({
    dAppId: "211b48db-e8cc-4b68-82ad-bf781727ea9e",
    networks: [137]
});