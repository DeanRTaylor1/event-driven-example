enum OrderStatusEnum {
  PENDING = "pending",
  PAID = "paid",
  CANCELLED = "cancelled",
  FULFILLED = "fulfilled",
}
enum BasketStatusEnum {
  ACTIVE = "active",
  CLEARED = "cleared",
  CHECKED_OUT = "checked-out",
}

enum BasketItemStatusEnum {
  ACTIVE = "active",
  REMOVED = "removed",
}

export { OrderStatusEnum, BasketStatusEnum, BasketItemStatusEnum };
