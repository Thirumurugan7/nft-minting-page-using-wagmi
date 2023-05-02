import type { NextPage } from "next";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import config from "../ContractConfig.json";
import { UseContractConfig, useContractRead } from "wagmi";
import { useEffect, useState } from "react";
import { IpfsImage } from "react-ipfs-image";
interface TokenData {
  image: string;
}

const Home: NextPage = () => {
  // const [tokenURI, setTokenURI] = useState<string>(""); // state to store the token URI
  const [imageHash, setImageHash] = useState<string>(""); // state to store the image hash
  //const [imageHash, setImageHash] = useState("");
  const { data: tokenURI } = useContractRead({
    address: "0xAa3906F986E0cd86e64C1e30cE500C1de1EF46Ad",
    abi: config.abi,
    functionName: "commonTokenURI",
    watch: true,
  });
  useEffect(() => {
    console.log(tokenURI);
    async () => {
      const gatewayUrl = tokenURI?.replace(
        "ipfs://",
        "https://gateway.pinata.cloud/ipfs/"
      );
      console.log(gatewayUrl);

      //const json = await fetch(gatewayUrl).then((res) => console.log(res));
      // console.log(json);
      try {
        const response = await fetch(gatewayUrl);
        const data = await response.json();
        console.log(data);
        setImageHash(data.image);
      } catch (error) {
        console.log(error);
      }
    };
  }, [tokenURI]);

  useEffect(() => {
    console.log(imageHash);
  }, [imageHash]);

  return (
    <div className="flex flex-col p-20">
      <ConnectButton />
      <IpfsImage hash={imageHash} className="mt-2 w-[300px]" />

      <button className="mt-2 rounded bg-blue-900 p-2 text-white w-fit">
        Mint
      </button>
    </div>
  );
};

export default Home;
