-- Allow the calculator quiz to record leads.
alter table leads drop constraint if exists leads_source_check;
alter table leads add constraint leads_source_check
  check (source in ('cheat-sheet', 'service-request', 'signup-abandoned', 'calculator'));
