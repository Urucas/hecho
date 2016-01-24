import webdriver from 'selenium-webdriver'
import path from 'path'
import chrome from 'selenium-webdriver/chrome'
import express from 'express'
import flag from 'emoji-flag'
import color from 'colors'

var locale = require(path.join(__dirname,'..','locale','locale.json'))

describe("Test hecho is showing on the browser", () => {
  
  let app = express()
  app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname,'..','browser','index.html'))
  })
  app.listen(5000)
  
  let By = webdriver.By, until = webdriver.until
  let driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build()

  let err = (actual, expected) => {
    throw new Error("Assert error\n+++actual "+actual+"\n---expected ".green+expected.green)
  }

  it("Test hecho is showing on the browser", (done) => {
    driver
      .get("http://localhost:5000")
    driver
      .findElements(By.tagName("hecho"))
      .then( (els) => {
        done()
      })
  })

  it("Test hecho is creating the div child", (done) => {
    driver
      .get("http://localhost:5000")
    driver
      .findElements(By.tagName("hecho"))
      .then( (els) => {
        let len = els.length
        for(let i=0;i<len;i++) {
          let el = els[i]
          el
            .findElement(By.tagName("div"))
            .then( (div) => {
              if(i==2) done()
            })
        }
      })
  })

  it("Test hecho is adding the correct class to div child", (done) => {
    driver
      .get("http://localhost:5000")
    driver
      .findElements(By.tagName("hecho"))
      .then( (els) => {
        let len = els.length
        for(let i=0;i<len;i++) {
          let el = els[i], classCountry, classIndex = `hecho-${i}`
          el
            .getAttribute("country")
            .then( (country) => {
              classCountry = `hecho-${country}`
            })
          el
            .findElement(By.tagName("div"))
            .then( (div) => {
              div
                .getAttribute("class")
                .then( (classes) => {
                  if(classes.indexOf(classIndex) == -1)
                    return err(classes, classIndex)

                  if(classes.indexOf(classCountry) ==  -1)
                    return err(classes, classCountry)

                  if(i== 2) done()
                })
            })
        }
      })
  })
  
  it("Test hecho is showing the correct text", (done) => {
    driver
      .get("http://localhost:5000")
    driver
      .findElements(By.tagName("hecho"))
      .then( (els) => {
        let len = els.length
        for(let i=0;i<len;i++) {
          let el = els[i]
          let loc, length, country
          el
            .getAttribute("locale")
            .then( (attr) => {
              loc = attr
            })
          el
            .getAttribute("length")
            .then( (attr) => {
              length = attr || "long"
            })
          el
            .getAttribute("country")
            .then( (c) => {
              country = c
            })
          el
            .getText()
            .then( (text) => {
              let finalText = locale[loc][length].replace("${flag}", flag(country))
              if(text != finalText)
                return err(text, finalText)

              if(i==2) done()
            })
        }
      })
  })

  after( () => {
    return driver.quit()
  })

})

