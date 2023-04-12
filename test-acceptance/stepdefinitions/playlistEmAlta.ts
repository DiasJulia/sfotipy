import { defineSupportCode } from 'cucumber';
import { $, browser, by, element, ElementArrayFinder } from 'protractor';

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^I'm on the page "([^\"]*)"$/, async (name) => {
        await browser.get('http://localhost:4200/' + name.toString().toLowerCase());
        await expect(browser.getTitle()).to.eventually.equal(name.toString());
    });

    Then(/^Then I see the "([^\"]*)" top playlist of sfotipy$/,
        async (numberPlaylists) => {
            const playlists = await element.all(by.name('rectangle'));
            const playlists2 = await element.all(by.name('bigRectangle'));
            const numberOfPlaylists = await playlists.length + playlists2.length;
            expect(numberOfPlaylists)
              .to.be.at.least(parseInt(numberPlaylists.toString()));
        }
    );
})