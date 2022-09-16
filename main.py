from flask import Flask, render_template, url_for, jsonify, request
from data import queries
import math
from dotenv import load_dotenv

load_dotenv()
app = Flask('codecool_series')

@app.route('/')
def index():
    shows = queries.get_shows()
    return render_template('index.html', shows=shows)


@app.route('/design')
def design():
    return render_template('design.html')


@app.route('/shows/most-rated')
def most_rated():
    return render_template('most_rated.html')


@app.route('/count-shows')
def count_shows():
    shows_count = len( queries.get_all_shows() )
    return jsonify({'count': shows_count})


@app.route('/get-shows', methods=['POST'])
def get_shows():
    offset = request.get_json()['offset']
    shows = queries.get_all_shows_w_offset(offset)

    result = []
    for show in shows:
        row = {}
        for field in show.keys():
            row[field] = show[field]
        result.append(row)

    return jsonify(shows)


def main():
    app.run(
        debug=True,
    )


if __name__ == '__main__':
    main()
