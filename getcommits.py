import psycopg2
import requests
import dateutil.parser as du 
import dateutil.tz as tz


def make_connection():
    connection = psycopg2.connect("postgres://tzfdzuzkcpuzkk:KP0ZAdOmbl0NSXSt3KDC6jn40W@ec2-107-20-198-81.compute-1.amazonaws.com:5432/d46egkp3t0iet7")
    connection.autocommit = True
    return connection


def date_from_timestamp(ts):
    eastern = tz.tzstr("EST5EDT")
    date = du.parse(ts).astimezone(eastern)
    datestr = date.strftime("%b %d %Y, %I:%M %p")
    return datestr


def get_commits(user):
    events_url = "https://api.github.com/users/{0}/events".format(user)
    events = requests.get(events_url)
    dirty_events = events.json()

    clean_events = []
    for e in dirty_events:
        if e["type"] == "PushEvent":
            for c in e["payload"]["commits"]:
                repo_url = "https://github.com/{0}".format(e["repo"]["name"])
                out = {
                    "message": c["message"],
                    "repo_name": e["repo"]["name"],
                    "repo_url": repo_url,
                    "commit_url": "{0}/commit/{1}".format(repo_url, c["sha"]),
                    "sha": c["sha"][:7],
                    "timestamp_raw": e["created_at"], # for proper sorting by time
                    "timestamp_pretty": date_from_timestamp(e["created_at"]) # what's actually displayed
                }
                clean_events.append(out)

    clean_events = sorted(clean_events, key=lambda k: k["timestamp_raw"], reverse=True)
    return clean_events


def is_unique(commit):
    conn = make_connection()
    cur = conn.cursor()
    cur.execute("""SELECT 1 FROM rcommits WHERE commit_url = %s""", (commit["commit_url"],))
    curlen = len(cur.fetchall())
    cur.close()
    conn.close()
    return True if curlen == 0 else False


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
    cur.close()
    conn.close()


def main(username):
    all_commits = get_commits(username)
    unique_commits = [c for c in all_commits if is_unique(c)]
    for c in unique_commits:
        insert_commit(c)
        

if __name__ == '__main__':
    main("rgscherf")