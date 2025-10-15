import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const VAULT_ADDR = process.env.VAULT_ADDR;
const VAULT_TOKEN = process.env.VAULT_TOKEN;

export async function getVaultSecrets(secretPath: string,key:string): Promise<string> {
    const url = `${VAULT_ADDR}/v1/secret/data/${secretPath}`;
    const headers = {
        'X-Vault-Token': VAULT_TOKEN,
    };
    try{
        const response = await axios.get(url, { headers });
        return response.data.data.data[key];
    }catch (error) {
        console.error("Error fetching secrets from Vault:", error);
        throw error;
    }
}