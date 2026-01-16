-- Add clinician feedback columns to existing predictions table
ALTER TABLE public.predictions 
ADD COLUMN IF NOT EXISTS clinician_feedback text CHECK (clinician_feedback IN ('accept', 'override', 'flag')),
ADD COLUMN IF NOT EXISTS clinician_notes text,
ADD COLUMN IF NOT EXISTS feedback_at timestamptz,
ADD COLUMN IF NOT EXISTS sensitivity double precision,
ADD COLUMN IF NOT EXISTS specificity double precision,
ADD COLUMN IF NOT EXISTS inference_latency_ms integer;

-- Create additional RLS policies for predictions
CREATE POLICY "Clinicians can insert predictions"
  ON public.predictions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Clinicians can update their predictions"
  ON public.predictions FOR UPDATE
  USING (auth.uid() = user_id);
