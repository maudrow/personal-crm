# RECORDS

## 2022-04-09 - Setup local development

Today I got Supabase working the same on my machine and on the Supabase servers. This is awesome. I primarily followed [this](https://supabase.com/docs/guides/local-development) tutorial.

Here is a summary:

- Install Supabase following the instructions [here](https://supabase.com/docs/reference/cli/installing-and-updating)
- Use `supabase init` and `supabase start` to run. The URLs to use to access various things are given by `supabase start`.
- Connect your local DB to the Supabase one with [this](https://supabase.com/docs/guides/local-development#linking-your-project) tutorial.
- Workflow
  - Make changes to the database through the GUI or SQL scripts.
  - Use `supabase db commit commit_name` to generate a migration diff.
  - Update your remote repo with `supabase db push`
- You can also reset the database to the last migration with `supabase db reset` and [seed the database](https://supabase.com/docs/guides/local-development#making-database-changes) with a `supabase/seed.sql` file.

My next steps are to

- Restructure the application in terms of components
- Add storyboards for the components
- Add stripe integration
- Add unit tests
- Add integration tests
- Make things better looking

## 2022-04-06

I have basic contacts being stored and displayed. My next step is to make notes associated with contacts. It would then be good to allow contacts and notes to be updated.

Once I have this pipeline, it would make sense to start breaking things down into views. I should figure out how best to represent this and how to plan for it.

Some things that are on the horizon for me in terms of learning:

- PostgresSQL, but get as far as I can without it
- Testing visual components
  - Integration testing with Cypress

From a process point of view, it would be worth figuring out how I can setup authentication so that I don't have to change the URL for my local site. Perhaps I will start with this task next time.

In summary:

- Allow email and password login
- Connect contacts to notes
- Make contacts and notes editable
- Add tags to contacts and notes

## 2022-04-04

There are a few ways that I can proceed with this project, since there are a few parts in parallel.

- Getting setup with Supabase
- Getting setup with Supabase UI
- Creating the required components and UI

I think the best one to start with is Supabase, because it will have me getting a lot of the risk out of the way all at once, since I do not know how it is to integrate supabase into my project and it may force later design decisions.
Once I have Supabase, it will then be good to play with Supabase UI, since they should integrate well together, in theory.
After that, I will be in a good place to make the components for the project.
