-- Home Services Lead Capture System
-- Supabase Migration: leads table
-- Run this in Supabase SQL Editor (https://app.supabase.com > SQL Editor)

-- Create the leads table
CREATE TABLE IF NOT EXISTS leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    phone TEXT NOT NULL,
    service TEXT NOT NULL,
    location TEXT NOT NULL,
    service_type TEXT NOT NULL,
    source TEXT DEFAULT 'website',
    status TEXT DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Deny all client-side access
-- Only service_role key (used by backend) can bypass RLS
-- No policies = deny all for anon/authenticated roles

-- Create index on created_at for dashboard query performance
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);

-- Verify table was created
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'leads' 
ORDER BY ordinal_position;
