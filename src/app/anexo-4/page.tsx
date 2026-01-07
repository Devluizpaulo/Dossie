"use client";

import { AnexoLayout } from "@/app/components/anexo-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export default function Anexo4() {
  return (
    <AnexoLayout title="Anexo IV – Matriz de Paridade Funcional" number={4}>
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* 1. Objetivo do Anexo */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Objetivo do Anexo</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Sistema Legado x Sistema Atual
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-justify">
              Este Anexo tem como finalidade registrar, de forma <strong>comparativa, estruturada e detalhada</strong>, as funcionalidades existentes no <strong>Sistema Legado</strong> que, no <strong>Sistema Atual</strong>:
            </p>
            
            <ul className="list-disc pl-6 space-y-2">
              <li>não estão presentes;</li>
              <li>estão parcialmente implementadas; ou</li>
              <li>apresentam regressão funcional.</li>
            </ul>

            <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
              <AlertDescription>
                <p className="font-semibold mb-2">Foco da Análise</p>
                <p className="text-sm text-justify">
                  O foco da análise é evidenciar, de maneira objetiva:
                </p>
                <ul className="list-disc pl-6 space-y-1 mt-2 text-sm">
                  <li>Perdas de capacidade operacional;</li>
                  <li>Riscos associados à operação e à governança;</li>
                  <li>Impactos diretos e indiretos no negócio.</li>
                </ul>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* 2. Nota Metodológica */}
        <Card className="border-purple-200 dark:border-purple-800">
          <CardHeader className="bg-purple-50 dark:bg-purple-950/20">
            <CardTitle className="text-2xl">Nota Metodológica</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Fonte de Referência Técnica do Sistema Legado
            </p>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <p className="text-justify">
              Para a elaboração deste Anexo e para a avaliação da paridade funcional entre o <strong>Sistema Legado</strong> e o <strong>Sistema Atual</strong>, foi utilizada, como fonte complementar de referência técnica, uma <strong>apresentação em vídeo</strong> previamente disponibilizada, na qual é detalhado o funcionamento conceitual, operacional e sistêmico da plataforma legada.
            </p>

            <div>
              <h4 className="font-semibold mb-2">O material audiovisual apresenta, de forma estruturada:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Lógica de negócio;</li>
                <li>Fluxos operacionais;</li>
                <li>Módulos funcionais;</li>
                <li>Decisões de arquitetura do sistema legado.</li>
              </ul>
            </div>

            <Alert>
              <AlertDescription>
                <p className="text-sm text-justify">
                  A apresentação possui <strong>marcações temporais (timeline)</strong>, permitindo a análise individualizada de cada módulo e a compreensão de:
                </p>
                <ul className="list-disc pl-6 space-y-1 mt-2 text-sm">
                  <li>Encadeamento lógico entre módulos;</li>
                  <li>Responsabilidades funcionais;</li>
                  <li>Fluxos transacionais e administrativos;</li>
                  <li>Mecanismos de governança, controle e rastreabilidade.</li>
                </ul>
              </AlertDescription>
            </Alert>

            <div className="bg-purple-50 dark:bg-purple-950/10 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
              <p className="font-semibold mb-2">A partir dessa referência, foi possível:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Compreender a modelagem funcional do sistema legado;</li>
                <li>Identificar expectativas implícitas de funcionamento e controle;</li>
                <li>Avaliar ausências de paridade, regressões e lacunas no sistema atual;</li>
                <li>Fundamentar tecnicamente as comparações apresentadas nesta matriz.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* 3. Vídeo de Referência Técnica */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Vídeo de Referência Técnica – Sistema Legado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="bg-slate-50 dark:bg-slate-950/20 border-slate-300 dark:border-slate-700">
              <AlertDescription className="space-y-2">
                <p className="font-semibold">Fonte de Referência:</p>
                <p className="text-sm">Apresentação técnica gravada</p>
                <div className="mt-3">
                  <a 
                    href="https://www.youtube.com/watch?v=WAYd1Myw81k&t=63s" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    🎥 Acessar Vídeo de Referência (YouTube)
                  </a>
                </div>
              </AlertDescription>
            </Alert>

            <p className="text-sm text-muted-foreground italic text-justify">
              O vídeo contém timeline completa com marcações temporais para cada módulo funcional do sistema legado, permitindo análise detalhada e comparativa.
            </p>
          </CardContent>
        </Card>

        {/* 4. Módulos Avaliados – Exemplos */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Módulos Avaliados – Exemplos de Paridade Funcional</h2>

          {/* Exemplo 1: Estoque - Dashboard Inicial */}
          <Card className="mb-6 border-red-200 dark:border-red-800">
            <CardHeader className="bg-red-50 dark:bg-red-950/20">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Módulo: Estoque (Dashboard Inicial)</CardTitle>
                <Badge variant="destructive">REGRESSÃO FUNCIONAL</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border-l-4 border-green-500 pl-4 bg-green-50 dark:bg-green-950/10 p-4 rounded">
                  <p className="font-semibold text-green-700 dark:text-green-300 mb-2">
                    ✓ Sistema Legado
                  </p>
                  <p className="text-sm text-justify">
                    Dashboard gerencial completo, com filtros por período, gráficos analíticos e histórico de transações recentes.
                  </p>
                </div>

                <div className="border-l-4 border-red-500 pl-4 bg-red-50 dark:bg-red-950/10 p-4 rounded">
                  <p className="font-semibold text-red-700 dark:text-red-300 mb-2">
                    ✗ Sistema Atual
                  </p>
                  <p className="text-sm text-justify">
                    Ausência total de dashboard inicial, sem visão consolidada, filtros temporais ou histórico imediato.
                  </p>
                </div>
              </div>

              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-semibold w-1/3">Análise de Paridade</TableCell>
                    <TableCell>Ausência total da funcionalidade, sem substituição equivalente.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Impacto Operacional</TableCell>
                    <TableCell>Perda de visão gerencial e dificuldade de monitoramento.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Risco Associado</TableCell>
                    <TableCell>Operacional, gerencial e estratégico.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Classificação Técnica</TableCell>
                    <TableCell>
                      <Badge className="bg-orange-600">Criticidade: Média</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Exemplo 2: Estoque - CPR Verde */}
          <Card className="mb-6 border-amber-200 dark:border-amber-800">
            <CardHeader className="bg-amber-50 dark:bg-amber-950/20">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Módulo: Estoque – Página CPR Verde</CardTitle>
                <Badge className="bg-amber-600">PARIDADE PARCIAL</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border-l-4 border-green-500 pl-4 bg-green-50 dark:bg-green-950/10 p-4 rounded">
                  <p className="font-semibold text-green-700 dark:text-green-300 mb-2">
                    ✓ Sistema Legado
                  </p>
                  <p className="text-sm text-justify">
                    Kanban ativo, com histórico consistente, menus de ações por status e rastreabilidade completa.
                  </p>
                </div>

                <div className="border-l-4 border-amber-500 pl-4 bg-amber-50 dark:bg-amber-950/10 p-4 rounded">
                  <p className="font-semibold text-amber-700 dark:text-amber-300 mb-2">
                    ⚠ Sistema Atual
                  </p>
                  <p className="text-sm text-justify">
                    Kanban implementado, porém sem dados operacionais, impedindo validação prática dos fluxos.
                  </p>
                </div>
              </div>

              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-semibold w-1/3">Análise de Paridade</TableCell>
                    <TableCell>Paridade pendente de validação operacional e regressão funcional nos filtros de pesquisa.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Impacto Operacional</TableCell>
                    <TableCell>Limitação severa de auditoria e rastreabilidade.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Risco Associado</TableCell>
                    <TableCell>Operacional, governança e auditoria.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Criticidade</TableCell>
                    <TableCell>
                      <Badge className="bg-orange-600">Média</Badge>, podendo evoluir para <Badge variant="destructive">Alta</Badge> em produção.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Exemplo 3: Intenção de Movimentação e Solicitação de CDE */}
          <Card className="mb-6 border-red-200 dark:border-red-800">
            <CardHeader className="bg-red-50 dark:bg-red-950/20">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Item: Intenção de Movimentação e Solicitação de CDE</CardTitle>
                <Badge variant="destructive">NÃO ATENDIDO</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border-l-4 border-green-500 pl-4 bg-green-50 dark:bg-green-950/10 p-4 rounded">
                  <p className="font-semibold text-green-700 dark:text-green-300 mb-2">
                    ✓ Sistema Legado
                  </p>
                  <p className="text-sm text-justify">
                    Fluxos de Intenção de Movimentação e Solicitação de CDE executados <strong>integralmente dentro do sistema</strong>, com solicitação, validação, pagamento (quando aplicável) e emissão concluídos de forma sistêmica e rastreável.
                  </p>
                </div>

                <div className="border-l-4 border-red-500 pl-4 bg-red-50 dark:bg-red-950/10 p-4 rounded">
                  <p className="font-semibold text-red-700 dark:text-red-300 mb-2">
                    ✗ Sistema Atual
                  </p>
                  <p className="text-sm text-justify">
                    Existem páginas dedicadas para Intenção de Movimentação e Solicitação de CDE, porém <strong>não estão plenamente desenvolvidas nem integradas</strong> aos fluxos transacionais, resultando na obrigatoriedade de execução por canais externos (e-mail e processos manuais).
                  </p>
                </div>
              </div>

              <Alert variant="destructive">
                <AlertDescription>
                  <p className="font-semibold mb-2">Impacto da Quebra de Paridade</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Jornada do cliente forçada para fora da plataforma;</li>
                    <li>Dependência estrutural de intervenção humana;</li>
                    <li>Ausência de automação end-to-end;</li>
                    <li>Perda de rastreabilidade e auditabilidade sistêmica.</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-semibold w-1/3">Status de Paridade</TableCell>
                    <TableCell>
                      <Badge variant="destructive">❌ Não atendido</Badge> (Funcionalidade parcialmente implementada e inoperante)
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Enquadramento Técnico</TableCell>
                    <TableCell className="text-justify">
                      Falha estrutural por subutilização de funcionalidade existente, caracterizando <strong>interrupção da jornada digital</strong> e descumprimento dos princípios de automação, governança transacional e escalabilidade.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Referência Cruzada</TableCell>
                    <TableCell>
                      Fluxos AS-IS e TO-BE detalhados no <strong>Anexo I – Evidências Técnicas e Operacionais</strong>.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="bg-red-50 dark:bg-red-950/10 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-sm text-justify">
                  <strong>⚠️ Observação Crítica:</strong> A presença de páginas visuais sem funcionalidade transacional efetiva representa uma regressão severa, pois cria a expectativa de automação que, na prática, não se concretiza, forçando o retrocesso a processos manuais.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 5. Modelo de Registro da Matriz */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Modelo de Registro da Matriz</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-justify">
              Cada item analisado é registrado conforme os seguintes critérios padronizados:
            </p>

            <div className="overflow-x-auto">
              <Table className="border">
                <TableHeader>
                  <TableRow>
                    <TableHead className="bg-primary text-primary-foreground">Campo</TableHead>
                    <TableHead className="bg-primary text-primary-foreground">Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-semibold">Módulo</TableCell>
                    <TableCell>Identificação do módulo funcional analisado</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Funcionalidade no Sistema Legado</TableCell>
                    <TableCell>Descrição da funcionalidade existente</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Situação no Sistema Atual</TableCell>
                    <TableCell>Estado atual da implementação</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Tipo de Não Conformidade</TableCell>
                    <TableCell>Classificação: Ausência, Paridade Parcial, Regressão</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Impacto Operacional</TableCell>
                    <TableCell>Consequências práticas da não conformidade</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Risco Associado</TableCell>
                    <TableCell>Categorias de risco: Operacional, Financeiro, Governança</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Criticidade</TableCell>
                    <TableCell>Nível: Crítica, Alta, Média, Baixa</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Observações Técnicas</TableCell>
                    <TableCell>Contexto adicional e recomendações</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* 6. Registros Identificados (Resumo) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Registros Identificados (Resumo)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-justify">
              Durante o processo de análise comparativa, foram identificadas as seguintes categorias de não conformidades:
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4 bg-red-50 dark:bg-red-950/10 p-4 rounded">
                <p className="font-semibold text-red-700 dark:text-red-300 mb-2">
                  🔴 Regressões Funcionais Comprovadas
                </p>
                <p className="text-sm text-justify">
                  Identificadas em módulos críticos: financeiro, estoque, APIs, acervo e filtros de pesquisa.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-4 bg-orange-50 dark:bg-orange-950/10 p-4 rounded">
                <p className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
                  🟠 Alterações de Escopo com Aumento de Risco
                </p>
                <p className="text-sm text-justify">
                  Mudanças significativas observadas nos módulos DARE e Royalties, gerando impacto em conformidade regulatória.
                </p>
              </div>

              <div className="border-l-4 border-amber-500 pl-4 bg-amber-50 dark:bg-amber-950/10 p-4 rounded">
                <p className="font-semibold text-amber-700 dark:text-amber-300 mb-2">
                  🟡 Funcionalidades Ausentes
                </p>
                <p className="text-sm text-justify">
                  Ausência de módulos completos: MUNDI e documentação técnica de APIs.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 dark:bg-blue-950/10 p-4 rounded">
                <p className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                  🔵 Itens Pendentes de Validação Operacional
                </p>
                <p className="text-sm text-justify">
                  Módulos implementados mas sem dados operacionais reais para validação completa.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4 bg-green-50 dark:bg-green-950/10 p-4 rounded">
                <p className="font-semibold text-green-700 dark:text-green-300 mb-2">
                  ✅ Módulos com Paridade Funcional Preservada
                </p>
                <p className="text-sm text-justify">
                  Equivalência funcional comprovada, especialmente em fluxos de certificados, com diferenças restritas ao volume histórico de registros.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 7. Registros Pendentes de Validação */}
        <Card className="border-blue-200 dark:border-blue-800">
          <CardHeader className="bg-blue-50 dark:bg-blue-950/20">
            <CardTitle className="text-2xl">Registros com Paridade Funcional Pendente de Validação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <Alert>
              <AlertDescription>
                <p className="text-justify text-sm">
                  Determinados módulos permanecem pendentes <strong>exclusivamente por ausência de dados operacionais reais</strong>, não configurando falha técnica comprovada até o momento.
                </p>
              </AlertDescription>
            </Alert>

            <p className="text-justify">
              Estes módulos possuem implementação aparentemente adequada, porém a validação completa de paridade funcional exige:
            </p>

            <ul className="list-disc pl-6 space-y-1">
              <li>Volume representativo de dados operacionais;</li>
              <li>Cenários reais de uso em ambiente produtivo;</li>
              <li>Testes de carga e comportamento sob condições normais de operação;</li>
              <li>Validação de integrações com sistemas adjacentes.</li>
            </ul>

            <div className="bg-blue-50 dark:bg-blue-950/10 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-justify">
                <strong>Recomendação:</strong> Estes itens devem ser reavaliados assim que o sistema entrar em operação produtiva com volume real de transações.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 8. Registros com Paridade Comprovada */}
        <Card className="border-green-200 dark:border-green-800">
          <CardHeader className="bg-green-50 dark:bg-green-950/20">
            <CardTitle className="text-2xl">Registros com Paridade Funcional Comprovada</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <Alert className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
              <AlertDescription>
                <p className="text-justify text-sm">
                  Determinados fluxos apresentam <strong>equivalência funcional</strong>, com diferenças restritas ao volume histórico de registros, não caracterizando regressão.
                </p>
              </AlertDescription>
            </Alert>

            <p className="text-justify">
              Os módulos com paridade funcional comprovada demonstram:
            </p>

            <ul className="list-disc pl-6 space-y-1">
              <li>Mesma capacidade operacional do sistema legado;</li>
              <li>Fluxos transacionais equivalentes;</li>
              <li>Manutenção de rastreabilidade e governança;</li>
              <li>Sem perda de funcionalidades críticas.</li>
            </ul>

            <div className="bg-green-50 dark:bg-green-950/10 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <p className="font-semibold mb-2">Destaque Positivo:</p>
              <p className="text-sm text-justify">
                Os fluxos de certificados, em especial, apresentaram boa equivalência funcional, indicando que a reengenharia nestes módulos foi bem-sucedida em preservar as capacidades essenciais.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 9. Conclusão Técnica Geral */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">CONCLUSÃO TÉCNICA GERAL</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-justify">
              Este Anexo consolida, de forma <strong>objetiva e rastreável</strong>, os seguintes resultados da análise de paridade funcional:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="border rounded p-4 bg-red-50 dark:bg-red-950/10 border-red-200 dark:border-red-800">
                <p className="font-semibold text-red-700 dark:text-red-300 mb-2">Regressões Funcionais</p>
                <p className="text-sm">Funcionalidades críticas perdidas ou degradadas</p>
              </div>

              <div className="border rounded p-4 bg-orange-50 dark:bg-orange-950/10 border-orange-200 dark:border-orange-800">
                <p className="font-semibold text-orange-700 dark:text-orange-300 mb-2">Alterações de Escopo</p>
                <p className="text-sm">Mudanças que elevam riscos operacionais</p>
              </div>

              <div className="border rounded p-4 bg-amber-50 dark:bg-amber-950/10 border-amber-200 dark:border-amber-800">
                <p className="font-semibold text-amber-700 dark:text-amber-300 mb-2">Lacunas de Implementação</p>
                <p className="text-sm">Funcionalidades ausentes no sistema atual</p>
              </div>

              <div className="border rounded p-4 bg-blue-50 dark:bg-blue-950/10 border-blue-200 dark:border-blue-800">
                <p className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Validação Pendente</p>
                <p className="text-sm">Aguardando dados operacionais reais</p>
              </div>

              <div className="border rounded p-4 bg-green-50 dark:bg-green-950/10 border-green-200 dark:border-green-800">
                <p className="font-semibold text-green-700 dark:text-green-300 mb-2">Paridade Atendida</p>
                <p className="text-sm">Módulos com equivalência funcional</p>
              </div>

              <div className="border rounded p-4 bg-purple-50 dark:bg-purple-950/10 border-purple-200 dark:border-purple-800">
                <p className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Referência Técnica</p>
                <p className="text-sm">Baseada em vídeo de apresentação do legado</p>
              </div>
            </div>

            <Alert variant="destructive">
              <AlertDescription className="space-y-2">
                <p className="font-semibold">CONSIDERAÇÃO ESTRATÉGICA FINAL</p>
                <p className="text-sm text-justify">
                  A <strong>Matriz de Paridade Funcional</strong> deve ser tratada como <strong>instrumento vivo</strong>, devendo os itens pendentes ser <strong>reavaliados assim que houver dados reais de operação no sistema atual</strong>.
                </p>
                <p className="text-sm text-justify mt-2">
                  As regressões e lacunas identificadas neste anexo fundamentam as análises de risco apresentadas no <strong>Anexo III</strong> e as evidências técnicas do <strong>Anexo I</strong>, compondo um quadro técnico consolidado que subsidia a tomada de decisão estratégica sobre a continuidade do projeto.
                </p>
              </AlertDescription>
            </Alert>

            <div className="border-t pt-4 mt-6 text-sm text-muted-foreground">
              <p><strong>Anexo:</strong> IV – Matriz de Paridade Funcional</p>
              <p><strong>Data de Elaboração:</strong> Janeiro/2026</p>
              <p><strong>Responsável Técnico:</strong> Luiz Paulo</p>
              <p><strong>Referência de Comparação:</strong> Vídeo técnico do Sistema Legado</p>
              <p><strong>Versão:</strong> 1.0</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AnexoLayout>
  );
}
