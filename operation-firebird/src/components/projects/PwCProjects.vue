<template>
  <div class="projects-wrapper">
    <div class="column-left">
    <q-card flat bordered class="project-card">
      <q-card-section class="project-header">
        <q-icon name="folder" size="64px" class="project-icon" />
        <div class="project-info">
          <div class="project-title">Project Generator (Google Form)</div>

        </div>
      </q-card-section>
      <div class="project-tagline">
        Automate your folder-structure creation with a Google Form-driven Apps Script.  
        Fill in course name, version, location & type → on submit the script parses your answers,  
        validates inputs, then copies a matching template tree into the correct Drive folder.
      </div>
      <q-separator />
        <q-card-section class="project-code">
          <q-scroll-area class="code-container">
          <pre v-prism><code class="language-js">
  function extractFormResponses(e) {
    let courseName, courseVersion, courseLocation, courseType;
    if(e.response){
      let formResponse = e.response;
      let itemResponses = formResponse.getItemResponses();
      // loop through item response and process accordingly
      itemResponses.forEach(itemResponse => {
        let question = itemResponse.getItem().getTitle();
        let response = itemResponse.getResponse();
        // assign responses to corresponding variables based on question title
        switch(question) {
          case 'Enter the name of your course':
            // Regular expression to find ' v' followed by one or more digits
            const versionRegex = / v(\d+)/;
            const match = response.match(versionRegex);
            // If a match is found, split the response and extract the version
            if (match) {
              courseName = response.split(versionRegex)[0];
              courseVersion = match[1]; // The first capture group, which is the version number
            } else {
              courseName = response; // Default to the whole response if no version is found
              courseVersion = ''; // Default to an empty string if no version is found
            }
            break;
          case 'Select course location':
            courseLocation = response;
            break;
          case 'Select course type':
            courseType = response;
            break;
        }
      })
    }
    Logger.log(courseName + '   ' + courseVersion + '  ' + courseLocation + '     ' + courseType);
    // return extracted data
    return { courseName, courseVersion, courseLocation, courseType };
  };
          </code></pre>
          
        </q-scroll-area>
        
      </q-card-section>
          <q-card-section class="project-code">
          <q-scroll-area class="code-container" >
          <pre v-prism><code class="language-js">
// main function triggered on form submission
const responsesSheet = SpreadsheetApp.openById('spreadsheetId');
const courseLinkColumnIndex = "H";
const courseRow = responsesSheet.getLastRow();
let courseLink;

function onFormSubmit(e) {
  // extract form responses and object destructure form answers into variables
  let { courseName, courseVersion, courseLocation, courseType } = extractFormResponses(e);

  // validate all responses are there
  if(!courseName || !courseLocation || !courseType) {
    Logger.log('Error - Missing form responses');
    return;
  }
  // determine what folder the project should be located in
  const targetFolderId = determineTargetFolderId(courseLocation);

  // determine what folder template should be used as the template for the project folder
  // also pass targetFolderId into function to determine whether course type from prod or dig repo 
  const sourceFolderId = determineSourceFolderId(courseType, courseLocation);

  if(!targetFolderId || !sourceFolderId) {
    Logger.log('Error - Invalid course location or type');
    return;
  }
  // pass all information for copy action 
  copyCourseFolderStructure(sourceFolderId, targetFolderId, courseName, courseVersion, courseType);
  responsesSheet.getRange(courseLinkColumnIndex + courseRow).setValue(courseLink);
};

// function that uses event object to get responses from form and assign to variables
function extractFormResponses(e) {
  let courseName, courseVersion, courseLocation, courseType;
  if(e.response){
    let formResponse = e.response;
    let itemResponses = formResponse.getItemResponses();

    // loop through item response and process accordingly
    itemResponses.forEach(itemResponse => {
      let question = itemResponse.getItem().getTitle();
      let response = itemResponse.getResponse();

      // assign responses to corresponding variables based on question title
      switch(question) {
        case 'Enter the name of your course':
          let courseNameArray = response.split(' v');
          courseName = courseNameArray[0];
          courseVersion = courseNameArray[1]; 
          break;
        case 'Select course location':
          courseLocation = response;
          break;
        case 'Select course type':
          courseType = response;
          break;
      }
    })
  }
  Logger.log(courseName + '   ' + courseVersion + '  ' + courseLocation + '     ' + courseType);

  // return extracted data
  return { courseName, courseVersion, courseLocation, courseType };
};

// function that copies course folder structure 
function copyCourseFolderStructure(sourceFolderId, targetFolderId, courseName, courseVersion, courseType) {

  // gets target folder
  let targetFolder = DriveApp.getFolderById(targetFolderId);
  // if there is a folder with the same name, assign to courseFolder
  let courseFolder = getExistingFolder(targetFolder, courseName);

  // if courseFolder is not truthy, create a new folder with courseName
  if(!courseFolder){
    courseFolder = targetFolder.createFolder(courseName);
  }
  // save the id of the folder to courseLink 
  courseLink = courseFolder.getId();

  let versionFolder = null;
  // make version folder name
  let versionFolderName = courseName + ' v' + courseVersion;
  if(getExistingFolder(courseFolder, versionFolderName)){
    console.log('there is a course with the same version number as this');
    courseLink = 'already exists';
    responsesSheet.getRange(courseLinkColumnIndex + courseRow).setValue(courseLink);
    return;
  };
  if(!versionFolder) {
    versionFolder = courseFolder.createFolder(versionFolderName);
    versionFolder.setDescription(courseType);
  }
  
  // get template folders
  const templateFolderStructure = DriveApp.getFolderById(sourceFolderId);
  const templateFolders = templateFolderStructure.getFolders();

  // iterate through each top-level folder in the template structure calling copyFolder for each one
  // what to copy? currentFolder, where? versionFolder
  while(templateFolders.hasNext()) {
    const currentFolder = templateFolders.next();
    copyFolder(currentFolder, versionFolder);
  }
};

function getExistingFolder(targetFolder, courseName){
  // loop thorugh and return the folder with the same name if it is found
  let folders = targetFolder.getFolders();
  while(folders.hasNext()){
    let folder = folders.next();
    if(folder.getName() === courseName) {
      return folder;
    }
  }
  return null;
}

// function that copies a folder structure from a source folder to a target folder
function copyFolder(sourceFolder, targetFolder) {
  let folderName = sourceFolder.getName();

  let newFolder = targetFolder.createFolder(folderName);
  let folders = sourceFolder.getFolders();
  // RECURSIVELY copy each subfolder into the new target folder
  while (folders.hasNext()) {
    let subFolder = folders.next();
    copyFolder(subFolder, newFolder);
  }
};

// function that determines the target folder ID based on the course location
function determineTargetFolderId(courseLocation) {
  const digitalAuditFolderId = 'dAuditId';
  const digitalUsFolderId = 'dUsFId';
  const productionFolderId = 'prodFId';
  Logger.log(courseLocation);

  // determine and return the corresponding folder ID based on the course location
  switch (courseLocation) {
    case 'Digital Repository Audit Curriculum': 
      return digitalAuditFolderId;
    case 'Digital Repository US Curriculum':
      return digitalUsFolderId;
    case 'Production Repository':
      return productionFolderId;
    default: 
      return null;
  }
};

function determineSourceFolderId(courseType, courseLocation) {
  const productionTemplates = 'prodTemp';
  const digitalTemplates = 'digTemp';
  let templates;
  if(courseLocation === 'Production Repository') {
    templates = DriveApp.getFolderById(productionTemplates).getFolders();  
  } else {
    templates = DriveApp.getFolderById(digitalTemplates).getFolders();
  }
  while (templates.hasNext()) {
    let templateType = templates.next();
    if (templateType.getName() === courseType) {
      return templateType.getId();
    }
  }
  console.log('no folder found with the course type: ' + courseType);
  return null
};
          </code></pre>
          
        </q-scroll-area>
      </q-card-section>

      <q-card-section class="project-body file-lister">
        <ul class="feature-list">
          <li>
            <strong>Trigger:</strong> Form submission fires an <code>onFormSubmit(e)</code> Apps Script bound to your spreadsheet.
          </li>
          <li>
            <strong>Response parsing:</strong> <code>extractFormResponses(e)</code> reads questions “Course Name”, “Location”, “Type”,
            uses RegEx to split “ v#” version suffix.
          </li>
          <li>
            <strong>Validation:</strong> Ensures name, location &amp; type are present and match allowed options before proceeding.
          </li>
          <li>
            <strong>Drive API:</strong> <code>determineTargetFolderId()</code> &amp; <code>determineSourceFolderId()</code> pick your destination & template folders.
          </li>
          <li>
            <strong>Template copy:</strong> <code>copyCourseFolderStructure()</code> creates (or finds) the base folder, then
            recursively clones every subfolder via <code>copyFolder()</code>.
          </li>
          <li>
            <strong>Versioning:</strong> Auto‐creates a “CourseName vX” folder, prevents duplicate versions, and logs “already exists”.
          </li>
          <li>
            <strong>Learned:</strong> Google Apps Script event objects, DriveApp folder operations, recursive folder cloning & user‐friendly form tooling.
          </li>
        </ul>
      </q-card-section>
    </q-card>
    </div>
    <div class="column-right">
    <q-card flat bordered class="project-card">
      <q-card-section class="project-header">
        <q-icon name="description" size="64px" class="project-icon" />
        <div class="project-info">
          <div class="project-title">File Lister</div>

        </div>
      </q-card-section>
                <div class="project-tagline">
            Apps Script project that incrementally crawls Google Drive — checkpointing progress to dodge execution limits — and exports a comprehensive file-path report into Sheets for use in Power BI for migration auditing (to SharePoint).
          </div>
          <q-separator />
      <q-card-section class="project-code">
        
        <q-scroll-area class="code-container">
          <pre v-prism><code class="language-js">
function listFilesInDrive() {
  try {
    var folderId = 'folderId';  // Root folder ID
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['File Name', 'File Path']); 
    }
    if (sheet.getRange(1, 3).getValue() === '') { 
      sheet.getRange(1, 3, 1, 4).setValues([['Folder Name', 'ID', 'Index', 'Processed']]);  
    }
    var folder = DriveApp.getFolderById(folderId);  // Get root folder
    Logger.log("Sheet found. Checking properties for progress...");
    // Get stored properties for progress tracking (snapshot and path)
    var properties = PropertiesService.getScriptProperties();
    // Load the snapshot of the folder structure
    var folderSnapshot = JSON.parse(properties.getProperty('folderSnapshot') || 'null'); 
    // Load the path where processing last left off
    var path = JSON.parse(properties.getProperty('path') || '[]');  
    if (!folderSnapshot) {
      Logger.log("No snapshot found. Taking a new snapshot of top-level folders.");
      folderSnapshot = takeTopLevelFolderSnapshot(folder, sheet);
      // Save the snapshot
      properties.setProperty('folderSnapshot', JSON.stringify(folderSnapshot));  
      Logger.log("Snapshot taken successfully.");
    }
    // Start processing folders from where we left off
    processFolders(folderSnapshot, path, sheet, folderId);  
  } catch (error) {
    Logger.log("An error occurred: " + error.message);
    resetProperties();  // Reset properties on error to avoid future issues
  }
}

function processFolders(snapshot, path, sheet, rootFolderId) {
  Logger.log("Starting folder processing...");
  // Summarize and log the snapshot
  Logger.log("Snapshot at start (summary): " + JSON.stringify(snapshot.map(f => ({
    name: f.name, 
    id: f.id, 
    processed: f.processed
  })), null, 2)); 
  // Log the current processing path
  Logger.log("Path at start: " + JSON.stringify(path));  
  var properties = PropertiesService.getScriptProperties();
  var startRow = 2;  // Side-table starts at row 2
  // Navigate through the snapshot using the path to find the correct folder to process
  var currentFolderLevel = getFolderDataAtPath(snapshot, path);
  // Check if currentFolderLevel is null (invalid path)
  if (currentFolderLevel === null) {
    Logger.log("Error: Invalid path or folder does not exist. Skipping.");
    return;  // Skip to avoid invalid paths, but do not continue
  }

  // If no subfolders exist, process files if available
  if (currentFolderLevel.length === 0) {
    Logger.log("No subfolders to process at the current level, processing files if any.");
    var folderData = getFolderDataAtPath(snapshot, path.slice(0, -1))[path[path.length - 1]];
    var folder = DriveApp.getFolderById(folderData.id);
    listFilesInFolderRecursive(folder, '', sheet, rootFolderId, folderData, path, snapshot);
    return;  // Return after processing the files to continue with the next folder
  }
  // Log a summarized version of currentFolderLevel for readability
  Logger.log("Current Folder Level after path navigation:");
  currentFolderLevel.forEach((folder, index) => {
    Logger.log("Index: " + index + ", 
    Name: " + folder.name + ", ID: " + folder.id + ", Processed: " + folder.processed);
  });
  // Process each folder in the current level
  for (var i = path.length === 0 ? 0 : path[path.length - 1]; i < currentFolderLevel.length; i++) {
    var folderData = currentFolderLevel[i];
    if (!folderData || folderData.processed === undefined) {
      Logger.log("Error: Folder data is missing or undefined at path index " + i);
      continue;  // Skip this folder if data is invalid
    }
    var folder = DriveApp.getFolderById(folderData.id);  // Get the folder by its ID
    Logger.log("Processing folder: " + folderData.name + " at path index: " + i);
    if (folderData.processed) {
      Logger.log("Skipping already processed folder - why doesn't this get logged #2: " + folderData.name);
      continue;
    }
    sheet.getRange('H2').setValue(folderData.name);
    Logger.log("Current folder being processed updated in sheet: " + folderData.name);
    var rowIndex = i + 2; // Assuming side-table starts at row 2
    sheet.getRange(rowIndex, 3, 1, 4).setValues([[folderData.name, folderData.id, i, 'false']]);
    listFilesInFolderRecursive(folder, '', sheet, rootFolderId, folderData, path.concat(i), snapshot);
    Logger.log("Folder processing status before marking as processed: " + JSON.stringify(folderData, null, 2));
    folderData.processed = true;
    Logger.log("Folder marked as processed: " + folderData.name + " | Path: " + JSON.stringify(path.concat(i)));

    sheet.getRange(rowIndex, 6).setValue('true'); // Update "Processed" column to true

    properties.setProperty('folderSnapshot', JSON.stringify(snapshot));  // Save updated snapshot
    properties.setProperty('path', JSON.stringify(path.concat(i)));  // Save the updated path for resumption
    Logger.log("Progress saved: Folder index " + i + " | Path: " + JSON.stringify(path.concat(i)));
  }
  Logger.log("Returning to parent folder after processing subfolder at path: " + JSON.stringify(path));
  properties.deleteProperty('path');
  Logger.log("All folders processed, path property cleared.");
}


// Recursive function to process files and subfolders
function listFilesInFolderRecursive(folder, parentFolderPath, sheet, rootFolderId, folderData, path, snapshot) {
  Logger.log("Folder processing status before marking as processed: " + JSON.stringify(folderData, null, 2));
  if (!folder) {
    Logger.log("Folder is undefined or null. Skipping.");
    return;  // Skip invalid folders
  }
  var properties = PropertiesService.getScriptProperties();
  var currentFolderPath = parentFolderPath + '/' + folder.getName();  // Build the full path of the current folder
  Logger.log("Processing folder: " + folder.getName() + " | Full Path: " + currentFolderPath);
  // Get all files in the current folder
  var files = folder.getFiles();
  var processedFileCount = folderData.lastProcessedFileIndex || 0; // Resume from the last processed file index
  // Process each file in the folder
  while (files.hasNext()) {
    var file = files.next();
    Logger.log("Processing file: " + fileName + " | Path: " + fullFilePath + " | File URL: " + fileUrl);
    // Skip files that have already been processed
    if (processedFileCount < folderData.lastProcessedFileIndex) {
      processedFileCount++;  // Increment the counter for skipped files
      Logger.log(`Skipping already processed file: ${fileName} (Index: ${processedFileCount})`);
      continue;
    }
    // Process the file and add it to the sheet
    var fileName = file.getName();
    var fileUrl = file.getUrl();
    var fullFilePath = getFullFilePath(file, rootFolderId);  // Get the full file path
    var fileLink = '=HYPERLINK("' + fileUrl + '", "' + fileName + '")';  // Create a clickable hyperlink
    sheet.appendRow([fileLink, fullFilePath]);  // Add the file to the Google Sheet
    // Update the processed file count and save progress every 5 files
    processedFileCount++;
    folderData.lastProcessedFileIndex = processedFileCount;  // Update the last processed file index
    Logger.log(`Processed file: ${fileName} | Path: ${fullFilePath} | URL: ${fileUrl} | Index: ${processedFileCount}`);
    if (processedFileCount % 5 === 0) {
      storeProgress(snapshot, path, folderData);  // Save the snapshot progress and folder state
      properties.setProperty('folderSnapshot', JSON.stringify(snapshot));  // Persist the snapshot
      properties.setProperty('path', JSON.stringify(path));  // Persist the current path
      Logger.log("Progress saved at file index: " + processedFileCount + " | Path: " + JSON.stringify(path));
      Logger.log("Snapshot after marking folder as processed: " + JSON.stringify(snapshot, null, 2));

    }
  }

  // Process subfolders recursively
  var subfolders = folder.getFolders();
  // Resume from the last processed subfolder index
  var subfolderIndex = folderData.lastProcessedSubfolderIndex || 0;  
  var foundSubfolder = false;
  // If there are subfolders, process them
  while (subfolders.hasNext()) {
    var subfolder = subfolders.next();
    Logger.log("Processing subfolder: " + subfolder.getName() + " | Subfolder ID: " + subfolder.getId());
    foundSubfolder = true;
    // Retrieve or create subfolder data
    var subfolderData = getOrCreateSubfolderData(subfolder.getId(), folderData);  
  if (subfolderData && subfolderData.processed !== undefined) {
    Logger.log("Processing subfolder: " + subfolder.getName() + " 
    | Subfolder ID: " + subfolder.getId() + " | Processed: " + subfolderData.processed);
    Logger.log("Snapshot after marking folder as processed noooooot: " + JSON.stringify(snapshot, null, 2));
  } else {
    Logger.log("Error: Subfolder data is missing or undefined for: " + subfolder.getName());
    continue;  // Skip processing this subfolder if the data is invalid
  }
    if (subfolderIndex < folderData.lastProcessedSubfolderIndex) {
      subfolderIndex++;  // Skip already processed subfolders
      Logger.log("Skipping already processed subfolder - why doesn't this log?: " + subfolder.getName());
      continue;
    }
    Logger.log("Processing subfolder: " + subfolder.getName() + " at index: " + subfolderIndex);
    // Recurse into subfolders
    listFilesInFolderRecursive(subfolder, currentFolderPath, sheet, rootFolderId, subfolderData, path.concat(subfolderIndex), snapshot);
    
    subfolderIndex++;
    folderData.lastProcessedSubfolderIndex = subfolderIndex;  // Update subfolder index
    // Save progress every 2 subfolders
    if (subfolderIndex % 2 === 0) {
      Logger.log("Storing progress for subfolder: " + folderData.name + " at path: " + JSON.stringify(path));
      storeProgress(snapshot, path, folderData);
      Logger.log("Progress successfully stored for subfolder: " + folderData.name);
      properties.setProperty('folderSnapshot', JSON.stringify(snapshot));  // Persist the snapshot
      properties.setProperty('path', JSON.stringify(path.concat(subfolderIndex)));  // Persist the current path
      Logger.log("Snapshot after marking folder as processed: " + JSON.stringify(snapshot, null, 2));
      Logger.log("Progress saved at subfolder index: " + subfolderIndex + " | Path: " + JSON.stringify(path.concat(subfolderIndex)));
    }
  }

  // If no subfolders were found, mark the folder as processed and backtrack
  if (!foundSubfolder) {
    Logger.log("No subfolders in folder: " + folder.getName() + ". Marking as processed and backtracking.");
    folderData.processed = true; // Mark folder as fully processed
    folderData.lastProcessedFileIndex = 0;
    folderData.lastProcessedSubfolderIndex = 0;
    Logger.log("Storing progress for subfolder: " + folderData.name + " at path: " + JSON.stringify(path));
    storeProgress(snapshot, path, folderData);
    Logger.log("Progress successfully stored for subfolder: " + folderData.name);
    properties.setProperty('folderSnapshot', JSON.stringify(snapshot));  // Persist the snapshot
    Logger.log("Snapshot after marking folder as processed: " + JSON.stringify(snapshot, null, 2));
    Logger.log("Folder fully processed: " + folderData.name + ". Returning to parent.");
  }
}

// Function to store progress in the snapshot
function storeProgress(snapshot, path, folderData) {
  Logger.log("Storing progress for folder: " + folderData.name + 
  " | Folder processed: " + folderData.processed + " | Path: " + JSON.stringify(path));
  let currentLevel = snapshot;
  // Traverse the snapshot using the path to find the current folder's data
  for (let i = 0; i < path.length - 1; i++) {
    currentLevel = currentLevel[path[i]].subfolders || [];  // Navigate through subfolders
Logger.log("Navigating snapshot level: " + i + 
" | Current folder level: " + currentLevel.map(f => f.name).join(", "));
  }
  currentLevel[path[path.length - 1]] = folderData;  // Save the updated folder data
  Logger.log("Progress stored successfully for folder: " + folderData.name);
}

function getFolderDataAtPath(folderSnapshot, path) {
  Logger.log("Retrieving folder data at path: " + JSON.stringify(path));
  let currentLevel = folderSnapshot;
  // Traverse through the snapshot using the path
  for (let i = 0; i < path.length; i++) {
    if (!currentLevel[path[i]]) {
Logger.log("Skipping: Folder at index " + path[i] + " does not exist.");
      continue;  // Skip invalid folders
    }
    // Move to next subfolder level
    currentLevel = currentLevel[path[i]].subfolders || [];  
    // Log subfolder names at this level
    Logger.log("Navigating to path index: " + path[i] + 
    " | Current level folder names: " + 
      currentLevel.map(f => f.name).join(", "));  
  }
  return currentLevel;  // Return the valid folder or subfolder data
}

// Function to get the full file path by walking back from the file to the root folder
function getFullFilePath(file, rootFolderId) {
  var folderPath = [];
  var currentFolder = file.getParents().next();
  while (currentFolder && currentFolder.getId() !== rootFolderId) {
    folderPath.unshift(currentFolder.getName());  // Add folder names to the path
    var parentFolders = currentFolder.getParents();
    currentFolder = parentFolders.hasNext() ? parentFolders.next() : null;
  }
  return 'Drive / ' + folderPath.join(' / ');  // Return full file path
}
// Function to reset properties in case of an error
function resetProperties() {
  Logger.log("Resetting properties to avoid future errors.");
  var properties = PropertiesService.getScriptProperties();
  properties.deleteProperty('folderSnapshot');
  properties.deleteProperty('path');
  properties.deleteProperty('lastProcessedFileIndex');
  properties.deleteProperty('lastProcessedSubfolderIndex');
}

function takeTopLevelFolderSnapshot(folder, sheet) {
  Logger.log("Taking quick snapshot of top-level folders...");
  var snapshot = [];
  var subFolders = folder.getFolders();
  var index = 0;
  var startRow = 2;
  while (subFolders.hasNext()) {
    var subFolder = subFolders.next();
    var folderData = {
      id: subFolder.getId(),
      name: subFolder.getName(),
      index: index++,
      processed: false,
      lastProcessedFileIndex: 0,
      lastProcessedSubfolderIndex: 0
    };
    // Add the folder to the snapshot
    snapshot.push(folderData);
    // Write to the side-table in the sheet (if needed)
    sheet.getRange(startRow, 3, 1, 4)
    .setValues([[subFolder.getName(), subFolder.getId(), index - 1, 'false']]);
    startRow++;
  }
  Logger.log("Top-level snapshot complete. Total folders: " + snapshot.length);
  return snapshot;
}

// Helper function to get or create subfolder data
function getOrCreateSubfolderData(subfolderId, parentFolderData) {
  Logger.log("Checking for existing subfolder data: " + subfolderId);
  // Check if the subfolder already exists in the parent folder's subfolders array
  var subfolderData = parentFolderData.subfolders?.find(sf => sf.id === subfolderId);
  if (!subfolderData) {
    // Create the subfolder data if it doesn't already exist
    subfolderData = {
      id: subfolderId,
      name: DriveApp.getFolderById(subfolderId).getName(),
      lastProcessedFileIndex: 0,
      lastProcessedSubfolderIndex: 0,
      processed: false,
      subfolders: []
    };
    // Add the subfolder data to the parent folder's subfolders array
    parentFolderData.subfolders = parentFolderData.subfolders || [];
    parentFolderData.subfolders.push(subfolderData);
    Logger.log("Created new subfolder data for: " + subfolderData.name);
  } else {
    Logger.log("Found existing subfolder data for: " + subfolderData.name);
  }
  return subfolderData;
}
          </code></pre>
        </q-scroll-area>
      </q-card-section>
      <q-card-section class="project-body">
        <ul class="feature-list">
          <li>
            <strong>Incremental crawl:</strong> Uses a top-level snapshot + path array in `PropertiesService` to resume folder traversal after time-out.
          </li>
          <li>
            <strong>Progress table:</strong> Logs folder name, ID, index &amp; processed flag in a side-table so you can pick up where you left off.
          </li>
          <li>
            <strong>File export:</strong> Appends clickable `HYPERLINK` rows ([File Name, Full Path]) for every Drive file.
          </li>
          <li>
            <strong>Timeout workaround:</strong> Batches work into slices, checkpointing every N files/folders to survive Apps Script’s 6-minute limit.
          </li>
          <li>
            <strong>Migration QA:</strong> Feeds the output into Power BI to compare Google Drive vs SharePoint sets and catch missing or mismatched items.
          </li>
          <li>
            <strong>Learned:</strong> Advanced GAS recursion, state persistence with `PropertiesService`, efficient sheet I/O and BI-driven validation.
          </li>
        </ul>
      </q-card-section>
    </q-card>
    <q-card flat bordered class="project-card">
        <q-card-section class="project-header">
          <q-icon name="settings" size="64px" class="project-icon" />
          <div class="project-info">
            <div class="project-title">Components Toolbar</div>

          </div>
        </q-card-section>
        <div class="project-tagline">
          Adds a 'Components' menu to Google Docs for one-click insertion of Face-to-Face, Digital, Video & Assessment templates—
          streamlining document assembly with reusable content blocks.
        </div>
        <q-separator />
        <q-card-section class="project-code">
          <q-scroll-area class="code-container">
            <pre v-prism><code class="language-js">
function onOpen(e) {
  const ui = DocumentApp.getUi();
  ui.createMenu('Components')
    .addItem('Face to face', 'insertF2f')
    .addItem('Digital', 'insertDig')
    .addItem('Video', 'insertVid')
    .addItem('Assessment', 'insertAss')
    .addToUi();
};

function insertTemplateElements(templateDocId) {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();
  const templateDoc = DocumentApp.openById(templateDocId);
  const templateBody = templateDoc.getBody();
  var cursor = doc.getCursor();
  var index = 0;
  if (cursor) {
    var element = cursor.getElement();
    while (element.getParent().getType() != DocumentApp.ElementType.BODY_SECTION) {
      element = element.getParent();
    }
    index = body.getChildIndex(element);
  } else {
    DocumentApp.getUi().alert("Could not find current position. Ensure you have selected where you want to paste the template.");
    return;
  }
  for (var i = templateBody.getNumChildren() - 1; i >= 0; i--) {
    var child = templateBody.getChild(i).copy();
    switch (child.getType()) {
      case DocumentApp.ElementType.PARAGRAPH:
        body.insertParagraph(index, child);
        break;
      case DocumentApp.ElementType.LIST_ITEM:
        body.insertListItem(index, child);
        break;
      case DocumentApp.ElementType.TABLE:
        body.insertTable(index, child);
        break;
      case DocumentApp.ElementType.INLINE_IMAGE:
        body.insertImage(index, child);
        break;
    }
  }
}

function insertF2f() {
  insertTemplateElements('docId');
}

function insertDig() {
  insertTemplateElements('docId');
}

function insertVid() {
  insertTemplateElements('docId');
}

function insertAss() {
  insertTemplateElements('docId');
}
            </code></pre>
          </q-scroll-area>
        </q-card-section>
        <q-card-section class="project-body">
          <ul class="feature-list">
            <li><strong>Menu Integration:</strong> Creates a 'Components' toolbar with four template actions.</li>
            <li><strong>Template Insertion:</strong> Fetches docs by ID and inserts paragraphs, lists, tables & images at the cursor.</li>
            <li><strong>Cursor & Index Handling:</strong> Locates insertion point or alerts if none selected.</li>
            <li><strong>Learned:</strong> DocumentApp UI menus, body child iteration, element copying, and cursor management.</li>
          </ul>
        </q-card-section>
      </q-card>
  </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.column-left,
.column-right {
  display: flex;
  flex-direction: column;
}
.column-left {
  flex: 2 1 200px;
}
.column-right {
  flex: 1 1 400px;
}
.projects-wrapper {
  display: flex;
  flex-wrap: wrap;
}

.project-card {
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-radius: 6px;
  /* overflow: hidden; */
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
  flex: 0 0 74px;
  height: auto;
  border-radius: 4px;

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

  padding: 1.5rem;
  padding-top: 0;
  font-size: 0.95rem;
  line-height: 1.4;
}

.q-card__section--vert {
  padding: 8px;
}

/* feature list section */
.project-body {
  margin-top: -0.7rem;
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