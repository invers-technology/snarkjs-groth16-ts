#! /bin/bash

# Remove cache and recreate params directories
rm -rf setup_params *_js *.r1cs && mkdir setup_params compiled_circuit

# Compile the circuit
circom circuit/mul.circom --r1cs --wasm -o compiled_circuit

# Powers of tau
yarn snarkjs powersoftau new bn128 2 setup_params/pot2_0000.ptau -v
yarn snarkjs powersoftau contribute setup_params/pot2_0000.ptau setup_params/pot2_0001.ptau -v -e='test'
yarn snarkjs powersoftau prepare phase2 setup_params/pot2_0001.ptau setup_params/pot2_final.ptau -v

# Trusted setup
yarn snarkjs groth16 setup compiled_circuit/mul.r1cs setup_params/pot2_final.ptau setup_params/mul_0000.zkey
yarn snarkjs zkey contribute setup_params/mul_0000.zkey setup_params/mul_0001.zkey -v -e='test'
yarn snarkjs zkey export verificationkey setup_params/mul_0001.zkey setup_params/verification_key.json

# Copy necessary files to tests
cp compiled_circuit/mul_js/mul.wasm tests/
cp setup_params/verification_key.json tests/
cp setup_params/mul_0001.zkey tests/
