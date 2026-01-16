-- Update the role constraint to allow 'it' instead of 'researcher'
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE public.profiles ADD CONSTRAINT profiles_role_check CHECK (role IN ('clinician', 'it', 'admin'));
