import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, protractor, ExpectedConditions } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function goTo(page:string) {
    await browser.driver.get(`http://localhost:4200/${page}`);
}

async function checkPlaylistName(playlistName:string) {
    const EC = protractor.ExpectedConditions;
    const playlist = await element(by.className("playlist_name"));
    await browser.wait(EC.visibilityOf(playlist), 5000, "Element not visible");
    expect(await playlist.getText()).to.equal(playlistName);
}

defineSupportCode(function({Given, When, Then}) {

    Given(/^possuo login "([^\"]*)" e senha "(\d*)"$/,  async (login, senha) => {
        expect(login).to.equal(login);
    })

    Given(/^estou na página da playlist "([^\"]*)" com id "(\d*)"$/, async (playlistName, id) => {
        goTo("playlist/" + id);
        await checkPlaylistName(playlistName.toString());
    });

    Given(/^tenho permissão para gerenciar "([^\"]*)"$/, async(playlistName) => {
        const selector = await element(by.id("selector-cat"));
        expect(await selector.isPresent()).to.be.true;
    });

    Given(/^"([^\"]*)" tem a categoria "([^\"]*)"$/, async (playlist, category) => {
        expect((await element.all(by.id(`selected-cat-${category}`))).length).to.equal(1);
    });

    When(/^seleciono a opção de adicionar uma nova categoria$/, async () => {
        await element(by.id("selector-cat")).click();
    });

    When(/^seleciono "([^\"]*)" como uma nova categoria$/, async (category) => {
        const categoryElement = await element(by.id("select-cat-"+category));
        await categoryElement.click();
    });

    Then(/^"([^\"]*)" é uma nova categoria da playlist "([^\"]*)"$/, async (category, playlistName) => {
        expect((await element.all(by.id(`selected-cat-${category}`))).length).to.equal(1);
    });

    Given(/^possuo o login "([^\"]*)" e senha "([^\"]*)"$/, async (login, senha) => {
        // Verificar login
        expect(login).to.equal(login);
    });

    Given(/^"([^\"]*)" não é uma categoria da playlist "([^\"]*)"$/, async (category, playlistName) => {
        expect((await element.all(by.id(`selected-cat-${category}`))).length).to.equal(0);
    });

    Given(/^"([^\"]*)" é uma categoria da playlist "([^\"]*)"$/, async (category, playlistName) => {
        expect((await element.all(by.id(`selected-cat-${category}`))).length).to.equal(1);
    });

    When(/^seleciono "([^\"]*)" para o remover das categorias$/, async (category) => {
        const removedElement = await element(by.id("selected-cat-"+category));
        const button = await removedElement.element(by.className("close-button"));
        await button.click();
    });

    Then(/^"([^\"]*)" é uma categoria de "([^\"]*)” e "([^\"]*)" não.$/, async (categoryPresent, playlistName, categoryNotPresent) => {
        expect((await element.all(by.id(`selected-cat-${categoryPresent}`))).length).to.equal(1);
        expect((await element.all(by.id(`selected-cat-${categoryNotPresent}`))).length).to.equal(0);
        await checkPlaylistName(playlistName.toString());

    });

    // Scenario : remover uma categoria.

    Then(/^"([^\"]*)" não possui mais "([^\"]*)" como uma categoria da playlist$/, async(playlistName, category) => {
        await checkPlaylistName(playlistName.toString());
        expect((await element.all(by.id(`selected-cat-${category}`))).length).to.equal(0);
    });

    // Scenario : adicionando categoria já existente na playlist

    Then(/^não consigo ver "([^\"]*)" como uma categoria para ser selecionada$/, async(category) => {
        expect((await element.all(by.id(`select-cat-${category}`))).length).to.equal(0);
    });

    Then(/^"([^\"]*)" continua tendo somente uma categoria, que é "([^\"]*)"$/, async(playlistName, category) => {
        expect((await element.all(by.id(`selected-cat-${category}`))).length).to.equal(1);
        await checkPlaylistName(playlistName.toString());
    });

    // Scenario: mais de duas categorias para playlist

    When(/^não consigo encontrar a opção de adicionar uma nova categoria$/, async () => {
        expect((await element.all(by.id("selector-cat"))).length).to.equal(0);
    });

    // Scenario: removendo todas as categorias de uma playlist

    Then(/^"([^\"]*)" não possui nenhuma categoria$/, async (playlistName) => {
        await checkPlaylistName(playlistName.toString());
        expect((await element.all(by.className("category"))).length).to.equal(0);
    });

    // Scenario: adicionando duas categorias para a playlist

    Given(/^"([^\"]*)" não possui nenhuma categoria cadastrada$/,  async(playlistName) => {
        expect((await element.all(by.className("category"))).length).to.equal(0);
    });


});
