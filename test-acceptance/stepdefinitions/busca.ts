import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, protractor } from 'protractor';
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
    Given(/^eu estou na página "([^\"]*)"$/, async (name) => {
        await browser.get("http://localhost:4200/busca");
        await expect(browser.getTitle()).to.eventually.equal(name);
    })

    Given(/^as músicas "([^\"]*)", "([^\"]*)", "([^\"]*)" e "([^\"]*)" aparecem na lista de músicas$/,
        async (music1, music2, music3, music4) => {
            await assertMusicsWithSameName(1, music1);
            await assertMusicsWithSameName(1, music2);
            await assertMusicsWithSameName(1, music3);
            await assertMusicsWithSameName(1, music4);
        });

    Given(/^todas as músicas estão visíveis$/, async () => {
        await browser.refresh();
        var isCollapsed = element(by.css('.see-more-music'));
        const button = element(by.css('.see-more-music'));
        await browser.executeScript('arguments[0].click()', button.getWebElement());
        await assertIncludesInName(isCollapsed, "menos");
    })

    Given(/^há (\d+) músicas que contém "([^\"]*)" em seu nome na lista de músicas$/,
        async (amount, music) => {
            var allmusics: ElementArrayFinder = element.all(by.name("music-container"));
            var hasName = allmusics.filter(elem => hasInName(elem, music));
            await assertTamanhoEqual(hasName, amount);
        });

    When(/^eu preencher o campo de busca por texto com "([^\"]*)"$/,
        async (name) => {
            await element(by.id("text-search-input")).clear();
            await element(by.id("text-search-input")).sendKeys(<string>name);
        })

    Then(/^eu posso ver as músicas "([^\"]*)" e "([^\"]*)" na lista de músicas$/,
        async (music1, music2) => {
            expect((await element.all(by.id(`music-${music1}`))).length).to.equal(1);
            expect((await element.all(by.id(`music-${music2}`))).length).to.equal(1);
        })

    Then(/^todas as músicas da lista de músicas contém "([^\"]*)" em seu nome$/,
        async (name) => {
            await element.all(by.css(`[name='music-card'] .name`)).then(async items => {
                for (let index = 0; index < items.length; index++) {
                    const element = items[index];
                    await assertIncludesInName(items[index], name);
                }
            });
        })

    Given(/^todas as opções de conteúdo a ser mostrado estão selecionadas$/,
        async () => {
            var alloptions: ElementArrayFinder = element.all(by.name("type-option"));
            await alloptions.each(async option => {
                expect(await option.getAttribute('class')).to.includes('active');
            })
            //expect(await element(by.id('option-' + option1)).getAttribute('class')).to.includes('active');
            //expect(await element(by.id('option-' + option2)).getAttribute('class')).to.includes('active');
        });

    When(/^eu selecionar apenas "([^\"]*)" no tipo de conteúdo a ser mostrado$/,
        async (option1) => {
            var alloptions: ElementArrayFinder = element.all(by.name("type-option"));
            await alloptions.each(async option => {
                await option.click();
            })
            await alloptions.each(async option => {
                expect(await option.getAttribute('class')).not.to.includes('active');
            })
            await element(by.id('option-' + option1)).click();
            expect(await element(by.id('option-' + option1)).getAttribute('class')).to.includes('active');
        });

    Then(/^eu só posso ver (\d+) sessões de conteúdo$/,
        async (amount) => {
            var alloptions: ElementArrayFinder = element.all(by.name("content-section"));
            await assertTamanhoEqual(alloptions, amount)
        });

    Then(/^eu posso ver a sessão de conteúdo "([^\"]*)"$/,
        async (section) => {
            expect((await element.all(by.id(`section-${section}`))).length).to.equal(1);
        });

    Given(/^não há nenhuma música cujo nome contenha "([^\"]*)"$/,
        async (music) => {
            var allmusics: ElementArrayFinder = element.all(by.name("music-container"));
            var hasName = allmusics.filter(elem => hasInName(elem, music));
            await assertTamanhoEqual(hasName, 0);
        });

    Then(/^eu posso ver uma mensagem de erro informando que não foram encontradas correspondências na sessão de conteúdo "([^\"]*)"$/,
        async (section) => {
            expect((await element.all(by.css(`#section-${section} .empty-search-message`))).length).to.equal(1);
        });

    Then(/^eu posso ver (\d+) mensagem de erro informando que não foram encontradas correspondências$/,
        async (amount) => {
            expect((await element.all(by.css(`.empty-search-message`))).length).to.equal(amount);
        });

    Given(/^há (\d+) playlists que contém "([^\"]*)" em seu nome na lista de playlists$/,
        async (amount, music) => {
            var allmusics: ElementArrayFinder = element.all(by.css(".playlist-card"));
            var hasName = allmusics.filter(elem => hasInName(elem, music));
            await assertTamanhoEqual(hasName, amount);
        });

    When(/^eu selecionar a categoria “([^\"]*)” no filtro de busca por categorias$/,
        async (category) => {
            await element(by.id(`selector-cat`)).click();
            await element(by.id(`select-cat-${category}`)).click();
            var selectedCategories: ElementArrayFinder = element.all(by.id(`selected-cat-${category}`));
            await assertTamanhoEqual(selectedCategories, 1);
        });

    Then(/^só serão mostradas músicas da categoria “([^\"]*)”$/,
        async (category: any) => {
            await element.all(by.css("[name='music-category']")).map(function (elm) {
                return elm.getText();
            }).then(texts => {
                texts.forEach((e: any) => expect(e.toLowerCase()).to.includes(category.toLowerCase()));
            });
        })

    Then(/^só serão mostradas playlists da categoria “([^\"]*)”$/,
        async (category: any) => {
            await element.all(by.name("playlist-category-list")).map(function (elm) {
                return elm.getText();
            }).then(texts => {
                texts.forEach((e: any) => expect(e.toLowerCase()).to.includes(category.toLowerCase()));
            });
        })
})