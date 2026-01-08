"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Lock } from 'lucide-react';
import { Logo } from "@/components/logo";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="mb-8">
        <Logo />
      </div>
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center mb-4">
            <Lock className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl">Acesso Restrito</CardTitle>
          <CardDescription>
            Esta é uma apresentação temporária com acesso privado.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Para visualizar o conteúdo, por favor, utilize o link de acesso que foi compartilhado com você.
          </p>
        </CardContent>
      </Card>
        <p className="text-xs text-muted-foreground mt-8">
            Se você acredita que isso é um erro, entre em contato com o administrador.
        </p>
    </div>
  );
}
