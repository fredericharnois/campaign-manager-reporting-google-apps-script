/**
*
* Export Google Campaign Manager Reports to Google Sheets
* 
* Pushes the latest file from a Google Campaign Manager report to Google Sheets
*
* Version: 1.0
*
* Google Apps Script maintained by Frederic Harnois
* fred@fredericharnois.com
*
**/

// MODIFY YOUR SETTINGS HERE //

// url of the google sheets where the report will be
var SPREADSHEET_URL = 'INSERT_URL'

// name of the sheet where the report will be
var TAB_NAME = 'INSERT_TAB_NAME'

// DCM profile ID
var PROFILE_ID = 'INSERT_PROFILE_ID'

// DCM report ID
var REPORT_ID = 'INSERT_REPORT_ID'

// DO NOT MODIFY ANYTHING BELOW //

function getDcmReport() {

  var ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  var sheet = ss.getSheetByName(TAB_NAME);

  sheet.clear();
  
  var reportFiles = DoubleClickCampaigns.Reports.Files.list(PROFILE_ID, REPORT_ID, {"maxResults": 1}).items
  var url = reportFiles[0].urls.apiUrl
  var options =  {
        'headers': {'Authorization': 'Bearer ' + ScriptApp.getOAuthToken()}
    }  
  var fetchRequest = UrlFetchApp.fetch(url, options)  
  var results = Utilities.parseCsv(fetchRequest)
  sheet.getRange(1,1, results.length, results[0].length).setValues(results);
  sheet.deleteRow(results.length)
}
