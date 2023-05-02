import type { NextPage } from "next";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";

import config1 from "../ContractConfig.json";
import {
  UseContractConfig,
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { useEffect, useState } from "react";
import axios from "axios";
import { IpfsImage } from "react-ipfs-image";
interface TokenData {
  image: string;
}

const Home: NextPage = () => {
  const { data: tokenURI } = useContractRead({
    address: "0xAa3906F986E0cd86e64C1e30cE500C1de1EF46Ad",
    abi: config1.abi,
    functionName: "commonTokenURI",
    watch: true,
  });
  const { data: mintCost } = useContractRead({
    address: "0xAa3906F986E0cd86e64C1e30cE500C1de1EF46Ad",
    abi: config1.abi,
    functionName: "mintCost",
    watch: true,
  });
  // console.log(tokenURI);
  const [imageHash, setImageHash] = useState("");
  useEffect(() => {
    const api = async () => {
      if (tokenURI) {
        const gatewayUrl = tokenURI?.replace(
          "ipfs://",
          "https://gateway.pinata.cloud/ipfs/"
        );
        //console.log(gatewayUrl);
        const json = await fetch(
          "https://gateway.pinata.cloud/ipfs/QmPf2x91DoemnhXSZhGDP8TX9Co8AScpvFzTuFt9BGAoBY"
        ).then((res) => res.json());
        console.log(json, "json");
        console.log(json.image, "img");
        const picUrl = json.image?.replace(
          "https://gateway.pinata.cloud/ipfs/",
          "ipfs://"
        );
        setImageHash(picUrl);
        console.log(imageHash);
      }
    };
    api();
    // console.log(tokenURI);
  });
  const { address } = useAccount();

  const { config } = usePrepareContractWrite({
    address: "0xAa3906F986E0cd86e64C1e30cE500C1de1EF46Ad",
    abi: config1.abi,
    functionName: "mint",
    args: [address, { value: mintCost?.toString() }],
  });

  const { writeAsync } = useContractWrite(config);

  const onMintClick = async () => {
    try {
      await writeAsync?.();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col p-20">
      <ConnectButton />

      <IpfsImage hash={imageHash} className="mt-2 w-[300px]" />

      <button
        onClick={onMintClick}
        className="mt-2 rounded bg-blue-900 p-2 text-white w-fit"
      >
        Mint
      </button>
    </div>
  );
};

export default Home;
