import { CVData } from "@/pages/CVCreate";
import { getTemplateComponent } from "@/lib/templateConfig";
import { CVPreviewWrapper } from "./CVPreviewWrapper";

interface CVPreviewProps {
  cvData: CVData;
}

export const CVPreview = ({ cvData }: CVPreviewProps) => {
  const template = cvData.template || 'minimal';
  const TemplateComponent = getTemplateComponent(template);
  
  return (
    <CVPreviewWrapper>
      <TemplateComponent cvData={cvData} />
    </CVPreviewWrapper>
  );
};
