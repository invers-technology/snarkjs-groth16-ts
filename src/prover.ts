import { CircuitSignals, groth16 } from "snarkjs";

export class Prover {
  compiledCircuit: string;
  zkey: string;

  constructor(compiledCircuit: string, zkey: string) {
    this.compiledCircuit = compiledCircuit;
    this.zkey = zkey;
  }

  async prove(inputs: CircuitSignals) {
    const { proof, publicSignals } = await groth16.fullProve(
      inputs,
      this.compiledCircuit,
      this.zkey,
    );
    return { proof, publicSignals };
  }
}
