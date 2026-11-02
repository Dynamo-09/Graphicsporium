import { Order } from '../types/ecommerce';

/**
 * Service to sync orders, clients, and admin verification with Google Sheets.
 * Uses a Google Apps Script Web App endpoint.
 */

// You can set this in .env or localStorage for testing
const GOOGLE_SHEETS_WEBHOOK_URL = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL || '';

export const sheetsService = {
  getWebhookUrl(): string {
    return GOOGLE_SHEETS_WEBHOOK_URL || localStorage.getItem('gp_sheets_webhook_url') || '';
  },

  setWebhookUrl(url: string) {
    localStorage.setItem('gp_sheets_webhook_url', url);
  },

  /**
   * Sync a new order to the Google Sheet 'Orders' tab
   */
  async syncOrder(order: Order): Promise<boolean> {
    const url = this.getWebhookUrl();
    if (!url) return false;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors', // standard for Apps Script webhooks
        body: JSON.stringify({
          action: 'create_order',
          data: order,
        }),
      });
      return true;
    } catch (err) {
      console.warn('Google Sheets order sync skipped/failed:', err);
      return false;
    }
  },

  /**
   * Verify an admin login with email & SHA-256 password hash against the Google Sheet
   */
  async verifyAdmin(email: string, passwordHash: string): Promise<{ success: boolean; name?: string }> {
    const url = this.getWebhookUrl();
    if (!url) {
      // Fallback for default local admin development
      if (email === 'admin@graphicporium.com') {
        return { success: true, name: 'Graphicporium Admin' };
      }
      return { success: false };
    }

    try {
      const response = await fetch(`${url}?action=verify_admin&email=${encodeURIComponent(email)}&hash=${encodeURIComponent(passwordHash)}`);
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Failed to verify admin via Google Sheets:', err);
      return { success: false };
    }
  }
};
