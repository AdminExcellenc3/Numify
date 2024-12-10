export interface Company {
  id: string;
  created_at: string;
  name: string;
  address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  vat_number?: string;
  email?: string;
  phone?: string;
  logo_url?: string;
  user_id: string;
}

export interface Client {
  id: string;
  created_at: string;
  company_id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  vat_number?: string;
}

export interface Invoice {
  id: string;
  created_at: string;
  invoice_number: string;
  company_id: string;
  client_id: string;
  issue_date: string;
  due_date: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total: number;
  notes?: string;
}

export interface InvoiceItem {
  id: string;
  created_at: string;
  invoice_id: string;
  description: string;
  quantity: number;
  unit_price: number;
  tax_rate: number;
  amount: number;
}