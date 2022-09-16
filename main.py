from flask import Flask, render_template, url_for, jsonify, request, redirect
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


@app.route('/shows')
def show():
    return redirect(url_for('most_rated'))


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
    order_by = request.get_json()['order_by']
    order_direction = request.get_json()['order_direction']
    shows = queries.get_all_shows_w_params(str(offset), str(order_by), str(order_direction))
    print(shows)
    return jsonify(shows)


def main():
    app.run(
        debug=True,
    )


if __name__ == '__main__':
    main()
