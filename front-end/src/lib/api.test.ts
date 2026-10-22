import { describe, expect, it } from 'vitest';
import { httpClient } from './api';

describe('API client configuration', () => {
  it('reads baseURL from NEXT_PUBLIC_API_URL environment variable', () => {
    expect(httpClient.defaults.baseURL).toBe(process.env.NEXT_PUBLIC_API_URL);
    expect(httpClient.defaults.baseURL).toBeDefined();
    expect(httpClient.defaults.baseURL).not.toBe('');
  });
});
