// src/models/DevicePacketModel.ts
import { DevicePacket, DevicePacketRaw, DeviceEvent } from '../types/log';

export class DevicePacketModel implements DevicePacket {
  GPS?: DevicePacket['GPS'];
  Events: DevicePacket['Events'];
  DateTime: string;

  constructor(raw: DevicePacketRaw) {
    this.GPS = raw.GPS;
    this.DateTime = raw.DateTime;
    this.Events = raw.Events.map(DevicePacketModel.normalizeEvent);
  }

  static normalizeEvent(ev: DeviceEvent): { id: number; data: number[] } {
    if (Array.isArray(ev.data)) return { id: ev.id, data: ev.data };
    // handle { type:'Buffer', data:[...] }
    if (ev.data && typeof ev.data === 'object' && 'data' in ev.data) {
      return { id: ev.id, data: (ev.data as any).data ?? [] };
    }
    return { id: ev.id, data: [] };
  }
}
