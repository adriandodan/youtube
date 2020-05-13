# Youtube - MostWanted

AWS:http://node-express-env.eba-txk2b426.us-east-1.elasticbeanstalk.com/
HEROKU: https://still-bayou-31018.herokuapp.com/

### Introducere

Youtube MostWanted este o aplicație web care permite utilizatorului să vadă care sunt primele 5 videoclipuri în tranding pe youtube din fiecare țară și informații despre acestea.

### Descriere problemă

Cu siguranță, fiecare dintre noi ajungem la un moment dat să ne plictisim de muzica pe care o ascultăm pe youtube în fiecare zi sau de videoclipurile pe care le vizionăm. De aceea, vrem sa cautăm videoclipuri noi. Astfel, Youtube ne oferă posibilitatea de a vedea care sunt cele mai vizionate videoclipuri prin așa numitul Tranding. Aici putem să vedem la ce se uită majoritatea persoanelor în ultima vreme. 
	
Acest lucru este realizat la nivel de țară, adică daca noi suntem în România și avem contul de Youtube înregistrat pe această țară, vom vedea videoclipurile cele mai vizionate de către romani. Atunci când nu ești mulțumit de ceea ce ascultă compatrioții tăi, te întrebi care este situația în alte țări și cum poți vedea acest lucru.
	
Aici vine în sprijin aplicația web pe care am dezvoltat-o, care îți oferă posibilitatea de a vedea videoclipurile care sunt în Tranding în orice țară din această lume.

### Descriere API
În dezvoltarea acestei aplicații, am utilizat două API.

- Youtube Data API 
>Ne permite să încorporăm pe propriul site, funții executate în mod normal pe site-ul youtube. Cu ajutul acestui API, am preluat videoclipurile din Tranding din fiecare țară și informații despre acestea, precum id video, denumire videoclip, descriere, canal, numar vizualizări, număr like-uri, număr dislike-uri, număr comentarii. 

- Countries API 
>Acest API returnează o listă cu toate țările de pe glob și informații despre fiecare țară în parte, precum steagul, capitala, moneda, regiunea, subregiunea, limbile vorbite.

### Flux de date

##### Exemple request/response

  ###### Request
  ```js
    gapi.client.youtube.videos
        .list({
            part: "snippet,contentDetails,statistics",
            chart: "mostPopular",
            regionCode: countryCode,
        })
```
  ###### Response
  
  ![ResponseYoutube](https://github.com/adriandodan/youtube/blob/master/images/Screenshot%202020-05-13%20at%2007.23.48.png)
  
  ###### Request
```
  fetch("https://restcountries.eu/rest/v2/all")
    .then((res) => res.json())
```
  ###### Response
  ![ResponseCountries](https://github.com/adriandodan/youtube/blob/master/images/Screenshot%202020-05-13%20at%2007.25.38.png)
  
##### Autentificare și autorizare

###### Autentificare
![Autentificare](https://github.com/adriandodan/youtube/blob/master/images/Screenshot%202020-05-13%20at%2007.28.01.png)

###### Autorizare
![Autorizare1](https://github.com/adriandodan/youtube/blob/master/images/Screenshot%202020-05-13%20at%2007.28.39.png)



