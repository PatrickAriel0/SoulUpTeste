/* ==========================================================================
   FAQ.JS - Interatividade do FAQ (accordion + busca + filtro de categorias)
   COMMIT: INTEGRANTE_3 - Comportamento dinâmico do FAQ
   ========================================================================== */

(function () {
    'use strict';

    /* ----------------------------------------------------------------------
       1. ACCORDION - abre/fecha as perguntas
       ---------------------------------------------------------------------- */
    function initAccordion() {
        const items = document.querySelectorAll('.faq-item');

        items.forEach(function (item) {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');

            if (!question || !answer) return;

            question.addEventListener('click', function () {
                const isOpen = item.classList.contains('is-open');

                // Fecha todas as outras perguntas (modo accordion)
                document.querySelectorAll('.faq-item.is-open').forEach(function (other) {
                    if (other !== item) {
                        other.classList.remove('is-open');
                        const otherAnswer = other.querySelector('.faq-answer');
                        if (otherAnswer) otherAnswer.style.maxHeight = '0';
                        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                    }
                });

                // Toggle do item clicado
                if (isOpen) {
                    item.classList.remove('is-open');
                    answer.style.maxHeight = '0';
                    question.setAttribute('aria-expanded', 'false');
                } else {
                    item.classList.add('is-open');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    question.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

    /* ----------------------------------------------------------------------
       2. FILTRO POR CATEGORIA
       ---------------------------------------------------------------------- */
    function initCategoryFilter() {
        const buttons = document.querySelectorAll('.category-btn');
        const items = document.querySelectorAll('.faq-item');

        buttons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                const category = btn.dataset.category;

                // Marca botão ativo
                buttons.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');

                // Filtra perguntas
                items.forEach(function (item) {
                    item.classList.remove('is-hidden');
                    item.classList.remove('is-open');
                    const answer = item.querySelector('.faq-answer');
                    if (answer) answer.style.maxHeight = '0';

                    if (category !== 'todas' && item.dataset.category !== category) {
                        item.classList.add('is-hidden');
                    }
                });

                updateEmptyState();
                clearSearch();
            });
        });
    }

    /* ----------------------------------------------------------------------
       3. BUSCA EM TEMPO REAL
       ---------------------------------------------------------------------- */
    function initSearch() {
        const input = document.querySelector('#faq-search-input');
        const items = document.querySelectorAll('.faq-item');

        if (!input) return;

        input.addEventListener('input', function () {
            const term = input.value.trim().toLowerCase();

            // Reseta filtro de categoria visualmente
            const buttons = document.querySelectorAll('.category-btn');
            buttons.forEach(function (b) { b.classList.remove('active'); });
            const allBtn = document.querySelector('[data-category="todas"]');
            if (allBtn) allBtn.classList.add('active');

            items.forEach(function (item) {
                const question = item.querySelector('.faq-question')?.textContent.toLowerCase() || '';
                const answer = item.querySelector('.faq-answer-inner')?.textContent.toLowerCase() || '';

                if (term === '' || question.includes(term) || answer.includes(term)) {
                    item.classList.remove('is-hidden');
                } else {
                    item.classList.add('is-hidden');
                    item.classList.remove('is-open');
                    const ans = item.querySelector('.faq-answer');
                    if (ans) ans.style.maxHeight = '0';
                }
            });

            updateEmptyState();
        });
    }

    /* ----------------------------------------------------------------------
       4. ESTADO VAZIO (nenhuma pergunta encontrada)
       ---------------------------------------------------------------------- */
    function updateEmptyState() {
        const visible = document.querySelectorAll('.faq-item:not(.is-hidden)');
        const empty = document.querySelector('.faq-empty');

        if (empty) {
            if (visible.length === 0) {
                empty.classList.add('is-visible');
            } else {
                empty.classList.remove('is-visible');
            }
        }
    }

    /* ----------------------------------------------------------------------
       5. LIMPA O CAMPO DE BUSCA AO TROCAR DE CATEGORIA
       ---------------------------------------------------------------------- */
    function clearSearch() {
        const input = document.querySelector('#faq-search-input');
        if (input) input.value = '';
    }

    /* ----------------------------------------------------------------------
       INICIALIZAÇÃO
       ---------------------------------------------------------------------- */
    document.addEventListener('DOMContentLoaded', function () {
        initAccordion();
        initCategoryFilter();
        initSearch();
    });

})();
