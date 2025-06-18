export interface Order {
  billNo: string;
  orderNo: string;
  billingDate: string;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  status: 'Pending' | 'Processing' | 'Completed' | 'Partial Fitting';
  statusDate?: string;
  orderDate: string;
  type: 'Delivery' | 'Fitting';
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  color: string;
  image: string;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export interface UserStats {
  totalBills: number;
  delivered: number;
  pending: number;
  processing: number;
}