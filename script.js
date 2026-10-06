/* ==========================================================================
1. BANCO DE DADOS (ARRAY DE PRODUTOS)
========================================================================== */
const produtos = [
    { id: 1, nome: "Mussarela", categoria: "Tradicionais", ingredientes: "Molho de tomate, muito queijo mussarela, orégano.", preco: 45.00 },
    { id: 2, nome: "Calabresa", categoria: "Tradicionais", ingredientes: "Molho de tomate, mussarela, calabresa fatiada, cebola.", preco: 48.00 },
    { id: 3, nome: "Portuguesa", categoria: "Tradicionais", ingredientes: "Mussarela, presunto, ovos, cebola, ervilha e azeitonas.", preco: 52.00 },
    { id: 4, nome: "Margherita", categoria: "Tradicionais", ingredientes: "Molho de tomate, mussarela, manjericão fresco, tomate.", preco: 47.00 },
    
    { id: 5, nome: "Frango c/ Catupiry", categoria: "Especiais", ingredientes: "Mussarela, frango desfiado, legítimo Catupiry.", preco: 58.00 },
    { id: 6, nome: "Quatro Queijos", categoria: "Especiais", ingredientes: "Mussarela, provolone, gorgonzola e parmesão.", preco: 60.00 },
    { id: 7, nome: "Pepperoni", categoria: "Especiais", ingredientes: "Mussarela, fatias de pepperoni, pimentão (opcional).", preco: 62.00 },
    { id: 8, nome: "Bacon com Cheddar", categoria: "Especiais", ingredientes: "Mussarela, bacon crocante, tiras de cheddar.", preco: 65.00 },
    
    { id: 9, nome: "Chocolate c/ Morango", categoria: "Doces", ingredientes: "Chocolate ao leite derretido, morangos frescos.", preco: 55.00 },
    { id: 10, nome: "Banana com Canela", categoria: "Doces", ingredientes: "Mussarela, banana fatiada, açúcar e canela.", preco: 45.00 },
    
    { id: 11, nome: "Refrigerante 2L", categoria: "Bebidas", ingredientes: "Coca-Cola, Guaraná, Fanta.", preco: 15.00 },
    { id: 12, nome: "Suco Natural 500ml", categoria: "Bebidas", ingredientes: "Laranja, Limão, Maracujá.", preco: 10.00 }
];

/* ==========================================================================
2. ATUALIZAÇÃO DOS MENUS (CÓDIGO BASE DO PROFESSOR ADAPTADO)
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

/* ==========================================================================
3. DATA DINÂMICA NO RODAPÉ
========================================================================== */
const dataAtualFormatada = new Date().toLocaleDateString('pt-BR', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
});
const spanData = document.getElementById('data-atual');
if(spanData){
    spanData.innerText = dataAtualFormatada.charAt(0).toUpperCase() + dataAtualFormatada.slice(1);
}

/* ==========================================================================
4. SISTEMA DE MODAIS DINÂMICOS (Sobre e Contato)
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
        criarModal('A La Piazzetta', '<p>Fundada por três estudantes apaixonados por tecnologia e pizza, nossa missão é entregar o verdadeiro sabor da Itália na sua casa com a praticidade do mundo digital.</p><br><p><strong>Horário:</strong> Terça a Domingo, das 18h às 23h30.</p>');
    }
    if (e.target.id === 'item-clientes') {
        e.preventDefault();
        criarModal('O que dizem nossos clientes', '<ul><li><strong>João P. (⭐⭐⭐⭐⭐)</strong> - "A melhor pizza de pepperoni que já comi!"</li><br><li><strong>Maria S. (⭐⭐⭐⭐)</strong> - "Entrega rápida e massa no ponto exato."</li><br><li><strong>Carlos A. (⭐⭐⭐⭐⭐)</strong> - "A de chocolate com morango é um absurdo de boa!"</li></ul>');
    }
    if (e.target.id === 'item-telefones') {
        e.preventDefault();
        criarModal('Nossos Telefones', '<p>Central de Atendimento: <strong>(32) 3333-0000</strong></p><br><p>WhatsApp Delivery: <a href="tel:32999990000"><strong>(32) 99999-0000</strong></a></p>');
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
        criarModal('Envie um E-mail', conteudo);
    }
});

/* ==========================================================================
5. FUNÇÕES VITAIS E LÓGICA DE FILTRO (HTML ESTÁTICO)
========================================================================== */
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
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
6. LÓGICA DE CADASTRO (Validação, CPF e TXT)
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
    inputCpf.addEventListener('input', function(e) {
        let v = e.target.value.replace(/\D/g,"");
        v = v.replace(/(\d{3})(\d)/,"$1.$2");
        v = v.replace(/(\d{3})(\d)/,"$1.$2");
        v = v.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
        e.target.value = v;
    });

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

        const conteudoTxt = `DADOS DE CADASTRO\nNome: ${nome}\nCPF: ${cpf}\nEndereço: ${endereco}\nE-mail: ${email}`;
        const blob = new Blob([conteudoTxt], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `cadastro_${nome.replace(/\s+/g, '_')}.txt`;
        link.click();
        URL.revokeObjectURL(link.href);

        msgSucesso.innerText = "Cadastro realizado com sucesso! Baixando comprovante... Redirecionando para login.";
        msgSucesso.style.display = 'block';
        
        setTimeout(() => { window.location.href = 'login.html'; }, 2000);
    });
}

/* ==========================================================================
7. LÓGICA DE LOGIN
========================================================================== */
const formLogin = document.getElementById('form-login');
if (formLogin) {
    formLogin.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const senha = document.getElementById('login-senha').value;
        const msgErro = document.getElementById('msg-erro-login');
        
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        const usuarioValido = usuarios.find(u => u.email === email && u.senha === senha);
        
        if (usuarioValido) {
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioValido));
            window.location.href = 'cardapio.html';
        } else {
            msgErro.innerText = "E-mail ou senha incorretos!";
            msgErro.style.display = 'block';
        }
    });
}

/* ==========================================================================
8. ÁREA LOGADA (CARDÁPIO COM CARRINHO E FINALIZAÇÃO)
========================================================================== */
const areaCardapioLogado = document.getElementById('area-cardapio-logado');
let usuarioLogado = null;
let carrinho = [];

if (areaCardapioLogado) {
    usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (!usuarioLogado) {
        window.location.href = 'login.html';
    } else {
        document.getElementById('saudacao-usuario').innerText = `Olá, ${usuarioLogado.nome.split(' ')[0]}! O que vai ser hoje?`;
        document.getElementById('check-endereco').value = usuarioLogado.endereco; 
        
        const chaveCarrinho = `carrinho_${usuarioLogado.email}`;
        carrinho = JSON.parse(localStorage.getItem(chaveCarrinho)) || [];
        
        filtrarCardapioHTML('Todos');
        atualizarCarrinhoDOM();
    }

    document.getElementById('btn-sair').addEventListener('click', function() {
        localStorage.removeItem('usuarioLogado');
        window.location.href = 'index.html';
    });

    document.querySelectorAll('.btn-filtro').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.btn-filtro').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filtrarCardapioHTML(this.getAttribute('data-cat'));
        });
    });

    document.getElementById('check-pagamento').addEventListener('change', function() {
        const blocoTroco = document.getElementById('bloco-troco');
        if (this.value === 'Dinheiro') {
            blocoTroco.style.display = 'block';
        } else {
            blocoTroco.style.display = 'none';
        }
    });

    document.getElementById('form-checkout').addEventListener('submit', function(e) {
        e.preventDefault();
        if(carrinho.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }

        const pag = document.getElementById('check-pagamento').value;
        const numPedido = Math.floor(Math.random() * 10000);
        
        let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
        pedidos.push({ cliente: usuarioLogado.email, itens: carrinho, pedido: numPedido, data: new Date() });
        localStorage.setItem('pedidos', JSON.stringify(pedidos));

        carrinho = [];
        salvarCarrinho();
        atualizarCarrinhoDOM();

        const htmlResumo = `
            <p><strong>Pedido #${numPedido}</strong> gerado com sucesso!</p>
            <p>Pagamento: ${pag}</p>
            <p>Tempo estimado de entrega: 45 a 60 minutos.</p>
            <p>Obrigado pela preferência!</p>
        `;
        criarModal('Pedido Confirmado!', htmlResumo);
        
        document.getElementById('check-complemento').value = '';
        document.getElementById('check-pagamento').value = '';
        document.getElementById('bloco-troco').style.display = 'none';
    });
}

function adicionarAoCarrinho(idProduto) {
    const produto = produtos.find(p => p.id === idProduto);
    const itemExistente = carrinho.find(item => item.id === idProduto);
    
    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }
    
    salvarCarrinho();
    atualizarCarrinhoDOM();
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
    const chave = `carrinho_${usuarioLogado.email}`;
    localStorage.setItem(chave, JSON.stringify(carrinho));
}

function atualizarCarrinhoDOM() {
    const lista = document.getElementById('lista-carrinho');
    const spanTotal = document.getElementById('total-carrinho');
    const spanCount = document.getElementById('contador-itens');
    
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

    spanCount.innerText = count;
    spanTotal.innerText = formatarMoeda(total);
}