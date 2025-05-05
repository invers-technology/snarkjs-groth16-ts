const wasm = require("circom_tester").wasm;

describe("Circuit", () => {
  it("should verify multiplication", async () => {
    const circuit = await wasm("circuit/mul.circom");
    const witness = await circuit.calculateWitness({ a: 2, b: 3 });

    await circuit.checkConstraints(witness);
    await circuit.assertOut(witness, { c: 6 });
  });
});
