"use client";

import { AnexoLayout } from "@/app/components/anexo-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { EvidenceImage } from "@/app/components/evidence-image";
import { Separator } from "@/components/ui/separator";

export default function Anexo5() {
  return (
    <AnexoLayout title="Anexo V – Fluxos de Processo" number={5}>
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* 1. Objetivo do Anexo */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Objetivo do Anexo</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Análise Comparativa dos Fluxos de Processo
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-justify">
              Este anexo tem como objetivo apresentar, de forma visual e comparativa, os fluxos de processo críticos para a operação da BMV. A análise se concentra em dois cenários distintos para cada fluxo, mapeados a partir da ferramenta Miro:
            </p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Fluxo AS-IS:</strong> Mapeamento do processo operacional atual, evidenciando suas etapas, dependências manuais e pontos de atrito.</li>
              <li><strong>Fluxo TO-BE:</strong> Proposta de processo otimizado, com foco em automação, melhoria da experiência do usuário e eficiência operacional.</li>
            </ul>

            <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
              <AlertDescription>
                <p className="font-semibold mb-2">Propósito da Comparação</p>
                <p className="text-sm text-justify">
                  A comparação visual entre os dois cenários para cada fluxo permite identificar claramente as lacunas conceituais e operacionais do modelo atual e o potencial de ganho em governança, rastreabilidade e automação com a implementação dos modelos futuros.
                </p>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* 2. Jornada da UCS */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Fluxo 1: Jornada da UCS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Jornada da UCS dentro do Sistema BMV (AS-IS)</h3>
              <p className="text-justify mb-4">
                O fluxograma abaixo representa o estado atual da jornada da UCS. As etapas, da geração da safra até a aposentadoria, ocorrem majoritariamente dentro do sistema de backoffice, com a blockchain atuando como um registro posterior, e não como o motor da transação.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <EvidenceImage 
                  imageId="jornada-ucs-as-is" 
                  caption="Diagrama do fluxo de processo AS-IS, detalhando as etapas operacionais vigentes no sistema BMV."
                />
              </div>
              <Alert className="mt-4">
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
            </div>

            <Separator />

            <div>
              <h3 className="text-xl font-semibold mb-3">Jornada da UCS dentro do Blockchain (TO-BE)</h3>
              <p className="text-justify mb-4">
                O modelo TO-BE propõe uma reengenharia onde a jornada da UCS ocorre nativamente na blockchain. Cada etapa, desde a geração até a aposentadoria, é uma transação on-chain, garantindo imutabilidade, transparência e automação.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <EvidenceImage 
                  imageId="jornada-ucs-to-be" 
                  caption="Diagrama do fluxo de processo TO-BE, com a jornada da UCS ocorrendo diretamente na blockchain (Polkadot)."
                />
              </div>
              <Alert variant="destructive" className="mt-4">
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
            </div>
          </CardContent>
        </Card>

        {/* 3. Intenção de Movimentação */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Fluxo 2: Intenção de Movimentação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Fluxo de Intenção de Movimentação (AS-IS)</h3>
              <p className="text-justify mb-4">
                O processo atual para uma intenção de movimentação é manual e fragmentado, dependendo de canais de comunicação externos como e-mail, e de ações manuais no backoffice.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <EvidenceImage 
                  imageId="intencao-movimentacao-as-is" 
                  caption="Diagrama do fluxo atual (AS-IS) para Intenção de Movimentação."
                />
              </div>
              <Alert className="mt-4">
                <AlertDescription>
                  <p className="font-semibold mb-2">Pontos Críticos do Fluxo AS-IS:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Dependência de e-mail para iniciar a solicitação.</li>
                    <li>Operador precisa executar a movimentação manualmente no sistema.</li>
                    <li>Comunicação de volta para o cliente também é manual.</li>
                    <li>Não há rastreabilidade sistêmica da solicitação inicial.</li>
                    <li>Alto risco de erro humano e atrasos.</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </div>

            <Separator />
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Fluxo de Intenção de Movimentação (TO-BE)</h3>
              <p className="text-justify mb-4">
                O fluxo ideal automatiza o processo, centralizando todas as ações na plataforma digital da BMV, proporcionando uma experiência mais fluida e segura para o cliente e para o operador.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <EvidenceImage 
                  imageId="intencao-movimentacao-to-be" 
                  caption="Diagrama do fluxo ideal (TO-BE) para Intenção de Movimentação."
                />
              </div>
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>
                  <p className="font-semibold mb-2">Principais Ganhos com o Fluxo TO-BE:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>Autoatendimento:</strong> Cliente solicita a movimentação diretamente em sua carteira digital.</li>
                    <li><strong>Processo Simplificado:</strong> O operador apenas aprova a movimentação já registrada no sistema.</li>
                    <li><strong>Automação e Rastreabilidade:</strong> A visualização na carteira é imediata após a aprovação, e todo o processo é rastreável.</li>
                    <li><strong>Redução de Erros:</strong> Minimiza o risco de erros manuais e melhora a eficiência operacional.</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>


        {/* Conclusão */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Conclusão e Próximos Passos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-justify">
             A transição dos fluxos AS-IS para os modelos TO-BE é um requisito fundamental para materializar a proposta de valor da BMV, baseada em automação, tokenização e rastreabilidade. A implementação dos modelos ideais deve ser tratada como a principal prioridade estratégica no roadmap de desenvolvimento do sistema para garantir escalabilidade, segurança e uma boa experiência para o usuário.
            </p>
            <div className="border-t pt-4 mt-6 text-sm text-muted-foreground">
              <p><strong>Data:</strong> Janeiro/2026</p>
              <p><strong>Versão:</strong> 1.0</p>
              <p><strong>Documento:</strong> ANEXO V – Fluxos de Processo</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AnexoLayout>
  );
}
