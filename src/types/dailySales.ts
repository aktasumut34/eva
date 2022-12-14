export interface DailySalesOverviewAPIResponse {
  Currency: string;
  item: Item[];
  isYoyExist: boolean;
}

export interface Item {
  date: string;
  amount: number;
  orderCount: number;
  unitCount: number;
  avgSalesPrev30Days: number;
  prevYearDate: string;
  prevYearAmount: number;
  prevYearOrderCount: number;
  prevYearUnitCount: number;
  prevYearAvgSalesPrev30Days: number;
  profit: number;
  yoy30DailySalesGrowth: number;
  acos: number;
}

export interface DailySalesOverviewAPIOptions {
  day: number;
}
