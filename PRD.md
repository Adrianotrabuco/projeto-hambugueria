# PRD - Aplicativo de pedidos da hamburgueria

## 1. Visao geral

O aplicativo de pedidos da hamburgueria e uma experiencia mobile criada com Expo/React Native para permitir que clientes consultem o cardapio, escolham produtos, montem um carrinho, informem o endereco de entrega e enviem o pedido para a loja via WhatsApp, mantendo tambem o registro do pedido no Supabase.

## 2. Objetivo do produto

Reduzir o atrito no recebimento de pedidos por WhatsApp, organizando previamente os itens, quantidades, endereco e valor total antes do contato com a hamburgueria.

O produto deve funcionar como uma vitrine simples, rapida e confiavel para pedidos de delivery, com foco em:

- navegacao clara pelo cardapio;
- visualizacao de detalhes dos produtos;
- montagem persistente do carrinho;
- validacao minima antes do envio;
- registro estruturado dos pedidos em banco de dados;
- redirecionamento para WhatsApp com mensagem pronta.

## 3. Publico-alvo

Clientes da hamburgueria que desejam fazer pedidos de forma rapida pelo celular, sem precisar digitar manualmente todos os itens no WhatsApp.

Tambem atende a equipe operacional da hamburgueria, que recebe mensagens de pedido mais padronizadas e pode consultar os pedidos registrados no Supabase.

## 4. Problema

Pedidos feitos diretamente por conversa podem chegar incompletos, com itens confusos, sem endereco ou sem valor total. Isso aumenta o tempo de atendimento e o risco de erro na preparacao e entrega.

## 5. Solucao proposta

Criar um aplicativo mobile em que o cliente:

1. visualiza o cardapio separado por categorias;
2. acessa detalhes, preco e ingredientes de cada produto;
3. adiciona produtos ao carrinho;
4. revisa itens, quantidades e total;
5. informa endereco de entrega;
6. envia o pedido para a hamburgueria via WhatsApp;
7. tem o pedido salvo no Supabase para historico e controle.

## 6. Escopo da versao atual

### Incluido

- Listagem de produtos por categoria.
- Navegacao horizontal entre categorias.
- Tela de detalhes do produto.
- Exibicao de imagem, descricao, preco e ingredientes.
- Adicao de produtos ao carrinho.
- Persistencia local do carrinho com AsyncStorage.
- Calculo de quantidade total de itens no carrinho.
- Tela de carrinho com lista de produtos selecionados.
- Remocao de produto do carrinho.
- Calculo do valor total.
- Campo de endereco de entrega.
- Validacao de carrinho vazio.
- Validacao de endereco vazio.
- Criacao de pedido no Supabase.
- Criacao dos itens do pedido no Supabase.
- Rollback do pedido caso a insercao dos itens falhe.
- Envio do pedido para WhatsApp com mensagem pre-formatada.
- Limpeza do carrinho apos envio bem-sucedido.

### Fora do escopo da versao atual

- Login ou cadastro de clientes.
- Pagamento online.
- Acompanhamento de status do pedido.
- Painel administrativo.
- Edicao remota do cardapio.
- Calculo automatico de taxa de entrega.
- Cupom de desconto.
- Agendamento de entrega.
- Notificacoes push.
- Geolocalizacao.

## 7. Personas

### Cliente

Quer escolher produtos rapidamente, confirmar o total e enviar o pedido sem precisar escrever tudo manualmente.

Necessidades:

- encontrar produtos com facilidade;
- ver preco antes de pedir;
- conferir o carrinho antes de enviar;
- informar endereco de entrega;
- receber continuidade do atendimento no WhatsApp.

### Atendente da hamburgueria

Quer receber pedidos organizados, com endereco, itens e valor total claros.

Necessidades:

- reduzir mensagens incompletas;
- consultar pedidos recebidos;
- evitar erros de item ou quantidade;
- manter o atendimento no canal que a loja ja usa.

## 8. Jornada principal do usuario

1. Cliente abre o aplicativo.
2. Cliente visualiza o cardapio.
3. Cliente filtra/navega por categorias.
4. Cliente toca em um produto.
5. Cliente ve detalhes do produto.
6. Cliente adiciona o produto ao carrinho.
7. Cliente acessa o carrinho.
8. Cliente revisa itens e total.
9. Cliente informa endereco.
10. Cliente toca em "Enviar pedido".
11. Sistema salva o pedido no Supabase.
12. Sistema abre o WhatsApp com a mensagem pronta.
13. Cliente envia a mensagem para a hamburgueria.
14. Sistema limpa o carrinho e retorna a navegacao anterior.

## 9. Requisitos funcionais

### RF01 - Listar cardapio

O sistema deve exibir os produtos do cardapio separados por categorias.

Criterios de aceite:

- categorias devem ser exibidas horizontalmente;
- produtos devem aparecer agrupados por categoria;
- cada produto deve exibir nome, preco e imagem em miniatura.

### RF02 - Navegar por categoria

O sistema deve permitir que o usuario selecione uma categoria e seja levado para a secao correspondente do cardapio.

Criterios de aceite:

- categoria selecionada deve ter estado visual diferenciado;
- a lista deve rolar ate a categoria selecionada.

### RF03 - Ver detalhes do produto

O sistema deve permitir abrir uma tela de detalhes de produto.

Criterios de aceite:

- deve exibir imagem principal;
- deve exibir nome;
- deve exibir preco formatado em moeda brasileira;
- deve exibir descricao;
- deve exibir ingredientes quando existirem;
- se o produto nao existir, o usuario deve ser redirecionado para o cardapio.

### RF04 - Adicionar produto ao carrinho

O sistema deve permitir adicionar um produto ao carrinho.

Criterios de aceite:

- ao adicionar produto ja existente, a quantidade deve aumentar;
- ao adicionar produto novo, ele deve entrar no carrinho com quantidade inicial;
- o usuario deve retornar da tela de detalhe apos adicionar.

### RF05 - Persistir carrinho

O sistema deve manter o carrinho localmente mesmo se o app for fechado e reaberto.

Criterios de aceite:

- dados devem ser persistidos no AsyncStorage;
- o contador de itens deve refletir a soma das quantidades.

### RF06 - Revisar carrinho

O sistema deve exibir os produtos adicionados ao carrinho.

Criterios de aceite:

- deve listar todos os produtos adicionados;
- deve exibir total do pedido;
- deve mostrar mensagem de carrinho vazio quando nao houver itens.

### RF07 - Remover produto do carrinho

O sistema deve permitir remover um produto do carrinho apos confirmacao.

Criterios de aceite:

- ao tocar em remover, deve aparecer alerta de confirmacao;
- ao confirmar, o produto deve ser removido;
- ao cancelar, o carrinho deve permanecer igual.

### RF08 - Informar endereco

O sistema deve solicitar endereco de entrega antes de enviar o pedido.

Criterios de aceite:

- campo de endereco deve aceitar rua, bairro, CEP, numero e complemento;
- endereco vazio ou apenas com espacos deve bloquear o envio;
- mensagem de alerta deve orientar o usuario a informar o endereco.

### RF09 - Enviar pedido

O sistema deve enviar pedido somente quando houver produtos no carrinho e endereco informado.

Criterios de aceite:

- carrinho vazio deve bloquear envio;
- endereco vazio deve bloquear envio;
- botao deve indicar estado de envio enquanto a requisicao estiver em andamento;
- em caso de sucesso, o carrinho deve ser limpo.

### RF10 - Registrar pedido no Supabase

O sistema deve salvar o pedido e seus itens no Supabase.

Criterios de aceite:

- tabela `orders` deve receber endereco e total;
- tabela `order_items` deve receber produto, titulo, quantidade e preco;
- se a insercao de itens falhar, o pedido criado deve ser removido;
- erros devem ser exibidos ao usuario em alerta.

### RF11 - Abrir WhatsApp

O sistema deve abrir o WhatsApp com mensagem pronta para o numero da hamburgueria.

Criterios de aceite:

- mensagem deve conter titulo de novo pedido;
- mensagem deve conter endereco;
- mensagem deve conter itens e quantidades;
- mensagem deve conter valor total;
- mensagem deve ser codificada corretamente na URL.

## 10. Requisitos nao funcionais

- O app deve ter boa responsividade em dispositivos mobile.
- O app deve carregar fontes e assets de forma consistente.
- O calculo de moeda deve usar formato brasileiro.
- O carrinho deve ser resiliente a fechamento e reabertura do aplicativo.
- O envio deve tratar erros de rede ou Supabase.
- O app deve evitar pedidos duplicados por multiplos toques no botao de envio.
- Dados sensiveis de configuracao devem ficar em variaveis de ambiente.
- O app deve manter navegacao simples, com poucos passos ate o envio do pedido.

## 11. Modelo de dados

### orders

| Campo | Tipo | Obrigatorio | Descricao |
| --- | --- | --- | --- |
| id | uuid | Sim | Identificador do pedido |
| address | text | Sim | Endereco de entrega |
| total_price | decimal(10,2) | Sim | Valor total do pedido |
| created_at | timestamp with time zone | Sim | Data de criacao do pedido |

### order_items

| Campo | Tipo | Obrigatorio | Descricao |
| --- | --- | --- | --- |
| id | uuid | Sim | Identificador do item |
| order_id | uuid | Sim | Pedido relacionado |
| product_id | text | Sim | Identificador do produto |
| product_title | text | Sim | Nome do produto |
| quantity | integer | Sim | Quantidade pedida |
| price | decimal(10,2) | Sim | Preco unitario |

## 12. Eventos e estados principais

- `cart_empty`: carrinho sem produtos.
- `cart_has_items`: carrinho com um ou mais produtos.
- `product_added`: produto adicionado ao carrinho.
- `product_removed`: produto removido do carrinho.
- `order_validation_failed`: tentativa de envio sem endereco ou sem itens.
- `order_submitting`: pedido em envio.
- `order_created`: pedido salvo no Supabase.
- `order_failed`: falha ao salvar ou enviar pedido.
- `whatsapp_opened`: WhatsApp aberto com mensagem pronta.

## 13. Metricas de sucesso

- Taxa de conversao de visitantes do cardapio para pedidos enviados.
- Quantidade de pedidos registrados por dia.
- Percentual de pedidos com erro no envio.
- Tempo medio entre abrir o app e enviar pedido.
- Quantidade media de itens por pedido.
- Valor medio do pedido.
- Taxa de abandono no carrinho.

## 14. Riscos e dependencias

- Dependencia do WhatsApp instalado ou disponivel no dispositivo.
- Dependencia da disponibilidade do Supabase.
- Cardapio atual e estatico no codigo, exigindo novo deploy para alteracoes.
- Numero da hamburgueria fixo no codigo.
- Politicas RLS permitem leitura anonima dos pedidos, o que pode nao ser adequado para producao.
- Textos com codificacao incorreta podem prejudicar a experiencia do usuario.

## 15. Melhorias recomendadas para proximas versoes

### Alta prioridade

- Corrigir textos com problemas de codificacao.
- Mover numero do WhatsApp para variavel de ambiente.
- Restringir politicas de leitura no Supabase.
- Criar painel simples para a loja consultar pedidos.
- Adicionar status do pedido: recebido, em preparo, saiu para entrega, concluido.

### Media prioridade

- Migrar cardapio para banco de dados ou CMS.
- Adicionar taxa de entrega.
- Permitir observacoes por item e por pedido.
- Permitir incrementar/decrementar quantidade diretamente no carrinho.
- Validar formato minimo de endereco.
- Adicionar tela de confirmacao apos envio.

### Baixa prioridade

- Login de cliente.
- Historico de pedidos do cliente.
- Cupons promocionais.
- Favoritos.
- Notificacoes push.
- Pagamento online.

## 16. Criterios de aceite da release

A release pode ser considerada pronta quando:

- o usuario consegue navegar pelo cardapio;
- o usuario consegue abrir detalhes de qualquer produto;
- o usuario consegue adicionar produtos ao carrinho;
- o carrinho calcula corretamente o total;
- o usuario nao consegue enviar pedido sem endereco;
- o usuario nao consegue enviar pedido com carrinho vazio;
- o pedido e salvo no Supabase;
- os itens do pedido sao salvos no Supabase;
- o WhatsApp abre com a mensagem correta;
- o carrinho e limpo apos envio bem-sucedido;
- os principais fluxos possuem testes unitarios ou manuais documentados.

## 17. Testes unitarios sugeridos

Como o projeto ja possui Jest configurado e testes para moeda/carrinho, os proximos testes unitarios mais valiosos devem cobrir as regras puras de negocio e os fluxos com menos dependencia visual.

### Prioridade alta

- `formatCurrency`: deve formatar valores numericos no padrao `pt-BR`/BRL.
- `cart-in-memory.add`: deve adicionar produto novo com quantidade inicial igual a 1.
- `cart-in-memory.add`: deve incrementar a quantidade quando o produto ja existe no carrinho.
- `cart-in-memory.remove`: deve remover produto pelo `id` sem alterar os demais itens.
- `cart-in-memory.remove`: deve manter o carrinho inalterado quando o `id` nao existe.
- `cart-in-memory`: deve preservar preco, titulo, descricao e demais dados do produto ao adicionar no carrinho.

### Prioridade media

- `createOrder`: deve inserir primeiro o pedido na tabela `orders`.
- `createOrder`: deve inserir os itens em `order_items` usando o `order_id` retornado.
- `createOrder`: deve executar rollback removendo o pedido quando a insercao dos itens falhar.
- `createOrder`: deve propagar mensagem de erro quando a criacao do pedido falhar.

### Prioridade baixa

- `products data`: deve garantir que todo produto tenha `id`, `title`, `price`, `description`, `cover` e `thumbnail`.
- `products data`: deve garantir que as categorias exibidas sejam derivadas do menu.
- `products data`: deve garantir que nao existam produtos com `id` duplicado.

## 18. Casos de teste manuais sugeridos

- Adicionar o mesmo produto duas vezes e validar quantidade.
- Remover um produto do carrinho.
- Tentar enviar pedido com carrinho vazio.
- Tentar enviar pedido com endereco vazio.
- Enviar pedido valido e verificar registros no Supabase.
- Simular falha ao criar itens do pedido e validar rollback.
- Fechar e reabrir app com itens no carrinho.
- Abrir URL do WhatsApp e conferir mensagem gerada.

## 19. Premissas

- A hamburgueria continuara usando WhatsApp como canal principal de atendimento.
- O app sera usado inicialmente como cardapio e pre-checkout, nao como ecommerce completo.
- O pagamento sera combinado fora do aplicativo.
- O cliente final usara principalmente dispositivos mobile.
- O cardapio inicial e pequeno e pode permanecer local enquanto o produto esta em fase inicial.
