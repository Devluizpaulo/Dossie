"use client";

import { AnexoLayout } from "@/app/components/anexo-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Gavel, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STATS } from "./whatsapp-data";
import {
  WhatsAppStats,
  ParticipantsList,
  IncidentTimeline,
  ContractualAnalysisTable,
  MediaGallery,
} from "./whatsapp-renderer";
import { WhatsAppTranscript } from "./whatsapp-transcript";

export default function Anexo6() {
  return (
    <AnexoLayout title="Anexo VI – Registro de Comunicação WhatsApp" number={6}>
      <div className="max-w-5xl mx-auto space-y-8">

        {/* 1. Objetivo do Anexo */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Objetivo do Anexo</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Registro Integral de Comunicação Operacional via WhatsApp
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-justify">
              Este Anexo consolida o <strong>registro integral da comunicação operacional</strong> mantida entre as equipes da <strong>BMV</strong> e da <strong>Multiledgers</strong> nos grupos de WhatsApp (Fase 1 e Fase 2), abrangendo o período de <strong>{STATS.period}</strong>.
            </p>
            <p className="text-justify">
              A documentação visa preservar, de forma <strong>rastreável, cronológica e auditável</strong>, todas as interações relativas a:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Reportes de bugs e erros operacionais;</li>
              <li>Solicitações de correção e melhorias;</li>
              <li>Evidências fotográficas (prints de tela);</li>
              <li>Tempos de resposta e resolução;</li>
              <li>Chamadas de alinhamento técnico;</li>
              <li>Decisões operacionais tomadas em tempo real;</li>
              <li>Posicionamentos formais do fornecedor.</li>
            </ul>

            <Alert className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
              <AlertDescription>
                <p className="font-semibold mb-2">⚠️ Natureza Probatória</p>
                <p className="text-sm text-justify">
                  Este registro constitui <strong>evidência documental primária</strong> e complementa as análises técnicas apresentadas no corpo principal do dossiê e nos demais anexos, servindo como base probatória para análise de SLA, tempos de resposta e padrões recorrentes de falhas.
                </p>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* 2. Estatísticas Gerais */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Visão Geral da Comunicação</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Período: {STATS.period} ({STATS.totalDays} dias)
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <WhatsAppStats />
          </CardContent>
        </Card>

        {/* 3. Participantes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Participantes do Grupo</CardTitle>
          </CardHeader>
          <CardContent>
            <ParticipantsList />
          </CardContent>
        </Card>

        {/* 4. Incidentes Críticos */}
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader className="bg-red-50 dark:bg-red-950/20">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <CardTitle className="text-2xl">Incidentes Críticos Identificados</CardTitle>
              <Badge variant="destructive">{STATS.keyIncidents.length} OCORRÊNCIAS</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Classificação por severidade extraída da análise cronológica das mensagens
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <IncidentTimeline />
          </CardContent>
        </Card>

        {/* 5. Análise de Padrões */}
        <Card className="border-amber-200 dark:border-amber-800">
          <CardHeader className="bg-amber-50 dark:bg-amber-950/20">
            <CardTitle className="text-2xl">Análise de Padrões Observados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-3">
              <div className="border-l-4 border-red-500 pl-4 py-2">
                <p className="font-semibold text-sm">Ciclo de Correção Reativa</p>
                <p className="text-sm text-muted-foreground text-justify">
                  Padrão recorrente: bug reportado → dias de espera → correção parcial → novo bug introduzido → novo ciclo. Observado em pedidos (50, 54, 55, 905), transferências (340, 341) e processamento de certificados.
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4 py-2">
                <p className="font-semibold text-sm">Desconhecimento de Regras de Negócio</p>
                <p className="text-sm text-muted-foreground text-justify">
                  O fornecedor admitiu, em múltiplas ocasiões, não conhecer as regras de negócio do sistema que desenvolveu. Frases como &quot;essa regra de negócio ainda não está clara pra gente&quot; e &quot;não conhecemos todas as particularidades&quot; aparecem repetidamente.
                </p>
              </div>
              <div className="border-l-4 border-amber-500 pl-4 py-2">
                <p className="font-semibold text-sm">Intervenções Manuais em Produção</p>
                <p className="text-sm text-muted-foreground text-justify">
                  Diversas correções foram aplicadas diretamente no banco de dados de produção (fazendas ausentes, ajuste de IDs, limpeza de tabelas de UCS bloqueadas), evidenciando fragilidade no processo de deploy e ausência de ambiente de staging.
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <p className="font-semibold text-sm">Testes em Produção com Impacto Real</p>
                <p className="text-sm text-muted-foreground text-justify">
                  O desenvolvedor realizou múltiplos testes diretamente no ambiente de produção (pedido 905), gerando 4 UCS aposentadas indevidamente e &quot;sujeira no banco de dados&quot;. Dados foram removidos manualmente após os testes.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="font-semibold text-sm">Migração Incompleta do Legado</p>
                <p className="text-sm text-muted-foreground text-justify">
                  Identificadas 53 fazendas não migradas do legado (de 256 existentes, apenas 203 foram copiadas), dados cruzando entre legado e produção, e city_id NULL em 159 registros de endereço, impactando relatórios e planilhas de movimentação.
                </p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4 py-2">
                <p className="font-semibold text-sm">Classificação Inadequada (Bug vs Melhoria)</p>
                <p className="text-sm text-muted-foreground text-justify">
                  <strong>Fato 1:</strong> A funcionalidade de &quot;Bloqueio de UCS&quot; foi entregue inoperante. Ao ser questionado, o fornecedor admitiu que o fluxo &quot;ainda não havia sido testado&quot; (22/01), tratando uma falha de entrega como uma tarefa complexa em desenvolvimento posterior.
                  <br />
                  <strong>Fato 2:</strong> A ausência de suporte a endereços internacionais em relatórios foi classificada como uma &quot;melhoria complexa&quot; (27/01), quando na verdade tratava-se de uma lacuna crítica de funcionalidade para uma plataforma global (SaaS Tesouro Verde).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 6. Auditoria de Inconformidade Contratual */}
        <Card className="border-primary shadow-lg overflow-hidden">
          <CardHeader className="bg-primary/5 border-b">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Gavel className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Análise de Inconformidade Contratual</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Enquadramento técnico-jurídico dos incidentes baseados nas Cláusulas 9.2 e 9.3
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-8">
            <ContractualAnalysisTable />
          </CardContent>
        </Card>

        {/* 6. Mídias Anexas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Mídias e Documentos Anexos</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Evidências fotográficas e documentos compartilhados no grupo
            </p>
          </CardHeader>
          <CardContent>
            <MediaGallery />
          </CardContent>
        </Card>

        {/* 7. Transcrição Completa */}
        <Card className="border-primary/30">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <CardTitle className="text-2xl">Transcrição Completa da Conversa</CardTitle>
              <Badge variant="outline" className="font-mono text-xs">
                {STATS.totalMessages} MENSAGENS
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Registro integral e cronológico de todas as mensagens trocadas no grupo de suporte.
              As mensagens são apresentadas em formato de chat, agrupadas por data, com mídias incorporadas.
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <WhatsAppTranscript />
          </CardContent>
        </Card>

        {/* 8. Conclusão Técnica */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Conclusão Técnica do Anexo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-justify">
              A análise cronológica integral das <strong>{STATS.totalMessages} mensagens</strong> trocadas no período de <strong>{STATS.totalDays} dias</strong> evidencia um padrão sistêmico de:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-justify">
              <li><strong>Instabilidade operacional recorrente</strong>, com bugs surgindo em cadeia após correções pontuais;</li>
              <li><strong>Tempo de resposta elevado</strong> para demandas críticas, com clientes aguardando até 5 dias para resolução;</li>
              <li><strong>Ausência de ambiente de testes</strong>, com testes sendo realizados diretamente em produção e gerando impactos reais;</li>
              <li><strong>Migração incompleta e defeituosa</strong> do sistema legado, com dados faltantes e inconsistências de integridade;</li>
              <li><strong>Classificação inadequada de bugs como melhorias</strong>, postergando correções mandatórias;</li>
              <li><strong>Desconhecimento das regras de negócio</strong> por parte do fornecedor que implementou o sistema.</li>
            </ul>

            <Alert variant="destructive">
              <AlertDescription className="space-y-2">
                <p className="font-semibold">CONSIDERAÇÃO FINAL</p>
                <p className="text-sm text-justify">
                  O registro integral das comunicações corrobora, com evidências documentais diretas, as conclusões apresentadas no corpo principal do dossiê. Os padrões aqui identificados demonstram que as não conformidades relatadas não são eventos isolados, mas reflexos de <strong>fragilidades estruturais sistêmicas</strong> no processo de desenvolvimento, manutenção e suporte da plataforma BMV pela Multiledgers.
                </p>
              </AlertDescription>
            </Alert>

            <div className="border-t pt-4 mt-6 text-sm text-muted-foreground">
              <p><strong>Anexo:</strong> VI – Registro de Comunicação WhatsApp</p>
              <p><strong>Fonte:</strong> Exportação do grupo &quot;BMV {'<>'} Multi - SUPORTE&quot;</p>
              <p><strong>Período:</strong> {STATS.period}</p>
              <p><strong>Total de Mensagens:</strong> {STATS.totalMessages}</p>
              <p><strong>Total de Mídias:</strong> {STATS.totalImages + STATS.totalAudios + STATS.totalPDFs} arquivos</p>
              <p><strong>Gestor Operacional:</strong> Luiz Paulo Gonçalves Miguel de Jesus</p>
              <p><strong>Versão:</strong> 1.0</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AnexoLayout>
  );
}
