import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, protractor } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function goTo(page:string) {
    await browser.driver.get(`http://localhost:4200/${page}`);
}

defineSupportCode(function({Given, When, Then, setDefaultTimeout}) {

    Given(/^eu sou um usuário com login "([^\"]*)" e senha "(\d*)"$/, async(login, senha) => {
        expect(login).to.equal(login);
    });

    Given(/^estou na playlist "([^\"]*)" que é "([^\"]*)" com id "(\d*)"$/, async(name, availabity, id) => {
        await goTo("playlist/" + id);
        const playlist_name = await element(by.css(".playlist_name")).getText();
        const playlist_avalibility = await element(by.id('playlist_availability')).getText();
        expect(playlist_name).to.equal(name);
        expect(playlist_avalibility).to.equal(availabity);
    });

    When(/^seleciono a opção de compartilhar$/, async () => {
        const share = await element(by.css("i"));
        share.click();
    });

    Then(/^o link "([^\"]*)" é gerado$/, async(lk) => {
        const EC = protractor.ExpectedConditions;
        const shareLink = await element(by.tagName("app-compartilhamento"));
        await browser.wait(EC.visibilityOf(shareLink), 5000, "Element not visible");
        const link = await shareLink.element(by.id("playlist-link"));
        expect(await link.getText()).to.equal(lk);
    });

    Then(/^uma opção "([^\"]*)" é mostrada.$/, async (copyLabel) => {
        const copy = await element(by.id("copy-button"));
        expect(await copy.getText()).to.equal(copyLabel);
    });

    Then(/^posso copiar o link "([^\"]*)"$/, async (link) => {
        const copy = await element(by.id("copy-button"));
        await copy.click();
        const EC = protractor.ExpectedConditions;
        await browser.wait(EC.alertIsPresent(), 5000, "Alert not present");
        const alert = await browser.switchTo().alert();
        await alert.accept();
    });

    Given(/^sou um usuário com login "([^\!]*)" e senha "(\d*)"$/, async (login, senha) => {
        expect(login).to.equal(login);
    });

    When(/^entro na página da playlist "([^\"]*)" com id "(\d*)"$/, async (playlistName, id) => {
        goTo("playlist/" + id);
        const EC = protractor.ExpectedConditions;
        const name = await element(by.css(".playlist_name"));
        await browser.wait(EC.visibilityOf(name), 5000, "Element not visible");
        expect(await name.getText()).to.equal(playlistName);
    });

    When(/^a playlist "([^\"]*)" é "([^\"]*)"$/, async (playlistName, availabity) => {
        const name = await element(by.css(".playlist_name"));
        const aval = await element(by.id("playlist_availability"));
        expect(await name.getText()).to.equal(playlistName);
        expect(await aval.getText()).to.equal(availabity);
    });

    Then(/^a opção de compartilhar playlist não aparece na tela$/, async () => {
        const notExistingElement = await element(by.tagName("app-compartilhamento"));
        expect(await notExistingElement.isPresent()).to.be.false;
    });
    
});
