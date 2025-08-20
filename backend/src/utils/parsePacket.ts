// src/utils/parsePacket.ts
import { DevicePacketRaw } from '../types/logs';

export function extractPacketFromTextPayload(textPayload: string): DevicePacketRaw | null {
  // Find "incoming packet:" (case-insensitive) and then the first JSON object
  const marker = /incoming packet:\s*/i;
  const idx = textPayload.search(marker);
  if (idx === -1) return null;

  const after = textPayload.slice(idx + textPayload.match(marker)![0].length);

  // Find the first '{' and attempt to parse a JSON object starting there.
  const firstBrace = after.indexOf('{');
  if (firstBrace === -1) return null;

  const candidate = after.slice(firstBrace);

  // Robust parse: walk the braces to find the matching closing brace.
  const endIndex = findMatchingBraceIndex(candidate);
  if (endIndex === -1) {
    // Fallback: try a simple JSON.parse (may succeed if the remainder is exactly the object)
    try {
      return JSON.parse(candidate) as DevicePacketRaw;
    } catch {
      return null;
    }
  }

  const jsonSlice = candidate.slice(0, endIndex + 1);
  try {
    return JSON.parse(jsonSlice) as DevicePacketRaw;
  } catch {
    return null;
  }
}

function findMatchingBraceIndex(s: string): number {
  let depth = 0;
  let inString = false;
  let escape = false;

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];

    if (inString) {
      if (escape) {
        escape = false;
      } else if (ch === '\\') {
        escape = true;
      } else if (ch === '"') {
        inString = false;
      }
      continue;
    }

    if (ch === '"') {
      inString = true;
      continue;
    }
    if (ch === '{') depth++;
    if (ch === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}
