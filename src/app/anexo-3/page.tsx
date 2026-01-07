"use client";

import { AnexoLayout } from "@/app/components/anexo-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export default function Anexo3() {
  return (
    <AnexoLayout title="Anexo III – Matriz de Risco" number={3}>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Introdução */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Avaliação de Riscos Identificados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-justify">
              Esta matriz consolida os <strong>riscos técnicos, operacionais, financeiros, jurídicos e reputacionais</strong> associados ao estado atual do sistema, identificados ao longo do período de análise e validação operacional.
            </p>
            
            <Alert>
              <AlertDescription className="text-justify">
                A avaliação foi realizada considerando tanto a <strong>probabilidade de ocorrência</strong> quanto o <strong>impacto potencial</strong> de cada categoria de risco, resultando em uma classificação de severidade que orienta a priorização de ações corretivas e decisões estratégicas.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Matriz de Riscos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Matriz de Riscos Críticos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table className="border">
                <TableHeader>
                  <TableRow>
                    <TableHead className="bg-primary text-primary-foreground">Categoria</TableHead>
                    <TableHead className="bg-primary text-primary-foreground">Risco</TableHead>
                    <TableHead className="bg-primary text-primary-foreground">Probabilidade</TableHead>
                    <TableHead className="bg-primary text-primary-foreground">Impacto</TableHead>
                    <TableHead className="bg-primary text-primary-foreground">Nível</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="bg-red-50 dark:bg-red-950/20">
                    <TableCell className="font-semibold">Técnico</TableCell>
                    <TableCell>Falha em processamento blockchain em escala</TableCell>
                    <TableCell><Badge variant="destructive">Alta</Badge></TableCell>
                    <TableCell><Badge variant="destructive">Crítico</Badge></TableCell>
                    <TableCell><Badge variant="destructive" className="font-bold">CRÍTICO</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Operacional</TableCell>
                    <TableCell>Dependência de processos manuais</TableCell>
                    <TableCell><Badge variant="destructive">Alta</Badge></TableCell>
                    <TableCell><Badge className="bg-orange-500">Alto</Badge></TableCell>
                    <TableCell><Badge className="bg-orange-600 font-bold">ALTO</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Financeiro</TableCell>
                    <TableCell>Limite de crescimento e escalabilidade</TableCell>
                    <TableCell><Badge className="bg-amber-500">Média</Badge></TableCell>
                    <TableCell><Badge className="bg-orange-500">Alto</Badge></TableCell>
                    <TableCell><Badge className="bg-orange-600 font-bold">ALTO</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Reputacional</TableCell>
                    <TableCell>Insatisfação de clientes com atrasos</TableCell>
                    <TableCell><Badge variant="destructive">Alta</Badge></TableCell>
                    <TableCell><Badge className="bg-orange-500">Alto</Badge></TableCell>
                    <TableCell><Badge className="bg-orange-600 font-bold">ALTO</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Jurídico</TableCell>
                    <TableCell>Questões contratuais e regulatórias</TableCell>
                    <TableCell><Badge className="bg-amber-500">Média</Badge></TableCell>
                    <TableCell><Badge className="bg-orange-500">Alto</Badge></TableCell>
                    <TableCell><Badge className="bg-orange-600 font-bold">ALTO</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Análise Detalhada por Categoria */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Análise Detalhada por Categoria</h2>

          {/* Risco Técnico */}
          <Card className="mb-6 border-red-200 dark:border-red-800">
            <CardHeader className="bg-red-50 dark:bg-red-950/20">
              <div className="flex items-center gap-3">
                <Badge variant="destructive" className="font-bold">CRÍTICO</Badge>
                <CardTitle className="text-xl">Risco Técnico</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <h4 className="font-semibold mb-2">Descrição do Risco</h4>
                <p className="text-justify">
                  Falha em processamento blockchain em escala, evidenciada por inconsistências em cálculos financeiros (DARE, Royalties), problemas de rastreabilidade e limitações arquiteturais que impedem crescimento sustentável.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Evidências Observadas</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Divergências matemáticas em valores de DARE e Royalties (EV-08)</li>
                  <li>Busca por pedidos retornando resultados incorretos (EV-01)</li>
                  <li>Ausência de identificação visual em movimentações financeiras (EV-03)</li>
                  <li>Filtros inoperantes em módulos críticos (EV-07)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Impacto Potencial</h4>
                <div className="grid gap-2">
                  <div className="flex items-start gap-2">
                    <span className="text-red-600 dark:text-red-400 font-bold">•</span>
                    <span className="text-sm">Inviabilização de auditorias financeiras e fiscais</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-600 dark:text-red-400 font-bold">•</span>
                    <span className="text-sm">Perda de confiabilidade total do sistema</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-600 dark:text-red-400 font-bold">•</span>
                    <span className="text-sm">Bloqueio de operações críticas em produção</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-600 dark:text-red-400 font-bold">•</span>
                    <span className="text-sm">Impossibilidade de escalonamento seguro</span>
                  </div>
                </div>
              </div>

              <Alert variant="destructive">
                <AlertDescription>
                  <strong>Recomendação:</strong> Bloqueio de homologação até correção integral das falhas estruturais. Revisão arquitetural completa do sistema.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Risco Operacional */}
          <Card className="mb-6 border-orange-200 dark:border-orange-800">
            <CardHeader className="bg-orange-50 dark:bg-orange-950/20">
              <div className="flex items-center gap-3">
                <Badge className="bg-orange-600 font-bold">ALTO</Badge>
                <CardTitle className="text-xl">Risco Operacional</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <h4 className="font-semibold mb-2">Descrição do Risco</h4>
                <p className="text-justify">
                  Dependência crítica de processos manuais, controles humanos e intervenções corretivas recorrentes para manutenção da operação básica do sistema.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Evidências Observadas</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Controles manuais para identificação de origem de UCSs</li>
                  <li>Correções frequentes de nomenclaturas e metadados</li>
                  <li>Documentos reenviados mantendo status "Recusado" (EV-04)</li>
                  <li>Volume elevado de tarefas corretivas registradas</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Impacto Potencial</h4>
                <div className="grid gap-2">
                  <div className="flex items-start gap-2">
                    <span className="text-orange-600 dark:text-orange-400 font-bold">•</span>
                    <span className="text-sm">Elevação exponencial de custos operacionais</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-orange-600 dark:text-orange-400 font-bold">•</span>
                    <span className="text-sm">Inviabilidade de crescimento sem aumento proporcional de equipe</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-orange-600 dark:text-orange-400 font-bold">•</span>
                    <span className="text-sm">Alto risco de erro humano em processos críticos</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-orange-600 dark:text-orange-400 font-bold">•</span>
                    <span className="text-sm">Perda de previsibilidade e SLA</span>
                  </div>
                </div>
              </div>

              <Alert>
                <AlertDescription>
                  <strong>Recomendação:</strong> Automação completa de fluxos críticos e eliminação de dependências de intervenção manual.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Risco Financeiro */}
          <Card className="mb-6 border-orange-200 dark:border-orange-800">
            <CardHeader className="bg-orange-50 dark:bg-orange-950/20">
              <div className="flex items-center gap-3">
                <Badge className="bg-orange-600 font-bold">ALTO</Badge>
                <CardTitle className="text-xl">Risco Financeiro</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <h4 className="font-semibold mb-2">Descrição do Risco</h4>
                <p className="text-justify">
                  Limitações estruturais de crescimento e escalabilidade que impedem expansão sustentável do modelo de negócio sem investimentos desproporcionais em suporte e correções.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Evidências Observadas</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Incapacidade de processar volumes crescentes sem degradação</li>
                  <li>Necessidade de retrabalho e reprocessamentos constantes</li>
                  <li>Custos indiretos elevados com suporte e correções</li>
                  <li>Limitação de onboarding de novos clientes</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Impacto Potencial</h4>
                <div className="grid gap-2">
                  <div className="flex items-start gap-2">
                    <span className="text-orange-600 dark:text-orange-400 font-bold">•</span>
                    <span className="text-sm">Inviabilidade econômica do modelo atual</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-orange-600 dark:text-orange-400 font-bold">•</span>
                    <span className="text-sm">Perda de competitividade no mercado</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-orange-600 dark:text-orange-400 font-bold">•</span>
                    <span className="text-sm">Impossibilidade de atingir ROI projetado</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-orange-600 dark:text-orange-400 font-bold">•</span>
                    <span className="text-sm">Comprometimento de investimentos realizados</span>
                  </div>
                </div>
              </div>

              <Alert>
                <AlertDescription>
                  <strong>Recomendação:</strong> Análise de viabilidade econômica para decisão entre reengenharia total ou substituição da solução.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Risco Reputacional */}
          <Card className="mb-6 border-orange-200 dark:border-orange-800">
            <CardHeader className="bg-orange-50 dark:bg-orange-950/20">
              <div className="flex items-center gap-3">
                <Badge className="bg-orange-600 font-bold">ALTO</Badge>
                <CardTitle className="text-xl">Risco Reputacional</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <h4 className="font-semibold mb-2">Descrição do Risco</h4>
                <p className="text-justify">
                  Insatisfação crescente de clientes finais com atrasos, reprocessamentos e instabilidade operacional, comprometendo a imagem e confiabilidade da solução no mercado.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Evidências Observadas</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Atrasos recorrentes em operações críticas</li>
                  <li>Necessidade frequente de reprocessamentos manuais</li>
                  <li>Comunicação defensiva e justificativas técnicas constantes</li>
                  <li>Percepção de instabilidade e falta de maturidade</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Impacto Potencial</h4>
                <div className="grid gap-2">
                  <div className="flex items-start gap-2">
                    <span className="text-orange-600 dark:text-orange-400 font-bold">•</span>
                    <span className="text-sm">Perda de credibilidade junto a clientes atuais</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-orange-600 dark:text-orange-400 font-bold">•</span>
                    <span className="text-sm">Dificuldade de captação de novos clientes</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-orange-600 dark:text-orange-400 font-bold">•</span>
                    <span className="text-sm">Risco de cancelamento de contratos</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-orange-600 dark:text-orange-400 font-bold">•</span>
                    <span className="text-sm">Danos à marca e posicionamento de mercado</span>
                  </div>
                </div>
              </div>

              <Alert>
                <AlertDescription>
                  <strong>Recomendação:</strong> Comunicação transparente com stakeholders e plano de ação corretivo imediato.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Risco Jurídico */}
          <Card className="mb-6 border-orange-200 dark:border-orange-800">
            <CardHeader className="bg-orange-50 dark:bg-orange-950/20">
              <div className="flex items-center gap-3">
                <Badge className="bg-orange-600 font-bold">ALTO</Badge>
                <CardTitle className="text-xl">Risco Jurídico</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <h4 className="font-semibold mb-2">Descrição do Risco</h4>
                <p className="text-justify">
                  Questões contratuais, regulatórias e de compliance relacionadas à entrega de solução com limitações críticas não previstas em escopo inicial e SLAs não cumpridos.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Evidências Observadas</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Divergências entre funcionalidades prometidas e entregues</li>
                  <li>Inconsistências em módulos financeiros críticos</li>
                  <li>Ausência de paridade com sistema legado homologado</li>
                  <li>Descumprimento de prazos e expectativas contratuais</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Impacto Potencial</h4>
                <div className="grid gap-2">
                  <div className="flex items-start gap-2">
                    <span className="text-orange-600 dark:text-orange-400 font-bold">•</span>
                    <span className="text-sm">Disputas contratuais com fornecedor</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-orange-600 dark:text-orange-400 font-bold">•</span>
                    <span className="text-sm">Não conformidade regulatória (DARE, Royalties)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-orange-600 dark:text-orange-400 font-bold">•</span>
                    <span className="text-sm">Riscos fiscais por inconsistências financeiras</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-orange-600 dark:text-orange-400 font-bold">•</span>
                    <span className="text-sm">Responsabilização por danos a terceiros</span>
                  </div>
                </div>
              </div>

              <Alert>
                <AlertDescription>
                  <strong>Recomendação:</strong> Revisão jurídica de contratos, notificação formal de não conformidades e documentação de evidências.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* Escala de Avaliação */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Escala de Avaliação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-l-4 border-red-500 bg-red-50 dark:bg-red-950/20 p-4 rounded">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="destructive" className="font-bold">CRÍTICO</Badge>
                </div>
                <p className="text-sm font-semibold text-red-700 dark:text-red-300">
                  Requer ação imediata e decisão estratégica
                </p>
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                  Falhas que inviabilizam operação segura e confiável
                </p>
              </div>

              <div className="border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950/20 p-4 rounded">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-orange-600 font-bold">ALTO</Badge>
                </div>
                <p className="text-sm font-semibold text-orange-700 dark:text-orange-300">
                  Demanda planejamento e implementação urgente
                </p>
                <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                  Limitações que comprometem escalabilidade e sustentabilidade
                </p>
              </div>
            </div>

            <Alert variant="destructive" className="mt-6">
              <AlertDescription className="text-justify">
                A <strong>acumulação e interdependência destes riscos</strong> representa uma ameaça existencial ao modelo de negócio, requerendo <strong>decisão executiva imediata</strong> sobre direcionamento estratégico: correção integral, reengenharia completa ou substituição da solução tecnológica.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Conclusão */}
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader className="bg-red-50 dark:bg-red-950/20">
            <CardTitle className="text-2xl">Conclusão da Análise de Risco</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <p className="text-justify">
              A matriz de risco consolidada evidencia um <strong>cenário de alta criticidade</strong>, onde a combinação de falhas técnicas estruturais, dependência operacional insustentável, limitações financeiras, exposição reputacional e riscos jurídico-regulatórios configura um <strong>quadro de inviabilidade operacional</strong> que transcende correções pontuais.
            </p>

            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-semibold mb-2">Considerações Estratégicas:</p>
              <ul className="list-disc pl-6 space-y-2 text-sm">
                <li>A permanência no modelo atual representa assunção consciente de riscos críticos</li>
                <li>Correções pontuais não endereçam limitações arquiteturais fundamentais</li>
                <li>O tempo e investimento necessários para reengenharia total podem ser inviáveis</li>
                <li>A decisão deve considerar custos de oportunidade e alternativas de mercado</li>
              </ul>
            </div>

            <Alert variant="destructive">
              <AlertDescription>
                <strong>Recomendação Executiva:</strong> Este dossiê deve ser apresentado a comitê executivo para decisão sobre descontinuidade do projeto atual e avaliação de soluções alternativas que atendam aos requisitos técnicos, operacionais e regulatórios de forma adequada.
              </AlertDescription>
            </Alert>

            <div className="border-t pt-4 mt-6 text-sm text-muted-foreground">
              <p><strong>Data:</strong> Janeiro/2026</p>
              <p><strong>Versão:</strong> 1.0</p>
              <p><strong>Documento:</strong> ANEXO III – Matriz de Risco</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AnexoLayout>
  );
}
