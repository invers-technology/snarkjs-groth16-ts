import { readFileSync } from "fs";
import { groth16, Groth16Proof, PublicSignals } from "snarkjs";

export class Verifier {
  vKey: string;

  constructor(vKey: string) {
    this.vKey = JSON.parse(readFileSync(vKey, "utf-8"));
  }

  async verify(proof: Groth16Proof, publicSignals: PublicSignals) {
    const verified = await groth16.verify(this.vKey, publicSignals, proof);
    return verified;
  }
}
