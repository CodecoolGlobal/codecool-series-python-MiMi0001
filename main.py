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
def shows():
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


@app.route('/show/<show_id>')
def show_details(show_id):
    show = queries.get_show_details(show_id)

    runtime_total_min = int(show['runtime'])
    runtime_hours = runtime_total_min // 60
    runtime_min = runtime_total_min % 60

    if runtime_hours == 0:
        runtime = f'{runtime_min}min'
    else:
        if runtime_min == 0:
            runtime = f'{runtime_hours}h'
        else:
            runtime = f'{runtime_hours}h{runtime_min}min'


    if show['trailer'] is not None:
        trailer_id = show['trailer'][-11:]
        show['trailer'] = f'https://www.youtube.com/embed/{trailer_id}'

    seasons = queries.get_seasons(show_id)

    return render_template('show_details.html', show=show, runtime=runtime, seasons=seasons)


@app.route('/actors')
def actors():
    return render_template('actors.html')


@app.route('/get-actors')
def get_actors():
    actors_list = queries.get_actors()
    return jsonify(actors_list)


@app.route('/get-actors-shows', methods=['POST'])
def actors_show():
    actor_id = request.get_json()['actorId']
    shows_list = queries.get_actors_shows(actor_id)
    return jsonify(shows_list)


@app.route('/ratings')
def ratings():
    avg_rating = queries.avg_rating()['avg_rating']
    shows = queries.show_ratings()

    for show in shows:
        show['rating'] = show['rating']-avg_rating

    return render_template('ratings.html', avg_rating=avg_rating, shows=shows)


@app.route('/ordered-shows', methods= ['GET','POST'])
def ordered_shows():
    if request.method == 'GET':
        return render_template('ordered-shows.html')
    elif request.method == 'POST':
        order_direction = request.get_json()['order_dir']
        shows = queries.ordered_shows(order_direction)

        for show in shows:
            rating = int(round(float(show['rating']), 0))
            show['rating'] = ''
            for i in range(rating):
                print(i)
                show['rating'] += '*'

        return jsonify(shows)


@app.route('/filter-actors', methods=['GET', 'POST'])
def filter_actors():
    if request.method == 'GET':
        return render_template('filter-actors.html')
    elif request.method == 'POST':
        actor = request.get_json() ['actor']
        genre_id = request.get_json()['genreId']
        actors_list = queries.filter_actors(actor, genre_id)
        return jsonify(actors_list)


@app.route('/get-genres')
def get_genres():
    genres = queries.get_genres()
    return jsonify(genres)


def main():
    app.run(
        debug=True,
    )


if __name__ == '__main__':
    main()
