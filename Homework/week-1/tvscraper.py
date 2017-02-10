#!/usr/bin/env python
# Name:
# Student number:
'''
This script scrapes IMDB and outputs a CSV file with highest rated tv series.
'''
import csv

from pattern.web import URL, DOM

TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'


def extract_tvseries(dom):
    '''
    Extracts a list of highest rated TV series from DOM (of IMDB page).
'''

    # Create a list to store all data
    data = []

    # Itterate over dom all series on the page
    for page in dom.by_tag("div.lister-item-content")[:50]:

        # Create a temporary list to store the data of each serie as a seperate list
        series = []

        # Add the title to the series list, 'content' is so we only get the content,
        # .encode is so we don't have the 'u' indicating unicode
        title = page.by_tag("a")[0].content.encode('latin-1')
        series.append(title)

        # Add the rating to the series list
        rating = page.by_tag("strong")[0].content.encode('latin-1')
        series.append(rating)

        # Add the genre to the series list, the .replace is to get rid of the \n
        # and .rstrip() to get rid of the trailing whitespace
        genre = page.by_tag("span.genre")[0].content.encode('latin-1').replace('\n','').rstrip()
        series.append(genre)

        # Create a temporary list to store the 4 stars of the serie
        actors_temp = []
        for i in range(4):
            actor = page.by_tag("p.")[2].by_tag("a")[i].content.encode('latin-1')
            actors_temp.append(actor)

        # Join the actors as 1 list and add them to the series list
        actors_temp_input = ', '.join(actors_temp).strip('[]')
        series.append(actors_temp_input)

        # Add the runtime to the series list, the :-4 is to strip away ' min'
        runtime = page.by_tag("span.runtime")[0].content[:-4].encode('latin-1')
        series.append(runtime)

        # Add the temporary series list to the list of all data
        data.append(series)

    # Return the list of all data
    return data

def save_csv(f, tvseries):
    '''
    Output a CSV file containing highest rated TV-series.
    '''
    writer = csv.writer(f)
    writer.writerow(['Title', 'Rating', 'Genre', 'Actors', 'Runtime'])
    writer.writerows(tvseries)

if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries)