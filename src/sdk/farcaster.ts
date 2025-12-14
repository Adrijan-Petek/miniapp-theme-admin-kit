/**
 * Farcaster Mini App SDK wrapper (NO hard dependency).
 *
 * If the official SDK is available, it may be injected as `window.sdk`.
 */
export type FarcasterProfile = { fid?: number; username?: string; displayName?: string };

function getSdk(): any {
  return (window as any).sdk ?? null;
}

export async function farcasterReady(): Promise<void> {
  try {
    const sdk = getSdk();
    if (sdk?.actions?.ready) await sdk.actions.ready();
  } catch {}
}

export async function getFarcasterProfile(): Promise<FarcasterProfile> {
  try {
    const sdk = getSdk();
    const ctx = await sdk?.context;
    return { fid: ctx?.user?.fid, username: ctx?.user?.username, displayName: ctx?.user?.displayName };
  } catch {
    return {};
  }
}

export function emitEvent(type: string, payload?: any) {
  try {
    const sdk = getSdk();
    sdk?.actions?.sendEvent?.(type, payload);
  } catch {}
}
