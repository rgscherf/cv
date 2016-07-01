import sys
import psycopg2
import urllib.parse as url 


def fail():
    raise NameError("Script failed. Must provide a command of: create | drop")


def getarg():
    if len(sys.argv) > 1:
        return sys.argv[1]
    else:
        fail()


def main(arg):
    if arg not in ['create', 'drop', 'count']:
        fail()
    conn = make_connection()
    cur = conn.cursor()
    if arg == 'create':
        cur.execute("""CREATE TABLE rcommits (sha varchar PRIMARY KEY, 
            repo_url varchar,
            timestamp_raw varchar,
            timestamp_pretty varchar,
            commit_url varchar,
            message varchar,
            repo_name varchar);""")
    elif arg == 'drop':
        cur.execute("""DROP TABLE rcommits;""")
    elif arg == 'count':
        count = 0
        cur.execute("""SELECT * FROM rcommits""")
        for i in cur:
            count += 1
            print(".", end='')
        print()
        print("=> {} entries in database".format(count))
    conn.commit()
    cur.close()
    conn.close()


def make_connection():
    result = url.urlparse("postgres://tzfdzuzkcpuzkk:KP0ZAdOmbl0NSXSt3KDC6jn40W@ec2-107-20-198-81.compute-1.amazonaws.com:5432/d46egkp3t0iet7")
    username = result.username
    password = result.password
    database = result.path[1:]
    hostname = result.hostname
    connection = psycopg2.connect(
        database = database,
        user = username,
        password = password,
        host = hostname
    ) 
    return connection


if __name__ == '__main__':
    arg = getarg()
    main(arg)