import { supabase } from "@/integrations/supabase/client";
import type { CVData } from "@/pages/CVCreate";

export interface SavedCV {
  id: string;
  title: string;
  cv_data: CVData;
  template: string | null;
  theme: string | null;
  created_at: string;
  updated_at: string;
}

export const listSavedCVs = async (): Promise<SavedCV[]> => {
  const { data, error } = await supabase
    .from("saved_cvs")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as unknown as SavedCV[];
};

export const saveCVToCloud = async (
  cvData: CVData,
  title: string,
  id?: string | null
): Promise<string> => {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) throw new Error("Non connecté");

  const payload = {
    user_id: userId,
    title,
    cv_data: JSON.parse(JSON.stringify(cvData)) as never,
    template: cvData.template ?? null,
    theme: cvData.theme ?? null,
  };

  if (id) {
    const { error } = await supabase.from("saved_cvs").update(payload).eq("id", id);
    if (error) throw error;
    return id;
  }

  const { data, error } = await supabase
    .from("saved_cvs")
    .insert(payload)
    .select("id")
    .single();

  if (error) throw error;
  return data.id as string;
};

export const deleteSavedCV = async (id: string): Promise<void> => {
  const { error } = await supabase.from("saved_cvs").delete().eq("id", id);
  if (error) throw error;
};
