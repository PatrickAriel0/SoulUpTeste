# Guia de commits da equipe

> Use este guia para distribuir os commits entre os 5 integrantes do grupo.
> Cada integrante precisa fazer **pelo menos 5 commits** (penalidade: -10 pts por integrante com menos de 5).

Procure dentro do código os marcadores:

```
<!-- COMMIT: INTEGRANTE_X — descrição -->
/* COMMIT: INTEGRANTE_X — descrição */
```

Cada marcador indica o trecho de código que aquele integrante deve commitar.

---

## INTEGRANTE 1 — Estrutura base + Home

Arquivos sob sua responsabilidade:
- `index.html`
- `README.md`
- `assets/css/global.css`
- `assets/css/header-footer.css`
- `assets/css/home.css`
- `assets/css/responsive.css`
- `assets/js/main.js`

Commits sugeridos (rode na ordem):

```bash
git checkout -b feat/estrutura-base
# 1. Estrutura inicial
git add README.md
git commit -m "docs: cria README.md com guia técnico e informativo"

# 2. CSS global (variáveis, reset, tipografia)
git add assets/css/global.css
git commit -m "style: adiciona variáveis CSS, reset e utilitários globais"

# 3. Header e footer compartilhados
git add assets/css/header-footer.css assets/css/responsive.css
git commit -m "style: implementa header sticky, navegação responsiva e footer"

# 4. JavaScript principal (menu hambúrguer + scroll)
git add assets/js/main.js
git commit -m "feat: adiciona menu hambúrguer, smooth scroll e marcação do link ativo"

# 5. Página inicial (Home)
git add index.html assets/css/home.css
git commit -m "feat: cria página inicial com hero, features, passos e CTA final"
```

---

## INTEGRANTE 2 — Páginas Sobre + Equipe

Arquivos sob sua responsabilidade:
- `sobre.html`
- `integrantes.html`
- `assets/css/sobre.css`
- `assets/css/integrantes.css`

Commits sugeridos:

```bash
git checkout -b feat/sobre-equipe
# 1. CSS da página Sobre
git add assets/css/sobre.css
git commit -m "style: cria estilos da página Sobre (hero, contexto e roadmap)"

# 2. Página Sobre (HTML)
git add sobre.html
git commit -m "feat: cria página Sobre com contexto, tecnologias e roadmap"

# 3. CSS da página Equipe
git add assets/css/integrantes.css
git commit -m "style: cria estilos dos cards de integrantes"

# 4. Página Equipe (HTML)
git add integrantes.html
git commit -m "feat: cria página de integrantes com nome, RM, turma, LinkedIn e GitHub"

# 5. Ajustes finais de responsividade
git add sobre.html integrantes.html assets/css/sobre.css assets/css/integrantes.css
git commit -m "style: ajusta responsividade das páginas Sobre e Equipe"
```

---

## INTEGRANTE 3 — FAQ + interatividade

Arquivos sob sua responsabilidade:
- `faq.html`
- `assets/css/faq.css`
- `assets/js/faq.js`

Commits sugeridos:

```bash
git checkout -b feat/faq-interativo
# 1. Estrutura HTML do FAQ
git add faq.html
git commit -m "feat: cria página FAQ com perguntas e categorias"

# 2. CSS do FAQ
git add assets/css/faq.css
git commit -m "style: estiliza accordion, categorias e busca do FAQ"

# 3. JS do accordion
git add assets/js/faq.js
git commit -m "feat: implementa abrir/fechar perguntas com animação"

# 4. Filtro por categoria
git add assets/js/faq.js faq.html
git commit -m "feat: adiciona filtro de perguntas por categoria"

# 5. Busca em tempo real
git add assets/js/faq.js
git commit -m "feat: adiciona busca em tempo real no FAQ com estado vazio"
```

---

## INTEGRANTE 4 — Contato + validação

Arquivos sob sua responsabilidade:
- `contato.html`
- `assets/css/contato.css`
- `assets/js/contato.js`

Commits sugeridos:

```bash
git checkout -b feat/contato-validacao
# 1. CSS da página de contato
git add assets/css/contato.css
git commit -m "style: cria estilos do formulário de contato e canais"

# 2. Estrutura HTML do contato
git add contato.html
git commit -m "feat: cria página de contato com formulário e canais"

# 3. Validação básica de campos
git add assets/js/contato.js
git commit -m "feat: implementa validação de nome, e-mail, assunto e mensagem"

# 4. Máscara de telefone + feedback visual
git add assets/js/contato.js
git commit -m "feat: adiciona máscara de telefone e feedback visual nos campos"

# 5. Submit com simulação de envio e feedback de sucesso
git add assets/js/contato.js
git commit -m "feat: trata submit do formulário com feedback de sucesso/erro"
```

---

## INTEGRANTE 5 — Páginas da Solução (Avatar)

Arquivos sob sua responsabilidade:
- `solucao.html`
- `avatar.html`
- `assets/css/solucao.css`
- `assets/css/avatar.css`
- `assets/js/avatar.js`

Commits sugeridos:

```bash
git checkout -b feat/solucao-avatar
# 1. CSS da página da solução
git add assets/css/solucao.css
git commit -m "style: cria estilos da página de explicação da solução"

# 2. Página da solução (HTML)
git add solucao.html
git commit -m "feat: cria página da solução com problema, capacidades e métricas"

# 3. CSS da demo do avatar
git add assets/css/avatar.css
git commit -m "style: cria layout do chat interativo e painel de missões"

# 4. JavaScript do avatar (chat simulado)
git add assets/js/avatar.js
git commit -m "feat: implementa chat simulado com respostas baseadas em palavras-chave"

# 5. Demo interativa completa (HTML + missões + pontuação)
git add avatar.html assets/js/avatar.js
git commit -m "feat: integra missões clicáveis e barra de progresso de pontos"
```

---

## Comandos úteis para a equipe

### Verificar quantos commits cada integrante já fez:
```bash
git shortlog -s -n --all
```

### Verificar histórico do projeto:
```bash
git log --oneline --graph --all
```

### Push da branch:
```bash
git push -u origin nome-da-branch
```

### Após mergear todas as branches:
```bash
git checkout main
git pull
git merge feat/estrutura-base
git merge feat/sobre-equipe
git merge feat/faq-interativo
git merge feat/contato-validacao
git merge feat/solucao-avatar
git push
```

---

## Checklist final antes da entrega

- [ ] README.md preenchido com link real do repositório
- [ ] Placeholders dos integrantes (NOME_INTEGRANTE_X, RM_INTEGRANTE_X, USUARIO_X) substituídos pelos dados reais
- [ ] Fotos dos integrantes adicionadas em `assets/img/` (substituir os placeholders nos cards)
- [ ] Repositório público no GitHub
- [ ] Mínimo de 25 commits totais (5 por integrante)
- [ ] Projeto compactado em .ZIP (sem incluir `node_modules` ou similares)
- [ ] Arquivo .ZIP **menor que 50MB** (penalidade -50 pts se exceder)
- [ ] Pasta `.git/` mantida dentro do ZIP (penalidade -50 pts se ausente)
- [ ] Entrega pelo **Portal do Aluno** (não por e-mail/Teams)
