import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  public ethereum;
  public isWalletConnected:boolean = false;

  constructor() {
    const {ethereum} = <any>window;
    this.ethereum = ethereum;

    this.getAccounts().then(accounts => {
      this.isDefaultAccountAvailable(accounts);
    });
  }

  // Sends a connect request to the wallet
  public connectWallet = async () => {
    if(this.isWalletAvailable()) {
      const accounts = await this.ethereum.request({method: 'eth_requestAccounts'});
      this.isDefaultAccountAvailable(accounts);
      return accounts;
    }
  }

  public getAccounts = async () => {
    if(this.isWalletAvailable()) {
      const accounts = await this.ethereum.request({method: 'eth_accounts'});
      this.isDefaultAccountAvailable(accounts);
      return accounts;
    }
  }

  isDefaultAccountAvailable(accounts: any) {
    console.log(accounts)
    if(accounts.length > 0) {
      this.isWalletConnected = true;
    } else {
      this.isWalletConnected = false;
    }
  }
  
  // Check if a wallet is available
  isWalletAvailable() {
    if(!this.ethereum)  {
      alert("Please install metamask");
      return false;
    }
    return true;
  }
}