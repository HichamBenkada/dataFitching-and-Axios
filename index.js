import * as Carousel from "./Carousel.js";
// import axios from "axios"; //not needed localy

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY =
  "live_2wRV5sIlx8kxH7bTVDN4VWszq97WLMPJt8jMRVIY4fn8T8F6G1nAszeib65rC0eg";

// /** CODE TO Be copied and change to Axios
//  * 1. Create an async function "initialLoad" that does the following:
//  */
// async function initialLoad() {
//   try {
//     //- Retrieve a list of breeds from the cat API using fetch().
//     const myRequest = await fetch(
//       `https://api.thecatapi.com/v1/breeds?api_key=${API_KEY}`
//     );
//     if (!myRequest.ok) throw "Bad Status !!!";
//     const breeds = await myRequest.json();
//     // console.log(breeds);//checked

//     breeds.forEach((breed) => {
//       // - Create new <option> for each of these breeds, annd append them to breedSelect.
//       const option = document.createElement("option");
//       // - Each option should have a value attribute equal to the id of the breed.
//       option.setAttribute("value", breed.id);
//       // - Each option should display text equal to the name of the breed.
//       option.textContent = breed.name;
//       breedSelect.appendChild(option);
//     });
//   } catch (err) {
//     console.errer(err);
//   }
// }
// // This function should execute immediately.
// initialLoad();

// /**
//  * 2. Create an eventhandler for breedSelect to create
//  *
//     // * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
//  */
// breedSelect.addEventListener("change", async (e) => {
//   console.log(e.target.value);
//   let breedId = e.target.value;
//   try {
//     // - Retrieve information on the selected breed from the cat API
//     const response = await fetch(
//       `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breedId}&api_key=${API_KEY}`
//     );
//     if (!response.ok) throw "Failed to retrive breed information...";
//     const breedsInfo = await response.json();

//     // - Make sure your request is receiving multiple array items!
//     const breeds = breedsInfo;
//     //  *  - Check the API documentation if you're only getting a single object. N/A
//     console.log(breeds);
//     //  * - Each new selection should clear, re-populate, and restart the Carousel.
//     Carousel.clear(); //Clear all the Carousel elements

//     breeds.forEach((breed) => {
//       //  * - For each object in the response array, create a new element for the carousel.
//       const element = Carousel.createCarouselItem(breed.url, "Cat", breed.id);
//       //  *  - Append each of these new elements to the carousel.
//       Carousel.appendCarousel(element);
//     });
//     // * - Use the other data you have been given to create an informational section within the infoDump element.
//     const breedInfo = breeds[0].breeds[0];
//     infoDump.innerHTML = `<h1><em> About ${breedInfo.name}:<em></h1>
//       <p><br/>${breedInfo.description} ${
//       breedInfo.origin
//     } is their homeland. they ${
//       breedInfo.dog_friendly < 3 ? "are not" : "are"
//     } a dog friendly. their weight average is ${
//       breedInfo.weight["metric"]
//     }lbs, and their life span is within ${breedInfo.life_span} years. <br/>
//     If you would like to learn more <a href=${
//       breedInfo.wikipedia_url
//     } target="_blank">...Click here!</a>
//       </p>`;
//     Carousel.start(); //restart the Carousel
//   } catch (err) {
//     console.error(err);
//   }
// });

/**
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 * DONE
 */
/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage by setting a default header with your API key so that you do not have to send it manually with all of your requests! You can also set a default base URL!
 */
//part1:
axios.defaults.baseURL = "https://api.thecatapi.com/v1/";
axios.defaults.headers.common["x-api-key"] = API_KEY;
async function initialLoad() {
  infoDump.textContent = "Hello World! Nothing to show yet!? Select a Breed!";
  try {
    //- Retrieve a list of breeds from the cat API
    const { data, durationInMS } = await axios.get(`breeds`);
    console.log(`Cat breeds request took ${durationInMS} milliseconds.`);
    const breeds = data;
    console.log(breeds); //checked

    breeds.forEach((breed) => {
      // - Create new <option> for each of these breeds, annd append them to breedSelect.
      const option = document.createElement("option");
      // - Each option should have a breed id as value attribute
      option.setAttribute("value", breed.id);
      // - Each option should display breed name as text
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  } catch (err) {
    console.errer(err);
  }
}
// This function should execute immediately.
initialLoad();
//Part2:
breedSelect.addEventListener("change", async (e) => {
  // console.log(e.target.value);
  let breedId = e.target.value;
  try {
    // - Retrieve information on the selected breed from the cat API
    const { data, durationInMS } = await axios(
      `images/search?limit=10&breed_ids=${breedId}`
    );
    console.log(`BreedInfo request took ${durationInMS} milliseconds.`);
    // - Make sure your request is receiving multiple array items!
    console.log(data);
    const breedsInfo = data;

    //  * - Each new selection should clear, re-populate, and restart the Carousel.
    Carousel.clear(); //Clear all the Carousel elements

    breedsInfo.forEach((breed) => {
      //  * - For each object in the response array, create a new element for the carousel.
      const element = Carousel.createCarouselItem(breed.url, "Cat", breed.id);
      //  *  - Append each of these new elements to the carousel.
      Carousel.appendCarousel(element);
    });
    // * - Use the other data you have been given to create an informational section within the infoDump element.
    const breedInfo = breedsInfo[0].breeds[0];
    infoDump.innerHTML = `<h1><em> About ${breedInfo.name}:<em></h1>
      <p><br/>${breedInfo.description} this breed is originally from${
      breedInfo.origin
    }. they ${
      breedInfo.dog_friendly < 3 ? "are not" : "are"
    } a dog friendly. their weight average is ${
      breedInfo.weight["metric"]
    }lbs, and their life span is within ${breedInfo.life_span} years. <br/>
    If you would like to learn more <a href=${
      breedInfo.wikipedia_url
    } target="_blank">...Click here!</a>
      </p>`;
    Carousel.start(); //restart the Carousel
  } catch (err) {
    console.error(err);
  }
});
/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */
axios.interceptors.request.use((request) => {
  console.log("Request sent.");
  request.metadata = request.metadata || {};
  request.metadata.startTime = new Date().getTime();
  return request;
});
axios.interceptors.response.use(
  (response) => {
    console.log("Successful response!");
    response.config.metadata.endTime = new Date().getTime();
    response.durationInMS =
      response.config.metadata.endTime - response.config.metadata.startTime;
    return response;
  },
  (error) => {
    // Failure: anything outside of status 2XX
    console.log("Unsuccessful response...");
    throw error;
  }
);
/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */

/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */
/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */
export async function favourite(imgId) {
  // your code here
}

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */

/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */
