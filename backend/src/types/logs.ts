// src/types/log.ts
export interface GkeLogEntry {
  textPayload: string;
  insertId: string;
  resource: {
    type: string;
    labels: Record<string, string>;
  };
  timestamp: string;
  severity: string;
  labels: Record<string, string>;
  logName: string;
  receiveTimestamp: string;
}

export interface Gps {
  Lng: number;
  Lat: number;
  Speed?: number;
}

export interface EventBuffer {
  type: 'Buffer';
  data: number[];
}

export interface DeviceEvent {
  id: number;
  // The source sometimes sends { type:'Buffer', data:[...] } but we normalize to number[]
  data: number[] | EventBuffer;
}

export interface DevicePacketRaw {
  GPS?: Gps;
  Events: DeviceEvent[];
  DateTime: string;
}

export interface DevicePacket extends Omit<DevicePacketRaw, 'Events'> {
  Events: { id: number; data: number[] }[];
}
