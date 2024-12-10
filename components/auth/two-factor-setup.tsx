"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import QRCode from "qrcode";

export function TwoFactorSetup() {
  const [isOpen, setIsOpen] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const { toast } = useToast();

  const setupTwoFactor = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error("No user found");

      // This is a mock implementation since Supabase doesn't provide 2FA out of the box
      // In a real implementation, you would:
      // 1. Generate a secret on the backend
      // 2. Create a QR code with the secret
      // 3. Verify the code provided by the user
      const secret = "MOCK2FASECRET";
      const otpauth = `otpauth://totp/InvoiceApp:${user.email}?secret=${secret}&issuer=InvoiceApp`;
      
      const qr = await QRCode.toDataURL(otpauth);
      setQrCode(qr);
      setIsOpen(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not setup two-factor authentication.",
      });
    }
  };

  const verifyAndEnable2FA = async () => {
    try {
      // Mock verification - in a real implementation, you would verify the code
      // against the secret on your backend
      if (verificationCode.length === 6) {
        toast({
          title: "Success",
          description: "Two-factor authentication has been enabled.",
        });
        setIsOpen(false);
      } else {
        throw new Error("Invalid code");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid verification code.",
      });
    }
  };

  return (
    <>
      <Button onClick={setupTwoFactor}>Enable Two-Factor Authentication</Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Setup Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              Scan the QR code with your authenticator app and enter the verification code below.
            </DialogDescription>
          </DialogHeader>
          
          {qrCode && (
            <div className="flex flex-col items-center space-y-4">
              <img src={qrCode} alt="2FA QR Code" className="w-48 h-48" />
              <Input
                type="text"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
              />
              <Button onClick={verifyAndEnable2FA}>Verify and Enable</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}