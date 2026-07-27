document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // ==========================================
    // CONFIGURAÇÃO DO DELAY DO VSL
    // ==========================================
    
    // Altere este valor para o tempo do seu pitch.
    // Exemplo para 15 minutos: 15 * 60 * 1000 = 900000
    // Atualmente está em 10 segundos para testes: 10 * 1000 = 10000
    const DELAY_IN_MILLISECONDS = 10000; 

    const delayedContent = document.getElementById('delayed-content');
    const delayStatus = document.getElementById('delay-status');

    if (delayedContent) {
        setTimeout(() => {
            // Remove a classe 'hidden' que esconde o elemento do DOM
            delayedContent.classList.remove('hidden');
            
            // Força um pequeno reflow para o navegador registrar a remoção do display:none
            // antes de alterar a opacidade, garantindo a transição suave.
            void delayedContent.offsetWidth; 
            
            // Remove a opacidade 0, fazendo o elemento aparecer suavemente
            delayedContent.classList.remove('opacity-0');
            delayedContent.classList.add('opacity-100');

            // Esconde a mensagem de teste
            if(delayStatus) delayStatus.style.display = 'none';

        }, DELAY_IN_MILLISECONDS);
    }
});
