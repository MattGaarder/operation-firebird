<template>
  <div class="projects-wrapper">
    <q-card flat bordered class="project-card">
      <q-card-section class="project-header">
        <!-- <q-img src="/src/assets/logos/project_logos/Nocado_Logo_white.svg" alt="Nocado Logo" class="project-icon" contain/> -->
        <div class="project-info">
          <div class="project-title">Nocado</div>
          <div class="project-tagline">
            This project syncs ingredient data between a PDF (your Ocado grocery shopping receipt), MongoDB, and Notion. The backend uses Express with Mongoose models to store ingredients, exposes REST routes, and integrates with Notion via its API to create/update pages and reconcile missing entries. The frontend uploads a PDF, extracts and cleans ingredient names, posts them to the server, and triggers Notion synchronization. 
          </div>
        </div>
      </q-card-section>

              <q-separator />
        <q-card-section class="project-code">
          <q-scroll-area class="code-container">
            <pre v-prism><code class="language-js">
// addIngredients.js FILE

const Ingredient = require('../models/Ingredient');
const asyncWrapper = require('../middleware/async');
const { createPages } = require('../controllers/notionService')


const getAllIngredients = asyncWrapper(async (req, res, next) => {
    const ingredients = await Ingredient.find({});
    res.status(200).json({ ingredients });
});

const getMongoData = asyncWrapper(async () => {
    const ingredients = await Ingredient.find({});
    return ingredients;
});

const deleteIngredient = asyncWrapper(async (req, res, next) => {
    const {id: ingredientID} = req.params;
    const ingredient = await Ingredient.findOneAndDelete( {_id: ingredientID} );
    if(!ingredient){
        return res.status(404).json({msg: `No ingredient with id: ${ingredientID}`}); // beware this line
    }
    res.status(200).json({ ingredient });
});

const updateIngredient = asyncWrapper(async (req, res, next) => {
    const {id: ingredientID} = req.params;
    const ingredient = await Ingredient.findOneAndUpdate( {_id: ingredientID});
    if(!ingredient){
        return res.status(404).json({msg: `No ingredient with id: ${ingredientID}`}); // beware this line
    }
    res.status(200).json({ ingredient });
});

const addIngredients = asyncWrapper(async (req, res, next) => {
    const ingredients = req.body.ingredients;
    console.log(req.body);
    console.log("🚀 ~ file: ingredients.js:35 ~ addIngredients ~ ingredients:", ingredients)
    const ingredientObjects = ingredients.map(ingredient => ({
        name: ingredient.name,
        location: ingredient.location }));
    const insertedIngredients = await Ingredient.insertMany(ingredientObjects);
    const result = await createPages(insertedIngredients);
    res.status(200).json({ ingredients: insertedIngredients, ...result });
    // I want to call the Notion function here
});

const addNotionIDToMongoEntryVariable = async function addNotionIDToMongoEntry(notionDataArray) {
    // console.log(notionDataArray);
    const updatedIngredients = [];
    for (let el of notionDataArray) {
        let mongoID = el.properties.MONGO_ID.rich_text[0].plain_text;
        let notionID = el.id;
        // console.log("notionID when iterating through addNotionIDToMongoEntryVariable", notionID)
        // Update the document found by `_id` with the new `notionID`
        const ingredient = await Ingredient.findOneAndUpdate(
            { _id: mongoID }, // filter
            { notionID: notionID }, // update
            { new: true } // options: return updated doc
        );
        if (ingredient) {
            console.log("Updated ingredient", ingredient);
            updatedIngredients.push(ingredient);
        } else {
            console.log(`No ingredient found for Mongo ID: ${mongoID}`);
        }
    }
    return updatedIngredients;
}


module.exports = { 
  getAllIngredients,
   deleteIngredient,
    updateIngredient,
     addIngredients,
      addNotionIDToMongoEntryVariable,
       getMongoData }


// the submit button in the webpage will call addIngredients.
// in the front-end this will execute the following code:
// await axios.post('/api/v1/ingredients', { ingredients: selectedIngredients });
// await axios.get('/api/v1/notion');
// note that ingredients here is an object with property of ingredients and value of an array of selected ingredients
// these are added to mongo one by one and given an ID
// when this proccess is done my notion api is called to get from mongo db
// I am adding MONGO_ID as a property in the process
// that's what this is. 

// const getData = asyncWrapper(async(req, res) => {
//     const mongoData = await myMongooseModel.find({});
//     if (!mongoData) {
//         return res.status(404).json({ error: 'Data not found in MongoDB' });
//     }
//     const createdRows = [];
//     for(let data of mongoData){
//         console.log("logging data.name when iterating through data of mondoData in notionService", data);
//         const notionData = await notion.pages.create({
//             "parent": {
//                 "type": "database_id",  // Replace with your Notion database ID
//                 "database_id": process.env.NOTION_DATABASE_ID
//             },
//             "properties": {
//                 "Name": {
//                     "title": [
//                         {
//                             "type": "text",
//                             "text": {
//                                 "content": data.name,
//                             }
//                         }
//                     ]
//                 },
//                 "MONGO_ID": {
//                     "rich_text": [
//                         {
//                             "type": "text",
//                             "text": {
//                                 "content": data._id.toString(),
//                             }
//                         }
//                     ]
//                 },                 
//             }
//         });
//         createdRows.push(notionData)
//     }
//     res.status(200).json({ mongoData, createdRows });
// });
// In created rows I have all of the notion data including the notion id
// I want to iterate through createdRows calling updateIngredient on each
// or actually what makes much more sense is to create a third function that performs this function only
// function updateMongoEntryWithNotionID(){}
// this can take an array (createdRows) as a parameter 
// what this function will do is go through each element,
// it could maybe use the already existing mongoDB id in there to find the mongo entry
// and then update the entry with the notion ID

// notionService.js FILE

const { addNotionIDToMongoEntryVariable } = require('./ingredients')

const asyncWrapper = require('../middleware/async');
const axios = require('axios');

const myMongooseModel = require('../models/Ingredient'); 


const { Client } = require('@notionhq/client');

const notion = new Client({
    auth: process.env.NOTION_API_KEY
});

// console.log("API Token: ", process.env.NOTION_API_KEY);

const getDataBase = asyncWrapper(async(req, res) => {
    const notionDatabase = await notion.databases.retrieve({
        "database_id": process.env.NOTION_DATABASE_ID
    })
    // console.log(notionDatabase);
    res.status(200).json(notionDatabase);
});

// const getIds = asyncWrapper(async(req, res, next) => {
//     const databaseId = req.body.databaseId;
//     const authToken = req.body.authToken;
//     const response = await axios.post(`https://api.notion.com/v1/databases/${databaseId}/query`,{}, {
//         headers: {
//             "Authorization": `Bearer ${authToken}`,
//             "Notion-Version": "2022-06-28"
//           }
//     });
//     console.log(response.data);
//     res.status(200).json(response.data);
// });

const getIds = async (databaseId, authToken) => {
    const response = await axios.post(`https://api.notion.com/v1/databases/${databaseId}/query`,{}, {
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Notion-Version": "2022-06-28"
        }
    });
    return response.data;
};

// I also added an empty object {} as the second argument to axios.post(). 
// This serves as the request payload, which you don't seem to be using in this request.

// const getNotionData = asyncWrapper(async() => {
//     const mongoData = await myMongooseModel.find({});
//     if (!mongoData) {
//         throw new Error('data not found');
//     }
//     return mongoData;
// })




function getStorageOptionId(locationName, options) {
    if (locationName == null) {
        // Handle the case where locationName is null or undefined
        // For example, return the id of the default storage option
        locationName = "Missing";
    }
    const option = options.find(opt => opt.name === locationName);
    return option ? option.id : null;
}


  const createPages = asyncWrapper(async (dataToCreatePages) => {
    console.log("🚀 ~ file:heyho this data is being passed into createPages 
    notionService.js:74 ~ createPages ~ dataToCreatePages:", dataToCreatePages)
    const mongoData = await myMongooseModel.find({});
    // console.log("🚀 ~ file: notionService.js:67 ~ createPages ~ mongoData:", mongoData)

    if (!mongoData) {
        throw new Error('Data not found in MongoDB');
    }
    const storageOptions = [
        { id: "zJI|", name: "Missing" },
        { id: "_gzg", name: "Cupboard" },
        { id: ":^>^", name: "Frozen" },
        { id: "rKoC", name: "Fridge" },

    ];
    // console.log("this is mongoData logged in notionService on line 15: ", mongoData);
    const createdRows = [];
    for (let data of mongoData) {
        const storageOptionId = getStorageOptionId(data.location, storageOptions);
        // console.log("🚀 ~ file: notionService.js:80 ~ createPages ~ data.location:", data.location)
        // console.log("🚀 ~ file: notionService.js:80 ~ createPages ~ storageOptionId:", storageOptionId)

        // console.log("logging data.name when iterating through data of mondoData in notionService", data);
        const notionData = await notion.pages.create({
            "parent": {
                "type": "database_id",  // Replace with your Notion database ID
                "database_id": process.env.NOTION_DATABASE_ID
            },
            "properties": {
                "Item": {
                    "title": [
                        {
                            "type": "text",
                            "text": {
                                "content": data.name,
                            }
                        }
                    ]
                },
                "Storage": {
                    "multi_select": [
                        {
                            "id": storageOptionId
                        }
                    ]
                },
                "MONGO_ID": {
                    "rich_text": [
                        {
                            "type": "text",
                            "text": {
                                "content": data._id.toString(),
                            }
                        }
                    ]
                },
            }
        });
        createdRows.push(notionData)

    }
    console.log("skipittytoilet:: ", createdRows[0].properties.MONGO_ID.rich_text[0].plain_text);
    console.log("itsabwoodapp:: ", createdRows[0].id);
    // addNotionIDToMongoEntryVariable(createdRows);

    // Return the created rows and mongo data instead of sending a response
    return { mongoData, createdRows };
});




// const createPages = asyncWrapper(async(req, res) => {
//     // console.log(notion);
//     const mongoData = await myMongooseModel.find({});
//     console.log("🚀 ~ file: notionService.js:67 ~ createPages ~ mongoData:", mongoData)
    
//     if (!mongoData) {
//         return res.status(404).json({ error: 'Data not found in MongoDB' });
//     }
//     const storageOptions = [
//         { id: "zJI|", name: "Missing" },
//         { id: "_gzg", name: "Cupboard" },
//         { id: ":^>^", name: "Frozen" },
//         { id: "rKoC", name: "Fridge" }
//     ];
//     // console.log("this is mongoData logged in notionService on line 15: ", mongoData);
//     const createdRows = [];
//     for(let data of mongoData){
//         const storageOptionId = getStorageOptionId(data.location, storageOptions);
//         console.log("🚀 ~ file: notionService.js:80 ~ createPages ~ data.location:", data.location)
//         console.log("🚀 ~ file: notionService.js:80 ~ createPages ~ storageOptionId:", storageOptionId)
        
//         // console.log("logging data.name when iterating through data of mondoData in notionService", data);
//         const notionData = await notion.pages.create({
//             "parent": {
//                 "type": "database_id",  // Replace with your Notion database ID
//                 "database_id": process.env.NOTION_DATABASE_ID
//             },
//             "properties": {
//                 "Item": {
//                     "title": [
//                         {
//                             "type": "text",
//                             "text": {
//                                 "content": data.name,
//                             }
//                         }
//                     ]
//                 },
//                 "Storage": {
//                     "multi_select": [
//                         {
//                             "id": storageOptionId
//                         }
//                     ]
//                 },
//                 "MONGO_ID": {
//                     "rich_text": [
//                         {
//                             "type": "text",
//                             "text": {
//                                 "content": data._id.toString(),
//                             }
//                         }
//                     ]
//                 },                 
//             }
//         });
//         createdRows.push(notionData)
        
//     }
//     console.log("skipittytoilet:: ", createdRows[0].properties.MONGO_ID.rich_text[0].plain_text);
//     console.log("itsabwoodapp:: ", createdRows[0].id);
//     addNotionIDToMongoEntryVariable(createdRows);
//     res.status(200).json({ mongoData, createdRows });
// });

const updateData = asyncWrapper(async(req, res) => {
    const updateData = await notion.databases.create({});
    res.status(200).json({ updateData });

});

module.exports = { createPages, updateData, getDataBase, getIds }


// // yourController.js
// const mongoService = require('./mongoService');
// const notionService = require('./notionService');

// const addData = async (req, res) => {
//   try {
//     // Add data to MongoDB
//     const mongoData = await mongoService.addData(req.body.someData);

//     // Synchronize with Notion
//     await notionService.updateSomeData(mongoData);

//     res.status(200).json({ message: 'Data added to MongoDB and Notion' });
//   } catch (error) {
//     console.error('There was an error:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// module.exports = {
//   addData
// };

// Flow Summary
// The client clicks a submit button, triggering an Axios POST request to your server's /api/mongo/add endpoint.
// Your server receives the request in the addData function, adds the data to MongoDB, and then updates Notion.
// A success response is sent back to the client.
            </code></pre>
          </q-scroll-area>
        </q-card-section>

      <q-card-section class="project-body">
        <ul class="feature-list">
          <li>
            <strong>File upload:</strong> Multer + Express endpoint at <code>POST /uploads</code>, stores PDFs under <code>/uploads</code>
          </li>
          <li>
            <strong>PDF parsing:</strong> PDF.js reads & tokenizes each page into strings for downstream cleaning
          </li>
          <li>
            <strong>Ingredient lookup:</strong> PapaParse loads the FoundationFoods CSV → in-memory array; matches food names, handles plurals & adjectives
          </li>
          <li>
            <strong>Location tagging:</strong> regex tracks “Fridge”, “Cupboard”, “Freezer” sections as you scan PDF text
          </li>
          <li>
            <strong>Sync pipeline:</strong> client sync → <code>/api/v1/ingredients</code> writes to MongoDB; then <code>/api/v1/notion/sync</code> mirrors to Notion database pages
          </li>
          <li>
            <strong>Notion integration:</strong> @notionhq/client creates pages with multi_select storage, stores back Notion IDs in Mongo
          </li>
          <li>
            <strong>Learned:</strong> advanced stream parsing, two-way API orchestration, data deduplication and state reconciliation
          </li>
        </ul>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
// purely presentational
</script>

<style scoped>
.projects-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  /* if you want some padding inside your draggable window */
  padding: 1rem;
}

/* each card will try to be at least 300px wide,
   but grow to fill available space */
.project-card {
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-radius: 6px;
  overflow: hidden;
  background: white;
}

/* header: icon + info, wrapping when too narrow */
.project-header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  
  gap: 0.75rem;
  background: var(--q-color-grey-1);
  padding: 1rem;
}

.project-icon {
  flex: 0 0 174px;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.15);
}

.readme-icon {
  color: var(--q-color-blue-6);
}

.project-info {
  flex: 1 1 auto;
  min-width: 0; /* allow text to wrap */
}

.project-title {
  font-size: 1.7rem;
  font-weight: 600;
  margin-left: auto;
  margin-top: auto;
}

.project-tagline {
  margin-top: 0.25rem;
  font-size: 0.95rem;
  color: var(--q-color-grey-7);
  line-height: 1.4;
}

/* feature list section */
.project-body {
  padding: 0.75rem 1rem;
  background: var(--q-color-grey-2);
  flex-grow: 1;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

/* demo GIF */
.project-demo {
  padding: 0.75rem 1rem;
}

.project-gif {
  width: 100%;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.1);
}

/* on very narrow widths stack header contents centered */
@media (max-width: 360px) {
  .project-header {
    justify-content: center;
    text-align: center;
  }
}
</style>