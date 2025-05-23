import { WalletApi } from "@lucid-evolution/lucid";

export declare type Wallet = {
  name: string;
  icon: string;
  apiVersion: string;
  enable(): Promise<WalletApi>;
  isEnabled(): Promise<boolean>;
};
