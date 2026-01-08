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
            <p className="text-sm text-muted-foreground mt-2">
              Comparação: Processo Atual vs. Modelo Ideal
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-justify mb-4">
                A jornada da UCS representa o ciclo completo de uma Unidade de Crédito de Safra, da geração até a aposentadoria. A comparação abaixo ilustra o estado atual (com centralidade no backoffice) versus o modelo ideal (com automação nativa na blockchain Polkadot).
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <EvidenceImage 
                  imageId="jornada-ucs-as-is" 
                  caption="Fluxo comparativo: AS-IS (processo atual centralizado no backoffice) vs. TO-BE (automação nativa na blockchain)."
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Alert className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
                <AlertDescription>
                  <p className="font-semibold text-orange-700 dark:text-orange-300 mb-2">🔴 Estado Atual (AS-IS)</p>
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>Etapas controladas internamente no backoffice</li>
                    <li>Blockchain atua como registro posterior</li>
                    <li>Rastreabilidade depende da base de dados interna</li>
                    <li>Suscetível a intervenções manuais e inconsistências</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <Alert variant="destructive">
                <AlertDescription>
                  <p className="font-semibold mb-2">✅ Modelo Ideal (TO-BE)</p>
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>Jornada nativa na blockchain (Polkadot)</li>
                    <li>Cada etapa é uma transação on-chain imutável</li>
                    <li>Automação total do particionamento e distribuição</li>
                    <li>Governança descentralizada e escalável</li>
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
            <p className="text-sm text-muted-foreground mt-2">
              Comparação: Processo Atual vs. Modelo Ideal
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-justify mb-4">
                Uma intenção de movimentação permite ao cliente solicitar transferências, trading ou investimentos de suas UCS. A comparação abaixo mostra o fluxo manual atual versus o processo automatizado ideal.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <EvidenceImage 
                  imageId="intencao-movimentacao-as-is" 
                  caption="Fluxo comparativo: AS-IS (processo manual via e-mail) vs. TO-BE (autoatendimento digital integrado)."
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Alert className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
                <AlertDescription>
                  <p className="font-semibold text-orange-700 dark:text-orange-300 mb-2">🔴 Estado Atual (AS-IS)</p>
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>Dependência de e-mail para iniciar solicitação</li>
                    <li>Operador executa movimentação manualmente</li>
                    <li>Comunicação de retorno também manual</li>
                    <li>Sem rastreabilidade sistêmica da solicitação</li>
                    <li>Alto risco de erro humano e atrasos</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <Alert variant="destructive">
                <AlertDescription>
                  <p className="font-semibold mb-2">✅ Modelo Ideal (TO-BE)</p>
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>Autoatendimento direto na carteira digital</li>
                    <li>Operador apenas aprova a solicitação registrada</li>
                    <li>Visualização na carteira é imediata</li>
                    <li>Processo totalmente rastreável e auditável</li>
                    <li>Minimiza erros e melhora eficiência</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* 4. Solicitação de CDE */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Fluxo 3: Solicitação de CDE</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Comparação: Processo Atual vs. Modelo Ideal
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-justify mb-4">
                A Certidão de Disponibilidade de Estoque (CDE) é um documento solicitado para fins de conformidade e comercialização. A comparação abaixo mostra o processo fragmentado atual versus o fluxo integrado ideal.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <EvidenceImage 
                  imageId="solicitacao-cde-as-is" 
                  caption="Fluxo comparativo: AS-IS (processo manual com sistemas externos) vs. TO-BE (fluxo integrado e automático)."
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Alert className="border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20">
                <AlertDescription>
                  <p className="font-semibold text-orange-700 dark:text-orange-300 mb-2">🔴 Estado Atual (AS-IS)</p>
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>Processo iniciado fora da plataforma (e-mail)</li>
                    <li>Aprovação interna manual e sequencial</li>
                    <li>Emissão de boleto em sistema de terceiros (Omie)</li>
                    <li>Pagamento e confirmação não integrados</li>
                    <li>CDE emitida e enviada manualmente</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <Alert variant="destructive">
                <AlertDescription>
                  <p className="font-semibold mb-2">✅ Modelo Ideal (TO-BE)</p>
                  <ul className="list-disc pl-4 space-y-1 text-sm">
                    <li>Solicitação centralizada na carteira BMV</li>
                    <li>Aprovação simplificada dentro do sistema</li>
                    <li>Boleto emitido e pagamento integrado</li>
                    <li>Confirmação automática na plataforma</li>
                    <li>CDE gerada e disponibilizada instantaneamente</li>
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
