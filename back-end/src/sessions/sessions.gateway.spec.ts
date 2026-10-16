import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SessionsGateway } from './sessions.gateway.js';

describe('SessionsGateway', () => {
  let gateway: SessionsGateway;
  const mockEmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    gateway = new SessionsGateway();
    gateway.server = { emit: mockEmit } as never;
  });

  it('should increment and broadcast active sessions on connect and disconnect', () => {
    gateway.handleConnection({ id: 'client-1' } as never);
    expect(mockEmit).toHaveBeenLastCalledWith('activeSessions', 1);

    gateway.handleConnection({ id: 'client-2' } as never);
    expect(mockEmit).toHaveBeenLastCalledWith('activeSessions', 2);

    gateway.handleDisconnect({ id: 'client-1' } as never);
    expect(mockEmit).toHaveBeenLastCalledWith('activeSessions', 1);
  });
});
