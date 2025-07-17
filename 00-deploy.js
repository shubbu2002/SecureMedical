import { ethers } from "hardhat";

async function main() {
  const Medical = await ethers.getContractFactory("MedicalRecord");
  const medical = await Medical.deploy();         // Deploys it
  await medical.waitForDeployment();              // ✅ correct way with Hardhat 2.17+
  
  console.log(`MedicalRecord deployed to: ${await medical.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
