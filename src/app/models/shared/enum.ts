

export enum ReturnStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Returning = 'Returning',
  Received = 'Received',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}
export enum RequestStatus
{
  Pending,
  Approved,
  Rejected,
}
export enum OrderShopStatus {
  PendingConfirmation = 'PendingConfirmation',
  Processing = 'Processing',
  ReadyToShop = 'ReadyToShop',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}
export enum OrderItemStatus {
  Pending = 'Pending',
  Processing = 'Processing',
  ReadyToShop = 'ReadyToShop',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  ReturnRequest = 'ReturnRequest',
  ReturnApproved = 'ReturnApproved',
  ReturnRejected = 'ReturnRejected',
  Returned = 'Returned',
  Refunded = 'Refunded',
  Dispute = 'Dispute',
}
export enum TransactionType
{
  Payment,
  Refund,
  PayoutToSeller,
  Deposit,
}
export enum TransactionStatus
{
  Pending,
  Completed,
  Failed,
}
export enum UserRole {
  Admin = 'Admin',
  Seller = 'Seller',
  Customer = 'Customer',
}
export enum OrderStatus {
  PendingPayment = 'PendingPayment',
  Paid = 'Paid',
  Completed = 'Completed',
  Canceled = 'Canceled',
  Refunding = 'Refunding',
  Refunded = 'Refunded',
  Delivered = 'Delivered',
}

