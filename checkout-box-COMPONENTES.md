# Checkout Box — Guia de componentes e interações

Este arquivo documenta como [checkout-box.html](checkout-box.html) foi construído, para servir de referência quando essa tela for reaproveitada como base para outros produtos (não só Claro tv+ Box).

---

## 1. O que é específico do produto "Claro tv+ Box"

Ao duplicar essa página para outro produto, esses são os pontos que precisam mudar. Nada disso é lido de um arquivo de dados central — é tudo texto direto no HTML/JS, então precisa ser trocado manualmente em cada lugar listado.

### Nome do produto ("Claro tv+ Box")
Aparece em 3 lugares de texto visível:
- `.action-card-name` — dentro do Action Card, **duas vezes** (uma cópia para mobile, uma para desktop — ver seção 4).
- `.detalhes-heading-label` — dentro do Detalhes Container, no topo da descrição do produto.

O ícone do produto (`mdn-Icon-tv` dentro de `.action-card-icon`) também é específico — trocar pelo ícone certo se o novo produto não for TV.

### Preço base do plano (139,90)
Esse é o ponto de maior atenção: o valor aparece em **4 lugares de texto estático** + **1 constante JS**, e todos precisam ficar sincronizados manualmente:
- `.price-amount` dentro do Action Card (×2, mobile e desktop) — "Valor do plano".
- `.total-amount` no resumo do pedido desktop — valor inicial antes de qualquer interação.
- `.footer-price-amount` no carrinho fixo mobile — valor inicial.
- `ACTION_CARD_BASE_PRICE` no `<script>` (perto do fim do arquivo) — é essa constante que a soma automática do total usa (ver seção 5). Se você mudar o preço no HTML mas esquecer essa constante, o total calculado após adicionar/remover itens vai ficar errado mesmo com o valor "de largada" certo na tela.

### Catálogo de adicionais (`ACTION_CARD_CATALOG`)
Array no `<script>`, é a única fonte de verdade da lista "Incluir adicionais" do Action Card (nome, preço, ícone, se o ícone é "boxed" — círculo com borda — ou "flat"). Trocar os 7 itens aqui é suficiente; a lista, a paginação (6 em 6) e os cálculos de total já se adaptam sozinhos ao tamanho do array.

### Descrição do produto e características (Detalhes Container)
Todo o texto formatado ("A Box transforma...", "O que vem na caixa", "Necessário ter", "Autoinstalação") e as 5 linhas de características (`.detalhes-feature`, cada uma com ícone + título + descrição) são texto fixo em HTML — não há abstração de dados aqui. Precisa reescrever manualmente para outro produto.

### "Incluso neste plano" (carrossel de streamings) e "Serviços digitais"
Esses dois carrosséis (Disney+, Amazon Prime, Globoplay, Apple TV, Netflix, HBO Max / Claro vídeo, McAfee, Skeelo) representam o pacote de streaming e benefícios do plano — prováveis candidatos a ficar **iguais** em outros produtos Claro tv+, mas não fazem sentido num produto totalmente diferente (ex.: um plano de celular). Avaliar caso a caso.

### Termos ("Condições da oferta e termo de adesão")
O item "Condições de oferta - TV" é específico da categoria do produto. Trocar o texto conforme a categoria do novo produto.

---

## 2. Assets locais vs. CDN Mondrian

- Ícones de marca (streamings, Claro vídeo, McAfee, Skeelo) vêm direto de `https://mondrian.claro.com.br/brands/app/32px-alternative/<nome>.svg` — **não** foram baixados para o projeto. Isso é intencional (URLs estáveis, mantidas pelo time de design), mas exige internet para carregar.
- O ícone da lixeira (`assets/action-card/lixeira.svg`) e o ícone "Ponto adicional TV" (`assets/action-card/pacote-adicional.svg`) **foram baixados e ficam no projeto**, porque não existe equivalente no Mondrian (ou porque a URL do Figma expira em ~7 dias e precisava de algo permanente).
- As imagens de fundo do carrossel de streaming (`assets/detalhes/bg-*.png`) também foram baixadas do Figma — não existem no Mondrian, o time de design confirmou isso.
- **Pegadinha do card do Globoplay**: a imagem de fundo baixada do Figma já vem com a logo grande "queimada" no meio. O CSS do card (`background-size:100.13% 146.6%; background-position:center bottom;`) recorta a imagem pra esconder essa logo (o Figma faz o mesmo recorte). Além disso, só esse card tem um gradiente escuro próprio via `.streaming-card--overlay::before` — os outros 5 cards do carrossel já vêm escuros na própria imagem, não precisam de overlay.

---

## 3. Componentes Mondrian "de verdade" usados (não são customizados)

Dois componentes usam classes reais do design system Mondrian, cujo CSS já vem no bundle carregado no `<head>` (não escrevemos CSS próprio pra eles):
- **Alert** (`.mdn-Alert.mdn-Alert--danger.mdn-Alert--light`) — visibilidade controlada pela classe `mdn-is-open` (adicionar/remover essa classe é o que mostra/esconde, não `display`/`hidden` direto).
- Os botões "Manter no carrinho" / "Remover produto" do modal de remoção e o botão "Concluir pedido" reaproveitam o padrão visual do Mondrian (pill amarelo/vermelho), mas foram implementados como CSS customizado (`.btn-sale`, `.remove-modal-btn-*`), não como `.mdn-Button`.

Todo o resto (Detalhes, Termos, Agendamento, Action Card, Modal, carrinho fixo mobile) é **CSS/HTML/JS 100% customizado**, escrito a partir das specs do Figma — não existe componente Mondrian pronto pra eles.

---

## 4. Como funciona cada componente interativo

### Action Card (duas instâncias independentes!)
O card existe **duas vezes no HTML** — uma dentro de `.order-summary-mobile`, outra dentro de `.order-summary-desktop` — e cada uma roda sua própria instância JS (`initActionCard`), com estado (`state.selected`, `state.expanded`) **totalmente independente** uma da outra. Só uma fica visível por vez (CSS por breakpoint), então isso não é perceptível no uso normal — mas **se alguém adicionar um item no mobile e depois redimensionar a janela pra desktop no meio da mesma sessão, o card de desktop não vai refletir a seleção feita no mobile** (ele tem seu próprio estado, vazio). Não é um bug ativo, é uma limitação conhecida da arquitetura atual — documentando pra não ser redescoberta como "bug" depois.

4 estados (derivados de `expanded` + `selected.length`, não são armazenados separadamente):
1. **Collapsed-Default**: só nome do produto + preço + "Incluir adicionais".
2. **Expanded-Default**: mostra a lista de adicionais (6 por página, "Ver mais" carrega mais 6).
3. **Expanded-Selected**: item(ns) escolhido(s) aparece(m) entre o nome do produto e o preço; lista continua aberta, sem os itens já escolhidos.
4. **Collapsed-Selected**: lista fechada, só mostra o resumo do que foi escolhido.

O clique na lixeira do **item adicional** remove só aquele item (sem confirmação). O clique na lixeira do **produto principal** (Claro tv+ Box) abre o modal de confirmação (seção abaixo) — são dois comportamentos propositalmente diferentes, não mexer nisso sem que o usuário peça de novo (foi um pedido explícito: "não altere o comportamento dos adicionais").

### Total do pedido (sincronização automática)
Toda vez que o Action Card adiciona/remove um item, ele chama `syncOrderTotal(state.selected)`, que:
1. Soma `ACTION_CARD_BASE_PRICE` + o preço de cada item selecionado (parseado de strings tipo `"R$ 29,90 / mês"` via `parsePriceBRL`).
2. Escreve o valor formatado em **todo elemento** `.total-amount` (resumo desktop) e `.footer-price-amount` (carrinho fixo mobile) — por isso os dois ficam sempre em sincronia entre si, mesmo sendo elementos diferentes.

### Detalhes do produto / Condições da oferta (expansíveis)
Mesmo padrão nos dois: um cabeçalho clicável (`toggleDetalhes` / `toggleTermos`) que alterna uma classe `open` no header e no conteúdo, e rotaciona o ícone de seta em 180°. Sem borda cinza no estado fechado nem no aberto (isso foi um ajuste explícito — o design não tem essa borda, diferente do que parece "natural" pra um accordion).

### Modal de remoção do produto principal
`#removeModalOverlay`, `hidden` por padrão. Abre via `openRemoveModal()` (chamado pela lixeira do produto principal), fecha via `closeRemoveModal()` (botão X, botão "Manter no carrinho", ou tecla Esc — o listener de teclado só fica ativo enquanto o modal está aberto, é adicionado/removido dinamicamente). "Remover produto" navega para `vitrine.html` via `confirmRemoveProduct()`.

### Carrinho fixo mobile (`.checkout-footer`)
Só existe/aparece no breakpoint mobile (`display:none` no desktop). Dois estados controlados por `toggleFooter()`: o bloco `.footer-expanded-info` (texto de aviso + Fidelidade/Taxa de Adesão/Instalação + divisor) fica `hidden` no estado Default e visível no Expanded; o ícone da seta troca de `mdn-Icon-cima` (Default) para `mdn-Icon-baixo` (Expanded) — isso é intencional e vem do Figma, é o oposto do padrão "seta pra baixo = expandir" que outros componentes desse mesmo arquivo usam.

### Carrosséis horizontais (streaming e serviços digitais)
`overflow-x:auto` com scroll nativo (touch/trackpad) **mais** uma função `makeDraggable()` que adiciona clicar-e-arrastar com o mouse (o navegador não oferece isso nativamente). O carrossel de "Serviços digitais" também tem setas prev/next (`initCarouselNav`) que usam `ResizeObserver` pra recalcular o estado habilitado/desabilitado assim que o Detalhes Container expande — sem isso, as setas nasciam desativadas porque a largura era medida enquanto o container ainda estava `display:none`.

---

## 5. Pegadinhas encontradas durante o desenvolvimento (vale a pena saber antes de mexer de novo)

- **Cache do navegador ao testar localmente**: o `python -m http.server` às vezes serve uma versão em cache do HTML mesmo depois de editar o arquivo. Se uma mudança "não aparecer" ao testar, adicionar `?v=2` (ou qualquer query string) na URL força um reload sem cache antes de concluir que a mudança não funcionou.
- **Bug de `min-width: auto` em flexbox**: containers flex (como `.checkout-left`) podem esticar além da tela quando um descendente tem conteúdo largo (ex. um carrossel), mesmo com `overflow-x:auto` no carrossel — porque o item flex intermediário não sabe que pode encolher. A correção é `min-width:0` em cada elo da cadeia de containers flex até chegar no elemento com `overflow-x:auto`. Foi isso que causava o carrossel "empurrando a tela pro lado" no Detalhes Container.
- **`vitrine.html` usa o Swiper.js de verdade** (via `mondrian-vanilla-6.0.7.js`, carregado no fim do `<body>`), não é só CSS. Se algum carrossel novo cortar o último card, a causa mais provável é: `gap` do CSS somando em cima do `margin-right` inline que o próprio Swiper aplica (via `spaceBetween`) — o cálculo interno do Swiper de "até onde dá pra arrastar" só conta o próprio espaçamento dele, não o `gap` extra do CSS. A correção usada lá: `gap` do CSS só como fallback, escopado com `:not(.mdn-Swiper-initialized)`.
