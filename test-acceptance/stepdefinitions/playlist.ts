const { Given, When, Then } = require('cucumber');
import { log } from 'console';
import { browser, $, element, ElementArrayFinder, by, protractor, ExpectedConditions, ElementFinder, By, Key } from 'protractor';
const { expect } = require('chai');
const {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(10000)

Given(/^I am logged in with "([^"]*)" and "([^"]*)"$/, async (email, password) => {
    await browser.get(`http://localhost:4200/login`);
    const user_input = element(by.css('.email_input'))
    const password_input = element(by.css('.password_input'))
    const login = element(by.css('.login_input_button'))
    await ExpectedConditions.visibilityOf(user_input)
    await user_input.click()
    await user_input.sendKeys(email)
    await password_input.click()
    await password_input.sendKeys(password)
    await login.click()
    
})

Given(/^I am at the "([^"]*)" page$/, async function (page) {
    const playlists = element(by.name('playlists'))
    await playlists.click()
    const addplaylist = element(by.css('.addPlaylist'))
    await ExpectedConditions.visibilityOf(addplaylist)
    await addplaylist.click()
  //await browser.get(`http://localhost:4200/${page}`);
});

When(/^I insert the playlist name "([^"]*)" with the music "([^"]*)"$/, async function (playlistName,musicName) {
  const inputPlaylistName = element(by.css('.playlist_input_name'));
  const searchMusic = element(by.css('.input_musica'));
  const music = element(by.css('.'+musicName))
  await browser.wait(ExpectedConditions.visibilityOf(inputPlaylistName));
  await inputPlaylistName.sendKeys(playlistName);
  await searchMusic.click();
  await searchMusic.sendKeys(musicName);
  await browser.wait(ExpectedConditions.visibilityOf(music))
  await music.click();
});

When('I create the playlist', async function () {
  const createButton = element(by.css('.submit'));
  await createButton.click();

});

Then(/^I can see a confirmation message "([^"]*)"$/, async function (message) {
    const alertIsPresent = protractor.ExpectedConditions.alertIsPresent();
    await browser.wait(alertIsPresent, 5000, "Alert was not found");
  
    const alert = await browser.switchTo().alert();
    const alertText = await alert.getText();
    expect(alertText).contain(message);
  });

Then(/^I am redirected to the "([^"]*)" page$/, async (page) => {
    const alert = await browser.switchTo().alert();
    await alert.accept();
    
})

Then(/^I can see the "([^"]*)" playlist$/, async (playlistName) => {
  const playlists =  element.all(by.css('.'+playlistName+'DIV'));
  await browser.wait(protractor.ExpectedConditions.presenceOf(playlists.first()), 5000); // espera 5 segundos para o elemento estar presente
  const count = await playlists.count();
  expect(count).equal(1);
})

When(/^I select the "([^"]*)" option$/, async (option) => {
  const publicar = element(by.css('.slider.round'))
  await publicar.click()
})

When(/^I insert the playlist name "([^"]*)"$/, async function (playlistName) {
  const inputPlaylistName = element(by.css('.playlist_input_name'));
  await browser.wait(ExpectedConditions.visibilityOf(inputPlaylistName));
  await inputPlaylistName.sendKeys(playlistName);
})

Then(/^I can see an error message "([^"]*)"$/, async function (message) {
  const alertIsPresent = protractor.ExpectedConditions.alertIsPresent();
  await browser.wait(alertIsPresent, 5000, "Alert was not found");

  const alert = await browser.switchTo().alert();
  const alertText = await alert.getText();
  expect(alertText).contain(message);
  await alert.accept()
});

Then(/^I still am at the "([^"]*)" page$/, async (page) => {
  const expectedUrl = `http://localhost:4200/${page}`;
  const currentUrl = await browser.getCurrentUrl();
  expect(currentUrl).to.equal(expectedUrl);
})

Given(/^I am on the "([^"]*)" page$/, async function (page) {
  const playlists = element(by.name('playlists'))
  await playlists.click()
//await browser.get(`http://localhost:4200/${page}`);
});

Given(/^I see a playlist registered as "([^"]*)"$/,async (playlistName) => {
  const playlists =  element.all(by.css('.'+playlistName+'DIV'));
  await browser.wait(protractor.ExpectedConditions.presenceOf(playlists.first()), 5000); // espera 5 segundos para o elemento estar presente
  const count = await playlists.count();
  expect(count).equal(1);
})

When(/^I go to the "([^"]*)" playlist page$/, async (playlistname) => {
  const playlist = element(by.name(playlistname))
  await playlist.click()
})

When('I go to the add music option', async function () {
  const button = element(by.css('.addmusicbutton'))
  browser.wait(ExpectedConditions.elementToBeClickable(button), 5000)
  await button.click()
})

When(/^I add the music "([^"]*)"$/,async (musicname) => {
  const search = element(by.css('.input_musica'))
  const music = element(by.css('.'+musicname))
  const add = element(by.css('.enterButton'))
  await search.click()
  await search.sendKeys(musicname)
  await browser.wait(ExpectedConditions.visibilityOf(music))
  await music.click()
  await browser.wait(ExpectedConditions.visibilityOf(add))
  await add.click()
})


Then(/^The "([^"]*)" playlist page is refreshed$/,async (playlistName) => {
  const expectedUrl = `http://localhost:4200/playlist/13`;
  const currentUrl = await browser.getCurrentUrl();
  expect(currentUrl).to.equal(expectedUrl);
})

Then(/^I can see the music "([^"]*)" in the playlist page$/, async (musicName) => {
  const music =  element.all(by.css('.'+musicName));
  const perfil = element(by.name('perfil'))
  const logout = element(by.name('sair'))
  await browser.wait(protractor.ExpectedConditions.presenceOf(music.first()), 5000); // espera 5 segundos para o elemento estar presente
  const count = await music.count();
  expect(count).equal(1);
  await perfil.click()
  await ExpectedConditions.presenceOf(logout)
  await logout.click()
})
