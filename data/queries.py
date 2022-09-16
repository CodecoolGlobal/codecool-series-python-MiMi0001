from data import data_manager


def get_shows():
    return data_manager.execute_select('SELECT id, title FROM shows;')


def get_all_shows():
    return data_manager.execute_select('''
        SELECT shows.id as id, title, EXTRACT(YEAR FROM year) as year, runtime, rating, STRING_AGG(genres.name, ',') as genres, trailer, homepage
        FROM shows
        LEFT JOIN show_genres ON shows.id = show_genres.show_id
        JOIN genres ON show_genres.genre_id = genres.id
        GROUP BY shows.id, title, year, runtime, rating, trailer, homepage
        ORDER BY rating DESC;
    ''')


def get_all_shows_w_offset(offset):
    return data_manager.execute_select('''
        SELECT shows.id as id, title, EXTRACT(YEAR FROM year) as year, runtime, rating, STRING_AGG(genres.name, ',') as genres, trailer, homepage
        FROM shows
        LEFT JOIN show_genres ON shows.id = show_genres.show_id
        JOIN genres ON show_genres.genre_id = genres.id
        GROUP BY shows.id, title, year, runtime, rating, trailer, homepage
        ORDER BY rating DESC
        LIMIT 15
        OFFSET %(ofs)s;
    ''', variables={'ofs': offset})


def count_shows():
    return data_manager.execute_select('''
        SELECT COUNT(DISTINCT title) as Count
        FROM shows;
    ''', fetchall=False)

