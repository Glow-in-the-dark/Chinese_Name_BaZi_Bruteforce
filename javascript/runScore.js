const puppeteer = require("puppeteer");
const randomName = require("chinese-random-name");
// const rand2name = randomName.names.get2("木水");
const rand2name = randomName.names.get2();
const familySurname = "刘";
const number_of_generation_time = 100;

async function nameScoreGenerator(surname, randomName) {
  const browser = await puppeteer.launch({ headless: "new" }); // puppeteer.launch({ headless: false }); To see the screenpop up
  const page = await browser.newPage();

  const url = "https://www.zhanbuwang.com/xingmingceshi_2.php?";
  const urlWithName =
    url +
    "pf_xing=" +
    encodeURIComponent(surname) +
    "&pf_ming=" +
    encodeURIComponent(randomName);

  await page.goto(urlWithName);

  const data = await page.evaluate(function () {
    const pingfenLeftElement = document.querySelector(".pingfen_left"); // querySelectorAll() gets all elements under it
    const divElements = pingfenLeftElement.querySelectorAll("li > div");
    const names = Array.from(divElements, (element) => element.innerText).join(
      ""
    );

    const tds = [...document.querySelectorAll(".c_1_from table tr")];
    const thirdRowElement = tds[2].children[3].textContent.trim();
    const fourthRowElement = tds[3].children[3].textContent.trim();
    const combineElement = thirdRowElement + fourthRowElement;

    //querySelector() only return the first element
    const score = document.querySelector(".pingfen_right_ass").innerText; // use a '.'pingfen_right_ass because it's a class

    const nameScore = {
      name: names,
      element: combineElement,
      score: score,
    };

    return nameScore;
  });

  await browser.close();
  return data;
}

(async () => {
  above90Array = [];
  nameScoreArray = [];

  for (let i = 0; i < number_of_generation_time; i++) {
    const rand2name = randomName.names.get2();
    const result = await nameScoreGenerator(familySurname, rand2name);
    if (result.score > 90) {
      above90Array.push(result);
    } else {
      nameScoreArray.push(result);
    }
    console.log("scanning number: " + i);
  }

  above90Array.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
  //console.log(above90Array); // console.log only prints max of 100
  console.dir(above90Array, { maxArrayLength: null });
  console.log(above90Array.length);

  nameScoreArray.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
  //console.log(nameScoreArray);
  console.dir(nameScoreArray, { maxArrayLength: null });
  console.log(nameScoreArray.length);
})();
