// GERADO por scripts/gen_adicionais_teste.py a partir de adicionais-lista.xlsx.
// NÃO edite à mão: edite a planilha e rode o script de novo.
//
// Lista de adicionais — usada só pelas páginas *-teste.html. "cat" = produto
// principal ("internet" = Banda Larga, "tv", "celular"); uma lista, ex.:
// ['internet','tv'], vincula o adicional a mais de um produto principal.
// Opções com a mesma "familia" são do MESMO produto (só uma pode ser escolhida).
(function () {
  var LOGO = "https://mondrian.claro.com.br/brands/app/32px-alternative/";
  function A(nome, cat, preco, o) {
    o = o || {};
    return {
      nome: nome, cat: cat, preco: preco,
      familia: o.familia || null, qtd: o.qtd || null, variante: o.variante || null,
      periodo: o.periodo || 'mensal', sugestao: o.sug || null,
      precoDe: o.de || null, promoMeses: o.promo ? o.promo[0] : null, promoApos: o.promo ? o.promo[1] : null, sufixo: o.suf || '/mês', nota: o.nota || null,
      icone: o.icon ? { kind: 'img', src: /^https?:/.test(o.icon) ? o.icon : LOGO + o.icon + '.svg', alt: 'Logo ' + (o.familia || nome) } : null,
      descricao: o.desc || null
    };
  }

  window.ADICIONAIS_TESTE = [
    A("1 Camera Smarthome", "celular", 9.9, { sug: 1 }),
    A("1 Ponto adicional TV", "tv", 69.9, { familia: "Ponto Adicional", qtd: 1, icon: "https://mondrian.claro.com.br/brands/app/32px-alternative/claro-tvmais.svg", sug: 2 }),
    A("2 Pontos adicionais TV", "tv", 139.8, { familia: "Ponto Adicional", qtd: 2, icon: "https://mondrian.claro.com.br/brands/app/32px-alternative/claro-tvmais.svg", sug: 2 }),
    A("3 Pontos adicionais TV", "tv", 209.7, { familia: "Ponto Adicional", qtd: 3, icon: "https://mondrian.claro.com.br/brands/app/32px-alternative/claro-tvmais.svg", sug: 2 }),
    A("1 Ponto Ultra", "internet", 50.0, { familia: "Ponto Ultra", qtd: 1, promo: [3, 0.0], icon: "https://mondrian.claro.com.br/brands/app/32px-alternative/ponto-ultra.svg", sug: 2 }),
    A("2 Pontos Ultra", "internet", 100.0, { familia: "Ponto Ultra", qtd: 2, promo: [3, 0.0], icon: "https://mondrian.claro.com.br/brands/app/32px-alternative/ponto-ultra.svg", sug: 2 }),
    A("3 Pontos Ultra", "internet", 150.0, { familia: "Ponto Ultra", qtd: 3, promo: [3, 0.0], icon: "https://mondrian.claro.com.br/brands/app/32px-alternative/ponto-ultra.svg", sug: 2 }),
    A("2 Extensores Wi-Fi Mesh", "internet", 30.0, { familia: "Wi-Fi Mesh", qtd: 2, variante: "Padrão", icon: "https://mondrian.claro.com.br/brands/app/32px-alternative/claro-wi-fi-mesh.svg", sug: 1 }),
    A("3 Extensores Wi-Fi Mesh", "internet", 45.0, { familia: "Wi-Fi Mesh", qtd: 3, variante: "Padrão", icon: "https://mondrian.claro.com.br/brands/app/32px-alternative/claro-wi-fi-mesh.svg" }),
    A("4 Extensores Wi-Fi Mesh", "internet", 60.0, { familia: "Wi-Fi Mesh", qtd: 4, variante: "Padrão", icon: "https://mondrian.claro.com.br/brands/app/32px-alternative/claro-wi-fi-mesh.svg" }),
    A("Amazon Prime", ["tv", "internet"], 19.9, { icon: "https://mondrian.claro.com.br/brands/app/32px-alternative/amazon-prime.svg" }),
    A("Apple TV", ["tv", "internet"], 29.9, { icon: "https://mondrian.claro.com.br/brands/app/32px-alternative/apple-tv.svg" }),
    A("Brasileirinhas", "tv", 24.9),
    A("Claro Shows", "tv", 0.0, { de: 14.9, promo: [1, 14.9], icon: "claro-shows" }),
    A("Combo Telecine e Universal+ Anual", "tv", 24.9, { familia: "Combo Telecine e Universal+", periodo: "anual", suf: "/mês por 12 meses", icon: "telecine" }),
    A("Combo Telecine e Universal+ Mensal", "tv", 34.9, { familia: "Combo Telecine e Universal+", icon: "telecine" }),
    A("Crunchyroll Fan", "tv", 17.9, { familia: "Crunchyroll", variante: "Fan", icon: "crunchyroll" }),
    A("Crunchyroll Mega Fan", "tv", 24.9, { familia: "Crunchyroll", variante: "Mega Fan", icon: "crunchyroll" }),
    A("Disney+ Padrão Mensal", ["tv", "internet"], 49.9, { familia: "Disney+", variante: "Padrão com anúncios", icon: "disneyplus", sug: 3 }),
    A("Disney+ Premium Anual", ["tv", "internet"], 56.9, { familia: "Disney+", variante: "Premium", periodo: "anual", icon: "disneyplus" }),
    A("Disney+ Premium Mensal", ["tv", "internet"], 66.9, { familia: "Disney+", variante: "Premium", icon: "disneyplus" }),
    A("Eduk", "tv", 19.9, { icon: "eduk" }),
    A("F1® TV Pro", "tv", 34.9),
    A("Globoplay", ["tv", "internet"], 24.9, { icon: "globoplay" }),
    A("HBO Max com Anúncio Anual", ["tv", "internet"], 19.9, { familia: "HBO Max", variante: "Com anúncios", periodo: "anual", icon: "hbo-max" }),
    A("HBO Max com Anúncio Mensal", ["tv", "internet"], 29.9, { familia: "HBO Max", variante: "Com anúncios", icon: "hbo-max", sug: 1 }),
    A("HBO Max sem Anúncio Anual", ["tv", "internet"], 29.9, { familia: "HBO Max", variante: "Sem anúncios", periodo: "anual", icon: "hbo-max" }),
    A("HBO Max sem Anúncio Mensal", ["tv", "internet"], 39.9, { familia: "HBO Max", variante: "Sem anúncios", icon: "hbo-max" }),
    A("Lumine", "tv", 12.9),
    A("Mundus Play", "tv", 7.9),
    A("Netflix Padrão", ["tv", "internet"], 44.9, { familia: "Netflix", variante: "Padrão", icon: "netflix" }),
    A("Netflix Plano Padrão com anúncios", ["tv", "internet"], 18.9, { familia: "Netflix", variante: "Padrão com anúncios", icon: "netflix", sug: 2 }),
    A("Netflix Premium", ["tv", "internet"], 59.9, { familia: "Netflix", variante: "Premium", icon: "netflix" }),
    A("Paramount+ Anual", ["tv", "internet"], 9.9, { familia: "Paramount+", periodo: "anual", icon: "paramountplus" }),
    A("Paramount+ Mensal", ["tv", "internet"], 19.9, { familia: "Paramount+", icon: "paramountplus" }),
    A("Premiere Anual", ["tv", "internet"], 49.9, { familia: "Premiere", periodo: "anual", icon: "premiere" }),
    A("Premiere Mensal", ["tv", "internet"], 59.9, { familia: "Premiere", icon: "premiere" }),
    A("SIC Internacional", "tv", 24.9),
    A("SportyNet+", "tv", 19.9),
    A("Telecine Anual", "tv", 19.9, { familia: "Telecine", periodo: "anual", icon: "telecine" }),
    A("Telecine HD Mensal", "tv", 29.9, { familia: "Telecine", icon: "telecine" }),
    A("Universal+", "tv", 19.9, { icon: "universalplus" })
  ];

  // Textos do "O que é?" (chave = nome do "mesmo produto" em minúsculas, ou o
  // nome do adicional quando ele não tem grupo).
  window.ADICIONAIS_TESTE_DESCRICOES = {
    "1 camera smarthome": "É o serviço que permite ao cliente Claro monitorar o que ocorre em sua casa de onde estiver e em tempo real através de câmeras HD Wifi, que podem ser acessados através do smartphone, computador ou tablet. Perfeito para quem quer acompanhar o que acontece em casa enquanto está fora",
    "ponto adicional": "O ponto adicional da Claro tv+ permite transmitir a mesma programação do plano principal em outros aparelhos ou cômodos da sua casa",
    "ponto ultra": "Uma conexão via cabo de rede que leva o sinal da internet banda larga da Claro até o dispositivo que você precisa de mais velocidade e estabilidade. Tenha uma melhor experiência nas transmissões online, TV e consoles de games com o Ponto Ultra.",
    "wi-fi mesh": "Wi-Fi Mesh é uma tecnologia que aprimora a cobertura e estabilidade da rede sem fio. O Mesh utiliza vários pontos de acesso interconectados para formar uma malha, garantindo sinal consistente em toda a área. Cada “nó” colabora na transmissão, otimizando automaticamente a rota dos dados. Isso elimina áreas de sombra e melhora a experiência de conectividade em ambientes amplos.",
    "amazon prime": "Com a Claro tv+ com Amazon Prime, você tem praticidade e muito mais conteúdo. Ative sua conta e aproveite: plano Prime Video com anúncios, até 3 telas simultâneas. E você tem todos os benefícios Amazon Prime: Amazon Music, Prime Gaming, Prime Reading e Frete grátis nos produtos Amazon! Assista aos filmes e séries mais aclamados, onde e quando quiser, e pague tudo em uma única fatura, sem complicações.",
    "apple tv": "Plano sem anúncios, até 5 telas simultâneas. Assista aos filmes e séries mais aclamados, onde e quando quiser, e pague tudo em uma única fatura, sem complicações.O Apple TV é um serviço de streaming com Apple Originals. Onde o cliente assiste a séries premiadas, dramas envolventes, documentários surpreendentes, diversão para as crianças, comédias e muito mais. E tem programas Apple Originals estreando todos os meses.",
    "brasileirinhas": "Conteúdo adulto (18+). A brasileirinhas é a produtora mais conhecida e mais tradicional do Brasil, com as mais conhecidas e mais belas Porn Stars de todos os tempos, as melhores novatas do entretenimento adulto e os melhores atores. O melhor do sexo explicito hardcore em 4K e o maior reality show adulto do país, a casa das brasileirinhas.",
    "claro shows": "Centenas de shows completos, clipes e conteúdos de música para assistir seus artistas favoritos e curtir seu estilo musical quando quiser.",
    "combo telecine e universal+": "Assine o Combo Telecine e Universal+ e aproveite o melhor de filmes e séries em uma oferta imperdível! Com o Combo Telecine + Universal+, você assiste aos maiores sucessos do cinema, lançamentos exclusivos, filmes clássicos, séries premiadas, reality shows, produções brasileiras e muito mais. Assine agora e aproveite essa oferta para transformar seu entretenimento com o melhor dos dois mundos!",
    "eduk": "Cursos online em vídeo, de várias áreas.",
    "f1® tv pro": "Transmissão das corridas de Fórmula 1 e conteúdos exclusivos.",
    "globoplay": "Novelas, séries, filmes e canais da Globo ao vivo.",
    "hbo max": "Séries, filmes e documentários da HBO e da Warner.",
    "lumine": "Conteúdo de entretenimento em streaming.",
    "mundus play": "Conteúdo de entretenimento em streaming.",
    "netflix": "Séries, filmes e documentários em streaming.",
    "paramount+": "Filmes, séries e esportes da Paramount, Nickelodeon e MTV.",
    "premiere": "Jogos de futebol ao vivo e sob demanda.",
    "sic internacional": "Canal português com novelas, séries e programas.",
    "sportynet+": "Esportes ao vivo e sob demanda.",
    "telecine": "Filmes de cinema e grandes sucessos, em canais e streaming.",
    "universal+": "Séries e filmes da Universal em streaming."
  };
})();
