document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // CONFIGURAÇÃO DO DELAY DO VSL (Sincronizado com VTurb)
    // ==========================================
    
    // 18 min e 43 seg = 1080 seg + 43 seg = 1123 segundos (Modificado para 10s para teste)
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
            
            let currentTime = 0;
            
            // Tenta obter o tempo via API do smartplayer
            if (typeof smartplayer !== 'undefined' && smartplayer.instances && smartplayer.instances.length > 0 && smartplayer.instances[0].video) {
                currentTime = smartplayer.instances[0].video.currentTime;
            } 
            // Fallback 1: Tenta achar a tag de vídeo dentro do elemento do VTurb
            else {
                const vturbContainer = document.getElementById('vid-67f492608b469a116a77291d');
                if (vturbContainer) {
                    const videoEl = vturbContainer.querySelector('video');
                    if (videoEl) currentTime = videoEl.currentTime;
                }
            }
            
            // Fallback 2: Tenta qualquer tag de vídeo na página
            if (currentTime === 0) {
                const anyVideo = document.querySelector('video');
                if (anyVideo) currentTime = anyVideo.currentTime;
            }

            if (currentTime >= SECONDS_TO_DISPLAY && currentTime > 0) {
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
        }, 1000);
    }
});
