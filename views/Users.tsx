import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { User, UserRole } from '../types';

const mockUsers: User[] = [
    { id: '1', name: 'Jéssica Medeiros', email: 'jessica@jml.adv.br', role: UserRole.SUPER_ADMIN, active: true, lastLogin: 'Agora' },
    { id: '2', name: 'Carlos Maciel', email: 'carlos@jml.adv.br', role: UserRole.ADMIN, active: true, lastLogin: '2 horas atrás' },
    { id: '3', name: 'Ana Lirman', email: 'ana@jml.adv.br', role: UserRole.SENIOR_LAWYER, active: true, lastLogin: 'Ontem' },
    { id: '4', name: 'Pedro Santos', email: 'pedro@jml.adv.br', role: UserRole.JUNIOR_LAWYER, active: false, lastLogin: '5 dias atrás' },
];

export const Users: React.FC = () => {
    return (
        <div className="space-y-6">
             <header className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-serif text-white font-bold">Equipe JML</h2>
                    <p className="text-slate-400">Gerenciamento de acessos e permissões.</p>
                </div>
                <Button icon="person_add">Novo Usuário</Button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Quick stats for users could go here */}
            </div>

            <Card className="overflow-hidden p-0">
                 <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5 text-xs uppercase tracking-wider text-slate-400">
                            <th className="p-4 font-medium">Nome</th>
                            <th className="p-4 font-medium">Função</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium">Último Acesso</th>
                            <th className="p-4 font-medium text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm">
                        {mockUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                                <td className="p-4">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold mr-3 text-white">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-medium text-white">{user.name}</div>
                                            <div className="text-xs text-slate-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-900/50 text-blue-200 border border-blue-800">
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4">
                                    {user.active ? (
                                        <span className="flex items-center text-green-400 text-xs"><span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>Ativo</span>
                                    ) : (
                                        <span className="flex items-center text-slate-500 text-xs"><span className="w-2 h-2 rounded-full bg-slate-500 mr-2"></span>Inativo</span>
                                    )}
                                </td>
                                <td className="p-4 text-slate-400">{user.lastLogin}</td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button title="Editar" className="p-1 hover:text-amber-400 transition-colors text-slate-400"><span className="material-symbols-outlined text-lg">edit</span></button>
                                        <button title="Permissões" className="p-1 hover:text-blue-400 transition-colors text-slate-400"><span className="material-symbols-outlined text-lg">vpn_key</span></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
            </Card>
        </div>
    );
};