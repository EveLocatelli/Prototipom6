// Dados de posse que ainda não existem na planilha do catálogo (product-catalog.js é gerado e
// não deve ser editado à mão). Só as páginas *-teste / V2 carregam este arquivo.
//
// Posse TV: cliente que já tem TV (paga R$ 129,90/mês — categoriaAtualValor.tv na planilha) e
// 2 pontos adicionais. Ao trocar o plano de TV os pontos acompanham o plano novo, com valor
// reajustado (ver "Pontos adicionais de TV" em checkout-teste.html). valorAtual = total/mês dos
// pontos hoje (valor de exemplo).
if (typeof POSSE_CONFIGS !== 'undefined' && POSSE_CONFIGS.tv) {
  POSSE_CONFIGS.tv.pontosAdicionais = { qtd: 2, valorAtual: 72.02 };
}
