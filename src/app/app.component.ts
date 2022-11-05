import { Component } from '@angular/core';
import { WalletService } from './services/wallet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'badgey';
  
  walletAddr: string = 'addr';

  constructor (public walletService: WalletService){
    this.getConnectedAccountAddress();
  }

  getConnectedAccountAddress = async () => {
    const accounts = await this.walletService.getAccounts();
    if(accounts.length > 0){
      this.walletAddr = accounts[0];
    }
  }

  connectWallet() {
    this.walletService.connectWallet().then(accounts => {
      if(accounts.length > 0){
        this.walletAddr = accounts[0];
      }
    });
  }
}
