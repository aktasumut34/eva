export interface LoginApiResponse {
  isLinkAccount: boolean;
  linkAccountParameters: string;
  token: string;
  user: User;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  countryCode: null;
  callingCode: null;
  telephoneNumber: null;
  accountStatus: number;
  accountType: number;
  userId: string;
  store: Store[];
  packageInformation: PackageInformation;
  userPermissionList: any[];
}

export interface PackageInformation {
  turnoverPackageInformation: TurnoverPackageInformation[];
  skuPackageInformation: SkuPackageInformation[];
}

export interface SkuPackageInformation {
  pricingStatus: number;
  packageName: string;
  packageDefinition: string;
  lowerSkuCount: number;
  upperSkuCount: number;
}

export interface TurnoverPackageInformation {
  pricingStatus: number;
  packageName: string;
  monthlyFee: number;
  lowerLimit: number;
  upperLimit: number;
  reimbursementCredit: number;
}

export interface Store {
  storeName: string;
  storeId: string;
  evaStoreId: string;
  storeType: number;
  region: string;
  paidStatus: number;
  pricingStatus: number;
  linkedDate: string;
  paidDate: null;
  reimbursementPackageTrialEndDate: null;
  unlimitedReimbursementStatus: number;
  showSellerCentralExternalLink: boolean;
  remainingReimbursementCredit: number;
  monthlyReimbursementPackageCredit: number;
  marketplaceName: string;
  marketplaceCode: string;
  enableRepricing: boolean;
  screenPermissionList: null;
  reimbursementStatus: boolean;
  loanOfferAmount: number;
  subscriptionCancelationStatus: number;
  subscriptionCancelationDate: string;
  is3plStore: boolean;
  shopifyShopName: string;
  walmartPartnerId: null;
  walmartClientId: null;
}
