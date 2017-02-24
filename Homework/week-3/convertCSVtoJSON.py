import csv
import json
import os

# Check if the python file is in the same directory as the csv file
print ("The current working directory is", os.getcwd())

# Open CSV file using pathnames
csvfile = open('Bestaande_koopwoning_240217183021.csv', 'r')


# Change each fieldnames to appropriate field name
reader = csv.DictReader(csvfile, fieldnames = ("Perioden","Nederland","Groningen","Zuid-Holland","Noord-Brabant","Amsterdam", "Rotterdam"))


# Parse CSV into JSON
output = json.dumps([row for row in reader])
print(output)
# Save in the JSON file
jsonfile = open('Bestaande_koopwoningen.json', 'w')
jsonfile.write(output)
print ("saved")
