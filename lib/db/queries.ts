import { supabase } from '@/lib/supabase';
import type { Company, Client, Invoice, InvoiceItem } from './types';

export async function getCompany() {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .single();
  
  if (error) throw error;
  return data as Company;
}

export async function getClients() {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data as Client[];
}

export async function getInvoices() {
  const { data, error } = await supabase
    .from('invoices')
    .select(`
      *,
      client:clients(name)
    `)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function getInvoiceWithItems(id: string) {
  const { data: invoice, error: invoiceError } = await supabase
    .from('invoices')
    .select(`
      *,
      client:clients(*),
      items:invoice_items(*)
    `)
    .eq('id', id)
    .single();
  
  if (invoiceError) throw invoiceError;
  return invoice;
}

export async function createInvoice(invoice: Partial<Invoice>, items: Partial<InvoiceItem>[]) {
  const { data, error } = await supabase
    .from('invoices')
    .insert(invoice)
    .select()
    .single();
  
  if (error) throw error;
  
  const invoiceItems = items.map(item => ({
    ...item,
    invoice_id: data.id
  }));
  
  const { error: itemsError } = await supabase
    .from('invoice_items')
    .insert(invoiceItems);
  
  if (itemsError) throw itemsError;
  
  return data;
}