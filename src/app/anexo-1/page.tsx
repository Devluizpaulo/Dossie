"use client";

import { AnexoLayout } from "@/app/components/anexo-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { EvidenceImage } from "@/app/components/evidence-image";
import { CheckCircle2 } from "lucide-react";
import { BiSolidArchive, BiLeaf, BiSolidCartAlt, BiData } from "react-icons/bi";
import { BsPatchCheck, BsCartPlusFill } from "react-icons/bs";
import { FiCoffee } from "react-icons/fi";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { RiBook2Line } from "react-icons/ri";




export default function Anexo1() {
  return (
    <AnexoLayout title="Anexo I – Evidências Técnicas e Operacionais" number={1}>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* 1. Apresentação */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">1. Apresentação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-justify">
              Este anexo constitui o registro formal e consolidado das evidências técnicas e operacionais identificadas durante o processo de análise comparativa entre o Sistema Atual e o Sistema Legado.
            </p>

            <div>
              <p className="font-semibold mb-2">Seu objetivo é garantir:</p>
              <ul className="list-disc pl-6 space-y-1 text-justify">
                <li>Rastreabilidade técnica das não conformidades</li>
                <li>Padronização documental</li>
                <li>Subsídios objetivos para tomada de decisão estratégica</li>
                <li>Base técnica para auditorias, comitês executivos e avaliação de risco</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Cada evidência foi registrada de forma estruturada, contendo:</p>
              <ul className="list-disc pl-6 space-y-1 text-justify">
                <li>Código único de identificação</li>
                <li>Descrição técnica objetiva</li>
                <li>Contexto operacional</li>
                <li>Impacto e risco associado</li>
                <li>Análise técnica</li>
                <li>Recomendação clara</li>
                <li>Espaço próprio para evidência visual (prints)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* 2. Matriz Resumo */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">2. Matriz Resumo de Evidências</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table className="border">
                <TableHeader>
                  <TableRow>
                    <TableHead className="bg-primary text-primary-foreground">Cód.</TableHead>
                    <TableHead className="bg-primary text-primary-foreground">Descrição Sintética</TableHead>
                    <TableHead className="bg-primary text-primary-foreground">Módulo Afetado</TableHead>
                    <TableHead className="bg-primary text-primary-foreground">Tipo</TableHead>
                    <TableHead className="bg-primary text-primary-foreground">Impacto Principal</TableHead>
                    <TableHead className="bg-primary text-primary-foreground">Severidade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-semibold">EV-01</TableCell>
                    <TableCell>Busca por pedido retorna resultado incorreto</TableCell>
                    <TableCell>Movimentações</TableCell>
                    <TableCell>Erro funcional</TableCell>
                    <TableCell>Compromete auditoria e rastreabilidade</TableCell>
                    <TableCell><Badge variant="destructive">Alta</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">EV-02</TableCell>
                    <TableCell>Exibição inconsistente de nome de usuários</TableCell>
                    <TableCell>Usuários</TableCell>
                    <TableCell>Governança de dados</TableCell>
                    <TableCell>Identificação ambígua</TableCell>
                    <TableCell><Badge className="bg-orange-500">Média</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">EV-03</TableCell>
                    <TableCell>Ausência de ícones e tags financeiras</TableCell>
                    <TableCell>Movimentações</TableCell>
                    <TableCell>Governança / Usabilidade</TableCell>
                    <TableCell>Risco de erro humano</TableCell>
                    <TableCell><Badge variant="destructive">Alta</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">EV-04</TableCell>
                    <TableCell>Documento reenviado permanece recusado</TableCell>
                    <TableCell>Gestão Documental</TableCell>
                    <TableCell>Fluxo quebrado</TableCell>
                    <TableCell>Bloqueio operacional</TableCell>
                    <TableCell><Badge variant="destructive">Alta</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">EV-05</TableCell>
                    <TableCell>Campos obrigatórios não identificados</TableCell>
                    <TableCell>Cadastro Usuários</TableCell>
                    <TableCell>Usabilidade / Dados</TableCell>
                    <TableCell>Cadastros inconsistentes</TableCell>
                    <TableCell><Badge className="bg-orange-500">Média</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">EV-06</TableCell>
                    <TableCell>Campo "ID Transação NXT" indevido</TableCell>
                    <TableCell>Certificados</TableCell>
                    <TableCell>Governança / UX</TableCell>
                    <TableCell>Ruído e dívida técnica</TableCell>
                    <TableCell><Badge className="bg-orange-500">Média</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">EV-07</TableCell>
                    <TableCell>Filtro inoperante em pedidos SaaS</TableCell>
                    <TableCell>Pedidos Certificado</TableCell>
                    <TableCell>Governança / Busca</TableCell>
                    <TableCell>Perda de rastreabilidade</TableCell>
                    <TableCell><Badge variant="destructive">Alta</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">EV-08</TableCell>
                    <TableCell>Valores incorretos de DARE e Royalties</TableCell>
                    <TableCell>Financeiro</TableCell>
                    <TableCell>Erro financeiro</TableCell>
                    <TableCell>Risco fiscal e regulatório</TableCell>
                    <TableCell><Badge variant="destructive">Alta</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">EV-09</TableCell>
                    <TableCell>Ausência de acesso simples a logs de auditoria</TableCell>
                    <TableCell>Governança / Segurança</TableCell>
                    <TableCell>Governança de Dados</TableCell>
                    <TableCell>Impossibilita rastreabilidade e auditoria</TableCell>
                    <TableCell><Badge variant="destructive">Alta</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* 3. Registro Detalhado */}
        <div>
          <h2 className="text-2xl font-bold mb-6">3. Registro Detalhado das Evidências</h2>

          {/* EV-01 */}
          <Card className="mb-6">
            <CardHeader className="bg-muted/50">
              <CardTitle className="text-xl flex items-center gap-3">
                <Badge variant="destructive">EV-01</Badge>
                <span>Busca por Pedido Retornando Resultado Incorreto</span>
              </CardTitle>
              <div className="flex gap-4 text-sm mt-2">
                <span><strong>Módulo:</strong> SaaS Tesouro Verde → Pedido de Certificado → Movimentações</span>
                <span><strong>Tipo:</strong> Erro funcional / Governança de dados</span>
                <span><strong>Severidade:</strong> <Badge variant="destructive">Alta</Badge></span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <h4 className="font-semibold mb-2">Descrição</h4>
                <p className="text-justify">
                  Ao acessar um pedido processado e acionar "Visualizar Movimentações", o sistema aplica automaticamente um filtro baseado no número do pedido, porém a tela de movimentações não possui este campo como critério de busca, retornando resultado vazio mesmo havendo movimentações válidas.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Impacto</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Perda de rastreabilidade entre Pedido → Distribuição → Movimentação</li>
                  <li>Aumento de tempo operacional</li>
                  <li>Risco de erro humano</li>
                  <li>Auditoria e conciliação comprometidas</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Análise Técnica</h4>
                <p className="text-justify">
                  Indica uso incorreto de identificador (pedido em vez de distribuição), falha de integração entre módulos e regressão funcional em relação ao sistema legado.
                </p>
              </div>

              <Alert>
                <AlertDescription>
                  <strong>Recomendação:</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Corrigir navegação para utilizar Dist</li>
                    <li>Garantir compatibilidade entre filtros aplicados e filtros disponíveis</li>
                    <li>Tratar como correção estrutural, não UX</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="bg-muted p-4 rounded-lg space-y-4">
                <p className="text-sm font-semibold">Evidência Visual:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <EvidenceImage imageId="ev-01-atual" />
                  <EvidenceImage imageId="ev-01-legado" />
                  <EvidenceImage imageId="ev-01-atual2" />
                  <EvidenceImage imageId="ev-01-legado2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* EV-02 */}
          <Card className="mb-6">
            <CardHeader className="bg-muted/50">
              <CardTitle className="text-xl flex items-center gap-3">
                <Badge className="bg-orange-500">EV-02</Badge>
                <span>Exibição Inconsistente do Nome de Usuários</span>
              </CardTitle>
              <div className="flex gap-4 text-sm mt-2">
                <span><strong>Módulo:</strong> Usuários → Gerenciar</span>
                <span><strong>Tipo:</strong> Governança de dados / Usabilidade</span>
                <span><strong>Severidade:</strong> <Badge className="bg-orange-500">Média</Badge></span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <h4 className="font-semibold mb-2">Descrição</h4>
                <p className="text-justify mb-2">Nomes são exibidos de forma inconsistente:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Em alguns casos apenas o primeiro nome</li>
                  <li>Em outros, nome e sobrenome concatenados sem espaçamento</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Impacto</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Identificação ambígua</li>
                  <li>Risco de duplicidade</li>
                  <li>Fragilidade em auditorias e atribuição de responsabilidades</li>
                </ul>
              </div>

              <Alert>
                <AlertDescription>
                  <strong>Recomendação:</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Padronizar exibição de nome completo</li>
                    <li>Corrigir concatenação e formatação</li>
                    <li>Implementar tooltip ou expansão</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="bg-muted p-4 rounded-lg space-y-4">
                <p className="text-sm font-semibold mb-2">Evidência Visual:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <EvidenceImage imageId="ev-02-atual" />
                  <EvidenceImage imageId="ev-02-legado" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* EV-03 */}
          <Card className="mb-6">
            <CardHeader className="bg-muted/50">
              <CardTitle className="text-xl flex items-center gap-3">
                <Badge variant="destructive">EV-03</Badge>
                <span>Ausência de Identificação Visual em Movimentações Financeiras</span>
              </CardTitle>
              <div className="flex gap-4 text-sm mt-2">
                <span><strong>Módulo:</strong> Movimentações Financeiras</span>
                <span><strong>Tipo:</strong> Governança / Usabilidade</span>
                <span><strong>Severidade:</strong> <Badge variant="destructive">Alta</Badge></span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <h4 className="font-semibold mb-2">Contexto Operacional</h4>
                <p className="text-justify">
                  No sistema legado, a coluna <strong>Tipo</strong> possui papel central na interpretação das transações, pois:
                </p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Identifica explicitamente a natureza da operação</li>
                  <li>É acompanhada por um ícone representativo</li>
                  <li>Possui legenda funcional padronizada, permitindo leitura rápida, intuitiva e auditável</li>
                </ul>
                <p className="text-justify mt-3">
                  Cada tipo de movimentação reflete regras de negócio distintas e impactos diretos nos estados de saldo (DIS, RES, APO).
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Principais Tipos de Movimentação Identificados no Sistema Legado</h4>
                <div className="overflow-x-auto">
                  <Table className="border text-sm">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="bg-muted">TIPO</TableHead>
                        <TableHead className="bg-muted text-center">Ícone</TableHead>
                        <TableHead className="bg-muted">TIPO</TableHead>
                        <TableHead className="bg-muted text-center">Ícone</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Pedido de Selo Tesouro Verde</TableCell>
                        <TableCell className="text-center">
                          <BsPatchCheck className="w-5 h-5 mx-auto text-yellow-500" />
                        </TableCell>
                        <TableCell>Abastecimento de Plataformas</TableCell>
                        <TableCell className="text-center align-middle">
                          <div className="flex items-center justify-center">
                            <BiSolidArchive size={20} className="text-yellow-500" />
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Revogação de CPR Verde</TableCell>
                        <TableCell className="text-center">
                          <BiData className="w-5 h-5 mx-auto text-yellow-500" />
                        </TableCell>
                        <TableCell>Pedido de Ajuste entre Contas</TableCell>
                        <TableCell className="text-center">
                          <FaArrowRightArrowLeft className="w-5 h-5 mx-auto text-yellow-500" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Pedido de Transferência Akses</TableCell>
                        <TableCell className="text-center">
                          <BiSolidCartAlt className="w-5 h-5 mx-auto text-yellow-500" />
                        </TableCell>
                        <TableCell>Pedido de Selo SaaS</TableCell>
                        <TableCell className="text-center">
                          <BsPatchCheck className="w-5 h-5 mx-auto text-yellow-500" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Taxa de Certificado – Cliente</TableCell>
                        <TableCell className="text-center">
                          <FiCoffee className="w-5 h-5 mx-auto text-yellow-500" />
                        </TableCell>
                        <TableCell>Tesouro Verde Akses</TableCell>
                        <TableCell className="text-center">
                          <BsPatchCheck className="w-5 h-5 mx-auto text-yellow-500" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Certificado – Cliente</TableCell>
                        <TableCell className="text-center">
                          <BsPatchCheck className="w-5 h-5 mx-auto text-yellow-500" />
                        </TableCell>
                        <TableCell>Registro de CPR Verde</TableCell>
                        <TableCell className="text-center">
                          <RiBook2Line className="w-5 h-5 mx-auto text-yellow-500" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Certificado SaaS BMV (Akses)</TableCell>
                        <TableCell className="text-center">
                          <BsPatchCheck className="w-5 h-5 mx-auto text-yellow-500" />
                        </TableCell>
                        <TableCell>Particionamento</TableCell>
                        <TableCell className="text-center">
                          <BiLeaf className="w-5 h-5 mx-auto text-yellow-500" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Pedido de compra AKSES</TableCell>
                        <TableCell className="text-center align-middle">
                          <div className="flex items-center justify-center">
                            <BsCartPlusFill size={20} className="text-yellow-500" />
                          </div>
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell className="text-center"></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <p className="text-sm text-muted-foreground mt-2 text-justify">
                  No sistema legado, cada uma dessas movimentações é corretamente classificada na coluna Tipo, possui ícone específico e conta com legenda funcional alinhada às regras de negócio e impactos financeiros.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Situação no Sistema Atual</h4>
                <p className="text-justify mb-2">O sistema atual não implementa:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Tags RES / DIS / APO visíveis</li>
                  <li>Ícones por tipo de transação</li>
                  <li>Distinção clara entre saldo de origem e destino</li>
                  <li>Legenda funcional padronizada</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Impacto</h4>
                <p className="text-justify mb-2">Essa padronização ausente ou incompleta resulta em:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Perda de clareza semântica sobre a natureza das transações</li>
                  <li>Dificuldade de leitura operacional</li>
                  <li>Maior dependência de conhecimento tácito</li>
                  <li>Alto risco de erro humano</li>
                  <li>Fragilidade nos processos de auditoria, conciliação e rastreabilidade</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Enquadramento e Recomendação</h4>
                <p className="text-justify mb-2">
                  A ausência de identificação adequada do tipo de movimentação compromete diretamente:
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-3">
                  <li>A governança transacional</li>
                  <li>A integridade da leitura dos dados</li>
                  <li>A capacidade de auditoria técnica e financeira</li>
                  <li>A escalabilidade operacional da plataforma</li>
                </ul>
                <Alert>
                  <AlertDescription>
                    <strong>Recomendação:</strong> Reimplementar integralmente, no sistema atual, o modelo adotado no sistema legado para a coluna <strong>Tipo</strong>, garantindo:
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Classificação clara e inequívoca de cada movimentação</li>
                      <li>Associação obrigatória de ícones padronizados</li>
                      <li>Inclusão de legenda funcional visível e consistente</li>
                      <li>Alinhamento total com as regras de negócio e impactos nos estados de saldo</li>
                    </ul>
                    <p className="mt-2"><strong>Este ajuste deve ser tratado como correção estrutural de governança e rastreabilidade, e não como melhoria estética ou opcional.</strong></p>
                  </AlertDescription>
                </Alert>
              </div>
              <div className="bg-muted p-4 rounded-lg space-y-4">
                <p className="text-sm font-semibold mb-2">Evidência Visual:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <EvidenceImage imageId="ev-03-legado1" />
                  <EvidenceImage imageId="ev-03-atual1" />
                  <EvidenceImage imageId="ev-03-legado2" />
                  <EvidenceImage imageId="ev-03-atual2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* EV-04 */}
          <Card className="mb-6">
            <CardHeader className="bg-muted/50">
              <CardTitle className="text-xl flex items-center gap-3">
                <Badge variant="destructive">EV-04</Badge>
                <span>Reenvio de Documentos Mantendo Status "Recusado"</span>
              </CardTitle>
              <div className="flex gap-4 text-sm mt-2">
                <span><strong>Módulo:</strong> Gestão Documental</span>
                <span><strong>Tipo:</strong> Erro funcional / Fluxo quebrado</span>
                <span><strong>Severidade:</strong> <Badge variant="destructive">Alta</Badge></span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <h4 className="font-semibold mb-2">Descrição</h4>
                <p className="text-justify">
                  Documentos recusados, ao serem reenviados, permanecem congelados no status "Recusado", sem retornar para "Pendente de Aprovação".
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Impacto</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Bloqueio completo de processos</li>
                  <li>Retrabalho manual</li>
                  <li>Atrasos regulatórios</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Análise Técnica</h4>
                <p className="text-justify">
                  Falha na máquina de estados do workflow documental.
                </p>
              </div>

              <Alert>
                <AlertDescription>
                  <strong>Recomendação:</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Corrigir transição Recusado → Pendente</li>
                    <li>Implementar histórico de versões</li>
                    <li>Tratar como correção crítica</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-semibold mb-2">Evidência Visual:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <EvidenceImage imageId="ev-04-atual" />
                  <EvidenceImage imageId="ev-04-atual2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* EV-05 */}
          <Card className="mb-6">
            <CardHeader className="bg-muted/50">
              <CardTitle className="text-xl flex items-center gap-3">
                <Badge className="bg-orange-500">EV-05</Badge>
                <span>Ausência de Indicação de Campos Obrigatórios</span>
              </CardTitle>
              <div className="flex gap-4 text-sm mt-2">
                <span><strong>Módulo:</strong> Cadastro de Usuários</span>
                <span><strong>Tipo:</strong> Usabilidade / Governança de Dados</span>
                <span><strong>Severidade:</strong> <Badge className="bg-orange-500">Média</Badge></span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <h4 className="font-semibold mb-2">Descrição</h4>
                <p className="text-justify">
                  Campos obrigatórios não são sinalizados (asterisco), exceto CPF. Erros não indicam qual campo está faltando (ex.: CEP).
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Impacto</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Cadastro confuso</li>
                  <li>Erros recorrentes</li>
                  <li>Dependência de suporte</li>
                </ul>
              </div>

              <Alert>
                <AlertDescription>
                  <strong>Recomendação:</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Marcação visual obrigatória</li>
                    <li>Mensagens de erro contextualizadas</li>
                    <li>Paridade com sistema legado</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-semibold mb-2">Evidência Visual:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <EvidenceImage imageId="ev-05-atual" />
                  <EvidenceImage imageId="ev-05-legado" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* EV-06 */}
          <Card className="mb-6">
            <CardHeader className="bg-muted/50">
              <CardTitle className="text-xl flex items-center gap-3">
                <Badge className="bg-orange-500">EV-06</Badge>
                <span>Exibição Indevida do Campo "ID Transação NXT"</span>
              </CardTitle>
              <div className="flex gap-4 text-sm mt-2">
                <span><strong>Módulo:</strong> Certificados → Detalhes</span>
                <span><strong>Tipo:</strong> Governança / Usabilidade</span>
                <span><strong>Severidade:</strong> <Badge className="bg-orange-500">Média</Badge></span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <h4 className="font-semibold mb-2">Descrição</h4>
                <p className="text-justify">
                  Campo "ID Transação NXT" é exibido sem função operacional, mesmo após solicitação formal de remoção.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Impacto</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Confusão conceitual</li>
                  <li>Ruído visual</li>
                  <li>Dívida técnica</li>
                </ul>
              </div>

              <Alert>
                <AlertDescription>
                  <strong>Recomendação:</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Remoção imediata do campo</li>
                    <li>Curadoria da interface</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-semibold mb-2">Evidência Visual:</p>
                <EvidenceImage imageId="ev-06-atual" />
              </div>
            </CardContent>
          </Card>

          {/* EV-07 */}
          <Card className="mb-6">
            <CardHeader className="bg-muted/50">
              <CardTitle className="text-xl flex items-center gap-3">
                <Badge variant="destructive">EV-07</Badge>
                <span>Filtro Inoperante em Pedidos de Certificado SaaS</span>
              </CardTitle>
              <div className="flex gap-4 text-sm mt-2">
                <span><strong>Módulo:</strong> SaaS Tesouro Verde → Pedidos de Certificado</span>
                <span><strong>Tipo:</strong> Governança / Busca</span>
                <span><strong>Severidade:</strong> <Badge variant="destructive">Alta</Badge></span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <h4 className="font-semibold mb-2">Descrição</h4>
                <p className="text-justify">
                  Campo de busca não reage à digitação e não filtra por nome, documento ou ID, diferentemente do sistema legado.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Impacto</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Localização inviável de pedidos</li>
                  <li>Perda de rastreabilidade</li>
                  <li>Baixa escalabilidade</li>
                </ul>
              </div>

              <Alert>
                <AlertDescription>
                  <strong>Recomendação:</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Implementar busca incremental</li>
                    <li>Filtros explícitos e documentados</li>
                    <li>Indexação adequada no backend</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-semibold mb-2">Evidência Visual:</p>
                <EvidenceImage imageId="ev-07-atual-legado" />
              </div>
            </CardContent>
          </Card>

          {/* EV-08 */}
          <Card className="mb-6">
            <CardHeader className="bg-muted/50">
              <CardTitle className="text-xl flex items-center gap-3">
                <Badge variant="destructive">EV-08</Badge>
                <span>Inconsistência nos Cálculos de DARE e Royalties</span>
              </CardTitle>
              <div className="flex gap-4 text-sm mt-2">
                <span><strong>Módulo:</strong> Tesouro Verde → DARE / Royalties</span>
                <span><strong>Tipo:</strong> Erro funcional / Financeiro</span>
                <span><strong>Severidade:</strong> <Badge variant="destructive">Alta</Badge></span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <h4 className="font-semibold mb-2">Descrição</h4>
                <p className="text-justify mb-2">
                  Os valores de DARE e Royalties no sistema atual divergem do sistema legado, apresentando inconsistência matemática entre:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>UCS</li>
                  <li>Valores unitários</li>
                  <li>TOTAL PUB / TOTAL PRI</li>
                  <li>Percentuais aplicados</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Impacto</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Risco fiscal e regulatório</li>
                  <li>Inviabiliza auditoria financeira</li>
                  <li>Perda de confiabilidade do sistema</li>
                </ul>
              </div>

              <Alert variant="destructive">
                <AlertDescription>
                  <strong>Recomendação:</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Revisar lógica de cálculo</li>
                    <li>Garantir paridade com legado</li>
                    <li>Implementar testes automatizados</li>
                    <li><strong>Bloquear homologação enquanto persistir</strong></li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="bg-muted p-4 rounded-lg space-y-4">
                <p className="text-sm font-semibold mb-2">Evidência Visual:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <EvidenceImage imageId="ev-08-legado" />
                  <EvidenceImage imageId="ev-08-atual" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* EV-09 */}
          <Card className="mb-6">
            <CardHeader className="bg-muted/50">
              <CardTitle className="text-xl flex items-center gap-3">
                <Badge variant="destructive">EV-09</Badge>
                <span>Ausência de Acesso Simples a Logs de Auditoria e Rastreabilidade de Ações</span>
              </CardTitle>
              <div className="flex gap-4 text-sm mt-2">
                <span><strong>Módulo:</strong> Governança / Segurança / Auditoria</span>
                <span><strong>Tipo:</strong> Governança de Dados / Rastreabilidade</span>
                <span><strong>Severidade:</strong> <Badge variant="destructive">Alta</Badge></span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <h4 className="font-semibold mb-2">Descrição</h4>
                <p className="text-justify">
                  Apesar de o sistema possuir um modelo robusto de usuários e permissões, <strong>não foi identificado, de forma simples e acessível</strong>, nenhum módulo ou funcionalidade que permita consultar logs de auditoria das ações realizadas no sistema (quem fez, o quê, quando).
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Análise Técnica</h4>
                <p className="text-justify mb-2">
                  Não é possível verificar de maneira objetiva:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Qual usuário realizou determinada transação (ex.: inserção ou ajuste de UCF);</li>
                  <li>Data e horário exatos da ação;</li>
                  <li>Origem da alteração (interface, fluxo, módulo).</li>
                </ul>
                <p className="text-justify mt-3">
                  Ainda que o mecanismo de log exista internamente, sua <strong>não exposição operacional caracteriza falha de governança</strong>, pois inviabiliza o uso prático da informação para controle, auditoria e responsabilização.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Impacto</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Perda de rastreabilidade transacional;</li>
                  <li>Impossibilidade de auditoria operacional efetiva;</li>
                  <li>Dificuldade de apuração de erros ou inconsistências;</li>
                  <li>Risco elevado de não conformidade regulatória e operacional.</li>
                </ul>
              </div>

              <Alert variant="destructive">
                <AlertDescription>
                  <strong>Recomendação:</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Implementar (ou expor) módulo dedicado de <strong>Logs de Auditoria</strong>, com acesso controlado;</li>
                    <li>Garantir registro mínimo de: usuário, ação, entidade afetada, valores antes/depois, data e hora;</li>
                    <li>Disponibilizar consulta simples por filtros (usuário, período, tipo de ação);</li>
                    <li><strong>Tratar como correção estrutural de governança, não como melhoria opcional.</strong></li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="bg-muted p-4 rounded-lg space-y-4">
                <p className="text-sm font-semibold mb-2">Evidência Visual:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <EvidenceImage imageId="ev-09-admin" />
                  <EvidenceImage imageId="ev-09-legado-log" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 4. Considerações Finais */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">4. Considerações Finais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-justify">
              As evidências apresentadas demonstram falhas estruturais, funcionais e de governança, algumas de natureza crítica impeditiva, especialmente nos módulos financeiros, de movimentações e rastreabilidade.
            </p>

            <Alert>
              <AlertDescription className="text-justify">
                Este anexo integra o dossiê técnico oficial e deve ser analisado em conjunto com os demais anexos para decisão sobre:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Correções imediatas</li>
                  <li>Reengenharia</li>
                  <li>Ou substituição da solução tecnológica</li>
                </ul>
              </AlertDescription>
            </Alert>

            <div className="border-t pt-4 mt-6 text-sm text-muted-foreground">
              <p><strong>Data:</strong> Janeiro/2026</p>
              <p><strong>Versão:</strong> 1.0</p>
              <p><strong>Documento:</strong> ANEXO I – Evidências Técnicas e Operacionais</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AnexoLayout>
  );
}
