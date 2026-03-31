import { Shield, HardDrive, Share2, Terminal } from 'lucide-react';

export const LOG_ENTRIES = [
  { id: '001', label: 'KERNEL_LOG', icon: Shield, status: 'SECURE', ref: 'X92-TR', sector: '04', type: 'SECURITY' },
  { id: '002', label: 'DATA_STREAM', icon: HardDrive, status: 'SYNC', ref: 'B14-MK', sector: '05', type: 'DATA' },
  { id: '003', label: 'UPLINK_NODE', icon: Share2, status: 'ACTIVE', ref: 'L09-QV', sector: '06', type: 'UPLINK' },
  { id: '004', label: 'SYS_CORE', icon: Terminal, status: 'STABLE', ref: 'Z11-PT', sector: '01', type: 'SYSTEM' },
  { id: '005', label: 'FIREWALL_X', icon: Shield, status: 'STABLE', ref: 'F22-RT', sector: '02', type: 'SECURITY' },
  { id: '006', label: 'BACKUP_STR', icon: HardDrive, status: 'SYNC', ref: 'S44-XP', sector: '09', type: 'DATA' },
];