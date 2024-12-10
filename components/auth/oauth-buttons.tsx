"use client";

import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

export function OAuthButtons() {
  const { toast } = useToast();

  const handleOAuthSignIn = async (provider: 'google') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not connect to Google. Please try again.",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <Button
        variant="outline"
        onClick={() => handleOAuthSignIn('google')}
        className="w-full"
      >
        <Mail className="mr-2 h-4 w-4" />
        Continue with Google
      </Button>
    </div>
  );
}