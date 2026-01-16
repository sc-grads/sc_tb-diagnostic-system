-- Update role constraint to replace 'researcher' with 'it'
ALTER TABLE public.profiles 
  DROP CONSTRAINT IF EXISTS profiles_role_check;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_role_check 
  CHECK (role IN ('clinician', 'it', 'admin'));

-- Update existing researcher roles to it
UPDATE public.profiles 
SET role = 'it' 
WHERE role = 'researcher';

-- Update the trigger function to default to 'clinician' if no role is provided
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data ->> 'full_name', null),
    COALESCE(new.raw_user_meta_data ->> 'role', 'clinician')
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN new;
END;
$$;
