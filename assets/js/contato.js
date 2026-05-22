/* ==========================================================================
   CONTATO.JS - Validação do formulário de contato
   COMMIT: INTEGRANTE_4 - Validação dos campos e feedback ao usuário
   ========================================================================== */

(function () {
    'use strict';

    /* ----------------------------------------------------------------------
       Constantes e seletores
       ---------------------------------------------------------------------- */
    const form = document.querySelector('#contact-form');
    if (!form) return;

    const fields = {
        nome: form.querySelector('#nome'),
        email: form.querySelector('#email'),
        telefone: form.querySelector('#telefone'),
        assunto: form.querySelector('#assunto'),
        mensagem: form.querySelector('#mensagem'),
        privacidade: form.querySelector('#privacidade')
    };

    const feedback = form.querySelector('.form-feedback');
    const submitBtn = form.querySelector('.form-submit');

    /* ----------------------------------------------------------------------
       Validadores individuais
       ---------------------------------------------------------------------- */
    const validators = {
        nome: function (value) {
            if (!value || value.trim().length < 3) {
                return 'Informe seu nome completo (mínimo 3 caracteres).';
            }
            if (value.trim().length > 80) {
                return 'O nome deve ter no máximo 80 caracteres.';
            }
            return null;
        },

        email: function (value) {
            if (!value || value.trim().length === 0) {
                return 'O e-mail é obrigatório.';
            }
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(value.trim())) {
                return 'Informe um e-mail válido (exemplo: voce@email.com).';
            }
            return null;
        },

        telefone: function (value) {
            // Campo opcional, mas se preenchido deve ter formato válido
            if (!value || value.trim().length === 0) return null;
            const phoneDigits = value.replace(/\D/g, '');
            if (phoneDigits.length < 10 || phoneDigits.length > 11) {
                return 'O telefone deve ter entre 10 e 11 dígitos.';
            }
            return null;
        },

        assunto: function (value) {
            if (!value || value === '') {
                return 'Selecione o assunto da sua mensagem.';
            }
            return null;
        },

        mensagem: function (value) {
            if (!value || value.trim().length < 10) {
                return 'A mensagem deve ter pelo menos 10 caracteres.';
            }
            if (value.trim().length > 1000) {
                return 'A mensagem deve ter no máximo 1000 caracteres.';
            }
            return null;
        },

        privacidade: function (checked) {
            if (!checked) {
                return 'Você precisa concordar com nossa política de privacidade.';
            }
            return null;
        }
    };

    /* ----------------------------------------------------------------------
       Marca um campo como inválido ou válido
       ---------------------------------------------------------------------- */
    function setFieldStatus(field, errorMsg) {
        const group = field.closest('.form-group') || field.closest('.form-check');
        if (!group) return;

        const errorEl = group.querySelector('.form-error');

        if (errorMsg) {
            group.classList.add('has-error');
            group.classList.remove('has-success');
            if (errorEl) errorEl.textContent = errorMsg;
            field.setAttribute('aria-invalid', 'true');
        } else {
            group.classList.remove('has-error');
            group.classList.add('has-success');
            if (errorEl) errorEl.textContent = '';
            field.setAttribute('aria-invalid', 'false');
        }
    }

    /* ----------------------------------------------------------------------
       Valida um campo específico
       ---------------------------------------------------------------------- */
    function validateField(name) {
        const field = fields[name];
        if (!field) return true;

        const value = field.type === 'checkbox' ? field.checked : field.value;
        const errorMsg = validators[name](value);

        setFieldStatus(field, errorMsg);
        return errorMsg === null;
    }

    /* ----------------------------------------------------------------------
       Valida todos os campos
       ---------------------------------------------------------------------- */
    function validateForm() {
        let allValid = true;
        Object.keys(validators).forEach(function (name) {
            const isValid = validateField(name);
            if (!isValid) allValid = false;
        });
        return allValid;
    }

    /* ----------------------------------------------------------------------
       Máscara simples para telefone (BR)
       ---------------------------------------------------------------------- */
    function applyPhoneMask(value) {
        const digits = value.replace(/\D/g, '').slice(0, 11);
        if (digits.length <= 10) {
            return digits
                .replace(/(\d{0,2})(\d{0,4})(\d{0,4}).*/, function (m, a, b, c) {
                    if (b && c) return '(' + a + ') ' + b + '-' + c;
                    if (b) return '(' + a + ') ' + b;
                    if (a) return '(' + a;
                    return '';
                });
        }
        return digits
            .replace(/(\d{0,2})(\d{0,5})(\d{0,4}).*/, function (m, a, b, c) {
                if (b && c) return '(' + a + ') ' + b + '-' + c;
                if (b) return '(' + a + ') ' + b;
                if (a) return '(' + a;
                return '';
            });
    }

    /* ----------------------------------------------------------------------
       Mostra mensagem de feedback (sucesso/erro)
       ---------------------------------------------------------------------- */
    function showFeedback(type, message) {
        if (!feedback) return;

        feedback.className = 'form-feedback is-visible ' + type;

        const iconCheck = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
        const iconAlert = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';

        feedback.innerHTML = (type === 'success' ? iconCheck : iconAlert) + '<span>' + message + '</span>';

        // Scroll suave até o feedback
        feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    /* ----------------------------------------------------------------------
       Reseta o formulário e o estado dos campos
       ---------------------------------------------------------------------- */
    function resetForm() {
        form.reset();
        Object.values(fields).forEach(function (field) {
            const group = field.closest('.form-group') || field.closest('.form-check');
            if (group) {
                group.classList.remove('has-error', 'has-success');
                const errorEl = group.querySelector('.form-error');
                if (errorEl) errorEl.textContent = '';
            }
            field.setAttribute('aria-invalid', 'false');
        });
    }

    /* ----------------------------------------------------------------------
       Eventos: validação em blur e input
       ---------------------------------------------------------------------- */
    Object.keys(fields).forEach(function (name) {
        const field = fields[name];
        if (!field) return;

        // Valida ao perder o foco
        field.addEventListener('blur', function () {
            validateField(name);
        });

        // Re-valida ao digitar se já tem erro (UX melhor)
        const eventType = field.type === 'checkbox' || field.tagName === 'SELECT' ? 'change' : 'input';
        field.addEventListener(eventType, function () {
            const group = field.closest('.form-group') || field.closest('.form-check');
            if (group && group.classList.contains('has-error')) {
                validateField(name);
            }
        });
    });

    // Máscara de telefone
    if (fields.telefone) {
        fields.telefone.addEventListener('input', function (e) {
            e.target.value = applyPhoneMask(e.target.value);
        });
    }

    /* ----------------------------------------------------------------------
       Submit do formulário
       ---------------------------------------------------------------------- */
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Esconde feedback anterior
        if (feedback) feedback.classList.remove('is-visible');

        const isValid = validateForm();

        if (!isValid) {
            showFeedback('error', 'Verifique os campos destacados e tente novamente.');

            // Foco no primeiro campo com erro
            const firstError = form.querySelector('.has-error input, .has-error select, .has-error textarea, .has-error');
            if (firstError && firstError.focus) firstError.focus();
            return;
        }

        // Simula envio (em produção, aqui seria um fetch para o backend)
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Enviando...';

        setTimeout(function () {
            showFeedback(
                'success',
                'Mensagem enviada com sucesso! Em breve nossa equipe entrará em contato.'
            );
            resetForm();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }, 1000);
    });

})();
