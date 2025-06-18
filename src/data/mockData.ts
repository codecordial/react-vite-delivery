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
    statusDate: "Pending: Mar 6, 2025 11:54 AM",
    orderDate: "Mar 6, 2025 11:54 AM",
    type: "Delivery"
  },
  "KMSB-2425-000751": {
    billNo: "KMSB-2425-000751",
    orderNo: "KMSO-2425-000608",
    billingDate: "28/08/2024",
    customerName: "John Doe",
    customerAddress: "Test Area, Dhaka",
    customerPhone: "01725116321",
    status: "Processing",
    statusDate: "Processing: Mar 6, 2025 12:03 PM",
    orderDate: "Mar 6, 2025 12:03 PM",
    type: "Fitting"
  },
  "KMSB-2425-000752": {
    billNo: "KMSB-2425-000752",
    orderNo: "KMSO-2425-000609",
    billingDate: "05/03/2025",
    customerName: "Jane Smith",
    customerAddress: "New Town, Manikganj",
    customerPhone: "01725116322",
    status: "Completed",
    statusDate: "Completed: Mar 6, 2025 14:30",
    orderDate: "Mar 6, 2025 12:41 PM",
    type: "Delivery"
  },
  "KMSB-2425-000760": {
    billNo: "KMSB-2425-000760",
    orderNo: "KMSO-2425-000610",
    billingDate: "29/08/2024",
    customerName: "Farida Yasmin",
    customerAddress: "Mirpur DOHS, Dhaka",
    customerPhone: "01911223344",
    status: "Pending",
    statusDate: "Pending: Mar 6, 2025 11:54 AM",
    orderDate: "Mar 6, 2025 11:54 AM",
    type: "Delivery"
  },
  "KMSB-2425-000761": {
    billNo: "KMSB-2425-000761",
    orderNo: "KMSO-2425-000611",
    billingDate: "30/08/2024",
    customerName: "Kamal Hossain",
    customerAddress: "Uttara Sector 10, Dhaka",
    customerPhone: "01855667788",
    status: "Pending",
    statusDate: "Pending: Mar 6, 2025 11:54 AM",
    orderDate: "Mar 6, 2025 11:54 AM",
    type: "Fitting"
  },
  "KMSB-2425-000762": {
    billNo: "KMSB-2425-000762",
    orderNo: "KMSO-2425-000612",
    billingDate: "01/09/2024",
    customerName: "Selina Akter",
    customerAddress: "Banani, Dhaka",
    customerPhone: "01611223355",
    status: "Processing",
    statusDate: "Processing: Mar 6, 2025 12:03 PM",
    orderDate: "Mar 6, 2025 12:03 PM",
    type: "Fitting"
  },
  "KMSB-2425-000763": {
    billNo: "KMSB-2425-000763",
    orderNo: "KMSO-2425-000613",
    billingDate: "02/09/2024",
    customerName: "Arif Ahmed",
    customerAddress: "Dhanmondi, Dhaka",
    customerPhone: "01555667799",
    status: "Completed",
    statusDate: "Completed: 05/09/2024 11:00",
    orderDate: "Mar 6, 2025 12:41 PM",
    type: "Fitting"
  },
  "KMSB-2425-000764": {
    billNo: "KMSB-2425-000764",
    orderNo: "KMSO-2425-000614",
    billingDate: "03/09/2024",
    customerName: "Nazrul Islam",
    customerAddress: "Mohammadpur, Dhaka",
    customerPhone: "01777889900",
    status: "Pending",
    statusDate: "Pending: Mar 6, 2025 11:54 AM",
    orderDate: "Mar 7, 2025 09:15 AM",
    type: "Delivery"
  },
  "KMSB-2425-000765": {
    billNo: "KMSB-2425-000765",
    orderNo: "KMSO-2425-000615",
    billingDate: "04/09/2024",
    customerName: "Sabina Yasmin",
    customerAddress: "Gulshan 1, Dhaka",
    customerPhone: "01888990011",
    status: "Processing",
    statusDate: "Processing: Mar 6, 2025 12:03 PM",
    orderDate: "Mar 7, 2025 10:30 AM",
    type: "Fitting"
  },
  "KMSB-2425-000766": {
    billNo: "KMSB-2425-000766",
    orderNo: "KMSO-2425-000616",
    billingDate: "05/09/2024",
    customerName: "Rafiqul Islam",
    customerAddress: "Baridhara, Dhaka",
    customerPhone: "01999001122",
    status: "Pending",
    statusDate: "Pending: Mar 6, 2025 11:54 AM",
    orderDate: "Mar 7, 2025 11:45 AM",
    type: "Delivery"
  },
  "KMSB-2425-000801": {
    billNo: "KMSB-2425-000801",
    orderNo: "ORD017",
    billingDate: "Mar 6, 2025",
    customerName: "Rahim Ali",
    customerAddress: "Mirpur, Dhaka",
    customerPhone: "01812345678",
    status: "Pending",
    statusDate: "Pending: Mar 6, 2025 12:41 PM",
    orderDate: "Mar 6, 2025 11:27 AM",
    type: "Delivery"
  },
  "KMSB-2425-000802": {
    billNo: "KMSB-2425-000802",
    orderNo: "ORD018",
    billingDate: "Mar 6, 2025",
    customerName: "Sultana Razia",
    customerAddress: "Gulshan, Dhaka",
    customerPhone: "01987654321",
    status: "Processing",
    statusDate: "Pending: Mar 6, 2025 12:41 PM",
    orderDate: "Mar 6, 2025 01:15 PM",
    type: "Fitting"
  },
  "KMSB-2425-000803": {
    billNo: "KMSB-2425-000803",
    orderNo: "ORD019",
    billingDate: "Mar 6, 2025",
    customerName: "Karim Uddin",
    customerAddress: "Banani, Dhaka",
    customerPhone: "01555123456",
    status: "Completed",
    statusDate: "Completed: Mar 8, 2025 16:30",
    orderDate: "Mar 6, 2025 02:30 PM",
    type: "Delivery"
  },
  "KMSB-2425-000804": {
    billNo: "KMSB-2425-000804",
    orderNo: "ORD020",
    billingDate: "Mar 7, 2025",
    customerName: "Nasreen Akter",
    customerAddress: "Uttara, Dhaka",
    customerPhone: "01666123456",
    status: "Pending",
    statusDate: "Pending: Mar 6, 2025 12:41 PM",
    orderDate: "Mar 7, 2025 09:45 AM",
    type: "Delivery"
  },
  "KMSB-2425-000805": {
    billNo: "KMSB-2425-000805",
    orderNo: "ORD021",
    billingDate: "Mar 7, 2025",
    customerName: "Mominul Islam",
    customerAddress: "Mohammadpur, Dhaka",
    customerPhone: "01777123456",
    status: "Processing",
    statusDate: "Pending: Mar 6, 2025 12:41 PM",
    orderDate: "Mar 7, 2025 10:30 AM",
    type: "Fitting"
  },
  "KMSB-2425-000806": {
    billNo: "KMSB-2425-000806",
    orderNo: "ORD022",
    billingDate: "Mar 7, 2025",
    customerName: "Farida Begum",
    customerAddress: "Bashundhara, Dhaka",
    customerPhone: "01888123456",
    status: "Pending",
    statusDate: "Pending: Mar 6, 2025 12:41 PM",
    orderDate: "Mar 7, 2025 11:15 AM",
    type: "Delivery"
  },
  "KMSB-2425-000807": {
    billNo: "KMSB-2425-000807",
    orderNo: "ORD023",
    billingDate: "Mar 7, 2025",
    customerName: "Nazrul Islam",
    customerAddress: "Mirpur DOHS, Dhaka",
    customerPhone: "01999123456",
    status: "Pending",
    statusDate: "Pending: Mar 7, 2025 12:00 PM",
    orderDate: "Mar 7, 2025 12:00 PM",
    type: "Fitting"
  },
  "KMSB-2425-000808": {
    billNo: "KMSB-2425-000808",
    orderNo: "ORD024",
    billingDate: "Mar 7, 2025",
    customerName: "Sabina Yasmin",
    customerAddress: "Gulshan, Dhaka",
    customerPhone: "01888123457",
    status: "Processing",
    statusDate: "Processing: Mar 7, 2025 01:30 PM",
    orderDate: "Mar 7, 2025 01:30 PM",
    type: "Fitting"
  },
  "KMSB-2425-000809": {
    billNo: "KMSB-2425-000809",
    orderNo: "ORD025",
    billingDate: "Mar 7, 2025",
    customerName: "Kamrul Hasan",
    customerAddress: "Banani, Dhaka",
    customerPhone: "01777123458",
    status: "Partial Fitting",
    statusDate: "Paused - Customer not available",
    orderDate: "Mar 7, 2025 02:45 PM",
    type: "Fitting"
  },
  "KMSB-2425-000810": {
    billNo: "KMSB-2425-000810",
    orderNo: "ORD026",
    billingDate: "Mar 7, 2025",
    customerName: "Farhana Akter",
    customerAddress: "Uttara, Dhaka",
    customerPhone: "01666123459",
    status: "Completed",
    statusDate: "Completed: Mar 7, 2025 04:15 PM",
    orderDate: "Mar 7, 2025 04:15 PM",
    type: "Fitting"
  },
  "KMSB-2425-000811": {
    billNo: "KMSB-2425-000811",
    orderNo: "ORD027",
    billingDate: "Mar 8, 2025",
    customerName: "Rafiqul Islam",
    customerAddress: "Mohammadpur, Dhaka",
    customerPhone: "01555123460",
    status: "Pending",
    statusDate: "Pending: Mar 8, 2025 10:00 AM",
    orderDate: "Mar 8, 2025 10:00 AM",
    type: "Fitting"
  },
  "KMSB-2425-000812": {
    billNo: "KMSB-2425-000812",
    orderNo: "ORD028",
    billingDate: "Mar 8, 2025",
    customerName: "Nasreen Begum",
    customerAddress: "Bashundhara, Dhaka",
    customerPhone: "01444123461",
    status: "Processing",
    statusDate: "Processing: Mar 8, 2025 11:30 AM",
    orderDate: "Mar 8, 2025 11:30 AM",
    type: "Fitting"
  },
  "KMSB-2425-000813": {
    billNo: "KMSB-2425-000813",
    orderNo: "ORD029",
    billingDate: "Mar 8, 2025",
    customerName: "Tahmina Rahman",
    customerAddress: "Dhanmondi, Dhaka",
    customerPhone: "01333123462",
    status: "Pending",
    statusDate: "Pending: Mar 8, 2025 01:00 PM",
    orderDate: "Mar 8, 2025 01:00 PM",
    type: "Fitting"
  },
  "KMSB-2425-000814": {
    billNo: "KMSB-2425-000814",
    orderNo: "ORD030",
    billingDate: "Mar 8, 2025",
    customerName: "Shafiqul Islam",
    customerAddress: "Mirpur 10, Dhaka",
    customerPhone: "01222123463",
    status: "Processing",
    statusDate: "Processing: Mar 8, 2025 02:30 PM",
    orderDate: "Mar 8, 2025 02:30 PM",
    type: "Fitting"
  },
  "KMSB-2425-000815": {
    billNo: "KMSB-2425-000815",
    orderNo: "ORD031",
    billingDate: "Mar 8, 2025",
    customerName: "Nusrat Jahan",
    customerAddress: "Gulshan 2, Dhaka",
    customerPhone: "01111123464",
    status: "Partial Fitting",
    statusDate: "Paused - Customer requested reschedule",
    orderDate: "Mar 8, 2025 03:45 PM",
    type: "Fitting"
  },
  "KMSB-2425-000816": {
    billNo: "KMSB-2425-000816",
    orderNo: "ORD032",
    billingDate: "Mar 8, 2025",
    customerName: "Mahmudur Rahman",
    customerAddress: "Banani DOHS, Dhaka",
    customerPhone: "01000123465",
    status: "Completed",
    statusDate: "Completed: Mar 8, 2025 05:15 PM",
    orderDate: "Mar 8, 2025 05:15 PM",
    type: "Fitting"
  },
  "KMSB-2425-000817": {
    billNo: "KMSB-2425-000817",
    orderNo: "ORD033",
    billingDate: "Mar 9, 2025",
    customerName: "Shirin Akter",
    customerAddress: "Uttara Sector 7, Dhaka",
    customerPhone: "01999123466",
    status: "Pending",
    statusDate: "Pending: Mar 9, 2025 10:00 AM",
    orderDate: "Mar 9, 2025 10:00 AM",
    type: "Fitting"
  },
  "KMSB-2425-000818": {
    billNo: "KMSB-2425-000818",
    orderNo: "ORD034",
    billingDate: "Mar 9, 2025",
    customerName: "Rashidul Hasan",
    customerAddress: "Mohammadpur, Dhaka",
    customerPhone: "01888123467",
    status: "Processing",
    statusDate: "Processing: Mar 9, 2025 11:30 AM",
    orderDate: "Mar 9, 2025 11:30 AM",
    type: "Fitting"
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