import type { NextPage } from "next";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Button } from "@web3modal/react";

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
import List from "./List";
interface TokenData {
  image: string;
}

const Home: NextPage = () => {
  function HomePage() {
    return (
      <div>
        <Web3Button />
      </div>
    );
  }

  // const { data: tokenURI } = useContractRead({
  //   address: "0xAa3906F986E0cd86e64C1e30cE500C1de1EF46Ad",
  //   abi: config1.abi,
  //   functionName: "commonTokenURI",
  //   watch: true,
  // });
  // const { data: mintCost } = useContractRead({
  //   address: "0xAa3906F986E0cd86e64C1e30cE500C1de1EF46Ad",
  //   abi: config1.abi,
  //   functionName: "mintCost",
  //   watch: true,
  // });
  // console.log(tokenURI);
  // const [imageHash, setImageHash] = useState("");
  // useEffect(() => {
  //   const api = async () => {
  //     if (tokenURI) {
  //       const gatewayUrl = tokenURI?.replace(
  //         "ipfs://",
  //         "https://gateway.pinata.cloud/ipfs/"
  //       );
  //       //console.log(gatewayUrl);
  //       const json = await fetch(
  //         "https://gateway.pinata.cloud/ipfs/QmPf2x91DoemnhXSZhGDP8TX9Co8AScpvFzTuFt9BGAoBY"
  //       ).then((res) => res.json());
  //       console.log(json, "json");
  //       console.log(json.image, "img");
  //       const picUrl = json.image?.replace(
  //         "https://gateway.pinata.cloud/ipfs/",
  //         "ipfs://"
  //       );
  //       setImageHash(picUrl);
  //       console.log(imageHash);
  //     }
  //   };
  //   api();
  //   // console.log(tokenURI);
  // });
  const { address } = useAccount();
  console.log(address);
  // const { config } = usePrepareContractWrite({
  //   address: "0xAa3906F986E0cd86e64C1e30cE500C1de1EF46Ad",
  //   abi: config1.abi,
  //   functionName: "mint",
  //   args: [address, { value: mintCost?.toString() }],
  // });

  // const { writeAsync } = useContractWrite(config);

  // const onMintClick = async () => {
  //   try {
  //     await writeAsync?.();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const { data: lis } = useContractRead({
    address: "0xf75c8bb0e0d2670aa9a8962bb9a1ee9c0a797a3b",
    abi: config1.abi,
    functionName: "isRegistered",
    args: [address],
    watch: true,
  });

  useEffect(() => {
    console.log(lis);
  }, [lis]);

  const { config: reg } = usePrepareContractWrite({
    address: "0xf75c8bb0e0d2670aa9a8962bb9a1ee9c0a797a3b",
    abi: config1.abi,
    functionName: "register",

    args: [],
  });

  console.log(reg);

  const { writeAsync } = useContractWrite(reg);
  console.log(writeAsync);
  const RegisterHandle = async () => {
    try {
      await writeAsync?.();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col p-20">
      <HomePage />
      {/* <IpfsImage hash={imageHash} className="mt-2 w-[300px]" /> */}

      {/* <button
        onClick={onMintClick}
        className="mt-2 rounded bg-blue-900 p-2 text-white w-fit"
      >
        Mint
      </button> */}
      <section className="flex justify-center items-center w-full">
        <button
          className="mt-2 rounded bg-blue-900 p-2 text-white w-fit"
          onClick={RegisterHandle}
        >
          Register
        </button>
      </section>
      <List />
    </div>
  );
};

export default Home;
