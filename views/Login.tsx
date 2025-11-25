import React from 'react';

export const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a192f] relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-amber-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute top-[40%] right-[10%] w-[30%] h-[30%] bg-blue-900/20 rounded-full blur-[100px]"></div>
            </div>

            <div className="glass-panel p-10 md:p-14 rounded-2xl shadow-2xl max-w-md w-full z-10 border border-white/10 relative">
                <div className="text-center mb-10">
                    <h1 className="font-serif text-3xl font-bold text-white tracking-widest mb-2">JML</h1>
                    <p className="text-[0.65rem] uppercase tracking-[0.3em] text-amber-500 font-medium">Sociedade de Advogados</p>
                </div>

                <div className="space-y-6">
                    <div className="text-center">
                        <h2 className="text-xl text-slate-200 font-serif mb-2">Acesso Restrito</h2>
                        <p className="text-slate-400 text-sm">Utilize suas credenciais corporativas ou autenticação Google.</p>
                    </div>

                    <button 
                        onClick={onLogin}
                        className="w-full bg-white text-navy-900 font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-3 hover:bg-slate-100 transition-all duration-300 shadow-lg transform hover:-translate-y-0.5"
                    >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                        Entrar com Google
                    </button>
                    
                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-slate-700"></div>
                        <span className="flex-shrink-0 mx-4 text-slate-600 text-xs">OU</span>
                        <div className="flex-grow border-t border-slate-700"></div>
                    </div>

                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
                        <div>
                            <label className="block text-xs uppercase tracking-wide text-slate-500 mb-1">Usuário</label>
                            <input type="text" className="w-full bg-navy-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all" placeholder="admin" />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-wide text-slate-500 mb-1">Senha</label>
                            <input type="password" className="w-full bg-navy-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all" placeholder="••••••••" />
                        </div>
                        <button 
                            type="submit"
                            className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg shadow-amber-900/30"
                        >
                            Acessar Sistema
                        </button>
                    </form>

                    <div className="text-center mt-6">
                        <a href="#" className="text-xs text-slate-500 hover:text-amber-500 transition-colors">Esqueceu sua senha?</a>
                    </div>
                </div>
            </div>
             <div className="absolute bottom-6 text-center w-full z-10 opacity-30">
                <p className="text-[10px] text-white">© 2024 JML Sociedade de Advogados. Todos os direitos reservados.</p>
            </div>
        </div>
    );
};