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

    Then(/^Then I see the "([^\"]*)" top songs of sfotipy$/,
        async (numberSongs) => {
            const songs = await element.all(by.name('smallBox'));
            const numberOfSongs = await songs.length;
            expect(numberOfSongs)
              .to.be.at.least(parseInt(numberSongs.toString()));
        }
    );
})