import psycopg2

conn = psycopg2.connect("dbname=rgscherf user=codeigniter")
cur = conn.cursor()

cur.execute("CREATE TABLE rcommits (id serial PRIMARY KEY, repo varchar, commit_time timestamp, commit_number varchar, commit_url varchar);")

conn.commit()
cur.close()
conn.close()