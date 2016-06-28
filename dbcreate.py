import psycopg2

conn = psycopg2.connect("postgres://tzfdzuzkcpuzkk:KP0ZAdOmbl0NSXSt3KDC6jn40W@ec2-107-20-198-81.compute-1.amazonaws.com:5432/d46egkp3t0iet7")
cur = conn.cursor()

cur.execute("""CREATE TABLE rcommits (id serial PRIMARY KEY, 
    repo varchar, 
    message varchar, 
    commit_number varchar, 
    commit_url varchar);""")

conn.commit()
cur.close()
conn.close()