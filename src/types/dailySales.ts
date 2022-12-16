export interface DailySalesOverviewAPIResponse {
  Currency: string;
  item: Item[];
  isYoyExist: boolean;
}

export interface Item {
  acos: number;
  advertisingCost: number;
  amount: number;
  avgAdvertisingCostPrev30Days: number;
  avgProfitPrev30Days: number;
  avgSalesPrev30Days: number;
  date: string;
  fbaAmount: number;
  fbaShippingAmount: number;
  fbmAmount: number;
  fbmShippingAmount: number;
  orderCount: number;
  prevYearAmount: number;
  prevYearAvgSalesPrev30Days: number;
  prevYearDate: number;
  prevYearFbaAmount: number;
  prevYearFbmAmount: number;
  prevYearOrderCount: number;
  prevYearUnitCount: number;
  profit: number;
  shippingAmount: number;
  unitCount: number;
  yoy30DailySalesGrowth: number;
}

export interface DailySalesOverviewAPIOptions {
  day: number;
}
