const API2 = 'http://api.openweathermap.org/data/2.5/weather?q='
let city = 'tokyo'
const apiKey = '&appid=590d3c9ca81c5944f27c0c6b40441687'
const app = document.querySelector('#weather')
const messagesError = document.querySelector('#err')
const form = document.querySelector('#buttonSearch')
const search = document.querySelector('#search')
const buttonClear = document.querySelector('#clearButton')
const weathers = []
const errA = []

let kelvinToCelsius = (kelvinValue) => {
  return Math.floor(kelvinValue -= 273.15)
}
kelvinToCelsius(315.10)

const searchInput = (event) => {
  if (Event.data === "enter"){
    searchClickAction()
  }
}

const searchAction = (Event) => {
  event.preventDefault();
  city = search.value.charAt(0).toUpperCase() + search.value.slice(1);
  switch (true) {
    case weathers.length === 0:
      clearErrors()
      anotherFunction(API2)
      console.log('1')
      break;
    case weathers.length === 1 && city !== weathers[0].childNodes[0].firstChild.data:
      anotherFunction(API2)
      console.log('2')
      break
      case weathers.length === 2 &&  city !== weathers[0].childNodes[0].firstChild.data && city !== weathers[1].childNodes[0].firstChild.data:
      anotherFunction(API2)
      console.log('3')
      break
      case weathers.length === 3 && city !== weathers[0].childNodes[0].firstChild.data && city !== weathers[1].childNodes[0].firstChild.data && city !== weathers[2].childNodes[0].firstChild.data:
      anotherFunction(API2)
      console.log('4')
      break
    default: alert('ya buscaste esta ciudad')
      break;
  }
}

const anotherFunction = async (url_api) => {
  try {
    const response = await fetch(`${url_api}${city}${apiKey}`);
    const dataJason = await response.json();
    
    const container = document.createElement('div');
    container.className = 'weatherCondition'
    
    const title = document.createElement('h3')
    title.textContent = dataJason.name;

    const country = document.createElement('sup')
    country.textContent = dataJason.sys.country
    title.append(country)
    
    const image = document.createElement('img')
    image.src=`http://openweathermap.org/img/w/${dataJason.weather[0].icon}.png`
    
    const celcius = document.createElement('sup')
    celcius.textContent = '°C'
    
    const tempC = document.createElement('p')
    tempC.textContent = `${kelvinToCelsius(dataJason.main.temp)}`
    tempC.className = 'celcius'
    tempC.append(celcius)
    
    const description = document.createElement('p')
    description.textContent = dataJason.weather[0].description
    description.className = 'description'
    container.append(title, tempC, image, description)
    weathers.push(container)
    app.append(...weathers)
  } catch (err) {
    console.error(err);
    oops()
  }
}

const clear = () => {
  let deletNode = [...app.childNodes]
  deletNode.forEach(Node => {
    Node.remove()
  });
  weathers.splice(0, weathers['length'])
  clearErrors()
}
const clearErrors = () => {
  let deletNodeErr = [...messagesError.childNodes]
  deletNodeErr.forEach(node => {
    node.remove()
  })
}

const oops = () => {
  clear();
  const containerOfError = document.createElement('div');
  containerOfError.className = 'error'
  
  const titleOfError = document.createElement('p')
  titleOfError.textContent = 'lo siento introduce un titulo valido'
  
  containerOfError.append(titleOfError)
  errA.push(containerOfError)
  messagesError.append(...errA)
}


search.addEventListener('input',  searchInput);
form.addEventListener('click',  searchAction);
buttonClear.addEventListener('click', clear)