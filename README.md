# Google Sheets Automation

This repository contains Google Apps Script(s) that help automate various tasks related to Google Sheets.

## Setup and Prerequisites

Before running these scripts, ensure you have enabled the Google Sheets API for your Apps Script project. Here are the steps to enable it:

1. Open the Apps Script project.
2. On the left, click on 'Editor code'.
3. Next to 'Services', click on 'Add a service'.
4. From the list, select 'Sheets API' and click on 'Add'.

## Scripts

This repository provides three scripts:

### 1. autoColor.gs

This script automatically colors cells in Google Sheets based on their contents.

### 2. checkSheets.gs

This script checks for errors in Google Sheets and logs them for review.

### 3. splitSheets.gs

This script splits a Google Sheet into multiple sheets based on a specified criteria.

## Usage

You can run these scripts in the Apps Script editor.

Please remember that you'll need to have edit permissions for all files in the folder for these scripts to work, and changes made through the Sheets API can take up to 2 minutes to propagate and become visible in the Google Sheets interface.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
