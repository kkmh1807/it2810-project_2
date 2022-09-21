export interface Person {
  id: number;
  username: string;
  name: string;
  avatar_url: string;
}

export interface Issue {
  iid: number;
  title: string;
  state: string;
  description: string;
  author: Person;
  assignee?: Person;
  assignees?: Person[];
}

export interface MR {
  title: string;
  reviewer?: Person;
  assignee?: Person;
  author?: Person;
  source_branch: string;
  target_branch?: string;
  state: string;
  iid: number;
}

export interface Commit {
  id: string;
  short_id: string;
  title: string;
  author_name: string;
  author_email: string;
  authored_date: string;
  committer_name: string;
  committer_email: string;
  committed_date: string;
  created_at: string;
  message: string;
}
