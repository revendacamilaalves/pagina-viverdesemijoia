document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // CONFIGURAÇÃO DO DELAY DO VSL (Sincronizado com VTurb)
    // ==========================================
    
    // 10 seg (PARA TESTE)
    const SECONDS_TO_DISPLAY = 10;
    let isRevealed = false;

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
        const checkTime = setInterval(() => {
            if (isRevealed) return;
            
            if (typeof smartplayer !== 'undefined' && smartplayer.instances && smartplayer.instances.length > 0) {
                if (smartplayer.instances[0].video && smartplayer.instances[0].video.currentTime >= SECONDS_TO_DISPLAY) {
                    isRevealed = true;
                    clearInterval(checkTime);
                    console.log("Tempo exato atingido no vídeo! Revelando a página...");
                    
                    delayedContent.classList.remove('hidden');
                    void delayedContent.offsetWidth; 
                    delayedContent.classList.remove('opacity-0');
                    
                    try {
                        if (typeof lucide !== 'undefined') {
                            lucide.createIcons();
                        }
                    } catch(e) {}
                    
                    if (window.innerWidth < 768) {
                        setTimeout(() => {
                            const cta = document.getElementById('cta-button');
                            if(cta) cta.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }, 500); 
                    }
                }
            }
        }, 1000);
    }
});
