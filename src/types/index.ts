export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export interface Link {
  id: string;
  userId: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  openInNewTab: boolean;
  customAlias?: string;
  title?: string;
  description?: string;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface LinkClick {
  id: string;
  linkId: string;
  timestamp: Date;
  userAgent?: string;
  ip?: string;
}

export type Theme = 'dark';

export type ThemePreference = 'dark' | 'system';

export interface ThemeConfig {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  gradient: string;
}