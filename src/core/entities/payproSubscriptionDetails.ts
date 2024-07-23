export interface PayproSubscriptionDetails {
  status: string;
  createdAt: Date;
  nextPayment: string;
  lastPayment: string;
  currentChargeCounter: number;
  subscriptionName: string;
  subscriptionPrice: number;
  subscriptionCurrency: string;
  subscriptionPeriod: string;
  subscriptionPeriodValue: number;
  quantity: number;
  isTrial: boolean;
  renewalType: string;
  discountToBeApplied: number;
  affiliateAgreementId?: string;
  orders: [
    {
      id: number;
      billingCurrencyCode: string;
      billingTotalPrice: number;
      billingTotalTaxesAmount: number;
      billingTotalPriceWithTaxes: number;
      orderStatusId: number;
      paymentMethodId: number;
      orderStatusName: string;
      paymentMethodName: string;
      createdAt: Date;
      affiliateAgreementId?: string;
    }
  ];
}
