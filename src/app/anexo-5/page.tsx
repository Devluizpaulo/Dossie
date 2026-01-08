"use client";

import { AnexoLayout } from "@/app/components/anexo-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { EvidenceImage } from "@/app/components/evidence-image";

export default function Anexo5() {
  return (
    <AnexoLayout title="Anexo V – Fluxos de Processo (AS-IS e TO-BE)" number={5}>
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* 1. Objetivo do Anexo */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Objetivo do Anexo</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Visualização dos Fluxos de Processo (Miro)
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-justify">
              Este anexo tem como objetivo apresentar, de forma visual e comparativa, os fluxos de processo documentados na ferramenta Miro. A análise se concentra em dois cenários:
            </p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Fluxo AS-IS:</strong> Mapeamento do processo operacional atual, evidenciando suas etapas, dependências manuais e pontos de atrito.</li>
              <li><strong>Fluxo TO-BE:</strong> Proposta de processo otimizado, com foco em automação, integração sistêmica e eficiência operacional.</li>
            </ul>

            <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
              <AlertDescription>
                <p className="font-semibold mb-2">Propósito da Comparação</p>
                <p className="text-sm text-justify">
                  A comparação visual entre os dois fluxos permite identificar claramente as lacunas do modelo atual e o potencial de ganho com a implementação do modelo futuro, subsidiando a priorização de ações de reengenharia de processos.
                </p>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* 2. Fluxo Operacional Atual (AS-IS) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Fluxo Operacional Atual (AS-IS)</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Mapeamento do processo como ele é executado hoje.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-justify">
              O fluxograma abaixo representa o estado atual dos processos críticos analisados. As etapas destacam a dependência de intervenções manuais, a utilização de ferramentas externas (como e-mail e planilhas) e as quebras na jornada digital do usuário.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <EvidenceImage 
                imageId="fluxo-as-is" 
                caption="Diagrama do fluxo de processo AS-IS, detalhando as etapas operacionais vigentes."
              />
            </div>
            <Alert>
              <AlertDescription>
                <p className="font-semibold mb-2">Pontos Críticos do Fluxo AS-IS:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Alta carga operacional sobre a equipe de back-office.</li>
                  <li>Risco elevado de erro humano devido a tarefas repetitivas.</li>
                  <li>Falta de rastreabilidade ponta-a-ponta dentro do sistema.</li>
                  <li>Experiência do cliente fragmentada e pouco fluida.</li>
                </ul>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* 3. Proposta de Fluxo Futuro (TO-BE) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Proposta de Fluxo Futuro (TO-BE)</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Desenho do processo otimizado e automatizado.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-justify">
              O modelo TO-BE propõe uma reengenharia completa do fluxo, com foco na automação de tarefas, integração entre sistemas e centralização das operações na plataforma principal. O objetivo é transformar o papel do back-office de executor para supervisor de processos.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <EvidenceImage 
                imageId="fluxo-to-be" 
                caption="Diagrama do fluxo de processo TO-BE, com foco em automação e eficiência."
              />
            </div>
            <Alert variant="destructive">
              <AlertDescription>
                <p className="font-semibold mb-2">Principais Ganhos com o Fluxo TO-BE:</p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Redução drástica da necessidade de intervenção manual.</li>
                  <li>Aumento da escalabilidade e capacidade de processamento.</li>
                  <li>Garantia de rastreabilidade e governança em todas as etapas.</li>
                  <li>Melhora significativa na experiência do cliente, com uma jornada 100% digital.</li>
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
              A transição do fluxo AS-IS para o TO-BE é um requisito fundamental para mitigar os riscos operacionais identificados nos anexos anteriores e para viabilizar a estratégia de crescimento da BMV. A implementação do modelo TO-BE deve ser tratada como uma prioridade estratégica no roadmap de desenvolvimento do sistema.
            </p>
            <div className="border-t pt-4 mt-6 text-sm text-muted-foreground">
              <p><strong>Data:</strong> Janeiro/2026</p>
              <p><strong>Versão:</strong> 1.0</p>
              <p><strong>Documento:</strong> ANEXO V – Fluxos de Processo (AS-IS e TO-BE)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AnexoLayout>
  );
}
