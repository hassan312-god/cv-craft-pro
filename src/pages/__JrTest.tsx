import { TemplateJsonResume } from "@/components/templates/TemplateJsonResume";
import type { CVData } from "@/pages/CVCreate";

const data: CVData = {
  firstName: "Thomas", lastName: "Dubois", email: "t@d.fr", phone: "0600000000",
  address: "Paris", photo: "", about: "Developpeur web senior.",
  experiences: [{ id: "1", company: "ACME", position: "Lead Dev", startDate: "2020-01", endDate: "2024-01", description: "Equipe de 5" }],
  education: [{ id: "1", school: "Univ", degree: "Master", startDate: "2014-09", endDate: "2016-06", description: "Info" }],
  skills: [{ id: "1", name: "React", level: 4 }],
  linkedin: "", github: "", twitter: "", portfolio: "", theme: "noir", template: "jsonresume-even",
};

export default function JrTest() {
  return (
    <div>
      {["jsonresume-even", "jsonresume-onepage-plus", "jsonresume-spartan"].map((id) => (
        <div key={id} id={id} style={{ border: "2px solid red", marginBottom: 20 }}>
          <TemplateJsonResume cvData={data} themeId={id} />
        </div>
      ))}
    </div>
  );
}
