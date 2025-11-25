import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Jan', receita: 40000, despesa: 24000 },
  { name: 'Fev', receita: 30000, despesa: 13980 },
  { name: 'Mar', receita: 20000, despesa: 9800 },
  { name: 'Abr', receita: 27800, despesa: 39080 },
  { name: 'Mai', receita: 18900, despesa: 4800 },
  { name: 'Jun', receita: 23900, despesa: 3800 },
  { name: 'Jul', receita: 34900, despesa: 4300 },
];

const StatCard = ({ title, value, trend, icon }: any) => (
  <Card className="relative overflow-hidden group">
    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <span className="material-symbols-outlined text-6xl text-amber-500">{icon}</span>
    </div>
    <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">{title}</h3>
    <p className="text-3xl font-serif text-white mt-2 font-bold">{value}</p>
    <div className={`mt-2 flex items-center text-xs font-medium ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
        <span className="material-symbols-outlined text-sm mr-1">{trend >= 0 ? 'trending_up' : 'trending_down'}</span>
        {Math.abs(trend)}% em relação ao mês anterior
    </div>
  </Card>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h2 className="text-3xl font-serif text-white font-bold">Visão Geral</h2>
            <p className="text-slate-400">Bem-vindo ao JML Legal Suite. Hoje é {new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.</p>
        </div>
        <div className="flex gap-3">
            <Button variant="secondary" icon="add">Novo Processo</Button>
            <Button icon="description">Relatório Rápido</Button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Receita Mensal" value="R$ 124.500" trend={12.5} icon="attach_money" />
        <StatCard title="Casos Ativos" value="48" trend={5.2} icon="gavel" />
        <StatCard title="Clientes Novos" value="12" trend={-2.4} icon="person_add" />
        <StatCard title="Eficiência" value="94%" trend={1.8} icon="query_stats" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card title="Performance Financeira (2025)" className="lg:col-span-2">
            <div className="h-80 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#d97706" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="name" stroke="#94a3b8" tick={{fontSize: 12}} />
                        <YAxis stroke="#94a3b8" tick={{fontSize: 12}} tickFormatter={(val) => `R$${val/1000}k`} />
                        <Tooltip 
                            contentStyle={{backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc'}} 
                            itemStyle={{color: '#fbbf24'}}
                        />
                        <Area type="monotone" dataKey="receita" stroke="#fbbf24" strokeWidth={2} fillOpacity={1} fill="url(#colorReceita)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>

        {/* Side Widget */}
        <Card title="Próximos Prazos" action={<button className="text-amber-500 text-sm hover:underline">Ver tudo</button>}>
            <div className="space-y-4 mt-2">
                {[
                    { title: "Audiência Silva vs. Banco X", date: "Hoje, 14:00", type: "Audiência", color: "bg-red-500" },
                    { title: "Entrega de Contestação - Caso 402", date: "Amanhã, 18:00", type: "Protocolo", color: "bg-amber-500" },
                    { title: "Reunião Dr. Mendes", date: "24 Out, 10:00", type: "Reunião", color: "bg-blue-500" },
                    { title: "Pagamento Custas Finais", date: "25 Out", type: "Financeiro", color: "bg-green-500" },
                ].map((item, idx) => (
                    <div key={idx} className="flex items-start p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                        <div className={`w-1 h-10 rounded-full mr-3 ${item.color}`}></div>
                        <div>
                            <h4 className="text-slate-200 font-medium text-sm group-hover:text-amber-400 transition-colors">{item.title}</h4>
                            <p className="text-xs text-slate-500">{item.date} • {item.type}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
      </div>
    </div>
  );
};