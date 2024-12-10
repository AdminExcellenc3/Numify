"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  LogIn, 
  LogOut, 
  KeyRound, 
  ShieldAlert, 
  Mail,
  SmartphoneNfc
} from "lucide-react";

interface SecurityEvent {
  id: string;
  type: 'login' | 'logout' | 'password_change' | 'failed_attempt' | 'email_change' | '2fa_enabled';
  timestamp: string;
  ip_address: string;
  location: string;
  device: string;
}

export function SecurityLog() {
  const [events, setEvents] = useState<SecurityEvent[]>([]);

  useEffect(() => {
    // Mock security events
    setEvents([
      {
        id: "1",
        type: "login",
        timestamp: new Date().toISOString(),
        ip_address: "192.168.1.1",
        location: "Amsterdam, Netherlands",
        device: "Chrome on Windows",
      },
      {
        id: "2",
        type: "password_change",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        ip_address: "192.168.1.1",
        location: "Amsterdam, Netherlands",
        device: "Chrome on Windows",
      },
      {
        id: "3",
        type: "failed_attempt",
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        ip_address: "192.168.1.2",
        location: "Unknown Location",
        device: "Unknown Device",
      },
      {
        id: "4",
        type: "2fa_enabled",
        timestamp: new Date(Date.now() - 259200000).toISOString(),
        ip_address: "192.168.1.1",
        location: "Amsterdam, Netherlands",
        device: "Chrome on Windows",
      },
    ]);
  }, []);

  const getEventIcon = (type: SecurityEvent['type']) => {
    const icons = {
      login: <LogIn className="h-4 w-4" />,
      logout: <LogOut className="h-4 w-4" />,
      password_change: <KeyRound className="h-4 w-4" />,
      failed_attempt: <ShieldAlert className="h-4 w-4" />,
      email_change: <Mail className="h-4 w-4" />,
      '2fa_enabled': <SmartphoneNfc className="h-4 w-4" />,
    };
    return icons[type];
  };

  const getEventLabel = (type: SecurityEvent['type']) => {
    const labels = {
      login: "Login",
      logout: "Logout",
      password_change: "Password Changed",
      failed_attempt: "Failed Login Attempt",
      email_change: "Email Changed",
      '2fa_enabled': "2FA Enabled",
    };
    return labels[type];
  };

  const getEventVariant = (type: SecurityEvent['type']) => {
    const variants = {
      login: "default",
      logout: "secondary",
      password_change: "outline",
      failed_attempt: "destructive",
      email_change: "outline",
      '2fa_enabled': "default",
    };
    return variants[type] as "default" | "secondary" | "destructive" | "outline";
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security Log</h3>
        <p className="text-sm text-muted-foreground">
          Recent security events for your account
        </p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Device</TableHead>
              <TableHead>IP Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getEventIcon(event.type)}
                    <Badge variant={getEventVariant(event.type)}>
                      {getEventLabel(event.type)}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(event.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{event.device}</TableCell>
                <TableCell>{event.ip_address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}