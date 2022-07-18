import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import Wallet from "./Wallet";
import Link from "./Link";
import Brand from "./Brand";
import Tendance from "./Tendance";
import styles from "./header.module.scss";

import { off, on } from "./Utils";

function Header(props: any) {
  const [metrics, setMetrics] = useState({
    total_dao_members: 0,
    total_assets: 0,
    total_dex: 0,
    "7d_listings": 0,
  });
  const { account, active, activate, deactivate } = useWeb3React();
  const [hasMetamask, setHasMetamask] = useState(true);
  const injected = new InjectedConnector({});
  const router = useRouter();
  const NO_ETHEREUM_OBJECT = /No Ethereum provider was found on window.ethereum/;
  const [isMenuMobile, setIsMenuMobile] = useState(false);
  const isNoEthereumObject = (err) => NO_ETHEREUM_OBJECT.test(err);

  // useEffect(() => {
  //     alert('yes')
  // }, [])

  const handleConnect = async () => {
    const provider = (window as any).ethereum;

    if (!provider) {
      setHasMetamask(false);
    } else {
      const chainId = await provider.request({ method: "eth_chainId" });
      if (chainId !== "0x89" && (router.pathname.includes("dao") || router.pathname.includes("list"))) {
        try {
          await provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x89" }],
          });
        } catch (switchError) {
          try {
            await provider.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x89",
                  chainName: "Polygon - MATIC",
                  rpcUrls: ["https://polygon-rpc.com"],
                  blockExplorerUrls: ["https://polygonscan.com/"],
                  nativeCurrency: {
                    symbol: "MATIC",
                    decimals: 18,
                  },
                },
              ],
            });
          } catch (addError) {
            console.log(addError);
          }
          if (switchError.code === 4902) {
            console.log("This network is not available in your metamask, please add it");
          }
          console.log("Failed to switch to the network", switchError);
        }
      }
    }

    console.log(account);
    if (active) {
      deactivate();
      return;
    }

    activate(injected, (error) => {
      if (isNoEthereumObject(error)) {
        setHasMetamask(false);
      }
    });
  };

  useEffect(() => {
    const supabase = createClient(
      "https://ylcxvfbmqzwinymcjlnx.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsY3h2ZmJtcXp3aW55bWNqbG54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTE1MDE3MjYsImV4cCI6MTk2NzA3NzcyNn0.jHgrAkljri6_m3RRdiUuGiDCbM9Ah0EBrezQ4e6QYuM"
    );

    try {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);

      if (provider) {
        provider
          .listAccounts()
          .catch()
          .then((accounts) => {
            if (accounts.length > 0) {
              handleConnect();
            }
          });
      }
    } catch (e) {}

    supabase
      .from("metrics")
      .select("total_assets,total_dao_members,total_dex,7d_listings")
      .match({ id: 1 })
      .then((r) => {
        setMetrics(r.data[0]);
      });
  }, []);

  const [scrollingUp, setScrollingUp] = useState(false);

  const handleScroll = () => {
    if (isMenuMobile) {
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    on(window, "scroll", handleScroll, { passive: true });
    return () => {
      off(window, "scroll", handleScroll, { passive: true });
    };
  }, [isMenuMobile]);

  return (
    <>
      <Box
        bg="var(--background)"
        zIndex="15"
        position={[
          isMenuMobile ? "fixed" : "static",
          isMenuMobile ? "fixed" : "static",
          isMenuMobile ? "fixed" : "static",
          ,
          scrollingUp ? "fixed" : "static",
        ]}
        w={["100%", "100%", "100%", "100vw"]}
        className={`${scrollingUp ? "stickyHeader" : ""}`}
      >
        <div className={styles.header}>
          <div className={styles.main}>
            <Brand />
            <Link />
            <Wallet isMenuMobile={isMenuMobile} setIsMenuMobile={setIsMenuMobile} />
          </div>
        </div>
      </Box>
      <Tendance
        listings={metrics["7d_listings"]}
        dao={metrics.total_dao_members}
        assets={metrics.total_assets}
        dex={metrics.total_dex}
      />
    </>
  );
}

export default Header;
