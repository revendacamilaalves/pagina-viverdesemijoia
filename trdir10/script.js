document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // CONFIGURAÇÃO DO DELAY DO VSL
    // ==========================================
    
    // Tempo em milissegundos (10 segundos = 10000)
    const DELAY_IN_MILLISECONDS = 10000; 

    const delayedContent = document.getElementById('delayed-content');

    // Inicializa ícones que já estão visíveis
    try {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    } catch(e) {
        console.error("Lucide error:", e);
    }

    if (delayedContent) {
        setTimeout(() => {
            // Remove a classe 'hidden' que esconde o elemento do DOM
            delayedContent.classList.remove('hidden');
            
            // Força um pequeno reflow para o navegador registrar a remoção do display:none
            void delayedContent.offsetWidth; 
            
            // Remove a opacidade 0, fazendo o elemento aparecer suavemente
            delayedContent.classList.remove('opacity-0');
            
            // Reinicializa os ícones para renderizar os que estavam escondidos
            try {
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            } catch(e) {}

        }, DELAY_IN_MILLISECONDS);
    }
});
