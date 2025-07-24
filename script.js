// FAQ Accordion
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Fechar todos os FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Abrir o FAQ clicado se não estava ativo
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Função de compra
function comprar() {
    // Aqui você pode integrar com seu sistema de pagamento
    // Por enquanto, vamos simular um redirecionamento
    
    // Exemplo de integração com checkout
    // window.location.href = 'https://checkout.exemplo.com/morango-do-amor';
    
    // Para demonstração, vamos mostrar um alert
    alert('Redirecionando para o checkout seguro...\n\nEm breve você terá acesso ao método completo do Morango do Amor!');
    
    // Opcional: Tracking de conversão
    // gtag('event', 'purchase_intent', {
    //     'event_category': 'ecommerce',
    //     'event_label': 'morango_do_amor',
    //     'value': 19.90
    // });
}

// Smooth scroll para links internos
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar animações de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.learning-item, .bonus-card, .proof-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Esconder botão fixo mobile quando necessário
    let lastScrollTop = 0;
    const mobileButton = document.querySelector('.mobile-fixed-button');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Esconder botão quando scrolling para baixo, mostrar quando para cima
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            mobileButton.style.transform = 'translateY(100%)';
        } else {
            mobileButton.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Melhorar experiência do vídeo
    const video = document.querySelector('video');
    if (video) {
        video.addEventListener('play', function() {
            // Tracking de engajamento
            console.log('Vídeo iniciado');
        });
        
        video.addEventListener('ended', function() {
            // Mostrar CTA após vídeo terminar
            const ctaButton = document.querySelector('.main-cta');
            if (ctaButton) {
                ctaButton.style.animation = 'pulse 2s infinite';
            }
        });
    }
});

// Adicionar CSS para animação de pulse
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Função para melhorar performance em mobile
function optimizeForMobile() {
    // Lazy loading para imagens
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Otimizar scroll em mobile
    let ticking = false;
    function updateScrollEffects() {
        // Efeitos de scroll otimizados
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate);
}

// Inicializar otimizações
document.addEventListener('DOMContentLoaded', optimizeForMobile);

// Prevenção de spam nos botões
let isProcessing = false;
const originalComprar = comprar;

comprar = function() {
    if (isProcessing) return;
    
    isProcessing = true;
    
    // Desabilitar botões temporariamente
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(btn => {
        btn.style.opacity = '0.7';
        btn.style.pointerEvents = 'none';
    });
    
    // Executar compra original
    originalComprar();
    
    // Reabilitar após 3 segundos
    setTimeout(() => {
        isProcessing = false;
        buttons.forEach(btn => {
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'auto';
        });
    }, 3000);
};

// Adicionar eventos de toque para melhor experiência mobile
document.addEventListener('touchstart', function() {}, {passive: true});

// Melhorar performance do FAQ
document.addEventListener('click', function(e) {
    if (e.target.closest('.faq-question')) {
        e.preventDefault();
        toggleFaq(e.target.closest('.faq-question'));
    }
});

// Adicionar feedback visual nos botões
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
    });
});

