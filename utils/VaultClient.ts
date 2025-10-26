import axios from "axios";

export async function getVaultSecrets(secretPath: string,key:string,VAULT_ADDR:string,VAULT_TOKEN:string): Promise<string> {
    
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