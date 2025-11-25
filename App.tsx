import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './views/Dashboard';
import { Finance } from './views/Finance';
import { Users } from './views/Users';
import { Integrations } from './views/Integrations';
import { Login } from './views/Login';
import { User, UserRole } from './types';
import { Button } from './components/Button';
import { analyzeLegalText } from './services/geminiService';

// Mock Logged In User
const DEFAULT_USER: User = {
    id: '1',
    name: 'Jéssica Medeiros',
    email: 'admin@jml.adv.br',
    role: UserRole.SUPER_ADMIN,
    active: true
};

const LegalAssistantWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAsk = async () => {
        if (!query.trim()) return;
        setLoading(true);
        const result = await analyzeLegalText(query);
        setResponse(result);
        setLoading(false);
    };

    return (
        <>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full shadow-2xl shadow-amber-900/50 flex items-center justify-center text-white z-50 hover:scale-110 transition-transform"
                title="Assistente IA"
            >
                <span className="material-symbols-outlined text-2xl">smart_toy</span>
            </button>

            {isOpen && (
                <div className="fixed bottom-24 right-8 w-96 h-[500px] glass-panel rounded-2xl shadow-2xl flex flex-col z-50 border border-white/10 animate-fade-in-up">
                    <div className="p-4 border-b border-white/10 bg-navy-900/50 flex justify-between items-center rounded-t-2xl">
                        <h3 className="font-serif text-white font-bold">Assistente Jurídico IA</h3>
                        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white"><span className="material-symbols-outlined">close</span></button>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        {response ? (
                            <div className="bg-white/5 p-3 rounded-lg text-sm text-slate-200 border border-white/5">
                                <strong className="block text-amber-500 mb-2">Resposta:</strong>
                                <div className="whitespace-pre-wrap">{response}</div>
                                <button onClick={() => setResponse('')} className="mt-3 text-xs text-slate-400 underline">Nova Consulta</button>
                            </div>
                        ) : (
                            <div className="text-center text-slate-500 mt-10">
                                <span className="material-symbols-outlined text-4xl mb-2 opacity-50">gavel</span>
                                <p className="text-sm">Cole um texto jurídico para análise, resumo ou identificação de riscos.</p>
                            </div>
                        )}
                    </div>
                    <div className="p-4 border-t border-white/10 bg-navy-900/50 rounded-b-2xl">
                        <textarea 
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Digite ou cole o texto aqui..." 
                            className="w-full bg-navy-900 border border-slate-700 rounded-lg p-3 text-sm text-white focus:border-amber-500 focus:outline-none resize-none h-20 mb-2"
                        />
                        <Button onClick={handleAsk} isLoading={loading} className="w-full text-xs">Analisar</Button>
                    </div>
                </div>
            )}
        </>
    )
}

const PlaceholderView = ({ title }: { title: string }) => (
    <div className="flex flex-col items-center justify-center h-96 text-slate-500">
        <span className="material-symbols-outlined text-6xl mb-4 opacity-20">construction</span>
        <h2 className="text-xl font-serif text-slate-300">{title}</h2>
        <p className="text-sm">Módulo em desenvolvimento.</p>
    </div>
);

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    if (!isAuthenticated) {
        return <Login onLogin={() => setIsAuthenticated(true)} />;
    }

    return (
        <Router>
            <Layout user={DEFAULT_USER} onLogout={() => setIsAuthenticated(false)}>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/finance" element={<Finance />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/integrations" element={<Integrations />} />
                    <Route path="/logs" element={<PlaceholderView title="Auditoria & Logs" />} />
                    <Route path="/settings" element={<PlaceholderView title="Configurações" />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
                <LegalAssistantWidget />
            </Layout>
        </Router>
    );
};

export default App;