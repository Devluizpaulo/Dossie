"use client";

import { AnexoLayout } from "@/app/components/anexo-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { EvidenceImage } from "@/app/components/evidence-image";

export default function Anexo5() {
  return (
    <AnexoLayout title="Anexo V – Fluxos de Processo (Jornada da UCS)" number={5}>
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* 1. Objetivo do Anexo */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Objetivo do Anexo</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Análise Comparativa da Jornada da UCS
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-justify">
              Este anexo tem como objetivo apresentar, de forma visual e comparativa, os fluxos de processo que compõem a <strong>Jornada da UCS (Unidade de Crédito de Sustentabilidade)</strong>. A análise se concentra em dois cenários distintos, mapeados a partir da ferramenta Miro:
            </p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Fluxo AS-IS (Sistema BMV):</strong> Mapeamento do processo operacional atual, evidenciando suas etapas, dependências manuais e pontos de atrito dentro do sistema de backoffice.</li>
              <li><strong>Fluxo TO-BE (Blockchain):</strong> Proposta de processo otimizado, com foco em automação, integração nativa com a blockchain (Polkadot) e eficiência operacional ponta a ponta.</li>
            </ul>

            <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
              <AlertDescription>
                <p className="font-semibold mb-2">Propósito da Comparação</p>
                <p className="text-sm text-justify">
                  A comparação visual entre os dois fluxos permite identificar claramente as lacunas conceituais e operacionais do modelo atual e o potencial de ganho em governança, rastreabilidade e automação com a implementação do modelo futuro.
                </p>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* 2. Fluxo Operacional Atual (AS-IS) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Jornada da UCS dentro do Sistema BMV (AS-IS)</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Mapeamento do processo como ele é executado hoje.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-justify">
              O fluxograma abaixo representa o estado atual da jornada da UCS. As etapas, da geração da safra até a aposentadoria, ocorrem majoritariamente dentro do sistema de backoffice, com a blockchain atuando como um registro posterior, e não como o motor da transação.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <EvidenceImage 
                imageId="jornada-ucs-as-is" 
                caption="Diagrama do fluxo de processo AS-IS, detalhando as etapas operacionais vigentes no sistema BMV."
              />
            </div>
            <Alert>
              <AlertDescription>
                <p className="font-semibold mb-2">Pontos Críticos do Fluxo AS-IS:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>O particionamento da safra é um processo interno do sistema.</li>
                  <li>A custódia e as movimentações (trading, investimento, transferência) são controladas pelo backoffice.</li>
                  <li>A rastreabilidade depende da integridade da base de dados interna.</li>
                  <li>O processo é suscetível a intervenções manuais e potenciais inconsistências.</li>
                </ul>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* 3. Proposta de Fluxo Futuro (TO-BE) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Jornada da UCS dentro do Blockchain (TO-BE)</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Desenho do processo otimizado e automatizado na blockchain.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-justify">
              O modelo TO-BE propõe uma reengenharia onde a jornada da UCS ocorre nativamente na blockchain. Cada etapa, desde a geração até a aposentadoria, é uma transação on-chain, garantindo imutabilidade, transparência e automação.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <EvidenceImage 
                imageId="jornada-ucs-to-be" 
                caption="Diagrama do fluxo de processo TO-BE, com a jornada da UCS ocorrendo diretamente na blockchain (Polkadot)."
              />
            </div>
            <Alert variant="destructive">
              <AlertDescription>
                <p className="font-semibold mb-2">Principais Ganhos com o Fluxo TO-BE:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li><strong>Automação Nativa:</strong> Particionamento (tokenização) e distribuição para as carteiras (wallets) ocorrem de forma automática.</li>
                  <li><strong>Rastreabilidade Total:</strong> Todas as movimentações e a aposentadoria são registradas de forma imutável na blockchain.</li>
                  <li><strong>Governança Descentralizada:</strong> Reduz a dependência de uma base de dados central e de intervenções manuais.</li>
                  <li><strong>Escalabilidade:</strong> O modelo é inerentemente mais escalável e seguro para suportar um volume maior de transações.</li>
                </ul>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* 4. Conclusão */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Conclusão e Próximos Passos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-justify">
             A transição do fluxo AS-IS para o TO-BE é um requisito fundamental para materializar a proposta de valor da BMV, baseada em tokenização e rastreabilidade. A implementação do modelo TO-BE, onde a blockchain é o núcleo do processo, deve ser tratada como a principal prioridade estratégica no roadmap de desenvolvimento do sistema.
            </p>
            <div className="border-t pt-4 mt-6 text-sm text-muted-foreground">
              <p><strong>Data:</strong> Janeiro/2026</p>
              <p><strong>Versão:</strong> 1.0</p>
              <p><strong>Documento:</strong> ANEXO V – Fluxos de Processo (Jornada da UCS)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AnexoLayout>
  );
}
