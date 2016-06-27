import json
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

    out = {}
    out["name"] = user_obj["name"]
    out["login"] = user_obj["login"]
    out["avatar_url"] = user_obj["avatar_url"]
    return out

def get_commits(userdict):
    events_url = "https://api.github.com/users/{0}/events".format(userdict["login"])
    events = requests.get(events_url)
    es = events.json()

    clean_events = []
    for e in es:
        if e["type"] == "PushEvent":
            for c in e["payload"]["commits"]:
                o = {}
                o["message"] = c["message"]
                o["repo_url"] = "https://github.com/{0}".format(e["repo"]["name"])
                o["commit_url"] = "{0}/commit/{1}".format(o["repo_url"], c["sha"])
                # https://github.com/rgscherf/cv/commit/70172c8e0c1c9fa3ed243782fa97f79e7e2a0c18
                o["sha"] = c["sha"][:7]
                o["timestamp"] = date_from_timestamp(e["created_at"])
                clean_events.append(o)
    # reverse-sort by date
    # TODO: because dates are stored in a month-first string, this will be wonky.
    # consider saving a separate timestamp field for true sorting!
    clean_events = sorted(clean_events, key=lambda k: k["timestamp"], reverse=True)
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