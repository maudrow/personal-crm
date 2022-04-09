-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

CREATE TABLE IF NOT EXISTS public.groups
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    created_at timestamp with time zone DEFAULT now(),
    name text COLLATE pg_catalog."default" NOT NULL,
    tags text[] COLLATE pg_catalog."default",
    CONSTRAINT groups_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.groups
    OWNER to postgres;

ALTER TABLE IF EXISTS public.groups
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.groups TO anon;

GRANT ALL ON TABLE public.groups TO authenticated;

GRANT ALL ON TABLE public.groups TO postgres;

GRANT ALL ON TABLE public.groups TO service_role;
CREATE POLICY "Authenticated users can do everything"
    ON public.groups
    AS PERMISSIVE
    FOR ALL
    TO public
    USING ((auth.role() = 'authenticated'::text));
