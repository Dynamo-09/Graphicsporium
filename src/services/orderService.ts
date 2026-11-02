import { Order } from '../types/ecommerce';

const ORDERS_STORAGE_KEY = 'graphicporium_orders';

export const orderService = {
  // Retrieve all orders (for Admin panel)
  getAllOrders(): Order[] {
    try {
      const data = localStorage.getItem(ORDERS_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  // Save new order with single-use download token
  createOrder(orderData: Omit<Order, 'orderId' | 'downloadToken' | 'downloadCount' | 'maxDownloads' | 'createdAt'>): Order {
    const orders = this.getAllOrders();
    const orderId = `GP-${Math.floor(100000 + Math.random() * 900000)}`;
    const downloadToken = `tok_${crypto.randomUUID ? crypto.randomUUID().replace(/-/g, '') : Math.random().toString(36).substring(2)}${Date.now()}`;

    const newOrder: Order = {
      ...orderData,
      orderId,
      downloadToken,
      downloadCount: 0,
      maxDownloads: 1, // Strict 1-time download
      createdAt: new Date().toISOString(),
    };

    orders.unshift(newOrder);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    return newOrder;
  },

  // Find order by download token
  getOrderByToken(token: string): Order | null {
    const orders = this.getAllOrders();
    return orders.find(o => o.downloadToken === token) || null;
  },

  // Find order by order ID
  getOrderById(orderId: string): Order | null {
    const orders = this.getAllOrders();
    return orders.find(o => o.orderId === orderId) || null;
  },

  // Validate and record a download attempt
  recordDownload(token: string): { success: boolean; error?: string; order?: Order } {
    const orders = this.getAllOrders();
    const orderIndex = orders.findIndex(o => o.downloadToken === token);

    if (orderIndex === -1) {
      return { success: false, error: 'Invalid or expired download link.' };
    }

    const order = orders[orderIndex];

    if (order.downloadCount >= order.maxDownloads) {
      return {
        success: false,
        error: `This download link has already been used (${order.downloadCount}/${order.maxDownloads} downloads used). Please contact support for assistance.`
      };
    }

    // Increment download count and record timestamp
    order.downloadCount += 1;
    order.downloadedAt = new Date().toISOString();
    orders[orderIndex] = order;
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));

    return { success: true, order };
  },

  // Admin action: Reset download limit to grant 1 additional download
  resetDownloadLimit(orderId: string): boolean {
    const orders = this.getAllOrders();
    const orderIndex = orders.findIndex(o => o.orderId === orderId);
    if (orderIndex === -1) return false;

    orders[orderIndex].downloadCount = 0;
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    return true;
  }
};
