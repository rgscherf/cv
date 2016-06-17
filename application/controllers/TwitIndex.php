<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class TwitIndex extends CI_Controller {
    public function index() {
        $this->load->helper('url');
        $this->load->view('init_search');
    }

    private function githubRequest($url) {
        // function calls do not work, whyyyy
        $client = new GuzzleHttp\Client();
        $req = $client->request('GET', $url);
        $res = $req->getBody();
        $m = json_decode($res, true);
        return $m;
    }

    public function getUser($search) {
        // http://docs.guzzlephp.org/en/latest/
        // GuzzleHTTP is great

        // get user data and initialize return array
        $url = 'https://api.github.com/users/'.$search;
        $client = new GuzzleHttp\Client();

        $req = $client->request('GET', $url);
        $res = $req->getbody();
        $map = json_decode($res, true);
        $val = ["avatar_url" => $map["avatar_url"],
                "html_url" => $map["html_url"],
                "login" => $map["login"],
                "name" => $map["name"],
                "public_repos" => $map["public_repos"]];

        // now let's work on user events
        $url = 'https://api.github.com/users/'.$search.'/events';
        $client = new GuzzleHttp\Client();
        $req = $client->request('GET', $url);
        $res = $req->getbody();
        $map = json_decode($res, true);
        $map = array_filter($map, function($v) { return $v['type'] === 'PushEvent';} );
        $commits = array_map( function($v) {
            $ret = [
                "created_at" => $v['created_at'],
                "repo_name" => $v['repo']['name'],
                "repo_url" => $v['repo']['url'],
                "commit_message" => $v['payload']['commits'][0]['message'],
                "commit_url" => $v['payload']['commits'][0]['url'],
            ];
            return $ret;
        }, $map);
        $val['commits'] = $commits;
        
        header('Content-type: application/json');
        header('Access-Control-Allow-Origin: *'); 
        echo json_encode($val);

        // echo json_encode($val);
    }

}