-- Create table for patient metadata
CREATE TABLE IF NOT EXISTS public.patient_metadata (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prediction_id uuid REFERENCES public.predictions(id) ON DELETE CASCADE,
  age integer,
  sex text CHECK (sex IN ('male', 'female', 'other', 'unknown')),
  hiv_status text CHECK (hiv_status IN ('positive', 'negative', 'unknown')),
  additional_notes text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.patient_metadata ENABLE ROW LEVEL SECURITY;

-- Policies - users can only access metadata for their own predictions
CREATE POLICY "Users can view their own patient metadata"
  ON public.patient_metadata FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.predictions
      WHERE predictions.id = patient_metadata.prediction_id
      AND predictions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own patient metadata"
  ON public.patient_metadata FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.predictions
      WHERE predictions.id = patient_metadata.prediction_id
      AND predictions.user_id = auth.uid()
    )
  );
