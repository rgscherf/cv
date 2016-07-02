<?php
defined('BASEPATH') OR exit('No direct script access allowed');

function sort_entry($a, $b) {
    if ($a["timestamp_raw"] == $b["timestamp_raw"]) {
        return 0;
    }
    return ($a["timestamp_raw"] < $b["timestamp_raw"]) ? -1 : 1;
}

class ProjectHome extends CI_Controller {
    public function index() {
        $data = file_get_contents(__DIR__ . "/data.json");
        $data = json_decode($data, true);

        $this->load->database('default');
        $query = $this->db->query("SELECT * FROM rcommits");
        $commits = [];
        foreach ($query->result() as $row) {
            $append = [
                "message" => $row->message,
                "repo_name" => $row->repo_name,
                "repo_url" => $row->repo_url,
                "commit_url" => $row->commit_url,
                "sha" => $row->sha,
                "timestamp_raw" => $row->timestamp_raw,
                "timestamp_pretty" => $row->timestamp_pretty
            ];
            array_push($commits, $append);
        }
        $commits = usort($commits, "sort_entry");
        $commits = array_slice($commits, 0, 6);
        $data["commits"] = $commits;
        var_dump($commits);

        // we only want the most recent 6 commits
        // $data["commits"]["events"] = array_slice($data["commits"]["events"], 0, 6);
        
        $this->load->helper('url');
        $this->load->view('projecthomeview', $data);
    }
}