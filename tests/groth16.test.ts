import { Prover, Verifier } from "../src";

describe("Groth16", () => {
  it("should verify multiplication", async () => {
    const compiledCircuitPath = "tests/mul.wasm";
    const zkeyPath = "tests/mul_0001.zkey";
    const vKeyPath = "tests/verification_key.json";

    const prover = new Prover(compiledCircuitPath, zkeyPath);
    const verifier = new Verifier(vKeyPath);

    const inputs = { a: 2, b: 3 };
    const { proof, publicSignals } = await prover.prove(inputs);
    const verified = await verifier.verify(proof, publicSignals);

    expect(verified).toBe(true);
  });
});
