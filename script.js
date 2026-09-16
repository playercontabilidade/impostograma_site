const header = document.querySelector('.header');
const updateHeaderState = () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 12);
};

window.addEventListener('scroll', updateHeaderState, { passive: true });
updateHeaderState();

const modules = [
  { title: 'Gestão de Clientes', description: 'A empresa vira o hub do escritório: cadastro, certificado, tags, histórico e responsáveis por área — fiscal, contábil e pessoal — sem atrito na equipe.', benefits: ['Ficha operacional completa com CNPJ, CNAE e regime', 'Responsáveis certos por área sem conflito', 'Certificados .pfx e .p12 centralizados', 'Acesso externo: cliente acompanha sem ligar'] },
  { title: 'Processos e Entregas', description: 'Organize toda a rotina em processos visuais, com responsáveis, prazos, documentos e um histórico completo de cada entrega.', benefits: ['Kanban por competência e responsável', 'Prazos e alertas sempre visíveis', 'Anexos e comentários no mesmo card', 'Rastreabilidade de cada alteração'] },
  { title: 'Automação Fiscal e Contábil', description: 'Tarefas repetitivas acontecem no fluxo certo: captura, cálculo, declaração e geração de guias com controle da operação.', benefits: ['Captura automática de documentos fiscais', 'Regras parametrizadas por cliente', 'Guias e declarações no mesmo fluxo', 'Menos retrabalho operacional'] },
  { title: 'Gerenciador de Documentos', description: 'Documentos, comprovantes e certificados ficam centralizados, organizados e disponíveis para a equipe e o cliente.', benefits: ['Pastas por empresa e competência', 'Controle de documentos pendentes', 'Comprovantes associados à entrega', 'Acesso seguro para clientes'] },
  { title: 'Auditoria por XML e Cartões', description: 'Cruze dados e identifique divergências antes do fechamento, com uma visão prática das informações que precisam de atenção.', benefits: ['Leitura estruturada de XMLs', 'Conferência de cartões e recebíveis', 'Alertas de inconsistências', 'Base confiável para conferência'] },
  { title: 'Financeiro e Conciliação', description: 'Conecte a rotina financeira ao escritório, acompanhando recebimentos, conciliação e dados prontos para a contabilidade.', benefits: ['Conciliação bancária integrada', 'Visão de contas e recebimentos', 'Exportação para a contabilidade', 'Financeiro conectado ao fechamento'] }
];

const details = document.querySelector('.module-details');
document.querySelectorAll('.module-item').forEach((button, index) => {
  button.addEventListener('click', () => {
    const module = modules[index];
    document.querySelectorAll('.module-item').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    details.innerHTML = `<p class="module-number">MÓDULO ${String(index + 1).padStart(2, '0')}</p><h3>${module.title}</h3><p class="module-description">${module.description}</p><ul class="module-benefits">${module.benefits.map(benefit => `<li>${benefit}</li>`).join('')}</ul>`;
  });
});

const tabData = {
  Entregas: { title: 'Entregas — Set/2026', progress: '96% concluído', stats: [['347', 'Total'], ['12', 'Pendentes'], ['310', 'Entregues'], ['3', 'Atrasadas']] },
  Documentos: { title: 'Documentos — Set/2026', progress: '91% organizados', stats: [['1.284', 'Total'], ['42', 'Pendentes'], ['1.167', 'Organizados'], ['8', 'Vencidos']] },
  Financeiro: { title: 'Financeiro — Set/2026', progress: '94% conciliado', stats: [['238', 'Lançamentos'], ['9', 'Pendentes'], ['224', 'Conciliados'], ['5', 'Alertas']] }
};

document.querySelectorAll('.platform-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const data = tabData[tab.textContent.trim()];
    document.querySelectorAll('.platform-tab').forEach(item => item.classList.remove('active'));
    tab.classList.add('active');
    document.querySelector('.panel-header h3').textContent = data.title;
    document.querySelector('.panel-header span').textContent = data.progress;
    document.querySelectorAll('.panel-stats div').forEach((stat, index) => {
      stat.querySelector('strong').textContent = data.stats[index][0];
      stat.querySelector('span').textContent = data.stats[index][1];
    });
  });
});

document.querySelectorAll('.billing-option').forEach(option => {
  option.addEventListener('click', () => {
    document.querySelectorAll('.billing-option').forEach(item => item.classList.remove('active'));
    option.classList.add('active');
  });
});

const destinations = { '#funcionalidades': '.features-section', '#como-funciona': '.steps-section', '#modulos': '.modules-section' };
document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', event => {
    const destination = destinations[link.getAttribute('href')];
    if (!destination) return;
    event.preventDefault();
    document.querySelector(destination).scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Duplica os itens para que o carrossel de obrigações faça um loop contínuo.
const ticker = document.querySelector('.modules-strip ul');
if (ticker && ticker.children.length) {
  [...ticker.children].forEach(item => {
    const copy = item.cloneNode(true);
    copy.setAttribute('aria-hidden', 'true');
    ticker.appendChild(copy);
  });
}

// Remove o rodapé legado simples: o rodapé completo acima dele é o exibido.
document.querySelectorAll('.footer').forEach(footer => {
  if (!footer.querySelector('.footer-content')) footer.remove();
});
