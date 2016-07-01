import sys
import psycopg2


valid_commands = ['create', 'drop', 'reset', 'count']


def fail():
    raise NameError("Script failed. Must provide exactly one command of: \n| {} |".format(" | ".join(valid_commands)))


def make_connection():
    connection = psycopg2.connect("postgres://tzfdzuzkcpuzkk:KP0ZAdOmbl0NSXSt3KDC6jn40W@ec2-107-20-198-81.compute-1.amazonaws.com:5432/d46egkp3t0iet7")
    connection.autocommit = True
    return connection


def main(arg):
    if arg not in valid_commands:
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

    elif arg == 'reset':
        cur.close()
        conn.close()        
        main('drop')
        main('create')

    elif arg == 'count':
        count = 0
        cur.execute("""SELECT * FROM rcommits""")
        for i in cur:
            count += 1
        print("{} entries in database".format(count))

    cur.close()
    conn.close()


if __name__ == '__main__':
    arg = sys.argv[1] if len(sys.argv) > 1 else fail()
    main(arg)