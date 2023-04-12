import { defineSupportCode } from 'cucumber';
import { $, browser, by, element, ElementArrayFinder } from 'protractor';

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^I'm on the start page $/, async (name) => {
        await browser.get('http://localhost:4200/');
        await expect(browser.getTitle()).to.eventually.equal(name.toString());
    });
    
    Given(/^I'm on the page "([^\"]*)"$/, async (name) => {
        await browser.get('http://localhost:4200/' + name.toString().toLowerCase());
        await expect(browser.getTitle()).to.eventually.equal(name.toString());
    });

    Then(/^Then I see the "([^\"]*)" top artists of sfotipy$/,
        async (numberArtists) => {
            const artists = await element.all(by.name('circulo'));
            const numberOfSongs = await artists.length;
            expect(numberOfSongs)
              .to.be.at.least(parseInt(numberArtists.toString()));
        }
    );
})