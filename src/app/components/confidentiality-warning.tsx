
"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ShieldAlert } from "lucide-react";

interface ConfidentialityWarningProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function ConfidentialityWarning({ isOpen, onOpenChange }: ConfidentialityWarningProps) {
  
  const handleAgree = () => {
    try {
      localStorage.setItem('confidentiality_agreed', 'true');
    } catch (error) {
      console.error("Failed to set confidentiality agreement in localStorage:", error);
    }
    onOpenChange(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
            <div className="flex justify-center mb-4">
                <ShieldAlert className="h-12 w-12 text-destructive" />
            </div>
          <AlertDialogTitle className="text-center text-xl">Aviso de Confidencialidade e Restrição de Acesso</AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-muted-foreground text-justify space-y-3 pt-2">
            <p>
              Este sistema contém informações de caráter estritamente confidencial, estratégico e proprietário da BMV. O acesso é concedido a você em caráter pessoal e intransferível, sob condição de sigilo absoluto.
            </p>
            <p>
              É expressamente proibida a cópia, impressão, distribuição, compartilhamento de tela ou qualquer outra forma de divulgação do conteúdo aqui apresentado a terceiros não autorizados. Todas as atividades de acesso, visualização e interação são monitoradas e registradas para fins de auditoria de segurança.
            </p>
            <p>
              O descumprimento destes termos constitui violação grave de confidencialidade e sujeitará o infrator às medidas cíveis e criminais cabíveis.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleAgree} className="w-full">
            Estou Ciente e Concordo com os Termos
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
