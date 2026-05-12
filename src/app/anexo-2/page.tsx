"use client";

import { AnexoLayout } from "@/app/components/anexo-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Anexo2() {
  return (
    <AnexoLayout title="Anexo II – Linha do Tempo de Suporte" number={2}>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Apresentação */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Cronograma de Eventos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-justify">
              Este anexo consolida, de forma cronológica e analítica, os principais eventos, solicitações de suporte, interações técnicas e decisões operacionais observadas no período de <strong>06 de novembro a 07 de janeiro</strong>.
            </p>
            
            <Alert>
              <AlertDescription className="space-y-3">
                <p className="text-justify">
                  O presente relatório foi elaborado por <strong>Luiz Paulo</strong>, com base em sua experiência direta ao longo do período de interação contínua com a fornecedora, considerando exclusivamente:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>As comunicações às quais houve acesso efetivo</li>
                  <li>As interações diretas de suporte técnico e operacional</li>
                  <li>Os impactos observados durante o período em que esteve envolvido ativamente na operação</li>
                </ul>
                <p className="text-justify text-sm text-muted-foreground mt-3">
                  Ressalta-se que eventos, decisões ou tratativas anteriores a esse período não integram esta análise, uma vez que não houve acesso pleno, contínuo ou documentado aos históricos anteriores.
                </p>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Contexto Histórico Complementar */}
        <Card className="border-amber-200 dark:border-amber-800">
          <CardHeader className="bg-amber-50 dark:bg-amber-950/20">
            <CardTitle className="text-2xl flex items-center gap-2">
              <span>📋</span>
              Contexto Histórico Complementar
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Registros do Backoffice (Google Tarefas) – Setembro a Novembro
            </p>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <p className="text-justify">
              Antes do período de acompanhamento direto consolidado neste relatório, foram identificados registros relevantes no <strong>Google Tarefas</strong>, utilizados como canal de organização e suporte operacional pelo backoffice.
            </p>

            <Alert className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
              <AlertDescription>
                <p className="font-semibold mb-2">Período dos Registros:</p>
                <p className="text-sm">05 de setembro a final de novembro</p>
                <p className="text-sm mt-2 text-muted-foreground">
                  Evidenciam práticas operacionais que ajudam a contextualizar os problemas posteriormente observados.
                </p>
              </AlertDescription>
            </Alert>

            <div>
              <h4 className="font-semibold text-lg mb-3">Principais Pontos Documentados:</h4>
              
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4 bg-red-50 dark:bg-red-950/10 p-4 rounded">
                  <p className="font-semibold text-red-700 dark:text-red-300 mb-2">
                    ⚠️ Aprovação Consciente de Documentação Incorreta
                  </p>
                  <p className="text-sm text-justify">
                    Aprovação consciente de documentação incorreta em ambiente produtivo, com a justificativa de viabilizar o processamento da safra, assumindo-se que tais dados seriam corrigidos apenas em fases futuras.
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4 bg-orange-50 dark:bg-orange-950/10 p-4 rounded">
                  <p className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
                    🔍 Controles Manuais Recorrentes
                  </p>
                  <p className="text-sm text-justify">
                    Necessidade recorrente de controles manuais para identificação da origem correta de UCSs (safra, núcleo), a fim de evitar inconsistências operacionais.
                  </p>
                </div>

                <div className="border-l-4 border-amber-500 pl-4 bg-amber-50 dark:bg-amber-950/10 p-4 rounded">
                  <p className="font-semibold text-amber-700 dark:text-amber-300 mb-2">
                    ✏️ Correções Frequentes de Metadados
                  </p>
                  <p className="text-sm text-justify">
                    Correções frequentes de nomenclaturas, identificadores e metadados em certificados e registros do sistema.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 dark:bg-blue-950/10 p-4 rounded">
                  <p className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                    📝 Volume Elevado de Tarefas Corretivas
                  </p>
                  <p className="text-sm text-justify">
                    Criação de um volume elevado de tarefas para registrar erros e melhorias, indicando dependência significativa de intervenção humana para manutenção da operação.
                  </p>
                </div>
              </div>
            </div>

            <Alert variant="destructive" className="mt-6">
              <AlertDescription className="space-y-2">
                <p className="font-semibold">Conclusão Contextual:</p>
                <p className="text-justify text-sm">
                  Esses registros demonstram que, já em fases anteriores, o sistema operava com <strong>exceções conhecidas, ajustes manuais e passivos técnicos deliberadamente assumidos</strong>, o que contribuiu para a recorrência de falhas e limitações observadas posteriormente.
                </p>
              </AlertDescription>
            </Alert>

            <div className="bg-muted p-4 rounded-lg mt-6">
              <p className="text-sm text-muted-foreground italic text-justify">
                <strong>Nota Importante:</strong> O autor deste relatório, Luiz Paulo, não teve acesso pleno nem participação direta na totalidade dessas decisões iniciais, utilizando tais registros exclusivamente como <strong>contexto histórico complementar</strong>, sem prejuízo da análise principal.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tabs para Backlog Técnico e Marcos Principais */}
        <Tabs defaultValue="backlog" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="backlog">Backlog Técnico</TabsTrigger>
            <TabsTrigger value="timeline">Marcos Principais</TabsTrigger>
          </TabsList>

          {/* Tab: Backlog Técnico */}
          <TabsContent value="backlog" className="space-y-6 mt-6">
            {/* Estado do Sistema e Backlog Técnico */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Estado do Sistema e Backlog Técnico</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Tarefas Finalizadas, em Andamento e Pendentes
                </p>
              </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-justify">
              Como parte da análise consolidada deste dossiê, foi avaliada a lista de tarefas do <strong>Projeto Sistema Backoffice – Fase de Melhorias</strong>, contendo itens finalizados, em andamento e pendentes, registrados durante o período de acompanhamento direto.
            </p>

            <p className="text-justify">
              Essa lista reflete, de forma objetiva, o <strong>estado funcional do sistema em ambiente produtivo</strong>, bem como o volume de intervenções necessárias para sua operação contínua.
            </p>

            {/* Análise Técnica */}
            <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
              <AlertDescription>
                <p className="font-semibold mb-2">Análise Técnica da Lista de Tarefas</p>
                <p className="text-sm text-justify">
                  Essa lista não é apenas um backlog. Ela é um <strong>retrato operacional do sistema</strong> e evidencia objetivamente:
                </p>
                <ul className="list-disc pl-6 space-y-1 mt-2 text-sm">
                  <li>Alto volume de erros funcionais em produção</li>
                  <li>Melhorias que, na prática, são correções de lacunas básicas</li>
                  <li>Dependência de ajustes manuais e intervenções do backoffice</li>
                  <li>Chamados recorrentes para operações críticas já pagas</li>
                  <li>Ausência de automações essenciais (fila, abastecimento, validações, permissões)</li>
                </ul>
                <p className="text-sm text-justify mt-3 font-semibold text-blue-700 dark:text-blue-300">
                  Diversas tarefas listadas como "melhoria" são, tecnicamente, requisitos mínimos de funcionamento, não incrementos opcionais.
                </p>
              </AlertDescription>
            </Alert>

            {/* Principais Achados */}
            <div>
              <h4 className="font-semibold text-lg mb-3">Principais Achados</h4>
              <p className="text-justify mb-3">A análise do backlog evidencia:</p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-justify">
                  <strong>Existência de erros funcionais críticos</strong>, incluindo falhas em buscas, movimentações, gestão de contas, processamento de pedidos pagos e integração com blockchain;
                </li>
                <li className="text-justify">
                  <strong>Dependência recorrente de intervenções manuais do backoffice</strong>, inclusive para operações sensíveis como abastecimento, movimentação de UCSs e processamento de filas;
                </li>
                <li className="text-justify">
                  <strong>Classificação de itens estruturais como "melhorias"</strong>, quando, tecnicamente, tratam-se de requisitos mínimos de funcionamento e governança do sistema;
                </li>
                <li className="text-justify">
                  <strong>Limitações reconhecidas pela própria equipe</strong>, como a inviabilidade de execução manual de determinados processos e a necessidade de automação futura.
                </li>
              </ul>
            </div>

            {/* Classificação das Tarefas */}
            <div>
              <h4 className="font-semibold text-lg mb-3">Classificação Técnica das Tarefas</h4>

              <div className="space-y-4">
                {/* Erros Funcionais */}
                <div className="border-l-4 border-red-500 pl-4 bg-red-50 dark:bg-red-950/10 p-4 rounded">
                  <p className="font-semibold text-red-700 dark:text-red-300 mb-2">
                    🔴 Erros Funcionais (falhas objetivas do sistema)
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    Funcionalidades que deveriam operar corretamente e não operam:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Busca de pedidos não funciona</li>
                    <li>Movimentação via menu (3 pontinhos) busca pelo identificador errado</li>
                    <li>Gestão de contas não funciona adequadamente</li>
                    <li>Processamento SaaS BMV com falhas mesmo após testes em call</li>
                    <li>Pedido pago com bug ativo em produção</li>
                    <li>Espelhamento Blockchain inexistente ou incompleto</li>
                    <li>Exibição incorreta de dados de usuários (nome incompleto, duplicidades)</li>
                    <li>Ausência de ícones por tipo de movimentação (perda de rastreabilidade visual)</li>
                  </ul>
                  <p className="text-sm font-semibold mt-2 text-red-700 dark:text-red-300">
                    ➡ Impacto: operacional direto, risco financeiro e retrabalho.
                  </p>
                </div>

                {/* Melhorias que são Correções */}
                <div className="border-l-4 border-orange-500 pl-4 bg-orange-50 dark:bg-orange-950/10 p-4 rounded">
                  <p className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
                    🟠 "Melhorias" que são, na prática, correções estruturais
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    Pontos não opcionais para escala ou qualidade; são fundamentais:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Sistema não obedecer o abastecimento</li>
                    <li>Falta de visualização da safra na fila</li>
                    <li>Falta de identificação de origem das UCSs (safra/núcleo)</li>
                    <li>Cadastro inconsistente de clientes e produtores</li>
                    <li>Impossibilidade de excluir documentos aprovados incorretos</li>
                    <li>Falhas em perfis e permissões</li>
                    <li>Processo de criação de fila inviável manualmente</li>
                  </ul>
                  <p className="text-sm font-semibold mt-2 text-orange-700 dark:text-orange-300">
                    ➡ Impacto: risco de erro humano, falha de governança e baixa escalabilidade.
                  </p>
                </div>

                {/* Limitações Operacionais */}
                <div className="border-l-4 border-amber-500 pl-4 bg-amber-50 dark:bg-amber-950/10 p-4 rounded">
                  <p className="font-semibold text-amber-700 dark:text-amber-300 mb-2">
                    🟡 Limitações Operacionais Assumidas
                  </p>
                  <p className="text-sm text-justify mb-2">
                    Alguns trechos documentados são particularmente reveladores:
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="italic">"Inviável fazer manualmente."</p>
                    <p className="italic">"No momento oportuno."</p>
                    <p className="italic">"Aguardando OK."</p>
                  </div>
                  <p className="text-sm font-semibold mt-3 text-amber-700 dark:text-amber-300">
                    Isso demonstra: consciência das limitações, dependência de decisões futuras e operação convivendo com pendências críticas em aberto.
                  </p>
                </div>
              </div>
            </div>

            {/* Exemplos de Impactos */}
            <div>
              <h4 className="font-semibold text-lg mb-3">Exemplos de Impactos Operacionais Identificados</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li className="text-justify">
                  Pedido pago com falha ativa, exigindo múltiplos testes em call sem sucesso imediato;
                </li>
                <li className="text-justify">
                  Falta de rastreabilidade adequada de UCSs por safra ou núcleo;
                </li>
                <li className="text-justify">
                  Cadastro inconsistente de usuários, produtores e clientes;
                </li>
                <li className="text-justify">
                  Fragilidades em perfis, permissões e gestão documental;
                </li>
                <li className="text-justify">
                  Ausência de validações sistêmicas para evitar uso incorreto de saldos.
                </li>
              </ul>
            </div>

            {/* CONSIDERAÇÕES TÉCNICAS */}
            <Alert variant="destructive">
              <AlertDescription className="space-y-3">
                <p className="font-semibold">CONSIDERAÇÕES TÉCNICAS</p>
                <p className="text-justify text-sm">
                  O conjunto de tarefas analisado demonstra que o sistema, no período acompanhado, operava com:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Passivo técnico significativo;</li>
                  <li>Baixa automação de processos críticos;</li>
                  <li>Risco operacional elevado, especialmente em cenários de crescimento;</li>
                  <li>Dependência direta do backoffice para manter a operação funcional.</li>
                </ul>
                <p className="text-justify text-sm mt-3">
                  Essas evidências reforçam as conclusões apresentadas ao longo deste Anexo, indicando que os problemas observados não se limitam a falhas pontuais, mas decorrem de <strong>limitações estruturais e operacionais acumuladas ao longo do tempo</strong>.
                </p>
              </AlertDescription>
            </Alert>

            {/* Nota de Escopo */}
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground italic text-justify">
                <strong>Nota de Escopo:</strong> A presente análise foi elaborada por <strong>Luiz Paulo</strong>, com base em sua experiência direta e acompanhamento ativo, utilizando registros de tarefas como evidência complementar do estado do sistema no período analisado.
              </p>
            </div>

            {/* ENCERRAMENTO TÉCNICO */}
            <Alert className="bg-slate-50 dark:bg-slate-950/20 border-slate-300 dark:border-slate-700">
              <AlertDescription>
                <p className="text-justify font-semibold mb-2">ENCERRAMENTO TÉCNICO</p>
                <p className="text-justify text-sm">
                  O backlog técnico apresentado neste anexo deve ser interpretado como um <strong>retrato fiel do esforço necessário para manter o sistema operacional</strong>, bem como dos <strong>riscos associados à sua continuidade sem reengenharia estrutural</strong>.
                </p>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
          </TabsContent>

          {/* Tab: Marcos Principais */}
          <TabsContent value="timeline" className="space-y-6 mt-6">
            {/* Marcos Principais */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Marcos Principais</h2>

          {/* Fase 1 */}
          <Card className="mb-6">
            <CardHeader className="bg-blue-50 dark:bg-blue-950/20">
              <div className="flex items-center gap-3">
                <Badge className="bg-blue-600">Fase 1</Badge>
                <CardTitle className="text-xl">Diagnóstico Inicial</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>Período:</strong> início de novembro
              </p>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <p className="text-justify">
                Nesta fase, ocorreram as primeiras interações acompanhadas diretamente pelo gestor operacional pelo relatório, com foco em:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>Validação inicial do ambiente operacional sob sua supervisão</li>
                <li>Identificação de falhas críticas percebidas durante o uso real do sistema</li>
                <li>Registro dos primeiros incidentes técnicos com impacto operacional</li>
              </ul>

              <Alert className="mt-4">
                <AlertDescription className="text-justify">
                  As respostas iniciais apresentaram <strong>agilidade</strong>, porém com <strong>baixo nível de aprofundamento técnico</strong>, tratando os problemas como pontuais, o que dificultou a identificação precoce de padrões de recorrência.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Fase 2 */}
          <Card className="mb-6">
            <CardHeader className="bg-orange-50 dark:bg-orange-950/20">
              <div className="flex items-center gap-3">
                <Badge className="bg-orange-600">Fase 2</Badge>
                <CardTitle className="text-xl">Escalonamento</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>Período:</strong> segunda quinzena de novembro até início de dezembro
              </p>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <p className="text-justify">
                Com a intensificação do uso do sistema e maior exposição a cenários produtivos, observou-se:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>Repetição de falhas previamente reportadas</li>
                <li>Ampliação do impacto operacional dos incidentes</li>
                <li>Necessidade de escalonamento recorrente para obtenção de respostas mais estruturadas</li>
              </ul>

              <Alert className="mt-4">
                <AlertDescription className="text-justify">
                  Durante este período, parte significativa das interações exigiu <strong>intervenção direta e insistência</strong> por parte do gestor operacional, indicando limitações no fluxo padrão de suporte.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Fase 3 */}
          <Card className="mb-6">
            <CardHeader className="bg-amber-50 dark:bg-amber-950/20">
              <div className="flex items-center gap-3">
                <Badge className="bg-amber-600">Fase 3</Badge>
                <CardTitle className="text-xl">Análise Aprofundada</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>Período:</strong> dezembro
              </p>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <p className="text-justify">
                A continuidade dos problemas levou à necessidade de uma análise mais detalhada, baseada exclusivamente:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>Nas evidências observadas durante o período acompanhado</li>
                <li>Nas respostas efetivamente fornecidas pela equipe de suporte</li>
                <li>Nos resultados práticos das correções implementadas</li>
              </ul>

              <Alert variant="destructive" className="mt-4">
                <AlertDescription className="text-justify">
                  Ficou evidente que diversos incidentes extrapolavam falhas isoladas, apontando para <strong>limitações estruturais, arquiteturais e de governança técnica</strong>, com impacto direto na confiabilidade e escalabilidade do sistema.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Fase 4 */}
          <Card className="mb-6">
            <CardHeader className="bg-green-50 dark:bg-green-950/20">
              <div className="flex items-center gap-3">
                <Badge className="bg-green-600">Fase 4</Badge>
                <CardTitle className="text-xl">Recomendações</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>Período:</strong> final de dezembro e início de janeiro
              </p>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <p className="text-justify">
                Com base no histórico observado e documentado, foram consolidadas:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>Recomendações técnicas e estratégicas</li>
                <li>Avaliações de risco operacional</li>
                <li>Subsídios para tomada de decisão sobre evolução, correção ou substituição do modelo atual</li>
              </ul>

              <Alert className="mt-4">
                <AlertDescription className="text-justify">
                  Este dossiê representa, portanto, uma <strong>síntese técnica fundamentada em experiência prática</strong>, limitada ao período e às informações efetivamente acessadas pelo autor.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* Impacto Acumulado */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Impacto Acumulado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-justify">
              A análise restrita ao período acompanhado evidencia impactos acumulados relevantes, especialmente nos seguintes pontos:
            </p>

            <div className="space-y-4">
              {/* Experiência do Cliente Final */}
              <div className="border-l-4 border-red-500 pl-4 bg-red-50 dark:bg-red-950/10 p-4 rounded">
                <h4 className="font-semibold text-lg mb-2">Experiência do Cliente Final</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Atrasos recorrentes em operações críticas</li>
                  <li>Necessidade de reprocessamentos manuais</li>
                  <li>Percepção de instabilidade operacional</li>
                </ul>
              </div>

              {/* Confiabilidade Operacional */}
              <div className="border-l-4 border-orange-500 pl-4 bg-orange-50 dark:bg-orange-950/10 p-4 rounded">
                <h4 className="font-semibold text-lg mb-2">Confiabilidade Operacional</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Dependência de ações corretivas pontuais</li>
                  <li>Ausência de encerramento definitivo de demandas</li>
                  <li>Risco operacional elevado em fluxos sensíveis</li>
                </ul>
              </div>

              {/* Escalabilidade */}
              <div className="border-l-4 border-amber-500 pl-4 bg-amber-50 dark:bg-amber-950/10 p-4 rounded">
                <h4 className="font-semibold text-lg mb-2">Escalabilidade</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Dificuldade de expansão sustentada sem aumento proporcional de suporte</li>
                  <li>Limitações percebidas no suporte a volumes crescentes</li>
                  <li>Fragilidade na sustentação de novos clientes</li>
                </ul>
              </div>

              {/* Sustentabilidade do Modelo de Negócio */}
              <div className="border-l-4 border-blue-500 pl-4 bg-blue-50 dark:bg-blue-950/10 p-4 rounded">
                <h4 className="font-semibold text-lg mb-2">Sustentabilidade do Modelo de Negócio</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Elevação do custo operacional indireto</li>
                  <li>Comprometimento da previsibilidade de entregas</li>
                  <li>Necessidade de reavaliação estratégica da base tecnológica</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
          </TabsContent>
        </Tabs>

        {/* Nota de Escopo e Responsabilidade */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Nota de Escopo e Responsabilidade</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertDescription className="space-y-2">
                <p className="text-justify font-semibold">Este relatório:</p>
                <ul className="list-disc pl-6 space-y-2 text-justify">
                  <li>Reflete exclusivamente a experiência, observações e análises realizadas por <strong>Luiz Paulo</strong></li>
                  <li>Está limitado ao período em que houve participação direta e acesso efetivo às informações</li>
                  <li>Não tem como objetivo inferir, validar ou contestar decisões técnicas tomadas anteriormente ao período analisado</li>
                </ul>
              </AlertDescription>
            </Alert>

            <div className="border-t pt-4 mt-6 text-sm text-muted-foreground">
              <p><strong>Período de Análise:</strong> 06 de novembro a 07 de janeiro</p>
              <p><strong>Duração:</strong> Aproximadamente 60 dias</p>
              <p><strong>Gestor Operacional:</strong> Luiz Paulo</p>
              <p><strong>Versão:</strong> 1.0</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AnexoLayout>
  );
}
