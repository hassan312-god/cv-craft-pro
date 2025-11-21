import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, WidthType, Table, TableRow, TableCell, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';
import { CVData } from '@/pages/CVCreate';
import { formatDate, safeValue } from './cvUtils';

/**
 * Convertit une couleur hex/rgb en format Word
 */
const convertColor = (color: string): string => {
  if (color.startsWith('rgb')) {
    const matches = color.match(/\d+/g);
    if (matches && matches.length >= 3) {
      const r = parseInt(matches[0]).toString(16).padStart(2, '0');
      const g = parseInt(matches[1]).toString(16).padStart(2, '0');
      const b = parseInt(matches[2]).toString(16).padStart(2, '0');
      return r + g + b;
    }
  }
  return color.replace('#', '');
};

/**
 * Exporte un CV en format Word (.docx)
 */
export const exportToWord = async (cvData: CVData): Promise<void> => {
  try {
    const children: (Paragraph | Table)[] = [];

    // Header avec nom
    children.push(
      new Paragraph({
        text: `${safeValue(cvData.firstName)} ${safeValue(cvData.lastName)}`,
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
      })
    );

    // Informations de contact
    const contactInfo: string[] = [];
    if (cvData.email) contactInfo.push(safeValue(cvData.email));
    if (cvData.phone) contactInfo.push(safeValue(cvData.phone));
    if (cvData.address) contactInfo.push(safeValue(cvData.address));
    
    if (contactInfo.length > 0) {
      children.push(
        new Paragraph({
          text: contactInfo.join(' | '),
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 },
        })
      );
    }

    // Section À Propos
    if (cvData.about) {
      children.push(
        new Paragraph({
          text: 'À PROPOS',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
        })
      );
      children.push(
        new Paragraph({
          text: safeValue(cvData.about),
          spacing: { after: 300 },
        })
      );
    }

    // Expériences Professionnelles
    if (cvData.experiences.length > 0) {
      children.push(
        new Paragraph({
          text: 'EXPÉRIENCE PROFESSIONNELLE',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
        })
      );

      cvData.experiences.forEach((exp) => {
        const dateRange = `${formatDate(exp.startDate)} - ${exp.endDate ? formatDate(exp.endDate) : 'Présent'}`;
        
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: safeValue(exp.position),
                bold: true,
                size: 24,
              }),
              new TextRun({
                text: ` - ${safeValue(exp.company)}`,
                size: 24,
              }),
            ],
            spacing: { after: 100 },
          })
        );
        
        children.push(
          new Paragraph({
            text: dateRange,
            spacing: { after: 100 },
          })
        );

        if (exp.description) {
          const lines = exp.description.split('\n').filter(line => line.trim());
          lines.forEach((line) => {
            children.push(
              new Paragraph({
                text: `• ${line.trim()}`,
                spacing: { after: 50 },
              })
            );
          });
        }
        
        children.push(new Paragraph({ text: '', spacing: { after: 200 } }));
      });
    }

    // Formation
    if (cvData.education.length > 0) {
      children.push(
        new Paragraph({
          text: 'FORMATION',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
        })
      );

      cvData.education.forEach((edu) => {
        const dateRange = `${formatDate(edu.startDate)} - ${edu.endDate ? formatDate(edu.endDate) : 'Présent'}`;
        
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: safeValue(edu.degree),
                bold: true,
                size: 24,
              }),
              new TextRun({
                text: ` - ${safeValue(edu.school)}`,
                size: 24,
              }),
            ],
            spacing: { after: 100 },
          })
        );
        
        children.push(
          new Paragraph({
            text: dateRange,
            spacing: { after: 100 },
          })
        );

        if (edu.description) {
          children.push(
            new Paragraph({
              text: safeValue(edu.description),
              spacing: { after: 200 },
            })
          );
        }
      });
    }

    // Compétences
    if (cvData.skills.length > 0) {
      children.push(
        new Paragraph({
          text: 'COMPÉTENCES',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
        })
      );

      const skillsText = cvData.skills.map(skill => safeValue(skill.name)).join(' • ');
      children.push(
        new Paragraph({
          text: skillsText,
          spacing: { after: 300 },
        })
      );
    }

    // Liens sociaux
    const socialLinks: string[] = [];
    if (cvData.linkedin) socialLinks.push(`LinkedIn: ${cvData.linkedin}`);
    if (cvData.github) socialLinks.push(`GitHub: ${cvData.github}`);
    if (cvData.portfolio) socialLinks.push(`Portfolio: ${cvData.portfolio}`);
    
    if (socialLinks.length > 0) {
      children.push(
        new Paragraph({
          text: 'LIENS',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 400, after: 200 },
        })
      );
      children.push(
        new Paragraph({
          text: socialLinks.join(' | '),
          spacing: { after: 300 },
        })
      );
    }

    // Créer le document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: children,
        },
      ],
    });

    // Générer et télécharger le fichier
    const blob = await Packer.toBlob(doc);
    const fileName = `${cvData.firstName}_${cvData.lastName}_CV.docx`;
    saveAs(blob, fileName);
  } catch (error) {
    console.error('Erreur lors de l\'export Word:', error);
    throw error;
  }
};

