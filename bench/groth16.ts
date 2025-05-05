import Benchmark from "benchmark";
import { Prover, Verifier } from "../src";
import { Groth16Proof, PublicSignals } from "snarkjs";

const suite = new Benchmark.Suite;
const compiledCircuitPath = "tests/mul.wasm";
const zkeyPath = "tests/mul_0001.zkey";
const vKeyPath = "tests/verification_key.json";
const prover = new Prover(compiledCircuitPath, zkeyPath);
const verifier = new Verifier(vKeyPath);
const inputs = { a: 2, b: 3 };
let proof: Groth16Proof, publicSignals: PublicSignals;

suite
  .add("Prover", async () => {
    const res = await prover.prove(inputs);
    proof = res.proof;
    publicSignals = res.publicSignals;
  })
  .add("Verifier", async () => {
    await verifier.verify(proof, publicSignals);
  })
  .on("cycle", (event: any) => {
    console.log(String(event.target));
  })
  .on("complete", () => {
    console.log("Finished");
  })
  .run({ async: true });
