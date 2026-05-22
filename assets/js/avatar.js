/* ==========================================================================
   AVATAR.JS - Demonstração interativa do Avatar Inteligente (Luma)
   COMMIT: INTEGRANTE_5 - Lógica do chat simulado, missões e pontuação
   ========================================================================== */

(function () {
    'use strict';

    /* ----------------------------------------------------------------------
       Estado da demo
       ---------------------------------------------------------------------- */
    let userPoints = 320;
    const pointsTarget = 500;

    /* ----------------------------------------------------------------------
       Base de respostas do avatar (palavras-chave simples)
       ---------------------------------------------------------------------- */
    const responses = [
        {
            keywords: ['energia', 'fatura', 'conta', 'luz'],
            reply: 'Ótima escolha! Reduzir o consumo de energia rende muitos pontos. Que tal começar trocando ' +
                'lâmpadas comuns por LED? Posso adicionar essa missão ao seu painel.',
            mission: 'Trocar 3 lâmpadas por LED'
        },
        {
            keywords: ['água', 'agua', 'banho'],
            reply: 'Reduzir o tempo de banho em 2 minutos economiza até 60L de água por dia. Vou registrar essa ' +
                'missão para você acompanhar pela semana.',
            mission: 'Banhos curtos por 7 dias seguidos'
        },
        {
            keywords: ['lixo', 'reciclagem', 'reciclar', 'separação'],
            reply: 'Separar o lixo é um dos hábitos mais impactantes. Te mostro como começar: tem post no nosso ' +
                'feed sobre os 4 tipos básicos de separação. Quer que eu envie?',
            mission: 'Separar resíduos por 5 dias'
        },
        {
            keywords: ['missão', 'missao', 'desafio', 'tarefa'],
            reply: 'Você tem 3 missões ativas no momento. A mais próxima de completar é "Apagar luzes desnecessárias" ' +
                'com 75% de progresso. Quer ver os detalhes?',
            mission: null
        },
        {
            keywords: ['ponto', 'pontos', 'ranking', 'rank'],
            reply: 'Você está com ' + userPoints + ' pontos! Falta pouco para atingir o próximo nível. Lembrando ' +
                'que o usuário com maior pontuação no mês ganha 100% da fatura de energia subsidiada.',
            mission: null
        },
        {
            keywords: ['benefício', 'beneficio', 'recompensa', 'desconto', 'voucher'],
            reply: 'Com seus pontos atuais, você pode resgatar: 10% off na fatura de energia, voucher de R$30 em ' +
                'feiras orgânicas, ou ingresso para o workshop "Compostagem em apartamentos". Qual te interessa mais?',
            mission: null
        },
        {
            keywords: ['transporte', 'bike', 'bicicleta', 'caminhar', 'ônibus', 'onibus'],
            reply: 'Trocar um dia de carro por bicicleta ou transporte público pode evitar até 4kg de CO₂. Que tal ' +
                'começar com uma vez por semana? Adiciono essa missão pra você.',
            mission: 'Usar transporte sustentável 1x por semana'
        },
        {
            keywords: ['comida', 'alimentação', 'alimentacao', 'vegano', 'vegetariano'],
            reply: 'Reduzir o consumo de carne 1 dia por semana ("segunda sem carne") já gera impacto positivo. ' +
                'Quer dicas de receitas práticas e baratas? Posso indicar 5 chefs sustentáveis na comunidade.',
            mission: 'Segunda sem carne'
        },
        {
            keywords: ['olá', 'ola', 'oi', 'bom dia', 'boa tarde', 'boa noite'],
            reply: 'Oi! Que bom te ver por aqui. Sou a Luma, sua guia na SoulUp. Posso te ajudar a descobrir ' +
                'missões sustentáveis, conferir seus pontos ou explorar recompensas. Por onde quer começar?',
            mission: null
        },
        {
            keywords: ['obrigado', 'obrigada', 'valeu', 'tks'],
            reply: 'Imagina! Tô aqui pra isso. Vou estar acompanhando seu progresso e te avisando assim que ' +
                'novas oportunidades aparecerem. Boas missões!',
            mission: null
        }
    ];

    const defaultReply = 'Hmm, ainda estou aprendendo sobre esse assunto! Posso te ajudar com: economia de energia, ' +
        'reciclagem, transporte sustentável, missões ativas ou suas recompensas. Quer testar uma dessas?';

    /* ----------------------------------------------------------------------
       Elementos do DOM
       ---------------------------------------------------------------------- */
    const messagesEl = document.querySelector('#chat-messages');
    const inputEl = document.querySelector('#chat-input');
    const sendBtn = document.querySelector('#chat-send');
    const form = document.querySelector('#chat-form');
    const suggestionChips = document.querySelectorAll('.quick-suggestions .chip');
    const pointsDisplay = document.querySelector('#user-points');
    const progressFill = document.querySelector('#progress-fill');
    const progressText = document.querySelector('#progress-text');
    const missionItems = document.querySelectorAll('.mission-item');

    if (!messagesEl) return;

    /* ----------------------------------------------------------------------
       Adiciona mensagem ao chat
       ---------------------------------------------------------------------- */
    function addMessage(text, from) {
        const message = document.createElement('div');
        message.className = 'message from-' + from;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';

        if (from === 'bot') {
            avatar.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" ' +
                'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                '<circle cx="12" cy="12" r="3"/>' +
                '<path d="M3 12a9 9 0 0 1 9-9v0a9 9 0 0 1 9 9v0a9 9 0 0 1-9 9v0a9 9 0 0 1-9-9z"/></svg>';
        } else {
            avatar.textContent = 'V';
        }

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.textContent = text;

        message.appendChild(avatar);
        message.appendChild(bubble);
        messagesEl.appendChild(message);

        scrollToBottom();
    }

    /* ----------------------------------------------------------------------
       Mostra indicador "digitando..."
       ---------------------------------------------------------------------- */
    function showTyping() {
        const typing = document.createElement('div');
        typing.className = 'message from-bot';
        typing.id = 'typing-indicator-message';

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" ' +
            'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<circle cx="12" cy="12" r="3"/>' +
            '<path d="M3 12a9 9 0 0 1 9-9v0a9 9 0 0 1 9 9v0a9 9 0 0 1-9 9v0a9 9 0 0 1-9-9z"/></svg>';

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';

        typing.appendChild(avatar);
        typing.appendChild(bubble);
        messagesEl.appendChild(typing);

        scrollToBottom();
    }

    function hideTyping() {
        const typing = document.querySelector('#typing-indicator-message');
        if (typing) typing.remove();
    }

    function scrollToBottom() {
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    /* ----------------------------------------------------------------------
       Encontra a resposta para a mensagem do usuário
       ---------------------------------------------------------------------- */
    function findResponse(text) {
        const lower = text.toLowerCase();
        for (let i = 0; i < responses.length; i++) {
            const item = responses[i];
            for (let j = 0; j < item.keywords.length; j++) {
                if (lower.includes(item.keywords[j])) {
                    return item;
                }
            }
        }
        return { reply: defaultReply, mission: null };
    }

    /* ----------------------------------------------------------------------
       Adiciona pontos com animação na barra de progresso
       ---------------------------------------------------------------------- */
    function addPoints(amount) {
        userPoints = Math.min(userPoints + amount, pointsTarget);
        if (pointsDisplay) pointsDisplay.textContent = userPoints;
        updateProgress();
    }

    function updateProgress() {
        const percent = Math.round((userPoints / pointsTarget) * 100);
        if (progressFill) progressFill.style.width = percent + '%';
        if (progressText) progressText.textContent = userPoints + ' / ' + pointsTarget + ' XP';
    }

    /* ----------------------------------------------------------------------
       Processa o envio de uma mensagem
       ---------------------------------------------------------------------- */
    function handleSend(text) {
        const trimmed = text.trim();
        if (!trimmed) return;

        addMessage(trimmed, 'user');
        inputEl.value = '';
        addPoints(5);

        showTyping();

        // Simula tempo de "pensamento" do avatar
        setTimeout(function () {
            hideTyping();
            const found = findResponse(trimmed);
            addMessage(found.reply, 'bot');

            // Se a resposta sugere uma nova missão, mostra notificação textual
            if (found.mission) {
                setTimeout(function () {
                    addMessage('Nova missão adicionada ao seu painel: "' + found.mission + '"', 'bot');
                    addPoints(10);
                }, 800);
            }
        }, 900 + Math.random() * 600);
    }

    /* ----------------------------------------------------------------------
       Listeners do form e dos chips
       ---------------------------------------------------------------------- */
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            handleSend(inputEl.value);
        });
    }

    if (sendBtn) {
        sendBtn.addEventListener('click', function (e) {
            e.preventDefault();
            handleSend(inputEl.value);
        });
    }

    suggestionChips.forEach(function (chip) {
        chip.addEventListener('click', function () {
            handleSend(chip.textContent.trim());
        });
    });

    /* ----------------------------------------------------------------------
       Toggle de missões (concluir/desconcluir)
       ---------------------------------------------------------------------- */
    missionItems.forEach(function (item) {
        item.addEventListener('click', function () {
            const wasDone = item.classList.contains('done');
            item.classList.toggle('done');

            const pointsLabel = item.querySelector('.mission-points');
            const pts = pointsLabel ? parseInt(pointsLabel.textContent, 10) || 0 : 0;

            if (!wasDone) {
                addPoints(pts);
                addMessage('Parabéns! Você concluiu "' + item.querySelector('.mission-text').textContent +
                    '" e ganhou +' + pts + ' pontos.', 'bot');
            } else {
                userPoints = Math.max(0, userPoints - pts);
                if (pointsDisplay) pointsDisplay.textContent = userPoints;
                updateProgress();
            }
        });
    });

    /* ----------------------------------------------------------------------
       Inicialização: mensagem de boas-vindas
       ---------------------------------------------------------------------- */
    updateProgress();

    setTimeout(function () {
        addMessage('Oi! Eu sou a Luma, sua guia na SoulUp. Como posso te ajudar hoje?', 'bot');
    }, 400);

    setTimeout(function () {
        addMessage('Você pode me perguntar sobre missões, pontos, recompensas ou ações sustentáveis. ' +
            'Tente clicar em uma das sugestões abaixo!', 'bot');
    }, 1600);

})();
