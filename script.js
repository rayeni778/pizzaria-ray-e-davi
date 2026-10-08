/* ==========================================================================
1. BANCO DE DADOS (PRODUTOS BASE)
========================================================================== */
const produtosBase = [
    { id: 1, nome: "Mussarela", categoria: "Tradicionais", ingredientes: "Molho de tomate, muito queijo mussarela, orégano.", preco: 55.90, imagem: "https://blog.dellys.com.br/wp-content/uploads/2024/08/2-12.png" },
    { id: 2, nome: "Calabresa", categoria: "Tradicionais", ingredientes: "Molho de tomate, mussarela, calabresa fatiada, cebola.", preco: 59.90, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBYGlPYaTxuRplDuJFJXFHnHuF8C5zyQo6Z6REKwcekGVW46BRz10K840v&s=10" },
    { id: 3, nome: "Portuguesa", categoria: "Tradicionais", ingredientes: "Mussarela, presunto, ovos, cebola, ervilha e azeitonas.", preco: 64.90, imagem: "https://www.ogastronomo.com.br/upload/389528334-curiosidades-sobre-a-pizza-portuguesa.jpg" },
    { id: 4, nome: "Margherita", categoria: "Tradicionais", ingredientes: "Molho de tomate, mussarela, manjericão fresco, tomate.", preco: 55.90, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo4DA3QfVdp9Ky4eUa3MDq7TBY9aoLICpB-kFGZD8hJY61Ul3SXsJdxQc&s=10" },
    { id: 5, nome: "Frango c/ Catupiry", categoria: "Especiais", ingredientes: "Mussarela, frango desfiado, legítimo Catupiry.", preco: 64.90, imagem: "https://www.sabornamesa.com.br/media/k2/items/cache/ada34cd2101afafaba465aad112ee3c1_XL.jpg" },
    { id: 6, nome: "Quatro Queijos", categoria: "Especiais", ingredientes: "Mussarela, provolone, gorgonzola e parmesão.", preco: 69.90, imagem: "https://www.sabornamesa.com.br/media/k2/items/cache/32699af76cfc6e0191d612ffd4e88ee9_XL.jpg" },
    { id: 7, nome: "Pepperoni", categoria: "Especiais", ingredientes: "Mussarela, fatias de pepperoni, pimentão (opcional).", preco: 69.90, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2ut6XSIzNVv1tfDNaUab0b3-qeepbyjb6IRE_6nXtNiLk0tISsx2LRmR5&s=10" },
    { id: 8, nome: "Bacon com Cheddar", categoria: "Especiais", ingredientes: "Mussarela, bacon crocante, tiras de cheddar.", preco: 64.90, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyLMsZWjmxKEtF_bqIDiUTRXE8C93QXoJMJ0RHd2nN56eNfOW5gq6Db5o&s=10" },
    { id: 9, nome: "Chocolate c/ Morango", categoria: "Doces", ingredientes: "Chocolate ao leite derretido, morangos frescos.", preco: 54.90, imagem: "https://beatoven.com.br/wp-content/uploads/2024/11/sq-chocolate-com-morango.jpg.webp" },
    { id: 10, nome: "Banana com Canela", categoria: "Doces", ingredientes: "Mussarela, banana fatiada, açúcar e canela.", preco: 54.90, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmTLN2jaZZy5qnQP3EkFxXd39V8uOQlj0jRZBCF_1HsDr0lVHHNULRnugC&s=10" },
    { id: 11, nome: "Refrigerante 2L", categoria: "Bebidas", ingredientes: "Coca-Cola, Guaraná, Fanta.", preco: 14.90, imagem: "https://pizzabrasil.comprageral.com/_core/_uploads/69/2021/03/0054260321ichgjhejkb.jpg" },
    { id: 12, nome: "Suco Natural 500ml", categoria: "Bebidas", ingredientes: "Laranja, Limão, Maracujá.", preco: 9.90, imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ-ygD54GbSnXBJIuob5XGAg4qrie7k8-zHFwrl8_nwgMLSuwS_VXhoqrS&s=10" }
];

function obterTodosProdutos() {
    const extras = JSON.parse(localStorage.getItem('produtosExtras')) || [];
    return [...produtosBase, ...extras];
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/* ==========================================================================
2. CLIQUE NOS CARDS DO INDEX (REDIRECIONAMENTO DIRETO PARA O LOGIN)
========================================================================== */
document.addEventListener('DOMContentLoaded', function() {
    const gridIndex = document.getElementById('grid-cardapio-index');
    if (gridIndex) {
        gridIndex.addEventListener('click', function(e) {
            const card = e.target.closest('.card-produto');
            if (card) {
                window.location.href = 'login.html';
            }
        });
    }

    carregarProdutosExtrasNasGrids();
    verificarAutenticacaoGerente();
});

/* ==========================================================================
3. ANEXAR PRODUTOS CRIADOS PELO GERENTE NAS PÁGINAS
========================================================================== */
function carregarProdutosExtrasNasGrids() {
    const extras = JSON.parse(localStorage.getItem('produtosExtras')) || [];
    if (extras.length === 0) return;

    const gridIndex = document.getElementById('grid-cardapio-index');
    const gridPedidos = document.getElementById('grid-cardapio-pedidos');

    extras.forEach(p => {
        if (gridIndex) {
            const article = document.createElement('article');
            article.className = 'card-produto';
            article.setAttribute('data-categoria', p.categoria);
            article.style.cursor = 'pointer';
            article.innerHTML = `
                <img src="${p.imagem}" alt="${p.nome}" class="card-imagem" onerror="this.style.display='none'">
                <h3>${p.nome}</h3>
                <p>${p.ingredientes}</p>
                <div class="preco">${formatarMoeda(p.preco)}</div>
                <p class="aviso-login">Faça login para pedir</p>
            `;
            gridIndex.appendChild(article);
        }

        if (gridPedidos) {
            const article = document.createElement('article');
            article.className = 'card-produto';
            article.setAttribute('data-categoria', p.categoria);
            article.innerHTML = `
                <img src="${p.imagem}" alt="${p.nome}" class="card-imagem" onerror="this.style.display='none'">
                <h3>${p.nome}</h3>
                <p>${p.ingredientes}</p>
                <div class="preco">${formatarMoeda(p.preco)}</div>
                <button class="btn btn-primario btn-block" onclick="adicionarAoCarrinho(${p.id})">Adicionar ao Carrinho</button>
            `;
            gridPedidos.appendChild(article);
        }
    });
}

function filtrarCardapioHTML(categoria) {
    const cards = document.querySelectorAll('.card-produto');
    cards.forEach(card => {
        if (categoria === 'Todos' || card.getAttribute('data-categoria') === categoria) {
            card.style.display = 'flex'; 
        } else {
            card.style.display = 'none';
        }
    });
}

/* ==========================================================================
4. CONTROLE DE AUTENTICAÇÃO E PAINEL DA ÁREA DO GERENTE
========================================================================== */
function verificarAutenticacaoGerente() {
    const wrapperLogin = document.getElementById('login-gerente-wrapper');
    const conteudoPainel = document.getElementById('painel-gerente-conteudo');
    
    if (!wrapperLogin || !conteudoPainel) return;

    const autenticado = sessionStorage.getItem('gerenteLogado') === 'true';
    if (autenticado) {
        wrapperLogin.style.display = 'none';
        conteudoPainel.style.display = 'block';
        renderizarTabelaGerente();
    } else {
        wrapperLogin.style.display = 'block';
        conteudoPainel.style.display = 'none';
    }
}

const formLoginGerente = document.getElementById('form-login-gerente');
if (formLoginGerente) {
    formLoginGerente.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('gerente-email').value.trim().toLowerCase();
        const senha = document.getElementById('gerente-senha').value;
        const msgErro = document.getElementById('msg-erro-gerente');

        if (email === 'gerente@lapiazzetta.com' && senha === 'admin') {
            sessionStorage.setItem('gerenteLogado', 'true');
            if (msgErro) msgErro.style.display = 'none';
            verificarAutenticacaoGerente();
        } else {
            if (msgErro) {
                msgErro.innerText = "E-mail ou senha de gerente incorretos!";
                msgErro.style.display = 'block';
            }
        }
    });
}

const btnSairGerente = document.getElementById('btn-sair-gerente');
if (btnSairGerente) {
    btnSairGerente.addEventListener('click', function() {
        sessionStorage.removeItem('gerenteLogado');
        verificarAutenticacaoGerente();
    });
}

function renderizarTabelaGerente() {
    const container = document.getElementById('grid-produtos-gerente');
    if (!container) return;

    const extras = JSON.parse(localStorage.getItem('produtosExtras')) || [];
    container.innerHTML = '';

    if (extras.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">Nenhum produto extra cadastrado até ao momento.</p>';
        return;
    }

    extras.forEach(p => {
        const article = document.createElement('article');
        article.className = 'card-produto';
        article.innerHTML = `
            <img src="${p.imagem}" alt="${p.nome}" class="card-imagem" onerror="this.style.display='none'">
            <h3>${p.nome} (${p.categoria})</h3>
            <p>${p.ingredientes}</p>
            <div class="preco">${formatarMoeda(p.preco)}</div>
            <button class="btn btn-primario btn-block" style="background-color:#e74c3c;" onclick="removerProdutoGerente(${p.id})">🗑️ Remover</button>
        `;
        container.appendChild(article);
    });
}

const formNovoProduto = document.getElementById('form-novo-produto');
if (formNovoProduto) {
    formNovoProduto.addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = document.getElementById('prod-nome').value.trim();
        const categoria = document.getElementById('prod-categoria').value;
        const ingredientes = document.getElementById('prod-ingredientes').value.trim();
        const preco = parseFloat(document.getElementById('prod-preco').value);
        const imagem = document.getElementById('prod-imagem').value.trim();

        let extras = JSON.parse(localStorage.getItem('produtosExtras')) || [];
        const novoId = Date.now();

        extras.push({ id: novoId, nome, categoria, ingredientes, preco, imagem });
        localStorage.setItem('produtosExtras', JSON.stringify(extras));

        alert(`O produto "${nome}" foi cadastrado com sucesso!`);
        formNovoProduto.reset();
        renderizarTabelaGerente();
    });
}

function removerProdutoGerente(idProduto) {
    if (confirm("Deseja remover este produto cadastrado?")) {
        let extras = JSON.parse(localStorage.getItem('produtosExtras')) || [];
        extras = extras.filter(p => p.id !== idProduto);
        localStorage.setItem('produtosExtras', JSON.stringify(extras));
        renderizarTabelaGerente();
    }
}

/* ==========================================================================
5. MENUS DROPDOWN (SOBRE E CONTATO) E DATA DO RODAPÉ
========================================================================== */
const btnSobre = document.getElementById('btn-sobre');
const menuVerticalSobre = document.getElementById('menu-vertical-sobre');
const btnContato = document.getElementById('btn-contato');
const menuVerticalContato = document.getElementById('menu-vertical-contato');

function abreMenu(event, menuAtual) {
    event.preventDefault();
    if(menuVerticalSobre && menuAtual !== menuVerticalSobre) menuVerticalSobre.classList.remove('active');
    if(menuVerticalContato && menuAtual !== menuVerticalContato) menuVerticalContato.classList.remove('active');
    menuAtual.classList.toggle('active');
}

function fechaMenu(event, menu, btn) {
    if (menu && btn) {
        if (!menu.contains(event.target) && event.target !== btn) {
            menu.classList.remove('active');
        }
    }
}

if (btnSobre && menuVerticalSobre) {
    btnSobre.addEventListener('click', function(event) { abreMenu(event, menuVerticalSobre); });
}

if (btnContato && menuVerticalContato) {
    btnContato.addEventListener('click', function(event) { abreMenu(event, menuVerticalContato); });
}

document.addEventListener('click', function(event) {
    fechaMenu(event, menuVerticalSobre, btnSobre);
    fechaMenu(event, menuVerticalContato, btnContato);
});

const dataAtualFormatada = new Date().toLocaleDateString('pt-BR', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
});
const spanData = document.getElementById('data-atual');
if(spanData){
    spanData.innerText = dataAtualFormatada.charAt(0).toUpperCase() + dataAtualFormatada.slice(1);
}

/* ==========================================================================
6. MODAIS POPUP (EMPRESA, CLIENTES, TELEFONES, EMAIL)
========================================================================== */
function criarModal(titulo, conteudoHTML) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    const box = document.createElement('div');
    box.className = 'modal-box';
    
    const btnFechar = document.createElement('button');
    btnFechar.className = 'btn-fechar-modal';
    btnFechar.innerHTML = '&times;';
    
    const h2 = document.createElement('h2');
    h2.innerText = titulo;
    
    const divConteudo = document.createElement('div');
    divConteudo.innerHTML = conteudoHTML;

    box.appendChild(btnFechar);
    box.appendChild(h2);
    box.appendChild(divConteudo);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    const fechar = () => overlay.remove();
    btnFechar.addEventListener('click', fechar);
    overlay.addEventListener('click', (e) => {
        if(e.target === overlay) fechar();
    });
    document.addEventListener('keydown', function(e) {
        if(e.key === 'Escape') fechar();
    }, {once: true});
}

document.addEventListener('click', function(e) {
    if (e.target.id === 'item-empresa') {
        e.preventDefault();
        criarModal('A La Piazzetta', '<p>Fundada por estudantes apaixonados por tecnologia e pizza, a nossa missão é entregar o verdadeiro sabor da Itália na sua casa com a praticidade do mundo digital.</p><br><p><strong>Horário:</strong> Terça a Domingo, das 18h às 23h30.</p>');
    }
    if (e.target.id === 'item-clientes') {
        e.preventDefault();
        criarModal('O que dizem nossos clientes', '<ul><li><strong>João P. (⭐⭐⭐⭐⭐)</strong> - "A melhor pizza de pepperoni que já comi!"</li><br><li><strong>Maria S. (⭐⭐⭐⭐)</strong> - "Entrega rápida e massa no ponto exato."</li><br><li><strong>Carlos A. (⭐⭐⭐⭐⭐)</strong> - "A de chocolate com morango é um absurdo de boa!"</li></ul>');
    }
    if (e.target.id === 'item-telefones') {
        e.preventDefault();
        criarModal('Nossos Telefones - La Piazzetta', '<p>Central de Atendimento: <strong>(32) 3333-0000</strong></p><br><p>WhatsApp Delivery: <a href="tel:32999990000"><strong>(32) 99999-0000</strong></a></p>');
    }
    if (e.target.id === 'item-email') {
        e.preventDefault();
        const email = 'contato@lapiazzettapizzaria.com.br';
        const assunto = encodeURIComponent('Dúvida/Sugestão via Site');
        const corpo = encodeURIComponent('Olá, equipe La Piazzetta. Gostaria de falar sobre: ');
        
        const conteudo = `
            <p>Escolha como deseja enviar o e-mail:</p><br>
            <a href="https://outlook.office.com/mail/deeplink/compose?to=${email}&subject=${assunto}&body=${corpo}" target="_blank" class="btn btn-primario btn-block" style="margin-bottom:10px;">Abrir no Outlook Web</a>
            <a href="mailto:${email}?subject=${assunto}&body=${corpo}" class="btn btn-secundario btn-block">Usar Programa Padrão (Mail/Outro)</a>
        `;
        criarModal('Envie um E-mail - La Piazzetta', conteudo);
    }
});

/* ==========================================================================
7. LÓGICA DE CADASTRO DE CLIENTE
========================================================================== */
function validaCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g,'');
    if(cpf === '' || cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let add = 0;
    for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9))) return false;
    add = 0;
    for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(10))) return false;
    return true;
}

const formCadastro = document.getElementById('form-cadastro');
if (formCadastro) {
    const inputCpf = document.getElementById('cad-cpf');
    if (inputCpf) {
        inputCpf.addEventListener('input', function(e) {
            let v = e.target.value.replace(/\D/g,"");
            v = v.replace(/(\d{3})(\d)/,"$1.$2");
            v = v.replace(/(\d{3})(\d)/,"$1.$2");
            v = v.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
            e.target.value = v;
        });
    }

    formCadastro.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('cad-nome').value;
        const cpf = document.getElementById('cad-cpf').value;
        const endereco = document.getElementById('cad-endereco').value;
        const email = document.getElementById('cad-email').value;
        const senha = document.getElementById('cad-senha').value;
        
        const msgErro = document.getElementById('msg-erro-cadastro');
        const msgSucesso = document.getElementById('msg-sucesso-cadastro');
        
        msgErro.style.display = 'none';
        msgSucesso.style.display = 'none';

        if (!validaCPF(cpf)) {
            msgErro.innerText = "CPF inválido!";
            msgErro.style.display = 'block';
            return;
        }

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        if (usuarios.some(u => u.email === email)) {
            msgErro.innerText = "Este e-mail já está cadastrado!";
            msgErro.style.display = 'block';
            return;
        }

        const novoUsuario = { nome, cpf, endereco, email, senha };
        usuarios.push(novoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        const conteudoTxt = `LA PIAZZETTA - COMPROVANTE DE CADASTRO\nNome: ${nome}\nCPF: ${cpf}\nEndereço: ${endereco}\nE-mail: ${email}`;
        const blob = new Blob([conteudoTxt], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `cadastro_piazzetta_${nome.replace(/\s+/g, '_')}.txt`;
        link.click();
        URL.revokeObjectURL(link.href);

        msgSucesso.innerText = "Cadastro realizado com sucesso na La Piazzetta! Baixando comprovante...";
        msgSucesso.style.display = 'block';
        
        setTimeout(() => { window.location.href = 'login.html'; }, 2000);
    });
}

/* ==========================================================================
8. LÓGICA DE LOGIN DO CLIENTE (BLOQUEIO 3 TENTATIVAS)
========================================================================== */
const formLogin = document.getElementById('form-login');
if (formLogin) {
    const inputEmail = document.getElementById('login-email');
    const inputSenha = document.getElementById('login-senha');
    const msgErro = document.getElementById('msg-erro-login');
    const btnEntrar = formLogin.querySelector('button[type="submit"]');

    function verificarBloqueio() {
        const email = inputEmail.value.trim().toLowerCase();
        if (!email) return;

        let tentativas = parseInt(localStorage.getItem(`tentativas_${email}`)) || 0;
        if (tentativas >= 3) {
            msgErro.innerText = "Acesso bloqueado! Você errou a senha 3 vezes para este e-mail.";
            msgErro.style.display = 'block';
            btnEntrar.disabled = true;
            btnEntrar.style.opacity = '0.5';
            btnEntrar.style.cursor = 'not-allowed';
        } else {
            btnEntrar.disabled = false;
            btnEntrar.style.opacity = '1';
            btnEntrar.style.cursor = 'pointer';
            if (!msgErro.innerText.includes('incorretos')) {
                msgErro.style.display = 'none';
            }
        }
    }

    inputEmail.addEventListener('input', verificarBloqueio);

    formLogin.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = inputEmail.value.trim().toLowerCase();
        const senha = inputSenha.value;
        
        let tentativas = parseInt(localStorage.getItem(`tentativas_${email}`)) || 0;

        if (tentativas >= 3) {
            msgErro.innerText = "Acesso bloqueado! Você errou a senha 3 vezes para este e-mail.";
            msgErro.style.display = 'block';
            btnEntrar.disabled = true;
            return;
        }

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuarioValido = usuarios.find(u => u.email.toLowerCase() === email && u.senha === senha);
        
        if (usuarioValido) {
            localStorage.removeItem(`tentativas_${email}`);
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioValido));
            window.location.href = 'cardapio.html';
        } else {
            tentativas++;
            localStorage.setItem(`tentativas_${email}`, tentativas);
            
            if (tentativas >= 3) {
                msgErro.innerText = "Senha incorreta! Atingiu o limite de 3 tentativas. Acesso bloqueado!";
                btnEntrar.disabled = true;
                btnEntrar.style.opacity = '0.5';
                btnEntrar.style.cursor = 'not-allowed';
            } else {
                const restantes = 3 - tentativas;
                msgErro.innerText = `E-mail ou senha incorretos! (${tentativas}/3 tentativas. Você tem mais ${restantes} chance${restantes > 1 ? 's' : ''}).`;
            }
            
            msgErro.style.display = 'block';
        }
    });
}

/* ==========================================================================
9. ÁREA LOGADA (CARRINHO E CHECKOUT)
========================================================================== */
const areaCardapioLogado = document.getElementById('area-cardapio-logado');
let usuarioLogado = null;
let carrinho = [];

if (areaCardapioLogado) {
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (!usuarioLogado) {
        window.location.href = 'login.html';
    } else {
        document.getElementById('saudacao-usuario').innerText = `Olá, ${usuarioLogado.nome.split(' ')[0]}! O que vai ser hoje na La Piazzetta?`;
        document.getElementById('check-endereco').value = usuarioLogado.endereco; 
        
        const chaveCarrinho = `carrinho_${usuarioLogado.email}`;
        carrinho = JSON.parse(localStorage.getItem(chaveCarrinho)) || [];
        
        filtrarCardapioHTML('Todos');
        atualizarCarrinhoDOM();
    }

    const btnSair = document.getElementById('btn-sair');
    if (btnSair) {
        btnSair.addEventListener('click', function() {
            localStorage.removeItem('usuarioLogado');
            window.location.href = 'index.html';
        });
    }

    document.querySelectorAll('.btn-filtro').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.btn-filtro').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filtrarCardapioHTML(this.getAttribute('data-cat'));
        });
    });

    const checkPagamento = document.getElementById('check-pagamento');
    if (checkPagamento) {
        checkPagamento.addEventListener('change', function() {
            const blocoTroco = document.getElementById('bloco-troco');
            blocoTroco.style.display = (this.value === 'Dinheiro') ? 'block' : 'none';
        });
    }

    const formCheckout = document.getElementById('form-checkout');
    if (formCheckout) {
        formCheckout.addEventListener('submit', function(e) {
            e.preventDefault();
            if(carrinho.length === 0) {
                alert("Seu carrinho está vazio!");
                return;
            }

            const pag = document.getElementById('check-pagamento').value;
            const trocoInput = document.getElementById('check-troco');
            const trocoInfo = (pag === 'Dinheiro' && trocoInput && trocoInput.value.trim() !== '') ? trocoInput.value.trim() : 'Não necessário';

            const numPedido = Math.floor(Math.random() * 90000) + 10000;
            const dataHora = new Date();

            const valorTotal = carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
            const resumoItensTxt = carrinho.map(item => `  - ${item.quantidade}x ${item.nome} (${formatarMoeda(item.preco * item.quantidade)})`).join('\n');

            let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
            pedidos.push({ 
                cliente: usuarioLogado.email, 
                itens: [...carrinho], 
                pedido: numPedido, 
                valorTotal: valorTotal,
                pagamento: pag,
                troco: trocoInfo,
                data: dataHora 
            });
            localStorage.setItem('pedidos', JSON.stringify(pedidos));

            const comprovanteTexto = 
`===================================================
        LA PIAZZETTA - COMPROVANTE DE PEDIDO
===================================================
Pedido Nº: #${numPedido}
Data/Hora: ${dataHora.toLocaleString('pt-BR')}

--- DADOS DO CLIENTE ---
Nome: ${usuarioLogado.nome}
CPF: ${usuarioLogado.cpf || 'Não informado'}
E-mail: ${usuarioLogado.email}
Endereço: ${usuarioLogado.endereco}

--- ITENS SOLICITADOS ---
${resumoItensTxt}

--- FORMA DE PAGAMENTO & TOTAL ---
Método: ${pag}
Troco para: ${trocoInfo}
VALOR TOTAL: ${formatarMoeda(valorTotal)}
===================================================`;

            carrinho = [];
            salvarCarrinho();
            atualizarCarrinhoDOM();

            const htmlResumo = `
                <div class="modal-resumo-compra">
                    <p><strong>Pedido #${numPedido}</strong> gerado com sucesso!</p>
                    <p><strong>Forma de Pagamento:</strong> ${pag}</p>
                    <p><strong>Valor Total:</strong> <span class="destaque-preco">${formatarMoeda(valorTotal)}</span></p>
                </div>
                <button id="btn-download-comprovante" class="btn btn-comprovante btn-block">📄 Baixar Comprovante (.txt)</button>
            `;
            
            criarModal('Pedido Confirmado!', htmlResumo);

            setTimeout(() => {
                const btnDownload = document.getElementById('btn-download-comprovante');
                if (btnDownload) {
                    btnDownload.addEventListener('click', function() {
                        const blob = new Blob([comprovanteTexto], { type: 'text/plain;charset=utf-8' });
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(blob);
                        link.download = `comprovante_la_piazzetta_${numPedido}.txt`;
                        link.click();
                        URL.revokeObjectURL(link.href);
                    });
                }
            }, 100);

            document.getElementById('check-complemento').value = '';
            document.getElementById('check-pagamento').value = '';
            if (trocoInput) trocoInput.value = '';
            document.getElementById('bloco-troco').style.display = 'none';
        });
    }
}

function adicionarAoCarrinho(idProduto) {
    const todos = obterTodosProdutos();
    const produto = todos.find(p => p.id === idProduto);
    if (!produto) return;

    const itemExistente = carrinho.find(item => item.id === idProduto);
    
    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }
    
    salvarCarrinho();
    atualizarCarrinhoDOM();

    const carrinhoBox = document.querySelector('.carrinho-box');
    if (carrinhoBox) {
        carrinhoBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function alterarQuantidade(idProduto, delta) {
    const index = carrinho.findIndex(item => item.id === idProduto);
    if (index > -1) {
        carrinho[index].quantidade += delta;
        if (carrinho[index].quantidade <= 0) {
            carrinho.splice(index, 1);
        }
        salvarCarrinho();
        atualizarCarrinhoDOM();
    }
}

function salvarCarrinho() {
    if (usuarioLogado) {
        const chave = `carrinho_${usuarioLogado.email}`;
        localStorage.setItem(chave, JSON.stringify(carrinho));
    }
}

function atualizarCarrinhoDOM() {
    const lista = document.getElementById('lista-carrinho');
    const spanTotal = document.getElementById('total-carrinho');
    const spanCount = document.getElementById('contador-itens');
    
    if (!lista) return;

    lista.innerHTML = '';
    let total = 0;
    let count = 0;
    if (carrinho.length === 0) {
        lista.innerHTML = '<p style="text-align:center; padding: 20px; color: #666;">Seu carrinho está vazio.</p>';
    } else {
        carrinho.forEach(item => {
            const subtotal = item.preco * item.quantidade;
            total += subtotal;
            count += item.quantidade;
            lista.innerHTML += `
                <div class="item-carrinho">
                    <div class="item-info">
                        <strong>${item.quantidade}x ${item.nome}</strong><br>
                        ${formatarMoeda(subtotal)}
                    </div>
                    <div class="item-acoes">
                        <button onclick="alterarQuantidade(${item.id}, -1)">-</button>
                        <button onclick="alterarQuantidade(${item.id}, 1)">+</button>
                        <button onclick="alterarQuantidade(${item.id}, -${item.quantidade})" class="btn-remover">X</button>
                    </div>
                </div>
            `;
        });
    }
    if (spanCount) spanCount.innerText = count;
    if (spanTotal) spanTotal.innerText = formatarMoeda(total);
}