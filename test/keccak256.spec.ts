import "@ton/test-utils";
import { ethers } from "ethers";
import { Blockchain } from "@ton/sandbox";
import { Keccak256BugReport } from "../sources/output/keccak256-bug_Keccak256BugReport";
import { Dictionary, toNano } from "@ton/core";

describe("SigVerifier", () => {
  it("should call crypto and hex related functions correctly", async () => {
    // Setup env
    const blockchain = await Blockchain.create();
    const deployer = await blockchain.treasury("deployer");
    const contract = blockchain.openContract(await Keccak256BugReport.fromInit());
    await contract.send(
      deployer.getSender(),
      { value: toNano(1), },
      { $$type: "Deploy", queryId: 0n },
    );

    const compare = async (msg: string, showMessage: boolean = true) => {
      const hashEthers = ethers.keccak256(Buffer.from(msg))
      const hashTact = '0x' + (await contract.getKeccak256(msg)).toString(16)
      console.log(`Keccak256 from ethers: [${showMessage ? Buffer.from(msg) : "..."}] -> [${hashEthers}]`)
      console.log(`Keccak256 from tact  : [${showMessage ? Buffer.from(msg) : "..."}] -> [${hashTact}]`)
      expect(hashEthers.toLowerCase()).toEqual(hashTact)
    }

    // Test case 1: short message with basic characters
    const msg1 = "12345";
    await compare(msg1)

    const msg2 = "12345".repeat(25)
    await compare(msg2)

    const msg3 = "12345".repeat(30)
    await expect(compare(msg3)).rejects.toThrow()

    const msg4 = "\\\r\b\n\x19"
    await compare(msg4, false)

    const msg5 = "\\\r\b\n\x19".repeat(25)
    await compare(msg5, false)

    const msg6 = "\\\r\b\n\x19".repeat(26)
    await expect(compare(msg6, false)).rejects.toThrow()
  });

});