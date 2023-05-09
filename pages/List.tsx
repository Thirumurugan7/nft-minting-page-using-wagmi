import React, { useEffect } from "react";
import {
  UseContractConfig,
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import config1 from "../ContractConfig.json";
import { write } from "fs";
const List = () => {

  // console.log(lis);

  // const { writeAsync } = useContractWrite(lis);
  // console.log(writeAsync);

  // const CheckHandler = async () => {
  //   try {
  //     const ponse = await writeAsync?.();
  //     console.log(ponse);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <section className="flex justify-center items-center w-full">
      <button className="mt-2 rounded bg-blue-900 p-2 text-white w-fit">
        Check for registration
      </button>
    </section>
  );
};

export default List;
