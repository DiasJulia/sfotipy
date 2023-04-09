import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function assertTamanhoEqual(set, n) {
    await set.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(n));
}

async function assertIncludesInName(set, name) {
    expect(Promise.resolve(set.getText())).to.eventually.includes(name);
}

let sameName = ((elem, name) => elem.element(by.name('nome')).getText().then(text => text.toLowerCase() === name.toLowerCase()));

let hasInName = (elem, name) => elem.element(by.name('nome')).getText().then(text => text.toLowerCase().includes(name.toLowerCase()));

async function assertMusicsWithSameName(n, name) {
    var allmusics: ElementArrayFinder = element.all(by.name("music-container"));
    var samenames = allmusics.filter(elem => sameName(elem, name));
    await assertTamanhoEqual(samenames, n);
}

defineSupportCode(function ({ Given, When, Then }) {
    //Scenario: Voltar à página inicial
    Given(/^eu esteja logado com o usuário usuário "([^\"]*)" e a senha "([^\"]*)"$/, async (user, passw) => {

    });

    Given(/^eu esteja na página "([^\"]*)"$/, async (name) => {
        await browser.get("http://localhost:4200/busca");
        await expect(browser.getTitle()).to.eventually.equal(name);
    });

    When(/^eu cliclo no botão "([^\"]*)"$/, async (home) => {
        await element(by.name(home.toString())).click();
    });

    Then(/^eu estou vou para a página "([^\"]*)"$/, async (name) => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal(name);
    });

    //////////////////////////////////////////////////////////////////////////
    //Scenario: Visualizar informações públicas e do usuário
    Given(/^eu estou na página inicial "([^\"]*)"$/, async (name) => {
        await browser.get("http://localhost:4200/busca");
        await expect(browser.getTitle()).to.eventually.equal(name);
    });

    Given(/^eu esteja logado com o usuário usuário "([^\"]*)" e a senha "([^\"]*)"$/, async (user, passw) => {

    });

    When('eu percorro a página', async () => {
        // No action needed, as we are just navigating through the page
    });

    Then(/^eu consigo ver "([^\"]*)", "([^\"]*)", "([^\"]*)" e "([^\"]*)"$/, async (recomendacoes, publicas, em_alta, minhas) => {
        const rec = await element(by.name("recomendacoes"));
        const pub = await element(by.name("plsts-publicas"));
        const ema = await element(by.name("plsts-em-alta"));
        const min = await element(by.name("minhas-plsts"));
        expect(await rec.getText()).to.equal(recomendacoes);
        expect(await pub.getText()).to.equal(publicas);
        expect(await ema.getText()).to.equal(em_alta);
        expect(await min.getText()).to.equal(minhas);
    });

    //////////////////////////////////////////////////////////////////////////
    //Scenario: Sair do serviço
    Given(/^eu estou na página "([^\"]*)"$/, async (name) => {
        await browser.get("http://localhost:4200");
        await expect(browser.getTitle()).to.eventually.equal(name);
    });

    Given(/^eu esteja logado com o usuário usuário "([^\"]*)" e a senha "([^\"]*)"$/, async (user, passw) => {

    });

    When(/^eu cliclo no botão "([^\"]*)"$/, async (sair) => {
        await element(by.name("profile")).click();
        await element(by.name(sair.toString())).click();
    });

    Then(/^eu sou direcionado novamente para a seção "([^\"]*)"$/, async (login) => {
        await browser.get("http://localhost:4200/login");
        await expect(browser.getTitle()).to.eventually.equal(login);
    });

    Then(/^minhas credenciais serão pedidas novamente$/, async () => {

    });

    //////////////////////////////////////////////////////////////////////////
    //Scenario: Visualizar informações para usuário não logado
    Given(/^eu estou na página "([^\"]*)"$/, async (name) => {
        await browser.get("http://localhost:4200/busca");
        await expect(browser.getTitle()).to.eventually.equal(name);
    });

    Given(/^eutenha optado por não fazer login$/, async () => {
        // No action needed, as we are not logged in as default
    });

    When('eu percorro a página', async () => {
        // No action needed, as we are just navigating through the page
    });

    Then(/^eu consigo ver "([^\"]*)", "([^\"]*)", "([^\"]*)" e "([^\"]*)"$/, async (em_alta, publicas) => {
        const pub = await element(by.name("plsts-publicas"));
        const ema = await element(by.name("plsts-em-alta"));
        expect(await pub.getText()).to.equal(publicas);
        expect(await ema.getText()).to.equal(em_alta);
    });

    //////////////////////////////////////////////////////////////////////////
    //Scenario: Minhas Playlists de usuário não logado
    //Scenario: Criar playlists como usuário não logado UNIR COM O DE CIMA
    Given(/^eu estou na página "([^\"]*)"$/, async (name) => {
        await browser.get("http://localhost:4200");
        await expect(browser.getTitle()).to.eventually.equal(name);
    });

    Given(/^eutenha optado por não fazer login$/, async () => {
        // No action needed, as we are not logged in as default
    });

    When(/^eu cliclo no botão "([^\"]*)"$/, async (playlists) => {
        await element(by.name(playlists.toString())).click();
    });

    Then(/^eu sou levado para a pagina de "([^\"]*)"$/, async (login) => {
        await browser.get("http://localhost:4200/login");
        await expect(browser.getTitle()).to.eventually.equal(login);
    });

    //Não fiz ainda
    Then(/^aparece a mensagem "([^\"]*)"$/, async (msg) => {
        const message = await element(by.name("msg"));
        expect(await message.getText()).to.equal(msg);
    });

    //////////////////////////////////////////////////////////////////////////
    //Scenario: Acessar perfil do usuário
    Given(/^eu estou na página "([^\"]*)"$/, async (name) => {
        await browser.get("http://localhost:4200");
        await expect(browser.getTitle()).to.eventually.equal(name);
    });

    Given(/^eu esteja logado com o usuário usuário "([^\"]*)" e a senha "([^\"]*)"$/, async (user, passw) => {
    
    });

    When(/^eu cliclo no ícone "([^\"]*)"$/, async (perfil) => {
        await element(by.name(perfil.toString())).click();
    });

    Then(/^eu posso ver meus dados ("([^\"]*)", "([^\"]*)")$/, async (name, followers) => {
        const nm = await element(by.name("name"));
        const fl = await element(by.name("followers"));
        expect(await nm.getText()).to.equal('Olá, ' + name);
        expect(await fl.getText()).to.equal(followers);
    });

    //////////////////////////////////////////////////////////////////////////
    //Scenario: Minhas Playlists de usuário logado
    Given(/^eu estou na página "([^\"]*)"$/, async (name) => {
        await browser.get("http://localhost:4200");
        await expect(browser.getTitle()).to.eventually.equal(name);
    });

    Given(/^eu esteja logado com o usuário usuário "([^\"]*)" e a senha "([^\"]*)"$/, async (user, passw) => {
    
    });

    When(/^eu cliclo no botão "([^\"]*)"$/, async (playlists) => {
        await element(by.name(playlists.toString())).click();
    });

    Then(/^eu sou levado para a pagina de "([^\"]*)"$/, async (playlists) => {
        await browser.get("http://localhost:4200/minhas_playlists");
        await expect(browser.getTitle()).to.eventually.equal(playlists);
    });

    Then(/^eu posso ver uma lista com as minhas playlists "([^\"]*)", "([^\"]*)", "([^\"]*)"$/, async (playlist1, playlist2, playlist3) => {
        const pl1 = await element(by.name("playlist1"));
        const pl2 = await element(by.name("playlist2"));
        const pl3 = await element(by.name("playlist3"));
        expect(await pl1.getText()).to.equal(playlist1);
        expect(await pl2.getText()).to.equal(playlist2);
        expect(await pl3.getText()).to.equal(playlist3);
    });
});