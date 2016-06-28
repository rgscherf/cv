import psycopg2
import requests
import sys
import datetime as dt
import dateutil.parser as du 
import dateutil.tz as tz

# retrieve user's latest github commits
# munge them to fill out fields
# then save to database

# SCHEMA:
# id serial PRIMARY KEY, 
# repo varchar, 
# commit_time timestamp, 
# commit_number varchar, 
# commit_url varchar

def date_from_timestamp(ts):
    eastern = tz.tzstr("EST5EDT")
    date = du.parse(ts).astimezone(eastern)
    datestr = date.strftime("%b %d %Y, %I:%M %p")
    return datestr

def get_user_info(username):
    user_url = "https://api.github.com/users/{0}".format(username)
    user_request = requests.get(user_url)
    user_obj = user_request.json()

    out = {
        "name": user_obj["name"],
        "login": user_obj["login"],
        "avatar_url": user_obj["avatar_url"]
    }

    return out

def get_commits(userdict):
    events_url = "https://api.github.com/users/{0}/events".format(userdict["login"])
    events = requests.get(events_url)
    es = events.json()

    clean_events = []
    for e in es:
        if e["type"] == "PushEvent":
            for c in e["payload"]["commits"]:
                repo_url = "https://github.com/{0}".format(e["repo"]["name"])
                o = {
                    "message": c["message"],
                    "repo_url": repo_url,
                    "commit_url": "{0}/commit/{1}".format(repo_url, c["sha"]),
                    "sha": c["sha"][:7],
                    "timestamp_raw": e["created_at"], # for proper sorting by time
                    "timestamp": date_from_timestamp(e["created_at"]) # for pretty time
                }
                clean_events.append(o)

    clean_events = sorted(clean_events, key=lambda k: k["timestamp_raw"], reverse=True)
    userdict["events"] = clean_events
    return userdict


def main(username):
    # conn = psycopg2.connect("dbname=rgscherf user=codeigniter")
    # cur = conn.cursor()

    # now = datetime.datetime.now()
    # cur.execute("""INSERT INTO rcommits (repo, commit_time, commit_number, commit_url)
    #                     VALUES (%(repo)s, %(commit_time)s, %(commit_numer)s, %(commit_url)s) """)
    user = get_user_info(username)
    user = get_commits(user)
    print(user)

if __name__ == '__main__':
    main("rgscherf")