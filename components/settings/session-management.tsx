"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase/client";
import { Shield, Globe, Clock, Monitor } from "lucide-react";
import { getTimeAgo } from "@/lib/utils";

interface Session {
  id: string;
  created_at: string;
  last_active: string;
  browser: string;
  os: string;
  ip_address: string;
  location: string;
  device_type: string;
  current: boolean;
}

export function SessionManagement() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        // Mock implementation - replace with actual session fetching
        setSessions([
          {
            id: session?.access_token || "current",
            created_at: new Date().toISOString(),
            last_active: new Date().toISOString(),
            browser: "Chrome 120.0.0",
            os: "Windows 11",
            ip_address: "192.168.1.1",
            location: "Amsterdam, Netherlands",
            device_type: "Desktop",
            current: true,
          },
          {
            id: "previous-session",
            created_at: new Date(Date.now() - 86400000).toISOString(),
            last_active: new Date(Date.now() - 3600000).toISOString(),
            browser: "Safari 17.0",
            os: "iOS 17",
            ip_address: "192.168.1.2",
            location: "Paris, France",
            device_type: "Mobile",
            current: false,
          },
        ]);
      } catch (error) {
        console.error("Error loading sessions:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not load sessions. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSessions();
  }, [toast]);

  const handleRevokeSession = async (sessionId: string) => {
    try {
      if (sessionId === "current") {
        await supabase.auth.signOut();
        window.location.href = "/login";
      }

      setSessions((prev) => prev.filter((session) => session.id !== sessionId));

      toast({
        title: "Session revoked",
        description: "The selected session has been revoked successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not revoke session. Please try again.",
      });
    }
  };

  if (isLoading) {
    return <div>Loading sessions...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium">Security Status</span>
          </div>
          <p className="mt-2 text-2xl font-bold">Secure</p>
          <p className="text-xs text-muted-foreground">All sessions are encrypted</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">Active Locations</span>
          </div>
          <p className="mt-2 text-2xl font-bold">{sessions.length}</p>
          <p className="text-xs text-muted-foreground">Across different locations</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium">Last Activity</span>
          </div>
          <p className="mt-2 text-2xl font-bold">Just now</p>
          <p className="text-xs text-muted-foreground">Current session</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <Monitor className="h-4 w-4 text-purple-500" />
            <span className="text-sm font-medium">Devices</span>
          </div>
          <p className="mt-2 text-2xl font-bold">
            {new Set(sessions.map(s => s.device_type)).size}
          </p>
          <p className="text-xs text-muted-foreground">Different device types</p>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Device & Location</TableHead>
              <TableHead>Browser & OS</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium">
                      {session.device_type}
                      {session.current && " (Current)"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {session.location}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium">{session.browser}</p>
                    <p className="text-sm text-muted-foreground">{session.os}</p>
                  </div>
                </TableCell>
                <TableCell>{session.ip_address}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium">{getTimeAgo(session.last_active)}</p>
                    <p className="text-sm text-muted-foreground">
                      Started {new Date(session.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRevokeSession(session.id)}
                  >
                    Revoke
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}