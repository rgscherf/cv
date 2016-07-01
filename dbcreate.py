import sys
import psycopg2


def fail():
    raise NameError("Script failed. Must provide a command of: create | drop")


def getarg():
    if len(sys.argv) > 1:
        return sys.argv[1]
    else:
        fail()


def main(arg):
    if arg not in ['create', 'drop']:
        fail()

    conn = psycopg2.connect("postgres://tzfdzuzkcpuzkk:KP0ZAdOmbl0NSXSt3KDC6jn40W@ec2-107-20-198-81.compute-1.amazonaws.com:5432/d46egkp3t0iet7")
    cur = conn.cursor()
    if arg == 'create':
        cur.execute("""CREATE TABLE rcommits (commit_url varchar PRIMARY KEY, 
            repo_url varchar,
            timestamp_raw varchar,
            timestamp_pretty varchar,
            sha varchar,
            message varchar,
            repo_name varchar);""")
    elif arg == 'drop':
        cur.execute("""DROP TABLE rcommits;""")
    conn.commit()
    cur.close()
    conn.close()


if __name__ == '__main__':
    arg = getarg()
    main(arg)