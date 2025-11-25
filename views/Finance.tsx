import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { FeeType, PaymentStatus, FinancialRecord } from '../types';
import { generateFinancialInsights } from '../services/geminiService';

const mockRecords: FinancialRecord[] = [
    { id: '1', clientName: 'Construtora Elite', caseRef: 'CIV-2024-001', description: 'Honorários Iniciais', amount: 15000, dueDate: '2024-10-25', status: PaymentStatus.PENDING, type: FeeType.FIXED, lawyerId: '1' },
    { id: '2', clientName: 'Roberto Almeida', caseRef: 'TRA-2024-055', description: 'Êxito Processo Trabalhista', amount: 45000, dueDate: '2024-10-20', status: PaymentStatus.PAID, type: FeeType.PERCENTAGE, lawyerId: '2' },
    { id: '3', clientName: 'Tech Solutions LTDA', caseRef: 'CON-2024-102', description: 'Partido Mensal Outubro', amount: 5000, dueDate: '2024-10-05', status: PaymentStatus.OVERDUE, type: FeeType.RETAINER, lawyerId: '1' },
    { id: '4', clientName: 'Maria Silva', caseRef: 'FAM-2024-012', description: 'Consultoria Divórcio', amount: 1200, dueDate: '2024-10-28', status: PaymentStatus.DRAFT, type: FeeType.HOURLY, lawyerId: '3' },
];

export const Finance: React.FC = () => {
    const [insight, setInsight] = useState<string | null>(null);
    const [loadingInsight, setLoadingInsight] = useState(false);

    const handleGenerateInsight = async () => {
        setLoadingInsight(true);
        // Serialize data for the AI
        const context = JSON.stringify(mockRecords.map(r => ({ amount: r.amount, status: r.status, type: r.type })));
        const result = await generateFinancialInsights(context);
        setInsight(result);
        setLoadingInsight(false);
    };

    const getStatusBadge = (status: PaymentStatus) => {
        const styles = {
            [PaymentStatus.PAID]: 'bg-green-500/10 text-green-400 border-green-500/20',
            [PaymentStatus.PENDING]: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
            [PaymentStatus.OVERDUE]: 'bg-red-500/10 text-red-400 border-red-500/20',
            [PaymentStatus.DRAFT]: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
        };
        return (
            <span className={`px-2 py-1 rounded text-xs font-medium border ${styles[status]}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-serif text-white font-bold">Gestão Financeira</h2>
                    <p className="text-slate-400">Controle de honorários, custas e fluxo de caixa.</p>
                </div>
                <Button icon="add">Nova Receita</Button>
            </header>

            {/* AI Insight Section */}
            <Card className="bg-gradient-to-r from-indigo-900/40 to-navy-900/40 border-indigo-500/30">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-amber-400">auto_awesome</span>
                        <h3 className="font-serif text-lg text-white">Análise Inteligente (Gemini AI)</h3>
                    </div>
                    {!insight && (
                        <Button variant="ghost" onClick={handleGenerateInsight} isLoading={loadingInsight} className="text-indigo-300">
                            Gerar Análise
                        </Button>
                    )}
                </div>
                {insight ? (
                    <div className="animate-fade-in">
                        <p className="text-slate-300 italic leading-relaxed">"{insight}"</p>
                        <button onClick={() => setInsight(null)} className="text-xs text-slate-500 mt-2 hover:text-white">Fechar</button>
                    </div>
                ) : (
                    <p className="text-slate-400 text-sm">Clique para gerar um resumo executivo da saúde financeira deste mês com base nos registros abaixo.</p>
                )}
            </Card>

            <Card className="overflow-hidden p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5 text-xs uppercase tracking-wider text-slate-400">
                                <th className="p-4 font-medium">Cliente / Caso</th>
                                <th className="p-4 font-medium">Descrição</th>
                                <th className="p-4 font-medium">Tipo</th>
                                <th className="p-4 font-medium">Vencimento</th>
                                <th className="p-4 font-medium">Valor</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {mockRecords.map((record) => (
                                <tr key={record.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <div className="font-medium text-white">{record.clientName}</div>
                                        <div className="text-xs text-slate-500">{record.caseRef}</div>
                                    </td>
                                    <td className="p-4 text-slate-300">{record.description}</td>
                                    <td className="p-4 text-slate-400">{record.type}</td>
                                    <td className="p-4 text-slate-400 font-mono">{new Date(record.dueDate).toLocaleDateString()}</td>
                                    <td className="p-4 font-medium text-white">
                                        R$ {record.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="p-4">{getStatusBadge(record.status)}</td>
                                    <td className="p-4 text-right">
                                        <button className="text-slate-400 hover:text-white transition-colors">
                                            <span className="material-symbols-outlined">more_vert</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-white/10 flex justify-between items-center text-xs text-slate-400">
                    <span>Mostrando 4 de 128 registros</span>
                    <div className="flex gap-2">
                        <button className="px-2 py-1 rounded hover:bg-white/5 disabled:opacity-50">Anterior</button>
                        <button className="px-2 py-1 rounded hover:bg-white/5">Próximo</button>
                    </div>
                </div>
            </Card>
        </div>
    );
};