// Period: 11/06/2025 to 25/03/2026 (Consolidated Groups)

export interface WhatsAppMessage {
  date: string;
  time: string;
  sender: string;
  text: string;
  media?: string; // filename of attached image/file
  mediaType?: 'image' | 'audio' | 'pdf' | 'zip' | 'hidden';
  isSystem?: boolean;
}

export interface DayGroup {
  date: string;
  messages: WhatsAppMessage[];
}

// Map of images attached in messages (filename referenced in chat -> actual file)
export const MEDIA_FILES: Record<string, { type: 'image' | 'pdf' | 'audio' | 'zip'; label?: string }> = {
  'IMG-20251110-WA0059.jpg': { type: 'image' },
  'IMG-20251110-WA0060.jpg': { type: 'image' },
  'IMG-20251111-WA0037.jpg': { type: 'image' },
  'IMG-20251111-WA0038.jpg': { type: 'image' },
  'IMG-20251112-WA0000.jpg': { type: 'image' },
  'IMG-20251117-WA0028.jpg': { type: 'image' },
  'IMG-20251117-WA0029.jpg': { type: 'image' },
  'IMG-20251117-WA0030.jpg': { type: 'image' },
  'IMG-20251117-WA0031.jpg': { type: 'image' },
  'IMG-20251117-WA0032.jpg': { type: 'image' },
  'IMG-20251119-WA0026.jpg': { type: 'image' },
  'IMG-20251127-WA0006.jpg': { type: 'image' },
  'IMG-20251127-WA0007.jpg': { type: 'image' },
  'IMG-20251203-WA0033.jpg': { type: 'image' },
  'IMG-20251203-WA0034.jpg': { type: 'image' },
  'IMG-20251204-WA0043.jpg': { type: 'image' },
  'IMG-20251204-WA0044.jpg': { type: 'image' },
  'IMG-20251204-WA0046.jpg': { type: 'image' },
  'IMG-20251204-WA0047.jpg': { type: 'image' },
  'IMG-20251204-WA0048.jpg': { type: 'image' },
  'IMG-20251210-WA0018.jpg': { type: 'image' },
  'IMG-20251210-WA0030.jpg': { type: 'image' },
  'IMG-20251210-WA0031.jpg': { type: 'image' },
  'IMG-20251212-WA0063.jpg': { type: 'image' },
  'IMG-20251212-WA0078.jpg': { type: 'image' },
  'IMG-20251215-WA0036.jpg': { type: 'image' },
  'IMG-20251223-WA0006.jpg': { type: 'image' },
  'IMG-20260105-WA0041.jpg': { type: 'image' },
  'IMG-20260107-WA0033.jpg': { type: 'image' },
  'IMG-20260107-WA0034.jpg': { type: 'image' },
  'IMG-20260107-WA0035.jpg': { type: 'image' },
  'IMG-20260107-WA0036.jpg': { type: 'image' },
  'IMG-20260107-WA0037.jpg': { type: 'image' },
  'IMG-20260107-WA0038.jpg': { type: 'image' },
  'IMG-20260107-WA0039.jpg': { type: 'image' },
  'IMG-20260107-WA0040.jpg': { type: 'image' },
  'IMG-20260107-WA0041.jpg': { type: 'image' },
  'IMG-20260107-WA0042.jpg': { type: 'image' },
  'IMG-20260107-WA0043.jpg': { type: 'image' },
  'IMG-20260107-WA0044.jpg': { type: 'image' },
  'IMG-20260107-WA0045.jpg': { type: 'image' },
  'IMG-20260107-WA0046.jpg': { type: 'image' },
  'IMG-20260107-WA0047.jpg': { type: 'image' },
  'IMG-20260107-WA0048.jpg': { type: 'image' },
  'IMG-20260120-WA0012.jpg': { type: 'image' },
  'IMG-20260120-WA0016.jpg': { type: 'image' },
  'IMG-20260120-WA0017.jpg': { type: 'image' },
  'IMG-20260120-WA0019.jpg': { type: 'image' },
  'IMG-20260120-WA0020.jpg': { type: 'image' },
  'IMG-20260121-WA0020.jpg': { type: 'image' },
  'IMG-20260121-WA0021.jpg': { type: 'image' },
  'IMG-20260122-WA0052.jpg': { type: 'image' },
  'IMG-20260123-WA0040.jpg': { type: 'image' },
  'IMG-20260123-WA0041.jpg': { type: 'image' },
  'IMG-20260123-WA0042.jpg': { type: 'image' },
  'IMG-20260123-WA0043.jpg': { type: 'image' },
  'IMG-20260123-WA0044.jpg': { type: 'image' },
  'IMG-20260123-WA0045.jpg': { type: 'image' },
  'IMG-20260123-WA0046.jpg': { type: 'image' },
  'IMG-20260123-WA0047.jpg': { type: 'image' },
  'IMG-20260126-WA0005.jpg': { type: 'image' },
  'IMG-20260126-WA0006.jpg': { type: 'image' },
  'IMG-20260126-WA0022.jpg': { type: 'image' },
  'IMG-20260126-WA0039.jpg': { type: 'image' },
  'IMG-20260126-WA0040.jpg': { type: 'image' },
  'IMG-20260126-WA0042.jpg': { type: 'image' },
  'IMG-20260127-WA0000.jpg': { type: 'image' },
  'IMG-20260127-WA0006.jpg': { type: 'image' },
  'IMG-20260127-WA0025.jpg': { type: 'image' },
  'IMG-20260127-WA0026.jpg': { type: 'image' },
  'IMG-20260127-WA0031.jpg': { type: 'image' },
  'IMG-20260202-WA0082.jpg': { type: 'image' },
  'IMG-20260202-WA0083.jpg': { type: 'image' },
  'IMG-20260203-WA0001.jpg': { type: 'image' },
  'IMG-20260203-WA0003.jpg': { type: 'image' },
  'IMG-20260203-WA0004.jpg': { type: 'image' },
  'IMG-20260203-WA0010.jpg': { type: 'image' },
  'IMG-20260203-WA0077.jpg': { type: 'image' },
  'IMG-20260203-WA0078.jpg': { type: 'image' },
  'IMG-20260203-WA0079.jpg': { type: 'image' },
  'IMG-20260203-WA0080.jpg': { type: 'image' },
  'IMG-20260205-WA0021.jpg': { type: 'image' },
  'IMG-20260209-WA0060.jpg': { type: 'image' },
  'IMG-20260209-WA0061.jpg': { type: 'image' },
  'IMG-20260223-WA0028.jpg': { type: 'image' },
  'IMG-20260223-WA0029.jpg': { type: 'image' },
  'IMG-20260224-WA0026.jpg': { type: 'image' },
  'IMG-20260310-WA0008.jpg': { type: 'image' },
  'IMG-20260325-WA0047.jpg': { type: 'image' },
  'IMG-20260325-WA0048.jpg': { type: 'image' },
  'IMG-20260325-WA0049.jpg': { type: 'image' },
  'PTT-20251110-WA0067.opus': { type: 'audio', label: 'Áudio' },
  'Cenarios possiveis.pdf': { type: 'pdf', label: 'Cenários Possíveis' },
  'Report - Pedido 56 SINDIPROM.pdf': { type: 'pdf', label: 'Report Pedido 56 SINDIPROM' },
  'Report - Pedido 808 Corrida de Reis.pdf': { type: 'pdf', label: 'Report Pedido 808' },
  'certificate.pdf': { type: 'pdf', label: 'Certificado' },
  'Icones.zip': { type: 'zip', label: 'Ícones' },
  '00000687-PHOTO-2025-10-15-19-36-01.jpg': { type: 'image' },
  '00000504-AUDIO-2025-10-01-15-00-37.opus': { type: 'audio', label: 'Áudio Explicação DNS' },
  '00000717-VIDEO-2025-10-20-15-30-04.mp4': { type: 'image', label: 'Vídeo Erro Cadastro' },
};

// Sender display name normalization
const SENDER_MAP: Record<string, string> = {
  'Luiz Paulo Gonçalves Miguel de Jesus': 'Luiz Paulo (BMV)',
  'Thaynara Camara': 'Thaynara (BMV)',
  'Maria Tereza Umbelino': 'Maria Tereza (BMV)',
  'Nadini': 'Nadini (Multiledgers)',
  'Nadini - Multiledger': 'Nadini (Multiledgers)',
  '‪+55 34 8831-6444‬': 'Matheus (Multiledgers)',
  '~ Matheus S. Silva': 'Matheus (Multiledgers)',
  'Matheus S. Silva': 'Matheus (Multiledgers)',
  'Paulo': 'Paulo (BMV)',
  'Renata Umbelino': 'Renata (BMV)',
  '+55 21 98261-9661': 'Marcela (Multiledgers)',
  'Marcela R Gonçalves': 'Marcela (Multiledgers)',
  'Alessandra - BMV': 'Alessandra (BMV)',
  'Camila - BMV': 'Camila (BMV)',
  'BMV Global | Atendimento': 'Thaynara (BMV)',
  '~ Jennifer': 'Jennifer (Multiledgers)',
  'Jennifer': 'Jennifer (Multiledgers)',
  '~ Vitor Alves': 'Vitor (Multiledgers)',
  'Vitor Alves': 'Vitor (Multiledgers)',
  '~ Paulo': 'Paulo (Multiledgers)',
};

export const SENDER_COLORS: Record<string, string> = {
  'Luiz Paulo (BMV)': 'bg-blue-100 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800',
  'Thaynara (BMV)': 'bg-purple-100 dark:bg-purple-950/40 border-purple-300 dark:border-purple-800',
  'Maria Tereza (BMV)': 'bg-pink-100 dark:bg-pink-950/40 border-pink-300 dark:border-pink-800',
  'Nadini (Multiledgers)': 'bg-emerald-100 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800',
  'Matheus (Multiledgers)': 'bg-teal-100 dark:bg-teal-950/40 border-teal-300 dark:border-teal-800',
  'Paulo (BMV)': 'bg-indigo-100 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-800',
  'Renata (BMV)': 'bg-rose-100 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800',
  'Marcela (Multiledgers)': 'bg-cyan-100 dark:bg-cyan-950/40 border-cyan-300 dark:border-cyan-800',
  'Alessandra (BMV)': 'bg-orange-100 dark:bg-orange-950/40 border-orange-300 dark:border-orange-800',
  'Camila (BMV)': 'bg-yellow-100 dark:bg-yellow-950/40 border-yellow-300 dark:border-yellow-800',
  'Jennifer (Multiledgers)': 'bg-lime-100 dark:bg-lime-950/40 border-lime-300 dark:border-lime-800',
  'Vitor (Multiledgers)': 'bg-slate-100 dark:bg-slate-950/40 border-slate-300 dark:border-slate-800',
};

export const SENDER_NAME_COLORS: Record<string, string> = {
  'Luiz Paulo (BMV)': 'text-blue-700 dark:text-blue-300',
  'Thaynara (BMV)': 'text-purple-700 dark:text-purple-300',
  'Maria Tereza (BMV)': 'text-pink-700 dark:text-pink-300',
  'Nadini (Multiledgers)': 'text-emerald-700 dark:text-emerald-300',
  'Matheus (Multiledgers)': 'text-teal-700 dark:text-teal-300',
  'Paulo (BMV)': 'text-indigo-700 dark:text-indigo-300',
  'Renata (BMV)': 'text-rose-700 dark:text-rose-300',
  'Marcela (Multiledgers)': 'text-cyan-700 dark:text-cyan-300',
  'Alessandra (BMV)': 'text-orange-700 dark:text-orange-300',
  'Camila (BMV)': 'text-yellow-700 dark:text-yellow-300',
  'Jennifer (Multiledgers)': 'text-lime-700 dark:text-lime-300',
  'Vitor (Multiledgers)': 'text-slate-700 dark:text-slate-300',
};

export function normalizeSender(raw: string): string {
  return SENDER_MAP[raw] || raw;
}

export function isBMV(sender: string): boolean {
  return sender.includes('(BMV)');
}

// Statistics
export const STATS = {
  totalMessages: 2825,
  period: '11/06/2025 – 25/03/2026',
  totalDays: 287,
  activeDays: 110,
  totalImages: 94,
  totalAudios: 2,
  totalPDFs: 5,
  totalCalls: 12,
  participants: [
    { name: 'Luiz Paulo', role: 'Gestor Operacional TI', org: 'BMV' },
    { name: 'Thaynara Camara', role: 'Operacional', org: 'BMV' },
    { name: 'Alessandra', role: 'Backoffice / Operacional', org: 'BMV' },
    { name: 'Maria Tereza Umbelino', role: 'Diretoria', org: 'BMV' },
    { name: 'Camila', role: 'Backoffice / Operacional', org: 'BMV' },
    { name: 'Renata Umbelino', role: 'Diretoria', org: 'BMV' },
    { name: 'Paulo', role: 'Direção', org: 'Multiledgers' },
    { name: 'Nadini', role: 'PM / Suporte', org: 'Multiledgers' },
    { name: 'Matheus', role: 'Dev / Suporte', org: 'Multiledgers' },
    { name: 'Jennifer', role: 'Suporte Dev', org: 'Multiledgers' },
    { name: 'Vitor Alves', role: 'Infra / Dev', org: 'Multiledgers' },
    { name: 'Marcela R. Gonçalves', role: 'COO', org: 'Multiledgers' },
  ],
  keyIncidents: [
    { date: '27/08/2025', title: 'Erro de saldo em UCS deletadas sem limpeza de order book', severity: 'high' },
    { date: '28/08/2025', title: 'Falha crítica no envio de PIN (Bloqueio total de aprovação)', severity: 'critical' },
    { date: '04/09/2025', title: 'Report Mumbuca Verde corrompido e erro de labels (Vendedor vs Cliente)', severity: 'high' },
    { date: '11/09/2025', title: 'Bug de Geração de Safra Duplicada (Inconsistência em Blockchain)', severity: 'critical' },
    { date: '16/09/2025', title: 'Admissão de falta de conhecimento do sistema legado pelo fornecedor', severity: 'high' },
    { date: '25/09/2025', title: 'Instabilidade crítica e queda de site durante manutenção WordPress', severity: 'critical' },
    { date: '30/09/2025', title: 'Erro de mapeamento de Núcleo em Certificado (Monte Cristo vs Guariba)', severity: 'high' },
    { date: '20/10/2025', title: 'QUEDA AWS: Servidores fora do ar e impacto em produção', severity: 'critical' },
    { date: '31/10/2025', title: 'Erro de operação em processamento de pedido SaaS BMV', severity: 'high' },
    { date: '06/11/2025', title: 'Migração de grupo por falhas de comunicação e suporte', severity: 'medium' },
    { date: '11/11/25', title: 'Pedido 50 (Real) travado com cliente cobrando o selo', severity: 'critical' },
    { date: '12/11/2025', title: 'Janela modal não responsiva (UX) - Impedimento de salvar dados', severity: 'medium' },
    { date: '17/11/2025', title: 'Erro NaN em cotações e fluxo travado sem validação de docs', severity: 'high' },
    { date: '19/11/2025', title: 'Cálculo de taxa de transferência incorreto (valor duplicado)', severity: 'high' },
    { date: '24/11/25', title: 'Bug de vínculo: e-mail não consegue administrar múltiplas contas', severity: 'high' },
    { date: '27/11/2025', title: 'Bug de seleção de fazendas: sistema ignora IDs individuais', severity: 'high' },
    { date: '04/12/2025', title: 'EMISSÃO INDEVIDA: 4 UCS aposentadas por erro de dev em produção', severity: 'critical' },
    { date: '10/12/2025', title: 'MIGRAÇÃO FALHA: 53 fazendas ausentes na base de dados', severity: 'critical' },
    { date: '12/12/2025', title: 'Falha de hash e desconexão da Blockchain (API Down)', severity: 'critical' },
    { date: '07/01/2026', title: 'Reporte de 4 novos bugs críticos em inspeção interna', severity: 'high' },
    { date: '20/01/2026', title: 'Funcionalidade de BLOQUEIO DE UCS inoperante (não testada)', severity: 'critical' },
    { date: '22/01/2026', title: 'Erro em Report (Reveillon Copacabana) e planilha de movimentação', severity: 'critical' },
    { date: '03/02/26', title: 'Report SaaS BMV com campos em branco (Titular/KPIs)', severity: 'high' },
    { date: '05/02/26', title: 'VULNERABILIDADE: Sistema exige senha do cliente para Admin editar', severity: 'critical' },
    { date: '23/02/2026', title: 'QUEDA TOTAL: Máquina com disco cheio na Cloudflare', severity: 'critical' },
  ],
};

export const CONTRACTUAL_ANALYSIS = {
  executiveSummary: "A análise detalhada de 2.825 mensagens e interações, consolidadas em duas fases de suporte (Jun/25 a Mar/26), revela um padrão persistente de instabilidade sistêmica, falhas de integridade de dados e processos de garantia de qualidade (QA) insuficientes. Foram identificados mais de 60 incidentes técnicos relevantes, desde falhas básicas de infraestrutura (DNS/E-mail) até erros críticos de emissão de ativos em blockchain. A recorrência de 'testes em produção' e a admissão explícita de desconhecimento das regras de negócio por parte da contratada demonstram um descumprimento material das boas práticas de desenvolvimento de software e segurança cibernética.",
  clauses: [
    {
      id: "9.2",
      text: "Se qualquer uma das Partes não cumprir suas obrigações... e tal inadimplência não for remediada dentro de 15 (quinze) dias após notificação escrita, a outra Parte terá o direito de encerrar imediatamente suas obrigações contratuais.",
      violationReason: "Ocorrência de falhas críticas (ex: vulnerabilidade de senha) que permaneceram sem correção por mais de 15 dias (05/02 a 24/02)."
    },
    {
      id: "9.3",
      text: "Em circunstâncias onde: (a) uma das Partes falhar repetidamente em cumprir suas obrigações... a outra Parte poderá rescindir o Contrato de forma antecipada.",
      violationReason: "Padrão sistêmico de reincidência de bugs e falhas de integridade de dados (emissão tripla de UCS)."
    }
  ],
  incidentsTable: [
    { date: '28/08/25', requester: 'Thaynara', demand: 'Falha Crítica no envio de PIN', response: 'Problema de DNS/Locaweb', status: 'Resolvido (05/09)', days: '8', framing: 'Cláusula 9.3' },
    { date: '04/09/25', requester: 'Thaynara', demand: 'Report Mumbuca não abre', response: 'Bug de lógica de negócio', status: 'Resolvido', days: '1', framing: 'Operacional' },
    { date: '11/09/25', requester: 'Alessandra', demand: 'Safra Duplicada em Blockchain', response: 'Limpeza manual no banco', status: 'Resolvido (15/09)', days: '4', framing: 'Cláusula 9.3 (Grave)' },
    { date: '25/09/25', requester: 'Alessandra', demand: 'Instabilidade Site (WordPress)', response: 'Erro em manutenção manual', status: 'Resolvido', days: '1', framing: 'Cláusula 9.2' },
    { date: '20/10/25', requester: 'Alessandra', demand: 'SISTEMA FORA DO AR (AWS)', response: 'Incidente Cloud AWS', status: 'Resolvido', days: '1', framing: 'Cláusula 9.2' },
    { date: '11/11/25', requester: 'Thaynara', demand: 'Pedido 50 Travado (Real)', response: 'Erro simulado pelo Dev', status: 'Resolvido (14/11)', days: '3', framing: 'Cláusula 9.3' },
    { date: '17/11/25', requester: 'Luiz Paulo', demand: 'Erro NaN em Cotações', response: 'Ajuste via Banco', status: 'Resolvido (24/11)', days: '7', framing: 'Operacional' },
    { date: '04/12/25', requester: 'Thaynara', demand: 'EMISSÃO TRIPLA UCS (Pedido 905)', response: 'Admissão de erro em testes', status: 'Resolvido', days: '1', framing: 'Cláusula 9.3 (Grave)' },
    { date: '10/12/25', requester: 'Luiz Paulo', demand: '53 Fazendas Faltantes', response: 'Falha na migração do legado', status: 'Resolvido', days: '1', framing: 'Cláusula 9.3' },
    { date: '20/01/26', requester: 'Luiz Paulo', demand: 'Bloqueio de UCS Inoperante', response: 'Admitido falta de teste inicial', status: 'Resolvido (23/01)', days: '3', framing: 'Cláusula 9.3' },
    { date: '22/01/26', requester: 'Thaynara', demand: 'Erro Report (Reveillon)', response: 'Correção emergencial', status: 'Resolvido (23/01)', days: '1', framing: 'Crítico/Comercial' },
    { date: '05/02/26', requester: 'Thaynara', demand: 'Exigência de Senha do Cliente', response: 'Bug de Regra de Acesso', status: 'Resolvido (24/02)', days: '19', framing: 'Cláusula 9.2 (Vencido)' },
    { date: '23/02/26', requester: 'Luiz Paulo', demand: 'SISTEMA FORA DO AR', response: 'Disco cheio na Cloudflare', status: 'Resolvido', days: '1', framing: 'Cláusula 9.2' },
  ],
  conclusion: "Há indícios suficientes e materiais de descumprimento recorrente do contrato. A análise das interações comprova que o sistema entregue não atingiu o nível de maturidade e confiabilidade esperado para uma operação financeira e de auditoria."
};
