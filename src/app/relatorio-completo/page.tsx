"use client";

import { useEffect, useState } from 'react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Printer, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { sections } from '../components/dossier/content';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { EvidenceImage } from '@/app/components/evidence-image';
import { STATS } from '../anexo-6/whatsapp-data';
import { MessageSquare, Users, Calendar, Activity, AlertTriangle, Gavel, FileText, ShieldAlert } from 'lucide-react';
import { ContractualAnalysisTable } from '../anexo-6/whatsapp-renderer';
import { WhatsAppTranscript } from '../anexo-6/whatsapp-transcript';

export default function FullReportPage() {
  const [includeTranscript, setIncludeTranscript] = useState(false);
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white text-black p-0 sm:p-8 md:p-12 print:p-0">
      {/* Top Toolbar - Hidden in Print */}
      <div className="fixed top-4 right-4 z-50 flex gap-2 no-print">
        <Link href="/">
          <Button variant="outline" size="sm" className="gap-2 bg-white/80 backdrop-blur shadow-sm">
            <ChevronLeft className="h-4 w-4" />
            Voltar
          </Button>
        </Link>
        <Button onClick={handlePrint} className="gap-2 shadow-lg">
          <Printer className="h-4 w-4" />
          Imprimir Relatório Completo
        </Button>
        <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg border shadow-sm flex items-center gap-2 text-xs font-medium no-print">
          <input 
            type="checkbox" 
            id="inc-trans" 
            checked={includeTranscript} 
            onChange={(e) => setIncludeTranscript(e.target.checked)}
            className="rounded border-gray-300"
          />
          <label htmlFor="inc-trans" className="cursor-pointer">Incluir Transcrição Completa (+50 páginas)</label>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-12 print:space-y-8">
        {/* Header - Cover Page */}
        <section className="text-center py-20 print:py-10 border-b-2 border-primary/20 mb-20 print:mb-10">
          <div className="flex justify-center mb-8">
            <Logo className="scale-150" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4 leading-tight">
            Dossiê Técnico: Avaliação do Sistema Backoffice BMV.Global
          </h1>
          <h2 className="text-xl sm:text-2xl text-muted-foreground mb-8">
            Relatório Formal de Não Conformidades, Riscos e Diretrizes de Evolução
          </h2>
          <div className="flex justify-center gap-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            <span>Técnico</span>
            <span>•</span>
            <span>Operacional</span>
            <span>•</span>
            <span>Jurídico</span>
            <span>•</span>
            <span>Estratégico</span>
          </div>
          <div className="mt-12 text-lg">
             <p>Gestor Operacional: <strong>Luiz Paulo Gonçalves Miguel de Jesus</strong></p>
             <p>Data de Emissão: 05 de Janeiro de 2026</p>
             <p className="text-sm text-muted-foreground mt-2 font-mono">ID: BMV-AUDIT-2026-001</p>
          </div>
        </section>

        {/* TOC - Table of Contents */}
        <section className="print-break-before py-10">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Sumário do Relatório</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 text-sm">
            <div className="space-y-1">
              <p className="font-semibold text-primary">CORPO PRINCIPAL</p>
              {sections.map((s, i) => (
                <div key={i} className="flex justify-between border-b border-dotted border-muted-foreground/30">
                  <span>{i + 1}. {s.title}</span>
                </div>
              ))}
            </div>
            <div className="space-y-1 mt-6 md:mt-0">
              <p className="font-semibold text-primary">ANEXOS TÉCNICOS</p>
              <div className="flex justify-between border-b border-dotted border-muted-foreground/30">
                <span>Anexo I – Evidências Técnicas e Operacionais (Provas)</span>
              </div>
              <div className="flex justify-between border-b border-dotted border-muted-foreground/30">
                <span>Anexo II – Linha do Tempo de Suporte</span>
              </div>
              <div className="flex justify-between border-b border-dotted border-muted-foreground/30">
                <span>Anexo III – Matriz de Risco</span>
              </div>
              <div className="flex justify-between border-b border-dotted border-muted-foreground/30">
                <span>Anexo IV – Matriz de Paridade Funcional (Legado vs Atual)</span>
              </div>
              <div className="flex justify-between border-b border-dotted border-muted-foreground/30">
                <span>Anexo V – Fluxos de Processo (AS-IS vs TO-BE)</span>
              </div>
              <div className="flex justify-between border-b border-dotted border-muted-foreground/30">
                <span>Anexo VI – Registro de Comunicação WhatsApp (Suporte)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Sections */}
        <div className="space-y-12 print:space-y-8">
          {sections.slice(1).map((section, index) => (
            <section key={index} className="print-break-before py-4">
              <h2 className="text-2xl font-bold mb-6 text-primary border-b-2 border-primary/10 pb-2">
                {index + 2}. {section.title}
              </h2>
              <div className="prose prose-lg max-w-none text-justify">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        {/* Annex I */}
        <section className="print-break-before py-8 border-t-4 border-primary pt-12">
          <h1 className="text-3xl font-bold mb-8 text-primary uppercase border-b-4 border-primary pb-4">
            Anexo I – Evidências Técnicas e Operacionais
          </h1>
          
          <div className="space-y-8">
            <Card>
              <CardHeader><CardTitle>Apresentação das Evidências (Provas)</CardTitle></CardHeader>
              <CardContent>
                <p className="text-justify">
                  Este anexo consolida as provas técnicas e visuais (prints de tela e logs) que fundamentam as não conformidades citadas no corpo deste dossiê. A análise compara o comportamento esperado (conforme legado ou requisitos) com o comportamento observado no sistema atual.
                </p>
              </CardContent>
            </Card>

            <h3 className="text-xl font-bold mt-10 mb-4 border-l-4 border-primary pl-4">Registro Detalhado de Evidências (EV)</h3>
            
            {/* EV-01 */}
            <Card className="mb-6">
              <CardHeader className="bg-muted/30">
                <CardTitle className="text-lg flex items-center gap-3">
                  <Badge variant="destructive">EV-01</Badge>
                  <span>Busca por Pedido Retornando Resultado Incorreto</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <p className="text-justify"><strong>Descrição:</strong> Falha crítica na filtragem de pedidos. Ao realizar uma busca, o sistema ignora os parâmetros e retorna resultados aleatórios ou incompletos.</p>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <EvidenceImage imageId="ev-01-atual" caption="Sistema Atual: Resultado incoerente com a busca." />
                    <EvidenceImage imageId="ev-01-legado" caption="Referência Legado: Filtragem precisa e instantânea." />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* EV-03 */}
            <Card className="mb-6">
              <CardHeader className="bg-muted/30">
                <CardTitle className="text-lg flex items-center gap-3">
                  <Badge variant="destructive">EV-03</Badge>
                  <span>Ausência de Identificação Visual e Rastreabilidade</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <p className="text-justify"><strong>Impacto:</strong> Perda de produtividade e alto risco de erro humano em operações de backoffice devido à ausência de ícones, tags e indicadores de status claros.</p>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <EvidenceImage imageId="ev-03-legado1" caption="Legado: Interface rica em metadados visuais." />
                    <EvidenceImage imageId="ev-03-atual1" caption="Atual: Interface simplificada com perda de dados." />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* EV-08 */}
            <Card className="mb-6">
              <CardHeader className="bg-muted/30">
                <CardTitle className="text-lg flex items-center gap-3">
                  <Badge variant="destructive">EV-08</Badge>
                  <span>Divergência em Cálculos Financeiros (DARE/Royalties)</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <p className="text-justify"><strong>Risco Financeiro:</strong> Inconsistência matemática nos cálculos de distribuição (1/3). O sistema apresenta arredondamentos incorretos ou falha no processamento de saldos.</p>
                <Alert variant="destructive">
                  <AlertDescription>
                    Esta evidência é classificada como <strong>SEVERIDADE MÁXIMA</strong> por impactar diretamente o compliance fiscal e a liquidação financeira da operação.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <div className="bg-muted p-6 rounded-xl border-2 border-dashed border-muted-foreground/30 text-center">
              <p className="text-sm font-medium">Nota: O catálogo completo contém 09 evidências (EV-01 a EV-09) detalhadas no sistema interativo.</p>
            </div>
          </div>
        </section>

        {/* Annex II */}
        <section className="print-break-before py-8 border-t-4 border-primary pt-12">
          <h1 className="text-3xl font-bold mb-8 text-primary uppercase border-b-4 border-primary pb-4">
            Anexo II – Linha do Tempo de Suporte
          </h1>
          <div className="space-y-6">
            <p className="text-justify">Cronograma de interações técnicas e marcos operacionais durante o período de 60 dias (Nov/Dez 2025).</p>
            <div className="relative border-l-2 border-primary/30 ml-4 pl-8 space-y-12 py-4">
              <div className="relative">
                <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-primary" />
                <h4 className="font-bold text-lg">Fase 1: Diagnóstico (Início de Novembro)</h4>
                <p className="text-sm text-muted-foreground mb-2">Acompanhamento inicial e detecção de bugs de interface.</p>
                <Alert><AlertDescription>Foco em validação de ambiente e fluxos básicos.</AlertDescription></Alert>
              </div>
              <div className="relative">
                <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-orange-500" />
                <h4 className="font-bold text-lg">Fase 2: Escalonamento (Final de Novembro)</h4>
                <p className="text-sm text-muted-foreground mb-2">Identificação de erros em cálculos financeiros e integração Blockchain.</p>
                <Alert className="border-orange-200 bg-orange-50"><AlertDescription>Necessidade de intervenção direta do gestor operacional.</AlertDescription></Alert>
              </div>
              <div className="relative">
                <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-destructive" />
                <h4 className="font-bold text-lg">Fase 3: Crise e Relatório (Dezembro/Janeiro)</h4>
                <p className="text-sm text-muted-foreground mb-2">Consolidação de evidências de não conformidade estrutural.</p>
                <Alert variant="destructive"><AlertDescription>Decisão por elaboração deste dossiê de auditoria.</AlertDescription></Alert>
              </div>
            </div>
          </div>
        </section>

        {/* Annex III */}
        <section className="print-break-before py-8 border-t-4 border-primary pt-12">
          <h1 className="text-3xl font-bold mb-8 text-primary uppercase border-b-4 border-primary pb-4">
            Anexo III – Matriz de Risco
          </h1>
          <div className="space-y-6">
            <p className="text-justify">Avaliação consolidada dos riscos associados à continuidade do sistema atual.</p>
            <Table className="border w-full">
              <TableHeader>
                <TableRow className="bg-primary hover:bg-primary">
                  <TableHead className="text-white">Categoria</TableHead>
                  <TableHead className="text-white">Risco Identificado</TableHead>
                  <TableHead className="text-white">Probabilidade</TableHead>
                  <TableHead className="text-white">Impacto</TableHead>
                  <TableHead className="text-white text-center">Nível</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="bg-red-50">
                  <TableCell className="font-bold">Técnico</TableCell>
                  <TableCell>Inconsistência de Dados On-chain/Off-chain</TableCell>
                  <TableCell>Alta</TableCell>
                  <TableCell>Crítico</TableCell>
                  <TableCell className="text-center"><Badge variant="destructive" className="font-bold">CRÍTICO</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">Financeiro</TableCell>
                  <TableCell>Falha na Liquidação de Royalties/DARE</TableCell>
                  <TableCell>Média</TableCell>
                  <TableCell>Crítico</TableCell>
                  <TableCell className="text-center"><Badge variant="destructive" className="font-bold">CRÍTICO</Badge></TableCell>
                </TableRow>
                <TableRow className="bg-orange-50">
                  <TableCell className="font-bold">Operacional</TableCell>
                  <TableCell>Inviabilidade de Escala (Processos Manuais)</TableCell>
                  <TableCell>Alta</TableCell>
                  <TableCell>Alto</TableCell>
                  <TableCell className="text-center"><Badge className="bg-orange-600 font-bold">ALTO</Badge></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-bold">Jurídico</TableCell>
                  <TableCell>Inconformidade com Acordos de Homologação</TableCell>
                  <TableCell>Média</TableCell>
                  <TableCell>Alto</TableCell>
                  <TableCell className="text-center"><Badge className="bg-orange-600 font-bold">ALTO</Badge></TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Alert variant="destructive">
              <AlertDescription className="font-bold">
                A permanência no modelo tecnológico atual representa assunção consciente de riscos que podem inviabilizar a operação em cenários de alta demanda.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Annex IV */}
        <section className="print-break-before py-8 border-t-4 border-primary pt-12">
          <h1 className="text-3xl font-bold mb-8 text-primary uppercase border-b-4 border-primary pb-4">
            Anexo IV – Matriz de Paridade Funcional
          </h1>
          <div className="space-y-8">
            <p className="text-justify">Comparativo entre as funcionalidades do Sistema Legado (homologado) e o Sistema Atual, evidenciando regressões e lacunas.</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-red-200">
                <CardHeader className="bg-red-50"><CardTitle className="text-lg">Regressões Identificadas</CardTitle></CardHeader>
                <CardContent className="pt-4 space-y-2 text-sm">
                  <p className="flex gap-2"><span>❌</span> <strong>Dashboards:</strong> Ausência total de visão gerencial inicial.</p>
                  <p className="flex gap-2"><span>❌</span> <strong>Filtros:</strong> Perda de capacidade de busca avançada.</p>
                  <p className="flex gap-2"><span>❌</span> <strong>Performance:</strong> Lentidão em consultas simples de acervo.</p>
                </CardContent>
              </Card>
              <Card className="border-blue-200">
                <CardHeader className="bg-blue-50"><CardTitle className="text-lg">Lacunas de Automação</CardTitle></CardHeader>
                <CardContent className="pt-4 space-y-2 text-sm">
                  <p className="flex gap-2"><span>⚠</span> <strong>Blockchain:</strong> Fluxos que deveriam ser automáticos são manuais.</p>
                  <p className="flex gap-2"><span>⚠</span> <strong>Documentação:</strong> Ausência de APIs públicas documentadas.</p>
                  <p className="flex gap-2"><span>⚠</span> <strong>Fluxos CDE:</strong> Processo forçado para fora da plataforma.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Annex V */}
        <section className="print-break-before py-8 border-t-4 border-primary pt-12">
          <h1 className="text-3xl font-bold mb-8 text-primary uppercase border-b-4 border-primary pb-4">
            Anexo V – Fluxos de Processo (AS-IS vs TO-BE)
          </h1>
          <div className="space-y-8">
            <p className="text-justify">Mapeamento visual dos gargalos atuais versus o modelo ideal projetado para escala e governança digital.</p>
            <div className="space-y-12">
              <div>
                <h3 className="font-bold text-xl mb-4 border-l-4 border-primary pl-4">Fluxo de Jornada da UCS</h3>
                <div className="bg-muted p-4 rounded-xl">
                  <EvidenceImage imageId="jornada-ucs-as-is" caption="Mapeamento comparativo: Atualmente centralizado no backoffice vs. Ideal automatizado on-chain." />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-4 border-l-4 border-primary pl-4">Fluxo de Solicitação de CDE</h3>
                <div className="bg-muted p-4 rounded-xl">
                  <EvidenceImage imageId="solicitacao-cde-as-is" caption="Gargalo Operacional: O fluxo atual exige múltiplos sistemas externos, gerando demora e erro." />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Annex VI */}
        <section className="print-break-before py-8 border-t-4 border-primary pt-12">
          <h1 className="text-3xl font-bold mb-8 text-primary uppercase border-b-4 border-primary pb-4">
            Anexo VI – Registro de Comunicação WhatsApp
          </h1>
          <div className="space-y-8">
            <p className="text-justify">
              Este anexo apresenta a análise consolidada da comunicação mantida via WhatsApp no grupo de suporte técnico. 
              Este registro é fundamental para comprovar o histórico de falhas, tempos de resposta e o padrão de suporte reativo adotado pelo fornecedor.
            </p>

            <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 my-4">
              <AlertDescription className="space-y-2">
                <p className="font-semibold text-blue-800 dark:text-blue-300 flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4 text-blue-600" /> Declaração de Natureza Estritamente Profissional e Comercial
                </p>
                <p className="text-sm text-justify text-blue-900 dark:text-blue-400">
                  Este registro de comunicações é composto <strong>exclusivamente por interações mantidas em grupos de suporte técnico e operacional de caráter comercial</strong> entre as equipes da <strong>BMV</strong> e da <strong>Multiledgers</strong>. Esclarece-se que:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-xs text-blue-800 dark:text-blue-400 text-justify">
                  <li><strong>Ausência de Conteúdo Privativo:</strong> O canal foi criado unicamente para atendimento profissional, não contendo quaisquer dados de cunho pessoal, familiar, íntimo ou privado dos participantes.</li>
                  <li><strong>Finalidade Forense e Probatória:</strong> A juntada e a transcrição integral destas conversas são fundamentais para demonstrar em juízo o histórico real de falhas operacionais, admissões de erro e o padrão de SLA do fornecedor.</li>
                  <li><strong>Transparência Processual:</strong> O compartilhamento deste conteúdo atende aos requisitos de transparência e cooperação processual, servindo como meio lícito de prova sob a égide do interesse legítimo corporativo e do direito de defesa.</li>
                </ul>
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-primary">{STATS.totalMessages}</p>
                <p className="text-xs uppercase tracking-wider font-semibold">Mensagens</p>
              </div>
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-primary">{STATS.activeDays}</p>
                <p className="text-xs uppercase tracking-wider font-semibold">Dias Ativos</p>
              </div>
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-primary">{STATS.totalImages}</p>
                <p className="text-xs uppercase tracking-wider font-semibold">Imagens/Provas</p>
              </div>
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-2xl font-bold text-primary">{STATS.totalCalls}</p>
                <p className="text-xs uppercase tracking-wider font-semibold">Chamadas</p>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4 border-l-4 border-primary pl-4">Incidentes Críticos Mapeados</h3>
            <Table className="border w-full text-xs">
              <TableHeader>
                <TableRow className="bg-muted hover:bg-muted">
                  <TableHead className="w-24">Data</TableHead>
                  <TableHead>Descrição do Incidente</TableHead>
                  <TableHead className="w-24 text-center">Severidade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {STATS.keyIncidents.map((inc, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-mono">{inc.date}</TableCell>
                    <TableCell>{inc.title}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={inc.severity === 'critical' ? 'destructive' : 'outline'} className="text-[9px]">
                        {inc.severity.toUpperCase()}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-12 mb-8">
              <h3 className="text-xl font-bold mb-6 border-l-4 border-primary pl-4">Análise de Inconformidade Contratual</h3>
              <div className="print:scale-[0.95] origin-top">
                <ContractualAnalysisTable />
              </div>
            </div>

            <h3 className="text-xl font-bold mt-10 mb-4 border-l-4 border-primary pl-4">Análise de Padrões de Falha</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <p className="font-bold text-red-600 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" /> Ciclo de Correção Reativa
                    </p>
                    <p className="text-sm text-justify">
                      Observa-se um padrão onde correções de bugs geram novos efeitos colaterais, criando um ciclo de instabilidade contínua. 
                      Demandas críticas (como pedidos travados) levaram até 5 dias para resolução paliativa.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-amber-600 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" /> Testes Diretos em Produção
                    </p>
                    <p className="text-sm text-justify">
                      Evidências claras de que o fornecedor realiza testes e manipulações de banco de dados diretamente no ambiente de produção, 
                      causando "sujeira" nos dados e aposentadoria indevida de ativos (UCS).
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <p className="font-bold text-blue-600 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" /> Lacunas de Regra de Negócio e Classificação
                    </p>
                    <p className="text-sm text-justify">
                      Múltiplos registros onde a equipe técnica demonstra desconhecimento das regras de negócio. 
                      <strong> Exemplo real:</strong> A ausência de suporte a clientes internacionais em relatórios foi tratada como uma &quot;melhoria complexa&quot; (27/01) e o módulo de &quot;Bloqueio de UCS&quot; foi entregue sem sequer ter sido testado (22/01), evidenciando a tentativa de classificar falhas de entrega como demandas novas.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Alert variant="destructive" className="mt-8">
              <AlertDescription className="text-sm">
                <strong>CONCLUSÃO DO ANEXO:</strong> O histórico de suporte via WhatsApp serve como prova documental de que o sistema atual não possui maturidade técnica para operação em escala, 
                apresentando riscos de segurança e integridade de dados que extrapolam o aceitável para um sistema financeiro/tokenizador.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Full Transcript (Optional) */}
        {includeTranscript && (
          <section className="print-break-before py-8 border-t-4 border-primary pt-12">
            <h1 className="text-3xl font-bold mb-8 text-primary uppercase border-b-4 border-primary pb-4">
              Transcrição Integral das Mensagens
            </h1>
            <div className="transcript-container">
              <WhatsAppTranscript printMode={true} />
            </div>
          </section>
        )}

        {/* Signatures */}
        <section className="print-break-before py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="text-center">
              <div className="border-t-2 border-black pt-4">
                <p className="font-bold">Luiz Paulo Gonçalves Miguel de Jesus</p>
                <p className="text-sm">Gestor Operacional / Auditor</p>
              </div>
            </div>
            <div className="text-center">
              <div className="border-t-2 border-black pt-4">
                <p className="font-bold">BMV.Global - Governança</p>
                <p className="text-sm">Revisão e Recebimento</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t text-center text-xs text-muted-foreground print:text-[8pt]">
          <p>ESTE DOCUMENTO É CONFIDENCIAL E DESTINADO EXCLUSIVAMENTE PARA FINS DE AUDITORIA INTERNA E TOMADA DE DECISÃO ESTRATÉGICA.</p>
          <p>© 2026 BMV.Global - Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
}
