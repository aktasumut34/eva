export interface DailySalesSkuListAPIResponse {
  item?: Item;
  Currency: string;
}

export interface Item {
  selectedDate: string;
  selectedDate2: string;
  TotalSale: number;
  TotalShippingAmount: number;
  TotalSale2: number;
  TotalShippingAmount2: number;
  skuList: SkuList[];
}

export interface SkuList {
  sku: string;
  productName: string;
  qty: number;
  amount: number;
  shippingAmount: number;
  refundPercantage: null;
  qty2: number;
  amount2: number;
  shippingAmount2: number;
  skuRefundRate?: number;
}

export interface DailySalesSkuListAPIOptions {
  salesDate?: string;
  salesDate2?: string;
  pageNumber: number;
  pageSize: number;
  isDaysCompare: 0 | 1;
}
