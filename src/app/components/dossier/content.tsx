"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { slugify } from "@/lib/utils";
import React from 'react';
import { motion } from 'framer-motion';
import { useDossierSearch } from '@/hooks/useDossierSearch';

export const sections = [
  {
    title: "Capa",
    content: (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-3 text-justify">
                Avaliação do Sistema Backoffice BMV.Global
            </h1>
            
            <h3 className="text-lg sm:text-xl font-semibold text-muted-foreground mb-4">
                <span className="block mb-1">Relatório Formal de Não Conformidades,</span>
                <span className="block mb-1">Riscos Operacionais, Tecnológicos e Jurídicos</span>
                <span className="block">e Diretrizes Estruturais de Evolução</span>
            </h3>

            <p className="text-justify mb-4">
                Material destinado à análise técnica, operacional, jurídica e estratégica da plataforma tecnológica BMV,
                com objetivo de subsidiar a tomada de decisão executiva, governança sistêmica, avaliação de riscos
                institucionais e direcionamento de ações estruturais corretivas.
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground pt-3 border-t max-w-4xl mx-auto justify-center">
                <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"></span>
                    Análise Técnica
                </span>
                <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"></span>
                    Operacional
                </span>
                <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"></span>
                    Jurídica
                </span>
                <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"></span>
                    Estratégica
                </span>
            </div>
        </div>
    )
  },
  {
    title: 'Objeto da Avaliação',
    content: (
      <>
        <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("Sistemas Avaliados")}>Sistemas Avaliados</h3>
        <ul className="list-disc pl-6 space-y-1 mb-4 text-justify">
          <li>Sistema Atual (Backoffice) — <a href="https://backoffice.bmv.global" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://backoffice.bmv.global</a></li>
          <li>Sistema Legado (Backoffice) — <a href="https://legado-backoffice.bmv.global" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://legado-backoffice.bmv.global</a></li>
        </ul>
        <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("Fornecedor Avaliado")}>Fornecedor Avaliado</h3>
        <ul className="list-disc pl-6 space-y-1 text-justify">
          <li>Multiledgers — <a href="https://multiledgers.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://multiledgers.com</a></li>
        </ul>
      </>
    ),
  },
  {
    title: 'Escopo da Avaliação',
    content: (
      <ul className="list-disc pl-6 space-y-2 text-justify">
        <li>Módulos Funcionais e Operacionais</li>
        <li>Governança de Dados, Identidade e Rastreabilidade</li>
        <li>Usabilidade e Aderência ao Sistema Legado</li>
        <li>Riscos Técnicos, Operacionais, Financeiros e Jurídicos</li>
        <li>Lacunas Funcionais e Ausência de Componentes Críticos</li>
        <li>Análise Comparativa entre Sistema Atual e Legado</li>
      </ul>
    ),
  },
  {
    title: 'Responsabilidade Técnica',
    content: (
      <>
        <p className="text-justify"><strong>Área:</strong> Tecnologia da Informação/Gestão Operacional</p>
        <p className="text-justify"><strong>Responsável:</strong> Luiz Paulo Gonçalves Miguel de Jesus</p>
        <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("Data de Emissão")}>Data de Emissão</h3>
        <p className="text-justify">05 de janeiro de 2026</p>
      </>
    ),
  },
    {
    title: 'Nota Técnica',
    content: (
        <p className="text-justify">
            Este dossiê possui caráter técnico, deliberativo e auditável, fundamentado em evidências observáveis em
            ambiente produtivo, análises comparativas com o sistema legado e registros documentais anexos. Seu conteúdo
            pode subsidiar decisões estratégicas, contratuais, operacionais e jurídicas, bem como ações de
            reestruturação tecnológica.
        </p>
    )
    },
    {
    title: 'Sumário Executivo',
    content: (
        <>
        <p className="italic mb-4 text-justify">(Leitura Obrigatória)</p>
        <p className="mb-4 text-justify">
            Este relatório técnico tem como objetivo consolidar, de forma estruturada, rastreável e auditável,
            os principais pontos críticos identificados no sistema BMV (<a href="https://backoffice.bmv.global" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://backoffice.bmv.global</a>), desenvolvido pela Multiledgers. A análise contempla não conformidades técnicas, falhas de concepção,
            erros de lógica, lacunas operacionais, riscos de escalabilidade e fragilidades relevantes de governança,
            todos com impacto direto na continuidade operacional, na confiabilidade dos processos e na credibilidade
            institucional da BMV.
        </p>
        <p className="mb-4 text-justify">
            O sistema BMV, elemento central para a operação da organização, foi concebido e implementado a partir de
            uma replicação direta do sistema legado, sem que tivesse sido conduzida uma reengenharia estrutural
            adequada dos fluxos operacionais, das regras de negócio e da arquitetura tecnológica subjacente.
        </p>
        <p className="mb-4 text-justify">Como consequência direta dessa abordagem de “cópia e adaptação”, o sistema atual apresenta os seguintes efeitos combinados e críticos:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
            <li>Reprodução integral de problemas históricos já conhecidos no sistema legado;</li>
            <li>Manutenção de ineficiências estruturais previamente identificadas e não tratadas;</li>
            <li>Introdução de novos riscos operacionais, técnicos e de segurança, decorrentes da ausência de modernização arquitetural e de governança sistêmica adequada.</li>
        </ul>
        <p className="mb-4 text-justify">
            Essa combinação compromete a maturidade tecnológica da plataforma e impede que o sistema atenda aos
            requisitos mínimos exigidos pelo modelo de negócio da BMV, especialmente nos seguintes eixos críticos:
        </p>
        <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("Automação")}>Automação</h3>
        <p className="mb-4 text-justify">
            Funcionalidades essenciais dependem excessivamente de processos manuais, resultando em lentidão operacional,
            maior propensão a falhas humanas e uso ineficiente de recursos, impactando diretamente a produtividade e a
            previsibilidade da operação.
        </p>
        <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("Escalabilidade")}>Escalabilidade</h3>
        <p className="mb-4 text-justify">
            A arquitetura do sistema não foi projetada para sustentar crescimento consistente de volume transacional,
            base de usuários ou complexidade operacional, criando limitações estruturais à expansão segura e sustentável
            do negócio.
        </p>
        <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("Governança e Rastreabilidade")}>Governança e Rastreabilidade</h3>
        <p className="mb-4 text-justify">
            Foram identificadas deficiências relevantes nos mecanismos de auditoria, rastreabilidade de ações e controle
            do ciclo de vida de dados e transações, comprometendo a governança, a gestão de riscos e o atendimento a
            potenciais exigências regulatórias, contratuais e institucionais.
        </p>
        <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("Confiabilidade Operacional")}>Confiabilidade Operacional</h3>
        <p className="text-justify">
            A base tecnológica e a lógica sistêmica apresentam fragilidades que afetam diretamente a previsibilidade, a
            estabilidade e a integridade das operações, ampliando o risco de falhas operacionais e inconsistências
            sistêmicas.
        </p>
        </>
    )
    },
    {
    title: 'Propósito e Público-Alvo do Documento',
    content: (
        <>
            <p className="mb-4 text-justify">
                Este Dossiê Técnico de Avaliação foi elaborado para subsidiar decisões estratégicas, táticas e estruturais
                no mais alto nível da organização, constituindo-se como instrumento formal de governança, cobrança técnica,
                mitigação de riscos e suporte à tomada de decisão.
            </p>
            <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("Destinatários Primários")}>Destinatários Primários</h3>
            <ul className="list-disc pl-6 space-y-4 mb-4 text-justify">
                <li>
                <strong>Diretoria Executiva</strong><br/>
                Suporte à tomada de decisão sobre investimentos, priorização estratégica e direcionamento tecnológico.
                </li>
                <li>
                <strong>Comitê Decisório</strong><br/>
                Avaliação, aprovação e acompanhamento de planos de ação corretivos e estratégias de mitigação de riscos sistêmicos.
                </li>
                <li>
                <strong>Área Técnica / Tecnologia da Informação</strong><br/>
                Definição de requisitos estruturais, padrões mínimos de qualidade, arquitetura, governança e critérios objetivos de evolução do sistema.
                </li>
                <li>
                <strong>Área Jurídica</strong><br/>
                Análise de riscos contratuais, de conformidade, responsabilidade e aderência do fornecedor às obrigações técnicas assumidas.
                </li>
            </ul>
        </>
    )
    },
    {
    title: 'Finalidade Estratégica do Dossiê',
    content: (
        <>
            <p className="mb-4 text-justify">Além de seu caráter técnico, este documento constitui a base formal e auditável para:</p>
            <ul className="list-disc pl-6 space-y-2 text-justify">
                <li>Alinhamento estratégico interno, assegurando compreensão clara e homogênea da criticidade do cenário atual por todos os stakeholders;</li>
                <li>Cobrança técnica rigorosa do fornecedor, fundamentada em evidências objetivas, critérios mensuráveis e princípios de governança;</li>
                <li>Avaliação de renegociação, reestruturação ou eventual redefinição contratual, caso se conclua que o modelo vigente não atende aos requisitos mínimos de segurança, escalabilidade, confiabilidade e governança exigidos pela BMV.</li>
            </ul>
        </>
    )
    },
    {
        title: '1. Objetivo do Dossiê: Propósito e Aplicações',
        content: (
            <>
                <p className="mb-4 text-justify">
                    O presente documento tem como finalidade estabelecer uma base informacional sólida, técnica e verificável
                    para a gestão, correção e evolução do sistema BMV, contemplando os seguintes objetivos centrais:
                </p>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("Registro Formal de Não Conformidades")}>Registro Formal de Não Conformidades</h3>
                <p className="mb-4 text-justify">Catalogar, de forma estruturada, todas as falhas, inconsistências, bugs e deficiências identificadas no sistema.</p>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("Identificação e Classificação de Riscos")}>Identificação e Classificação de Riscos</h3>
                <p className="mb-4 text-justify">Expor e analisar os riscos inerentes à operação da plataforma, abrangendo dimensões operacionais, tecnológicas, financeiras e jurídicas.</p>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("Suporte à Decisão Estratégica")}>Suporte à Decisão Estratégica</h3>
                <p className="mb-4 text-justify">Constituir acervo documental apto a subsidiar decisões estratégicas de alto impacto, com base técnica e evidencial.</p>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("Referencial para Intervenções Estruturais")}>Referencial para Intervenções Estruturais</h3>
                <p className="text-justify">Servir como padrão técnico e ponto de partida para correções pontuais, projetos de reengenharia profunda ou eventual substituição integral do sistema.</p>
            </>
        )
    },
    {
        title: '2. Contexto Geral do Sistema BMV',
        content: (
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="w-[30%]">Característica</TableHead>
                        <TableHead>Descrição Técnica Avaliada</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">Sistema Avaliado</TableCell>
                        <TableCell>Plataforma BMV (Backoffice)</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Fornecedor</TableCell>
                        <TableCell>Multiledgers</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Origem da Solução</TableCell>
                        <TableCell>Replicação direta de sistema legado, sem reengenharia estrutural dos fluxos, regras de negócio ou arquitetura tecnológica</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Estado Operacional</TableCell>
                        <TableCell>Sistema em produção, com elevada dependência operacional, forte acoplamento a processos manuais e baixa resiliência a falhas</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Proposta Técnica Original</TableCell>
                        <TableCell>Plataforma automatizada, escalável, integrada à tecnologia blockchain e orientada à tokenização de ativos</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Estado Real Identificado</TableCell>
                        <TableCell>Plataforma com necessidade recorrente de intervenção manual, automação insuficiente, limitações estruturais de escalabilidade e maturidade técnica incompatível com a proposta original</TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
            </div>
        )
    },
    {
        title: '3. Metodologia de Avaliação',
        content: (
            <>
                <p className="mb-4 text-justify">
                    A avaliação do Sistema BMV foi conduzida a partir de uma abordagem técnica, prática e comparativa, com foco
                    na identificação de não conformidades estruturais, riscos operacionais e lacunas de governança, evitando
                    análises teóricas ou desconectadas da realidade operacional. Foram adotados os seguintes métodos:
                </p>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("Utilização em Ambiente Produtivo")}>Utilização em Ambiente Produtivo</h3>
                <p className="mb-4 text-justify">Análise do sistema em uso real, considerando cenários operacionais efetivamente executados pelas equipes internas e clientes, permitindo a identificação de fragilidades práticas e recorrentes.</p>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("Análise Comparativa com o Sistema Legado")}>Análise Comparativa com o Sistema Legado</h3>
                <p className="mb-4 text-justify">Verificação sistemática das funcionalidades, fluxos e regras de negócio do sistema atual em contraste com o sistema legado, com foco em perdas funcionais, divergências conceituais e regressões operacionais.</p>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("Estudo dos Fluxos Operacionais")}>Estudo dos Fluxos Operacionais</h3>
                <p className="mb-4 text-justify">Avaliação dos fluxos críticos de negócio, identificando pontos de intervenção manual, dependências externas, quebras de automação e fragilidades de rastreabilidade.</p>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("Observação Técnica Direta")}>Observação Técnica Direta</h3>
                <p className="mb-4 text-justify">Registro técnico das limitações estruturais, inconsistências funcionais e lacunas de governança observadas durante a operação, sem a utilização de inferências ou hipóteses não verificáveis.</p>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("Referência aos Anexos")}>Referência aos Anexos</h3>
                <p className="text-justify">Os fluxos detalhados, exemplos práticos, registros operacionais e evidências técnicas que fundamentam esta metodologia encontram-se consolidados no Anexo I – Evidências Técnicas e Operacionais e no Anexo II – Matriz de Paridade Funcional (Sistema Legado x Sistema Atual).</p>
            </>
        )
    },
    {
        title: '4. Panorama dos Desafios Identificados',
        content: (
            <>
                <p className="mb-4 text-justify">
                    Os desafios identificados ao longo da avaliação foram organizados em macroáreas temáticas, com o objetivo de
                    facilitar a leitura executiva, o enquadramento de riscos e a definição de prioridades estratégicas. As não
                    conformidades e lacunas observadas concentram-se nas seguintes áreas:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
                    <li><strong>Fundação e Legado:</strong> Aspectos estruturais relacionados à arquitetura herdada e à ausência de reengenharia sistêmica.</li>
                    <li><strong>Processos e Automação:</strong> Fragilidades nos fluxos transacionais e dependência excessiva de intervenções manuais.</li>
                    <li><strong>Tecnologia Blockchain:</strong> Limitações na integração, automação e uso efetivo da blockchain como componente estrutural do sistema.</li>
                    <li><strong>Governança de Dados e Identidade:</strong> Problemas de unificação de identidade, rastreabilidade e consistência dos dados.</li>
                    <li><strong>Cadastro e Gestão de Usuários:</strong> Inconsistências cadastrais, ausência de ciclo de vida adequado e lacunas de governança.</li>
                    <li><strong>Movimentações, Saldos e Rastreabilidade:</strong> Divergências conceituais, perda de padronização e dificuldades de auditoria.</li>
                    <li><strong>Conformidade e Fluxos de Aprovação:</strong> Fragilidades nos controles documentais e nos processos de validação.</li>
                    <li><strong>Acesso e Operação Interna:</strong> Aspectos relacionados ao uso do sistema pelo back-office e à execução operacional.</li>
                    <li><strong>Usabilidade e Experiência do Usuário:</strong> Barreiras de interação que elevam o risco operacional e o retrabalho.</li>
                    <li><strong>Sustentação e Governança Operacional:</strong> Deficiências no suporte técnico, ausência de SLA e fragilidade na governança do serviço.</li>
                </ul>
                <p className="text-justify"><strong>Referência aos Anexos:</strong> A relação completa de não conformidades, exemplos práticos e impactos associados a cada área está detalhada nos Anexos I, II e III.</p>
            </>
        )
    },
    {
        title: '5. Arquitetura e Herança do Sistema Legado',
        content: (
            <>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("5.1 Replicação sem Reengenharia")}>5.1 Replicação sem Reengenharia</h3>
                <p className="mb-4 text-justify">
                    O sistema atual foi concebido a partir de uma replicação direta das estruturas, lógicas e conceitos do
                    sistema legado, sem a realização de uma reengenharia profunda que considerasse os novos requisitos de escala,
                    automação e governança do modelo de negócio da BMV. Essa abordagem manteve limitações históricas e transferiu
                    fragilidades estruturais para o novo ambiente tecnológico.
                </p>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("5.2 Consequências Estruturais")}>5.2 Consequências Estruturais</h3>
                <p className="mb-4 text-justify">Como consequência direta dessa herança não reestruturada, foram observados:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
                    <li>Acúmulo significativo de dívida técnica;</li>
                    <li>Fragilidade no processo de evolução e manutenção do sistema;</li>
                    <li>Dependência recorrente de operações manuais;</li>
                    <li>Baixa adaptabilidade a cenários de crescimento.</li>
                </ul>
                <p className="text-justify"><strong>Referência aos Anexos:</strong> A análise comparativa entre arquitetura legada e atual encontra-se detalhada no Anexo II – Matriz de Paridade Funcional.</p>
            </>
        )
    },
    {
        title: '6. Otimização do Fluxo Transacional (Ponto Crítico do Sistema)',
        content: (
            <>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("6.1 Visão Geral do Fluxo Atual (AS-IS)")}>6.1 Visão Geral do Fluxo Atual (AS-IS)</h3>
                <p className="mb-4 text-justify">
                    Além dos fluxos de movimentação de saldo, observa-se fragilidade estrutural semelhante no processo de
                    solicitação e emissão da CDE – Certidão de Disponibilidade de Estoque, apesar da existência de uma página
                    dedicada no sistema. O fluxo atual permanece majoritariamente manual e externo ao sistema, com dependência de
                    e-mail, aprovações humanas sequenciais e emissão de boleto fora da plataforma.
                </p>
                <p className="mb-4 text-justify"><strong>Fluxo AS-IS – Solicitação de CDE:</strong></p>
                <ol className="list-decimal pl-6 space-y-2 mb-4 text-justify">
                    <li>Cliente realiza a solicitação por e-mail;</li>
                    <li>Back-office (BMV) analisa e solicita aprovação interna;</li>
                    <li>Emissão manual de boleto via plataforma externa (OMIE);</li>
                    <li>Cliente realiza o pagamento fora do sistema;</li>
                    <li>Após confirmação manual, a CDE é emitida e enviada por e-mail.</li>
                </ol>
                <p className="mb-4 text-justify">
                    Esse modelo não configura uma jornada digital, apesar da existência de interface sistêmica, caracterizando
                    uma funcionalidade incompleta e não operacionalizada.
                </p>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("6.2 Análise Técnica e Operacional")}>6.2 Análise Técnica e Operacional</h3>
                <p className="mb-4 text-justify">O fluxo atual de CDE apresenta os seguintes problemas críticos:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
                    <li>Dependência integral de canais externos (e-mail e plataforma de cobrança);</li>
                    <li>Ausência de integração sistêmica com meios de pagamento;</li>
                    <li>Falta de vínculo automático entre solicitação, boleto, compensação bancária e emissão da certidão;</li>
                    <li>Necessidade de validação manual pós-pagamento;</li>
                    <li>Back-office atuando como executor, e não como supervisor.</li>
                </ul>
                <p className="mb-4 text-justify">Apesar da existência da página de solicitação no sistema, o fluxo não é end-to-end, o que compromete seu propósito funcional.</p>

                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("6.3 Enquadramento como Não Conformidade Estrutural")}>6.3 Enquadramento como Não Conformidade Estrutural</h3>
                <p className="mb-4 text-justify">A situação observada no fluxo de CDE não pode ser classificada como limitação pontual ou melhoria futura, pois:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
                    <li>O processo já possui interface dedicada;</li>
                    <li>A expectativa funcional já está implicitamente criada para o usuário;</li>
                    <li>O modelo atual viola princípios mínimos de automação transacional, rastreabilidade, escalabilidade e governança financeira.</li>
                </ul>
                <p className="mb-4 text-justify">Trata-se, portanto, de não conformidade estrutural, equivalente aos fluxos de movimentação de saldo e pedidos de certificados.</p>

                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("6.4 Diretriz de Correção (TO-BE)")}>6.4 Diretriz de Correção (TO-BE)</h3>
                <p className="mb-4 text-justify">O fluxo ideal de solicitação de CDE deve ser reestruturado para operar integralmente dentro da plataforma, contemplando:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
                    <li>Solicitação realizada diretamente na carteira do cliente;</li>
                    <li>Aprovação sistêmica ou administrativa registrada no sistema;</li>
                    <li>Emissão automática de boleto via integração API (ex.: OMIE ou provedor equivalente);</li>
                    <li>Disponibilização imediata do boleto ao cliente na plataforma;</li>
                    <li>Monitoramento automático da compensação bancária;</li>
                    <li>Emissão automática da CDE após confirmação de pagamento;</li>
                    <li>Atuação do back-office restrita a exceções e auditoria.</li>
                </ul>
                <p className="mb-4 text-justify">O papel do back-office deve ser supervisório, e não operacional.</p>

                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("6.5 Integração com Meios de Pagamento (Ponto Crítico)")}>6.5 Integração com Meios de Pagamento (Ponto Crítico)</h3>
                <p className="mb-4 text-justify">A manutenção da emissão de boletos fora do sistema representa:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
                    <li>Risco operacional elevado;</li>
                    <li>Quebra de rastreabilidade financeira;</li>
                    <li>Fragilidade na conciliação;</li>
                    <li>Dependência excessiva de validação manual.</li>
                </ul>
                <p className="mb-4 text-justify">Recomenda-se a integração via API com o provedor de cobrança atualmente utilizado (OMIE) ou equivalente, garantindo:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
                    <li>Vínculo direto entre solicitação e pagamento;</li>
                    <li>Confirmação automática da compensação;</li>
                    <li>Gatilhos sistêmicos para liberação da CDE;</li>
                    <li>Registro auditável de todo o ciclo financeiro.</li>
                </ul>
                <p className="text-justify"><strong>Referência aos Anexos:</strong> Os fluxos AS-IS e TO-BE da solicitação de CDE encontram-se documentados no Anexo I – Evidências Técnicas e Operacionais, juntamente com os fluxos de intenção de movimentação e pedidos de certificados.</p>
            </>
        )
    },
    {
        title: '7. Blockchain e Wallets – Análise Estrutural Integrada',
        content: (
            <>
                <p className="italic mb-4 text-justify">(Com referência visual aos fluxos operacionais – AS-IS x TO-BE)</p>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("7.1 Visão Geral e Enquadramento Técnico")}>7.1 Visão Geral e Enquadramento Técnico</h3>
                <p className="mb-4 text-justify">
                    A Blockchain constitui pilar central do modelo de negócio da BMV, sendo a base conceitual da tokenização das UCSs, da rastreabilidade das transações e da confiabilidade do sistema. No entanto, a análise técnica do sistema atual evidencia que essa tecnologia não está integrada de forma estrutural ao core transacional da plataforma.
                </p>
                <p className="mb-4 text-justify">
                    Conforme ilustrado na Figura 1 – Jornada das UCSs no Sistema BMV (AS-IS) versus Jornada das UCSs na Blockchain (TO-BE), observa-se uma dissociação clara entre os fluxos operacionais internos do sistema e a camada blockchain, resultando em processos fragmentados, dependentes de intervenção manual e sem rastreabilidade automática ponta a ponta.
                </p>
                <p className="mb-4 text-justify"><strong>Figura 1 – Jornada das UCSs no Sistema BMV (AS-IS) x Jornada das UCSs na Blockchain (TO-BE)</strong><br/>(Fluxograma anexo elaborado pela equipe técnica da BMV)</p>

                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("7.2 Uso Atual da Blockchain (Modelo AS-IS)")}>7.2 Uso Atual da Blockchain (Modelo AS-IS)</h3>
                <p className="mb-4 text-justify">
                    No modelo atualmente implementado, a Blockchain é utilizada de forma passiva e registral, atuando apenas como repositório posterior de informações, sem participação ativa na automação, validação ou governança das operações.
                </p>
                <p className="mb-4 text-justify">
                    De acordo com o fluxo superior apresentado na Figura 1 (Jornada das UCSs dentro do Sistema BMV), o ciclo de vida das UCSs ocorre majoritariamente fora da Blockchain, passando por etapas como:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
                    <li>Geração de Safra</li>
                    <li>Particionamento interno</li>
                    <li>Custódia</li>
                    <li>Trading / Investimento</li>
                    <li>Transferências</li>
                    <li>Fila de Vendas</li>
                    <li>Aposentadoria</li>
                </ul>
                <p className="mb-4 text-justify">Nesse modelo:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
                    <li>O particionamento das UCSs ocorre internamente no sistema;</li>
                    <li>A distribuição entre produtor, BMV e associação não é refletida automaticamente na Blockchain;</li>
                    <li>As wallets não são criadas de forma sistêmica;</li>
                    <li>A atualização de saldos e registros blockchain depende de ações manuais posteriores.</li>
                </ul>
                <p className="mb-4 text-justify">Essa abordagem compromete a integridade do modelo de tokenização e impede que a Blockchain exerça seu papel como camada de confiança e motor transacional do sistema.</p>

                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("7.3 Fragilidades Estruturais Identificadas")}>7.3 Fragilidades Estruturais Identificadas</h3>
                <p className="mb-4 text-justify">A análise técnica identificou fragilidades estruturais críticas no modelo atual:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
                    <li>Criação manual de wallets para produtores, associações e entidades;</li>
                    <li>Replicação manual do particionamento das safras na Blockchain;</li>
                    <li>Ausência de sincronização automática de saldos entre o sistema e as wallets;</li>
                    <li>Inexistência de filas blockchain-orientadas para aposentadoria e movimentações;</li>
                    <li>Risco elevado de inconsistência, erro humano e retrabalho operacional.</li>
                </ul>
                <p className="mb-4 text-justify">Essas fragilidades tornam o modelo operacional incompatível com cenários de crescimento, múltiplas safras e aumento do volume transacional.</p>

                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("7.4 Modelo Recomendado – Blockchain Integrada ao Core (TO-BE)")}>7.4 Modelo Recomendado – Blockchain Integrada ao Core (TO-BE)</h3>
                <p className="mb-4 text-justify">
                    O fluxo inferior da Figura 1 (Jornada das UCSs dentro da Blockchain – Polkadot) representa o modelo estrutural recomendado, no qual a Blockchain deixa de ser acessória e passa a integrar o núcleo transacional do sistema.
                </p>
                <p className="mb-4 text-justify">Nesse modelo:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
                    <li>Cada produtor, associação e a BMV possuem uma wallet única, persistente e automática, criada no momento do cadastro;</li>
                    <li>A geração de safra dispara automaticamente o particionamento tokenizado;</li>
                    <li>A distribuição das UCSs ocorre conforme a regra de negócio:
                        <ul className="list-circle pl-6 mt-2">
                            <li>1/3 para o produtor</li>
                            <li>1/3 para a BMV</li>
                            <li>1/3 para a associação</li>
                        </ul>
                    </li>
                    <li>Novas safras não geram novas wallets, mas sim abastecimentos automáticos nas wallets existentes;</li>
                    <li>Todas as movimentações são registradas como transações blockchain rastreáveis;</li>
                    <li>A aposentadoria de UCSs ocorre por meio de filas de processamento, garantindo ordem lógica, consistência de saldo e rastreabilidade completa.</li>
                </ul>
                <p className="mb-4 text-justify">Esse modelo assegura mutabilidade auditável, integridade transacional e escalabilidade real do sistema.</p>

                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("7.5 Filas de Processamento, Saldos e Rastreabilidade")}>7.5 Filas de Processamento, Saldos e Rastreabilidade</h3>
                <p className="mb-4 text-justify">
                    A existência de filas de processamento é elemento crítico para o equilíbrio operacional do ecossistema BMV. No modelo recomendado:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
                    <li>Cada aposentadoria ou movimentação de UCS entra em uma fila lógica de execução;</li>
                    <li>O sistema valida automaticamente saldo disponível, entidade proprietária e ordem cronológica;</li>
                    <li>A Blockchain registra saldo anterior, quantidade aposentada ou transferida, saldo final e hash da transação.</li>
                </ul>
                <p className="mb-4 text-justify">
                    Esse mecanismo garante que, por exemplo, ao aposentar 3 UCSs de um produtor com saldo de 50 UCSs, o sistema atualize corretamente o saldo, preserve o histórico completo e mantenha rastreabilidade plena para auditoria futura.
                </p>

                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("7.6 Limitações do Modelo Atual em Escala")}>7.6 Limitações do Modelo Atual em Escala</h3>
                <p className="mb-4 text-justify">A ausência dessa integração estrutural gera riscos críticos em cenários de escala:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
                    <li>Inviabilidade de operar múltiplas safras simultâneas;</li>
                    <li>Necessidade de criar wallets retroativas para safras já processadas (ex.: safra 2010);</li>
                    <li>Comprometimento das safras futuras devido a inconsistências acumuladas;</li>
                    <li>Impossibilidade de garantir rastreabilidade completa das UCSs;</li>
                    <li>Exposição elevada a riscos operacionais, financeiros e jurídicos.</li>
                </ul>
                <p className="mb-4 text-justify">
                    No estado atual, a continuidade das subidas de safra sem a correção estrutural da camada blockchain amplifica o retrabalho e a dívida técnica, colocando em risco a integridade de todo o ecossistema.
                </p>

                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("7.7 Diretrizes Técnicas Mandatórias")}>7.7 Diretrizes Técnicas Mandatórias</h3>
                <p className="mb-4 text-justify">Com base na análise e no fluxo TO-BE apresentado, estabelecem-se como diretrizes técnicas obrigatórias:</p>
                <ul className="list-disc pl-6 space-y-2 text-justify">
                    <li>Criação automática de wallets no cadastro de entidades;</li>
                    <li>Integração direta da Blockchain ao core transacional;</li>
                    <li>Distribuição automática de UCSs conforme regra de negócio;</li>
                    <li>Uso de filas de processamento para aposentadorias e movimentações;</li>
                    <li>Registro completo, auditável e rastreável de todas as transações;</li>
                    <li>Eliminação de qualquer dependência manual para tokenização e controle de saldo.</li>
                </ul>
                 <p className="mt-4 text-justify"><strong>Referência aos Anexos:</strong> Anexo I – Evidências Técnicas e Operacionais; Anexo III – Matriz de Risco; Anexo V – Cenários de Tokenização e Movimentação de UCSs.</p>
            </>
        )
    },
    {
        title: '8. Governança de Dados e Identidade',
        content: (
            <>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("8.1 Identidade de Negócio Não Unificada")}>8.1 Identidade de Negócio Não Unificada</h3>
                <p className="mb-4 text-justify">O sistema não adota uma identidade de negócio única e consistente, utilizando identificadores técnicos distintos entre tabelas e módulos.</p>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("8.2 Impactos Observados")}>8.2 Impactos Observados</h3>
                <p className="mb-4 text-justify">Essa abordagem compromete:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
                    <li>A rastreabilidade dos dados;</li>
                    <li>A consistência das informações;</li>
                    <li>A segurança e confiabilidade em processos de auditoria.</li>
                </ul>
                <p className="text-justify"><strong>Referência aos Anexos:</strong> Os impactos práticos e exemplos de inconsistência encontram-se descritos no Anexo III – Matriz de Risco do Sistema BMV.</p>
            </>
        )
    },
    {
        title: '9. Cadastro e Gestão de Usuários',
        content: (
            <>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("9.1 Inconsistências de Dados Cadastrais")}>9.1 Inconsistências de Dados Cadastrais</h3>
                <p className="mb-2 text-justify"><strong>Nomes Incompletos:</strong> Em alguns cenários, o sistema exibe apenas o primeiro nome do usuário, mesmo quando o cadastro foi corretamente preenchido com nome e sobrenome.</p>
                <p className="mb-4 text-justify"><strong>Análise:</strong> Essa falha compromete a identificação inequívoca do cliente, impacta relatórios operacionais e gerenciais e fragiliza a governança dos dados cadastrais. A exibição incompleta do nome em diferentes telas gera inconsistência na experiência do usuário e aumenta o risco de duplicidade ou erro na interpretação de registros.</p>
                <p className="mb-4 text-justify"><strong>Referência ao Anexo:</strong> As evidências técnicas, incluindo a relação de telas afetadas e registros operacionais associados, encontram-se detalhadas no Anexo I – Evidências Técnicas e Operacionais.</p>

                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("9.2 Gestão de Usuários (Inativação e Exclusão)")}>9.2 Gestão de Usuários (Inativação e Exclusão)</h3>
                <p className="mb-2 text-justify"><strong>Arquivamento Lógico Ausente:</strong> Não há um processo formal e estruturado para o arquivamento lógico de usuários que deixaram de interagir com o ecossistema (e-commerce), mantendo registros inativos na base operacional ativa.</p>
                <p className="mb-2 text-justify"><strong>Impossibilidade de Exclusão Definitiva:</strong> Inexiste funcionalidade para a exclusão física e permanente de cadastros (clientes ou registros), inclusive em casos de erro de preenchimento, duplicidade ou encerramento da relação comercial.</p>
                <p className="mb-4 text-justify"><strong>Análise:</strong> A ausência de mecanismos adequados para o gerenciamento do ciclo de vida dos usuários gera acúmulo indevido de dados, aumenta a dívida técnica da base cadastral e impacta negativamente a performance do sistema. Além disso, expõe a empresa a riscos de compliance e governança da informação, ao manter registros desnecessários, desatualizados ou incorretos na base ativa.</p>
                <p className="text-justify"><strong>Referência ao Anexo:</strong> O detalhamento do fluxo operacional atual, bem como a avaliação de riscos associados, encontra-se descrito no Anexo III – Matriz de Risco do Sistema BMV.</p>
            </>
        )
    },
    {
        title: '10. Movimentações, Saldos e Rastreabilidade',
        content: (
            <>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("10.1 Divergência na Nomenclatura e no Mapeamento dos Estados de Saldo")}>10.1 Divergência na Nomenclatura e no Mapeamento dos Estados de Saldo</h3>
                <p className="mb-4 text-justify">
                    Foi identificada uma inconsistência estrutural entre o sistema atualmente em uso e o sistema legado no que se refere à nomenclatura, classificação e mapeamento dos estados de saldo associados às movimentações financeiras.
                </p>
                <p className="mb-4 text-justify">
                    Como exemplo, uma mesma operação é registrada no sistema atual como <strong>DIS &gt; DIS</strong>, enquanto no sistema legado a movimentação equivalente é apresentada como <strong>RES &gt; APO</strong>. Essa divergência evidencia desalinhamento conceitual e semântico entre os ambientes, comprometendo a correta interpretação da natureza da transação e seus impactos sobre os saldos.
                </p>
                <p className="mb-4 text-justify"><strong>Referência ao Anexo:</strong> A matriz comparativa completa entre os estados de saldo do sistema legado e do sistema atual encontra-se no Anexo II – Matriz de Paridade Funcional (Sistema Legado x Sistema Atual).</p>
                
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("10.2 Esclarecimento e Posicionamento do Fornecedor (Multiledgers)")}>10.2 Esclarecimento e Posicionamento do Fornecedor (Multiledgers)</h3>
                <p className="mb-4 text-justify">Em resposta formal, a Multiledgers esclareceu que a limitação de filtros na tela de movimentações foi uma decisão intencional de escopo, adotada com o objetivo de acelerar a disponibilização da plataforma e permitir a rápida operacionalização das transações com clientes externos da BMV.</p>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
                    <li>A tela de movimentações foi previamente apresentada e discutida com a equipe da BMV;</li>
                    <li>Optou-se conscientemente pela redução do número de filtros, entendendo-se que três categorias seriam suficientes no momento inicial;</li>
                    <li>A limitação não configura bug ou falha técnica, mas decisão estratégica de priorização funcional e time-to-market;</li>
                    <li>A ampliação dos filtros deverá ser tratada como nova demanda, sujeita a replanejamento e redefinição de prioridades.</li>
                </ul>
                <p className="mb-4 text-justify"><strong>Referência ao Anexo:</strong> O posicionamento formal do fornecedor e os registros de alinhamento encontram-se consolidados no Anexo I – Evidências Técnicas e Operacionais.</p>

                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("10.3 Análise Técnica Independente")}>10.3 Análise Técnica Independente</h3>
                <p className="mb-4 text-justify">Embora o posicionamento do fornecedor descarte a caracterização de defeito técnico isolado, a análise técnica independente identificou que a ausência de padronização de nomenclaturas, combinada à redução funcional em relação ao sistema legado, gera impactos relevantes sob as perspectivas técnica, operacional e de governança.</p>
                <p className="mb-4 text-justify">Foram identificadas as seguintes consequências:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
                    <li>Geração de ruído operacional, dificultando a leitura correta das movimentações e seus efeitos reais sobre os saldos;</li>
                    <li>Prejuízo à auditoria e à rastreabilidade, comprometendo validações históricas, conciliações e auditorias independentes;</li>
                    <li>Risco de inconsistência conceitual, com desalinhamento entre regras de negócio do sistema atual e conceitos consolidados no legado;</li>
                    <li>Dependência de conhecimento tácito, exigindo interpretação implícita por parte dos usuários, elevando o risco operacional.</li>
                </ul>
                <p className="mb-4 text-justify">Adicionalmente, observou-se que:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
                    <li>Todas as movimentações estão sendo registradas como “Distribuição”, independentemente de sua natureza real;</li>
                    <li>Não há identificação clara do tipo de transação (transferência, distribuição, reserva, aposentadoria, etc.);</li>
                    <li>Inexistem filtros essenciais para análise e segregação das movimentações.</li>
                </ul>
                <p className="mb-4 text-justify">Como consequência prática, operações de transferência podem ser interpretadas como distribuições, distorcendo a lógica financeira e contábil do fluxo.</p>
                <p className="mb-4 text-justify"><strong>Referência ao Anexo:</strong> Os cenários analisados e os exemplos de distorção de classificação encontram-se detalhados no Anexo II – Matriz de Paridade Funcional.</p>

                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("10.4 Enquadramento no Dossiê")}>10.4 Enquadramento no Dossiê</h3>
                <p className="mb-4 text-justify">
                    Este item permanece classificado como Não Conformidade Funcional de Governança e Usabilidade, não por erro de implementação técnica isolado, mas por inadequação estrutural ao modelo operacional, financeiro e de controle historicamente consolidado pela BMV.
                </p>
                <p className="mb-4 text-justify">
                    Trata-se de uma não conformidade de impacto transversal, afetando confiabilidade, auditoria, conciliação e governança dos dados transacionais.
                </p>

                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("10.5 Contexto de Urgência e Importância Estratégica")}>10.5 Contexto de Urgência e Importância Estratégica</h3>
                <p className="mb-4 text-justify">
                    A ausência de padronização nos estados de saldo, aliada à limitação funcional de filtros, representa risco sistêmico elevado nos pilares de Governança, Conformidade e Auditoria. Essas inconsistências reduzem a confiabilidade dos dados transacionais e afetam a credibilidade da plataforma perante auditorias externas, parceiros institucionais e questionamentos regulatórios ou jurídicos.
                </p>
                <p className="mb-4 text-justify">
                    As ações necessárias não configuram melhorias de usabilidade ou ajustes estéticos, mas correções mandatórias de alinhamento funcional e estratégico, indispensáveis para garantir integridade dos saldos, rastreabilidade histórica das operações e validação segura em processos de conciliação financeira.
                </p>
                <p className="text-justify">
                    A regra de negócio associada a este tema deve ser tratada como diretriz de correção de alto risco, sendo inegociável para a saúde operacional, financeira e jurídica da BMV.
                </p>
            </>
        )
    },
    {
        title: '11. Documentação e Fluxos de Aprovação',
        content: (
            <>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("11.1 Falha no Fluxo de Reenvio de Documentos")}>11.1 Falha no Fluxo de Reenvio de Documentos</h3>
                <p className="mb-4 text-justify">
                    Foi identificada falha no fluxo de reenvio de documentos, na qual documentos reenviados após correção permanecem indevidamente com status de “recusado”, mesmo após novo upload. Essa inconsistência indica quebra na lógica de atualização de status e controle de estados do documento, comprometendo o fluxo de validação e gerando bloqueios operacionais artificiais, retrabalho e dependência de intervenções manuais.
                </p>
                <p className="mb-4 text-justify">Do ponto de vista de governança, trata-se de não conformidade funcional crítica, com impacto direto em auditorias, SLA operacionais e experiência do usuário interno.</p>
                <p className="mb-4 text-justify"><strong>Referência ao Anexo:</strong> Os fluxos afetados e os registros de inconsistência encontram-se detalhados no Anexo I – Evidências Técnicas e Operacionais.</p>

                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("11.2 Ausência de Versionamento Documental")}>11.2 Ausência de Versionamento Documental</h3>
                <p className="mb-4 text-justify">
                    Foi constatada a inexistência de mecanismo formal e sistemático de versionamento documental, incluindo controle de versões, histórico de alterações, autoria, data de modificação e trilha de auditoria. Essa lacuna compromete a governança da informação, a rastreabilidade histórica e a confiabilidade dos registros, além de dificultar auditorias, validações regulatórias e controles de mudança. Trata-se de não conformidade relevante, incompatível com ambientes que exigem integridade da informação e responsabilidade técnica claramente atribuída.
                </p>
                <p className="text-justify"><strong>Referência ao Anexo:</strong> A avaliação de impacto e os riscos associados à ausência de versionamento encontram-se descritos no Anexo III – Matriz de Risco do Sistema BMV.</p>
            </>
        )
    },
    {
        title: '12. Usabilidade e Experiência do Usuário (UX)',
        content: (
            <>
                <p className="mb-4 text-justify">Foram identificadas deficiências relevantes na experiência do usuário, incluindo:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
                    <li>Ausência de sinalização clara de campos obrigatórios;</li>
                    <li>Carência de tooltips, legendas e orientações contextuais;</li>
                    <li>Interfaces com navegação e interação pouco intuitivas.</li>
                </ul>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("Análise")}>Análise</h3>
                <p className="mb-4 text-justify">
                    Essas limitações aumentam a curva de aprendizado, elevam a incidência de erros operacionais e impactam negativamente a eficiência do uso do sistema.
                </p>
                <p className="text-justify"><strong>Referência ao Anexo:</strong> Os exemplos práticos e evidências relacionadas à usabilidade encontram-se consolidados no Anexo I – Evidências Técnicas e Operacionais.</p>
            </>
        )
    },
    {
        title: '13. Controle de Acesso, Permissões e Lacuna de Auditabilidade',
        content: (
            <>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("13.1 Controle de Acesso e Gestão de Perfis")}>13.1 Controle de Acesso e Gestão de Perfis</h3>
                <p className="mb-4 text-justify">
                    O sistema BMV apresenta um mecanismo de controle de acesso bem estruturado e tecnicamente adequado, baseado em um menu granular de permissões, que permite o gerenciamento detalhado dos níveis de acesso por perfil de usuário. A plataforma contempla múltiplos níveis de acesso, variando desde clientes até administradores (ADM), possibilitando a definição precisa de permissões para visualização, execução e gestão de funcionalidades. Do ponto de vista de segregação de funções e controle de permissões, o sistema demonstra maturidade técnica e não apresenta não conformidades relevantes nesse aspecto.
                </p>

                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("13.2 Lacuna Estrutural de Auditabilidade das Ações")}>13.2 Lacuna Estrutural de Auditabilidade das Ações</h3>
                <p className="mb-4 text-justify">
                    Apesar da robustez no controle de acesso, foi identificada uma lacuna estrutural relevante relacionada à auditabilidade e rastreabilidade das ações executadas no sistema. Atualmente, não é possível identificar de forma clara e rastreável qual usuário executou determinada ação, quando a ação foi realizada (data e hora) e o contexto operacional da alteração.
                </p>
                <p className="mb-4 text-justify">Essa limitação afeta operações críticas, tais como:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
                    <li>Lançamento e alteração de safras;</li>
                    <li>Execução e processamento de movimentações;</li>
                    <li>Alterações manuais em registros operacionais;</li>
                    <li>Processamento de transações sensíveis.</li>
                </ul>
                <p className="mb-4 text-justify">
                    Em telas como Movimentações, por exemplo, não há indicação visível ou facilmente acessível do usuário responsável pela transação, o que inviabiliza a identificação de autoria em caso de erro, inconsistência ou necessidade de investigação operacional.
                </p>

                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("13.3 Impactos Operacionais e de Governança")}>13.3 Impactos Operacionais e de Governança</h3>
                <p className="mb-4 text-justify">A ausência de trilha de auditoria gera impactos diretos nos seguintes pilares:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
                    <li>Rastreabilidade operacional: dificuldade na reconstrução de eventos e análise de causa-raiz;</li>
                    <li>Auditoria interna e externa: limitação na comprovação de autoria e responsabilidade;</li>
                    <li>Governança de dados: fragilidade no controle de alterações críticas;</li>
                    <li>Gestão de riscos: aumento da dependência de conhecimento tácito e comunicação informal.</li>
                </ul>
                <p className="mb-4 text-justify">
                    Cabe destacar que essa funcionalidade não foi identificada de forma clara nem no sistema atual nem no sistema legado, indicando que sua adoção exige alteração estrutural, e não simples correção pontual.
                </p>

                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("13.4 Classificação da Não Conformidade")}>13.4 Classificação da Não Conformidade</h3>
                <p className="mb-2 text-justify"><strong>Não Conformidade Estrutural de Governança e Auditabilidade.</strong></p>
                <p className="mb-4 text-justify">
                    Trata-se de uma lacuna relevante em sistemas que operam com transações, registros sensíveis e exigência de rastreabilidade, sendo incompatível com boas práticas de governança corporativa e tecnológica.
                </p>
                
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("13.5 Diretriz Técnica Recomendada")}>13.5 Diretriz Técnica Recomendada</h3>
                <p className="mb-4 text-justify">Recomenda-se a implementação de um mecanismo formal de trilha de auditoria (audit trail), contemplando, no mínimo:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
                    <li>Identificação do usuário responsável pela ação;</li>
                    <li>Data e hora da execução;</li>
                    <li>Tipo de operação realizada (criação, alteração, exclusão, processamento);</li>
                    <li>Entidade afetada (safra, movimentação, usuário, entre outras).</li>
                </ul>
                <p className="mb-4 text-justify">
                    Essa diretriz deve ser tratada como requisito estrutural de governança, e não como melhoria opcional, sendo essencial para elevar o nível de maturidade, confiabilidade e auditabilidade do Sistema BMV.
                </p>
                <p className="text-justify"><strong>Referência ao Anexo:</strong> Os exemplos práticos, fluxos afetados e evidências da ausência de rastreabilidade encontram-se detalhados no Anexo I – Evidências Técnicas e Operacionais.</p>
            </>
        )
    },
    {
        title: '14. Suporte Técnico e Governança Operacional',
        content: (
            <>
                <p className="mb-4 text-justify">
                    Esta seção descreve as principais deficiências identificadas na prestação de suporte técnico ao Sistema BMV e na governança que orienta os processos operacionais associados. Os pontos aqui apresentados impactam diretamente a disponibilidade da aplicação, a produtividade das equipes e a experiência dos clientes finais, tornando essencial a sua correção para garantir estabilidade, previsibilidade e escalabilidade do serviço.
                </p>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("14.1 Tempo de Resposta e Efetividade Operacional")}>14.1 Tempo de Resposta e Efetividade Operacional</h3>
                <p className="mb-4 text-justify">
                    Foi identificado um padrão recorrente de lentidão no atendimento por parte da equipe de suporte técnico, inclusive em demandas de baixa complexidade ou correções pontuais. Solicitações consideradas simples frequentemente levam dias para retorno ou resolução, comprometendo a continuidade das operações e a eficiência dos fluxos internos.
                </p>
                <p className="mb-4 text-justify">
                    Em diversos cenários, a equipe de desenvolvimento apresentou dificuldades para destravar operações críticas do sistema. Como consequência, clientes que já haviam efetuado pagamentos de transações ficaram impossibilitados de prosseguir com seus processos por períodos prolongados, chegando a aguardar 3, 4 ou até 5 dias para a normalização do serviço.
                </p>
                <p className="mb-4 text-justify">
                    Mesmo após a liberação dessas operações, observou-se a recorrência de novos erros ou falhas sistêmicas (bugs), o que gerou interrupções sucessivas e retrabalho. Esse ciclo contínuo de correções reativas evidencia a ausência de estabilização adequada do ambiente e resulta em um fluxo de trabalho pouco produtivo, afetando diretamente a performance operacional da empresa.
                </p>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("14.2 Ausência de Acordo de Nível de Serviço (SLA) e Impactos na Governança")}>14.2 Ausência de Acordo de Nível de Serviço (SLA) e Impactos na Governança</h3>
                <p className="mb-4 text-justify">
                    A inexistência de um Acordo de Nível de Serviço (SLA) formal, documentado e amplamente comunicado representa uma falha crítica na governança operacional do Sistema BMV. Atualmente, não há critérios objetivos e transparentes que definam prioridades, tempos máximos de resposta e resolução ou fluxos claros de escalonamento.
                </p>
                <p className="mb-4 text-justify">
                    Na prática, qualquer solicitação cujo tempo estimado de execução ultrapasse 20 minutos passa automaticamente a ser classificada como melhoria, independentemente de se tratar de uma correção simples ou ajuste necessário para o funcionamento adequado do sistema. Nessas situações, o atendimento fica condicionado à aprovação de níveis hierárquicos superiores da empresa prestadora, incluindo, em alguns casos, a diretoria.
                </p>
                <p className="mb-4 text-justify">
                    Esse modelo gera entraves operacionais recorrentes, pois até mesmo correções básicas — como ajustes de layout em tabelas ou correções visuais — ficam paralisadas caso extrapolem esse limite de tempo. A ausência de critérios claros e previamente acordados resulta em: falta de previsibilidade no atendimento das demandas; dificuldade para destravar pendências operacionais; desalinhamento de expectativas entre as equipes técnicas e os usuários; e impossibilidade de planejamento adequado das atividades operacionais.
                </p>
                <p className="mb-4 text-justify">
                    Além disso, não existem definições formais sobre: critérios de priorização (Crítica, Alta, Média ou Baixa); prazos-alvo de resposta e solução (Target Times); e fluxo estruturado de escalonamento, permitindo que demandas não resolvidas avancem automaticamente para níveis superiores de suporte ou desenvolvimento.
                </p>
                <p className="mb-4 text-justify">
                    Essa lacuna de governança compromete a mensuração de desempenho do suporte, dificulta a responsabilização em casos de falhas e impacta directamente a disponibilidade e a confiabilidade da aplicação. Como consequência, o cenário atual tem limitado a capacidade de escalar os serviços de forma sustentável, prejudicando tanto a operação quanto a estratégia de crescimento das partes envolvidas.
                </p>
                <p className="mb-4 text-justify">
                    Diante desse contexto, torna-se fundamental estabelecer, de forma clara e acordada entre os envolvidos, o tempo efetivamente dedicado ao projeto, os limites de atuação do suporte e os critérios objetivos para distinção entre correções e melhorias, a fim de destravar pendências recorrentes, aumentar a eficiência operacional e garantir maior previsibilidade e estabilidade ao Sistema BMV.
                </p>
                <p className="text-justify">
                    A implementação urgente de um SLA estruturado é recomendada como medida essencial para assegurar um padrão mínimo de qualidade, governança e desempenho do serviço prestado.
                </p>
            </>
        )
    },
    {
        title: '15. Riscos Consolidados',
        content: (
            <>
                <p className="mb-4 text-justify">
                    Os riscos identificados ao longo desta avaliação foram consolidados por categoria, considerando impacto operacional, probabilidade de ocorrência e efeito sistêmico sobre a operação da BMV. Estes riscos não são hipotéticos: decorrem de falhas estruturais observadas em ambiente produtivo e devidamente evidenciadas nos Anexos Técnicos.
                </p>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("15.1 Riscos Operacionais")}>15.1 Riscos Operacionais</h3>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
                    <li>Dependência excessiva e recorrente de processos manuais para execução de transações básicas;</li>
                    <li>Gargalos estruturais no back-office, inviabilizando ganhos de escala;</li>
                    <li>Dificuldades recorrentes na análise de movimentações, saldos e históricos;</li>
                    <li>Aumento do retrabalho operacional e da exposição a erro humano;</li>
                    <li>Impossibilidade de operação fluida sem intervenção constante de equipes internas.</li>
                </ul>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("15.2 Riscos Financeiros")}>15.2 Riscos Financeiros</h3>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
                    <li>Atrasos no processamento de transações já pagas por clientes;</li>
                    <li>Risco de alocação incorreta de UCS (safra, núcleo ou entidade equivocada);</li>
                    <li>Fragilidade na conciliação financeira e na validação de saldos;</li>
                    <li>Elevação contínua do custo operacional para sustentar o mesmo volume transacional;</li>
                    <li>Dificuldade de comprovação clara e tempestiva de eventos financeiros.</li>
                </ul>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("15.3 Riscos Tecnológicos")}>15.3 Riscos Tecnológicos</h3>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
                    <li>Arquitetura herdada do sistema legado sem reengenharia adequada;</li>
                    <li>Uso da Blockchain de forma passiva, sem integração funcional ao core;</li>
                    <li>Ausência de automação na criação e abastecimento de wallets;</li>
                    <li>Baixa rastreabilidade técnica e inconsistência de identificadores;</li>
                    <li>Dependência estrutural de intervenções humanas para processos sistêmicos.</li>
                </ul>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("15.4 Riscos Jurídicos e de Conformidade")}>15.4 Riscos Jurídicos e de Conformidade</h3>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
                    <li>Fragilidade na comprovação de integridade e autoria das transações;</li>
                    <li>Exposição relevante em auditorias externas e questionamentos regulatórios;</li>
                    <li>Dependência de controles manuais para processos críticos;</li>
                    <li>Risco de contestação contratual por não atendimento a requisitos funcionais essenciais;</li>
                    <li>Dificuldade de sustentação probatória em cenários de litígio.</li>
                </ul>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("15.5 Riscos Estratégicos")}>15.5 Riscos Estratégicos</h3>
                <ul className="list-disc pl-6 space-y-2 text-justify">
                    <li>Inviabilidade de crescimento em escala (20 a 30 mil clientes);</li>
                    <li>Comprometimento da credibilidade do modelo BMV perante parceiros e investidores;</li>
                    <li>Dependência excessiva do fornecedor atual para operação básica;</li>
                    <li>Limitação severa da capacidade de evolução tecnológica do negócio.</li>
                </ul>
            </>
        )
    },
    {
        title: '16. Recomendações Estratégicas Gerais',
        content: (
            <>
                <p className="mb-4 text-justify">
                    As recomendações a seguir não tratam de melhorias incrementais, ajustes cosméticos ou otimizações pontuais. Tratam-se de diretrizes estruturais obrigatórias para garantir a sustentabilidade técnica, operacional e jurídica do sistema.
                </p>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("16.1 Reengenharia do Core Transacional")}>16.1 Reengenharia do Core Transacional</h3>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
                    <li>Redesenhar fluxos críticos com foco em automação end-to-end;</li>
                    <li>Separar claramente execução sistêmica de supervisão humana;</li>
                    <li>Eliminar dependências manuais para transações básicas.</li>
                </ul>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("16.2 Automação como Princípio Estrutural")}>16.2 Automação como Princípio Estrutural</h3>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
                    <li>Automatizar transferências padrão, abastecimentos e movimentações recorrentes;</li>
                    <li>Restringir aprovação humana a exceções justificadas;</li>
                    <li>Implementar processamento assíncrono e filas de execução.</li>
                </ul>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("16.3 Integração Efetiva da Blockchain")}>16.3 Integração Efetiva da Blockchain</h3>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
                    <li>Criar wallets automaticamente no cadastro de entidades;</li>
                    <li>Abastecer wallets automaticamente a cada safra;</li>
                    <li>Garantir vínculo direto e verificável entre blockchain, saldos e movimentações.</li>
                </ul>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("16.4 Revisão Integral da Governança Técnica")}>16.4 Revisão Integral da Governança Técnica</h3>
                <ul className="list-disc pl-6 space-y-2 text-justify">
                    <li>Unificar identificadores de negócio;</li>
                    <li>Padronizar nomenclaturas, estados e filtros;</li>
                    <li>Estabelecer SLA formal e mensurável;</li>
                    <li>Definir roadmap técnico com marcos claros e verificáveis.</li>
                </ul>
            </>
        )
    },
    {
        title: '17. Catálogo de Não Conformidades – Enquadramento',
        content: (
            <>
                <p className="mb-4 text-justify">
                    O detalhamento completo das não conformidades identificadas neste dossiê encontra-se documentado nos Anexos Técnicos, que constituem parte integrante e indissociável deste relatório.
                </p>
                <p className="mb-4 text-justify">Este corpo principal estabelece:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
                    <li>O enquadramento formal das não conformidades;</li>
                    <li>Os critérios de criticidade e governança;</li>
                    <li>A obrigatoriedade de correção;</li>
                    <li>O vínculo direto com SLA técnico-operacional.</li>
                </ul>
                <p className="mb-4 text-justify">As não conformidades constantes nos anexos:</p>
                <ul className="list-disc pl-6 space-y-2 text-justify">
                    <li>Não configuram backlog evolutivo;</li>
                    <li>Não são sugestões de melhoria;</li>
                    <li>Não estão sujeitas a postergação sem justificativa formal;</li>
                    <li>Possuem caráter mandatório e auditável.</li>
                </ul>
            </>
        )
    },
    {
        title: '18. Registros Pós-Reunião – Instrumento Formal de Cobrança e SLA',
        content: (
            <>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("18.1 Natureza do Registro")}>18.1 Natureza do Registro</h3>
                <p className="mb-4 text-justify">
                    Esta seção consolida os ajustes definidos como obrigatórios, imediatos e não negociáveis, constituindo instrumento formal de cobrança técnica e operacional ao fornecedor.
                </p>
                <p className="mb-4 text-justify">Os itens aqui enquadrados impactam diretamente:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
                    <li>Continuidade operacional;</li>
                    <li>Governança do sistema;</li>
                    <li>Confiabilidade dos dados;</li>
                    <li>Capacidade de auditoria;</li>
                    <li>Conformidade regulatória;</li>
                    <li>Escalabilidade do modelo BMV.</li>
                </ul>
                <p className="mb-4 text-justify">
                    Este registro possui caráter deliberativo, vinculante e auditável, sendo complementado pelas evidências constantes nos Anexos Técnicos.
                </p>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("18.2 Enquadramento de SLA e Obrigação do Fornecedor")}>18.2 Enquadramento de SLA e Obrigação do Fornecedor</h3>
                <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
                    <li>Os prazos de correção devem ser formalmente apresentados;</li>
                    <li>Cada entrega deve conter evidência funcional e validação;</li>
                    <li>Entregas parciais ou incompletas não serão aceitas;</li>
                    <li>O descumprimento caracteriza quebra de SLA técnico-operacional.</li>
                </ul>
                <h3 className="text-xl font-semibold mb-2 mt-4" id={slugify("18.3 Vínculo com Anexos Técnicos")}>18.3 Vínculo com Anexos Técnicos</h3>
                <p className="mb-4 text-justify">Os registros desta seção referenciam diretamente:</p>
                <ul className="list-disc pl-6 space-y-2 text-justify">
                    <li>Anexo I – Evidências Técnicas e Operacionais;</li>
                    <li>Anexo II – Linha do Tempo de Suporte;</li>
                    <li>Anexo III – Matriz de Risco;</li>
                    <li>Anexo IV – Matriz de Paridade Funcional.</li>
                </ul>
            </>
        )
    },
    {
        title: '19. Considerações Jurídicas (Apoio Técnico)',
        content: (
            <>
                <p className="mb-4 text-justify">Este dossiê fornece base técnica, documental e objetiva para:</p>
                <ul className="list-disc pl-6 space-y-2 text-justify">
                    <li>Avaliação de cumprimento contratual;</li>
                    <li>Caracterização de quebra de SLA;</li>
                    <li>Análise de riscos de continuidade do sistema;</li>
                    <li>Apuração de responsabilidades técnicas e operacionais;</li>
                    <li>Sustentação técnica em eventuais questionamentos jurídicos.</li>
                </ul>
            </>
        )
    },
    {
        title: '20. Conclusão',
        content: (
            <>
                <h3 className="text-xl font-semibold mb-4 mt-4" id={slugify("Estado Atual do Sistema")}>Estado Atual do Sistema</h3>
                
                <p className="mb-4 text-justify">
                    O sistema BMV, em seu estado atual, <strong>não atende aos requisitos mínimos</strong> de maturidade tecnológica, automação, governança de dados, rastreabilidade operacional e capacidade de escala necessários para sustentar, de forma segura, confiável e contínua, o modelo de negócio da organização.
                </p>

                <h3 className="text-xl font-semibold mb-4 mt-6" id={slugify("Esclarecimento sobre a Natureza da Avaliação")}>Esclarecimento sobre a Natureza da Avaliação</h3>
                
                <p className="mb-4 text-justify">
                    Ressalta-se, de forma inequívoca, que esta avaliação possui <strong>natureza estritamente técnica</strong>, orientada à qualidade do serviço sistêmico entregue — e não à qualidade do atendimento prestado pela equipe de suporte. A equipe responsável demonstra postura colaborativa e diligente, atuando dentro das limitações impostas pelo modelo atual.
                </p>
                
                <p className="mb-4 text-justify">
                    Contudo, <strong>esforço operacional e boa vontade não substituem arquitetura adequada, automação consistente, escalabilidade e governança técnica efetiva.</strong>
                </p>

                <h3 className="text-xl font-semibold mb-4 mt-6" id={slugify("Classificação Inadequada de Falhas")}>Classificação Inadequada de Falhas</h3>
                
                <p className="mb-4 text-justify">
                    Falhas estruturais e funcionais vêm sendo recorrentemente enquadradas como "melhorias evolutivas", quando, na realidade, configuram <strong>não conformidades mandatórias</strong>. Essa abordagem posterga correções críticas, distorce prioridades técnicas e mantém a operação exposta a riscos operacionais, financeiros, jurídicos e reputacionais relevantes.
                </p>

                <h3 className="text-xl font-semibold mb-4 mt-6" id={slugify("Impacto no Cliente Final")}>Impacto no Cliente Final</h3>
                
                <p className="mb-4 text-justify">
                    O impacto direto dessas limitações sobre o cliente final merece destaque crítico. Clientes que já efetuaram pagamento de transações não podem aguardar dias para conclusão de processamento que deveria ocorrer de forma automática e imediata.
                </p>
                
                <p className="mb-4 text-justify">
                    Interrupções dessa natureza geram paralisações artificiais na cadeia de prestação de serviços, afetando diretamente a qualidade percebida, a previsibilidade operacional e a confiança do mercado. Esses atrasos aumentam o risco de questionamentos contratuais e regulatórios, gerando risco reputacional elevado junto a clientes, parceiros e investidores.
                </p>

                <h3 className="text-xl font-semibold mb-4 mt-6 text-red-600 dark:text-red-400" id={slugify("Ponto Crítico - Blockchain")}>
                    ⚠️ Ponto Crítico: Ausência de Integração Efetiva da Blockchain
                </h3>
                
                <p className="mb-4 text-justify font-medium">
                    Há um ponto técnico de gravidade máxima que se sobrepõe a todas as demais análises: <strong>a ausência de integração efetiva, automação e escalabilidade da camada de Blockchain.</strong>
                </p>
                
                <p className="mb-4 text-justify">
                    A proposta conceitual e estratégica do sistema BMV está diretamente associada à tokenização, sendo a Blockchain o <strong>pilar central do modelo de negócio</strong> — e não um componente acessório. No entanto, conforme demonstrado neste relatório, a Blockchain atualmente opera de forma passiva, manual, não orquestrada e sem capacidade de escala, inviabilizando seu papel como motor transacional, mecanismo de rastreabilidade e base de confiança do sistema.
                </p>
                
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4 my-4 text-justify">
                    <p className="text-sm text-red-900 dark:text-red-100 mb-0">
                        <strong>Conclusão Técnica Crítica:</strong> Enquanto não forem resolvidas as questões relacionadas à criação automática de wallets, abastecimento automatizado, integração direta entre blockchain e saldos/movimentações, e capacidade de operação em escala, todo o contexto sistêmico ao redor — UX, fluxos operacionais, filtros, nomenclaturas, governança de dados e SLAs — torna-se secundário e insuficiente para discussão estratégica.
                    </p>
                </div>

                <p className="mb-4 text-justify">
                    Sem uma Blockchain escalável, integrada e governada sistematicamente, <strong>não há tokenização viável, e consequentemente não há sustentação técnica para o modelo de negócio proposto.</strong>
                </p>

                <h3 className="text-xl font-semibold mb-4 mt-6" id={slugify("Viabilidade de Escala")}>Viabilidade de Escala</h3>
                
                <p className="mb-4 text-justify">
                    Do ponto de vista estratégico, o modelo operacional atual não comporta operação de maior escala. A dependência excessiva de processos manuais, aliada à fragilidade da camada blockchain, impede crescimento seguro, previsível e auditável.
                </p>
                
                <p className="mb-4 text-justify">
                    Para expandir operações, é indispensável estabelecer nível substancialmente mais elevado de confiança no sistema, o que somente será possível por meio de <strong>correções estruturais profundas, priorizadas a partir da Blockchain.</strong>
                </p>

                <h3 className="text-xl font-semibold mb-4 mt-6" id={slugify("Capacidade Técnica e Compromisso")}>Capacidade Técnica e Compromisso</h3>
                
                <p className="mb-4 text-justify">
                    Há capacidade técnica para evolução da solução. Contudo, essa evolução não ocorrerá sem:
                </p>
                
                <ul className="list-disc pl-6 space-y-2 mb-4 text-justify">
                    <li>Dedicação adequada de tempo;</li>
                    <li>Priorização executiva clara;</li>
                    <li>Comprometimento estrutural por parte do fornecedor.</li>
                </ul>
                
                <p className="mb-4 text-justify">
                    O projeto exige tratamento à altura de sua criticidade estratégica, com alocação de esforço compatível com a responsabilidade envolvida, de modo que a solução funcione de forma sustentável e equilibrada para ambas as empresas.
                </p>

                <h3 className="text-xl font-semibold mb-4 mt-6" id={slugify("Cenários de Decisão")}>Cenários de Decisão para a Diretoria</h3>
                
                <p className="mb-4 text-justify">
                    A responsabilidade pela decisão estratégica recai sobre a Diretoria, que deverá deliberar, de forma objetiva e responsável, entre:
                </p>
                
                <div className="space-y-3 mb-4">
                    <div className="flex gap-3 text-justify">
                        <span className="font-bold text-primary flex-shrink-0">1.</span>
                        <p><strong>Correção Estrutural:</strong> Implementar como prioridade máxima a correção estrutural e escalabilidade da camada Blockchain.</p>
                    </div>
                    <div className="flex gap-3 text-justify">
                        <span className="font-bold text-primary flex-shrink-0">2.</span>
                        <p><strong>Reengenharia Profunda:</strong> Conduzir reengenharia profunda do sistema, com a Blockchain como núcleo do core transacional.</p>
                    </div>
                    <div className="flex gap-3 text-justify">
                        <span className="font-bold text-primary flex-shrink-0">3.</span>
                        <p><strong>Substituição Integral:</strong> Caso os riscos e custos não se justifiquem, avaliar a substituição integral da solução tecnológica.</p>
                    </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6">
                    <p className="text-sm text-amber-900 dark:text-amber-100 font-semibold mb-0">
                        A postergação dessa decisão representa a <strong>manutenção consciente de um risco operacional, financeiro, jurídico e reputacional elevado</strong>, incompatível com a estratégia de crescimento, credibilidade institucional e sustentabilidade do negócio BMV.
                    </p>
                </div>
            </>
        )
    }
];

interface DossierContentProps {
  searchTerm?: string;
  setExpandedSections: React.Dispatch<React.SetStateAction<string[]>>;
}

export const DossierContent: React.FC<DossierContentProps> = ({ searchTerm, setExpandedSections }) => {
  
    const { filteredSections, Highlight, addHighlight, addEmphasis } = useDossierSearch(sections, searchTerm, setExpandedSections);

  if (filteredSections.length === 0 && searchTerm) {
    return (
        <Card className="text-center">
            <CardHeader>
                <CardTitle>Nenhum resultado encontrado</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Tente refinar sua busca.</p>
            </CardContent>
        </Card>
    )
  }

  return (
    <>
            {filteredSections.map((section, index) => {
        const id = slugify(section.title);

        return (
                    <motion.div
                        key={id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut', delay: index * 0.015 }}
                    >
                        <AccordionItem value={id} id={id} className="soft-card border border-transparent bg-card/85">
                            <AccordionTrigger className="text-2xl font-bold text-primary hover:no-underline font-headline px-6 py-4">
                                <Highlight text={section.title} />
                            </AccordionTrigger>
                            <AccordionContent className="prose prose-lg dark:prose-invert max-w-none text-foreground text-base leading-relaxed space-y-4 pt-4 pb-8 px-8">
                                {addHighlight(addEmphasis(section.content))}
                            </AccordionContent>
                        </AccordionItem>
                    </motion.div>
        );
      })}
    </>
  );
};
