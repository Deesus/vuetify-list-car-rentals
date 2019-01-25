"""
    Converts CSV file to JSON.
    The output JSON has the following structure:
        {
            "ID": {
                "ID": <string>,
                "Name": <string>,
                "Description": <string>,
                "Date": <string>,
                "Amount": <float>
            },

            "ID2": {
                "ID2": <string>,
                "Name": <string>
                ...
            }
            ...
        }
"""
__author__ = ('Dee Reddy', 'github.com/deesus')


import csv
import json


INPUT_FILE_PATH = './MOCK_DATA.csv'
OUTPUT_FILE_PATH = './MOCK_DATA.json'
INDEX_OF_ID_TO_USE_AS_KEY = 0       # for our JSON-like db, we'll use the ID as top-level keys


json_feed = {}

# read input file (csv) and use data to generate feed:
with open(INPUT_FILE_PATH, 'r') as input_file:
    reader = csv.reader(input_file)

    for (index, row) in enumerate(reader):
        entry = {}

        # the first row of a csv specifies field names
        # we'll use the field names to map to row values:
        if index == 0:
            field_names = row

        # all other rows specify data that we use to update the feed:
        else:
            # each entry has an ID which we will use as the key:
            key = row[INDEX_OF_ID_TO_USE_AS_KEY]

            # map each entry's field name its value:
            for (prop, val) in zip(field_names, row):
                # all values in csv are stored as strings, so let's try to convert them to its proper type (e.g. float):
                try:
                    entry[prop] = float(val)
                except ValueError as err:
                    entry[prop] = val

            json_feed.update({key: entry})


# write json to file using the generated feed:
with open(OUTPUT_FILE_PATH, 'w', encoding='utf-8') as output_file:
    json.dump(json_feed, output_file)
