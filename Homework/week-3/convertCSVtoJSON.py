import csv
import json
import os

# Check if the python file is in the same directory as the csv file
# https://courses.cs.washington.edu/courses/cse140/13wi/file-interaction.html
print "The current working directory is", os.getcwd()

# Open CSV file using pathnames (ik heb ook de absolute pathname gebruikt: C:\Users\gebruiker\Documents\Programmeren\Data Processing\week 3)
# Het openen gaat steeds verkeerd IOError: [Errno 2] No such file or directory: 'KNMI_20160101_etmaalsomneerslag.csv'
csvfile = open('KNMI_20160101_etmaalsomneerslag.csv', 'r')


# Change each fieldnames to oppropriate field name
reader = csv.DictReader(csvfile, fieldnames = ("STN","YYYYMMDD","Mean_Temperature","Sum_rainfall"))
#rows = list(reader)
#print rows


# Parse CSV into JSON
output = json.dumps([row for row in reader])

# Save in the JSON file
#jsonfile.write(output)
#print "saved"

