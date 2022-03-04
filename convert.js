////////////////////////////////
let preconversionNums = document.querySelectorAll('.preconversion-num')
const errorEl = document.getElementById('error-msg')

function convert() {
  try {
    errorIsVisible(false)
    const userInputEl = document.getElementById('user-input')
    const inputValue = userInputEl.value

    const userInputIsValid = isUserInputValid(inputValue)
    const inputIsEmpty = isInputEmpty(inputValue)

    if (inputIsEmpty) {
      let numToConvert = 0
      modifyAllFields(numToConvert)
      return
    }

    if (!userInputIsValid) {
      errorIsVisible(true)
      return
    }

    numToConvert = parseFloat(inputValue)

    modifyAllFields(numToConvert)
    return
  } catch (err) {
    console.log(err)
  }
}

// helper functions further down (scrimba doesn't allow import/require)

// non-mathematical helper functions

function modifyAllFields(numToConvert) {
  updatePreconversions(numToConvert)
  convertMetersAndFeet(numToConvert)
  convertLitersAndGallons(numToConvert)
  convertKilosAndPounds(numToConvert)
}

function isInputEmpty(inputValue) {
  if (inputValue === '') return true
  return false
}

function errorIsVisible(visible) {
  if (visible === true) {
    errorEl.style.visibility = 'visible'
  }
  if (visible === false) {
    errorEl.style.visibility = 'hidden'
  }
}

function isUserInputValid(inputValue) {
  const numberOfDots = inputValue.replace(/[^.]/g, '').length
  // DDorC: Digits Dots or Commas
  const onlyDDorC = /^[0-9,.]*$/.test(inputValue)

  if (inputValue === '.') return false
  if (!onlyDDorC) return false
  if (inputValue.includes(',') || numberOfDots > 1) return false
  return true
}

function updatePreconversions(numToConvert) {
  preconversionNums.forEach((element) => {
    element.innerText = numToConvert
  })
}

function convertMetersAndFeet(numToConvert) {
  document.getElementById('meters-to-feet').innerText =
    metersToFeet(numToConvert)
  document.getElementById('feet-to-meters').innerText =
    feetToMeters(numToConvert)
}

function convertLitersAndGallons(numToConvert) {
  document.getElementById('liters-to-gallons').innerText =
    litersToGallons(numToConvert)
  document.getElementById('gallons-to-liters').innerText =
    gallonsToLiters(numToConvert)
}

function convertKilosAndPounds(numToConvert) {
  document.getElementById('kilos-to-pounds').innerText =
    kilosToPounds(numToConvert)
  document.getElementById('pounds-to-kilos').innerText =
    poundsToKilos(numToConvert)
}

// mathematical helper functions

function metersToFeet(numToConvert) {
  return roundToThree(numToConvert * (39.37 / 12))
}

function feetToMeters(numToConvert) {
  return roundToThree(numToConvert / (39.37 / 12))
}

function litersToGallons(numToConvert) {
  return roundToThree(numToConvert * (1.057 * 0.25))
}

function gallonsToLiters(numToConvert) {
  return roundToThree(numToConvert / (1.057 * 0.25))
}

function kilosToPounds(numToConvert) {
  return roundToThree(numToConvert * 2.205)
}

function poundsToKilos(numToConvert) {
  return roundToThree(numToConvert / 2.205)
}

function roundToThree(num) {
  return +(Math.round(num + 'e+3') + 'e-3')
}
