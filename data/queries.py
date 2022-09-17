from data import data_manager
from data import data_connection
from psycopg2 import sql


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


def get_all_shows_w_params(offset, order_by, order_direction):
    return data_manager.execute_select(f'''
        SELECT shows.id as id, title, EXTRACT(YEAR FROM year) as year, runtime, rating, STRING_AGG(genres.name, ',') as genres, trailer, homepage
        FROM shows
        LEFT JOIN show_genres ON shows.id = show_genres.show_id
        JOIN genres ON show_genres.genre_id = genres.id
        GROUP BY shows.id, title, year, runtime, rating, trailer, homepage
        ORDER BY {order_by} {order_direction}
        LIMIT 15
        OFFSET {offset};        
    ''')


def get_show_details(show_id):
    return data_manager.execute_select("""
        SELECT shows.id as id,
             title,
             EXTRACT(YEAR FROM year) as year,
             runtime,
             rating,
             STRING_AGG(DISTINCT genres.name, ', ') as genres,
             (
              SPLIT_PART( STRING_AGG(DISTINCT actors.name, ', '), ',', 1 ) || ', ' ||
              SPLIT_PART( STRING_AGG(DISTINCT actors.name, ', '), ',', 2 ) || ', ' ||
              SPLIT_PART( STRING_AGG(DISTINCT actors.name, ', '), ',', 3 ) ) as actors,
             trailer,
             overview
        FROM shows
        JOIN show_genres ON shows.id = show_genres.show_id
        JOIN genres ON show_genres.genre_id = genres.id
        JOIN show_characters on shows.id = show_characters.show_id
        JOIN actors on show_characters.actor_id = actors.id
        WHERE shows.id=%(sid)s
        GROUP BY shows.id, title, year, runtime, rating, trailer, homepage;    
    """, variables={'sid': show_id}, fetchall=False)


@data_connection.connection_handler
def ez_nem_mukodik(cursor, offset, order_by, order_direction):
    query = sql.SQL("""
        SELECT shows.id as id, title, EXTRACT(YEAR FROM year) as year, runtime, rating, STRING_AGG(genres.name, ',') as genres, trailer, homepage
        FROM shows
        LEFT JOIN show_genres ON shows.id = show_genres.show_id
        JOIN genres ON show_genres.genre_id = genres.id
        GROUP BY shows.id, title, year, runtime, rating, trailer, homepage
        ORDER BY {oby} {odi}
        LIMIT 15
        OFFSET {ofs};    
    """).format(oby=sql.Identifier(order_by), odi=sql.Identifier(order_direction), ofs=sql.Literal(offset))

    cursor.execute(query)
    return cursor.fetchall
