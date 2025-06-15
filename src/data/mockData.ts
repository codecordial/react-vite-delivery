import { Order, Notification, UserStats } from '../types/Order';

export const mockOrders: Record<string, Order> = {
  "KMSB-2425-000750": {
    billNo: "KMSB-2425-000750",
    orderNo: "KMSO-2425-000607",
    billingDate: "27/08/2024",
    customerName: "Abdul Alim Bhuiyan",
    customerAddress: "Ghior Bazar, Thanamor, Manikganj",
    customerPhone: "01714073280",
    status: "Pending",
    orderDate: "Mar 6, 2025 11:54 AM"
  },
  "KMSB-2425-000751": {
    billNo: "KMSB-2425-000751",
    orderNo: "KMSO-2425-000608",
    billingDate: "28/08/2024",
    customerName: "John Doe",
    customerAddress: "Test Area, Dhaka",
    customerPhone: "01725116321",
    status: "Processing",
    orderDate: "Mar 6, 2025 12:03 PM"
  },
  "KMSB-2425-000752": {
    billNo: "KMSB-2425-000752",
    orderNo: "KMSO-2425-000609",
    billingDate: "05/03/2025",
    customerName: "Jane Smith",
    customerAddress: "New Town, Manikganj",
    customerPhone: "01725116322",
    status: "Delivered",
    statusDate: "Delivered: Mar 6, 2025 14:30",
    orderDate: "Mar 6, 2025 12:41 PM"
  },
  "KMSB-2425-000760": {
    billNo: "KMSB-2425-000760",
    orderNo: "KMSO-2425-000610",
    billingDate: "29/08/2024",
    customerName: "Farida Yasmin",
    customerAddress: "Mirpur DOHS, Dhaka",
    customerPhone: "01911223344",
    status: "Pending",
    orderDate: "Mar 6, 2025 11:54 AM"
  },
  "KMSB-2425-000761": {
    billNo: "KMSB-2425-000761",
    orderNo: "KMSO-2425-000611",
    billingDate: "30/08/2024",
    customerName: "Kamal Hossain",
    customerAddress: "Uttara Sector 10, Dhaka",
    customerPhone: "01855667788",
    status: "Pending",
    orderDate: "Mar 6, 2025 11:54 AM"
  },
  "KMSB-2425-000762": {
    billNo: "KMSB-2425-000762",
    orderNo: "KMSO-2425-000612",
    billingDate: "01/09/2024",
    customerName: "Selina Akter",
    customerAddress: "Banani, Dhaka",
    customerPhone: "01611223355",
    status: "Processing",
    orderDate: "Mar 6, 2025 12:03 PM"
  },
  "KMSB-2425-000763": {
    billNo: "KMSB-2425-000763",
    orderNo: "KMSO-2425-000613",
    billingDate: "02/09/2024",
    customerName: "Arif Ahmed",
    customerAddress: "Dhanmondi, Dhaka",
    customerPhone: "01555667799",
    status: "Delivered",
    statusDate: "Delivered: 05/09/2024 11:00",
    orderDate: "Mar 6, 2025 12:41 PM"
  },
  "KMSB-2425-000764": {
    billNo: "KMSB-2425-000764",
    orderNo: "KMSO-2425-000614",
    billingDate: "03/09/2024",
    customerName: "Nazrul Islam",
    customerAddress: "Mohammadpur, Dhaka",
    customerPhone: "01777889900",
    status: "Pending",
    orderDate: "Mar 7, 2025 09:15 AM"
  },
  "KMSB-2425-000765": {
    billNo: "KMSB-2425-000765",
    orderNo: "KMSO-2425-000615",
    billingDate: "04/09/2024",
    customerName: "Sabina Yasmin",
    customerAddress: "Gulshan 1, Dhaka",
    customerPhone: "01888990011",
    status: "Processing",
    orderDate: "Mar 7, 2025 10:30 AM"
  },
  "KMSB-2425-000766": {
    billNo: "KMSB-2425-000766",
    orderNo: "KMSO-2425-000616",
    billingDate: "05/09/2024",
    customerName: "Rafiqul Islam",
    customerAddress: "Baridhara, Dhaka",
    customerPhone: "01999001122",
    status: "Pending",
    orderDate: "Mar 7, 2025 11:45 AM"
  },
  "FITB-2425-000801": {
    billNo: "FITB-2425-000801",
    orderNo: "FITO-2425-000701",
    billingDate: "06/03/2025",
    customerName: "Mr. Hasan",
    customerAddress: "Test Address, Dhaka",
    customerPhone: "01812345678",
    status: "Pending",
    orderDate: "Mar 6, 2025 11:27 AM"
  },
  "FITB-2425-000802": {
    billNo: "FITB-2425-000802",
    orderNo: "FITO-2425-000702",
    billingDate: "07/03/2025",
    customerName: "Mrs. Rahman",
    customerAddress: "Gulshan 2, Dhaka",
    customerPhone: "01987654321",
    status: "Processing",
    orderDate: "Mar 6, 2025 01:15 PM"
  },
  "FITB-2425-000803": {
    billNo: "FITB-2425-000803",
    orderNo: "FITO-2425-000703",
    billingDate: "08/03/2025",
    customerName: "Ahmed Khan",
    customerAddress: "Banani, Dhaka",
    customerPhone: "01555123456",
    status: "Delivered",
    statusDate: "Delivered: Mar 8, 2025 16:30",
    orderDate: "Mar 6, 2025 02:30 PM"
  },
  "FITB-2425-000804": {
    billNo: "FITB-2425-000804",
    orderNo: "FITO-2425-000704",
    billingDate: "09/03/2025",
    customerName: "Fatima Begum",
    customerAddress: "Uttara Sector 11, Dhaka",
    customerPhone: "01666123456",
    status: "Pending",
    orderDate: "Mar 7, 2025 09:45 AM"
  },
  "FITB-2425-000805": {
    billNo: "FITB-2425-000805",
    orderNo: "FITO-2425-000705",
    billingDate: "10/03/2025",
    customerName: "Mohammad Ali",
    customerAddress: "Mirpur 10, Dhaka",
    customerPhone: "01777123456",
    status: "Processing",
    orderDate: "Mar 7, 2025 10:30 AM"
  },
  "FITB-2425-000806": {
    billNo: "FITB-2425-000806",
    orderNo: "FITO-2425-000706",
    billingDate: "11/03/2025",
    customerName: "Nusrat Jahan",
    customerAddress: "Dhanmondi 27, Dhaka",
    customerPhone: "01888123456",
    status: "Pending",
    orderDate: "Mar 7, 2025 11:15 AM"
  }
};

export const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "Delivery Scheduled",
    message: "Your order KMSO-2425-000607 has been scheduled for delivery on 01/06/2025.",
    date: "31/05/2025 09:30 AM",
    read: false
  },
  {
    id: 2,
    title: "Fitting Completed",
    message: "Fitting for order KMSO-2425-000608 has been completed successfully.",
    date: "30/05/2025 02:15 PM",
    read: false
  },
  {
    id: 3,
    title: "Order Update",
    message: "Your order KMSO-2425-000609 is now ready for delivery.",
    date: "29/05/2025 10:30 AM",
    read: false
  }
];

export const mockUserStats: UserStats = {
  totalBills: 19,
  delivered: 7,
  pending: 7,
  processing: 5
};