import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { IntegrationStatus } from '../types';

const integrations: IntegrationStatus[] = [
    { service: 'Drive', connected: true, lastSync: '10 min atrás', icon: 'cloud_upload' },
    { service: 'Calendar', connected: true, lastSync: 'Em tempo real', icon: 'calendar_month' },
    { service: 'Gmail', connected: false, icon: 'mail' },
    { service: 'Docs', connected: true, lastSync: '1 hora atrás', icon: 'description' },
    { service: 'Sheets', connected: false, icon: 'table_view' },
];

export const Integrations: React.FC = () => {
    return (
        <div className="space-y-6">
            <header>
                <h2 className="text-3xl font-serif text-white font-bold">Central de Integrações</h2>
                <p className="text-slate-400">Conecte o JML Suite ao ecossistema Google Workspace.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {integrations.map((int) => (
                    <Card key={int.service} className={`border-l-4 ${int.connected ? 'border-l-green-500' : 'border-l-slate-600'}`}>
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-lg ${int.connected ? 'bg-green-500/10 text-green-400' : 'bg-slate-700/50 text-slate-400'}`}>
                                    <span className="material-symbols-outlined text-2xl">{int.icon}</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-lg">Google {int.service}</h3>
                                    <p className="text-xs text-slate-400">
                                        {int.connected ? `Sincronizado: ${int.lastSync}` : 'Não conectado'}
                                    </p>
                                </div>
                            </div>
                            <div className={`w-3 h-3 rounded-full ${int.connected ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-slate-600'}`}></div>
                        </div>
                        <div className="mt-6">
                            {int.connected ? (
                                <div className="flex gap-2">
                                     <Button variant="secondary" className="w-full text-xs py-2">Configurar</Button>
                                     <Button variant="danger" className="w-auto text-xs py-2 px-3 icon-only"><span className="material-symbols-outlined text-sm">link_off</span></Button>
                                </div>
                            ) : (
                                <Button className="w-full text-xs py-2">Conectar Conta</Button>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
            
            <Card title="Logs de Sincronização Recentes">
                <div className="space-y-3 mt-2">
                    {[1,2,3].map(i => (
                        <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0">
                            <span className="text-slate-300">Backup automático de documentos</span>
                            <span className="text-slate-500 font-mono text-xs">2024-10-24 14:3{i}:00</span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};