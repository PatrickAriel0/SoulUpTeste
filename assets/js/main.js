/* ==========================================================================
   MAIN.JS - Interações globais (menu hambúrguer, scroll, marcação ativa)
   Projeto: SoulUp - Avatar Inteligente | Challenge 2026 FIAP
   COMMIT: INTEGRANTE_1 - Comportamento do menu e navegação
   ========================================================================== */

(function () {
    'use strict';

    /* ----------------------------------------------------------------------
       1. MENU HAMBÚRGUER (mobile)
       ---------------------------------------------------------------------- */
    function initMobileMenu() {
        const toggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('.main-nav');

        if (!toggle || !nav) return;

        toggle.addEventListener('click', function () {
            const isOpen = nav.classList.toggle('is-open');
            toggle.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Fecha o menu ao clicar em um link (navegação mobile)
        const links = nav.querySelectorAll('a');
        links.forEach(function (link) {
            link.addEventListener('click', function () {
                nav.classList.remove('is-open');
                toggle.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Fecha ao redimensionar para desktop
        window.addEventListener('resize', function () {
            if (window.innerWidth > 991 && nav.classList.contains('is-open')) {
                nav.classList.remove('is-open');
                toggle.classList.remove('is-open');
                document.body.style.overflow = '';
            }
        });
    }

    /* ----------------------------------------------------------------------
       2. MARCAR LINK ATIVO NO MENU (baseado na URL atual)
       ---------------------------------------------------------------------- */
    function highlightActiveLink() {
        const path = window.location.pathname.split('/').pop() || 'index.html';
        const links = document.querySelectorAll('.nav-list a');

        links.forEach(function (link) {
            const href = link.getAttribute('href');
            if (href === path || (path === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    /* ----------------------------------------------------------------------
       3. SMOOTH SCROLL PARA LINKS ÂNCORA (#)
       ---------------------------------------------------------------------- */
    function initSmoothScroll() {
        const anchors = document.querySelectorAll('a[href^="#"]');
        anchors.forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                const targetId = anchor.getAttribute('href');
                if (targetId === '#' || targetId.length < 2) return;

                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /* ----------------------------------------------------------------------
       4. ANIMAÇÃO DE ENTRADA AO ROLAR (Intersection Observer)
       ---------------------------------------------------------------------- */
    function initScrollReveal() {
        const elements = document.querySelectorAll('[data-reveal]');
        if (!elements.length || !('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        elements.forEach(function (el) {
            observer.observe(el);
        });
    }

    /* ----------------------------------------------------------------------
       5. ATUALIZA ANO NO FOOTER (year copyright)
       ---------------------------------------------------------------------- */
    function updateFooterYear() {
        const yearEl = document.querySelector('[data-current-year]');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    }

    /* ----------------------------------------------------------------------
       INICIALIZAÇÃO QUANDO O DOM ESTIVER PRONTO
       ---------------------------------------------------------------------- */
    document.addEventListener('DOMContentLoaded', function () {
        initMobileMenu();
        highlightActiveLink();
        initSmoothScroll();
        initScrollReveal();
        updateFooterYear();
    });

})();
