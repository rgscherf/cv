import psycopg2
import requests
import dateutil.parser as du 
import dateutil.tz as tz
import urllib.parse as url
from pprint import pprint


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


def date_from_timestamp(ts):
    eastern = tz.tzstr("EST5EDT")
    date = du.parse(ts).astimezone(eastern)
    datestr = date.strftime("%b %d %Y, %I:%M %p")
    return datestr

def get_commits(user):
    events_url = "https://api.github.com/users/{0}/events".format(user)
    events = requests.get(events_url)
    es = events.json()

    clean_events = []
    for e in es:
        if e["type"] == "PushEvent":
            for c in e["payload"]["commits"]:
                repo_url = "https://github.com/{0}".format(e["repo"]["name"])
                o = {
                    "message": c["message"],
                    "repo_name": e["repo"]["name"],
                    "repo_url": repo_url,
                    "commit_url": "{0}/commit/{1}".format(repo_url, c["sha"]),
                    "sha": c["sha"][:7],
                    "timestamp_raw": e["created_at"], # for proper sorting by time
                    "timestamp_pretty": date_from_timestamp(e["created_at"]) # for pretty time
                }
                clean_events.append(o)

    clean_events = sorted(clean_events, key=lambda k: k["timestamp_raw"], reverse=True)
    return clean_events


def is_unique(commit):
    conn = make_connection()
    cur = conn.cursor()
    cur.execute("""SELECT 1 FROM rcommits WHERE commit_url = %s""", (commit["commit_url"],))
    curlen = len(cur.fetchall())

    cur.close()
    pprint(conn.isolation_level)
    pprint(conn.notices)
    conn.close()
    if curlen == 0:
        # print("{} is unique".format(commit['sha']))
        return True
    else:
        # print("{} is not unique".format(commit['sha']))
        return False

def insert_commit(commit):
    conn = make_connection()
    cur = conn.cursor()
    cur.execute("""INSERT INTO rcommits (sha, repo_url, timestamp_raw, timestamp_pretty, commit_url, message, repo_name)
                        VALUES (%s, %s, %s, %s, %s, %s, %s) """, (commit["sha"],
                                                                  commit["repo_url"],
                                                                  commit["timestamp_raw"],
                                                                  commit["timestamp_pretty"],
                                                                  commit["commit_url"],
                                                                  commit["message"],
                                                                  commit["repo_name"]))
    conn.commit
    pprint(conn.status)
    pprint(conn.notices)
    cur.close()
    conn.close()

def main(username):

    all_commits = get_commits(username)
    unique_commits = [c for c in all_commits if is_unique(c)]
    for c in unique_commits:
        insert_commit(c)

if __name__ == '__main__':
    main("rgscherf")