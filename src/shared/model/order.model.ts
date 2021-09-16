export interface IOrder {
  id?: number;
  billedDate?: string | null;
  amount?: number;
  vatAmount?: number;
  offerId?: number;
  proformaInvoiceId?: any;
}

export const defaultValue: Readonly<IOrder> = {};
